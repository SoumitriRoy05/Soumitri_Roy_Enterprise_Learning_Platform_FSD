import React, { useState } from "react";
import { FaBell, FaCheckCircle, FaTimes, FaAward, FaHourglassHalf, FaBolt, FaRobot, FaBriefcase, FaUserCheck, FaChartLine } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function NotificationDropdown({ type = "student" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(4);

  // Read theme mode safely from AuthContext
  let themeMode = "light";
  try {
    const auth = useAuth();
    if (auth && auth.themeMode) {
      themeMode = auth.themeMode;
    }
  } catch (e) {
    themeMode = "light";
  }

  const isLight = themeMode === "light";

  const studentNotifications = [
    {
      id: 1,
      title: "Certificate Verified & Issued 🏆",
      desc: "Your React Developer Path Certificate is ready for PNG download & LinkedIn sharing.",
      time: "10 mins ago",
      icon: <FaAward color="#F9572A" />,
      read: false
    },
    {
      id: 2,
      title: "Course Payment Request ⏳",
      desc: "Payment for Next.js 14 Masterclass received. Waiting for Admin Approval in Admin Dashboard.",
      time: "45 mins ago",
      icon: <FaHourglassHalf color="#F59E0B" />,
      read: false
    },
    {
      id: 3,
      title: "+100 XP Quest Bonus ⚡",
      desc: "Earned +100 XP for completing Daily Login & Quiz Streak!",
      time: "2 hours ago",
      icon: <FaBolt color="#10B981" />,
      read: false
    },
    {
      id: 4,
      title: "AI Study Buddy Alert 🤖",
      desc: "New practice quiz available for Data Structures & Algorithms.",
      time: "5 hours ago",
      icon: <FaRobot color="#38BDF8" />,
      read: false
    }
  ];

  const workforceNotifications = [
    {
      id: 101,
      title: "Pending Course Purchase Approval ⏳",
      desc: "Student Soumitri requested enrollment for React.js Development (Fee: ₹4,999).",
      time: "15 mins ago",
      icon: <FaHourglassHalf color="#F59E0B" />,
      read: false
    },
    {
      id: 102,
      title: "Sprint Task Assignment 📋",
      desc: "New task assigned: Refactor Microservices Authentication API in Node.js.",
      time: "45 mins ago",
      icon: <FaBriefcase color="#38BDF8" />,
      read: false
    },
    {
      id: 103,
      title: "Employee Leave Request Pending 👥",
      desc: "Employee Leave Request submitted by Alex for Aug 5 - Aug 7.",
      time: "2 hours ago",
      icon: <FaUserCheck color="#10B981" />,
      read: false
    },
    {
      id: 104,
      title: "System Performance Report 📊",
      desc: "System performance report generated with 99.9% platform uptime.",
      time: "4 hours ago",
      icon: <FaChartLine color="#A855F7" />,
      read: false
    }
  ];

  const notifications = type === "workforce" ? workforceNotifications : studentNotifications;

  const handleMarkAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Bell Button Icon - Highly visible in both light & dark theme */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isLight ? "#FFFFFF" : "rgba(255,255,255,0.08)",
          border: isLight ? "1px solid #CBD5E1" : "1px solid rgba(255,255,255,0.18)",
          color: isLight ? "#F9572A" : "#FFFFFF",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.2s ease",
          boxShadow: isLight ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "0 2px 8px rgba(0, 0, 0, 0.3)"
        }}
        title="Notifications"
      >
        <FaBell />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              background: "#F9572A",
              color: "#FFFFFF",
              fontSize: "10px",
              fontWeight: 800,
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(249, 87, 42, 0.5)",
              border: isLight ? "2px solid #FFFFFF" : "2px solid #0F172A"
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Floating Notification Popover Dropdown - Fully Theme-Aware */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "52px",
            right: "0",
            width: "360px",
            background: isLight ? "#FFFFFF" : "#0F172A",
            border: isLight ? "1px solid #E2E8F0" : "1px solid #334155",
            borderRadius: "16px",
            boxShadow: isLight ? "0 12px 35px rgba(0, 0, 0, 0.12)" : "0 12px 40px rgba(0,0,0,0.6)",
            zIndex: 9999,
            overflow: "hidden",
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              background: isLight ? "#F8FAFC" : "#1E293B",
              borderBottom: isLight ? "1px solid #E2E8F0" : "1px solid #334155",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaBell color="#F9572A" />
              <strong style={{ fontSize: "14px", color: isLight ? "#0F172A" : "#F8FAFC" }}>
                {type === "workforce" ? "Workforce Notifications" : "Notifications"}
              </strong>
              {unreadCount > 0 && (
                <span
                  style={{
                    fontSize: "10px",
                    background: "#FFF0EB",
                    color: "#F9572A",
                    padding: "2px 8px",
                    borderRadius: "99px",
                    fontWeight: 700
                  }}
                >
                  {unreadCount} New
                </span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {unreadCount > 0 && (
                <span
                  onClick={handleMarkAllRead}
                  style={{
                    fontSize: "11px",
                    color: "#F9572A",
                    cursor: "pointer",
                    fontWeight: 700
                  }}
                >
                  Mark read
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: isLight ? "#64748B" : "#94A3B8",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div style={{ maxHeight: "340px", overflowY: "auto", padding: "4px 0" }}>
            {notifications.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "12px 18px",
                  borderBottom: isLight ? "1px solid #F1F5F9" : "1px solid #1E293B",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  transition: "background 0.2s ease",
                  cursor: "pointer",
                  background: isLight ? "#FFFFFF" : "#0F172A"
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: isLight ? "#F1F5F9" : "#1E293B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0
                  }}
                >
                  {item.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: isLight ? "#0F172A" : "#F8FAFC", marginBottom: "2px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "11px", color: isLight ? "#475569" : "#94A3B8", lineHeight: "1.4", marginBottom: "4px" }}>
                    {item.desc}
                  </div>
                  <span style={{ fontSize: "10px", color: isLight ? "#94A3B8" : "#64748B", fontWeight: 600 }}>
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "10px",
              background: isLight ? "#F8FAFC" : "#1E293B",
              borderTop: isLight ? "1px solid #E2E8F0" : "1px solid #334155",
              textAlign: "center"
            }}
          >
            <span style={{ fontSize: "11px", color: isLight ? "#64748B" : "#94A3B8", fontWeight: 600 }}>
              SkillSphere Real-Time Notification Center ✓
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
