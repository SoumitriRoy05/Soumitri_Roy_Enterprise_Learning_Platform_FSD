import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ExecutiveLineChart,
  ExecutiveBarChart,
  ExecutiveDonutChart
} from "./ExecutiveCharts";
import {
  FaBookOpen, FaBriefcase, FaGraduationCap,
  FaAward, FaCertificate, FaRocket, FaRobot, FaCheckCircle,
  FaTimesCircle, FaChartBar
} from "react-icons/fa";

export default function ExecutiveAnalytics() {
  const { data, loading } = useOutletContext();
  const [activeSubTab, setActiveSubTab] = useState("learning"); // learning, student, workforce, course, trainer, certification, placement, ai

  const tabs = [
    { id: "learning", label: "Learning", icon: <FaBookOpen /> },
    { id: "student", label: "Students", icon: <FaGraduationCap /> },
    { id: "workforce", label: "Workforce", icon: <FaBriefcase /> },
    { id: "course", label: "Courses", icon: <FaBookOpen /> },
    { id: "trainer", label: "Trainers", icon: <FaAward /> },
    { id: "certification", label: "Certifications", icon: <FaCertificate /> },
    { id: "placement", label: "Placements", icon: <FaRocket /> },
    { id: "ai", label: "AI Insights", icon: <FaRobot /> },
  ];

  if (loading || !data) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <div className="shimmerCard" style={{ height: "400px", background: "var(--bg-secondary)", borderRadius: "20px" }} />
      </div>
    );
  }

  return (
    <div>
      {/* Subtab Header Row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "30px", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "10px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              background: activeSubTab === tab.id ? "linear-gradient(135deg, #00C6FF, #0072FF)" : "var(--bg-secondary)",
              color: activeSubTab === tab.id ? "#ffffff" : "var(--text-secondary)",
              transition: "all 0.2s ease",
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents: 1. Learning */}
      {activeSubTab === "learning" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <ExecutiveLineChart data={data.learning.enrollments} title="Monthly Enrollments Trend" color="#00C6FF" />
          <ExecutiveBarChart data={data.learning.completions} title="Course Completions" color="#10B981" />
          <ExecutiveLineChart data={data.learning.learningHours} title="Accumulative Learning Hours" color="#8B5CF6" />
          <ExecutiveDonutChart data={data.learning.categoryDistribution} title="Course Categories Distribution" />
        </div>
      )}

      {/* Tab Contents: 2. Student */}
      {activeSubTab === "student" && (
        <div>
          {/* Numbers Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Active Learners</span>
              <strong style={{ display: "block", fontSize: "20px", marginTop: "6px" }}>{data.student.activeStudents}</strong>
            </div>
            <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Average Attendance</span>
              <strong style={{ display: "block", fontSize: "20px", marginTop: "6px" }}>{data.student.attendanceRate}%</strong>
            </div>
            <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Assignment Submission</span>
              <strong style={{ display: "block", fontSize: "20px", marginTop: "6px" }}>{data.student.assignmentSubmissionRate}%</strong>
            </div>
            <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Avg Assessment Score</span>
              <strong style={{ display: "block", fontSize: "20px", marginTop: "6px" }}>{Math.round(data.student.avgAssessmentScore)}%</strong>
            </div>
          </div>
          {/* Charts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <ExecutiveLineChart data={data.student.growth} title="Student Registrations Growth" color="#10B981" />
            <ExecutiveLineChart data={data.student.attendanceTrend} title="Weekly Attendance Stability" color="#F59E0B" />
          </div>
        </div>
      )}

      {/* Tab Contents: 3. Workforce */}
      {activeSubTab === "workforce" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Corporate Workforce Size</span>
              <strong style={{ display: "block", fontSize: "20px", marginTop: "6px" }}>{data.workforce.totalEmployees}</strong>
            </div>
            <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Employees In Active Training</span>
              <strong style={{ display: "block", fontSize: "20px", marginTop: "6px" }}>{data.workforce.employeesInTraining}</strong>
            </div>
            <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Training Completion Index</span>
              <strong style={{ display: "block", fontSize: "20px", marginTop: "6px" }}>{data.workforce.trainingCompletionRate}%</strong>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <ExecutiveDonutChart data={data.workforce.departmentWorkforce} title="Department-wise Workforce Distribution" />
            <ExecutiveBarChart data={data.workforce.skillMatrix} title="Top Core Skill Strengths" color="#6366f1" />
          </div>
        </div>
      )}

      {/* Tab Contents: 4. Course */}
      {activeSubTab === "course" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* Popular */}
          <div style={{ background: "var(--bg-secondary)", padding: "24px", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>Popular Syllabus Modules</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.course.popularCourses.map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "var(--bg-primary)", borderRadius: "8px" }}>
                  <strong>{c.title}</strong>
                  <span style={{ color: "#10B981", fontWeight: "700" }}>{c.rating} ★ ({c.activeLearners} Active)</span>
                </div>
              ))}
            </div>
          </div>
          {/* Least Popular */}
          <div style={{ background: "var(--bg-secondary)", padding: "24px", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
            <h4 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>Under-utilized Modules (Needs Marketing)</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.course.leastPopularCourses.map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "var(--bg-primary)", borderRadius: "8px" }}>
                  <strong>{c.title}</strong>
                  <span style={{ color: "#f59e0b", fontWeight: "700" }}>{c.rating} ★ ({c.activeLearners} Active)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Contents: 5. Trainer */}
      {activeSubTab === "trainer" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Total Instructors</span>
            <strong style={{ display: "block", fontSize: "28px", marginTop: "8px" }}>{data.trainer.totalTrainers}</strong>
          </div>
          <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Active Lecturing</span>
            <strong style={{ display: "block", fontSize: "28px", marginTop: "8px" }}>{data.trainer.activeTrainers}</strong>
          </div>
          <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Average Instructor Rating</span>
            <strong style={{ display: "block", fontSize: "28px", marginTop: "8px", color: "#f59e0b" }}>{data.trainer.averageTrainerRating.toFixed(1)} ★</strong>
          </div>
          <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Cumulative Course Sessions</span>
            <strong style={{ display: "block", fontSize: "28px", marginTop: "8px" }}>{data.trainer.sessionsConducted}</strong>
          </div>
        </div>
      )}

      {/* Tab Contents: 6. Certification */}
      {activeSubTab === "certification" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Certificates Generated</span>
              <strong style={{ display: "block", fontSize: "24px", marginTop: "6px" }}>{data.certification.certificatesIssued}</strong>
            </div>
            <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Pending Verifications</span>
              <strong style={{ display: "block", fontSize: "24px", marginTop: "6px" }}>{data.certification.certificatesPending}</strong>
            </div>
            <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Exam Success Index</span>
              <strong style={{ display: "block", fontSize: "24px", marginTop: "6px", color: "#10B981" }}>{data.certification.successRate}%</strong>
            </div>
          </div>
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <ExecutiveDonutChart data={data.certification.departmentCertificates} title="Department-wise Certification Audits" />
          </div>
        </div>
      )}

      {/* Tab Contents: 7. Placement */}
      {activeSubTab === "placement" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Total Placement Success</span>
            <strong style={{ display: "block", fontSize: "28px", marginTop: "8px", color: "#10B981" }}>{data.placement.placementPercentage.toFixed(1)}%</strong>
          </div>
          <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Affiliated Corporate Partners</span>
            <strong style={{ display: "block", fontSize: "28px", marginTop: "8px" }}>{data.placement.companiesHiring}</strong>
          </div>
          <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Highest CTC Package Secured</span>
            <strong style={{ display: "block", fontSize: "28px", marginTop: "8px", color: "#8b5cf6" }}>{data.placement.highestPackage} LPA</strong>
          </div>
          <div style={{ padding: "24px", background: "var(--bg-secondary)", borderRadius: "16px", border: "1px solid var(--border-color)", textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Average CTC Package Offered</span>
            <strong style={{ display: "block", fontSize: "28px", marginTop: "8px" }}>{data.placement.averagePackage.toFixed(1)} LPA</strong>
          </div>
        </div>
      )}

      {/* Tab Contents: 8. AI Insights */}
      {activeSubTab === "ai" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {data.aiInsights && data.aiInsights.map((insight, idx) => (
            <div
              key={idx}
              style={{
                padding: "24px",
                background: "var(--bg-secondary)",
                borderRadius: "16px",
                border: "1px solid var(--border-color)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                display: "flex",
                gap: "16px",
              }}
            >
              <div style={{ fontSize: "28px", color: insight.status === "Warning" ? "#ef4444" : (insight.status === "Info" ? "#3b82f6" : "#10b981") }}>
                <FaRobot />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "14px" }}>{insight.title}</strong>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontSize: "10px",
                      fontWeight: "700",
                      background: insight.status === "Warning" ? "rgba(239,68,68,0.15)" : (insight.status === "Info" ? "rgba(59,130,246,0.15)" : "rgba(16,185,129,0.15)"),
                      color: insight.status === "Warning" ? "#ef4444" : (insight.status === "Info" ? "#3b82f6" : "#10b981"),
                    }}
                  >
                    {insight.status}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "8px", lineHeight: "1.5" }}>{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
