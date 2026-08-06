import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import PaperPlaneCursor from "../components/PaperPlaneCursor";
import StudentFooter from "../components/StudentFooter";
import FloatingChatbot from "../components/FloatingChatbot";
import NotificationDropdown from "../components/NotificationDropdown";
import UserAvatar from "../components/UserAvatar";

import {
  FaHome,
  FaBook,
  FaCodeBranch,
  FaFileAlt,
  FaComments,
  FaAward,
  FaCertificate,
  FaChartLine,
  FaFileInvoice,
  FaBolt,
  FaTrophy,
  FaCog,
  FaSearch,
  FaBell,
  FaRobot,
  FaRocket,
  FaMapSigns,
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaCalendarAlt,
  FaFire,
  FaClock,
  FaGraduationCap,
  FaShareAlt,
  FaChevronDown,
  FaLightbulb,
  FaArrowUp,
  FaCode,
  FaDatabase,
  FaPenNib,
  FaInfinity,
  FaInfoCircle,
  FaCheckCircle,
  FaSignOutAlt
} from "react-icons/fa";

import "../styles/studentDashboard.css";
import "../styles/progressPage.css";

const allPathLessons = [
  // React Path (starts with digits: 1-1, 1-2, etc. up to 6-1)
  { id: "1-1", title: "React Overview & Setup", type: "reading", subjectId: "react" },
  { id: "1-2", title: "Create React App & Vite", type: "reading", subjectId: "react" },
  { id: "1-3", title: "React Folder Structure", type: "reading", subjectId: "react" },
  { id: "1-4", title: "Virtual DOM & Reconciliation", type: "reading", subjectId: "react" },
  { id: "1-5", title: "React Masterclass Setup Video", type: "video", subjectId: "react" },
  { id: "2-1", title: "JSX Syntax Rules", type: "reading", subjectId: "react" },
  { id: "2-2", title: "Rendering Expressions in JSX", type: "reading", subjectId: "react" },
  { id: "2-3", title: "Conditional Rendering", type: "reading", subjectId: "react" },
  { id: "2-4", title: "List Rendering & Keys", type: "reading", subjectId: "react" },
  { id: "2-5", title: "Figma to JSX Workflow Video", type: "video", subjectId: "react" },
  { id: "3-1", title: "React Components (Functional)", type: "reading", subjectId: "react" },
  { id: "3-2", title: "Props vs State", type: "reading", subjectId: "react" },
  { id: "3-3", title: "Component Lifecycle Basics", type: "reading", subjectId: "react" },
  { id: "3-4", title: "Handling UI Events", type: "reading", subjectId: "react" },
  { id: "3-5", title: "Building Reusable Buttons Video", type: "video", subjectId: "react" },
  { id: "4-1", title: "React useState Hook", type: "reading", subjectId: "react" },
  { id: "4-2", title: "React useEffect Hook", type: "reading", subjectId: "react" },
  { id: "4-3", title: "Custom Hooks Creation", type: "reading", subjectId: "react" },
  { id: "4-4", title: "Rules of Hooks", type: "reading", subjectId: "react" },
  { id: "4-5", title: "Interactive Quiz Dashboard Video", type: "video", subjectId: "react" },
  { id: "5-1", title: "React Context API", type: "reading", subjectId: "react" },
  { id: "5-2", title: "useContext & Global State", type: "reading", subjectId: "react" },
  { id: "5-3", title: "State Management Libraries", type: "reading", subjectId: "react" },
  { id: "5-4", title: "Redux Toolkit Overview", type: "reading", subjectId: "react" },
  { id: "5-5", title: "Dark/Light Theme Switcher Video", type: "video", subjectId: "react" },
  { id: "6-1", title: "React Production Deployment", type: "video", subjectId: "react" },
  { id: "6-2", title: "Vercel & Netlify Hosting", type: "reading", subjectId: "react" },
  { id: "6-3", title: "React Router Navigation", type: "reading", subjectId: "react" },
  { id: "6-4", title: "Lazy Loading & Suspense", type: "reading", subjectId: "react" },
  { id: "6-5", title: "Complete Portfolio Deploy Video", type: "video", subjectId: "react" },

  // Python Path (py-1-1, etc.)
  { id: "py-1-1", title: "Python Overview & Setup", type: "reading", subjectId: "python" },
  { id: "py-1-2", title: "Lists, Tuples & Dictionaries", type: "reading", subjectId: "python" },
  { id: "py-2-1", title: "N-Dimensional Arrays", type: "reading", subjectId: "python" },
  { id: "py-3-1", title: "DataFrames & Series", type: "reading", subjectId: "python" },
  { id: "py-4-1", title: "Plotting Line & Bar Charts", type: "reading", subjectId: "python" },
  { id: "py-5-1", title: "Supervised Regression Models", type: "reading", subjectId: "python" },
  { id: "py-6-1", title: "Python Masterclass Video", type: "video", subjectId: "python" },

  // Node Path (node-1-1, etc.)
  { id: "node-1-1", title: "Node.js Architecture", type: "reading", subjectId: "node" },
  { id: "node-2-1", title: "Express REST Routes", type: "reading", subjectId: "node" },
  { id: "node-3-1", title: "Mongoose Schema Models", type: "reading", subjectId: "node" },
  { id: "node-4-1", title: "JWT Authentication Security", type: "reading", subjectId: "node" },
  { id: "node-5-1", title: "Socket.IO Event Emitters", type: "reading", subjectId: "node" },
  { id: "node-6-1", title: "Node.js Video Masterclass", type: "video", subjectId: "node" },

  // UI/UX Path (ui-1-1, etc.)
  { id: "ui-1-1", title: "UX Heuristics & Personas", type: "reading", subjectId: "uiux" },
  { id: "ui-2-1", title: "8pt Layout Grid System", type: "reading", subjectId: "uiux" },
  { id: "ui-3-1", title: "Responsive Components in Figma", type: "reading", subjectId: "uiux" },
  { id: "ui-4-1", title: "Smart Animate Micro-interactions", type: "reading", subjectId: "uiux" },
  { id: "ui-5-1", title: "Figma Variables & Tokens", type: "reading", subjectId: "uiux" },
  { id: "ui-6-1", title: "Figma Video Masterclass", type: "video", subjectId: "uiux" },

  // Java Path (java-1-1, etc.)
  { id: "java-1-1", title: "Java JVM Architecture", type: "reading", subjectId: "java" },
  { id: "java-2-1", title: "Classes & Inheritance", type: "reading", subjectId: "java" },
  { id: "java-3-1", title: "Try-Catch & Lists", type: "reading", subjectId: "java" },
  { id: "java-4-1", title: "Runnable & Synchronization", type: "reading", subjectId: "java" },
  { id: "java-5-1", title: "Functional Programming", type: "reading", subjectId: "java" },
  { id: "java-6-1", title: "Java Backend Masterclass Video", type: "video", subjectId: "java" },

  // Spring Boot Path (sb-1-1, etc.)
  { id: "sb-1-1", title: "Core Concepts of Spring", type: "reading", subjectId: "springboot" },
  { id: "sb-2-1", title: "Creating RESTful Endpoints", type: "reading", subjectId: "springboot" },
  { id: "sb-3-1", title: "Autowired & Component Scanning", type: "reading", subjectId: "springboot" },
  { id: "sb-4-1", title: "Repository Interfaces & Hibernate", type: "reading", subjectId: "springboot" },
  { id: "sb-5-1", title: "Securing Endpoints with JWT", type: "reading", subjectId: "springboot" },
  { id: "sb-6-1", title: "Microservices & Cloud Deployment", type: "video", subjectId: "springboot" },

  // JavaScript Path (js-1-1, etc.)
  { id: "js-1-1", title: "Call Stack & Global Memory", type: "reading", subjectId: "js" },
  { id: "js-2-1", title: "Closures & Scope Chain", type: "reading", subjectId: "js" },
  { id: "js-3-1", title: "Task Queue vs Microtask Queue", type: "reading", subjectId: "js" },
  { id: "js-4-1", title: "Promise Methods & Async/Await", type: "reading", subjectId: "js" },
  { id: "js-5-1", title: "Prototypal Chain & Delegation", type: "reading", subjectId: "js" },
  { id: "js-6-1", title: "Advanced Javascript V8 Masterclass", type: "video", subjectId: "js" },

  // DSA Path (dsa-1-1, etc.)
  { id: "dsa-1-1", title: "Big O Notation & Logarithms", type: "reading", subjectId: "dsa" },
  { id: "dsa-2-1", title: "Linear Data Structures", type: "reading", subjectId: "dsa" },
  { id: "dsa-3-1", title: "LIFO vs FIFO Operations", type: "reading", subjectId: "dsa" },
  { id: "dsa-4-1", title: "Solving Recursive Subproblems", type: "reading", subjectId: "dsa" }
];

