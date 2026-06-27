import { useState, useEffect, useRef } from "react";
import { T } from "../theme";
import { Link } from "react-router-dom";

export function StarCanvas() {
  const canvasRef = useRef(null);
  const starsRef  = useRef([]);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();

    starsRef.current = Array.from({ length: 220 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      spd: Math.random() * 0.15 + 0.04,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach(s => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * 1.5 + s.twinkleOffset);
        const a = s.alpha * (0.4 + 0.6 * twinkle);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,244,255,${a})`;
        ctx.fill();
        s.y += s.spd;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", display: "block" }} />;
}

export function GlowOrb({ color = T.cyan, size = 400, top, left, right, bottom, opacity = 0.12 }) {
  return <div style={{ position: "absolute", width: size, height: size, borderRadius: "50%", background: color, filter: `blur(${size * 0.35}px)`, opacity, top, left, right, bottom, pointerEvents: "none", zIndex: 0 }} />;
}

export function Section({ children, style = {} }) {
  return <section style={{ position: "relative", zIndex: 1, padding: "100px 24px", maxWidth: 1200, margin: "0 auto", ...style }}>{children}</section>;
}

export function Eyebrow({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 3, color: T.cyan, textTransform: "uppercase", marginBottom: 20 }}>
      <span style={{ display: "block", width: 24, height: 1, background: T.cyan }} />{children}<span style={{ display: "block", width: 24, height: 1, background: T.cyan }} />
    </div>
  );
}

export function Heading({ children, sub }) {
  return (
    <div style={{ marginBottom: 64 }}>
      <h2 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 800, fontSize: "clamp(28px, 4vw, 46px)", color: T.star, margin: "0 0 16px", lineHeight: 1.2 }}>{children}</h2>
      {sub && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: T.muted, margin: 0, maxWidth: 580, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

export function Card({ children, accent = false, glow = false, style = {}, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ background: hov ? T.bgCardHov : T.bgCard, border: `1px solid ${hov ? (accent ? T.cyan : T.borderGlow) : T.border}`, borderRadius: 16, padding: 28, transition: "all 0.25s", boxShadow: glow && hov ? `0 0 32px ${T.cyan}22, 0 8px 32px #000a` : "0 4px 24px #0006", position: "relative", overflow: "hidden", ...style }}>
      {glow && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${accent ? T.cyan : T.violet}, transparent)`, opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />}
      {children}
    </div>
  );
}
