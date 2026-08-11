import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  FaUsers, FaGraduationCap, FaBriefcase, FaShieldAlt, FaBook, FaLaptopCode,
  FaCheckCircle, FaCertificate, FaRocket, FaAward, FaClock, FaUserCheck,
  FaBell, FaExclamationTriangle, FaHourglassHalf, FaCalendarTimes, FaCogs,
  FaUserPlus, FaPlusCircle, FaArrowUp, FaArrowDown
} from "react-icons/fa";

export default function ExecutiveDashboard() {
  const { data, loading, error } = useOutletContext();

  // Icons mapper for KPI cards
  const getKpiIcon = (iconName) => {
    switch (iconName) {
      case "FaUsers": return <FaUsers />;
      case "FaUserGrad": return <FaGraduationCap />;
      case "FaBriefcase": return <FaBriefcase />;
      case "FaShieldAlt": return <FaShieldAlt />;
      case "FaBook": return <FaBook />;
      case "FaLaptopCode": return <FaLaptopCode />;
      case "FaCheckCircle": return <FaCheckCircle />;
      case "FaCertificate": return <FaCertificate />;
      case "FaRocket": return <FaRocket />;
      case "FaAward": return <FaAward />;
      case "FaClock": return <FaClock />;
      case "FaUserCheck": return <FaUserCheck />;
      default: return <FaUsers />;
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "attendance": return <FaExclamationTriangle color="#f59e0b" />;
      case "approval": return <FaHourglassHalf color="#ef4444" />;
      case "certification": return <FaBell color="#00C6FF" />;
      case "deadline": return <FaCalendarTimes color="#ef4444" />;
      case "system": return <FaCogs color="#6b7280" />;
      default: return <FaBell color="#00C6FF" />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "announcement": return <FaBell color="#3b82f6" />;
      case "placement": return <FaRocket color="#8b5cf6" />;
      case "certificate": return <FaCertificate color="#00c6ff" />;
      case "course": return <FaPlusCircle color="#f59e0b" />;
      case "registration": return <FaUserPlus color="#10b981" />;
      case "promotion": return <FaUserCheck color="#6366f1" />;
      default: return <FaPlusCircle color="#00C6FF" />;
    }
  };

  if (loading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="shimmerCard" style={{ height: "140px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)" }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "16px", color: "#ef4444", textAlign: "center" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "700" }}>System Interruption</h3>
        <p style={{ marginTop: "8px", fontSize: "14px" }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Overview Greeting */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-primary)" }}>Strategic Operations Hub</h2>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px" }}>Corporate intelligence metrics aggregating students, workforce allocations, and certification status.</p>
      </div>

      {/* KPI 12-Card Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        {data.kpis && data.kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="kpiCard"
            style={{
              padding: "24px",
              background: "var(--bg-secondary)",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "600" }}>{kpi.title}</span>
                <strong style={{ display: "block", fontSize: "24px", fontWeight: "800", marginTop: "6px", color: "var(--text-primary)" }}>{kpi.value}</strong>
              </div>
              <div style={{ fontSize: "20px", color: kpi.color, background: `${kpi.color}15`, padding: "10px", borderRadius: "10px" }}>
                {getKpiIcon(kpi.icon)}
              </div>
            </div>

            {/* Sparkline & Trend */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "700", color: kpi.isIncrease ? "#10b981" : "#ef4444" }}>
                {kpi.isIncrease ? <FaArrowUp /> : <FaArrowDown />}
                <span>{Math.abs(kpi.percentageChange)}%</span>
              </div>
              {/* Mini Sparkline SVG */}
              <svg width="60" height="20" style={{ overflow: "visible" }}>
                <path
                  d={`M 0 ${20 - (kpi.sparkline[0] % 20)} L 10 ${20 - (kpi.sparkline[1] % 20)} L 20 ${20 - (kpi.sparkline[2] % 20)} L 30 ${20 - (kpi.sparkline[3] % 20)} L 40 ${20 - (kpi.sparkline[4] % 20)} L 50 ${20 - (kpi.sparkline[5] % 20)} L 60 ${20 - (kpi.sparkline[6] % 20)}`}
                  fill="none"
                  stroke={kpi.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Alerts & Activities */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "flex-start" }}>
        
        {/* Alerts Section (Section 10) */}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", padding: "28px", borderRadius: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "20px" }}>Operational Alarms & Security Alerts</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.alerts && data.alerts.map((alert, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "16px",
                  background: "var(--bg-primary)",
                  borderRadius: "12px",
                  borderLeft: `4px solid ${alert.severity === "Critical" ? "#ef4444" : (alert.severity === "Medium" ? "#f59e0b" : "#3b82f6")}`,
                }}
              >
                <div style={{ fontSize: "18px", marginTop: "2px" }}>
                  {getAlertIcon(alert.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: "13px", color: "var(--text-primary)" }}>{alert.severity} Priority</strong>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{alert.timeAgo}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities Section (Section 11) */}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", padding: "28px", borderRadius: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "20px" }}>Global Activities Log</h3>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "20px" }}>
            {data.activities && data.activities.map((act, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", position: "relative" }}>
                {/* Timeline vertical bar */}
                {i < data.activities.length - 1 && (
                  <div style={{ position: "absolute", left: "16px", top: "32px", bottom: "-20px", width: "2px", background: "var(--border-color)" }} />
                )}
                
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--bg-primary)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
                  {getActivityIcon(act.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: "13px", color: "var(--text-primary)" }}>{act.title}</strong>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{act.timeAgo}</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>{act.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
