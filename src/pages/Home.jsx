import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { T } from "../theme";
import { Section, GlowOrb, StatCounter } from "../components/UI";

function TypedText({ words }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = words[idx];
    let timeout;
    if (!del && txt === full)  { timeout = setTimeout(() => setDel(true), 2200); }
    else if (del && txt === "") { setDel(false); setIdx(i => (i + 1) % words.length); }
    else if (!del)              { timeout = setTimeout(() => setTxt(full.slice(0, txt.length + 1)), 65); }
    else                        { timeout = setTimeout(() => setTxt(txt.slice(0, -1)), 38); }
    return () => clearTimeout(timeout);
  }, [txt, del, idx, words]);

  return (
    <span style={{ color: T.cyan }}>
      {txt}
      <span style={{
        display: "inline-block", width: 3, height: "0.9em",
        background: T.cyan, marginLeft: 4, verticalAlign: "middle",
        animation: "blink 1s step-end infinite",
      }} />
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", minHeight: "calc(100vh - 68px)" }}>
        <GlowOrb color={T.cyan}   size={600} top={-100} left={-150} opacity={0.08} />
        <GlowOrb color={T.violet} size={500} top={200}  right={-100} opacity={0.07} />

        <Section style={{ width: "100%", padding: "80px 24px 100px" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }}>

            {/* Text */}
            <div>
              <div className="hero-animate" style={{ marginBottom: 24 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: `${T.cyan}12`, border: `1px solid ${T.cyan}30`,
                  borderRadius: 20, padding: "6px 16px",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  fontWeight: 700, color: T.cyan, letterSpacing: 2, textTransform: "uppercase",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.cyan, animation: "pulse-glow 2s infinite", display: "inline-block" }} />
                  Scifi Universe — Now Online
                </span>
              </div>

              <h1 className="hero-animate-2" style={{
                fontFamily: "'Orbitron', monospace", fontWeight: 900,
                fontSize: "clamp(36px, 6vw, 74px)",
                color: T.star, lineHeight: 1.1, margin: "0 0 12px",
              }}>
                The Future of<br />
                <TypedText words={["Digital Commerce","Web Solutions","Data Services","Your Business"]} />
              </h1>

              <p className="hero-animate-3" style={{
                fontFamily: "'Inter', sans-serif", fontSize: 18,
                color: T.text, lineHeight: 1.75, maxWidth: 540,
                margin: "24px 0 40px",
              }}>
                Scifi Tech is the parent company powering{" "}
                <strong style={{ color: T.star }}>Scifi Codes</strong>,{" "}
                <strong style={{ color: T.violet }}>Scifi Data</strong>, and future digital ventures — plus world-class
                website creation services for businesses ready to level up.
              </p>

              <div className="hero-animate-4 hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Link to="/products" style={{
                  textDecoration: "none",
                  background: `linear-gradient(135deg, ${T.cyan}, ${T.violet})`,
                  border: "none", borderRadius: 12,
                  padding: "16px 32px", color: "#fff",
                  fontSize: 15, fontWeight: 700,
                  fontFamily: "'Orbitron', monospace", letterSpacing: 0.5,
                  display: "inline-block",
                }}>Explore Products →</Link>

                <Link to="/contact" style={{
                  textDecoration: "none",
                  background: "transparent",
                  border: `1px solid ${T.border}`,
                  borderRadius: 12, padding: "16px 32px",
                  color: T.text, fontSize: 15, fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  display: "inline-block",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.cyan; e.currentTarget.style.color = T.cyan; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}
                >Build My Website</Link>
              </div>
            </div>

            {/* Orbital graphic — hidden on mobile via .hero-graphic CSS class */}
            <div className="hero-graphic" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "relative", width: 220, height: 220 }}>
                <svg className="orbital-ring" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 220 220">
                  <circle cx="110" cy="110" r="100" fill="none" stroke={`${T.cyan}30`} strokeWidth="1" strokeDasharray="8 6" />
                  <circle cx="110" cy="10"  r="6" fill={T.cyan}   opacity="0.8" />
                  <circle cx="210" cy="110" r="4" fill={T.violet} opacity="0.7" />
                  <circle cx="110" cy="210" r="5" fill={T.cyan}   opacity="0.5" />
                </svg>
                <svg style={{ position: "absolute", inset: 20, width: "calc(100% - 40px)", height: "calc(100% - 40px)", animation: "spin-slow 12s linear infinite reverse" }} viewBox="0 0 180 180">
                  <circle cx="90" cy="90" r="80" fill="none" stroke={`${T.violet}30`} strokeWidth="1" strokeDasharray="4 8" />
                  <circle cx="90"  cy="10" r="5" fill={T.violet} opacity="0.8" />
                  <circle cx="170" cy="90" r="3" fill={T.cyan}   opacity="0.6" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", animation: "float 4s ease-in-out infinite" }}>
                  <div style={{
                    width: 100, height: 100, borderRadius: 28,
                    background: `linear-gradient(135deg, ${T.cyan}22, ${T.violet}22)`,
                    border: `2px solid ${T.cyan}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 30, color: T.cyan,
                    boxShadow: `0 0 40px ${T.cyan}22`,
                  }}>ST</div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            <StatCounter value="5000"  suffix="+" label="Happy Customers" />
            <StatCounter value="2"              label="Active Products" />
            <StatCounter value="50000" suffix="+" label="Codes Delivered" />
            <StatCounter value="99"    suffix="%" label="Uptime Guaranteed" />
          </div>
        </div>
      </div>
    </>
  );
}
