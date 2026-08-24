/**
 * A very small PDF reader/writer, enough for one job: take the fastener
 * catalogue in `Scudiver/SURUB TRADE - CATALOG DE PRODUSE.pdf`, lift its
 * product photography out, and write the pages back under our own masthead.
 *
 * The source is a Corel export — classic cross-reference table, no object
 * streams, every photo an uncompressed DCTDecode (JPEG) XObject. That is why
 * this file can get away with regex over the raw bytes instead of a real
 * parser: there is exactly one file it has to read, and it is checked in.
 */

import fs from "node:fs";
import zlib from "node:zlib";

/** Latin-1 throughout — byte offsets taken off the string index must stay valid. */
const L1 = "latin1";

export const SOURCE_PDF = "Scudiver/SURUB TRADE - CATALOG DE PRODUSE.pdf";

export function readPdf(path) {
  const buf = fs.readFileSync(path);
  const src = buf.toString(L1);

  /** obj number → byte offsets of the body, `N 0 obj` header excluded. */
  const objs = new Map();
  const re = /(\d+)\s+0\s+obj/g;
  let m;
  const heads = [];
  while ((m = re.exec(src))) heads.push({ num: Number(m[1]), bodyAt: re.lastIndex });
  for (const h of heads) objs.set(h.num, { num: h.num, start: h.bodyAt, end: src.indexOf("endobj", h.bodyAt) });

  const body = (n) => (objs.has(n) ? src.slice(objs.get(n).start, objs.get(n).end) : "");

  function stream(n) {
    const o = objs.get(n);
    if (!o) return null;
    const si = src.indexOf("stream", o.start);
    if (si === -1 || si > o.end) return null;
    let ds = si + 6;
    if (src[ds] === "\r") ds++;
    if (src[ds] === "\n") ds++;
    return { dict: src.slice(o.start, si), data: buf.subarray(ds, src.lastIndexOf("endstream", o.end)) };
  }

  // The source is linearized, so it carries two trailers and only the first
  // names the catalogue. Take whichever one actually has /Root.
  let root, info;
  for (let i = src.indexOf("trailer"); i !== -1; i = src.indexOf("trailer", i + 1)) {
    const t = src.slice(i, i + 400);
    const r = t.match(/\/Root\s+(\d+)\s+0\s+R/);
    if (r) {
      root = Number(r[1]);
      info = Number((t.match(/\/Info\s+(\d+)\s+0\s+R/) || [])[1]);
      break;
    }
  }

  const pagesNum = [...objs.keys()].find((n) => /\/Type\s*\/Pages/.test(body(n)));
  const kids = body(pagesNum)
    .match(/\/Kids\s*\[([^\]]*)\]/)[1]
    .match(/(\d+)\s+0\s+R/g)
    .map((r) => parseInt(r, 10));

  return { buf, src, objs, body, stream, root, info, pagesNum, kids };
}

/** Metadata for an image XObject; `data` is the still-encoded stream. */
export function imageMeta(pdf, num) {
  const st = pdf.stream(num);
  if (!st || !/\/Subtype\s*\/Image/.test(st.dict)) return null;
  return {
    obj: num,
    px: Number((st.dict.match(/\/Width\s+(\d+)/) || [])[1]),
    py: Number((st.dict.match(/\/Height\s+(\d+)/) || [])[1]),
    jpeg: /DCTDecode/.test(st.dict),
    data: st.data,
  };
}

/* Corel wrote the Romanian diacritics through a legacy code page. */
const DIACRITICS = { "ª": "Ș", "º": "ș", "þ": "ț", "ã": "ă" };
const deCorel = (t) => t.replace(/[ªºþã]/g, (c) => DIACRITICS[c] ?? c).replace(/\s+/g, " ").trim();

const round = (n) => Number(n.toFixed(2));

/**
 * Text runs and placed images for one page, in device space. `rot` marks the
 * sideways section labels running down the left edge of each column.
 */
