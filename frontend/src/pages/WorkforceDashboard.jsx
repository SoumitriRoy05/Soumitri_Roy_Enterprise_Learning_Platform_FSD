import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";
import NotificationDropdown from "../components/NotificationDropdown";
import Background from "../components/Background";
import {
  FaHome,
  FaUsers,
  FaUserFriends,
  FaShieldAlt,
  FaLaptopCode,
  FaChartLine,
  FaClock,
  FaHeart,
  FaChartBar,
  FaCog,
  FaSearch,
  FaBell,
  FaCommentAlt,
  FaCalendarAlt,
  FaBars,
  FaHeadset,
  FaArrowRight,
  FaStar,
  FaBookOpen,
  FaBullseye,
  FaUserPlus,
  FaClipboardCheck,
  FaCloud,
  FaRobot,
  FaCode,
  FaComments,
  FaSignOutAlt,
  FaUserCheck,
  FaUserTimes,
  FaPlaneDeparture,
  FaFileExport,
  FaBuilding,
  FaUserCog,
  FaSlidersH,
  FaTimes,
  FaFilePdf,
  FaFileExcel,
  FaCheck,
  FaPlus,
  FaBolt,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaEllipsisV,
  FaBullhorn,
  FaHeadphones,
  FaSlidersH as FaFilterIcon,
  FaBriefcase,
  FaAward,
  FaTrophy,
  FaSmile,
  FaLightbulb,
  FaRocket,
  FaBalanceScale,
  FaSun,
  FaMoon,
  FaPaperPlane
} from "react-icons/fa";

import workforcePortalImg from "../assets/workforce_portal_illustration.png";
import workHubHeroImg from "../assets/work_hub_hero_illustration.png";
import workforceLoginImg from "../assets/workforce_login_illustration.png";
import featureHeroImg from "../assets/feature_hero_illustration.png";
import sandboxHeroImg from "../assets/sandbox_hero_illustration.png";
import studentDashboardHeroImg from "../assets/student_dashboard_hero_illustration.png";
import studentHubGirlImg from "../assets/student_hub_girl_illustration.png";
import engagementHeroImg from "../assets/engagement_hero_illustration.png";
import womanWorkingImg from "../assets/woman_working_computer_illustration.png";
import darkWorkforcePortalImg from "../assets/dark_workforce_portal_illustration.png";
import darkWorkHubHeroImg from "../assets/dark_work_hub_hero_illustration.png";
import darkHeroImg from "../assets/dark_hero_illustration.png";
import darkSandboxHeroImg from "../assets/dark_sandbox_hero_illustration.png";
import darkFeatureHeroImg from "../assets/dark_feature_hero_illustration.png";
import darkStudentDashboardHeroImg from "../assets/dark_student_dashboard_hero_illustration.png";
import darkReactLearningHero from "../assets/dark_react_learning_hero.png";

import "../styles/workforceDashboard.css";