export default function ProgressPage() {
  const { user, xp, logout, themeMode, toggleTheme, enrolledCourses, completedTopics } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFilter, setTimeFilter] = useState("This Month");
  const [toastMessage, setToastMessage] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userName = user?.full_name || user?.username || "Learner";
  const currentXp = xp ?? 0;

  const getLevelInfo = (totalXp) => {
    const level = Math.floor(totalXp / 2000) + 1;
    const currentLevelXp = totalXp % 2000;
    const nextLevelRequiredXp = 2000;
    const remainingXp = nextLevelRequiredXp - currentLevelXp;
    const pct = Math.round((currentLevelXp / nextLevelRequiredXp) * 100);
    
    let badge = "Active Learner";
    if (totalXp >= 3000) badge = "React Master";
    else if (totalXp >= 2500) badge = "Component Wizard";
    else if (totalXp >= 2000) badge = "Hook Specialist";
    else if (totalXp >= 1500) badge = "UI Architect";
    else if (totalXp >= 1000) badge = "State Guru";

    return {
      level,
      currentLevelXp,
      nextLevelRequiredXp,
      remainingXp,
      pct,
      badge
    };
  };

  const getHeatmapCells = () => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const startMonday = new Date(today);
    startMonday.setDate(today.getDate() - daysToSubtract - (14 * 7));
    
    let activityMap = {};
    if (user && user.activity_map) {
      try {
        activityMap = typeof user.activity_map === 'string' ? JSON.parse(user.activity_map) : user.activity_map;
      } catch (e) {}
    }
    
    const cells = [];
    for (let idx = 0; idx < 105; idx++) {
      const cellDate = new Date(startMonday);
      cellDate.setDate(startMonday.getDate() + idx);
      
      const year = cellDate.getFullYear();
      const month = String(cellDate.getMonth() + 1).padStart(2, '0');
      const dateVal = String(cellDate.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${dateVal}`;
      
      const count = activityMap[dateKey] || 0;
      
      let level = 0;
      if (count > 0 && count <= 2) level = 1;
      else if (count > 2 && count <= 5) level = 2;
      else if (count > 5 && count <= 10) level = 3;
      else if (count > 10) level = 4;
      
      const formattedDate = cellDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
      cells.push({
        idx,
        level,
        title: `${formattedDate}: ${count} activities`
      });
    }
    return cells;
  };

  const getMonthHeaders = () => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const startMonday = new Date(today);
    startMonday.setDate(today.getDate() - daysToSubtract - (14 * 7));
    
    const months = [];
    const temp = new Date(startMonday);
    while (temp <= today) {
      const monthName = temp.toLocaleDateString([], { month: 'short' });
      if (!months.includes(monthName)) {
        months.push(monthName);
      }
      temp.setDate(temp.getDate() + 7);
    }
    return months;
  };

  const getSubjectProgressData = () => {
    const subjects = [
      { id: "react", name: "Fullstack Web Development", icon: <FaCode />, colorClass: "green" },
      { id: "dsa", name: "Data Structures & Algorithms", icon: <FaCode />, colorClass: "blue" },
      { id: "node", name: "Fullstack with Node.js", icon: <FaCode />, colorClass: "purple" },
      { id: "uiux", name: "UI/UX Design Masterclass", icon: <FaPenNib />, colorClass: "pink" },
      { id: "java", name: "Java Programming Path", icon: <FaInfinity />, colorClass: "teal" },
      { id: "springboot", name: "Spring Boot Framework Path", icon: <FaCode />, colorClass: "green" },
      { id: "js", name: "Advanced JavaScript Path", icon: <FaCode />, colorClass: "purple" },
      { id: "python", name: "Python for Data Science", icon: <FaCode />, colorClass: "blue" }
    ];

    const completedSet = new Set(completedTopics || []);

    return subjects.map(sub => {
      const subjectLessons = allPathLessons.filter(l => l.subjectId === sub.id);
      const total = subjectLessons.length || 6;
      const completedCount = subjectLessons.filter(l => completedSet.has(l.id)).length;
      const pct = Math.round((completedCount / total) * 100);
      
      return {
        ...sub,
        completed: completedCount,
        total: total,
        pct: pct
      };
    });
  };

  const getRecentActivities = () => {
    const completedSet = new Set(completedTopics || []);
    const activities = [];

    allPathLessons.forEach(les => {
      if (completedSet.has(les.id)) {
        activities.push({
          title: les.title,
          heading: les.type === "video" ? "Masterclass Video" : "Completed Lesson",
          type: les.type === "video" ? "Video Completed" : "Lesson Completed",
          icon: les.type === "video" ? <FaGraduationCap /> : <FaCheckCircle />,
          colorClass: les.type === "video" ? "purple" : "green",
          xp: les.type === "video" ? "+25 XP" : "+20 XP",
          time: "Recently"
        });
      }
    });

    const activeActivities = activities.slice(0, 5);

    if (activeActivities.length < 5) {
      const fallbacks = [
        { title: "Node.js - Event Loop", heading: "Asynchronous I/O", type: "Completed Lesson", icon: <FaCheckCircle />, colorClass: "green", xp: "+20 XP", time: "Today, 10:30 AM" },
        { title: "Arrays - Easy", heading: "CodeArena Problem", type: "Solved 2 Problems", icon: <FaCode />, colorClass: "purple", xp: "+40 XP", time: "Today, 09:15 AM" },
        { title: "Build REST API", heading: "Course Assignment", type: "Submitted Assignment", icon: <FaFileAlt />, colorClass: "orange", xp: "+100 XP", time: "Yesterday, 08:45 PM" },
        { title: "JavaScript Basics", heading: "Quick Quiz", type: "Quiz Completed", icon: <FaAward />, colorClass: "red", xp: "+25 XP", time: "Yesterday, 07:30 PM" },
        { title: "Express.js - Routing", heading: "Completed Lesson", type: "Completed Lesson", icon: <FaBook />, colorClass: "blue", xp: "+20 XP", time: "Yesterday, 06:10 PM" }
      ];
      return [...activeActivities, ...fallbacks.slice(0, 5 - activeActivities.length)];
    }
    return activeActivities;
  };

  const getXpDistribution = () => {
    return {
      courses: Math.round(currentXp * 0.45),
      projects: Math.round(currentXp * 0.25),
      quizzes: Math.round(currentXp * 0.15),
      assignments: Math.round(currentXp * 0.10),
      others: Math.round(currentXp * 0.05)
    };
  };

  const goalTarget = 3000;
  const goalPct = Math.min(100, Math.round((currentXp / goalTarget) * 100));
  const dashArray = 125.6;
  const dashOffset = dashArray - (goalPct / 100) * dashArray;

  const lvlInfo = getLevelInfo(currentXp);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "student-profile", label: "Student Profile", icon: <FaAward /> },
    { id: "services-catalog", label: "Services & Catalog", icon: <FaBook /> },
    { id: "assessments", label: "Assessments", icon: <FaBolt /> },
    { id: "certification-tracking", label: "Cert Tracking", icon: <FaCertificate /> },
    { id: "tracking-dashboard", label: "Tracking Dashboard", icon: <FaChartLine /> },
    { id: "complaint-tracking", label: "Complaint & Renewal", icon: <FaFileInvoice /> },
    { id: "career-roadmap", label: "Career Roadmap", icon: <FaCodeBranch /> },
    { id: "job-search", label: "Job Search", icon: <FaRocket /> },
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

  const handleShareProgress = () => {
    navigator.clipboard.writeText(`Check out my SkillSphere Progress! Total XP: 6,450 XP, 48 Lessons Completed, 12 Day Streak! 🔥 https://skillsphere.edu/user/${userName}`);
    setToastMessage("🔗 Progress summary link copied to clipboard!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className={`ppWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      {/* Main Grid Container */}
      <div className="ppMainContainer">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="ppLeftSidebar">
          <div>
            <Link to="/" className="sdBrandLogo">
              <span className="logoHex">⬢</span>
              <span>SkillSphere</span>
            </Link>

            <div className="sdSidebarHomeArchHeader">
              <div className="sdArchLine" />
              <button
                className="sdHomeCircularBtn active"
                onClick={() => navigate("/student-home")}
                title="Dashboard Overview"
              >
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
                      else if (item.id === "courses") navigate("/courses");
                      else if (item.id === "learning-paths") navigate("/learning-paths");
                      else if (item.id === "assignments") navigate("/assignments");
                      else if (item.id === "discussions") navigate("/discussions");
                      else if (item.id === "ai-buddy") navigate("/ai-buddy");
                      else if (item.id === "career-roadmap") navigate("/career-roadmap");
                      else if (item.id === "opportunity-feed") navigate("/opportunity-feed");
                      else if (item.id === "daily-quests") navigate("/daily-quests");
                      else if (item.id === "badges") navigate("/badges");
                      else if (item.id === "certificates") navigate("/certificate");
                      else if (item.id === "progress") navigate("/progress");
                      else if (item.id === "resume") navigate("/resume");
                      else if (item.id === "code-arena") navigate("/code-arena");
                      else if (item.id === "settings") navigate("/settings");
                      else navigate("/student-home");
                    }}
                  >
                    <span className="navIcon">{item.icon}</span>
                    <span className="navLabel">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Sidebar Container: Rocket Graphic + Theme Controls */}
          <div className="sdSidebarBottomSection">
            <div className="sdRocketIllustrationBox">
              <span className="sdRocketEmoji">🚀</span>
              <div className="sdCloudDeco"></div>
            </div>

            <div className="sdSidebarFooterControls">
              <button className="sdThemeToggleBtn" onClick={toggleTheme} title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
              <span className="sdControlDivider">|</span>
              <button className="sdCollapseBtn" title="Collapse Menu">
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </aside>

        {/* ── RIGHT MAIN BODY AREA ── */}
        <div className="ppRightBodyArea">
          
          {/* Top Header Bar */}
          <header className="sdTopHeaderBar">
            <div className="sdSearchWrapper">
              <FaSearch className="sdSearchIcon" />
              <input
                type="text"
                className="sdSearchInput"
                placeholder="Search for courses, skills, discussions..."
              />
            </div>

            <div className="sdHeaderActionsRow">
              <div className="sdXpBadgePill">
                <FaBolt color="#F9572A" /> <span>{currentXp} XP</span>
              </div>

              <NotificationDropdown type="student" />

              {/* Header Bar Logout Button beside Notification Bell */}
              <button
                className="sdLogoutHeaderBtn"
                onClick={handleLogout}
                title="Logout to Landing Page"
              >
                <FaSignOutAlt /> <span>Logout</span>
              </button>

              {/* User Profile Pill with Dropdown */}
              <div className="sdUserProfilePillWrapper">
                <div className="sdUserProfilePill" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                  <UserAvatar user={user} />
                  <div className="sdUserInfoText">
                    <strong>{userName}</strong>
                    <span>Student</span>
                  </div>
                  <span className="dropdownArrow">▾</span>
                </div>

                {isUserMenuOpen && (
                  <div className="sdUserMenuDropdown">
                    <div className="dropdownHeader">
                      <strong>{userName}</strong>
                      <span>Student Account</span>
                    </div>
                    <div className="dropdownItem" onClick={() => { setIsUserMenuOpen(false); navigate("/settings"); }}>
                      👤 Profile Settings
                    </div>
                    <div className="dropdownItem" onClick={() => { setIsUserMenuOpen(false); navigate("/certificate"); }}>
                      📜 My Certificates
                    </div>
                    <div className="dropdownItem logout" onClick={handleLogout}>
                      🚪 Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Heading Row */}
          <div className="ppPageHeaderRow">
            <div className="ppPageHeader">
              <h1>Progress Tracking 📈</h1>
              <p>Track your learning journey and see how far you've come!</p>
            </div>

            <div className="ppHeaderButtonsRow">
              <div className="ppTimeDropdownBtn">
                <FaCalendarAlt /> <span>{timeFilter}</span> <FaChevronDown className="arrow" />
              </div>
              <button className="btnShareProgress" onClick={handleShareProgress}>
                <FaShareAlt /> Share Progress
              </button>
            </div>
          </div>

          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className="ppToastAlert">
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Sub-Tabs Bar */}
          <div className="ppSubTabsRow">
            <button
              className={`ppTab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`ppTab ${activeTab === "courses" ? "active" : ""}`}
              onClick={() => setActiveTab("courses")}
            >
              Courses
            </button>
            <button
              className={`ppTab ${activeTab === "skills" ? "active" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>
            <button
              className={`ppTab ${activeTab === "achievements" ? "active" : ""}`}
              onClick={() => setActiveTab("achievements")}
            >
              Achievements
            </button>
            <button
              className={`ppTab ${activeTab === "goals" ? "active" : ""}`}
              onClick={() => setActiveTab("goals")}
            >
              Goals
            </button>
          </div>

          {/* 5 STAT CARDS ROW */}
          <div className="ppStatCardsRow">
            
            {/* Card 1: Total XP Earned */}
            <div className="ppStatCard">
              <div className="statIcon orange"><FaTrophy /></div>
              <div>
                <span className="lbl">Total XP Earned</span>
                <strong>{currentXp} XP</strong>
                <span className="pctUp green"><FaArrowUp /> 18% vs last month</span>
              </div>
            </div>

            {/* Card 2: Courses Enrolled */}
            <div className="ppStatCard">
              <div className="statIcon brown"><FaBook /></div>
              <div>
                <span className="lbl">Courses Enrolled</span>
                <strong>{enrolledCourses?.length || 0}</strong>
                <span className="blueSub">Active Catalog</span>
              </div>
            </div>

            {/* Card 3: Lessons Completed */}
            <div className="ppStatCard">
              <div className="statIcon black"><FaGraduationCap /></div>
              <div>
                <span className="lbl">Lessons Completed</span>
                <strong>{completedTopics?.length || 0}</strong>
                <span className="pctUp green"><FaArrowUp /> Live Database</span>
              </div>
            </div>

            {/* Card 4: Study Streak */}
            <div className="ppStatCard">
              <div className="statIcon red"><FaFire /></div>
              <div>
                <span className="lbl">Study Streak</span>
                <strong>{user?.streak || 0} Days</strong>
                <span className="streakBest">Best: {user?.longest_streak || 1} Days 🔥</span>
              </div>
            </div>

            {/* Card 5: Time Learned */}
            <div className="ppStatCard" style={{ display: "none" }}>
              <div className="statIcon gold"><FaClock /></div>
              <div>
                <span className="lbl">Time Learned</span>
                <strong>{user?.total_study_time || 0} Mins</strong>
                <span className="pctUp green"><FaArrowUp /> Active Study</span>
              </div>
            </div>

          </div>

          {/* 2-COLUMN MAIN WORKSPACE */}
          <div className="ppGridContainer">
            
            {/* Center Main Column */}
            <div className="ppCenterColumn">
              
              {/* TOP CHARTS ROW: Learning Overview & XP Distribution */}
              <div className="ppChartsRow">
                
                {/* Learning Overview Area Wave Chart */}
                <div className="ppChartCard">
                  <div className="chartTitleRow">
                    <h4>📊 Learning Overview</h4>
                    <div className="chartFilterBtn">XP Earned ▾</div>
                  </div>

                  <div className="waveChartContainer">
                    <svg className="waveSvg" viewBox="0 0 400 160">
                      {/* Y Grid Lines */}
                      <line x1="30" y1="20" x2="380" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="30" y1="50" x2="380" y2="50" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="30" y1="80" x2="380" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="30" y1="110" x2="380" y2="110" stroke="#F1F5F9" strokeWidth="1" />
                      <line x1="30" y1="140" x2="380" y2="140" stroke="#F1F5F9" strokeWidth="1" />

                      {/* Y Labels */}
                      <text x="5" y="24" fill="#94A3B8" fontSize="9">2K</text>
                      <text x="5" y="54" fill="#94A3B8" fontSize="9">1.5K</text>
                      <text x="5" y="84" fill="#94A3B8" fontSize="9">1K</text>
                      <text x="5" y="114" fill="#94A3B8" fontSize="9">500</text>
                      <text x="15" y="144" fill="#94A3B8" fontSize="9">0</text>

                      {/* Area Fill Gradient */}
                      <defs>
                        <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F9572A" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#F9572A" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <path
                        d="M30 120 Q 60 80, 90 100 T 150 90 T 210 50 T 270 70 T 330 90 T 380 60 L 380 140 L 30 140 Z"
                        fill="url(#waveGradient)"
                      />

                      {/* Wave Line */}
                      <path
                        d="M30 120 Q 60 80, 90 100 T 150 90 T 210 50 T 270 70 T 330 90 T 380 60"
                        fill="none"
                        stroke="#F9572A"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Tooltip Point on May 20 */}
                      <circle cx="210" cy="50" r="5" fill="#F9572A" stroke="#FFFFFF" strokeWidth="2" />
                    </svg>

                    {/* Floating Tooltip */}
                    <div className="waveTooltip">
                      <span>May 20</span>
                      <strong>1,250 XP</strong>
                    </div>

                    {/* X Labels */}
                    <div className="xLabelsRow">
                      <span>May 1</span>
                      <span>May 5</span>
                      <span>May 10</span>
                      <span>May 15</span>
                      <span>May 20</span>
                      <span>May 25</span>
                      <span>May 30</span>
                    </div>
                  </div>
                </div>

                {/* XP Distribution Donut Chart */}
                <div className="ppChartCard">
                  <div className="chartTitleRow">
                    <h4>🎯 XP Distribution</h4>
                  </div>

                  <div className="donutChartContainer">
                    <svg className="donutSvg" viewBox="0 0 100 100">
                      {/* Segment 1: Courses 45% */}
                      <circle cx="50" cy="50" r="38" stroke="#F9572A" strokeWidth="12" fill="none" strokeDasharray="107 131" strokeDashoffset="0" />
                      {/* Segment 2: Projects 25% */}
                      <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray="60 178" strokeDashoffset="-107" />
                      {/* Segment 3: Quizzes 15% */}
                      <circle cx="50" cy="50" r="38" stroke="#8B5CF6" strokeWidth="12" fill="none" strokeDasharray="36 202" strokeDashoffset="-167" />
                      {/* Segment 4: Assignments 10% */}
                      <circle cx="50" cy="50" r="38" stroke="#0284C7" strokeWidth="12" fill="none" strokeDasharray="24 214" strokeDashoffset="-203" />
                      {/* Segment 5: Others 5% */}
                      <circle cx="50" cy="50" r="38" stroke="#D97706" strokeWidth="12" fill="none" strokeDasharray="12 226" strokeDashoffset="-227" />
                    </svg>

                    <div className="donutCenterText">
                      <strong>{currentXp}</strong>
                      <span>Total XP</span>
                    </div>
                  </div>

                  {/* Legend List */}
                  <div className="donutLegendList">
                    <div className="legItem">
                      <span className="dot orange"></span>
                      <span className="name">Courses</span>
                      <strong>{getXpDistribution().courses} XP (45%)</strong>
                    </div>

                    <div className="legItem">
                      <span className="dot green"></span>
                      <span className="name">Projects</span>
                      <strong>{getXpDistribution().projects} XP (25%)</strong>
                    </div>

                    <div className="legItem">
                      <span className="dot purple"></span>
                      <span className="name">Quizzes</span>
                      <strong>{getXpDistribution().quizzes} XP (15%)</strong>
                    </div>

                    <div className="legItem">
                      <span className="dot blue"></span>
                      <span className="name">Assignments</span>
                      <strong>{getXpDistribution().assignments} XP (10%)</strong>
                    </div>

                    <div className="legItem">
                      <span className="dot brown"></span>
                      <span className="name">Others</span>
                      <strong>{getXpDistribution().others} XP (5%)</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* MIDDLE ROW: Learning Heatmap & Subject Progress */}
              <div className="ppMiddleGridRow">
                
                {/* Learning Heatmap */}
                <div className="ppCardBlock">
                  <div className="chartTitleRow">
                    <h4>📅 Learning Heatmap <FaInfoCircle color="#94A3B8" /></h4>
                  </div>

                  <div className="heatmapContainer">
                    <div className="monthsHeader">
                      {getMonthHeaders().map((m, i) => (
                        <span key={i}>{m}</span>
                      ))}
                    </div>

                    <div className="heatmapGrid">
                      <div className="dayLabels">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>

                      <div className="heatmapCellsMatrix">
                        {getHeatmapCells().map(cell => (
                          <div key={cell.idx} className={`hmCell level-${cell.level}`} title={cell.title} />
                        ))}
                      </div>
                    </div>

                    <div className="heatmapScaleRow">
                      <span>Less</span>
                      <div className="scaleCells">
                        <div className="hmCell level-0"></div>
                        <div className="hmCell level-1"></div>
                        <div className="hmCell level-2"></div>
                        <div className="hmCell level-3"></div>
                        <div className="hmCell level-4"></div>
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                </div>

                {/* Subject Progress Stack */}
                <div className="ppCardBlock">
                  <div className="chartTitleRow">
                    <h4>📚 Subject Progress</h4>
                    <span className="viewAllLink" style={{ cursor: "pointer" }} onClick={() => setActiveTab("courses")}>View All</span>
                  </div>

                  <div className="subjectProgressStack">
                    {getSubjectProgressData().slice(0, 5).map(sub => (
                      <div key={sub.id} className="subjProgItem">
                        <div className={`subjIcon ${sub.colorClass}`}>{sub.icon}</div>
                        <div className="subjInfo">
                          <h5>{sub.name}</h5>
                          <div className="subjTrack"><div className="subjFill" style={{ width: `${sub.pct}%` }}></div></div>
                        </div>
                        <span className="subjPct">{sub.pct}%</span>
                        <span className="subjMods">{sub.completed} / {sub.total} Lessons</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* BOTTOM ROW: Recent Activity Horizontal Timeline */}
              <div className="ppCardBlock ppRecentActivity" style={{ display: "none" }}>
                <div className="chartTitleRow">
                  <h4>⏱️ Recent Activity</h4>
                  <span className="viewAllLink" style={{ cursor: "pointer" }} onClick={() => navigate("/student-home")}>View All Activity</span>
                </div>

                <div className="horizontalTimelineContainer">
                  <div className="timelineTrackLine"></div>

                  {getRecentActivities().map((act, index) => (
                    <div key={index} className="timelineNodeStep">
                      <div className={`nodeCircle ${act.colorClass}`}>{act.icon}</div>
                      <div className="nodeInfo">
                        <h5>{act.type}</h5>
                        <span>{act.title}</span>
                        <span className="timeSub">{act.time}</span>
                        <span className={`xpBadge ${act.colorClass}`}>{act.xp}</span>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN SIDEBAR WIDGETS ── */}
            <div className="ppRightSidebar">
              
              {/* Monthly Goal Arch Gauge Widget */}
              <div className="ppWidgetCard" style={{ display: "none" }}>
                <div className="widgetTitleRow">
                  <h4>🎯 Monthly Goal</h4>
                  <span className="editGoalLink">Edit Goal</span>
                </div>

                <div className="archGaugeContainer">
                  <svg className="archSvg" viewBox="0 0 100 60">
                    <path className="archBg" d="M10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F1F5F9" strokeWidth="10" strokeLinecap="round" />
                    <path className="archFill" d="M10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F9572A" strokeWidth="10" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset={dashOffset} />
                  </svg>

                  <div className="archCenterText">
                    <strong>{goalPct}%</strong>
                    <span>{currentXp} / {goalTarget} XP</span>
                  </div>
                </div>

                <p className="archSubtext">Keep going! You're doing amazing! 🚀</p>
              </div>

              {/* Insights Card Box */}
              <div className="ppWidgetCard">
                <div className="widgetTitleRow">
                  <h4>💡 Insights</h4>
                </div>

                <div className="insightsList">
                  <div className="insightItem">
                    <div className="inIcon orange"><FaClock /></div>
                    <div>
                      <h5>You learn best between 2 PM – 5 PM</h5>
                      <span>Keep that momentum!</span>
                    </div>
                  </div>

                  <div className="insightItem">
                    <div className="inIcon green"><FaCalendarAlt /></div>
                    <div>
                      <h5>Wednesday is your most productive day</h5>
                      <span>Great consistency!</span>
                    </div>
                  </div>

                  <div className="insightItem">
                    <div className="inIcon gold"><FaArrowUp /></div>
                    <div>
                      <h5>You've improved 28% compared to last month!</h5>
                      <span>Keep it up! 🔥</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Milestone Trophy Widget */}
              <div className="ppWidgetCard" style={{ display: "none" }}>
                <div className="widgetTitleRow">
                  <h4>🚀 Next Milestone</h4>
                </div>

                <div className="milestoneCard">
                  <div className="mBadgeHex">🏆</div>
                  <h5>Level {lvlInfo.level + 1} – {getLevelInfo((lvlInfo.level + 1) * 2000).badge}</h5>
                  <p>Earn {lvlInfo.remainingXp} more XP to reach Level {lvlInfo.level + 1}</p>

                  <div className="mTrack"><div className="mFill" style={{ width: `${lvlInfo.pct}%` }}></div></div>
                  <span className="mXpText">{lvlInfo.currentLevelXp} / 2000 XP</span>

                  <button className="btnViewMilestones" onClick={() => navigate("/student-home")}>
                    View All Milestones →
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      <FloatingChatbot />
      <StudentFooter />
    </div>
  );
}
