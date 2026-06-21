"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Settings2, CheckCircle2, XCircle } from "lucide-react";

type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "scudiver_cookie_consent";

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function saveConsent(state: ConsentState) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
    setVisible(false);
  }

  function acceptAll() {
    saveConsent({ essential: true, analytics: true, marketing: true });
  }

  function rejectAll() {
    saveConsent({ essential: true, analytics: false, marketing: false });
  }

  function saveCustom() {
    saveConsent({ essential: true, analytics, marketing });
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Setări cookie-uri"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-brand shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {!showSettings ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 text-sm text-charcoal">
              <p className="font-semibold mb-0.5">Utilizăm cookie-uri</p>
              <p className="text-muted text-xs leading-relaxed">
                Folosim cookie-uri esențiale pentru funcționarea site-ului. Cu
                consimțământul dvs., activăm și cookie-uri de analiză pentru a
                îmbunătăți experiența. Aflați mai multe în{" "}
                <Link
                  href="/politica-cookie"
                  className="text-brand underline hover:text-brand-dark"
                >
                  Politica de Cookie-uri
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-border rounded-sm hover:bg-surface transition-colors text-charcoal"
                aria-label="Configurați preferințele de cookie-uri"
              >
                <Settings2 size={14} />
                Setări
              </button>
              <button
                onClick={rejectAll}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-border rounded-sm hover:bg-surface transition-colors text-charcoal"
              >
                <XCircle size={14} />
                Respinge toate
              </button>
              <button
                onClick={acceptAll}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-brand text-white rounded-sm hover:bg-brand-dark transition-colors"
              >
                <CheckCircle2 size={14} />
                Acceptă toate
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-charcoal">Preferințe Cookie-uri</h2>
              <button
                onClick={() => setShowSettings(false)}
                aria-label="Înapoi"
                className="p-1 rounded-sm hover:bg-surface transition-colors text-muted"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3 mb-4">
              {/* Essential — always on */}
              <label className="flex items-center justify-between p-3 bg-surface rounded-sm">
                <div>
                  <p className="text-sm font-semibold text-charcoal">Cookie-uri esențiale</p>
                  <p className="text-xs text-muted">Necesare pentru funcționarea site-ului. Nu pot fi dezactivate.</p>
                </div>
                <input type="checkbox" checked disabled className="w-4 h-4 accent-brand" />
              </label>
              {/* Analytics */}
              <label className="flex items-center justify-between p-3 bg-surface rounded-sm cursor-pointer hover:bg-surface-dark transition-colors">
                <div>
                  <p className="text-sm font-semibold text-charcoal">Cookie-uri de analiză</p>
                  <p className="text-xs text-muted">Ne ajută să înțelegem cum utilizați site-ul (ex: Google Analytics).</p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="w-4 h-4 accent-brand"
                  aria-label="Activează cookie-uri de analiză"
                />
              </label>
              {/* Marketing */}
              <label className="flex items-center justify-between p-3 bg-surface rounded-sm cursor-pointer hover:bg-surface-dark transition-colors">
                <div>
                  <p className="text-sm font-semibold text-charcoal">Cookie-uri de marketing</p>
                  <p className="text-xs text-muted">Utilizate pentru reclame relevante pe alte platforme.</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="w-4 h-4 accent-brand"
                  aria-label="Activează cookie-uri de marketing"
                />
              </label>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm font-medium border border-border rounded-sm hover:bg-surface transition-colors text-charcoal"
              >
                Respinge toate
              </button>
              <button
                onClick={saveCustom}
                className="px-4 py-2 text-sm font-semibold bg-brand text-white rounded-sm hover:bg-brand-dark transition-colors"
              >
                Salvează preferințele
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
