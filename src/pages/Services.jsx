import { T } from "../theme";
import { Section, Heading, Eyebrow, Card, GlowOrb } from "../components/UI";
import { Link } from "react-router-dom";

function ServiceCard({ icon, title, desc, features }) {
  return (
    <Card glow>
      <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: 17, color: T.star, margin: "0 0 10px" }}>{title}</h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: T.text, lineHeight: 1.65, margin: "0 0 20px" }}>{desc}</p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {features.map(f => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 13, color: T.muted, marginBottom: 8 }}><span style={{ color: T.cyan, fontSize: 10 }}>◆</span> {f}</li>
        ))}
      </ul>
    </Card>
  );
}

export default function Services() {
  const services = [
    { icon: "🌐", title: "Website Design & Dev", desc: "Beautiful, fast, conversion-optimized websites tailored to your brand.", features: ["Custom UI/UX Design", "React / Node.js", "API Integrations"] },
    { icon: "🛒", title: "SaaS & E-commerce", desc: "Launch your digital store or subscription service with advanced product management.", features: ["Payment Integrations", "Database Architecture", "Admin Dashboards"] },
    { icon: "⚙️", title: "Workflow Automation", desc: "Automate your business logic bridging APIs and data endpoints.", features: ["Webhook configurations", "Data mapping", "24/7 uptime"] },
  ];

  return (
    <div style={{ position: "relative" }}>
      <GlowOrb color={T.cyan} size={400} top={-50} right={-50} opacity={0.06} />
      <Section>
        <Eyebrow>What We Build</Eyebrow>
        <Heading children={<>World-Class <span style={{ color: T.cyan }}>Web Services</span></>} sub="Need a platform for your business? We build scalable digital experiences." />
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {services.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
      </Section>
    </div>
  );
}
