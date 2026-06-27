import React from "react";
import { T } from "../theme";
import { Section, Heading, Eyebrow, GlowOrb } from "../components/UI";

export default function About() {
  return (
    <div style={{ position: "relative" }}>
      {/* Background glow to match the tech aesthetic */}
      <GlowOrb color={T.cyan} size={600} top={-50} left={-200} opacity={0.05} />

      <Section>
        {/* Page Headers */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <Eyebrow>About Us</Eyebrow>
          <Heading 
            children={<>Bridging the <span style={{ color: T.cyan }}>Digital Gap</span></>} 
            sub="Speed, Automation, and Trust for the modern digital economy." 
          />
        </div>

        {/* Main Content Container */}
        <div style={{ 
          maxWidth: "800px", 
          margin: "0 auto", 
          color: T.text, 
          fontFamily: "'Inter', sans-serif", 
          fontSize: "16px", 
          lineHeight: 1.8 
        }}>
          
          <p style={{ marginBottom: "24px" }}>
            Welcome to <strong style={{ color: T.star }}>Scifi Tech</strong>, a dynamic digital ecosystem built to simplify how you connect, work, and grow. We believe that access to essential digital services should be instant, reliable, and completely seamless. That is why we have engineered a suite of platforms dedicated to serving the modern digital needs of Ghana and beyond.
          </p>
          <p style={{ marginBottom: "48px" }}>
            From the everyday internet user to the ambitious entrepreneur, our infrastructure is designed to keep you moving forward without friction.
          </p>

          {/* Ecosystem Cards */}
          <div style={{ marginBottom: "48px" }}>
            <h3 style={{ fontFamily: "'Orbitron', monospace", color: T.star, fontSize: "22px", marginBottom: "20px" }}>Our Ecosystem</h3>
            
            <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "24px", marginBottom: "16px", transition: "transform 0.2s", cursor: "default" }}>
              <strong style={{ color: T.violet, fontSize: "18px", fontFamily: "'Orbitron', monospace" }}>Scifi Data</strong>
              <p style={{ marginTop: "12px", fontSize: "15px", color: T.muted }}>
                Staying connected shouldn't be a hassle. We provide affordable, instant telecommunications data bundles and mobile top-ups across networks like MTN, Telecel, and AirtelTigo. Our automated system ensures your data is delivered the second you hit confirm.
              </p>
            </div>

            <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "24px", marginBottom: "16px" }}>
              <strong style={{ color: T.cyan, fontSize: "18px", fontFamily: "'Orbitron', monospace" }}>Scifi Codes</strong>
              <p style={{ marginTop: "12px", fontSize: "15px", color: T.muted }}>
                Your trusted portal for digital pins and secure access codes. Whether you need an official WAEC examination result checker pin or digital gift cards, our platform guarantees instant delivery directly to your screen.
              </p>
            </div>

            <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "24px" }}>
              <strong style={{ color: T.star, fontSize: "18px", fontFamily: "'Orbitron', monospace" }}>Enterprise & SaaS Solutions</strong>
              <p style={{ marginTop: "12px", fontSize: "15px", color: T.muted }}>
                We empower other creators and businesses. Through our specialized SaaS infrastructure and API integrations, we provide the tools for entrepreneurs to launch their own data reselling websites or scale their social media marketing presence.
              </p>
            </div>
          </div>

          {/* Technology Section */}
          <div style={{ marginBottom: "48px" }}>
            <h3 style={{ fontFamily: "'Orbitron', monospace", color: T.star, fontSize: "22px", marginBottom: "16px" }}>The Technology Behind the Vision</h3>
            <p>
              Scifi Tech is built on modern, full-stack architecture. We leverage advanced automated workflows and secure, industry-leading payment processors to ensure every transaction is safe and instantaneous. By utilizing robust database management and seamless API integrations, we have eliminated the waiting times typically associated with digital purchases. Everything we build is focused on one goal: delivering a lightning-fast, highly responsive user experience.
            </p>
          </div>

          {/* Mission Section */}
          <div>
            <h3 style={{ fontFamily: "'Orbitron', monospace", color: T.star, fontSize: "22px", marginBottom: "16px" }}>Our Mission</h3>
            <p>
              Our mission is to democratize digital access. Whether we are providing a student with a crucial exam checker pin, supplying a remote worker with reliable internet data, or handing an entrepreneur the tools to start their own automated business, Scifi Tech is here to power your digital life.
            </p>
          </div>

        </div>
      </Section>
    </div>
  );
}
