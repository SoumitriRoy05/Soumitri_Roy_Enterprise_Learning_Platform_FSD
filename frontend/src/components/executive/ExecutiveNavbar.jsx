import React, { useState } from "react";
import { FaSearch, FaBell, FaSun, FaMoon, FaUserTie, FaCalendarAlt } from "react-icons/fa";

export default function ExecutiveNavbar({ themeMode, toggleTheme, dateRange, setDateRange }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);

  return (
    <header
      style={{
        height: "70px",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        position: "sticky",
        top: 0,
        zIndex: 30,
        boxSizing: "border-box",
      }}
    >
      {/* Left: Global Search & Date Filters */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            padding: "6px 12px",
            width: "300px",
          }}
        >
          <FaSearch style={{ color: "var(--text-secondary)", marginRight: "8px" }} />
          <input
            type="text"
            placeholder="Search intelligence index..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: "13px",
              width: "100%",
            }}
          />
        </div>

        {/* Date Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-secondary)" }}>
          <FaCalendarAlt />
          <span>Filters:</span>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "12px",
            }}
          />
          <span>to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "12px",
            }}
          />
        </div>
      </div>

      {/* Right: Controls & Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            padding: "8px",
            color: "var(--text-primary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          {themeMode === "dark" ? <FaSun color="#f59e0b" /> : <FaMoon />}
        </button>

        {/* Alerts Button */}
        <button
          onClick={() => setIsAlertsOpen(!isAlertsOpen)}
          style={{
            background: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "10px",
            padding: "8px",
            color: "var(--text-primary)",
            cursor: "pointer",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaBell />
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#ef4444",
            }}
          />
        </button>

        {/* Profile Card */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: "10px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-primary)",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00C6FF, #0072FF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaUserTie color="#ffffff" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <span style={{ fontSize: "12px", fontWeight: "700" }}>Executive Office</span>
              <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>CEO</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
