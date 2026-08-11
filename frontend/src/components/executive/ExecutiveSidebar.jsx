import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaChartBar, FaFileInvoice, FaSignOutAlt, FaShieldAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function ExecutiveSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/executive-login");
  };

  const navLinks = [
    { path: "/executive/dashboard", label: "Executive Dashboard", icon: <FaHome /> },
    { path: "/executive/analytics", label: "Strategic Analytics", icon: <FaChartBar /> },
    { path: "/executive/reports", label: "Reports & Exports", icon: <FaFileInvoice /> },
  ];

  return (
    <aside
      style={{
        width: "260px",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 16px",
        height: "100vh",
        position: "sticky",
        top: 0,
        zIndex: 40,
        boxSizing: "border-box",
      }}
    >
      <div>
        {/* Brand Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 8px 24px 8px" }}>
          <span style={{ fontSize: "24px", color: "#00C6FF" }}>⬢</span>
          <span style={{ fontSize: "19px", fontWeight: "800", letterSpacing: "-0.5px" }}>SkillSphere</span>
          <span
            style={{
              fontSize: "10px",
              padding: "2px 6px",
              background: "rgba(0, 198, 255, 0.15)",
              color: "#00C6FF",
              borderRadius: "8px",
              fontWeight: "700",
            }}
          >
            Exec
          </span>
        </div>

        {/* Separator line */}
        <div style={{ height: "1px", background: "var(--border-color)", marginBottom: "24px" }} />

        {/* Navigation list */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "14px",
                  background: isActive ? "linear-gradient(135deg, #00C6FF, #0072FF)" : "transparent",
                  color: isActive ? "#ffffff" : "var(--text-secondary)",
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ fontSize: "16px" }}>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls & Log out */}
      <div>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            background: "rgba(239, 68, 68, 0.08)",
            color: "#ef4444",
            border: "1px solid rgba(239, 68, 68, 0.15)",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)";
          }}
        >
          <FaSignOutAlt />
          <span>Exit Session</span>
        </button>
      </div>
    </aside>
  );
}