export function readPage(pdf, pageNum) {
  const pb = pdf.body(pageNum);
  const contents = Number((pb.match(/\/Contents\s+(\d+)\s+0\s+R/) || [])[1]);
  const xobject = {};
  const xdict = (pb.match(/\/XObject\s*<<([\s\S]*?)>>/) || [])[1] ?? "";
  for (const mm of xdict.matchAll(/\/(Im\d+)\s+(\d+)\s+0\s+R/g)) xobject[mm[1]] = Number(mm[2]);

  const raw = zlib.inflateSync(pdf.stream(contents).data).toString(L1);
  const texts = [];
  const images = [];
  let cm = null;
  let line = [0, 0];
  let pos = null;
  let cur = "";
  let rot = false;
  let curRot = false;

  const flush = () => {
    if (cur.trim() && pos) texts.push({ s: deCorel(cur), x: round(pos[0]), y: round(pos[1]), rot: curRot });
    cur = "";
  };

  for (const ln of raw.split(/\r?\n/)) {
    let m;
    if (ln === "BT") {
      flush();
      line = [0, 0];
      pos = null;
      rot = false;
    } else if (ln === "ET") {
      flush();
    } else if ((m = ln.match(/^([\d.\-]+)\s+([\d.\-]+)\s+(?:TD|Td)$/))) {
      // Td/TD are relative to the start of the previous line, not the origin.
      flush();
      line = [line[0] + Number(m[1]), line[1] + Number(m[2])];
      pos = line.slice();
      curRot = rot;
    } else if ((m = ln.match(/^([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+Tm$/))) {
      flush();
      const v = m.slice(1).map(Number);
      rot = Math.abs(v[1]) > 0.01 || Math.abs(v[2]) > 0.01;
      line = [v[4], v[5]];
      pos = line.slice();
      curRot = rot;
    } else if ((m = ln.match(/^\((.*)\)Tj$/))) {
      cur += m[1];
    } else if ((m = ln.match(/^([\d.\-]+)\s+[\d.\-]+\s+[\d.\-]+\s+([\d.\-]+)\s+([\d.\-]+)\s+([\d.\-]+)\s+cm$/))) {
      cm = m.slice(1).map(Number);
    } else if ((m = ln.match(/^\/(Im\d+)\s+Do$/))) {
      if (cm) images.push({ obj: xobject[m[1]], w: round(cm[0]), h: round(cm[1]), x: round(cm[2]), y: round(cm[3]) });
      cm = null;
    }
  }
  flush();
  return { pageNum, contents, xobject, texts, images };
}

/**
 * Every photo is laid down twice: a blurred grey copy first as a drop shadow,
 * then the real one slightly smaller and centred on it. Keep the second.
 */
export function withoutShadows(list) {
  const keep = [];
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    const b = list[i + 1];
    const nested =
      b &&
      b.w < a.w &&
      b.h < a.h &&
      b.w / a.w > 0.6 &&
      Math.abs(a.x + a.w / 2 - (b.x + b.w / 2)) < 4 &&
      Math.abs(a.y + a.h / 2 - (b.y + b.h / 2)) < 4;
    if (nested) {
      keep.push(b);
      i++;
    } else {
      keep.push(a);
    }
  }
  return keep;
}

/** Row pitch of the catalogue grid, in points. */
const ROW = 38;

/**
 * The catalogue as rows: a standard designation and the photos beside it. Two
 * columns per page; the sideways section labels are left out.
 */
export function readRows(pdf) {
  const rows = [];
  for (const [i, pageNum] of pdf.kids.entries()) {
    const pg = readPage(pdf, pageNum);
    const labels = pg.texts.filter(
      (t) => !t.rot && t.y > 15 && t.y < 776 && ((t.x > 55 && t.x < 130) || (t.x > 330 && t.x < 410)),
    );
    const bands = new Map();
    for (const t of labels) {
      const col = t.x > 300 ? "R" : "L";
      const key = `${col}:${Math.round(t.y / ROW)}`;
      if (!bands.has(key)) bands.set(key, { col, y: t.y, parts: [] });
      const b = bands.get(key);
      b.parts.push(t.s);
      b.y = Math.max(b.y, t.y);
    }
    for (const b of bands.values()) {
      const inRow = pg.images
        .filter((im) => Math.abs(im.y + im.h / 2 - (b.y + 5)) < ROW / 2 && (b.col === "L" ? im.x < 300 : im.x >= 300))
        .sort((p, q) => p.x - q.x);
      rows.push({
        page: i + 1,
        col: b.col,
        y: b.y,
        label: b.parts.join(" ").replace(/\s+/g, " ").trim(),
        images: withoutShadows(inRow),
      });
    }
  }
  rows.sort((a, b) => a.page - b.page || (a.col === b.col ? b.y - a.y : a.col < b.col ? -1 : 1));
  return rows;
}

/** A PDF stream object body: dictionary entries, then the raw bytes. */
export function streamObject(dictEntries, data) {
  return [
    Buffer.from(`\n<< ${dictEntries} /Length ${data.length} >>\nstream\n`, L1),
    data,
    Buffer.from("\nendstream\n", L1),
  ];
}

/**
 * Serialises `pdf` again with `overrides` applied (obj number → replacement
 * body as a string, or as an array of Buffers for stream objects), under a
 * freshly built cross-reference table.
 */
export function writePdf(pdf, overrides, outPath) {
  const nums = [...new Set([...pdf.objs.keys(), ...overrides.keys()])].sort((a, b) => a - b);
  const max = nums[nums.length - 1];
  const header = Buffer.from("%PDF-1.4\n%âãÏÓ\n", L1);
  const chunks = [header];
  let offset = header.length;
  const xref = new Map();

  for (const n of nums) {
    const replacement = overrides.get(n);
    const parts =
      replacement === undefined
        ? [Buffer.from(pdf.src.slice(pdf.objs.get(n).start, pdf.objs.get(n).end), L1)]
        : Array.isArray(replacement)
          ? replacement
          : [Buffer.from(String(replacement), L1)];

    xref.set(n, offset);
    for (const p of [Buffer.from(`${n} 0 obj`, L1), ...parts, Buffer.from("endobj\n", L1)]) {
      chunks.push(p);
      offset += p.length;
    }
  }

  let table = `xref\n0 ${max + 1}\n0000000000 65535 f \n`;
  for (let n = 1; n <= max; n++) {
    table += xref.has(n) ? `${String(xref.get(n)).padStart(10, "0")} 00000 n \n` : "0000000000 65535 f \n";
  }
  table += `trailer\n<< /Size ${max + 1} /Root ${pdf.root} 0 R /Info ${pdf.info} 0 R >>\nstartxref\n${offset}\n%%EOF\n`;
  chunks.push(Buffer.from(table, L1));

  fs.writeFileSync(outPath, Buffer.concat(chunks));
  return fs.statSync(outPath).size;
}
