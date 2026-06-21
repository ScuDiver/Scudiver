import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, contactName, email, phone, products: productList, message } = body;

    if (!company || !contactName || !email || !message) {
      return NextResponse.json(
        { error: "Câmpuri obligatorii lipsă." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresa de email este invalidă." },
        { status: 400 }
      );
    }

    const emailText = `
CERERE DE OFERTĂ — ScuDiver
============================
Firmă / Instituție: ${company}
Persoană de contact: ${contactName}
Email: ${email}
Telefon: ${phone || "—"}

Produse / Servicii solicitate:
${productList || "—"}

Mesaj suplimentar:
${message}

---
Trimis prin formularul de pe site-ul scudiver.ro
Data: ${new Date().toLocaleString("ro-RO")}
    `.trim();

    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey && resendKey !== "placeholder") {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "noreply@scudiver.ro",
          to: process.env.CONTACT_EMAIL ?? "office@scudiver.ro",
          reply_to: email,
          subject: `Cerere de ofertă de la ${company}`,
          text: emailText,
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return NextResponse.json(
          { error: "Eroare la trimiterea emailului. Vă rugăm contactați-ne direct." },
          { status: 500 }
        );
      }
    } else {
      console.log("[DEV] Cerere ofertă (email not configured):\n", emailText);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Eroare internă. Vă rugăm încercați din nou." },
      { status: 500 }
    );
  }
}
