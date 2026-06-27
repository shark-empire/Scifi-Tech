import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { T } from "../theme";
import { StarCanvas } from "./UI";

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileOpen(false);
  }, [location.pathname]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <StarCanvas />
      
      {/* NAVIGATION */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, backdropFilter: "blur(20px)", background: scrolled ? "rgba(5,10,20,0.92)" : "rgba(5,10,20,0.6)", borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent", transition: "all 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${T.cyan}, ${T.violet})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: 15, color: "#fff", letterSpacing: -1 }}>ST</div>
            <span style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: 17, color: T.star, letterSpacing: 1 }}>SCIFI <span style={{ color: T.cyan }}>TECH</span></span>
          </Link>

          <div className="nav-links" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {links.map(l => (
              <Link key={l.name} to={l.path} style={{ textDecoration: "none", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: location.pathname === l.path ? T.cyan : T.text, padding: "8px 14px", borderRadius: 8, transition: "all 0.2s", borderBottom: location.pathname === l.path ? `2px solid ${T.cyan}` : "2px solid transparent" }}>
                {l.name}
              </Link>
            ))}
            <Link to="/contact" style={{ marginLeft: 8, textDecoration: "none", background: `linear-gradient(135deg, ${T.cyan}22, ${T.violet}22)`, border: `1px solid ${T.cyan}55`, borderRadius: 8, padding: "9px 20px", color: T.cyan, fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Get Started</Link>
          </div>

          <button onClick={() => setMobileOpen(o => !o)} className="hamburger" style={{ display: "none", background: "none", border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 12px", color: T.text, fontSize: 20 }}>{mobileOpen ? "✕" : "☰"}</button>
        </div>

        {mobileOpen && (
          <div style={{ background: "rgba(5,10,20,0.98)", borderTop: `1px solid ${T.border}`, padding: 16 }}>
            {[...links, {name: "Contact", path: "/contact"}].map(l => (
              <Link key={l.name} to={l.path} style={{ display: "block", width: "100%", textDecoration: "none", fontFamily: "'Inter', sans-serif", fontSize: 15, color: location.pathname === l.path ? T.cyan : T.text, padding: "12px 8px", borderBottom: `1px solid ${T.border}` }}>{l.name}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* DYNAMIC PAGE CONTENT */}
      <main style={{ minHeight: "100vh", paddingTop: 68 }}>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${T.border}`, padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: T.muted }}>© {new Date().getFullYear()} Scifi Tech. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
