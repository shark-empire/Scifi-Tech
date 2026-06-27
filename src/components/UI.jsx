import { useState, useEffect, useRef } from "react";
import { T } from "../theme";

/* ─── STAR CANVAS ────────────────────────────────────────────────────────
   Lives in App.jsx (outside routes) so it mounts ONCE for the entire
   app lifetime. Scroll warp effect re-added.
──────────────────────────────────────────────────────────────────────── */
export function StarCanvas() {
  const canvasRef = useRef(null);
  const starsRef  = useRef([]);
  const rafRef    = useRef(null);
  const scrollRef = useRef(0); // restored: needed for warp effect

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    starsRef.current = Array.from({ length: 220 }, () => ({
      x:             Math.random() * window.innerWidth,
      y:             Math.random() * window.innerHeight,
      r:             Math.random() * 1.4 + 0.2,
      spd:           Math.random() * 0.15 + 0.04,
      alpha:         Math.random() * 0.7 + 0.2,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Track scroll for the warp effect
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    let t = 0;
    const draw = () => {
      t += 0.008;
      const warpFactor = Math.min(scrollRef.current / 600, 2.5);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(s => {
        const twinkle = 0.5 + 0.5 * Math.sin(t * 1.5 + s.twinkleOffset);
        const a = s.alpha * (0.4 + 0.6 * twinkle);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,244,255,${a})`;
        ctx.fill();
        s.y += s.spd * (1 + warpFactor * 3);
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", display: "block" }}
    />
  );
}

/* ─── GLOW ORB ───────────────────────────────────────────────────────── */
export function GlowOrb({ color = T.cyan, size = 400, top, left, right, bottom, opacity = 0.12 }) {
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      background: color, filter: `blur(${size * 0.35}px)`, opacity,
      top, left, right, bottom, pointerEvents: "none", zIndex: 0,
    }} />
  );
}

/* ─── SECTION ────────────────────────────────────────────────────────── */
export function Section({ children, style = {} }) {
  return (
    <section style={{
      position: "relative", zIndex: 1, padding: "100px 24px",
      maxWidth: 1200, margin: "0 auto", ...style,
    }}>
      {children}
    </section>
  );
}

/* ─── EYEBROW ────────────────────────────────────────────────────────── */
export function Eyebrow({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      fontWeight: 700, letterSpacing: 3, color: T.cyan,
      textTransform: "uppercase", marginBottom: 20,
    }}>
      <span style={{ display: "block", width: 24, height: 1, background: T.cyan }} />
      {children}
      <span style={{ display: "block", width: 24, height: 1, background: T.cyan }} />
    </div>
  );
}

/* ─── HEADING ────────────────────────────────────────────────────────── */
export function Heading({ children, sub }) {
  return (
    <div style={{ marginBottom: 64 }}>
      <h2 style={{
        fontFamily: "'Orbitron', monospace", fontWeight: 800,
        fontSize: "clamp(28px, 4vw, 46px)", color: T.star,
        margin: "0 0 16px", lineHeight: 1.2,
      }}>{children}</h2>
      {sub && (
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 17,
          color: T.muted, margin: 0, maxWidth: 580, lineHeight: 1.7,
        }}>{sub}</p>
      )}
    </div>
  );
}

/* ─── CARD ───────────────────────────────────────────────────────────── */
export function Card({ children, accent = false, glow = false, style = {}, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: hov ? T.bgCardHov : T.bgCard,
        border: `1px solid ${hov ? (accent ? T.cyan : T.borderGlow) : T.border}`,
        borderRadius: 16, padding: 28, transition: "all 0.25s",
        boxShadow: glow && hov ? `0 0 32px ${T.cyan}22, 0 8px 32px #000a` : "0 4px 24px #0006",
        cursor: onClick ? "pointer" : "default",
        position: "relative", overflow: "hidden", ...style,
      }}
    >
      {glow && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${accent ? T.cyan : T.violet}, transparent)`,
          opacity: hov ? 1 : 0, transition: "opacity 0.3s",
        }} />
      )}
      {children}
    </div>
  );
}

/* ─── STAT COUNTER ───────────────────────────────────────────────────── */
export function StatCounter({ value, label, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref      = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const end   = parseInt(value);
        const steps = 50;
        const step  = end / steps;
        let cur = 0;
        const id = setInterval(() => {
          cur += step;
          if (cur >= end) { setCount(end); clearInterval(id); }
          else setCount(Math.floor(cur));
        }, 30);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'Orbitron', monospace", fontWeight: 900,
        fontSize: "clamp(36px, 5vw, 58px)", color: T.cyan, lineHeight: 1, marginBottom: 8,
      }}>{count.toLocaleString()}{suffix}</div>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: 14, color: T.muted, letterSpacing: 0.5,
      }}>{label}</div>
    </div>
  );
}
