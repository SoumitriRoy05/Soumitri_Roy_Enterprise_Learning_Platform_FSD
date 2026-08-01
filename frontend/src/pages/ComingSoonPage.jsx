import React from "react";

export default function ComingSoonPage({ title = "This Page" }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100vh",
      background: "var(--bg-primary)", color: "var(--text-primary)",
      fontFamily: "Orbitron, sans-serif", gap: "16px"
    }}>
      <h1 style={{ fontSize: "2rem", color: "var(--accent)" }}>{title}</h1>
      <p style={{ fontSize: "1.1rem", opacity: 0.7 }}>Coming Soon — Stay tuned!</p>
    </div>
  );
}
