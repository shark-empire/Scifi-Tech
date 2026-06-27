import { useState } from "react";
import { T } from "../theme";
import { Section, Heading, Eyebrow, GlowOrb } from "../components/UI";

/* ─── PRODUCT CARD ───────────────────────────────────────────────────────
   Fix: the outer div was catching clicks but `window.open` inside onClick
   of a div can be blocked by browsers as a popup (not a trusted user event
   in all cases). Using a proper <a> tag wrapping the whole card is the
   correct, reliable solution. It works in all browsers, is accessible,
   and opens the link correctly every time.
──────────────────────────────────────────────────────────────────────── */
function ProductCard({ name, tagline, desc, icon, color, badge, tags, link }) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        // Reset <a> defaults
        textDecoration: "none",
        display: "block",
        height: "100%",
        // Card styles
        background:    hov ? T.bgCardHov : T.bgCard,
        border:        `1px solid ${hov ? color + "88" : T.border}`,
        borderRadius:  20,
        padding:       32,
        transition:    "all 0.3s",
        boxShadow:     hov ? `0 0 40px ${color}22, 0 12px 40px #000a` : "0 4px 24px #0006",
        position:      "relative",
        overflow:      "hidden",
        cursor:        "pointer",
        boxSizing:     "border-box",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: hov ? 1 : 0.3, transition: "opacity 0.3s",
      }} />

      {/* Icon */}
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: `${color}18`, border: `1px solid ${color}44`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, marginBottom: 20,
      }}>{icon}</div>

      {/* Badge */}
      {badge && (
        <span style={{
          position: "absolute", top: 20, right: 20,
          background: `${color}22`, border: `1px solid ${color}55`,
          color, fontSize: 10, fontWeight: 700,
          padding: "3px 10px", borderRadius: 20,
          fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase",
        }}>{badge}</span>
      )}

      {/* Name */}
      <div style={{
        fontFamily: "'Orbitron', monospace", fontWeight: 800,
        fontSize: 20, color: T.star, marginBottom: 6,
      }}>{name}</div>

      {/* Tagline */}
      <div style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 600,
        fontSize: 13, color, marginBottom: 12,
      }}>{tagline}</div>

      {/* Description */}
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: 14,
        color: T.text, lineHeight: 1.65, margin: "0 0 20px",
      }}>{desc}</p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {tags.map(tag => (
          <span key={tag} style={{
            background: `${color}12`, border: `1px solid ${color}30`,
            color: T.muted, fontSize: 11, padding: "3px 10px", borderRadius: 20,
            fontFamily: "'JetBrains Mono', monospace",
          }}>{tag}</span>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: `${color}18`, border: `1px solid ${color}55`,
        color, fontSize: 12, fontWeight: 700,
        padding: "8px 18px", borderRadius: 20,
        fontFamily: "'JetBrains Mono', monospace",
        textTransform: "uppercase", letterSpacing: "0.05em",
        opacity: hov ? 1 : 0.6, transition: "opacity 0.25s",
      }}>
        Visit Platform →
      </div>
    </a>
  );
}

export default function Products() {
  const products = [
    {
      name:    "Scifi Codes",
      tagline: "Digital Pin & Gift Card Store",
      desc:    "Your one-stop destination for digital game codes, gift cards, prepaid pins, and software licenses. Instant delivery, trusted sources, best prices in the galaxy.",
      icon:    "🎮",
      color:   T.cyan,
      badge:   "Live",
      tags:    ["WAEC Checker Cards", "Gift Cards", "Instant Delivery"],
      link:    "https://shark-empire.github.io/Babor/",
    },
    {
      name:    "Scifi Data",
      tagline: "Data Plans & Connectivity",
      desc:    "Affordable internet data bundles and mobile top-ups for the African market. Stay connected wherever your journey takes you.",
      icon:    "📡",
      color:   T.violet,
      badge:   "Live",
      tags:    ["Data Bundles", "Mobile Top-Up", "Reselling API"],
      link:    "https://shark-empire.github.io/sci-fidatabundle/",
    },
  ];

  const comingSoon = [
    { name: "Scifi Learn", desc: "Online courses and tech education for the next generation of digital builders.", icon: "📚", color: "#FF6B35" },
    { name: "Scifi Cloud", desc: "Managed cloud hosting and VPS solutions for developers.", icon: "☁️", color: "#00FF88" },
    { name: "Scifi Pay",   desc: "Seamless digital payments built for the African market.", icon: "💳", color: T.cyan },
  ];

  return (
    <div style={{ position: "relative" }}>
      <GlowOrb color={T.violet} size={500} top={100} left={-100} opacity={0.06} />

      <Section>
        <div style={{ textAlign: "center" }}><Eyebrow>Our Products</Eyebrow></div>
        <div style={{ textAlign: "center" }}>
          <Heading
            children={<>The Scifi <span style={{ color: T.cyan }}>Ecosystem</span></>}
            sub="Two powerful platforms under one roof — plus more launching soon. Each built for speed, trust, and an exceptional user experience."
          />
        </div>

        {/* Live products */}
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 56 }}>
          {products.map(p => <ProductCard key={p.name} {...p} />)}
        </div>

        {/* Coming soon */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              fontWeight: 700, color: T.muted, letterSpacing: 2, textTransform: "uppercase",
            }}>Launching Soon</span>
            <div style={{ flex: 1, height: 1, background: T.border }} />
          </div>

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {comingSoon.map(({ name, desc, icon, color }) => (
              <div key={name} style={{
                background: T.bgCard, border: `1px dashed ${T.border}`,
                borderRadius: 16, padding: 24, position: "relative", overflow: "hidden",
              }}>
                <span style={{
                  position: "absolute", top: 14, right: 14,
                  background: `${color}18`, border: `1px solid ${color}44`,
                  color, fontSize: 9, fontWeight: 700,
                  padding: "3px 9px", borderRadius: 20, letterSpacing: 1.5,
                  fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase",
                }}>Coming Soon</span>
                <div style={{ fontSize: 28, marginBottom: 12, opacity: 0.5 }}>{icon}</div>
                <div style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: 16, color: T.muted, marginBottom: 8 }}>{name}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: T.muted, lineHeight: 1.6, margin: 0, opacity: 0.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
