import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import StudentFooter from "../components/StudentFooter";
import NotificationDropdown from "../components/NotificationDropdown";
import {
  FaHome, FaBook, FaCodeBranch, FaAward, FaCertificate, FaChartLine,
  FaFileInvoice, FaCog, FaSearch, FaSun, FaMoon, FaArrowLeft,
  FaSignOutAlt, FaChartBar, FaUsers, FaDollarSign, FaRobot, FaRocket, FaBolt, FaCode
} from "react-icons/fa";
import "../styles/studentDashboard.css";

import AppLogo from "../components/AppLogo";

export default function ExecutiveDashboardPage() {
  const { user, xp, logout, themeMode, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  const departmentMetrics = [
    { name: "Engineering", employeesCount: 450, complianceRate: 94, budgetSpent: "$24,500" },
    { name: "Design", employeesCount: 120, complianceRate: 88, budgetSpent: "$8,200" },
    { name: "Marketing", employeesCount: 85, complianceRate: 72, budgetSpent: "$3,400" },
    { name: "Sales", employeesCount: 140, complianceRate: 80, budgetSpent: "$5,100" }
  ];

  const keyPerformanceMetrics = [
    { title: "Total Training Hours", value: "3,480 hrs", icon: <FaChartBar />, color: "#3b82f6" },
    { title: "Active Corporate Learners", value: "795 Active", icon: <FaUsers />, color: "#10b981" },
    { title: "Average Exam Passing Score", value: "84.5%", icon: <FaAward />, color: "#f59e0b" },
    { title: "Educational Training ROI", value: "142%", icon: <FaDollarSign />, color: "#ec4899" }
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "student-profile", label: "Student Profile", icon: <FaAward /> },
    { id: "services-catalog", label: "Services & Catalog", icon: <FaBook /> },
    { id: "assessments", label: "Assessments", icon: <FaBolt /> },
    { id: "certification-tracking", label: "Cert Tracking", icon: <FaCertificate /> },
    { id: "tracking-dashboard", label: "Tracking Dashboard", icon: <FaChartLine /> },
    { id: "complaint-tracking", label: "Complaint & Renewal", icon: <FaFileInvoice /> },
    { id: "career-roadmap", label: "Career Roadmap", icon: <FaCodeBranch /> },
    { id: "courses", label: "Courses", icon: <FaBook /> },
    { id: "learning-paths", label: "Learning Paths", icon: <FaCodeBranch /> },
    { id: "ai-buddy", label: "AI Study Buddy", icon: <FaRobot /> },
    { id: "opportunity-feed", label: "Opportunity Feed", icon: <FaRocket /> },
    { id: "daily-quests", label: "Daily Quests", icon: <FaBolt /> },
    { id: "badges", label: "Badges", icon: <FaAward /> },
    { id: "certificates", label: "Certificates", icon: <FaCertificate /> },
    { id: "progress", label: "Progress", icon: <FaChartLine /> },
    { id: "resume", label: "Resume Builder", icon: <FaFileInvoice /> },
    { id: "code-arena", label: "CodeArena", icon: <FaCode /> }
  ];

  return (
    <div className={`sdDashboardWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />

      <div className="sdMainContainer">
        {/* Left Sidebar */}
        <aside className="sdLeftSidebar">
          <div>
            <Link to="/" className="sdBrandLogo" style={{ display: "inline-flex", alignItems: "center" }}>
              <AppLogo height="58px" />
            </Link>
            <div className="sdSidebarHomeArchHeader">
              <div className="sdArchLine" />
              <button className="sdHomeCircularBtn" onClick={() => navigate("/workforce-dashboard")}>
                <FaHome />
              </button>
            </div>
            <ul className="sdNavList">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sdNavItem ${item.id === "progress" ? "active" : ""}`}
                    onClick={() => {
                      if (item.id === "dashboard") navigate("/student-home");
                      else navigate(`/${item.id}`);
                    }}
                  >
                    <span className="navIcon">{item.icon}</span>
                    <span className="navLabel">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="sdSidebarBottomSection">
            <div className="sdSidebarFooterControls">
              <button className="sdThemeToggleBtn" onClick={toggleTheme}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
              <span className="sdControlDivider">|</span>
              <button className="sdCollapseBtn" onClick={() => navigate(-1)}>
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="sdRightBodyArea">
          <header className="sdTopHeaderBar">
            <div className="sdSearchWrapper">
              <FaSearch className="sdSearchIcon" />
              <input type="text" className="sdSearchInput" placeholder="Search executive metrics..." />
            </div>
            <div className="sdHeaderActionsRow">
              <div className="sdXpBadgePill">
                <FaBolt color="#F9572A" /> <span>{xp ?? 0} XP</span>
              </div>
              <NotificationDropdown type="admin" />
              <button className="sdLogoutHeaderBtn" onClick={handleLogout}>
                <FaSignOutAlt /> <span>Logout</span>
              </button>
              <div className="sdUserProfilePillWrapper">
                <div className="sdUserProfilePill">
                  <div className="sdUserAvatarImg">📊</div>
                  <div className="sdUserInfoText">
                    <strong>Corporate Portal</strong>
                    <span>Stakeholder</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="sdGreetingHeader">
            <h1>Executive Dashboard</h1>
            <p>Analyze organization competency distribution, training compliance, and budget ROI performance.</p>
          </div>

          {/* Core metrics overview row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" }}>
            {keyPerformanceMetrics.map((kpi, idx) => (
              <div key={idx} style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)", display: "flex", gap: "16px", alignItems: "center" }}>
                <div style={{ fontSize: "24px", color: kpi.color, background: "var(--border-color)", padding: "12px", borderRadius: "8px", display: "flex", alignItems: "center" }}>
                  {kpi.icon}
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{kpi.title}</span>
                  <strong style={{ display: "block", fontSize: "20px", color: "var(--text-primary)", marginTop: "4px" }}>{kpi.value}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="sdDashboardContentGrid">
            {/* Center column: Table of department metrics */}
            <div className="sdCenterMainCol">
              <div className="sdWhitePanelCard">
                <h3>Department Breakdown</h3>
                <div style={{ overflowX: "auto", marginTop: "16px" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <th style={{ padding: "12px", color: "var(--text-secondary)" }}>Department</th>
                        <th style={{ padding: "12px", color: "var(--text-secondary)" }}>Employees</th>
                        <th style={{ padding: "12px", color: "var(--text-secondary)" }}>Compliance Rate</th>
                        <th style={{ padding: "12px", color: "var(--text-secondary)" }}>Budget Utilization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentMetrics.map((dep, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <td style={{ padding: "16px 12px", color: "var(--text-primary)", fontWeight: "bold" }}>{dep.name}</td>
                          <td style={{ padding: "16px 12px", color: "var(--text-secondary)" }}>{dep.employeesCount} learners</td>
                          <td style={{ padding: "16px 12px" }}>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                              <span style={{ color: "var(--accent)", fontWeight: "bold" }}>{dep.complianceRate}%</span>
                              <div style={{ width: "80px", height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px" }}>
                                <div style={{ width: `${dep.complianceRate}%`, height: "100%", background: "var(--accent)", borderRadius: "3px" }}></div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "16px 12px", color: "var(--text-primary)" }}>{dep.budgetSpent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StudentFooter />
    </div>
  );
}
