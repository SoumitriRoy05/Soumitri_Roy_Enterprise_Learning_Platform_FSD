import React, { useState } from "react";
import { FaFileCsv, FaFileExcel, FaFilePdf, FaDownload, FaTable } from "react-icons/fa";

export default function ExecutiveReports() {
  const [selectedReport, setSelectedReport] = useState("learning"); // learning, student, workforce, placement, certification, course
  const [exportFormat, setExportFormat] = useState("csv"); // csv, excel, pdf

  const reportsList = [
    { id: "learning", label: "Learning Report", desc: "Aggregated monthly course registrations, completions, and cumulative learning study hours." },
    { id: "student", label: "Student Performance Report", desc: "Overview of student size, average test scores, attendance rates, and placement readiness." },
    { id: "workforce", label: "Workforce Competency Report", desc: "Department workforce metrics, skill strengths indices, and internal training progress." },
    { id: "placement", label: "Placement Statistics Report", desc: "Detailed statistics of students placed, package levels (LPA), and interview success margins." },
    { id: "certification", label: "Certification Audits Report", desc: "Certificates generated, pending verifications, and success rates by department." },
    { id: "course", label: "Course Inventory Report", desc: "Analysis of syllabus tracks, ratings, pricing, and active learners per module." },
  ];

  const handleExport = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const token = localStorage.getItem("accessToken");
    
    // Construct the direct download link containing JWT auth parameters or triggers
    const downloadUrl = `${API_URL}/api/executive/reports/export?type=${selectedReport}&format=${exportFormat}&token=${token}`;
    
    // Create an invisible anchor tag to trigger the browser file download stream
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `${selectedReport}_report.${exportFormat === "excel" ? "xls" : (exportFormat === "pdf" ? "pdf" : "csv")}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mock table preview data based on active selection
  const getTableHeaders = () => {
    switch (selectedReport) {
      case "learning": return ["Month", "Enrollments", "Completions", "Learning Hours"];
      case "student": return ["Metric", "Value", "Status"];
      case "workforce": return ["Department", "EmployeesCount", "Average Competency", "Training Completed"];
      case "placement": return ["Student Name", "Student Email", "Company", "CTC Package", "Placement Status", "Interview Score"];
      case "certification": return ["Department", "Certificates Issued", "Exam Success Rate"];
      case "course": return ["Course Name", "Rating", "Syllabus Price", "Active Learners"];
      default: return ["Data Point", "Value"];
    }
  };

  const getTableRows = () => {
    switch (selectedReport) {
      case "learning":
        return [
          ["January", "45", "20", "450h"],
          ["February", "62", "35", "680h"],
          ["March", "85", "48", "920h"],
          ["April", "120", "72", "1340h"],
          ["May", "145", "95", "1680h"],
          ["June", "190", "130", "2100h"],
        ];
      case "student":
        return [
          ["Active Students Pool", "295 Learners", "Normal Growth"],
          ["New Monthly Sign-ups", "44 Registrations", "Healthy"],
          ["Average Attendance", "94.8%", "Highly Consistent"],
          ["Assignment Submissions", "89.2%", "Healthy"],
          ["Assessment Avg Score", "84.5%", "Satisfactory"],
        ];
      case "workforce":
        return [
          ["Engineering", "15 Staff", "92% Competency", "12 Done"],
          ["Design", "8 Staff", "88% Competency", "5 Done"],
          ["Product", "6 Staff", "87% Competency", "3 Done"],
        ];
      case "placement":
        return [
          ["S Roy", "sroy@gmail.com", "Microsoft", "24.5 LPA", "Placed", "4.8 / 5.0"],
          ["Student Demo", "student@skillsphere.com", "Google", "32.0 LPA", "Placed", "4.9 / 5.0"],
          ["Aditi Rao", "aditi@company.com", "Amazon", "28.0 LPA", "Placed", "4.7 / 5.0"],
          ["Rahul Verma", "rahul@company.com", "Meta", "35.0 LPA", "Placed", "4.8 / 5.0"],
          ["Priya Nair", "priya.nair@gmail.com", "Netflix", "42.0 LPA", "Offered", "4.9 / 5.0"],
        ];
      case "certification":
        return [
          ["Engineering Division", "28 Certificates", "95.4% Success"],
          ["Product Division", "12 Certificates", "92.0% Success"],
          ["Design Division", "8 Certificates", "89.5% Success"],
        ];
      case "course":
        return [
          ["JavaScript Fundamentals", "4.8 ★", "Free", "240 Learners"],
          ["React.js Development", "4.7 ★", "499 INR", "210 Learners"],
          ["Python for Beginners", "4.6 ★", "Free", "185 Learners"],
        ];
      default:
        return [["No Data", "No Data"]];
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px", alignItems: "flex-start" }}>
      
      {/* Left: Report Types selector */}
      <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "20px" }}>Strategic Datasets</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {reportsList.map((rep) => (
            <div
              key={rep.id}
              onClick={() => setSelectedReport(rep.id)}
              style={{
                padding: "16px",
                borderRadius: "12px",
                cursor: "pointer",
                background: selectedReport === rep.id ? "var(--bg-primary)" : "transparent",
                border: `1px solid ${selectedReport === rep.id ? "var(--border-color)" : "transparent"}`,
                transition: "all 0.2s ease",
              }}
            >
              <strong style={{ fontSize: "13px", color: selectedReport === rep.id ? "#00C6FF" : "var(--text-primary)" }}>
                {rep.label}
              </strong>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "6px", lineHeight: "1.4" }}>
                {rep.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Preview & Format Export Controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Export Action Card */}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", padding: "28px", borderRadius: "20px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "8px" }}>Export Options</h3>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>
            Extract high-fidelity analytics logs. Select file format and trigger secure file download.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "30px", flexWrap: "wrap" }}>
            {/* Format selection */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { id: "csv", label: "CSV", icon: <FaFileCsv color="#10B981" /> },
                { id: "excel", label: "Excel", icon: <FaFileExcel color="#22c55e" /> },
                { id: "pdf", label: "PDF", icon: <FaFilePdf color="#ef4444" /> },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setExportFormat(f.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    background: exportFormat === f.id ? "var(--bg-primary)" : "transparent",
                    border: `1px solid ${exportFormat === f.id ? "var(--border-color)" : "transparent"}`,
                    color: "var(--text-primary)",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "700",
                    transition: "all 0.15s ease",
                  }}
                >
                  {f.icon}
                  <span>{f.label}</span>
                </button>
              ))}
            </div>

            {/* Run Download Button */}
            <button
              onClick={handleExport}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 24px",
                background: "linear-gradient(135deg, #00C6FF, #0072FF)",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "800",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0, 198, 255, 0.2)",
              }}
            >
              <FaDownload />
              <span>Download Report</span>
            </button>
          </div>
        </div>

        {/* Live Table Preview */}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", padding: "28px", borderRadius: "20px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <FaTable color="var(--text-secondary)" />
            <h4 style={{ fontSize: "14px", fontWeight: "800" }}>Live Database Sample Preview</h4>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "12px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  {getTableHeaders().map((h, i) => (
                    <th key={i} style={{ padding: "12px", color: "var(--text-secondary)", fontWeight: "700" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getTableRows().map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: "12px", color: "var(--text-primary)" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
