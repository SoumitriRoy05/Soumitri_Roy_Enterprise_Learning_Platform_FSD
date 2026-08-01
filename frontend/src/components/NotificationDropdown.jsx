import React, { useState } from "react";
import { FaBell, FaCheckCircle, FaTimes, FaAward, FaHourglassHalf, FaBolt, FaRobot, FaBriefcase, FaUserCheck, FaChartLine } from "react-icons/fa";

export default function NotificationDropdown({ type = "student" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(type === "student" ? 4 : 4);

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
      {/* Bell Button Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#FFFFFF",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          cursor: "pointer",
          position: "relative",
          transition: "all 0.2s ease"
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
              boxShadow: "0 2px 8px rgba(249, 87, 42, 0.5)"
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Floating Notification Popover Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "52px",
            right: "0",
            width: "360px",
            background: "#0F172A",
            border: "1px solid #334155",
            borderRadius: "16px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            zIndex: 9999,
            overflow: "hidden",
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              background: "#1E293B",
              borderBottom: "1px solid #334155",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaBell color="#F9572A" />
              <strong style={{ fontSize: "14px", color: "#F8FAFC" }}>
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
                    color: "#38BDF8",
                    cursor: "pointer",
                    fontWeight: 700
                  }}
                >
                  Mark read
                </span>
              )}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94A3B8",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* List */}
          <div style={{ maxHeight: "340px", overflowY: "auto", padding: "8px 0" }}>
            {notifications.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: "12px 18px",
                  borderBottom: "1px solid #1E293B",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                  transition: "background 0.2s ease",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#1E293B",
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
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#F8FAFC", marginBottom: "2px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94A3B8", lineHeight: "1.4", marginBottom: "4px" }}>
                    {item.desc}
                  </div>
                  <span style={{ fontSize: "10px", color: "#64748B", fontWeight: 600 }}>
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
              background: "#1E293B",
              borderTop: "1px solid #334155",
              textAlign: "center"
            }}
          >
            <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 600 }}>
              SkillSphere Real-Time Notification Center ✓
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
