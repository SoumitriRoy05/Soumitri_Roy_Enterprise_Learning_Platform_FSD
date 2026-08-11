import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ExecutiveSidebar from "./ExecutiveSidebar";
import ExecutiveNavbar from "./ExecutiveNavbar";
import { useAuth } from "../../context/AuthContext";

export default function ExecutiveLayout() {
  const { authenticatedFetch } = useAuth();
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("skillsphere_theme_mode") || "dark";
  });
  const [dateRange, setDateRange] = useState({ start: "2026-05-01", end: "2026-06-30" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await authenticatedFetch(`${API_URL}/api/executive/dashboard`);
      if (!res.ok) throw new Error("Failed to fetch executive dashboard data");
      const json = await res.json();
      if (json.success) {
        setData(json);
      } else {
        throw new Error(json.message || "Failed to load dashboard insights");
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [authenticatedFetch]);

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("skillsphere_theme_mode", next);
      return next;
    });
  };

  useEffect(() => {
    // Apply styling tokens globally based on theme
    const root = document.documentElement;
    if (themeMode === "dark") {
      root.classList.add("dark-theme");
      root.style.setProperty("--bg-primary", "#0a0f1d");
      root.style.setProperty("--bg-secondary", "#111827");
      root.style.setProperty("--border-color", "#1f2937");
      root.style.setProperty("--text-primary", "#f3f4f6");
      root.style.setProperty("--text-secondary", "#9ca3af");
    } else {
      root.classList.remove("dark-theme");
      root.style.setProperty("--bg-primary", "#f9fafb");
      root.style.setProperty("--bg-secondary", "#ffffff");
      root.style.setProperty("--border-color", "#e5e7eb");
      root.style.setProperty("--text-primary", "#111827");
      root.style.setProperty("--text-secondary", "#4b5563");
    }
  }, [themeMode]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        fontFamily: "'Inter', sans-serif",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Sidebar navigation */}
      <ExecutiveSidebar />

      {/* Main viewport */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Shared Navbar */}
        <ExecutiveNavbar
          themeMode={themeMode}
          toggleTheme={toggleTheme}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        {/* Dynamic page outlet */}
        <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
          <Outlet context={{ dateRange, data, loading, error, refetch: fetchDashboardData }} />
        </main>
      </div>
    </div>
  );
}
