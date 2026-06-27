import { useState } from "react";
import { T } from "../theme";
import { Section, Eyebrow, GlowOrb } from "../components/UI";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); alert("Message Sent!"); }, 1500);
  };

  return (
    <div style={{ position: "relative" }}>
      <GlowOrb color={T.cyan} size={450} bottom={0} left={-100} opacity={0.07} />
      <Section>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <Eyebrow>Get In Touch</Eyebrow>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 42px)", color: T.star, margin: "0 0 20px", lineHeight: 1.2 }}>
              Let's Build Something <span style={{ color: T.cyan }}>Extraordinary</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: T.text, lineHeight: 1.8, marginBottom: 40 }}>
              Have a project in mind? Whether it's a new web portal, automating telecom data logic, or anything in between — our team is ready to launch it.
            </p>
          </div>

          <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 20, padding: 36 }}>
            <form onSubmit={submit} style={{ display: "grid", gap: 20 }}>
              <input required placeholder="Your Name" style={{ width: "100%", background: "#060D1C", border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px", color: T.star, outline: "none" }} />
              <input required type="email" placeholder="Email Address" style={{ width: "100%", background: "#060D1C", border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px", color: T.star, outline: "none" }} />
              <textarea required placeholder="Project details..." rows={5} style={{ width: "100%", background: "#060D1C", border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px", color: T.star, outline: "none" }} />
              <button disabled={loading} style={{ background: `linear-gradient(135deg, ${T.cyan}, ${T.violet})`, border: "none", borderRadius: 12, padding: "16px", color: "#fff", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Orbitron', monospace" }}>
                {loading ? "Transmitting..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
}
