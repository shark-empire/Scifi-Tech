import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { T } from "../theme";

// NOTE: StarCanvas is NOT here anymore.
// It lives in App.jsx so it mounts once and never re-renders on navigation.
export default function Layout() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top + close mobile menu on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileOpen(false);
  }, [location.pathname]);

  const links = [
    { name: "Home",     path: "/" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "About",    path: "/about" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        backdropFilter: "blur(20px)",
        background: scrolled ? "rgba(5,10,20,0.92)" : "rgba(5,10,20,0.6)",
        borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 68,
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `linear-gradient(135deg, ${T.cyan}, ${T.violet})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 15,
              color: "#fff", letterSpacing: -1,
            }}>ST</div>
            <span style={{
              fontFamily: "'Orbitron', monospace", fontWeight: 700,
              fontSize: 17, color: T.star, letterSpacing: 1,
            }}>SCIFI <span style={{ color: T.cyan }}>TECH</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="nav-links" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {links.map(l => (
              <Link key={l.name} to={l.path} style={{
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
                color: isActive(l.path) ? T.cyan : T.text,
                padding: "8px 14px", borderRadius: 8, transition: "color 0.2s",
                borderBottom: isActive(l.path) ? `2px solid ${T.cyan}` : "2px solid transparent",
              }}>{l.name}</Link>
            ))}
            <Link to="/contact" style={{
              marginLeft: 8, textDecoration: "none",
              background: `linear-gradient(135deg, ${T.cyan}22, ${T.violet}22)`,
              border: `1px solid ${T.cyan}55`,
              borderRadius: 8, padding: "9px 20px",
              color: T.cyan, fontSize: 14, fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
            }}>Get Started</Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="hamburger"
            style={{
              display: "none", background: "none",
              border: `1px solid ${T.border}`, borderRadius: 8,
              padding: "8px 12px", color: T.text, fontSize: 20, cursor: "pointer",
            }}
          >{mobileOpen ? "✕" : "☰"}</button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: "rgba(5,10,20,0.98)", borderTop: `1px solid ${T.border}`, padding: 16 }}>
            {[...links, { name: "Contact", path: "/contact" }].map(l => (
              <Link key={l.name} to={l.path} style={{
                display: "block", textDecoration: "none",
                fontFamily: "'Inter', sans-serif", fontSize: 15,
                color: isActive(l.path) ? T.cyan : T.text,
                padding: "12px 8px", borderBottom: `1px solid ${T.border}`,
              }}>{l.name}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* ── PAGE CONTENT ── */}
      <main style={{ minHeight: "100vh", paddingTop: 68, position: "relative", zIndex: 1 }}>
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        position: "relative", zIndex: 1,
        borderTop: `1px solid ${T.border}`,
        padding: "60px 24px 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40, marginBottom: 48,
          }}>

            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: `linear-gradient(135deg, ${T.cyan}, ${T.violet})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 12, color: "#fff",
                }}>ST</div>
                <span style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: 14, color: T.star }}>SCIFI TECH</span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: T.muted, lineHeight: 1.7, maxWidth: 210, margin: 0 }}>
                Building the digital future — one website at a time.
              </p>
            </div>

            {/* Navigate */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: T.cyan, letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>Navigate</div>
              {[...links, { name: "Contact", path: "/contact" }].map(l => (
                <Link key={l.name} to={l.path} style={{
                  display: "block", fontFamily: "'Inter', sans-serif",
                  fontSize: 14, color: T.text, marginBottom: 10,
                  textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = T.cyan}
                onMouseLeave={e => e.currentTarget.style.color = T.text}
                >{l.name}</Link>
              ))}
            </div>

            {/* Products */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: T.cyan, letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>Products</div>
              {[
                { name: "Scifi Codes", url: "https://shark-empire.github.io/Babor/" },
                { name: "Scifi Data",  url: "https://shark-empire.github.io/sci-fidatabundle/" },
              ].map(({ name, url }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={{
                  display: "block", fontFamily: "'Inter', sans-serif",
                  fontSize: 14, color: T.text, marginBottom: 10,
                  textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = T.cyan}
                onMouseLeave={e => e.currentTarget.style.color = T.text}
                >{name}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: T.cyan, letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>Contact</div>
              {[
                ["📧", "hello@scifitech.io"],
                ["💼", "business@scifitech.io"],
                ["🌍", "Available Worldwide"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Inter', sans-serif", fontSize: 13, color: T.muted, marginBottom: 12 }}>
                  <span>{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: `1px solid ${T.border}`, paddingTop: 24,
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
          }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: T.muted }}>
              © {new Date().getFullYear()} Scifi Tech. All rights reserved.
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.border, letterSpacing: 1 }}>
              BUILT WITH ◆ IN THE DIGITAL COSMOS
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
