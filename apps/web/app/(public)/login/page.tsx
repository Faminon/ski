"use client";
import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/IntlProvider";

export default function LoginPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !pwd) return setError(`${t("login_email")} / ${t("login_password")}`);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    alert("Mock login");
    setLoading(false);
  }

  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: 16 }}>
      <div className="card" style={{ width: "100%", maxWidth: 420, padding: 24, display: "grid", gap: 14 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", margin: "0 auto 8px", display: "grid", placeItems: "center", background: "#142033", border: "1px solid var(--border)", fontWeight: 800 }} aria-hidden>
            {t("auth_logo")}
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>{t("login_title")}</h1>
          <p className="meta" style={{ marginTop: 6 }}>{t("login_subtitle")}</p>
        </div>

        {error && <div style={{ border: "1px solid #7f1d1d", background: "#1a0f10", color: "#fecaca", padding: "10px 12px", borderRadius: 10, fontSize: 14 }}>{error}</div>}

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span className="meta" style={{ fontSize: 12 }}>{t("login_email")}</span>
            <input className="input" type="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span className="meta" style={{ fontSize: 12 }}>{t("login_password")}</span>
            <div style={{ position: "relative" }}>
              <input className="input" type={showPwd ? "text" : "password"} placeholder="••••••••" value={pwd} onChange={(e) => setPwd(e.target.value)} autoComplete="current-password" required style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPwd((v) => !v)} style={{ position: "absolute", top: 0, right: 0, height: "100%", padding: "0 12px", background: "transparent", border: 0, color: "#cfe3ff", cursor: "pointer" }}>
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span className="meta">{t("login_remember")}</span>
            </label>
            <Link href="#" className="meta" style={{ textDecoration: "underline" }}>{t("login_forgot")}</Link>
          </div>

          <button className="btn" type="submit" disabled={loading} style={{ height: 44, fontWeight: 800 }}>
            {loading ? t("login_submit") + "..." : t("login_submit")}
          </button>
        </form>

        <p className="meta" style={{ textAlign: "center", marginTop: 6 }}>
          {t("login_no_account")}{" "}
          <Link href="/register" style={{ textDecoration: "underline" }}>
            {t("login_to_register")}
          </Link>
        </p>
      </div>
    </main>
  );
}
