Why is the page not loading the link  I have pasted in it?
import { useState } from "react";
import { T } from "../theme";
import { Section, Heading, Eyebrow, GlowOrb } from "../components/UI";

function ProductCard({ name, tagline, desc, icon, color, badge, tags, link }) {
  const [hov, setHov] = useState(false);
  
  return (
    <div 
      onClick={() => window.open(link, "_blank", "noopener,noreferrer")} // Makes whole card clickable
      onMouseEnter={() => setHov(true)} 
      onMouseLeave={() => setHov(false)} 
      style={{ 
        cursor: "pointer", // Changes mouse to pointer
        background: hov ? T.bgCardHov : T.bgCard, 
        border: `1px solid ${hov ? color + "88" : T.border}`, 
        borderRadius: 20, 
        padding: 32, 
        transition: "all 0.3s", 
        boxShadow: hov ? `0 0 40px ${color}22, 0 12px 40px #000a` : "0 4px 24px #0006", 
        position: "relative", 
        overflow: "hidden", 
        height: "100%" 
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: hov ? 1 : 0.3, transition: "opacity 0.3s" }} />
      <div style={{ width: 56, height: 56, borderRadius: 16, background: `${color}18`, border: `1px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>{icon}</div>
      {badge && <span style={{ position: "absolute", top: 20, right: 20, background: `${color}22`, border: `1px solid ${color}55`, color: color, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>{badge}</span>}
      <div style={{ fontFamily: "'Orbitron', monospace", fontWeight: 800, fontSize: 20, color: T.star, marginBottom: 6 }}>{name}</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: color, marginBottom: 12 }}>{tagline}</div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: T.text, lineHeight: 1.65, margin: "0 0 20px" }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {tags.map(tag => <span key={tag} style={{ background: `${color}12`, border: `1px solid ${color}30`, color: T.muted, fontSize: 11, padding: "3px 10px", borderRadius: 20, fontFamily: "'JetBrains Mono', monospace" }}>{tag}</span>)}
      </div>
      
      {/* Changed from <a> to <span> to prevent nested links */}
      <span
        style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${color}18`, border: `1px solid ${color}55`, color: color, fontSize: 12, fontWeight: 700, padding: "8px 18px", borderRadius: 20, fontFamily: "'JetBrains Mono', monospace", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em", transition: "background 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.background = `${color}30`}
        onMouseLeave={e => e.currentTarget.style.background = `${color}18`}
      >
        Visit Platform →
      </span>
    </div>
  );
}


export default function Products() {
  const products = [
    { name: "Scifi Codes", tagline: "Digital Pin & Gift Card Store", desc: "Your one-stop destination for digital game codes, gift cards, prepaid pins, and software licenses.", icon: "🎮", color: T.cyan, badge: "Live", tags: ["WAEC CHECKER CARDS", "Gift Cards"], link: "https://shark-empire.github.io/Babor/" },
    { name: "Scifi Data", tagline: "Data Plans & Connectivity", desc: "Affordable internet data bundles and mobile top-ups for the African market.", icon: "📡", color: T.violet, badge: "Live", tags: ["Data Bundles", "Reselling API"], link: "https://shark-empire.github.io/sci-fidatabundle/" }
  ];

  return (
    <div style={{ position: "relative" }}>
      <GlowOrb color={T.violet} size={500} top={100} left={-100} opacity={0.06} />
      <Section>
        <div style={{ textAlign: "center" }}><Eyebrow>Our Products</Eyebrow></div>
        <div style={{ textAlign: "center" }}><Heading children={<>The Scifi <span style={{ color: T.cyan }}>Ecosystem</span></>} sub="Two powerful platforms under one roof. Each built for speed, trust, and an exceptional user experience." /></div>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {products.map(p => <ProductCard key={p.name} {...p} />)}
        </div>
      </Section>
    </div>
  );
}