export default function WorkforceDashboard() {
  const { user, logout, authenticatedFetch, themeMode, toggleTheme } = useAuth();
  const { leaveRequests, submitLeaveRequest, workforce } = useAdmin();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Sidebar & Navigation State
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [overviewFilter, setOverviewFilter] = useState("This Month");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Leave Request Form State
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);
  const [newLeaveForm, setNewLeaveForm] = useState({
    leaveType: "Sick Leave",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    reason: ""
  });

  const handleApplyLeaveSubmit = (e) => {
    e.preventDefault();
    if (!newLeaveForm.reason.trim()) return;

    const start = new Date(newLeaveForm.startDate);
    const end = new Date(newLeaveForm.endDate);
    const diffTime = Math.max(0, end - start);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    submitLeaveRequest({
      employeeName: user?.fullName || user?.name || "Alex Vance",
      employeeEmail: user?.email || "alex@skillsphere.com",
      role: user?.role || "EMPLOYEE",
      dept: "Engineering",
      leaveType: newLeaveForm.leaveType,
      startDate: newLeaveForm.startDate,
      endDate: newLeaveForm.endDate,
      days: days || 1,
      reason: newLeaveForm.reason
    });

    setShowApplyLeaveModal(false);
    setNewLeaveForm({
      leaveType: "Sick Leave",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      reason: ""
    });
    alert("✓ Leave request submitted successfully! Admin will review your request under Leave Approvals.");
  };

  // Employee tab filter & search
  const [empSearch, setEmpSearch] = useState("");

  // Teams tab state
  const [teamSearch, setTeamSearch] = useState("");
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", desc: "", lead: "", dept: "Engineering", members: 10 });
  const [teamsList, setTeamsList] = useState([
    {
      id: 1,
      name: "Product Development",
      desc: "Building innovative solutions",
      icon: <FaCode />,
      iconBg: "#e6f0fa",
      iconColor: "#1e40af",
      leadName: "Aman Verma",
      leadDept: "Engineering",
      leadAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      members: 28,
      dept: "Engineering",
      status: "Active"
    },
    {
      id: 2,
      name: "Marketing Team",
      desc: "Driving growth & brand",
      icon: <FaBullhorn />,
      iconBg: "#e6f4ea",
      iconColor: "#16a34a",
      leadName: "Sneha Iyer",
      leadDept: "Marketing",
      leadAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      members: 16,
      dept: "Marketing",
      status: "Active"
    },
    {
      id: 3,
      name: "Customer Success",
      desc: "Ensuring client satisfaction",
      icon: <FaHeadphones />,
      iconBg: "#fef7e0",
      iconColor: "#b06000",
      leadName: "Riya Sharma",
      leadDept: "Operations",
      leadAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      members: 24,
      dept: "Operations",
      status: "Active"
    },
    {
      id: 4,
      name: "Data Analytics",
      desc: "Data-driven insights",
      icon: <FaChartBar />,
      iconBg: "#e0f2fe",
      iconColor: "#0284c7",
      leadName: "Vikram Singh",
      leadDept: "Data",
      leadAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      members: 18,
      dept: "Data Science",
      status: "Active"
    },
    {
      id: 5,
      name: "HR Team",
      desc: "People & Culture",
      icon: <FaUsers />,
      iconBg: "#ffebe9",
      iconColor: "#d9381e",
      leadName: "Neha Patel",
      leadDept: "Human Resources",
      leadAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      members: 12,
      dept: "Human Resources",
      status: "Inactive"
    }
  ]);

  // Engagement Tab State matching reference mockup
  const [engagementDeptFilter, setEngagementDeptFilter] = useState("All Departments");
  const [engagementInitiatives, setEngagementInitiatives] = useState([
    { id: 1, title: "Employee Satisfaction Survey", date: "May 2025", type: "Survey", participants: 412, responseRate: "72%", score: "78%", scoreLbl: "Good", status: "Completed" },
    { id: 2, title: "Work-Life Balance Survey", date: "April 2025", type: "Survey", participants: 398, responseRate: "68%", score: "72%", scoreLbl: "Good", status: "Completed" },
    { id: 3, title: "Recognition Program", date: "Q2 2025", type: "Initiative", participants: "—", responseRate: "—", score: "85%", scoreLbl: "Excellent", status: "Ongoing" },
    { id: 4, title: "Team Engagement Pulse", date: "Weekly", type: "Survey", participants: 210, responseRate: "85%", score: "80%", scoreLbl: "Excellent", status: "Active" },
    { id: 5, title: "Leadership Feedback", date: "April 2025", type: "Survey", participants: 186, responseRate: "60%", score: "65%", scoreLbl: "Average", status: "Completed" }
  ]);

  // Attendance Page State
  const [attendanceDeptFilter, setAttendanceDeptFilter] = useState("All Departments");
  const [attendanceDateFilter, setAttendanceDateFilter] = useState("May 1 – May 31, 2025");
  const [attendanceLogs, setAttendanceLogs] = useState([
    { empId: "EMP001", name: "Aman Verma", dept: "Engineering", status: "Present", checkIn: "09:05 AM", checkOut: "06:12 PM", workHours: "09h 07m", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
    { empId: "EMP002", name: "Sneha Iyer", dept: "Marketing", status: "Present", checkIn: "09:00 AM", checkOut: "05:58 PM", workHours: "08h 58m", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
    { empId: "EMP003", name: "Riya Sharma", dept: "Operations", status: "On Leave", checkIn: "—", checkOut: "—", workHours: "—", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
    { empId: "EMP004", name: "Vikram Singh", dept: "Data Science", status: "Late", checkIn: "09:45 AM", checkOut: "06:10 PM", workHours: "08h 25m", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
    { empId: "EMP005", name: "Neha Patel", dept: "Human Resources", status: "Absent", checkIn: "—", checkOut: "—", workHours: "—", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" }
  ]);

  // Performance Tab Filters
  const [perfTimeframe, setPerfTimeframe] = useState("Monthly");

  // Reports & Analytics Page State
  const [reportCatFilter, setReportCatFilter] = useState("All Reports");
  const [reportSearch, setReportSearch] = useState("");
  const [reportsList, setReportsList] = useState([
    { id: 1, title: "Workforce Skill Competency Matrix", category: "Skills", frequency: "Monthly", lastGen: "24 May 2025", format: "PDF / Excel", formatType: "pdf", status: "Ready" },
    { id: 2, title: "Quarterly Performance & Review Summary", category: "Performance", frequency: "Quarterly", lastGen: "20 May 2025", format: "PDF", formatType: "pdf", status: "Ready" },
    { id: 3, title: "Monthly Attendance & Punctuality Log", category: "Attendance", frequency: "Monthly", lastGen: "01 May 2025", format: "CSV / Excel", formatType: "csv", status: "Ready" },
    { id: 4, title: "Employee Engagement & Culture Score", category: "Engagement", frequency: "Weekly", lastGen: "25 May 2025", format: "PDF", formatType: "pdf", status: "Ready" },
    { id: 5, title: "Training ROI & Skill Completion Report", category: "Learning", frequency: "Monthly", lastGen: "15 May 2025", format: "Excel", formatType: "excel", status: "Ready" },
    { id: 6, title: "Departmental Productivity Benchmark", category: "Analytics", frequency: "Bi-Weekly", lastGen: "22 May 2025", format: "PDF", formatType: "pdf", status: "Ready" }
  ]);

  // Workforce Settings State
  const [settingsActiveSubTab, setSettingsActiveSubTab] = useState("General");
  const [settingsForm, setSettingsForm] = useState({
    companyName: "SkillSphere Workforce Global",
    companySlug: "skillsphere.app/org/global-workforce",
    timezone: "(UTC+05:30) India Standard Time (IST)",
    currency: "USD ($)",
    adminEmail: "arjun.mehta@skillsphere.app",
    fiscalStart: "April",
    enforce2FA: true,
    enforceSSO: true,
    passwordRotation: "90 Days",
    ipWhitelist: "192.168.1.0/24, 10.0.0.0/16",
    sessionTimeout: "30 Minutes",
    emailNotifications: true,
    slackAlerts: true,
    reviewReminders: true,
    assessmentReminders: true,
    webhookUrl: "https://api.skillsphere.app/v1/webhooks/workforce-events"
  });

  // Hover Tooltip State for SVG Line Chart
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Modal & Form States
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [exportFormat, setExportFormat] = useState("PDF");
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: "", role: "", dept: "Engineering", status: "Active", score: 85 });

  // Additional Feature Modals
  const [showCreateSurveyModal, setShowCreateSurveyModal] = useState(false);
  const [newSurveyForm, setNewSurveyForm] = useState({
    title: "",
    type: "Survey",
    dept: "All Departments",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    desc: ""
  });

  const [showCustomReportModal, setShowCustomReportModal] = useState(false);
  const [customReportForm, setCustomReportForm] = useState({
    title: "",
    category: "Skills",
    frequency: "Monthly",
    format: "PDF / Excel"
  });

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showViewAllModal, setShowViewAllModal] = useState(null); // { title: string, items: Array }

  // Messages & Chat Drawer State
  const [showMessagesDrawer, setShowMessagesDrawer] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState({
    id: 1,
    name: "Aman Verma",
    role: "Engineering Lead",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    status: "Online"
  });

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Aman Verma", text: "Hey Arjun! Did you review the microservices refactoring proposal?", time: "10:30 AM", isMe: false },
    { id: 2, sender: "Arjun Mehta", text: "Yes Aman! The architecture plan looks solid. Let's proceed with sprint 4.", time: "10:32 AM", isMe: true },
    { id: 3, sender: "Aman Verma", text: "Awesome! I will update the Jira tasks and notify the team.", time: "10:35 AM", isMe: false }
  ]);

  const [inputMessageText, setInputMessageText] = useState("");

  const handleSendMessageSubmit = (e) => {
    e.preventDefault();
    if (!inputMessageText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: user?.full_name || user?.username || "Arjun Mehta",
      text: inputMessageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setChatMessages(prev => [...prev, newMsg]);
    const currentInput = inputMessageText;
    setInputMessageText("");

    // Simulate auto response from teammate
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: activeChatUser.name,
          text: `Got it! Thanks for the update regarding "${currentInput.slice(0, 20)}..."`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false
        }
      ]);
    }, 1200);
  };

  // Data states with fallback defaults matching reference image
  const [employees, setEmployees] = useState([
    { empId: "EMP001", name: "Aman Verma", dept: "Engineering", designation: "Software Engineer", status: "Active", joinDate: "12 Jan, 2024", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
    { empId: "EMP002", name: "Sneha Iyer", dept: "Marketing", designation: "Marketing Specialist", status: "Active", joinDate: "18 Feb, 2024", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
    { empId: "EMP003", name: "Riya Sharma", dept: "Operations", designation: "Operations Manager", status: "Active", joinDate: "05 Mar, 2024", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
    { empId: "EMP004", name: "Vikram Singh", dept: "Data Science", designation: "Data Analyst", status: "Active", joinDate: "22 Mar, 2024", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
    { empId: "EMP005", name: "Neha Patel", dept: "Human Resources", designation: "HR Executive", status: "Inactive", joinDate: "10 Apr, 2024", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" }
  ]);

  // Form Submit Handlers
  const handleCreateSurveySubmit = (e) => {
    e.preventDefault();
    if (!newSurveyForm.title.trim()) return;
    const newItem = {
      id: Date.now(),
      title: newSurveyForm.title,
      date: "May 2025",
      type: newSurveyForm.type,
      participants: 0,
      responseRate: "0%",
      score: "80%",
      scoreLbl: "Good",
      status: "Active"
    };
    setEngagementInitiatives(prev => [newItem, ...prev]);
    setShowCreateSurveyModal(false);
    setNewSurveyForm({
      title: "", type: "Survey", dept: "All Departments",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      desc: ""
    });
    alert("✓ New Survey created successfully and activated!");
  };

  const handleCustomReportSubmit = (e) => {
    e.preventDefault();
    if (!customReportForm.title.trim()) return;
    const newRep = {
      id: Date.now(),
      title: customReportForm.title,
      category: customReportForm.category,
      frequency: customReportForm.frequency,
      lastGen: "Just Now",
      format: customReportForm.format,
      formatType: customReportForm.format.toLowerCase().includes("pdf") ? "pdf" : "excel",
      status: "Ready"
    };
    setReportsList(prev => [newRep, ...prev]);
    setShowCustomReportModal(false);
    setCustomReportForm({ title: "", category: "Skills", frequency: "Monthly", format: "PDF / Excel" });
    alert("✓ Custom Report generated successfully!");
  };

  const handleExportReportSubmit = (e) => {
    e.preventDefault();
    const csvRows = [
      ["SkillSphere Workforce Export Report"],
      ["Generated At", new Date().toLocaleString()],
      ["Format", exportFormat],
      ["Department Filter", attendanceDeptFilter],
      ["Total Employees", employees.length],
      [],
      ["Employee ID", "Name", "Department", "Designation", "Status"],
      ...employees.map(emp => [emp.empId, emp.name, emp.dept, emp.designation, emp.status])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SkillSphere_Workforce_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowExportModal(false);
    alert(`✓ ${exportFormat} Report exported and downloaded successfully!`);
  };

  const handleCreateTeamSubmit = (e) => {
    e.preventDefault();
    if (!newTeam.name.trim()) return;
    const teamItem = {
      id: Date.now(),
      name: newTeam.name,
      desc: newTeam.desc || "New workforce team unit",
      icon: <FaUsers />,
      iconBg: "#e6f4ea",
      iconColor: "#16a34a",
      leadName: newTeam.lead || "Workforce Lead",
      leadDept: newTeam.dept || "Engineering",
      leadAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      members: parseInt(newTeam.members) || 10,
      dept: newTeam.dept || "Engineering",
      status: "Active"
    };
    setTeamsList(prev => [teamItem, ...prev]);
    setShowCreateTeamModal(false);
    setNewTeam({ name: "", desc: "", lead: "", dept: "Engineering", members: 10 });
    alert("✓ New team created successfully!");
  };

  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    if (!newEmp.name.trim()) return;
    const empId = `EMP00${employees.length + 1}`;
    const empItem = {
      empId,
      name: newEmp.name,
      dept: newEmp.dept || "Engineering",
      designation: newEmp.role || "Software Engineer",
      status: newEmp.status || "Active",
      joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    };
    setEmployees(prev => [empItem, ...prev]);
    setShowEmployeeModal(false);
    setNewEmp({ name: "", role: "", dept: "Engineering", status: "Active", score: 85 });
    alert("✓ Employee added successfully!");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    } finally {
      navigate("/login");
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.role) return;
    const created = {
      empId: `EMP00${employees.length + 1}`,
      name: newEmp.name,
      dept: newEmp.dept,
      designation: newEmp.role,
      status: "Active",
      joinDate: "Today",
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?w=100&auto=format&fit=crop&q=80`
    };
    setEmployees(prev => [...prev, created]);
    setNewEmp({ name: "", role: "", dept: "Engineering", status: "Active", score: 85 });
    setShowEmployeeModal(false);
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.lead) return;
    const created = {
      id: Date.now(),
      name: newTeam.name,
      desc: newTeam.desc || "Team operations & growth",
      icon: <FaUserFriends />,
      iconBg: "#faf0e6",
      iconColor: "#8c5338",
      leadName: newTeam.lead,
      leadDept: newTeam.dept,
      leadAvatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?w=100&auto=format&fit=crop&q=80`,
      members: parseInt(newTeam.members) || 10,
      dept: newTeam.dept,
      status: "Active"
    };
    setTeamsList(prev => [...prev, created]);
    setNewTeam({ name: "", desc: "", lead: "", dept: "Engineering", members: 10 });
    setShowCreateTeamModal(false);
  };

  const navItems = [
    { id: "Overview", label: "Overview", icon: <FaHome /> },
    { id: "Employees", label: "Employees", icon: <FaUsers /> },
    { id: "Teams", label: "Teams", icon: <FaUserFriends /> },
    { id: "Skills", label: "Skills & Assessments", icon: <FaShieldAlt /> },
    { id: "Performance", label: "Performance", icon: <FaChartLine /> },
    { id: "Attendance", label: "Attendance", icon: <FaClock /> },
    { id: "Engagement", label: "Engagement", icon: <FaHeart /> },
    { id: "Reports", label: "Reports & Analytics", icon: <FaChartBar /> },
    { id: "Settings", label: "Workforce Settings", icon: <FaCog /> },
  ];

  const lineChartData = {
    active: [
      { date: "May 1", val: 340, x: 40, y: 140 },
      { date: "May 8", val: 390, x: 130, y: 110 },
      { date: "May 15", val: 410, x: 220, y: 95 },
      { date: "May 22", val: 480, x: 310, y: 55 },
      { date: "May 29", val: 520, x: 400, y: 30 }
    ],
    newHires: [
      { date: "May 1", val: 80, x: 40, y: 175 },
      { date: "May 8", val: 110, x: 130, y: 165 },
      { date: "May 15", val: 130, x: 220, y: 155 },
      { date: "May 22", val: 120, x: 310, y: 160 },
      { date: "May 29", val: 130, x: 400, y: 155 }
    ]
  };

  const activePathD = "M 40 140 Q 85 125, 130 110 T 220 95 T 310 55 T 400 30";
  const newHiresPathD = "M 40 175 Q 85 170, 130 165 T 220 155 T 310 160 T 400 155";

  const userName = user?.full_name || user?.username || "Arjun Mehta";

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(empSearch.toLowerCase()) ||
    emp.dept.toLowerCase().includes(empSearch.toLowerCase()) ||
    emp.designation.toLowerCase().includes(empSearch.toLowerCase()) ||
    emp.empId.toLowerCase().includes(empSearch.toLowerCase())
  );

  const filteredTeams = teamsList.filter(t =>
    t.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.dept.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.leadName.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const filteredAttendance = attendanceLogs.filter(log =>
    attendanceDeptFilter === "All Departments" || log.dept === attendanceDeptFilter
  );

  const filteredReports = reportsList.filter(rep => {
    const matchesCat = reportCatFilter === "All Reports" || rep.category === reportCatFilter;
    const matchesSearch = rep.title.toLowerCase().includes(reportSearch.toLowerCase()) ||
                          rep.category.toLowerCase().includes(reportSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className={`wf-dashboard-container ${themeMode === 'dark' ? 'dark-theme' : ''}`} data-theme={themeMode || 'dark'}>
      
      {/* BACKGROUND & MOVING GRAPHICS */}
      <Background />

      <div className="wf-moving-bg-layer">
        <div className="wf-bg-blob wf-bg-blob-1" />
        <div className="wf-bg-blob wf-bg-blob-2" />
        <div className="wf-bg-blob wf-bg-blob-3" />

        <div className="wf-floating-graphic-item wf-fitem-1">💼</div>
        <div className="wf-floating-graphic-item wf-fitem-2">🚀</div>
        <div className="wf-floating-graphic-item wf-fitem-3">⚡</div>
        <div className="wf-floating-graphic-item wf-fitem-4">📈</div>
        <div className="wf-floating-graphic-item wf-fitem-5">🎓</div>
      </div>

      {/* LEFT SIDEBAR */}
      <aside className={`wf-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="wf-sidebar-header">
          <div className="wf-logo-icon">⬢</div>
          <div className="wf-logo-text">
            <span className="wf-brand-name">SkillSphere</span>
            <span className="wf-brand-sub">Workforce</span>
          </div>
        </div>

        <nav className="wf-sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`wf-nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="wf-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Promo Card (Uses distinct graphic image based on activeTab) */}
        <div className="wf-sidebar-promo">
          <div className="wf-promo-img-box">
            <img
              src={womanWorkingImg}
              alt="Woman Working on Computer"
            />
          </div>
          <div className="wf-promo-title">
            {activeTab === "Engagement" ? "Build a culture of engagement" : "Build a future-ready workforce"}
          </div>
          <div className="wf-promo-sub">
            {activeTab === "Engagement" ? "Empower your teams with feedback, recognition and meaningful connections." : "Empower your teams with skills, growth and opportunities."}
          </div>
          <button className="wf-promo-btn" onClick={() => alert("Exploring workforce solutions...")}>
            Explore Solutions →
          </button>
        </div>

        <div className="wf-sidebar-help">
          <FaHeadset className="wf-help-icon" />
          <div className="wf-help-text">
            <span className="wf-help-title">Need Help?</span>
            <span className="wf-help-link" onClick={() => navigate("/contact")}>Visit Help Center →</span>
          </div>
        </div>

        <button className="wf-sidebar-logout-btn" onClick={handleLogout} title="Sign out of SkillSphere">
          <FaSignOutAlt /> Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="wf-main-wrapper">
        
        {/* TOP HEADER */}
        <header className="wf-top-header">
          <div className="wf-header-left">
            <button className="wf-hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)} title="Toggle Navigation">
              <FaBars />
            </button>
            <div className="wf-search-box">
              <FaSearch className="wf-search-icon" />
              <input
                type="text"
                placeholder="Search for employees, skills, reports..."
                className="wf-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="wf-header-right">
            <button
              className="wf-icon-btn"
              title={`Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`}
              onClick={toggleTheme}
            >
              {themeMode === 'dark' ? <FaSun color="#F59E0B" /> : <FaMoon color="#6366F1" />}
            </button>
            <button className="wf-icon-btn" title="Messages & Team Chat" onClick={() => setShowMessagesDrawer(!showMessagesDrawer)}>
              <FaCommentAlt />
              <span className="wf-badge-count">3</span>
            </button>
            <NotificationDropdown type="workforce" />

            <div className="wf-user-profile-wrapper">
              <button
                className="wf-user-profile-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                title="Account Menu"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Arjun Mehta"
                  className="wf-user-avatar"
                />
                <div className="wf-user-details">
                  <span className="wf-user-name">Arjun Mehta</span>
                  <span className="wf-user-role">Workforce Admin</span>
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="wf-user-menu-dropdown">
                  <button className="wf-menu-dropdown-item" onClick={() => { setIsUserMenuOpen(false); navigate("/settings"); }}>
                    <FaUserCog /> Settings
                  </button>
                  <button className="wf-menu-dropdown-item" onClick={() => { setIsUserMenuOpen(false); setActiveTab("Settings"); }}>
                    <FaSlidersH /> Theme Options
                  </button>
                  <button className="wf-menu-dropdown-item logout" onClick={handleLogout}>
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT BODY */}
        <main className="wf-content-body">
          
          {/* TAB 8: ENGAGEMENT MANAGEMENT (EXACT MATCH TO REFERENCE IMAGE WITH DISTINCT HUMAN GRAPHIC) */}
          {activeTab === "Engagement" && (
            <>
              {/* WELCOME BANNER WITH DISTINCT HUMAN GRAPHIC (sandboxHeroImg) */}
              <section className="wf-welcome-banner wf-hero-banner-enhanced">
                <div className="wf-welcome-text">
                  <h1>Engagement Management Control Panel</h1>
                  <p>Real-time workforce management center for engagement. Access team allocation tools and analytics.</p>
                  <button className="wf-btn-primary" style={{ marginTop: "14px" }} onClick={() => setActiveTab("Overview")}>
                    Return to Overview Dashboard
                  </button>
                </div>
                <div className="wf-welcome-graphic wf-welcome-graphic-enhanced">
                  <div className="wf-hero-glow-backdrop" />
                  <div className="wf-hero-dot-matrix" />
                  <svg className="wf-hero-leaf-graphic" viewBox="0 0 100 100" fill="none">
                    <path d="M20 80 Q 40 20 80 10 Q 60 70 20 80 Z" fill="rgba(212, 140, 102, 0.18)" stroke="rgba(212, 140, 102, 0.35)" strokeWidth="1.5" />
                    <path d="M40 85 Q 70 40 90 30 Q 75 80 40 85 Z" fill="rgba(224, 122, 95, 0.15)" stroke="rgba(224, 122, 95, 0.3)" strokeWidth="1.5" />
                  </svg>
                  <img
                    src={themeMode === 'dark' ? (darkSandboxHeroImg || darkHeroImg) : sandboxHeroImg}
                    alt="Engagement Team Graphic"
                    className="wf-team-illustration wf-team-illustration-large"
                  />
                </div>
              </section>

              {/* TOP 5 METRICS CARDS */}
              <section className="wf-metrics-grid">
                <div className="wf-metric-card" onClick={() => alert("78% overall workforce engagement score.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaUsers /></div><span className="wf-metric-title">Engagement Score</span></div>
                  <div className="wf-metric-value">78%</div>
                  <div className="wf-metric-trend">↑ 6% <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("412 active survey participants this month.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#e6f4ea", color: "#16a34a" }}><FaUserCheck /></div><span className="wf-metric-title">Active Participants</span></div>
                  <div className="wf-metric-value">412</div>
                  <div className="wf-metric-trend">↑ 18% <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("24 surveys conducted across teams.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#e0f2fe", color: "#0284c7" }}><FaClipboardCheck /></div><span className="wf-metric-title">Surveys Conducted</span></div>
                  <div className="wf-metric-value">24</div>
                  <div className="wf-metric-trend">↑ 9% <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("156 peer recognitions and awards sent.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#ffebe9", color: "#d9381e" }}><FaAward /></div><span className="wf-metric-title">Recognitions Sent</span></div>
                  <div className="wf-metric-value">156</div>
                  <div className="wf-metric-trend">↑ 22% <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("72% survey response rate.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fef3c7", color: "#b45309" }}><FaClock /></div><span className="wf-metric-title">Response Rate</span></div>
                  <div className="wf-metric-value">72%</div>
                  <div className="wf-metric-trend">↑ 7% <span className="wf-metric-trend-label">from last month</span></div>
                </div>
              </section>

              {/* ENGAGEMENT MAIN GRID (2 COLUMNS) */}
              <section className="wf-teams-grid">
                
                {/* LEFT CARD: ENGAGEMENT OVERVIEW TABLE */}
                <div className="wf-card">
                  <div className="wf-card-header" style={{ flexWrap: "wrap", gap: "12px" }}>
                    <h2 className="wf-card-title">Engagement Overview</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <select className="wf-select-filter">
                        <option>📅 May 1 – May 31, 2025</option>
                        <option>📅 April 1 – April 30, 2025</option>
                      </select>

                      <select className="wf-select-filter" value={engagementDeptFilter} onChange={(e) => setEngagementDeptFilter(e.target.value)}>
                        <option value="All Departments">All Departments</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Operations">Operations</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Human Resources">Human Resources</option>
                      </select>

                      <button className="wf-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "8px 14px" }} onClick={() => setShowCreateSurveyModal(true)}>
                        <FaPlus /> Create Survey
                      </button>
                    </div>
                  </div>

                  <div className="wf-table-responsive">
                    <table className="wf-table">
                      <thead>
                        <tr>
                          <th>Survey / Initiative</th>
                          <th>Type</th>
                          <th>Participants</th>
                          <th>Response Rate</th>
                          <th>Engagement Score</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {engagementInitiatives.map(item => (
                          <tr key={item.id}>
                            <td>
                              <div className="wf-team-cell">
                                <div className="wf-dept-icon-box" style={{ background: "#e0f2fe", color: "#0284c7" }}>
                                  <FaClipboardCheck />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                  <span style={{ fontWeight: "700", color: "var(--wf-text-primary)" }}>{item.title}</span>
                                  <span className="wf-emp-id-sub">{item.date}</span>
                                </div>
                              </div>
                            </td>

                            <td>
                              <span className={`wf-type-tag ${item.type === "Survey" ? "survey" : "initiative"}`}>
                                {item.type}
                              </span>
                            </td>

                            <td><strong>{item.participants}</strong></td>
                            <td>{item.responseRate}</td>

                            <td>
                              <div className="wf-score-badge">
                                <span>{item.score}</span>
                                <span className={`wf-score-lbl ${
                                  item.scoreLbl === "Excellent" ? "excellent" :
                                  item.scoreLbl === "Good" ? "good" : "average"
                                }`}>
                                  {item.scoreLbl}
                                </span>
                              </div>
                            </td>

                            <td>
                              <span className={`wf-status-pill ${
                                item.status === "Completed" ? "completed" :
                                item.status === "Active" ? "active-status" : "ongoing"
                              }`}>
                                {item.status}
                              </span>
                            </td>

                            <td>
                              <button className="wf-action-dots-btn" onClick={() => alert(`Actions for initiative: ${item.title}`)}>
                                <FaEllipsisV />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="wf-pagination">
                    <span>Showing 1 to 5 of 24 items</span>
                    <div className="wf-page-numbers">
                      <button className="wf-page-btn">&lt;</button>
                      <button className="wf-page-btn active">1</button>
                      <button className="wf-page-btn">2</button>
                      <button className="wf-page-btn">3</button>
                      <span>...</span>
                      <button className="wf-page-btn">5</button>
                      <button className="wf-page-btn">&gt;</button>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN STACK (2 CARDS MATCHING REFERENCE IMAGE) */}
                <div className="wf-teams-right-stack">
                  
                  {/* 1. Engagement Score Trend Area Line Chart */}
                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Engagement Score Trend</h2>
                      <select className="wf-select-filter">
                        <option>This Month</option>
                        <option>Last Month</option>
                      </select>
                    </div>

                    <div className="wf-overview-chart-container">
                      <svg className="wf-svg-line-chart" viewBox="0 0 340 150">
                        <defs>
                          <linearGradient id="engTrendGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8c5338" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#8c5338" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        <line x1="30" y1="20" x2="330" y2="20" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="45" x2="330" y2="45" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="70" x2="330" y2="70" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="95" x2="330" y2="95" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="120" x2="330" y2="120" stroke="#ebdcd0" strokeWidth="1.5" />

                        <text x="10" y="24" fill="#a39285" fontSize="9">100%</text>
                        <text x="10" y="49" fill="#a39285" fontSize="9">75%</text>
                        <text x="10" y="74" fill="#a39285" fontSize="9">50%</text>
                        <text x="10" y="99" fill="#a39285" fontSize="9">25%</text>
                        <text x="15" y="124" fill="#a39285" fontSize="9">0%</text>

                        <path d="M 40 70 Q 95 55, 150 50 T 260 55 T 310 35 L 310 120 L 40 120 Z" fill="url(#engTrendGrad)" />
                        <path d="M 40 70 Q 95 55, 150 50 T 260 55 T 310 35" fill="none" stroke="#8c5338" strokeWidth="2.5" strokeLinecap="round" />

                        <circle cx="40" cy="70" r="3.5" fill="#8c5338" />
                        <circle cx="95" cy="55" r="3.5" fill="#8c5338" />
                        <circle cx="150" cy="50" r="3.5" fill="#8c5338" />
                        <circle cx="205" cy="42" r="3.5" fill="#8c5338" />
                        <circle cx="260" cy="55" r="3.5" fill="#8c5338" />
                        <circle cx="310" cy="35" r="3.5" fill="#8c5338" />

                        <text x="40" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 1</text>
                        <text x="95" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 7</text>
                        <text x="150" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 14</text>
                        <text x="205" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 21</text>
                        <text x="260" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 28</text>
                        <text x="310" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 31</text>
                      </svg>
                    </div>
                  </div>

                  {/* 2. Top Engagement Drivers */}
                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Top Engagement Drivers</h2>
                      <span className="wf-card-action" onClick={() => alert("Viewing all engagement driver analytics...")}>View All</span>
                    </div>

                    <div className="wf-driver-list">
                      <div className="wf-driver-row">
                        <div className="wf-driver-info">
                          <FaTrophy style={{ color: "#8c5338", fontSize: "14px" }} />
                          <span>Recognition & Appreciation</span>
                        </div>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "86%", background: "#22c55e" }} /></div>
                          <span className="wf-progress-val" style={{ width: "36px", fontWeight: "800" }}>86%</span>
                        </div>
                      </div>

                      <div className="wf-driver-row">
                        <div className="wf-driver-info">
                          <FaRocket style={{ color: "#8c5338", fontSize: "14px" }} />
                          <span>Growth & Opportunities</span>
                        </div>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "80%", background: "#22c55e" }} /></div>
                          <span className="wf-progress-val" style={{ width: "36px", fontWeight: "800" }}>80%</span>
                        </div>
                      </div>

                      <div className="wf-driver-row">
                        <div className="wf-driver-info">
                          <FaBalanceScale style={{ color: "#8c5338", fontSize: "14px" }} />
                          <span>Work-Life Balance</span>
                        </div>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "74%", background: "#22c55e" }} /></div>
                          <span className="wf-progress-val" style={{ width: "36px", fontWeight: "800" }}>74%</span>
                        </div>
                      </div>

                      <div className="wf-driver-row">
                        <div className="wf-driver-info">
                          <FaComments style={{ color: "#8c5338", fontSize: "14px" }} />
                          <span>Communication</span>
                        </div>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "70%", background: "#22c55e" }} /></div>
                          <span className="wf-progress-val" style={{ width: "36px", fontWeight: "800" }}>70%</span>
                        </div>
                      </div>

                      <div className="wf-driver-row">
                        <div className="wf-driver-info">
                          <FaUserFriends style={{ color: "#8c5338", fontSize: "14px" }} />
                          <span>Team Collaboration</span>
                        </div>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "68%", background: "#22c55e" }} /></div>
                          <span className="wf-progress-val" style={{ width: "36px", fontWeight: "800" }}>68%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            </>
          )}

          {/* TAB 7: ATTENDANCE MANAGEMENT */}
          {activeTab === "Attendance" && (
            <>
              <section className="wf-welcome-banner wf-hero-banner-enhanced">
                <div className="wf-welcome-text">
                  <h1>Attendance Management</h1>
                  <p>Track, manage and analyze attendance in real-time. Monitor presence, leaves and punctuality across your organization.</p>
                  <button className="wf-btn-primary" style={{ marginTop: "14px" }} onClick={() => setActiveTab("Overview")}>
                    Return to Overview Dashboard
                  </button>
                </div>
                <div className="wf-welcome-graphic wf-welcome-graphic-enhanced">
                  <div className="wf-hero-glow-backdrop" />
                  <div className="wf-hero-dot-matrix" />
                  <svg className="wf-hero-leaf-graphic" viewBox="0 0 100 100" fill="none">
                    <path d="M20 80 Q 40 20 80 10 Q 60 70 20 80 Z" fill="rgba(212, 140, 102, 0.18)" stroke="rgba(212, 140, 102, 0.35)" strokeWidth="1.5" />
                    <path d="M40 85 Q 70 40 90 30 Q 75 80 40 85 Z" fill="rgba(224, 122, 95, 0.15)" stroke="rgba(224, 122, 95, 0.3)" strokeWidth="1.5" />
                  </svg>
                  <img
                    src={themeMode === 'dark' ? (darkWorkHubHeroImg || darkWorkforcePortalImg) : workHubHeroImg}
                    alt="Attendance Illustration"
                    className="wf-team-illustration wf-team-illustration-large"
                  />
                </div>
              </section>

              <section className="wf-metrics-grid">
                <div className="wf-metric-card" onClick={() => setAttendanceDeptFilter("All Departments")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaUsers /></div><span className="wf-metric-title">Total Employees</span></div>
                  <div className="wf-metric-value">512</div>
                  <div className="wf-metric-trend">↑ 18 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("428 employees present today (83.6% of total workforce).")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#e6f4ea", color: "#16a34a" }}><FaUserCheck /></div><span className="wf-metric-title">Present Today</span></div>
                  <div className="wf-metric-value">428</div>
                  <div className="wf-metric-trend">↑ 83.6% <span className="wf-metric-trend-label">of total</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("54 employees absent today (10.5% of total workforce).")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#ffebe9", color: "#d9381e" }}><FaUserTimes /></div><span className="wf-metric-title">Absent Today</span></div>
                  <div className="wf-metric-value">54</div>
                  <div className="wf-metric-trend down">↑ 10.5% <span className="wf-metric-trend-label">of total</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("30 employees on approved leave today (5.9% of total).")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fff7ed", color: "#c2410c" }}><FaBriefcase /></div><span className="wf-metric-title">On Leave</span></div>
                  <div className="wf-metric-value">30</div>
                  <div className="wf-metric-trend" style={{ color: "#c2410c" }}>→ 5.9% <span className="wf-metric-trend-label">of total</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("16 late arrivals recorded today (3.1% of present).")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#f3e8ff", color: "#7e22ce" }}><FaClock /></div><span className="wf-metric-title">Late Arrivals</span></div>
                  <div className="wf-metric-value">16</div>
                  <div className="wf-metric-trend" style={{ color: "#7e22ce" }}>↑ 3.1% <span className="wf-metric-trend-label">of present</span></div>
                </div>
              </section>

              <section className="wf-teams-grid">
                <div className="wf-card">
                  <div className="wf-card-header" style={{ flexWrap: "wrap", gap: "12px" }}>
                    <h2 className="wf-card-title">Attendance Overview</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <select className="wf-select-filter" value={attendanceDateFilter} onChange={(e) => setAttendanceDateFilter(e.target.value)}>
                        <option value="May 1 – May 31, 2025">📅 May 1 – May 31, 2025</option>
                        <option value="April 1 – April 30, 2025">📅 April 1 – April 30, 2025</option>
                      </select>

                      <select className="wf-select-filter" value={attendanceDeptFilter} onChange={(e) => setAttendanceDeptFilter(e.target.value)}>
                        <option value="All Departments">All Departments</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Operations">Operations</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Human Resources">Human Resources</option>
                      </select>

                      <button className="wf-hamburger-btn" style={{ width: "34px", height: "34px" }} title="Filter Logs">
                        <FaFilterIcon style={{ fontSize: "13px" }} />
                      </button>

                      <button className="wf-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "8px 14px", background: "var(--wf-accent-dark-brown, #5c2c19)" }} onClick={() => setShowCalendarModal(true)}>
                        <FaCalendarAlt /> View Calendar
                      </button>

                      <button className="wf-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "8px 14px", background: "#f9572a" }} onClick={() => setShowApplyLeaveModal(true)}>
                        <FaPlus /> Apply for Leave
                      </button>

                      <button className="wf-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "8px 14px" }} onClick={() => setShowExportModal(true)}>
                        <FaFileExport /> Export Report
                      </button>
                    </div>
                  </div>

                  {/* Leave Requests Queue */}
                  <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: themeMode === 'dark' ? "rgba(255,255,255,0.02)" : "#FAF8F5" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "800", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span>📋 Leave Requests & Approval Status</span>
                        {(leaveRequests || []).length > 0 && (
                          <span style={{ fontSize: "11px", background: "#FFF0ED", color: "#F9572A", padding: "2px 8px", borderRadius: "10px" }}>
                            {(leaveRequests || []).length} Total
                          </span>
                        )}
                      </h4>
                      <span style={{ fontSize: "12px", color: "#64748B" }}>Synced with Admin Portal</span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
                      {(leaveRequests || []).map(lr => (
                        <div key={lr.id} style={{
                          background: themeMode === 'dark' ? '#1E293B' : '#FFFFFF',
                          border: '1px solid rgba(0,0,0,0.08)',
                          borderRadius: '12px',
                          padding: '12px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '750', fontSize: '13px' }}>{lr.employeeName}</span>
                            <span style={{
                              padding: '3px 10px',
                              borderRadius: '10px',
                              fontSize: '11px',
                              fontWeight: '800',
                              textTransform: 'capitalize',
                              background: themeMode === 'dark'
                                ? (lr.status === 'approved' ? 'rgba(16, 185, 129, 0.25)' : lr.status === 'rejected' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(245, 158, 11, 0.25)')
                                : (lr.status === 'approved' ? '#ECFDF5' : lr.status === 'rejected' ? '#FEF2F2' : '#FFFBEB'),
                              color: themeMode === 'dark'
                                ? (lr.status === 'approved' ? '#34D399' : lr.status === 'rejected' ? '#F87171' : '#FBBF24')
                                : (lr.status === 'approved' ? '#047857' : lr.status === 'rejected' ? '#B91C1C' : '#B45309'),
                              border: themeMode === 'dark'
                                ? (lr.status === 'approved' ? '1px solid rgba(52, 211, 153, 0.35)' : lr.status === 'rejected' ? '1px solid rgba(248, 113, 113, 0.35)' : '1px solid rgba(251, 191, 36, 0.35)')
                                : 'none'
                            }}>
                              {lr.status === 'approved' ? '✓ Approved' : lr.status === 'rejected' ? '✕ Rejected' : '⏳ Pending'}
                            </span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>
                            {lr.leaveType} • {lr.startDate} to {lr.endDate} ({lr.days}d)
                          </div>
                          <div style={{ fontSize: '11px', color: '#94A3B8', fontStyle: 'italic' }}>
                            "{lr.reason}"
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="wf-table-responsive">
                    <table className="wf-table">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Department</th>
                          <th>Status</th>
                          <th>Check In</th>
                          <th>Check Out</th>
                          <th>Work Hours</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAttendance.map(log => (
                          <tr key={log.empId}>
                            <td>
                              <div className="wf-team-cell">
                                <img src={log.avatar} alt={log.name} className="wf-activity-avatar" />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                  <span style={{ fontWeight: "700", color: "var(--wf-text-primary)" }}>{log.name}</span>
                                  <span className="wf-emp-id-sub">{log.empId}</span>
                                </div>
                              </div>
                            </td>

                            <td>{log.dept}</td>

                            <td>
                              <span className={`wf-status-pill ${
                                log.status === "Present" ? "present" :
                                log.status === "Absent" ? "absent" :
                                log.status === "On Leave" ? "onleave" : "late"
                              }`}>
                                {log.status}
                              </span>
                            </td>

                            <td>{log.checkIn}</td>
                            <td>{log.checkOut}</td>
                            <td><strong>{log.workHours}</strong></td>

                            <td>
                              <button className="wf-action-dots-btn" onClick={() => alert(`Attendance details for ${log.name} (${log.empId})`)}>
                                <FaEllipsisV />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="wf-pagination">
                    <span>Showing 1 to {filteredAttendance.length} of 512 employees</span>
                    <div className="wf-page-numbers">
                      <button className="wf-page-btn">&lt;</button>
                      <button className="wf-page-btn active">1</button>
                      <button className="wf-page-btn">2</button>
                      <button className="wf-page-btn">3</button>
                      <span>...</span>
                      <button className="wf-page-btn">103</button>
                      <button className="wf-page-btn">&gt;</button>
                    </div>
                  </div>
                </div>

                <div className="wf-teams-right-stack">
                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Attendance Summary</h2>
                      <select className="wf-select-filter">
                        <option>This Month</option>
                        <option>Last Month</option>
                      </select>
                    </div>

                    <div className="wf-skill-donut-wrapper">
                      <div className="wf-donut-chart-box" style={{ width: "150px", height: "150px" }}>
                        <svg width="150" height="150" viewBox="0 0 150 150">
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#22c55e" strokeWidth="20" strokeDasharray="273 53.7" strokeDashoffset="0" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="34.3 292.4" strokeDashoffset="-273" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#f97316" strokeWidth="20" strokeDasharray="19.3 307.4" strokeDashoffset="-307.3" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#a855f7" strokeWidth="20" strokeDasharray="10.1 316.6" strokeDashoffset="-326.6" />
                        </svg>
                        <div className="wf-donut-center-text">
                          <span className="wf-donut-number" style={{ fontSize: "20px" }}>83.6%</span>
                          <span className="wf-donut-label" style={{ fontSize: "10px" }}>Average<br />Attendance</span>
                        </div>
                      </div>

                      <div className="wf-donut-legend-list">
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#22c55e" }} /><span>Present</span></div><span className="wf-donut-percent">83.6% (428)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#ef4444" }} /><span>Absent</span></div><span className="wf-donut-percent">10.5% (54)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#f97316" }} /><span>On Leave</span></div><span className="wf-donut-percent">5.9% (30)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#a855f7" }} /><span>Late Arrivals</span></div><span className="wf-donut-percent">3.1% (16)</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Attendance Trend</h2>
                      <select className="wf-select-filter">
                        <option>This Month</option>
                        <option>Last Month</option>
                      </select>
                    </div>

                    <div className="wf-overview-chart-container">
                      <svg className="wf-svg-line-chart" viewBox="0 0 340 150">
                        <defs>
                          <linearGradient id="attTrendGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8c5338" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#8c5338" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        <line x1="30" y1="20" x2="330" y2="20" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="45" x2="330" y2="45" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="70" x2="330" y2="70" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="95" x2="330" y2="95" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="120" x2="330" y2="120" stroke="#ebdcd0" strokeWidth="1.5" />

                        <text x="10" y="24" fill="#a39285" fontSize="9">100%</text>
                        <text x="10" y="49" fill="#a39285" fontSize="9">75%</text>
                        <text x="10" y="74" fill="#a39285" fontSize="9">50%</text>
                        <text x="10" y="99" fill="#a39285" fontSize="9">25%</text>
                        <text x="15" y="124" fill="#a39285" fontSize="9">0%</text>

                        <path d="M 40 90 Q 90 65, 140 45 T 240 50 T 310 40 L 310 120 L 40 120 Z" fill="url(#attTrendGrad)" />
                        <path d="M 40 90 Q 90 65, 140 45 T 240 50 T 310 40" fill="none" stroke="#8c5338" strokeWidth="2.5" strokeLinecap="round" />

                        <circle cx="40" cy="90" r="3.5" fill="#8c5338" />
                        <circle cx="95" cy="65" r="3.5" fill="#8c5338" />
                        <circle cx="150" cy="45" r="3.5" fill="#8c5338" />
                        <circle cx="205" cy="50" r="3.5" fill="#8c5338" />
                        <circle cx="260" cy="55" r="3.5" fill="#8c5338" />
                        <circle cx="310" cy="40" r="3.5" fill="#8c5338" />

                        <text x="40" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 1</text>
                        <text x="95" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 7</text>
                        <text x="150" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 14</text>
                        <text x="205" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 21</text>
                        <text x="260" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 28</text>
                        <text x="310" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May 31</text>
                      </svg>
                    </div>
                  </div>

                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Top Departments by Attendance</h2>
                      <span className="wf-card-action" onClick={() => alert("Viewing department attendance details...")}>View All</span>
                    </div>

                    <div className="wf-dept-att-list">
                      <div className="wf-dept-att-row">
                        <div className="wf-dept-att-info">
                          <FaUsers style={{ color: "#8c5338", fontSize: "14px" }} />
                          <span>Engineering</span>
                        </div>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "88.2%", background: "#22c55e" }} /></div>
                          <span className="wf-progress-val" style={{ width: "42px", fontWeight: "800" }}>88.2%</span>
                        </div>
                      </div>

                      <div className="wf-dept-att-row">
                        <div className="wf-dept-att-info">
                          <FaUsers style={{ color: "#8c5338", fontSize: "14px" }} />
                          <span>Marketing</span>
                        </div>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "85.4%", background: "#22c55e" }} /></div>
                          <span className="wf-progress-val" style={{ width: "42px", fontWeight: "800" }}>85.4%</span>
                        </div>
                      </div>

                      <div className="wf-dept-att-row">
                        <div className="wf-dept-att-info">
                          <FaUsers style={{ color: "#8c5338", fontSize: "14px" }} />
                          <span>Data Science</span>
                        </div>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "82.7%", background: "#22c55e" }} /></div>
                          <span className="wf-progress-val" style={{ width: "42px", fontWeight: "800" }}>82.7%</span>
                        </div>
                      </div>

                      <div className="wf-dept-att-row">
                        <div className="wf-dept-att-info">
                          <FaUsers style={{ color: "#8c5338", fontSize: "14px" }} />
                          <span>Human Resources</span>
                        </div>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "80.1%", background: "#22c55e" }} /></div>
                          <span className="wf-progress-val" style={{ width: "42px", fontWeight: "800" }}>80.1%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: EMPLOYEES MANAGEMENT */}
          {activeTab === "Employees" && (
            <>
              <section className="wf-welcome-banner wf-hero-banner-enhanced">
                <div className="wf-welcome-text">
                  <h1>Employees Management Control Panel</h1>
                  <p>Real-time workforce management center for employees. Access team allocation tools and analytics.</p>
                  <button className="wf-btn-primary" style={{ marginTop: "14px" }} onClick={() => setActiveTab("Overview")}>
                    Return to Overview Dashboard
                  </button>
                </div>
                <div className="wf-welcome-graphic wf-welcome-graphic-enhanced">
                  <div className="wf-hero-glow-backdrop" />
                  <div className="wf-hero-dot-matrix" />
                  <svg className="wf-hero-leaf-graphic" viewBox="0 0 100 100" fill="none">
                    <path d="M20 80 Q 40 20 80 10 Q 60 70 20 80 Z" fill="rgba(212, 140, 102, 0.18)" stroke="rgba(212, 140, 102, 0.35)" strokeWidth="1.5" />
                    <path d="M40 85 Q 70 40 90 30 Q 75 80 40 85 Z" fill="rgba(224, 122, 95, 0.15)" stroke="rgba(224, 122, 95, 0.3)" strokeWidth="1.5" />
                  </svg>
                  <img
                    src={themeMode === 'dark' ? (darkWorkforcePortalImg || darkWorkHubHeroImg) : workforcePortalImg}
                    alt="Employees Team Graphic"
                    className="wf-team-illustration wf-team-illustration-large"
                  />
                </div>
              </section>

              <section className="wf-metrics-grid">
                <div className="wf-metric-card" onClick={() => setEmpSearch("")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaUsers /></div><span className="wf-metric-title">Total Employees</span></div>
                  <div className="wf-metric-value">512</div>
                  <div className="wf-metric-trend">↑ 18 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => setEmpSearch("Active")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#faf0e6" }}><FaUserCheck /></div><span className="wf-metric-title">Active Employees</span></div>
                  <div className="wf-metric-value">482</div>
                  <div className="wf-metric-trend">↑ 16 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("16 new employees joined this month.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaUserPlus /></div><span className="wf-metric-title">New Hires</span></div>
                  <div className="wf-metric-value">16</div>
                  <div className="wf-metric-trend">↑ 4 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => setEmpSearch("Inactive")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#ffebe9" }}><FaUserTimes /></div><span className="wf-metric-title">Deactivated</span></div>
                  <div className="wf-metric-value">14</div>
                  <div className="wf-metric-trend down">↓ 2 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("8 active organizational departments.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaBuilding /></div><span className="wf-metric-title">Departments</span></div>
                  <div className="wf-metric-value">8</div>
                  <div className="wf-metric-trend" style={{ color: "var(--wf-text-muted)" }}>— <span className="wf-metric-trend-label">No change</span></div>
                </div>
              </section>

              <section className="wf-teams-grid">
                <div className="wf-card">
                  <div className="wf-card-header" style={{ flexWrap: "wrap", gap: "12px" }}>
                    <h2 className="wf-card-title">Employee Overview</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div className="wf-search-box" style={{ width: "200px", padding: "4px 12px" }}>
                        <FaSearch className="wf-search-icon" />
                        <input
                          type="text"
                          placeholder="Search employee..."
                          className="wf-search-input"
                          value={empSearch}
                          onChange={(e) => setEmpSearch(e.target.value)}
                        />
                      </div>
                      <button className="wf-hamburger-btn" style={{ width: "34px", height: "34px" }} title="Filter Employees">
                        <FaFilterIcon style={{ fontSize: "13px" }} />
                      </button>
                      <button className="wf-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "8px 14px" }} onClick={() => setShowEmployeeModal(true)}>
                        <FaPlus /> Add Employee
                      </button>
                    </div>
                  </div>

                  <div className="wf-table-responsive">
                    <table className="wf-table">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Department</th>
                          <th>Designation</th>
                          <th>Status</th>
                          <th>Join Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmployees.map(emp => (
                          <tr key={emp.empId}>
                            <td>
                              <div className="wf-team-cell">
                                <img src={emp.avatar} alt={emp.name} className="wf-activity-avatar" />
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                  <span style={{ fontWeight: "700", color: "var(--wf-text-primary)" }}>{emp.name}</span>
                                  <span className="wf-emp-id-sub">{emp.empId}</span>
                                </div>
                              </div>
                            </td>

                            <td>{emp.dept}</td>
                            <td>{emp.designation}</td>

                            <td>
                              <span className={`wf-status-pill ${emp.status === "Active" ? "completed" : "not-started"}`}>
                                {emp.status}
                              </span>
                            </td>

                            <td>{emp.joinDate}</td>

                            <td>
                              <button className="wf-action-dots-btn" onClick={() => alert(`Actions for employee: ${emp.name} (${emp.empId})`)}>
                                <FaEllipsisV />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="wf-pagination">
                    <span>Showing 1 to {filteredEmployees.length} of 512 employees</span>
                    <div className="wf-page-numbers">
                      <button className="wf-page-btn">&lt;</button>
                      <button className="wf-page-btn active">1</button>
                      <button className="wf-page-btn">2</button>
                      <button className="wf-page-btn">3</button>
                      <span>...</span>
                      <button className="wf-page-btn">103</button>
                      <button className="wf-page-btn">&gt;</button>
                    </div>
                  </div>
                </div>

                <div className="wf-teams-right-stack">
                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Employees by Department</h2>
                      <select className="wf-select-filter">
                        <option>This Month</option>
                        <option>Last Month</option>
                      </select>
                    </div>

                    <div className="wf-skill-donut-wrapper">
                      <div className="wf-donut-chart-box" style={{ width: "150px", height: "150px" }}>
                        <svg width="150" height="150" viewBox="0 0 150 150">
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#5c2c19" strokeWidth="20" strokeDasharray="130.6 196.3" strokeDashoffset="0" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#9e5837" strokeWidth="20" strokeDasharray="65.3 261.6" strokeDashoffset="-130.6" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#d48c66" strokeWidth="20" strokeDasharray="49 277.9" strokeDashoffset="-195.9" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#eacab5" strokeWidth="20" strokeDasharray="49 277.9" strokeDashoffset="-244.9" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#f5e4d7" strokeWidth="20" strokeDasharray="32.7 294.2" strokeDashoffset="-293.9" />
                        </svg>
                        <div className="wf-donut-center-text">
                          <span className="wf-donut-number" style={{ fontSize: "20px" }}>512</span>
                          <span className="wf-donut-label" style={{ fontSize: "10px" }}>Total</span>
                        </div>
                      </div>

                      <div className="wf-donut-legend-list">
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#5c2c19" }} /><span>Engineering</span></div><span className="wf-donut-percent">40% (205)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#9e5837" }} /><span>Operations</span></div><span className="wf-donut-percent">20% (102)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#d48c66" }} /><span>Marketing</span></div><span className="wf-donut-percent">15% (77)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#eacab5" }} /><span>Data Science</span></div><span className="wf-donut-percent">15% (77)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#f5e4d7" }} /><span>Human Resources</span></div><span className="wf-donut-percent">10% (51)</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Recent New Hires</h2>
                      <span className="wf-card-action" onClick={() => alert("Viewing all recent new hires...")}>View All</span>
                    </div>

                    <div className="wf-recent-hires-list">
                      <div className="wf-recent-hire-item">
                        <div className="wf-recent-hire-left">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Karan" className="wf-recent-hire-avatar" />
                          <div className="wf-recent-hire-details">
                            <span className="wf-recent-hire-name">Karan Malhotra</span>
                            <span className="wf-recent-hire-role">Product Designer</span>
                          </div>
                        </div>
                        <span className="wf-recent-hire-date">20 May, 2025</span>
                      </div>

                      <div className="wf-recent-hire-item">
                        <div className="wf-recent-hire-left">
                          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Pooja" className="wf-recent-hire-avatar" />
                          <div className="wf-recent-hire-details">
                            <span className="wf-recent-hire-name">Pooja Nair</span>
                            <span className="wf-recent-hire-role">HR Generalist</span>
                          </div>
                        </div>
                        <span className="wf-recent-hire-date">18 May, 2025</span>
                      </div>

                      <div className="wf-recent-hire-item">
                        <div className="wf-recent-hire-left">
                          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Rohit" className="wf-recent-hire-avatar" />
                          <div className="wf-recent-hire-details">
                            <span className="wf-recent-hire-name">Rohit Das</span>
                            <span className="wf-recent-hire-role">Data Analyst</span>
                          </div>
                        </div>
                        <span className="wf-recent-hire-date">15 May, 2025</span>
                      </div>
                    </div>

                    <span className="wf-card-action" style={{ marginTop: "14px", alignSelf: "flex-start" }} onClick={() => alert("Redirecting to New Hires Onboarding Hub...")}>
                      View all new hires →
                    </span>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 3: TEAMS MANAGEMENT */}
          {activeTab === "Teams" && (
            <>
              <section className="wf-welcome-banner wf-hero-banner-enhanced">
                <div className="wf-welcome-text">
                  <h1>Teams Management Control Panel</h1>
                  <p>Real-time workforce management center for teams. Access team allocation tools and analytics.</p>
                  <button className="wf-btn-primary" style={{ marginTop: "14px" }} onClick={() => setActiveTab("Overview")}>
                    Return to Overview Dashboard
                  </button>
                </div>
                <div className="wf-welcome-graphic wf-welcome-graphic-enhanced">
                  <div className="wf-hero-glow-backdrop" />
                  <div className="wf-hero-dot-matrix" />
                  <svg className="wf-hero-leaf-graphic" viewBox="0 0 100 100" fill="none">
                    <path d="M20 80 Q 40 20 80 10 Q 60 70 20 80 Z" fill="rgba(212, 140, 102, 0.18)" stroke="rgba(212, 140, 102, 0.35)" strokeWidth="1.5" />
                    <path d="M40 85 Q 70 40 90 30 Q 75 80 40 85 Z" fill="rgba(224, 122, 95, 0.15)" stroke="rgba(224, 122, 95, 0.3)" strokeWidth="1.5" />
                  </svg>
                  <img
                    src={themeMode === 'dark' ? (darkWorkHubHeroImg || darkHeroImg) : workHubHeroImg}
                    alt="Teams Graphic"
                    className="wf-team-illustration wf-team-illustration-large"
                  />
                </div>
              </section>

              <section className="wf-metrics-grid">
                <div className="wf-metric-card" onClick={() => alert("24 Active Teams across 8 organizational departments.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaUserFriends /></div><span className="wf-metric-title">Total Teams</span></div>
                  <div className="wf-metric-value">24</div>
                  <div className="wf-metric-trend">↑ 3 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("512 total team members allocated.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#faf0e6" }}><FaUsers /></div><span className="wf-metric-title">Total Members</span></div>
                  <div className="wf-metric-value">512</div>
                  <div className="wf-metric-trend">↑ 18 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("8 organizational business departments.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaBuilding /></div><span className="wf-metric-title">Departments</span></div>
                  <div className="wf-metric-value">8</div>
                  <div className="wf-metric-trend">↗ 1 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("21 Active teams currently executing projects.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#e6f4ea" }}><FaUserCheck /></div><span className="wf-metric-title">Active Teams</span></div>
                  <div className="wf-metric-value">21</div>
                  <div className="wf-metric-trend">↑ 2 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("2 New teams formed this month.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#ffebe9" }}><FaUserPlus /></div><span className="wf-metric-title">New Teams</span></div>
                  <div className="wf-metric-value">2</div>
                  <div className="wf-metric-trend down">↓ 1 <span className="wf-metric-trend-label">from last month</span></div>
                </div>
              </section>

              <section className="wf-teams-grid">
                <div className="wf-card">
                  <div className="wf-card-header" style={{ flexWrap: "wrap", gap: "12px" }}>
                    <h2 className="wf-card-title">Teams Overview</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div className="wf-search-box" style={{ width: "200px", padding: "4px 12px" }}>
                        <FaSearch className="wf-search-icon" />
                        <input
                          type="text"
                          placeholder="Search team..."
                          className="wf-search-input"
                          value={teamSearch}
                          onChange={(e) => setTeamSearch(e.target.value)}
                        />
                      </div>
                      <button className="wf-hamburger-btn" style={{ width: "34px", height: "34px" }} title="Filter Teams">
                        <FaFilterIcon style={{ fontSize: "13px" }} />
                      </button>
                      <button className="wf-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "8px 14px" }} onClick={() => setShowCreateTeamModal(true)}>
                        <FaPlus /> Create Team
                      </button>
                    </div>
                  </div>

                  <div className="wf-table-responsive">
                    <table className="wf-table">
                      <thead>
                        <tr>
                          <th>Team Name</th>
                          <th>Team Lead</th>
                          <th>Members</th>
                          <th>Department</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTeams.map(t => (
                          <tr key={t.id}>
                            <td>
                              <div className="wf-team-name-box">
                                <div className="wf-team-icon-avatar" style={{ background: t.iconBg, color: t.iconColor }}>
                                  {t.icon}
                                </div>
                                <div className="wf-team-title-text">
                                  <span className="wf-team-title-main">{t.name}</span>
                                  <span className="wf-team-desc-sub">{t.desc}</span>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="wf-team-lead-cell">
                                <img src={t.leadAvatar} alt={t.leadName} className="wf-team-lead-avatar" />
                                <div className="wf-team-lead-info">
                                  <span className="wf-team-lead-name">{t.leadName}</span>
                                  <span className="wf-team-lead-dept">{t.leadDept}</span>
                                </div>
                              </div>
                            </td>

                            <td><strong>{t.members}</strong></td>
                            <td>{t.dept}</td>

                            <td>
                              <span className={`wf-status-pill ${t.status === "Active" ? "completed" : "not-started"}`}>
                                {t.status}
                              </span>
                            </td>

                            <td>
                              <button className="wf-action-dots-btn" onClick={() => alert(`Actions for team: ${t.name}`)}>
                                <FaEllipsisV />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="wf-pagination">
                    <span>Showing 1 to {filteredTeams.length} of 24 teams</span>
                    <div className="wf-page-numbers">
                      <button className="wf-page-btn">&lt;</button>
                      <button className="wf-page-btn active">1</button>
                      <button className="wf-page-btn">2</button>
                      <button className="wf-page-btn">3</button>
                      <span>...</span>
                      <button className="wf-page-btn">5</button>
                      <button className="wf-page-btn">&gt;</button>
                    </div>
                  </div>
                </div>

                <div className="wf-teams-right-stack">
                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Team Allocation Summary</h2>
                      <select className="wf-select-filter">
                        <option>This Month</option>
                        <option>Last Month</option>
                      </select>
                    </div>

                    <div className="wf-skill-donut-wrapper">
                      <div className="wf-donut-chart-box" style={{ width: "150px", height: "150px" }}>
                        <svg width="150" height="150" viewBox="0 0 150 150">
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#5c2c19" strokeWidth="20" strokeDasharray="130.6 196.3" strokeDashoffset="0" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#9e5837" strokeWidth="20" strokeDasharray="65.3 261.6" strokeDashoffset="-130.6" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#d48c66" strokeWidth="20" strokeDasharray="49 277.9" strokeDashoffset="-195.9" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#eacab5" strokeWidth="20" strokeDasharray="49 277.9" strokeDashoffset="-244.9" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#f5e4d7" strokeWidth="20" strokeDasharray="32.7 294.2" strokeDashoffset="-293.9" />
                        </svg>
                        <div className="wf-donut-center-text">
                          <span className="wf-donut-number" style={{ fontSize: "20px" }}>512</span>
                          <span className="wf-donut-label" style={{ fontSize: "10px" }}>Total Members</span>
                        </div>
                      </div>

                      <div className="wf-donut-legend-list">
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#5c2c19" }} /><span>Engineering</span></div><span className="wf-donut-percent">40% (205)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#9e5837" }} /><span>Operations</span></div><span className="wf-donut-percent">20% (102)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#d48c66" }} /><span>Marketing</span></div><span className="wf-donut-percent">15% (77)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#eacab5" }} /><span>Data Science</span></div><span className="wf-donut-percent">15% (77)</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#f5e4d7" }} /><span>Human Resources</span></div><span className="wf-donut-percent">10% (51)</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Top Performing Teams</h2>
                      <span className="wf-card-action" onClick={() => alert("Viewing all top team performance metrics...")}>View All</span>
                    </div>

                    <div className="wf-top-teams-list">
                      <div className="wf-top-team-row">
                        <span className="wf-top-team-rank">1</span>
                        <span className="wf-top-team-name">Product Development</span>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "85%" }} /></div>
                          <span className="wf-progress-val">85%</span>
                        </div>
                      </div>

                      <div className="wf-top-team-row">
                        <span className="wf-top-team-rank rank-2">2</span>
                        <span className="wf-top-team-name">Customer Success</span>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "78%" }} /></div>
                          <span className="wf-progress-val">78%</span>
                        </div>
                      </div>

                      <div className="wf-top-team-row">
                        <span className="wf-top-team-rank rank-3">3</span>
                        <span className="wf-top-team-name">Data Analytics</span>
                        <div className="wf-progress-container" style={{ flex: 1 }}>
                          <div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "75%" }} /></div>
                          <span className="wf-progress-val">75%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "Overview" && (
            <>
              <section className="wf-welcome-banner wf-hero-banner-enhanced">
                <div className="wf-welcome-text">
                  <h1>Welcome back, Arjun! 👋</h1>
                  <p>Here's what's happening with your workforce today.</p>
                </div>
                <div className="wf-welcome-graphic wf-welcome-graphic-enhanced">
                  <div className="wf-hero-glow-backdrop" />
                  <div className="wf-hero-dot-matrix" />
                  <svg className="wf-hero-leaf-graphic" viewBox="0 0 100 100" fill="none">
                    <path d="M20 80 Q 40 20 80 10 Q 60 70 20 80 Z" fill="rgba(212, 140, 102, 0.15)" stroke="rgba(212, 140, 102, 0.3)" strokeWidth="1.5" />
                    <path d="M40 85 Q 70 40 90 30 Q 75 80 40 85 Z" fill="rgba(224, 122, 95, 0.12)" stroke="rgba(224, 122, 95, 0.25)" strokeWidth="1.5" />
                  </svg>
                  <select className="wf-select-filter" style={{ padding: "8px 14px", fontSize: "13px", fontWeight: "700" }}>
                    <option>📅 May 1 – May 31, 2025</option>
                    <option>📅 April 1 – April 30, 2025</option>
                  </select>
                  <img
                    src={themeMode === 'dark' ? (darkWorkforcePortalImg || darkWorkHubHeroImg) : (workforcePortalImg || workHubHeroImg)}
                    alt="Workforce Team Hero Graphic"
                    className="wf-team-illustration wf-team-illustration-large"
                  />
                </div>
              </section>

              {/* TOP 5 METRICS CARDS */}
              <section className="wf-metrics-grid">
                <div className="wf-metric-card" onClick={() => setActiveTab("Employees")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaUsers /></div><span className="wf-metric-title">Total Employees</span></div>
                  <div className="wf-metric-value">512</div>
                  <div className="wf-metric-trend">↑ 18 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => setActiveTab("Skills")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#faf0e6" }}><FaStar /></div><span className="wf-metric-title">Average Skill Score</span></div>
                  <div className="wf-metric-value">78%</div>
                  <div className="wf-metric-trend">↑ 6% <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => setActiveTab("Learning")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaBookOpen /></div><span className="wf-metric-title">Training In Progress</span></div>
                  <div className="wf-metric-value">42</div>
                  <div className="wf-metric-trend">↑ 8 <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => setActiveTab("Performance")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#faf0e6" }}><FaBullseye /></div><span className="wf-metric-title">Completion Rate</span></div>
                  <div className="wf-metric-value">72%</div>
                  <div className="wf-metric-trend">↑ 9% <span className="wf-metric-trend-label">from last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => setActiveTab("Employees")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaUserPlus /></div><span className="wf-metric-title">New Hires</span></div>
                  <div className="wf-metric-value">16</div>
                  <div className="wf-metric-trend">↑ 4 <span className="wf-metric-trend-label">from last month</span></div>
                </div>
              </section>

              {/* MIDDLE SECTION */}
              <section className="wf-middle-grid">
                <div className="wf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Workforce Overview</h2>
                    <select className="wf-select-filter" value={overviewFilter} onChange={(e) => setOverviewFilter(e.target.value)}>
                      <option value="This Month">This Month</option>
                      <option value="Last Month">Last Month</option>
                      <option value="This Quarter">This Quarter</option>
                    </select>
                  </div>

                  <div className="wf-overview-chart-container">
                    <div className="wf-chart-legend">
                      <div className="wf-legend-item"><span className="wf-legend-line solid" /><span>Active Employees</span></div>
                      <div className="wf-legend-item"><span className="wf-legend-line dashed" /><span>New Hires</span></div>
                    </div>

                    <svg className="wf-svg-line-chart" viewBox="0 0 440 200">
                      <line x1="40" y1="30" x2="420" y2="30" stroke="#f2e8df" strokeWidth="1" />
                      <line x1="40" y1="60" x2="420" y2="60" stroke="#f2e8df" strokeWidth="1" />
                      <line x1="40" y1="90" x2="420" y2="90" stroke="#f2e8df" strokeWidth="1" />
                      <line x1="40" y1="120" x2="420" y2="120" stroke="#f2e8df" strokeWidth="1" />
                      <line x1="40" y1="150" x2="420" y2="150" stroke="#f2e8df" strokeWidth="1" />
                      <line x1="40" y1="180" x2="420" y2="180" stroke="#ebdcd0" strokeWidth="1.5" />

                      <text x="10" y="35" fill="#a39285" fontSize="10">600</text>
                      <text x="10" y="65" fill="#a39285" fontSize="10">500</text>
                      <text x="10" y="95" fill="#a39285" fontSize="10">400</text>
                      <text x="10" y="125" fill="#a39285" fontSize="10">300</text>
                      <text x="10" y="155" fill="#a39285" fontSize="10">200</text>
                      <text x="25" y="184" fill="#a39285" fontSize="10">0</text>

                      <path d={activePathD} fill="none" stroke="#5c2c19" strokeWidth="3.5" strokeLinecap="round" />
                      <path d={newHiresPathD} fill="none" stroke="#d48c66" strokeWidth="2.5" strokeDasharray="5,5" strokeLinecap="round" />

                      {lineChartData.active.map((pt, i) => (
                        <circle key={`act-${i}`} cx={pt.x} cy={pt.y} r="5" fill="#5c2c19" stroke="#ffffff" strokeWidth="2" style={{ cursor: "pointer" }}
                          onMouseEnter={() => setHoveredPoint({ label: `Active: ${pt.val}`, x: pt.x, y: pt.y - 12 })}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                      ))}

                      {lineChartData.newHires.map((pt, i) => (
                        <circle key={`nh-${i}`} cx={pt.x} cy={pt.y} r="4" fill="#d48c66" stroke="#ffffff" strokeWidth="2" style={{ cursor: "pointer" }}
                          onMouseEnter={() => setHoveredPoint({ label: `New: ${pt.val}`, x: pt.x, y: pt.y - 12 })}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                      ))}

                      {hoveredPoint && (
                        <g>
                          <rect x={hoveredPoint.x - 30} y={hoveredPoint.y - 18} width="60" height="20" rx="4" fill="#332219" />
                          <text x={hoveredPoint.x} y={hoveredPoint.y - 5} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
                            {hoveredPoint.label}
                          </text>
                        </g>
                      )}

                      <text x="40" y="196" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">May 1</text>
                      <text x="130" y="196" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">May 8</text>
                      <text x="220" y="196" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">May 15</text>
                      <text x="310" y="196" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">May 22</text>
                      <text x="400" y="196" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">May 29</text>
                    </svg>
                  </div>
                </div>

                <div className="wf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Skill Distribution</h2>
                    <span className="wf-card-action" onClick={() => setActiveTab("Skills")}>View Details →</span>
                  </div>

                  <div className="wf-skill-donut-wrapper">
                    <div className="wf-donut-chart-box">
                      <svg width="140" height="140" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="50" fill="none" stroke="#5c2c19" strokeWidth="20" strokeDasharray="75.4 238.7" strokeDashoffset="0" />
                        <circle cx="70" cy="70" r="50" fill="none" stroke="#9e5837" strokeWidth="20" strokeDasharray="125.6 188.5" strokeDashoffset="-75.4" />
                        <circle cx="70" cy="70" r="50" fill="none" stroke="#d48c66" strokeWidth="20" strokeDasharray="72.2 241.9" strokeDashoffset="-201" />
                        <circle cx="70" cy="70" r="50" fill="none" stroke="#eacab5" strokeWidth="20" strokeDasharray="40.8 273.3" strokeDashoffset="-273.2" />
                      </svg>
                      <div className="wf-donut-center-text">
                        <span className="wf-donut-number">512</span>
                        <span className="wf-donut-label">Employees</span>
                      </div>
                    </div>

                    <div className="wf-donut-legend-list">
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#5c2c19" }} /><span>Expert (80-100%)</span></div><span className="wf-donut-percent">24%</span></div>
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#9e5837" }} /><span>Proficient (60-79%)</span></div><span className="wf-donut-percent">40%</span></div>
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#d48c66" }} /><span>Competent (40-59%)</span></div><span className="wf-donut-percent">23%</span></div>
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#eacab5" }} /><span>Beginner (0-39%)</span></div><span className="wf-donut-percent">13%</span></div>
                    </div>
                  </div>
                </div>

                <div className="wf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Recent Activities</h2>
                    <span className="wf-card-action" onClick={() => setActiveTab("Employees")}>View All →</span>
                  </div>

                  <div className="wf-activity-list">
                    <div className="wf-activity-item">
                      <div className="wf-activity-left">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Riya" className="wf-activity-avatar" />
                        <div className="wf-activity-details">
                          <span className="wf-activity-text"><span className="wf-activity-name">Riya Sharma</span> completed Leadership Training</span>
                        </div>
                      </div>
                      <span className="wf-activity-time">10:30 AM</span>
                    </div>

                    <div className="wf-activity-item">
                      <div className="wf-activity-left">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Aman" className="wf-activity-avatar" />
                        <div className="wf-activity-details">
                          <span className="wf-activity-text"><span className="wf-activity-name">Aman Verma</span> joined Product Development team</span>
                        </div>
                      </div>
                      <span className="wf-activity-time">Yesterday</span>
                    </div>

                    <div className="wf-activity-item">
                      <div className="wf-activity-left">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Neha" className="wf-activity-avatar" />
                        <div className="wf-activity-details">
                          <span className="wf-activity-text"><span className="wf-activity-name">Neha Patel</span> completed Communication Skills</span>
                        </div>
                      </div>
                      <span className="wf-activity-time">2 May, 2025</span>
                    </div>

                    <div className="wf-activity-item">
                      <div className="wf-activity-left">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Vikram" className="wf-activity-avatar" />
                        <div className="wf-activity-details">
                          <span className="wf-activity-text"><span className="wf-activity-name">Vikram Singh</span> completed Cybersecurity Basics</span>
                        </div>
                      </div>
                      <span className="wf-activity-time">1 May, 2025</span>
                    </div>

                    <div className="wf-activity-item">
                      <div className="wf-activity-left">
                        <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Sneha" className="wf-activity-avatar" />
                        <div className="wf-activity-details">
                          <span className="wf-activity-text"><span className="wf-activity-name">Sneha Iyer</span> joined Marketing team</span>
                        </div>
                      </div>
                      <span className="wf-activity-time">30 Apr, 2025</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* BOTTOM SECTION */}
              <section className="wf-bottom-grid">
                <div className="wf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Team Performance Overview</h2>
                    <span className="wf-card-action" onClick={() => setActiveTab("Teams")}>View Report →</span>
                  </div>

                  <div className="wf-table-responsive">
                    <table className="wf-table">
                      <thead>
                        <tr>
                          <th>Team</th><th>Total Members</th><th>Avg. Skill Score</th><th>Training Progress</th><th>Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="wf-team-cell">
                              <div className="wf-avatar-stack">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="m1" className="wf-avatar-stack-img" />
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="m2" className="wf-avatar-stack-img" />
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="m3" className="wf-avatar-stack-img" />
                              </div>
                              <span>Product Development</span>
                            </div>
                          </td>
                          <td><strong>96</strong></td><td>82%</td>
                          <td><div className="wf-progress-container"><div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "76%" }} /></div><span className="wf-progress-val">76%</span></div></td>
                          <td><span className="wf-perf-pill excellent">Excellent</span></td>
                        </tr>

                        <tr>
                          <td>
                            <div className="wf-team-cell">
                              <div className="wf-avatar-stack">
                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="m1" className="wf-avatar-stack-img" />
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="m2" className="wf-avatar-stack-img" />
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="m3" className="wf-avatar-stack-img" />
                              </div>
                              <span>Marketing</span>
                            </div>
                          </td>
                          <td><strong>64</strong></td><td>74%</td>
                          <td><div className="wf-progress-container"><div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "63%" }} /></div><span className="wf-progress-val">63%</span></div></td>
                          <td><span className="wf-perf-pill good">Good</span></td>
                        </tr>

                        <tr>
                          <td>
                            <div className="wf-team-cell">
                              <div className="wf-avatar-stack">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="m1" className="wf-avatar-stack-img" />
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="m2" className="wf-avatar-stack-img" />
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="m3" className="wf-avatar-stack-img" />
                              </div>
                              <span>Sales</span>
                            </div>
                          </td>
                          <td><strong>78</strong></td><td>71%</td>
                          <td><div className="wf-progress-container"><div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "58%" }} /></div><span className="wf-progress-val">58%</span></div></td>
                          <td><span className="wf-perf-pill good">Good</span></td>
                        </tr>

                        <tr>
                          <td>
                            <div className="wf-team-cell">
                              <div className="wf-avatar-stack">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="m1" className="wf-avatar-stack-img" />
                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="m2" className="wf-avatar-stack-img" />
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="m3" className="wf-avatar-stack-img" />
                              </div>
                              <span>Customer Success</span>
                            </div>
                          </td>
                          <td><strong>52</strong></td><td>79%</td>
                          <td><div className="wf-progress-container"><div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "70%" }} /></div><span className="wf-progress-val">70%</span></div></td>
                          <td><span className="wf-perf-pill excellent">Excellent</span></td>
                        </tr>

                        <tr>
                          <td>
                            <div className="wf-team-cell">
                              <div className="wf-avatar-stack">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="m1" className="wf-avatar-stack-img" />
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="m2" className="wf-avatar-stack-img" />
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="m3" className="wf-avatar-stack-img" />
                              </div>
                              <span>Operations</span>
                            </div>
                          </td>
                          <td><strong>44</strong></td><td>68%</td>
                          <td><div className="wf-progress-container"><div className="wf-progress-bar-track"><div className="wf-progress-bar-fill" style={{ width: "50%" }} /></div><span className="wf-progress-val">50%</span></div></td>
                          <td><span className="wf-perf-pill average">Average</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="wf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Upcoming Trainings</h2>
                    <span className="wf-card-action" onClick={() => setActiveTab("Learning")}>View Calendar →</span>
                  </div>

                  <div className="wf-training-list">
                    <div className="wf-training-item-exact" onClick={() => setActiveTab("Learning")}>
                      <div className="wf-training-left-exact">
                        <div className="wf-date-badge-exact">
                          <span className="wf-date-day-exact">07</span>
                          <span className="wf-date-month-exact">MAY</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Trainer" className="wf-training-img-exact" />
                        <div className="wf-training-info-exact">
                          <span className="wf-training-title-exact">Advanced Excel for Managers</span>
                          <span className="wf-training-time-exact">11:00 AM – 01:00 PM</span>
                        </div>
                      </div>
                      <div className="wf-training-enrolled-exact">
                        <span className="wf-enrolled-num">24</span>
                        <span className="wf-enrolled-lbl">Enrolled</span>
                      </div>
                    </div>

                    <div className="wf-training-item-exact" onClick={() => setActiveTab("Learning")}>
                      <div className="wf-training-left-exact">
                        <div className="wf-date-badge-exact">
                          <span className="wf-date-day-exact">09</span>
                          <span className="wf-date-month-exact">MAY</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Trainer" className="wf-training-img-exact" />
                        <div className="wf-training-info-exact">
                          <span className="wf-training-title-exact">Effective Communication</span>
                          <span className="wf-training-time-exact">02:00 PM – 04:00 PM</span>
                        </div>
                      </div>
                      <div className="wf-training-enrolled-exact">
                        <span className="wf-enrolled-num">18</span>
                        <span className="wf-enrolled-lbl">Enrolled</span>
                      </div>
                    </div>

                    <div className="wf-training-item-exact" onClick={() => setActiveTab("Learning")}>
                      <div className="wf-training-left-exact">
                        <div className="wf-date-badge-exact">
                          <span className="wf-date-day-exact">12</span>
                          <span className="wf-date-month-exact">MAY</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Trainer" className="wf-training-img-exact" />
                        <div className="wf-training-info-exact">
                          <span className="wf-training-title-exact">Agile Project Management</span>
                          <span className="wf-training-time-exact">10:00 AM – 12:00 PM</span>
                        </div>
                      </div>
                      <div className="wf-training-enrolled-exact">
                        <span className="wf-enrolled-num">31</span>
                        <span className="wf-enrolled-lbl">Enrolled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* BOTTOM HERO & ENGAGEMENT SCORE ROW */}
              <section className="wf-bottom-banner-grid">
                <div className="wf-invest-banner">
                  <div className="wf-invest-text">
                    <h3>Invest in people. Drive performance.</h3>
                    <p>Help your workforce learn, grow and achieve more together.</p>
                    <button className="wf-invest-btn" onClick={() => setActiveTab("Learning")}>
                      🏆 Explore Learning Paths →
                    </button>
                  </div>
                  <div className="wf-invest-graphic">
                    <img src={themeMode === 'dark' ? (darkHeroImg || engagementHeroImg) : engagementHeroImg} alt="Workforce Collaboration" className="wf-invest-img" />
                  </div>
                </div>

                <div className="wf-card wf-engagement-score-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Engagement Score</h2>
                    <span className="wf-card-action" onClick={() => setActiveTab("Engagement")}>View Insights →</span>
                  </div>
                  <div className="wf-engagement-score-body">
                    <div className="wf-score-donut">
                      <svg viewBox="0 0 100 65" className="wf-half-donut-svg">
                        <path d="M 10 55 A 40 40 0 0 1 90 55" fill="none" stroke="var(--wf-card-border)" strokeWidth="12" strokeLinecap="round" />
                        <path d="M 10 55 A 40 40 0 0 1 76 22" fill="none" stroke="url(#engGrad)" strokeWidth="12" strokeLinecap="round" />
                        <defs>
                          <linearGradient id="engGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#d48c66" />
                            <stop offset="100%" stopColor="#e07a5f" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="wf-score-center">
                        <span className="wf-score-value">76%</span>
                        <span className="wf-score-label">Good</span>
                      </div>
                    </div>
                    <div className="wf-score-stats">
                      <span className="wf-score-trend">↑ 7% <span className="wf-score-sub">from last month</span></span>
                      <p className="wf-score-msg">Keep up the great work!</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 4: SKILLS & ASSESSMENTS */}
          {activeTab === "Skills" && (
            <>
              <section className="wf-welcome-banner wf-hero-banner-enhanced">
                <div className="wf-welcome-text">
                  <h1>Skills & Assessments</h1>
                  <p>Manage skills, track proficiency, and evaluate your teams with data-driven insights.</p>
                </div>
                <div className="wf-welcome-graphic wf-welcome-graphic-enhanced">
                  <div className="wf-hero-glow-backdrop" />
                  <div className="wf-hero-dot-matrix" />
                  <svg className="wf-hero-leaf-graphic" viewBox="0 0 100 100" fill="none">
                    <path d="M20 80 Q 40 20 80 10 Q 60 70 20 80 Z" fill="rgba(212, 140, 102, 0.18)" stroke="rgba(212, 140, 102, 0.35)" strokeWidth="1.5" />
                    <path d="M40 85 Q 70 40 90 30 Q 75 80 40 85 Z" fill="rgba(224, 122, 95, 0.15)" stroke="rgba(224, 122, 95, 0.3)" strokeWidth="1.5" />
                  </svg>
                  <img
                    src={themeMode === 'dark' ? (darkFeatureHeroImg || darkWorkforcePortalImg) : featureHeroImg}
                    alt="Skills Illustration"
                    className="wf-team-illustration wf-team-illustration-large"
                  />
                </div>
              </section>

              <section className="wf-metrics-grid wf-metrics-grid-4">
                <div className="wf-metric-card" onClick={() => alert("Total Skills Matrix: 142 active competency tags across 6 departments.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaUsers /></div><span className="wf-metric-title">Total Skills</span></div>
                  <div className="wf-metric-value">142</div>
                  <div className="wf-metric-trend">↑ 12% <span className="wf-metric-trend-label">vs last month</span></div>
                </div>
                <div className="wf-metric-card" onClick={() => alert("56 skill evaluations completed this month.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#faf0e6" }}><FaClipboardCheck /></div><span className="wf-metric-title">Assessments Conducted</span></div>
                  <div className="wf-metric-value">56</div>
                  <div className="wf-metric-trend">↑ 8% <span className="wf-metric-trend-label">vs last month</span></div>
                </div>
                <div className="wf-metric-card" onClick={() => alert("248 out of 279 team members assessed.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#f3e8f8" }}><FaUsers /></div><span className="wf-metric-title">Employees Assessed</span></div>
                  <div className="wf-metric-value">248</div>
                  <div className="wf-metric-trend">↑ 15% <span className="wf-metric-trend-label">vs last month</span></div>
                </div>
                <div className="wf-metric-card" onClick={() => alert("Average workforce skill index is 78/100.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#e6f4ea" }}><FaShieldAlt /></div><span className="wf-metric-title">Avg. Proficiency Score</span></div>
                  <div className="wf-metric-value">78%</div>
                  <div className="wf-metric-trend">↑ 6% <span className="wf-metric-trend-label">vs last month</span></div>
                </div>
              </section>

              <section className="wf-middle-grid">
                <div className="wf-card">
                  <div className="wf-card-header"><h2 className="wf-card-title">Skills Proficiency Overview</h2></div>
                  <div className="wf-skill-donut-wrapper" style={{ flexDirection: "column", gap: "20px" }}>
                    <div className="wf-donut-chart-box" style={{ width: "170px", height: "170px" }}>
                      <svg width="160" height="160" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r="58" fill="none" stroke="#5c2c19" strokeWidth="22" strokeDasharray="102 262" strokeDashoffset="0" />
                        <circle cx="80" cy="80" r="58" fill="none" stroke="#9e5837" strokeWidth="22" strokeDasharray="182 182" strokeDashoffset="-102" />
                        <circle cx="80" cy="80" r="58" fill="none" stroke="#d48c66" strokeWidth="22" strokeDasharray="58 306" strokeDashoffset="-284" />
                        <circle cx="80" cy="80" r="58" fill="none" stroke="#eacab5" strokeWidth="22" strokeDasharray="22 342" strokeDashoffset="-342" />
                      </svg>
                      <div className="wf-donut-center-text"><span className="wf-donut-number" style={{ fontSize: "22px" }}>78%</span><span className="wf-donut-label">Average<br />Proficiency</span></div>
                    </div>
                    <div className="wf-donut-legend-list" style={{ width: "100%" }}>
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#5c2c19" }} /><span>Expert</span></div><span className="wf-donut-percent">28% (70)</span></div>
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#9e5837" }} /><span>Proficient</span></div><span className="wf-donut-percent">50% (126)</span></div>
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#d48c66" }} /><span>Intermediate</span></div><span className="wf-donut-percent">16% (40)</span></div>
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#eacab5" }} /><span>Beginner</span></div><span className="wf-donut-percent">6% (12)</span></div>
                    </div>
                  </div>
                </div>

                <div className="wf-card">
                  <div className="wf-card-header"><h2 className="wf-card-title">Top Skills</h2><span className="wf-card-action" onClick={() => alert("Showing all top 15 organization skills...")}>View all</span></div>
                  <div className="wf-top-skills-list">
                    <div className="wf-skill-bar-row"><div className="wf-skill-bar-info"><span>Communication</span><span>92%</span></div><div className="wf-skill-bar-track"><div className="wf-skill-bar-fill" style={{ width: "92%" }} /></div></div>
                    <div className="wf-skill-bar-row"><div className="wf-skill-bar-info"><span>Leadership</span><span>85%</span></div><div className="wf-skill-bar-track"><div className="wf-skill-bar-fill" style={{ width: "85%" }} /></div></div>
                    <div className="wf-skill-bar-row"><div className="wf-skill-bar-info"><span>Data Analysis</span><span>78%</span></div><div className="wf-skill-bar-track"><div className="wf-skill-bar-fill" style={{ width: "78%" }} /></div></div>
                    <div className="wf-skill-bar-row"><div className="wf-skill-bar-info"><span>Project Management</span><span>75%</span></div><div className="wf-skill-bar-track"><div className="wf-skill-bar-fill" style={{ width: "75%" }} /></div></div>
                    <div className="wf-skill-bar-row"><div className="wf-skill-bar-info"><span>Problem Solving</span><span>72%</span></div><div className="wf-skill-bar-track"><div className="wf-skill-bar-fill" style={{ width: "72%" }} /></div></div>
                  </div>
                </div>

                <div className="wf-card">
                  <div className="wf-card-header"><h2 className="wf-card-title">Skills Gaps</h2><span className="wf-card-action" onClick={() => alert("Opening Skill Gap Action Plan...")}>View all</span></div>
                  <div className="wf-skills-gaps-list">
                    <div className="wf-gap-item" onClick={() => alert("Cloud Computing: 32 team members require AWS/GCP certification.")}>
                      <div className="wf-gap-left"><div className="wf-gap-icon-box"><FaCloud /></div><div className="wf-gap-details"><span className="wf-gap-title">Cloud Computing</span><span className="wf-gap-demand-tag high">High Demand</span></div></div>
                      <div className="wf-gap-count"><span className="wf-gap-count-num">32</span><span className="wf-gap-count-lbl">Employees</span></div>
                    </div>
                    <div className="wf-gap-item" onClick={() => alert("Cyber Security: 28 employees require OWASP & Network Security training.")}>
                      <div className="wf-gap-left"><div className="wf-gap-icon-box"><FaShieldAlt /></div><div className="wf-gap-details"><span className="wf-gap-title">Cyber Security</span><span className="wf-gap-demand-tag high">High Demand</span></div></div>
                      <div className="wf-gap-count"><span className="wf-gap-count-num">28</span><span className="wf-gap-count-lbl">Employees</span></div>
                    </div>
                    <div className="wf-gap-item" onClick={() => alert("AI / Machine Learning: 24 employees recommended for Python & PyTorch module.")}>
                      <div className="wf-gap-left"><div className="wf-gap-icon-box"><FaRobot /></div><div className="wf-gap-details"><span className="wf-gap-title">AI / Machine Learning</span><span className="wf-gap-demand-tag medium">Medium Demand</span></div></div>
                      <div className="wf-gap-count"><span className="wf-gap-count-num">24</span><span className="wf-gap-count-lbl">Employees</span></div>
                    </div>
                    <div className="wf-gap-item" onClick={() => alert("Data Visualization: 20 employees assigned to Tableau & PowerBI workshop.")}>
                      <div className="wf-gap-left"><div className="wf-gap-icon-box"><FaChartBar /></div><div className="wf-gap-details"><span className="wf-gap-title">Data Visualization</span><span className="wf-gap-demand-tag medium">Medium Demand</span></div></div>
                      <div className="wf-gap-count"><span className="wf-gap-count-num">20</span><span className="wf-gap-count-lbl">Employees</span></div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="wf-bottom-grid wf-bottom-grid-5050">
                <div className="wf-card">
                  <div className="wf-card-header"><h2 className="wf-card-title">Recent Assessments</h2><span className="wf-card-action" onClick={() => alert("Viewing all 56 assessment logs...")}>View all</span></div>
                  <div className="wf-assessments-list">
                    <div className="wf-assessment-item" onClick={() => setSelectedAssessment({ title: "Java Programming Assessment", category: "Technical", status: "Completed", participants: 120, score: "82%", passRate: "94%" })}>
                      <div className="wf-assessment-left"><div className="wf-assessment-icon-box" style={{ background: "#fae8de" }}><FaCode /></div><div className="wf-assessment-info"><span className="wf-assessment-title">Java Programming Assessment</span><span className="wf-assessment-cat">Technical</span></div></div>
                      <div className="wf-assessment-middle"><span className="wf-status-pill completed">Completed</span><div className="wf-assessment-participants"><span className="wf-part-num">120</span><span className="wf-part-lbl">Participants</span></div><div className="wf-ring-score-box">82%</div></div>
                    </div>

                    <div className="wf-assessment-item" onClick={() => setSelectedAssessment({ title: "Leadership Skills Evaluation", category: "Behavioral", status: "Completed", participants: 95, score: "76%", passRate: "89%" })}>
                      <div className="wf-assessment-left"><div className="wf-assessment-icon-box" style={{ background: "#faf0e6" }}><FaUsers /></div><div className="wf-assessment-info"><span className="wf-assessment-title">Leadership Skills Evaluation</span><span className="wf-assessment-cat">Behavioral</span></div></div>
                      <div className="wf-assessment-middle"><span className="wf-status-pill completed">Completed</span><div className="wf-assessment-participants"><span className="wf-part-num">95</span><span className="wf-part-lbl">Participants</span></div><div className="wf-ring-score-box">76%</div></div>
                    </div>

                    <div className="wf-assessment-item" onClick={() => setSelectedAssessment({ title: "Data Analysis Test", category: "Technical", status: "In Progress", participants: 64, score: "68%", passRate: "81%" })}>
                      <div className="wf-assessment-left"><div className="wf-assessment-icon-box" style={{ background: "#f3e8f8" }}><FaChartBar /></div><div className="wf-assessment-info"><span className="wf-assessment-title">Data Analysis Test</span><span className="wf-assessment-cat">Technical</span></div></div>
                      <div className="wf-assessment-middle"><span className="wf-status-pill in-progress">In Progress</span><div className="wf-assessment-participants"><span className="wf-part-num">64</span><span className="wf-part-lbl">Participants</span></div><div className="wf-ring-score-box">68%</div></div>
                    </div>

                    <div className="wf-assessment-item" onClick={() => setSelectedAssessment({ title: "Communication Skills Test", category: "Behavioral", status: "Not Started", participants: 48, score: "-", passRate: "-" })}>
                      <div className="wf-assessment-left"><div className="wf-assessment-icon-box" style={{ background: "#fef7e0" }}><FaComments /></div><div className="wf-assessment-info"><span className="wf-assessment-title">Communication Skills Test</span><span className="wf-assessment-cat">Behavioral</span></div></div>
                      <div className="wf-assessment-middle"><span className="wf-status-pill not-started">Not Started</span><div className="wf-assessment-participants"><span className="wf-part-num">48</span><span className="wf-part-lbl">Participants</span></div><div style={{ width: "34px", textAlign: "center", fontWeight: "700", color: "#a39285" }}>-</div></div>
                    </div>
                  </div>
                </div>

                <div className="wf-card">
                  <div className="wf-card-header"><h2 className="wf-card-title">Team Skills Distribution</h2><span className="wf-card-action" onClick={() => setActiveTab("Teams")}>View all</span></div>
                  <div className="wf-team-skills-list">
                    <div className="wf-team-skill-row"><div className="wf-team-skill-meta"><div className="wf-avatar-stack"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="m1" className="wf-avatar-stack-img" /><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="m2" className="wf-avatar-stack-img" /></div><div className="wf-team-skill-details"><span className="wf-team-name-lbl">Engineering Team</span><span className="wf-team-mem-count">24 Members</span></div></div><div className="wf-segmented-track"><div className="wf-seg-expert" style={{ width: "35%" }} /><div className="wf-seg-proficient" style={{ width: "35%" }} /><div className="wf-seg-intermediate" style={{ width: "20%" }} /><div className="wf-seg-beginner" style={{ width: "10%" }} /></div><span className="wf-team-overall-val">82%</span></div>
                    <div className="wf-team-skill-row"><div className="wf-team-skill-meta"><div className="wf-avatar-stack"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="m1" className="wf-avatar-stack-img" /><img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="m2" className="wf-avatar-stack-img" /></div><div className="wf-team-skill-details"><span className="wf-team-name-lbl">Product Team</span><span className="wf-team-mem-count">18 Members</span></div></div><div className="wf-segmented-track"><div className="wf-seg-expert" style={{ width: "25%" }} /><div className="wf-seg-proficient" style={{ width: "45%" }} /><div className="wf-seg-intermediate" style={{ width: "20%" }} /><div className="wf-seg-beginner" style={{ width: "10%" }} /></div><span className="wf-team-overall-val">76%</span></div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 5: PERFORMANCE OVERVIEW */}
          {activeTab === "Performance" && (
            <>
              <section className="wf-welcome-banner perf-banner">
                <div className="wf-welcome-text">
                  <h1>Performance Overview</h1>
                  <p>Track overall workforce performance, goal completion rates, and key team metrics.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <select
                    className="wf-select-filter"
                    style={{ padding: "8px 14px", fontSize: "13px", fontWeight: "700" }}
                    value={perfTimeframe}
                    onChange={(e) => setPerfTimeframe(e.target.value)}
                  >
                    <option value="Monthly">📅 May 1 – May 31, 2025</option>
                    <option value="Quarterly">📅 Q1 2025 (Jan – Mar)</option>
                    <option value="Yearly">📅 Year to Date 2025</option>
                  </select>
                  <button className="wf-btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px" }} onClick={() => setShowReviewsModal(true)}>
                    <FaPlus /> New Review Cycle
                  </button>
                  <button className="wf-promo-btn" style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--wf-accent-dark-brown)" }} onClick={() => alert("Generating AI Workforce Performance Summary...")}>
                    <FaBolt style={{ color: "#fef08a" }} /> AI Insights
                  </button>
                </div>
              </section>

              <section className="wf-metrics-grid wf-metrics-grid-4">
                <div className="wf-metric-card perf-card" onClick={() => setShowReviewsModal(true)}>
                  <div className="wf-metric-header">
                    <div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaClipboardCheck /></div>
                    <span className="wf-metric-title">Average Performance Score</span>
                  </div>
                  <div className="wf-metric-value">4.2 <span style={{ fontSize: "15px", color: "var(--wf-text-muted)" }}>/ 5</span></div>
                  <div className="wf-metric-trend">↑ 8% <span className="wf-metric-trend-label">vs last month</span></div>
                </div>

                <div className="wf-metric-card perf-card" onClick={() => setShowReviewsModal(true)}>
                  <div className="wf-metric-header">
                    <div className="wf-metric-icon-box" style={{ background: "#fef3c7" }}><FaStar /></div>
                    <span className="wf-metric-title">High Performers</span>
                  </div>
                  <div className="wf-metric-value">32% <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--wf-text-muted)" }}>(79 staff)</span></div>
                  <div className="wf-metric-trend">↑ 5% <span className="wf-metric-trend-label">vs last month</span></div>
                </div>

                <div className="wf-metric-card perf-card" onClick={() => setShowReviewsModal(true)}>
                  <div className="wf-metric-header">
                    <div className="wf-metric-icon-box" style={{ background: "#f3e8f8" }}><FaBullseye /></div>
                    <span className="wf-metric-title">Goals Achieved</span>
                  </div>
                  <div className="wf-metric-value">68%</div>
                  <div className="wf-metric-trend">↑ 12% <span className="wf-metric-trend-label">vs last month</span></div>
                </div>

                <div className="wf-metric-card perf-card" onClick={() => setShowReviewsModal(true)}>
                  <div className="wf-metric-header">
                    <div className="wf-metric-icon-box" style={{ background: "#e0f2fe" }}><FaChartLine /></div>
                    <span className="wf-metric-title">Reviews Completed</span>
                  </div>
                  <div className="wf-metric-value">87% <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--wf-text-muted)" }}>(216/248)</span></div>
                  <div className="wf-metric-trend">↑ 10% <span className="wf-metric-trend-label">vs last month</span></div>
                </div>
              </section>

              <section className="wf-middle-grid">
                <div className="wf-card perf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Performance Trend</h2>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {["Monthly", "Quarterly"].map(t => (
                        <button
                          key={t}
                          className={`wf-filter-pill ${perfTimeframe === t ? "active" : ""}`}
                          style={{ padding: "4px 10px", fontSize: "11px" }}
                          onClick={() => setPerfTimeframe(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="wf-overview-chart-container">
                    <svg className="wf-svg-line-chart" viewBox="0 0 440 190">
                      <defs>
                        <linearGradient id="perfGradEnhanced" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8c5338" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#8c5338" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1="30" y1="20" x2="420" y2="20" stroke="#f2e8df" strokeWidth="1" />
                      <line x1="30" y1="60" x2="420" y2="60" stroke="#f2e8df" strokeWidth="1" />
                      <line x1="30" y1="100" x2="420" y2="100" stroke="#f2e8df" strokeWidth="1" />
                      <line x1="30" y1="140" x2="420" y2="140" stroke="#f2e8df" strokeWidth="1" />
                      <line x1="30" y1="165" x2="420" y2="165" stroke="#ebdcd0" strokeWidth="1.5" />

                      <text x="10" y="25" fill="#a39285" fontSize="10">5.0</text>
                      <text x="10" y="65" fill="#a39285" fontSize="10">4.0</text>
                      <text x="10" y="105" fill="#a39285" fontSize="10">3.0</text>
                      <text x="10" y="145" fill="#a39285" fontSize="10">2.0</text>
                      <text x="10" y="170" fill="#a39285" fontSize="10">1.0</text>

                      <path d="M 40 100 Q 110 85, 180 75 T 320 60 T 400 50 L 400 165 L 40 165 Z" fill="url(#perfGradEnhanced)" />
                      <path d="M 40 100 Q 110 85, 180 75 T 320 60 T 400 50" fill="none" stroke="#8c5338" strokeWidth="3.5" strokeLinecap="round" />

                      <circle cx="40" cy="100" r="5" fill="#8c5338" stroke="#fff" strokeWidth="2" />
                      <text x="40" y="88" textAnchor="middle" fill="#332219" fontSize="10" fontWeight="700">3.6</text>

                      <circle cx="115" cy="85" r="5" fill="#8c5338" stroke="#fff" strokeWidth="2" />
                      <text x="115" y="73" textAnchor="middle" fill="#332219" fontSize="10" fontWeight="700">3.8</text>

                      <circle cx="190" cy="75" r="5" fill="#8c5338" stroke="#fff" strokeWidth="2" />
                      <text x="190" y="63" textAnchor="middle" fill="#332219" fontSize="10" fontWeight="700">3.9</text>

                      <circle cx="265" cy="68" r="5" fill="#8c5338" stroke="#fff" strokeWidth="2" />
                      <text x="265" y="56" textAnchor="middle" fill="#332219" fontSize="10" fontWeight="700">4.0</text>

                      <circle cx="340" cy="58" r="5" fill="#8c5338" stroke="#fff" strokeWidth="2" />
                      <text x="340" y="46" textAnchor="middle" fill="#332219" fontSize="10" fontWeight="700">4.1</text>

                      <circle cx="400" cy="50" r="6" fill="#5c2c19" stroke="#fff" strokeWidth="2.5" />
                      <text x="400" y="36" textAnchor="middle" fill="#5c2c19" fontSize="11" fontWeight="800">4.2</text>

                      <text x="40" y="182" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">Dec</text>
                      <text x="115" y="182" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">Jan</text>
                      <text x="190" y="182" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">Feb</text>
                      <text x="265" y="182" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">Mar</text>
                      <text x="340" y="182" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">Apr</text>
                      <text x="400" y="182" textAnchor="middle" fill="#a39285" fontSize="10" fontWeight="600">May</text>
                    </svg>
                  </div>
                </div>

                <div className="wf-card perf-card">
                  <div className="wf-card-header"><h2 className="wf-card-title">Performance Distribution</h2></div>
                  <div className="wf-skill-donut-wrapper">
                    <div className="wf-donut-chart-box">
                      <svg width="140" height="140" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="50" fill="none" stroke="#84cc16" strokeWidth="20" strokeDasharray="88 226" strokeDashoffset="0" />
                        <circle cx="70" cy="70" r="50" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="144 170" strokeDashoffset="-88" />
                        <circle cx="70" cy="70" r="50" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="56 258" strokeDashoffset="-232" />
                        <circle cx="70" cy="70" r="50" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="26 288" strokeDashoffset="-288" />
                      </svg>
                      <div className="wf-donut-center-text">
                        <span className="wf-donut-label">Total</span>
                        <span className="wf-donut-number">248</span>
                        <span className="wf-donut-label">Employees</span>
                      </div>
                    </div>

                    <div className="wf-donut-legend-list">
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#84cc16" }} /><span>Excellent (4.5 - 5.0)</span></div><span className="wf-donut-percent">28% (69)</span></div>
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#3b82f6" }} /><span>Good (3.5 - 4.4)</span></div><span className="wf-donut-percent">46% (114)</span></div>
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#f59e0b" }} /><span>Average (2.5 - 3.4)</span></div><span className="wf-donut-percent">18% (45)</span></div>
                      <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#ef4444" }} /><span>Needs Improvement (&lt;2.5)</span></div><span className="wf-donut-percent">8% (20)</span></div>
                    </div>
                  </div>
                </div>

                <div className="wf-card perf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Goals Progress</h2>
                    <span className="wf-card-action" onClick={() => alert("Opening Organization Goals Breakdown...")}>View all</span>
                  </div>

                  <div className="wf-engagement-gauge-container">
                    <div className="wf-gauge-svg-box">
                      <svg width="140" height="85" viewBox="0 0 140 85">
                        <path d="M 15 75 A 55 55 0 0 1 125 75" fill="none" stroke="#f2e4da" strokeWidth="14" strokeLinecap="round" />
                        <path d="M 15 75 A 55 55 0 0 1 110 35" fill="none" stroke="#84cc16" strokeWidth="14" strokeLinecap="round" />
                      </svg>
                      <div className="wf-gauge-text-box">
                        <div className="wf-gauge-value" style={{ fontSize: "20px" }}>68%</div>
                        <div className="wf-gauge-status" style={{ fontSize: "10px" }}>Overall Goals Achieved</div>
                      </div>
                    </div>
                  </div>

                  <div className="wf-top-skills-list" style={{ marginTop: "10px", gap: "10px" }}>
                    <div className="wf-skill-bar-row">
                      <div className="wf-skill-bar-info" style={{ fontSize: "11px" }}><span>👤 Individual Goals</span><span>72%</span></div>
                      <div className="wf-skill-bar-track"><div className="wf-skill-bar-fill" style={{ width: "72%", background: "#84cc16" }} /></div>
                    </div>
                    <div className="wf-skill-bar-row">
                      <div className="wf-skill-bar-info" style={{ fontSize: "11px" }}><span>👥 Team Goals</span><span>65%</span></div>
                      <div className="wf-skill-bar-track"><div className="wf-skill-bar-fill" style={{ width: "65%", background: "#3b82f6" }} /></div>
                    </div>
                    <div className="wf-skill-bar-row">
                      <div className="wf-skill-bar-info" style={{ fontSize: "11px" }}><span>🏢 Department Goals</span><span>68%</span></div>
                      <div className="wf-skill-bar-track"><div className="wf-skill-bar-fill" style={{ width: "68%", background: "#f59e0b" }} /></div>
                    </div>
                    <div className="wf-skill-bar-row">
                      <div className="wf-skill-bar-info" style={{ fontSize: "11px" }}><span>🌐 Organization Goals</span><span>67%</span></div>
                      <div className="wf-skill-bar-track"><div className="wf-skill-bar-fill" style={{ width: "67%", background: "#a855f7" }} /></div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="wf-middle-grid-3equal">
                <div className="wf-card perf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Department Performance</h2>
                    <span className="wf-card-action" onClick={() => setShowReviewsModal(true)}>View all</span>
                  </div>

                  <div className="wf-dept-perf-list">
                    <div className="wf-dept-perf-row" onClick={() => setShowReviewsModal(true)}>
                      <div className="wf-dept-name-cell"><div className="wf-dept-icon-box"><FaCode /></div><span>Engineering</span></div>
                      <strong style={{ fontSize: "13px" }}>4.5 <span style={{ fontSize: "11px", color: "#a39285" }}>/ 5</span></strong>
                      <span className="wf-metric-trend">↑ 10%</span>
                      <svg className="wf-sparkline-svg" viewBox="0 0 60 20"><path d="M 0 15 L 15 12 L 30 8 L 45 10 L 60 3" fill="none" stroke="#22c55e" strokeWidth="2" /></svg>
                    </div>

                    <div className="wf-dept-perf-row" onClick={() => setShowReviewsModal(true)}>
                      <div className="wf-dept-name-cell"><div className="wf-dept-icon-box"><FaBuilding /></div><span>Product</span></div>
                      <strong style={{ fontSize: "13px" }}>4.3 <span style={{ fontSize: "11px", color: "#a39285" }}>/ 5</span></strong>
                      <span className="wf-metric-trend">↑ 7%</span>
                      <svg className="wf-sparkline-svg" viewBox="0 0 60 20"><path d="M 0 16 L 15 14 L 30 10 L 45 7 L 60 4" fill="none" stroke="#22c55e" strokeWidth="2" /></svg>
                    </div>

                    <div className="wf-dept-perf-row" onClick={() => setShowReviewsModal(true)}>
                      <div className="wf-dept-name-cell"><div className="wf-dept-icon-box"><FaChartBar /></div><span>Marketing</span></div>
                      <strong style={{ fontSize: "13px" }}>4.0 <span style={{ fontSize: "11px", color: "#a39285" }}>/ 5</span></strong>
                      <span className="wf-metric-trend">↑ 5%</span>
                      <svg className="wf-sparkline-svg" viewBox="0 0 60 20"><path d="M 0 14 L 15 12 L 30 11 L 45 9 L 60 6" fill="none" stroke="#22c55e" strokeWidth="2" /></svg>
                    </div>

                    <div className="wf-dept-perf-row" onClick={() => setShowReviewsModal(true)}>
                      <div className="wf-dept-name-cell"><div className="wf-dept-icon-box"><FaUsers /></div><span>Sales</span></div>
                      <strong style={{ fontSize: "13px" }}>3.8 <span style={{ fontSize: "11px", color: "#a39285" }}>/ 5</span></strong>
                      <span className="wf-metric-trend">↑ 3%</span>
                      <svg className="wf-sparkline-svg" viewBox="0 0 60 20"><path d="M 0 17 L 15 15 L 30 12 L 45 11 L 60 8" fill="none" stroke="#22c55e" strokeWidth="2" /></svg>
                    </div>

                    <div className="wf-dept-perf-row" onClick={() => setShowReviewsModal(true)}>
                      <div className="wf-dept-name-cell"><div className="wf-dept-icon-box"><FaHeart /></div><span>HR</span></div>
                      <strong style={{ fontSize: "13px" }}>3.9 <span style={{ fontSize: "11px", color: "#a39285" }}>/ 5</span></strong>
                      <span className="wf-metric-trend">↑ 2%</span>
                      <svg className="wf-sparkline-svg" viewBox="0 0 60 20"><path d="M 0 15 L 15 13 L 30 10 L 45 9 L 60 7" fill="none" stroke="#22c55e" strokeWidth="2" /></svg>
                    </div>
                  </div>
                </div>

                <div className="wf-card perf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Recent Performance Reviews</h2>
                    <span className="wf-card-action" onClick={() => setShowReviewsModal(true)}>View all</span>
                  </div>

                  <div className="wf-activity-list">
                    <div className="wf-activity-item" onClick={() => setShowReviewsModal(true)}>
                      <div className="wf-activity-left">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Arjun" className="wf-activity-avatar" />
                        <div className="wf-activity-details">
                          <span className="wf-activity-name">Arjun Sharma</span>
                          <span className="wf-activity-time">Product Designer • May 30, 2025</span>
                        </div>
                      </div>
                      <span className="wf-perf-pill excellent">4.6 Excellent</span>
                    </div>

                    <div className="wf-activity-item" onClick={() => setShowReviewsModal(true)}>
                      <div className="wf-activity-left">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Priya" className="wf-activity-avatar" />
                        <div className="wf-activity-details">
                          <span className="wf-activity-name">Priya Singh</span>
                          <span className="wf-activity-time">Software Engineer • May 29, 2025</span>
                        </div>
                      </div>
                      <span className="wf-perf-pill good">4.2 Good</span>
                    </div>
                  </div>
                </div>

                <div className="wf-card perf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Top Performers</h2>
                    <span className="wf-card-action" onClick={() => setShowReviewsModal(true)}>View all</span>
                  </div>

                  <div className="wf-activity-list">
                    <div className="wf-activity-item" onClick={() => setShowReviewsModal(true)}>
                      <div className="wf-activity-left">
                        <span className="wf-top-performer-rank rank-1">1</span>
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Sneha" className="wf-activity-avatar" />
                        <div className="wf-activity-details">
                          <span className="wf-activity-name">Sneha Kapoor</span>
                          <span className="wf-activity-time">Data Scientist</span>
                        </div>
                      </div>
                      <strong style={{ fontSize: "13px", color: "var(--wf-accent-brown)" }}>4.9 ⭐</strong>
                    </div>

                    <div className="wf-activity-item" onClick={() => setShowReviewsModal(true)}>
                      <div className="wf-activity-left">
                        <span className="wf-top-performer-rank rank-2">2</span>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Vikram" className="wf-activity-avatar" />
                        <div className="wf-activity-details">
                          <span className="wf-activity-name">Vikram Patil</span>
                          <span className="wf-activity-time">Engineering Lead</span>
                        </div>
                      </div>
                      <strong style={{ fontSize: "13px" }}>4.8 ⭐</strong>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 9: REPORTS & ANALYTICS CONTROL PANEL */}
          {activeTab === "Reports" && (
            <>
              {/* WELCOME BANNER WITH GRAPHIC */}
              <section className="wf-welcome-banner wf-hero-banner-enhanced">
                <div className="wf-welcome-text">
                  <h1>Reports & Analytics Control Panel</h1>
                  <p>Comprehensive organizational intelligence center. Generate, analyze, and export multi-dimensional workforce performance, skills, and engagement analytics.</p>
                  <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                    <button className="wf-btn-primary" onClick={() => setActiveTab("Overview")}>
                      Return to Overview Dashboard
                    </button>
                    <button className="wf-promo-btn" style={{ background: "var(--wf-accent-dark-brown)" }} onClick={() => setShowExportModal(true)}>
                      📥 Export All Reports
                    </button>
                  </div>
                </div>
                <div className="wf-welcome-graphic wf-welcome-graphic-enhanced">
                  <div className="wf-hero-glow-backdrop" />
                  <div className="wf-hero-dot-matrix" />
                  <svg className="wf-hero-leaf-graphic" viewBox="0 0 100 100" fill="none">
                    <path d="M20 80 Q 40 20 80 10 Q 60 70 20 80 Z" fill="rgba(212, 140, 102, 0.18)" stroke="rgba(212, 140, 102, 0.35)" strokeWidth="1.5" />
                    <path d="M40 85 Q 70 40 90 30 Q 75 80 40 85 Z" fill="rgba(224, 122, 95, 0.15)" stroke="rgba(224, 122, 95, 0.3)" strokeWidth="1.5" />
                  </svg>
                  <img
                    src={themeMode === 'dark' ? (darkFeatureHeroImg || darkWorkHubHeroImg) : featureHeroImg}
                    alt="Reports Graphic"
                    className="wf-team-illustration wf-team-illustration-large"
                  />
                </div>
              </section>

              {/* TOP 5 METRICS CARDS */}
              <section className="wf-metrics-grid">
                <div className="wf-metric-card" onClick={() => setReportCatFilter("All Reports")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fae8de" }}><FaChartBar /></div><span className="wf-metric-title">Reports Generated</span></div>
                  <div className="wf-metric-value">128</div>
                  <div className="wf-metric-trend">↑ 14% <span className="wf-metric-trend-label">vs last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("99.4% Organizational data accuracy index across all 512 employee records.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#e6f4ea", color: "#16a34a" }}><FaBullseye /></div><span className="wf-metric-title">Data Accuracy</span></div>
                  <div className="wf-metric-value">99.4%</div>
                  <div className="wf-metric-trend">↑ 0.6% <span className="wf-metric-trend-label">vs last month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("18 Active scheduled recurring automated report exports.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#e0f2fe", color: "#0284c7" }}><FaCalendarAlt /></div><span className="wf-metric-title">Scheduled Exports</span></div>
                  <div className="wf-metric-value">18 Active</div>
                  <div className="wf-metric-trend" style={{ color: "#0284c7" }}>→ 3 pending <span className="wf-metric-trend-label">this week</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("42 AI-driven automated organizational highlights generated.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#fef3c7", color: "#b45309" }}><FaLightbulb /></div><span className="wf-metric-title">AI Insights</span></div>
                  <div className="wf-metric-value">42 Highlights</div>
                  <div className="wf-metric-trend">↑ 8 new <span className="wf-metric-trend-label">this month</span></div>
                </div>

                <div className="wf-metric-card" onClick={() => alert("Average report generation speed is 1.2 seconds.")}>
                  <div className="wf-metric-header"><div className="wf-metric-icon-box" style={{ background: "#ffebe9", color: "#d9381e" }}><FaBolt /></div><span className="wf-metric-title">Avg. Export Speed</span></div>
                  <div className="wf-metric-value">1.2s</div>
                  <div className="wf-metric-trend">⚡ Instant <span className="wf-metric-trend-label">processing</span></div>
                </div>
              </section>

              {/* MAIN REPORTS & ANALYTICS GRID (2 COLUMNS) */}
              <section className="wf-teams-grid">
                
                {/* LEFT COLUMN: AVAILABLE REPORTS MATRIX TABLE */}
                <div className="wf-card">
                  <div className="wf-card-header" style={{ flexWrap: "wrap", gap: "12px" }}>
                    <h2 className="wf-card-title">Available Reports & Analytics Modules</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div className="wf-search-box" style={{ width: "190px", padding: "4px 12px" }}>
                        <FaSearch className="wf-search-icon" />
                        <input
                          type="text"
                          placeholder="Search report..."
                          className="wf-search-input"
                          value={reportSearch}
                          onChange={(e) => setReportSearch(e.target.value)}
                        />
                      </div>
                      <button className="wf-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "8px 14px" }} onClick={() => setShowCustomReportModal(true)}>
                        <FaPlus /> Generate Custom
                      </button>
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="wf-report-cat-filter-bar" style={{ marginBottom: "16px" }}>
                    {["All Reports", "Skills", "Performance", "Attendance", "Engagement", "Learning", "Analytics"].map(cat => (
                      <button
                        key={cat}
                        className={`wf-cat-pill ${reportCatFilter === cat ? "active" : ""}`}
                        onClick={() => setReportCatFilter(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="wf-table-responsive">
                    <table className="wf-table">
                      <thead>
                        <tr>
                          <th>Report Name</th>
                          <th>Category</th>
                          <th>Frequency</th>
                          <th>Last Generated</th>
                          <th>Format</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReports.map(rep => (
                          <tr key={rep.id}>
                            <td>
                              <div className="wf-team-cell">
                                <div className="wf-dept-icon-box" style={{ background: "#fae8de", color: "var(--wf-accent-brown)" }}>
                                  <FaChartBar />
                                </div>
                                <span style={{ fontWeight: "700", color: "var(--wf-text-primary)" }}>{rep.title}</span>
                              </div>
                            </td>

                            <td>
                              <span className="wf-type-tag initiative">
                                {rep.category}
                              </span>
                            </td>

                            <td>{rep.frequency}</td>
                            <td>{rep.lastGen}</td>

                            <td>
                              <span className={`wf-report-format-pill ${rep.formatType}`}>
                                {rep.format}
                              </span>
                            </td>

                            <td>
                              <span className="wf-status-pill completed">
                                {rep.status}
                              </span>
                            </td>

                            <td>
                              <button
                                className="wf-btn-primary"
                                style={{ padding: "5px 12px", fontSize: "11px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                                onClick={() => alert(`Downloading "${rep.title}" (${rep.format})...`)}
                              >
                                <FaFileExport /> Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="wf-pagination">
                    <span>Showing 1 to {filteredReports.length} of 18 reports</span>
                    <div className="wf-page-numbers">
                      <button className="wf-page-btn">&lt;</button>
                      <button className="wf-page-btn active">1</button>
                      <button className="wf-page-btn">2</button>
                      <button className="wf-page-btn">3</button>
                      <button className="wf-page-btn">&gt;</button>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN STACK (CHARTS & AI INSIGHTS) */}
                <div className="wf-teams-right-stack">
                  
                  {/* 1. Skill Velocity & Productivity Trend Chart */}
                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Productivity & Skill Velocity Trend</h2>
                      <select className="wf-select-filter">
                        <option>This Quarter</option>
                        <option>Last Quarter</option>
                      </select>
                    </div>

                    <div className="wf-overview-chart-container">
                      <div className="wf-chart-legend" style={{ marginBottom: "8px" }}>
                        <div className="wf-legend-item"><span className="wf-legend-line solid" /><span>Productivity Index</span></div>
                        <div className="wf-legend-item"><span className="wf-legend-line dashed" /><span>Skill Index</span></div>
                      </div>

                      <svg className="wf-svg-line-chart" viewBox="0 0 340 150">
                        <defs>
                          <linearGradient id="prodTrendGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        <line x1="30" y1="20" x2="330" y2="20" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="45" x2="330" y2="45" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="70" x2="330" y2="70" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="95" x2="330" y2="95" stroke="#f2e8df" strokeWidth="1" />
                        <line x1="30" y1="120" x2="330" y2="120" stroke="#ebdcd0" strokeWidth="1.5" />

                        <text x="10" y="24" fill="#a39285" fontSize="9">100%</text>
                        <text x="10" y="49" fill="#a39285" fontSize="9">75%</text>
                        <text x="10" y="74" fill="#a39285" fontSize="9">50%</text>
                        <text x="10" y="99" fill="#a39285" fontSize="9">25%</text>
                        <text x="15" y="124" fill="#a39285" fontSize="9">0%</text>

                        <path d="M 40 80 Q 95 60, 150 45 T 260 40 T 310 30 L 310 120 L 40 120 Z" fill="url(#prodTrendGrad)" />
                        <path d="M 40 80 Q 95 60, 150 45 T 260 40 T 310 30" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 40 95 Q 95 80, 150 65 T 260 55 T 310 42" fill="none" stroke="#8c5338" strokeWidth="2" strokeDasharray="4,4" strokeLinecap="round" />

                        <circle cx="40" cy="80" r="3.5" fill="#16a34a" />
                        <circle cx="95" cy="60" r="3.5" fill="#16a34a" />
                        <circle cx="150" cy="45" r="3.5" fill="#16a34a" />
                        <circle cx="205" cy="40" r="3.5" fill="#16a34a" />
                        <circle cx="260" cy="40" r="3.5" fill="#16a34a" />
                        <circle cx="310" cy="30" r="3.5" fill="#16a34a" />

                        <text x="40" y="135" textAnchor="middle" fill="#a39285" fontSize="9">Jan</text>
                        <text x="95" y="135" textAnchor="middle" fill="#a39285" fontSize="9">Feb</text>
                        <text x="150" y="135" textAnchor="middle" fill="#a39285" fontSize="9">Mar</text>
                        <text x="205" y="135" textAnchor="middle" fill="#a39285" fontSize="9">Apr</text>
                        <text x="260" y="135" textAnchor="middle" fill="#a39285" fontSize="9">May</text>
                        <text x="310" y="135" textAnchor="middle" fill="#a39285" fontSize="9">Jun</text>
                      </svg>
                    </div>
                  </div>

                  {/* 2. Department Analytics Distribution */}
                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">Department Analytics Share</h2>
                      <select className="wf-select-filter">
                        <option>This Month</option>
                        <option>Last Month</option>
                      </select>
                    </div>

                    <div className="wf-skill-donut-wrapper">
                      <div className="wf-donut-chart-box" style={{ width: "150px", height: "150px" }}>
                        <svg width="150" height="150" viewBox="0 0 150 150">
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#5c2c19" strokeWidth="20" strokeDasharray="114.3 212.6" strokeDashoffset="0" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#9e5837" strokeWidth="20" strokeDasharray="81.6 245.3" strokeDashoffset="-114.3" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#d48c66" strokeWidth="20" strokeDasharray="65.3 261.6" strokeDashoffset="-195.9" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#eacab5" strokeWidth="20" strokeDasharray="39.2 287.7" strokeDashoffset="-261.2" />
                          <circle cx="75" cy="75" r="52" fill="none" stroke="#f5e4d7" strokeWidth="20" strokeDasharray="26.1 300.8" strokeDashoffset="-300.4" />
                        </svg>
                        <div className="wf-donut-center-text">
                          <span className="wf-donut-number" style={{ fontSize: "20px" }}>100%</span>
                          <span className="wf-donut-label" style={{ fontSize: "10px" }}>Share</span>
                        </div>
                      </div>

                      <div className="wf-donut-legend-list">
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#5c2c19" }} /><span>Engineering</span></div><span className="wf-donut-percent">35%</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#9e5837" }} /><span>Operations</span></div><span className="wf-donut-percent">25%</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#d48c66" }} /><span>Marketing</span></div><span className="wf-donut-percent">20%</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#eacab5" }} /><span>Data Science</span></div><span className="wf-donut-percent">12%</span></div>
                        <div className="wf-donut-legend-row"><div className="wf-donut-category"><span className="wf-donut-dot" style={{ background: "#f5e4d7" }} /><span>HR</span></div><span className="wf-donut-percent">8%</span></div>
                      </div>
                    </div>
                  </div>

                  {/* 3. AI Automated Insights */}
                  <div className="wf-card">
                    <div className="wf-card-header">
                      <h2 className="wf-card-title">AI Analytics Insights</h2>
                      <span className="wf-card-action" onClick={() => alert("Viewing all 42 automated AI analytics insights...")}>View All</span>
                    </div>

                    <div className="wf-insight-list">
                      <div className="wf-insight-card" onClick={() => alert("Insight details: Cloud Computing training completed by 32 engineers.")}>
                        <FaLightbulb className="wf-insight-icon" />
                        <div className="wf-insight-text">
                          <strong>Skill Gap Reduction:</strong> Cloud Computing skill gap reduced by <strong>18%</strong> following April training cohort.
                        </div>
                      </div>

                      <div className="wf-insight-card" onClick={() => alert("Insight details: Engineering department attendance peaked at 88.2%.")}>
                        <FaChartLine className="wf-insight-icon" />
                        <div className="wf-insight-text">
                          <strong>Attendance Peak:</strong> Engineering attendance reached an all-time high of <strong>88.2%</strong> in May 2025.
                        </div>
                      </div>

                      <div className="wf-insight-card" onClick={() => alert("Insight details: Performance review completion speed increased 12%.")}>
                        <FaTrophy className="wf-insight-icon" />
                        <div className="wf-insight-text">
                          <strong>Review Completion:</strong> Overall review completion rate increased <strong>12%</strong> quarter-over-quarter.
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            </>
          )}

          {/* TAB 10: WORKFORCE SETTINGS CONTROL PANEL */}
          {activeTab === "Settings" && (
            <>
              {/* WELCOME BANNER WITH GRAPHIC */}
              <section className="wf-welcome-banner wf-hero-banner-enhanced">
                <div className="wf-welcome-text">
                  <h1>Workforce Settings & Administration</h1>
                  <p>Configure organizational structure, security policies, roles & permissions, notification preferences, and third-party integrations.</p>
                  <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                    <button className="wf-btn-primary" onClick={() => setActiveTab("Overview")}>
                      Return to Overview Dashboard
                    </button>
                    <button className="wf-promo-btn" style={{ background: "var(--wf-accent-dark-brown)" }} onClick={() => alert("✅ All Workforce Settings saved successfully!")}>
                      💾 Save All Settings
                    </button>
                  </div>
                </div>
                <div className="wf-welcome-graphic wf-welcome-graphic-enhanced">
                  <div className="wf-hero-glow-backdrop" />
                  <div className="wf-hero-dot-matrix" />
                  <svg className="wf-hero-leaf-graphic" viewBox="0 0 100 100" fill="none">
                    <path d="M20 80 Q 40 20 80 10 Q 60 70 20 80 Z" fill="rgba(212, 140, 102, 0.18)" stroke="rgba(212, 140, 102, 0.35)" strokeWidth="1.5" />
                    <path d="M40 85 Q 70 40 90 30 Q 75 80 40 85 Z" fill="rgba(224, 122, 95, 0.15)" stroke="rgba(224, 122, 95, 0.3)" strokeWidth="1.5" />
                  </svg>
                  <img
                    src={themeMode === 'dark' ? (darkWorkforcePortalImg || darkHeroImg) : workforcePortalImg}
                    alt="Workforce Settings Illustration"
                    className="wf-team-illustration wf-team-illustration-large"
                  />
                </div>
              </section>

              {/* SUB-TAB NAVIGATION BAR */}
              <div className="wf-settings-tabs-bar">
                {[
                  { id: "General", label: "🏢 General & Organization" },
                  { id: "Roles", label: "🛡️ Roles & Permissions" },
                  { id: "Security", label: "🔒 Security & Access" },
                  { id: "Notifications", label: "🔔 Notifications & Alerts" },
                  { id: "Integrations", label: "🔗 Integrations & APIs" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`wf-settings-tab-btn ${settingsActiveSubTab === tab.id ? "active" : ""}`}
                    onClick={() => setSettingsActiveSubTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* SUB-TAB 1: GENERAL & ORGANIZATION */}
              {settingsActiveSubTab === "General" && (
                <div className="wf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">General Organization Profile</h2>
                    <button className="wf-btn-primary" style={{ padding: "6px 14px", fontSize: "12px" }} onClick={() => alert("Organization profile saved!")}>
                      Save Changes
                    </button>
                  </div>

                  <div className="wf-settings-section">
                    <div className="wf-form-group">
                      <label>Organization Name</label>
                      <input
                        type="text"
                        value={settingsForm.companyName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                      />
                    </div>

                    <div className="wf-form-group">
                      <label>Company Portal Slug / Workspace URL</label>
                      <input
                        type="text"
                        value={settingsForm.companySlug}
                        onChange={(e) => setSettingsForm({ ...settingsForm, companySlug: e.target.value })}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div className="wf-form-group">
                        <label>Primary Timezone</label>
                        <select
                          value={settingsForm.timezone}
                          onChange={(e) => setSettingsForm({ ...settingsForm, timezone: e.target.value })}
                        >
                          <option>(UTC+05:30) India Standard Time (IST)</option>
                          <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                          <option>(UTC+00:00) Greenwich Mean Time (GMT)</option>
                          <option>(UTC+08:00) Singapore Standard Time (SST)</option>
                        </select>
                      </div>

                      <div className="wf-form-group">
                        <label>Default Currency</label>
                        <select
                          value={settingsForm.currency}
                          onChange={(e) => setSettingsForm({ ...settingsForm, currency: e.target.value })}
                        >
                          <option>USD ($)</option>
                          <option>INR (₹)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div className="wf-form-group">
                        <label>Primary Admin Contact Email</label>
                        <input
                          type="email"
                          value={settingsForm.adminEmail}
                          onChange={(e) => setSettingsForm({ ...settingsForm, adminEmail: e.target.value })}
                        />
                      </div>

                      <div className="wf-form-group">
                        <label>Fiscal Year Start Month</label>
                        <select
                          value={settingsForm.fiscalStart}
                          onChange={(e) => setSettingsForm({ ...settingsForm, fiscalStart: e.target.value })}
                        >
                          <option>January</option>
                          <option>April</option>
                          <option>July</option>
                          <option>October</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: ROLES & PERMISSIONS */}
              {settingsActiveSubTab === "Roles" && (
                <div className="wf-card">
                  <div className="wf-card-header" style={{ flexWrap: "wrap", gap: "12px" }}>
                    <h2 className="wf-card-title">Roles & Access Control Matrix</h2>
                    <button className="wf-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px" }} onClick={() => alert("Opening Custom Role Creator...")}>
                      <FaPlus /> Create Custom Role
                    </button>
                  </div>

                  <div className="wf-table-responsive">
                    <table className="wf-table">
                      <thead>
                        <tr>
                          <th>Role Name</th>
                          <th>Access Level</th>
                          <th>Active Users</th>
                          <th>Permissions Scope</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Super Administrator</strong></td>
                          <td><span className="wf-status-pill completed">Full Admin</span></td>
                          <td><strong>5 Users</strong></td>
                          <td>System Settings, Billing, All Employee & Performance Data</td>
                          <td><button className="wf-action-dots-btn" onClick={() => alert("Editing Super Administrator permissions...")}>Edit</button></td>
                        </tr>
                        <tr>
                          <td><strong>Department Manager</strong></td>
                          <td><span className="wf-type-tag survey">Dept Manager</span></td>
                          <td><strong>14 Users</strong></td>
                          <td>Dept Employees, Reviews, Attendance Logs, Skill Matrix</td>
                          <td><button className="wf-action-dots-btn" onClick={() => alert("Editing Department Manager permissions...")}>Edit</button></td>
                        </tr>
                        <tr>
                          <td><strong>Team Lead</strong></td>
                          <td><span className="wf-type-tag initiative">Team Lead</span></td>
                          <td><strong>28 Users</strong></td>
                          <td>Team Skills, Learning Assignments, Peer Feedback</td>
                          <td><button className="wf-action-dots-btn" onClick={() => alert("Editing Team Lead permissions...")}>Edit</button></td>
                        </tr>
                        <tr>
                          <td><strong>Individual Contributor</strong></td>
                          <td><span className="wf-status-pill in-progress">Employee</span></td>
                          <td><strong>465 Users</strong></td>
                          <td>Self-service Portal, My Learning, Personal Reviews</td>
                          <td><button className="wf-action-dots-btn" onClick={() => alert("Editing Individual Contributor permissions...")}>Edit</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: SECURITY & ACCESS */}
              {settingsActiveSubTab === "Security" && (
                <div className="wf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Security Policies & Access Enforcement</h2>
                    <button className="wf-btn-primary" style={{ padding: "6px 14px", fontSize: "12px" }} onClick={() => alert("Security policies updated!")}>
                      Save Security Policies
                    </button>
                  </div>

                  <div className="wf-settings-section">
                    <div className="wf-settings-row">
                      <div className="wf-settings-label-box">
                        <span className="wf-settings-label-title">Enforce Two-Factor Authentication (2FA)</span>
                        <span className="wf-settings-label-desc">Require all workforce admins and employees to authenticate via OTP / Authenticator App.</span>
                      </div>
                      <label className="wf-toggle-switch">
                        <input
                          type="checkbox"
                          checked={settingsForm.enforce2FA}
                          onChange={(e) => setSettingsForm({ ...settingsForm, enforce2FA: e.target.checked })}
                        />
                        <span className="wf-toggle-slider" />
                      </label>
                    </div>

                    <div className="wf-settings-row">
                      <div className="wf-settings-label-box">
                        <span className="wf-settings-label-title">Single Sign-On (SSO) Enforcement</span>
                        <span className="wf-settings-label-desc">Enforce SAML 2.0 / Google Workspace SSO login for organizational domain.</span>
                      </div>
                      <label className="wf-toggle-switch">
                        <input
                          type="checkbox"
                          checked={settingsForm.enforceSSO}
                          onChange={(e) => setSettingsForm({ ...settingsForm, enforceSSO: e.target.checked })}
                        />
                        <span className="wf-toggle-slider" />
                      </label>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div className="wf-form-group">
                        <label>Password Rotation Policy</label>
                        <select
                          value={settingsForm.passwordRotation}
                          onChange={(e) => setSettingsForm({ ...settingsForm, passwordRotation: e.target.value })}
                        >
                          <option>30 Days</option>
                          <option>60 Days</option>
                          <option>90 Days</option>
                          <option>Never</option>
                        </select>
                      </div>

                      <div className="wf-form-group">
                        <label>Idle Session Timeout</label>
                        <select
                          value={settingsForm.sessionTimeout}
                          onChange={(e) => setSettingsForm({ ...settingsForm, sessionTimeout: e.target.value })}
                        >
                          <option>15 Minutes</option>
                          <option>30 Minutes</option>
                          <option>60 Minutes</option>
                          <option>4 Hours</option>
                        </select>
                      </div>
                    </div>

                    <div className="wf-form-group">
                      <label>IP Whitelist Ranges (CIDR blocks)</label>
                      <input
                        type="text"
                        value={settingsForm.ipWhitelist}
                        onChange={(e) => setSettingsForm({ ...settingsForm, ipWhitelist: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: NOTIFICATIONS & ALERTS */}
              {settingsActiveSubTab === "Notifications" && (
                <div className="wf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Automated Notification Preferences</h2>
                    <button className="wf-btn-primary" style={{ padding: "6px 14px", fontSize: "12px" }} onClick={() => alert("Notification settings saved!")}>
                      Save Preferences
                    </button>
                  </div>

                  <div className="wf-settings-section">
                    <div className="wf-settings-row">
                      <div className="wf-settings-label-box">
                        <span className="wf-settings-label-title">System Email Notifications</span>
                        <span className="wf-settings-label-desc">Send automated email updates for performance reviews, new hires, and reports.</span>
                      </div>
                      <label className="wf-toggle-switch">
                        <input
                          type="checkbox"
                          checked={settingsForm.emailNotifications}
                          onChange={(e) => setSettingsForm({ ...settingsForm, emailNotifications: e.target.checked })}
                        />
                        <span className="wf-toggle-slider" />
                      </label>
                    </div>

                    <div className="wf-settings-row">
                      <div className="wf-settings-label-box">
                        <span className="wf-settings-label-title">Slack / MS Teams Absence Alerts</span>
                        <span className="wf-settings-label-desc">Broadcast instant notifications when employees mark unplanned absences.</span>
                      </div>
                      <label className="wf-toggle-switch">
                        <input
                          type="checkbox"
                          checked={settingsForm.slackAlerts}
                          onChange={(e) => setSettingsForm({ ...settingsForm, slackAlerts: e.target.checked })}
                        />
                        <span className="wf-toggle-slider" />
                      </label>
                    </div>

                    <div className="wf-settings-row">
                      <div className="wf-settings-label-box">
                        <span className="wf-settings-label-title">Performance Review Reminders</span>
                        <span className="wf-settings-label-desc">Trigger automated weekly reminders for managers with pending review tasks.</span>
                      </div>
                      <label className="wf-toggle-switch">
                        <input
                          type="checkbox"
                          checked={settingsForm.reviewReminders}
                          onChange={(e) => setSettingsForm({ ...settingsForm, reviewReminders: e.target.checked })}
                        />
                        <span className="wf-toggle-slider" />
                      </label>
                    </div>

                    <div className="wf-settings-row">
                      <div className="wf-settings-label-box">
                        <span className="wf-settings-label-title">Skill Assessment Expiry Alerts</span>
                        <span className="wf-settings-label-desc">Notify team leads 14 days before certifications or assessments expire.</span>
                      </div>
                      <label className="wf-toggle-switch">
                        <input
                          type="checkbox"
                          checked={settingsForm.assessmentReminders}
                          onChange={(e) => setSettingsForm({ ...settingsForm, assessmentReminders: e.target.checked })}
                        />
                        <span className="wf-toggle-slider" />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: INTEGRATIONS & APIS */}
              {settingsActiveSubTab === "Integrations" && (
                <div className="wf-card">
                  <div className="wf-card-header">
                    <h2 className="wf-card-title">Connected Enterprise Apps & Webhooks</h2>
                    <button className="wf-btn-primary" style={{ padding: "6px 14px", fontSize: "12px" }} onClick={() => alert("Integration credentials updated!")}>
                      Save Connections
                    </button>
                  </div>

                  <div className="wf-integration-grid" style={{ marginBottom: "20px" }}>
                    <div className="wf-integration-card">
                      <div className="wf-integration-left">
                        <div className="wf-integration-icon">🌐</div>
                        <div className="wf-integration-info">
                          <span className="wf-integration-name">Google Workspace</span>
                          <span className="wf-integration-status">● Connected (SSO & Sync Active)</span>
                        </div>
                      </div>
                      <button className="wf-btn-primary" style={{ padding: "5px 12px", fontSize: "11px" }} onClick={() => alert("Re-syncing Google Workspace users...")}>Re-sync</button>
                    </div>

                    <div className="wf-integration-card">
                      <div className="wf-integration-left">
                        <div className="wf-integration-icon">💬</div>
                        <div className="wf-integration-info">
                          <span className="wf-integration-name">Slack Enterprise</span>
                          <span className="wf-integration-status">● Connected (Bot & Channel Sync)</span>
                        </div>
                      </div>
                      <button className="wf-btn-primary" style={{ padding: "5px 12px", fontSize: "11px" }} onClick={() => alert("Testing Slack bot connection...")}>Test Bot</button>
                    </div>

                    <div className="wf-integration-card">
                      <div className="wf-integration-left">
                        <div className="wf-integration-icon">🚀</div>
                        <div className="wf-integration-info">
                          <span className="wf-integration-name">Jira / Confluence</span>
                          <span className="wf-integration-status">● Connected (Project Skills Sync)</span>
                        </div>
                      </div>
                      <button className="wf-btn-primary" style={{ padding: "5px 12px", fontSize: "11px" }} onClick={() => alert("Configuring Jira field mappings...")}>Configure</button>
                    </div>

                    <div className="wf-integration-card">
                      <div className="wf-integration-left">
                        <div className="wf-integration-icon">📹</div>
                        <div className="wf-integration-info">
                          <span className="wf-integration-name">MS Teams & Zoom</span>
                          <span className="wf-integration-status">● Connected (Training Webinars)</span>
                        </div>
                      </div>
                      <button className="wf-btn-primary" style={{ padding: "5px 12px", fontSize: "11px" }} onClick={() => alert("Testing Zoom / Teams video API...")}>Test API</button>
                    </div>
                  </div>

                  <div className="wf-form-group">
                    <label>Custom Webhook Dispatch URL</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="text"
                        style={{ flex: 1 }}
                        value={settingsForm.webhookUrl}
                        onChange={(e) => setSettingsForm({ ...settingsForm, webhookUrl: e.target.value })}
                      />
                      <button className="wf-btn-primary" style={{ padding: "8px 16px", fontSize: "12px" }} onClick={() => alert("⚡ Webhook test payload dispatched successfully! Response: 200 OK")}>
                        ⚡ Test Webhook
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {/* REUSABLE FOOTER PRESENT ON ALL PAGE TABS */}
          <footer className="wf-dashboard-footer">
            <div className="wf-footer-top">
              <div className="wf-footer-brand">
                <div className="wf-footer-brand-logo">
                  <div className="wf-logo-icon" style={{ width: "32px", height: "32px", fontSize: "16px" }}>⬢</div>
                  <div>
                    <strong style={{ fontSize: "16px", color: "var(--wf-text-primary)" }}>SkillSphere</strong>
                    <span style={{ fontSize: "11px", display: "block", color: "var(--wf-text-secondary)" }}>Workforce</span>
                  </div>
                </div>
                <p className="wf-footer-brand-desc">
                  Empowering organizations by building a skilled and engaged workforce.
                </p>
                <div className="wf-footer-socials">
                  <FaLinkedin className="wf-footer-social-icon" />
                  <FaFacebook className="wf-footer-social-icon" />
                  <FaTwitter className="wf-footer-social-icon" />
                  <FaInstagram className="wf-footer-social-icon" />
                </div>
              </div>

              <div className="wf-footer-col">
                <span className="wf-footer-col-title">Overview</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Overview")}>Overview</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Employees")}>Employees</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Teams")}>Teams</span>
              </div>

              <div className="wf-footer-col">
                <span className="wf-footer-col-title">Skills & Assessments</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Skills")}>Skills & Assessments</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Skills")}>Assessments</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Skills")}>Skill Library</span>
              </div>

              <div className="wf-footer-col">
                <span className="wf-footer-col-title">Performance</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Performance")}>Performance</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Performance")}>Reviews</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Performance")}>Goals</span>
              </div>

              <div className="wf-footer-col">
                <span className="wf-footer-col-title">Attendance</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Attendance")}>Attendance</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Attendance")}>Leaves</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Attendance")}>Calendar</span>
              </div>

              <div className="wf-footer-col">
                <span className="wf-footer-col-title">Engagement</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Engagement")}>Engagement</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Engagement")}>Surveys</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Engagement")}>Feedback</span>
              </div>

              <div className="wf-footer-col">
                <span className="wf-footer-col-title">Reports & Analytics</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Reports")}>Reports & Analytics</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Reports")}>Dashboards</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Reports")}>Insights</span>
              </div>

              <div className="wf-footer-col">
                <span className="wf-footer-col-title">Workforce Settings</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Settings")}>Workforce Settings</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Settings")}>Roles & Permissions</span>
                <span className="wf-footer-link" onClick={() => setActiveTab("Settings")}>Integrations</span>
              </div>
            </div>

            <div className="wf-footer-bottom">
              <span>© 2025 SkillSphere Workforce. All rights reserved.</span>
              <div className="wf-footer-bottom-links">
                <span className="wf-footer-link" onClick={() => navigate("/contact")}>Privacy Policy</span>
                <span className="wf-footer-link" onClick={() => navigate("/contact")}>Terms of Service</span>
                <span className="wf-footer-link" onClick={() => navigate("/contact")}>Help Center</span>
                <span className="wf-footer-link" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><FaGlobe /> English</span>
              </div>
            </div>
          </footer>

        </main>
      </div>

      {/* CREATE TEAM MODAL */}
      {showCreateTeamModal && (
        <div className="wf-modal-overlay" onClick={() => setShowCreateTeamModal(false)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>Create New Team</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowCreateTeamModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateTeam}>
              <div className="wf-form-group">
                <label>Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Research Group"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                />
              </div>

              <div className="wf-form-group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="e.g. Developing next-gen machine learning features"
                  value={newTeam.desc}
                  onChange={(e) => setNewTeam({ ...newTeam, desc: e.target.value })}
                />
              </div>

              <div className="wf-form-group">
                <label>Team Lead Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Mehta"
                  value={newTeam.lead}
                  onChange={(e) => setNewTeam({ ...newTeam, lead: e.target.value })}
                />
              </div>

              <div className="wf-form-group">
                <label>Department</label>
                <select
                  value={newTeam.dept}
                  onChange={(e) => setNewTeam({ ...newTeam, dept: e.target.value })}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Product Development">Product Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>

              <div className="wf-form-group">
                <label>Member Count</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newTeam.members}
                  onChange={(e) => setNewTeam({ ...newTeam, members: e.target.value })}
                />
              </div>

              <div className="wf-modal-actions">
                <button type="button" className="wf-select-filter" onClick={() => setShowCreateTeamModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="wf-btn-primary">
                  Save Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD EMPLOYEE MODAL */}
      {showEmployeeModal && (
        <div className="wf-modal-overlay" onClick={() => setShowEmployeeModal(false)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>Add New Employee</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowEmployeeModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAddEmployee}>
              <div className="wf-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                />
              </div>

              <div className="wf-form-group">
                <label>Role / Designation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newEmp.role}
                  onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                />
              </div>

              <div className="wf-form-group">
                <label>Department</label>
                <select
                  value={newEmp.dept}
                  onChange={(e) => setNewEmp({ ...newEmp, dept: e.target.value })}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Product Development">Product Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Customer Success">Customer Success</option>
                  <option value="Operations">Operations</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>

              <div className="wf-form-group">
                <label>Initial Skill Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newEmp.score}
                  onChange={(e) => setNewEmp({ ...newEmp, score: e.target.value })}
                />
              </div>

              <div className="wf-modal-actions">
                <button type="button" className="wf-select-filter" onClick={() => setShowEmployeeModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="wf-btn-primary">
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INTERACTIVE DRILLDOWN MODALS */}
      {showExportModal && (
        <div className="wf-modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>Export Attendance Report</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowExportModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="wf-form-group">
              <label>Select Export Format</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className={`wf-filter-pill ${exportFormat === "PDF" ? "active" : ""}`}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  onClick={() => setExportFormat("PDF")}
                >
                  <FaFilePdf /> PDF Report
                </button>
                <button
                  className={`wf-filter-pill ${exportFormat === "XLSX" ? "active" : ""}`}
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  onClick={() => setExportFormat("XLSX")}
                >
                  <FaFileExcel /> Excel (.xlsx)
                </button>
              </div>
            </div>

            <div className="wf-form-group">
              <label>Date Range Filter</label>
              <select defaultValue="May 2025">
                <option>Current Month (May 2025)</option>
                <option>Last Month (April 2025)</option>
                <option>Year to Date (2025)</option>
              </select>
            </div>

            <div className="wf-modal-actions">
              <button className="wf-select-filter" onClick={() => setShowExportModal(false)}>Cancel</button>
              <button className="wf-btn-primary" onClick={() => {
                alert(`Downloading ${exportFormat} report for Attendance Overview...`);
                setShowExportModal(false);
              }}>
                <FaCheck /> Generate & Download
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedAssessment && (
        <div className="wf-modal-overlay" onClick={() => setSelectedAssessment(null)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>{selectedAssessment.title}</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setSelectedAssessment(null)}>
                <FaTimes />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px", marginBottom: "16px" }}>
              <div style={{ padding: "10px", background: "#f8f4f0", borderRadius: "8px" }}>
                <span style={{ color: "var(--wf-text-muted)", fontSize: "11px", display: "block" }}>Category</span>
                <strong>{selectedAssessment.category}</strong>
              </div>
              <div style={{ padding: "10px", background: "#f8f4f0", borderRadius: "8px" }}>
                <span style={{ color: "var(--wf-text-muted)", fontSize: "11px", display: "block" }}>Status</span>
                <strong>{selectedAssessment.status}</strong>
              </div>
              <div style={{ padding: "10px", background: "#f8f4f0", borderRadius: "8px" }}>
                <span style={{ color: "var(--wf-text-muted)", fontSize: "11px", display: "block" }}>Participants</span>
                <strong>{selectedAssessment.participants} Members</strong>
              </div>
              <div style={{ padding: "10px", background: "#f8f4f0", borderRadius: "8px" }}>
                <span style={{ color: "var(--wf-text-muted)", fontSize: "11px", display: "block" }}>Average Score</span>
                <strong>{selectedAssessment.score}</strong>
              </div>
            </div>

            <div className="wf-modal-actions">
              <button className="wf-btn-primary" onClick={() => setSelectedAssessment(null)}>Close Details</button>
            </div>
          </div>
        </div>
      )}

      {showReviewsModal && (
        <div className="wf-modal-overlay" onClick={() => setShowReviewsModal(false)}>
          <div className="wf-modal-box" style={{ maxWidth: "600px" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>Organization Performance Breakdown</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowReviewsModal(false)}>
                <FaTimes />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "var(--wf-text-secondary)", marginBottom: "16px" }}>
              Comprehensive performance scores across 248 evaluated workforce employees.
            </p>

            <div className="wf-activity-list" style={{ maxHeight: "300px", overflowY: "auto" }}>
              <div className="wf-activity-item">
                <div className="wf-activity-left">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Sneha" className="wf-activity-avatar" />
                  <div className="wf-activity-details">
                    <span className="wf-activity-name">Sneha Kapoor • Data Scientist</span>
                    <span className="wf-activity-time">Rating: 4.9/5 • Exceeded all ML velocity targets</span>
                  </div>
                </div>
                <span className="wf-perf-pill excellent">4.9 Excellent</span>
              </div>

              <div className="wf-activity-item">
                <div className="wf-activity-left">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Vikram" className="wf-activity-avatar" />
                  <div className="wf-activity-details">
                    <span className="wf-activity-name">Vikram Patil • Engineering Lead</span>
                    <span className="wf-activity-time">Rating: 4.8/5 • Delivered microservices refactoring</span>
                  </div>
                </div>
                <span className="wf-perf-pill excellent">4.8 Excellent</span>
              </div>
            </div>

            <div className="wf-modal-actions">
              <button className="wf-btn-primary" onClick={() => setShowReviewsModal(false)}>Close Breakdown</button>
            </div>
          </div>
        </div>
      )}

      {/* Apply for Leave Modal */}
      {showApplyLeaveModal && (
        <div className="wf-modal-overlay" onClick={() => setShowApplyLeaveModal(false)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>🌴 Apply for Leave</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowApplyLeaveModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleApplyLeaveSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Leave Type</label>
                <select
                  className="wf-select-filter"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                  value={newLeaveForm.leaveType}
                  onChange={e => setNewLeaveForm({ ...newLeaveForm, leaveType: e.target.value })}
                >
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Paid Time Off">Paid Time Off</option>
                  <option value="Vacation Leave">Vacation Leave</option>
                  <option value="Maternity / Paternity Leave">Maternity / Paternity Leave</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Start Date</label>
                  <input
                    type="date"
                    required
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                    value={newLeaveForm.startDate}
                    onChange={e => setNewLeaveForm({ ...newLeaveForm, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>End Date</label>
                  <input
                    type="date"
                    required
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                    value={newLeaveForm.endDate}
                    onChange={e => setNewLeaveForm({ ...newLeaveForm, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Reason for Leave</label>
                <textarea
                  required
                  placeholder="Explain why leave is requested..."
                  rows={3}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", resize: "none" }}
                  value={newLeaveForm.reason}
                  onChange={e => setNewLeaveForm({ ...newLeaveForm, reason: e.target.value })}
                />
              </div>

              <div className="wf-modal-actions" style={{ marginTop: "10px" }}>
                <button type="button" className="wf-btn-secondary" onClick={() => setShowApplyLeaveModal(false)} style={{ padding: "10px 18px", borderRadius: "8px" }}>
                  Cancel
                </button>
                <button type="submit" className="wf-btn-primary" style={{ padding: "10px 20px", borderRadius: "8px", background: "#f9572a" }}>
                  Submit Leave Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Survey Modal */}
      {showCreateSurveyModal && (
        <div className="wf-modal-overlay" onClick={() => setShowCreateSurveyModal(false)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: "520px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>📊 Create New Engagement Survey</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowCreateSurveyModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateSurveySubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Survey / Initiative Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Workplace Culture & Wellness Survey"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                  value={newSurveyForm.title}
                  onChange={e => setNewSurveyForm({ ...newSurveyForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Initiative Type</label>
                  <select
                    className="wf-select-filter"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                    value={newSurveyForm.type}
                    onChange={e => setNewSurveyForm({ ...newSurveyForm, type: e.target.value })}
                  >
                    <option value="Survey">Survey</option>
                    <option value="Initiative">Initiative</option>
                    <option value="Pulse Poll">Pulse Poll</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Target Department</label>
                  <select
                    className="wf-select-filter"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                    value={newSurveyForm.dept}
                    onChange={e => setNewSurveyForm({ ...newSurveyForm, dept: e.target.value })}
                  >
                    <option value="All Departments">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Launch Date</label>
                  <input
                    type="date"
                    required
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                    value={newSurveyForm.startDate}
                    onChange={e => setNewSurveyForm({ ...newSurveyForm, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Closing Date</label>
                  <input
                    type="date"
                    required
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                    value={newSurveyForm.endDate}
                    onChange={e => setNewSurveyForm({ ...newSurveyForm, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Description & Goals</label>
                <textarea
                  placeholder="Outline the survey objective..."
                  rows={3}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", resize: "none" }}
                  value={newSurveyForm.desc}
                  onChange={e => setNewSurveyForm({ ...newSurveyForm, desc: e.target.value })}
                />
              </div>

              <div className="wf-modal-actions" style={{ marginTop: "10px" }}>
                <button type="button" className="wf-btn-secondary" onClick={() => setShowCreateSurveyModal(false)} style={{ padding: "10px 18px", borderRadius: "8px" }}>
                  Cancel
                </button>
                <button type="submit" className="wf-btn-primary" style={{ padding: "10px 20px", borderRadius: "8px" }}>
                  Launch Survey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generate Custom Report Modal */}
      {showCustomReportModal && (
        <div className="wf-modal-overlay" onClick={() => setShowCustomReportModal(false)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>📝 Generate Custom Report</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowCustomReportModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCustomReportSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Report Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q2 Workforce Velocity & Skill Gap Benchmark"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                  value={customReportForm.title}
                  onChange={e => setCustomReportForm({ ...customReportForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Category</label>
                  <select
                    className="wf-select-filter"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                    value={customReportForm.category}
                    onChange={e => setCustomReportForm({ ...customReportForm, category: e.target.value })}
                  >
                    <option value="Skills">Skills</option>
                    <option value="Performance">Performance</option>
                    <option value="Attendance">Attendance</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Learning">Learning</option>
                    <option value="Analytics">Analytics</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Frequency</label>
                  <select
                    className="wf-select-filter"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                    value={customReportForm.frequency}
                    onChange={e => setCustomReportForm({ ...customReportForm, frequency: e.target.value })}
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Export Format</label>
                <select
                  className="wf-select-filter"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                  value={customReportForm.format}
                  onChange={e => setCustomReportForm({ ...customReportForm, format: e.target.value })}
                >
                  <option value="PDF / Excel">PDF / Excel</option>
                  <option value="PDF">PDF Only</option>
                  <option value="CSV / Excel">CSV / Excel</option>
                </select>
              </div>

              <div className="wf-modal-actions" style={{ marginTop: "10px" }}>
                <button type="button" className="wf-btn-secondary" onClick={() => setShowCustomReportModal(false)} style={{ padding: "10px 18px", borderRadius: "8px" }}>
                  Cancel
                </button>
                <button type="submit" className="wf-btn-primary" style={{ padding: "10px 20px", borderRadius: "8px" }}>
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Report Modal */}
      {showExportModal && (
        <div className="wf-modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: "480px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>📥 Export Workforce Report</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowExportModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleExportReportSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Select Export Format</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {["CSV", "PDF", "Excel"].map(fmt => (
                    <button
                      key={fmt}
                      type="button"
                      style={{
                        padding: "10px", borderRadius: "8px", fontWeight: "800", fontSize: "13px",
                        border: exportFormat === fmt ? "2px solid #e07a5f" : "1px solid #CBD5E1",
                        background: exportFormat === fmt ? "rgba(224, 122, 95, 0.15)" : "transparent",
                        color: exportFormat === fmt ? "#e07a5f" : "inherit",
                        cursor: "pointer"
                      }}
                      onClick={() => setExportFormat(fmt)}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Department Scope</label>
                <select
                  className="wf-select-filter"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                  value={attendanceDeptFilter}
                  onChange={e => setAttendanceDeptFilter(e.target.value)}
                >
                  <option value="All Departments">All Departments (512 Employees)</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>

              <div className="wf-modal-actions" style={{ marginTop: "10px" }}>
                <button type="button" className="wf-btn-secondary" onClick={() => setShowExportModal(false)} style={{ padding: "10px 18px", borderRadius: "8px" }}>
                  Cancel
                </button>
                <button type="submit" className="wf-btn-primary" style={{ padding: "10px 20px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <FaFileExport /> Export & Download
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      {showCreateTeamModal && (
        <div className="wf-modal-overlay" onClick={() => setShowCreateTeamModal(false)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>👥 Create New Workforce Team</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowCreateTeamModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateTeamSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI & Cloud Architecture Unit"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                  value={newTeam.name}
                  onChange={e => setNewTeam({ ...newTeam, name: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Department</label>
                  <select
                    className="wf-select-filter"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                    value={newTeam.dept}
                    onChange={e => setNewTeam({ ...newTeam, dept: e.target.value })}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Team Lead</label>
                  <input
                    type="text"
                    placeholder="e.g. Aman Verma"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                    value={newTeam.lead}
                    onChange={e => setNewTeam({ ...newTeam, lead: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Initial Team Members</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                  value={newTeam.members}
                  onChange={e => setNewTeam({ ...newTeam, members: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Team Mission / Description</label>
                <textarea
                  rows={2}
                  placeholder="Outline the team's responsibility..."
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", resize: "none" }}
                  value={newTeam.desc}
                  onChange={e => setNewTeam({ ...newTeam, desc: e.target.value })}
                />
              </div>

              <div className="wf-modal-actions" style={{ marginTop: "10px" }}>
                <button type="button" className="wf-btn-secondary" onClick={() => setShowCreateTeamModal(false)} style={{ padding: "10px 18px", borderRadius: "8px" }}>
                  Cancel
                </button>
                <button type="submit" className="wf-btn-primary" style={{ padding: "10px 20px", borderRadius: "8px" }}>
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showEmployeeModal && (
        <div className="wf-modal-overlay" onClick={() => setShowEmployeeModal(false)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>👤 Add New Employee</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowEmployeeModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAddEmployeeSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                  value={newEmp.name}
                  onChange={e => setNewEmp({ ...newEmp, name: e.target.value })}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Department</label>
                  <select
                    className="wf-select-filter"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                    value={newEmp.dept}
                    onChange={e => setNewEmp({ ...newEmp, dept: e.target.value })}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Designation / Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Frontend Engineer"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                    value={newEmp.role}
                    onChange={e => setNewEmp({ ...newEmp, role: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Employment Status</label>
                  <select
                    className="wf-select-filter"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
                    value={newEmp.status}
                    onChange={e => setNewEmp({ ...newEmp, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "750", marginBottom: "6px" }}>Initial Skill Score</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}
                    value={newEmp.score}
                    onChange={e => setNewEmp({ ...newEmp, score: parseInt(e.target.value) || 85 })}
                  />
                </div>
              </div>

              <div className="wf-modal-actions" style={{ marginTop: "10px" }}>
                <button type="button" className="wf-btn-secondary" onClick={() => setShowEmployeeModal(false)} style={{ padding: "10px 18px", borderRadius: "8px" }}>
                  Cancel
                </button>
                <button type="submit" className="wf-btn-primary" style={{ padding: "10px 20px", borderRadius: "8px" }}>
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Calendar Modal */}
      {showCalendarModal && (
        <div className="wf-modal-overlay" onClick={() => setShowCalendarModal(false)}>
          <div className="wf-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 className="wf-modal-title" style={{ margin: 0 }}>📅 Workforce Attendance & Event Calendar (May 2025)</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }} onClick={() => setShowCalendarModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", textAlign: "center", marginBottom: "16px" }}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                <div key={day} style={{ fontWeight: "800", fontSize: "12px", color: "var(--wf-text-muted)" }}>{day}</div>
              ))}
              {Array.from({ length: 31 }).map((_, idx) => {
                const dayNum = idx + 1;
                const isHoliday = dayNum === 1 || dayNum === 25;
                const hasLeave = dayNum === 5 || dayNum === 6 || dayNum === 7;
                return (
                  <div
                    key={dayNum}
                    style={{
                      padding: "10px 4px", borderRadius: "8px", fontSize: "12px", fontWeight: "700",
                      background: isHoliday ? "rgba(239, 68, 68, 0.15)" : hasLeave ? "rgba(245, 158, 11, 0.15)" : "rgba(0,0,0,0.03)",
                      color: isHoliday ? "#EF4444" : hasLeave ? "#D97706" : "inherit",
                      border: dayNum === 15 ? "2px solid #e07a5f" : "none"
                    }}
                  >
                    <div>{dayNum}</div>
                    <div style={{ fontSize: "9px", fontWeight: "600", marginTop: "2px" }}>
                      {isHoliday ? "Holiday" : hasLeave ? "Leave" : "83% Pres"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="wf-modal-actions">
              <button className="wf-btn-primary" onClick={() => setShowCalendarModal(false)}>Close Calendar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MESSAGES / TEAM CHAT DRAWER ── */}
      {showMessagesDrawer && (
        <div className="wf-modal-overlay" onClick={() => setShowMessagesDrawer(false)}>
          <div
            className="wf-modal-box"
            onClick={e => e.stopPropagation()}
            style={{
              position: "fixed",
              top: "70px",
              right: "20px",
              width: "380px",
              maxWidth: "92vw",
              height: "540px",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              padding: "0",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              background: themeMode === 'dark' ? "#0f172a" : "#ffffff",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            {/* Chat Header */}
            <div style={{
              padding: "14px 16px",
              background: "var(--wf-accent-brown, #8c5338)",
              color: "#ffffff",
              display: "flex",
              justify: "space-between",
              alignItems: "center"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={activeChatUser.avatar} alt={activeChatUser.name} style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "800" }}>{activeChatUser.name}</h4>
                  <span style={{ fontSize: "11px", opacity: 0.85 }}>● {activeChatUser.status} • {activeChatUser.role}</span>
                </div>
              </div>
              <button
                style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "18px" }}
                onClick={() => setShowMessagesDrawer(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* Teammates Quick Switcher */}
            <div style={{
              padding: "8px 12px",
              background: themeMode === 'dark' ? "rgba(255,255,255,0.05)" : "#FAF8F5",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              gap: "8px",
              overflowX: "auto"
            }}>
              {[
                { id: 1, name: "Aman Verma", role: "Engineering Lead", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", status: "Online" },
                { id: 2, name: "Sneha Iyer", role: "Marketing Specialist", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80", status: "Online" },
                { id: 3, name: "Riya Sharma", role: "Operations Manager", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", status: "Away" },
                { id: 4, name: "Vikram Singh", role: "Data Analyst", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", status: "Online" }
              ].map(u => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setActiveChatUser(u)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px", padding: "4px 8px", borderRadius: "20px",
                    border: activeChatUser.id === u.id ? "2px solid #e07a5f" : "1px solid transparent",
                    background: activeChatUser.id === u.id ? "rgba(224,122,95,0.18)" : "transparent",
                    color: activeChatUser.id === u.id ? "#e07a5f" : "inherit",
                    cursor: "pointer", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap"
                  }}
                >
                  <img src={u.avatar} alt={u.name} style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                  <span>{u.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              background: themeMode === 'dark' ? "#0f172a" : "#ffffff"
            }}>
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.isMe ? "flex-end" : "flex-start",
                    maxWidth: "82%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.isMe ? "flex-end" : "flex-start"
                  }}
                >
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: msg.isMe ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    background: msg.isMe ? "#e07a5f" : (themeMode === 'dark' ? "#1e293b" : "#f1f5f9"),
                    color: msg.isMe ? "#ffffff" : (themeMode === 'dark' ? "#f8fafc" : "#334155"),
                    fontSize: "12px",
                    lineHeight: "1.4",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: "10px", color: "var(--wf-text-muted)", marginTop: "4px", padding: "0 4px" }}>
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessageSubmit} style={{
              padding: "12px",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              gap: "8px",
              background: themeMode === 'dark' ? "#1e293b" : "#FAF8F5"
            }}>
              <input
                type="text"
                placeholder={`Message ${activeChatUser.name.split(' ')[0]}...`}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "20px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  outline: "none",
                  fontSize: "12px",
                  background: themeMode === 'dark' ? "#0f172a" : "#ffffff",
                  color: themeMode === 'dark' ? "#ffffff" : "#000000"
                }}
                value={inputMessageText}
                onChange={e => setInputMessageText(e.target.value)}
              />
              <button
                type="submit"
                className="wf-btn-primary"
                style={{
                  width: "36px", height: "36px", borderRadius: "50%", padding: "0",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}
              >
                <FaPaperPlane style={{ fontSize: "12px" }} />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
