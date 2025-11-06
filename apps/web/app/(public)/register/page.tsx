"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/IntlProvider";

export default function RegisterPage() {
  const { t } = useI18n();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [accept, setAccept] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(): string | null {
    if (!firstName.trim()) return t("register_firstname");
    if (!lastName.trim()) return t("register_lastname");
    if (!email.trim()) return t("register_email");
    if (pwd.length < 8) return t("register_password");
    if (pwd !== pwd2) return t("register_confirm");
    if (!accept) return t("register_terms");
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    alert("Mock register");
    setLoading(false);
    router.push("/login");
  }

  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: 16 }}>
      <div className="card" style={{ width: "100%", maxWidth: 480, padding: 24, display: "grid", gap: 14 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", margin: "0 auto 8px", display: "grid", placeItems: "center", background: "#142033", border: "1px solid var(--border)", fontWeight: 800 }} aria-hidden>
            {t("auth_logo")}
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>{t("register_title")}</h1>
          <p className="meta" style={{ marginTop: 6 }}>{t("register_subtitle")}</p>
        </div>

        {error && <div style={{ border: "1px solid #7f1d1d", background: "#1a0f10", color: "#fecaca", padding: "10px 12px", borderRadius: 10, fontSize: 14 }}>{error}</div>}

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span className="meta" style={{ fontSize: 12 }}>{t("register_firstname")}</span>
              <input className="input" type="text" placeholder="Jean" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" required />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              <span className="meta" style={{ fontSize: 12 }}>{t("register_lastname")}</span>
              <input className="input" type="text" placeholder="Dupont" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" required />
            </label>
          </div>

          <label style={{ display: "grid", gap: 6 }}>
            <span className="meta" style={{ fontSize: 12 }}>{t("register_email")}</span>
            <input className="input" type="email" placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span className="meta" style={{ fontSize: 12 }}>{t("register_password")}</span>
            <div style={{ position: "relative" }}>
              <input className="input" type={showPwd ? "text" : "password"} placeholder="********" value={pwd} onChange={(e) => setPwd(e.target.value)} autoComplete="new-password" required style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPwd((v) => !v)} style={{ position: "absolute", top: 0, right: 0, height: "100%", padding: "0 12px", background: "transparent", border: 0, color: "#cfe3ff", cursor: "pointer" }}>
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span className="meta" style={{ fontSize: 12 }}>{t("register_confirm")}</span>
            <div style={{ position: "relative" }}>
              <input className="input" type={showPwd2 ? "text" : "password"} placeholder="********" value={pwd2} onChange={(e) => setPwd2(e.target.value)} autoComplete="new-password" required style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPwd2((v) => !v)} style={{ position: "absolute", top: 0, right: 0, height: "100%", padding: "0 12px", background: "transparent", border: 0, color: "#cfe3ff", cursor: "pointer" }}>
                {showPwd2 ? "🙈" : "👁️"}
              </button>
            </div>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
            <span className="meta" style={{ fontSize: 12 }}>{t("register_terms")}</span>
          </label>

          <button className="btn" type="submit" disabled={loading} style={{ height: 44, fontWeight: 800 }}>
            {loading ? t("register_submit") + "..." : t("register_submit")}
          </button>
        </form>

        <p className="meta" style={{ textAlign: "center", marginTop: 6 }}>
          {t("register_have_account")}{" "}
          <Link href="/login" style={{ textDecoration: "underline" }}>
            {t("register_to_login")}
          </Link>
        </p>
      </div>
    </main>
  );
}
