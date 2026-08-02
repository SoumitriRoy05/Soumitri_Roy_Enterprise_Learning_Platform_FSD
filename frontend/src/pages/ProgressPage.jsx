import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import PaperPlaneCursor from "../components/PaperPlaneCursor";
import StudentFooter from "../components/StudentFooter";
import FloatingChatbot from "../components/FloatingChatbot";

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

export default function ProgressPage() {
  const { user, xp, logout, themeMode, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFilter, setTimeFilter] = useState("This Month");
  const [toastMessage, setToastMessage] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  const userName = user?.full_name || user?.username || "Learner";
  const currentXp = xp ?? 0;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "courses", label: "Courses", icon: <FaBook /> },
    { id: "learning-paths", label: "Learning Paths", icon: <FaCodeBranch /> },
    { id: "assignments", label: "Assignments", icon: <FaFileAlt /> },
    { id: "discussions", label: "Discussions", icon: <FaComments /> },
    { id: "ai-buddy", label: "AI Study Buddy", icon: <FaRobot />, isNew: true },
    { id: "opportunity-feed", label: "Opportunity Feed", icon: <FaRocket />, isNew: true },
    { id: "daily-quests", label: "Daily Quests", icon: <FaBolt /> },
    { id: "badges", label: "Badges", icon: <FaAward /> },
    { id: "certificates", label: "Certificates", icon: <FaCertificate /> },
    { id: "progress", label: "Progress", icon: <FaChartLine /> },
    { id: "resume", label: "Resume Builder", icon: <FaFileInvoice /> },
    { id: "code-arena", label: "CodeArena", icon: <FaCode />, isNew: true },
    { id: "settings", label: "Settings", icon: <FaCog /> }
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
                    {item.isNew && <span className="navNewBadge">New</span>}
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

              <div className="sdNotificationBtnWrapper">
                <button className="sdNotificationBtn">
                  <FaBell />
                  {3 > 0 && <span className="sdNotifBadge">3</span>}
                </button>
              </div>

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
                  <div className="sdUserAvatarImg">🧑‍🎓</div>
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
                <strong>6,450 XP</strong>
                <span className="pctUp green"><FaArrowUp /> 18% vs last month</span>
              </div>
            </div>

            {/* Card 2: Courses Enrolled */}
            <div className="ppStatCard">
              <div className="statIcon brown"><FaBook /></div>
              <div>
                <span className="lbl">Courses Enrolled</span>
                <strong>7</strong>
                <span className="blueSub">3 In Progress</span>
              </div>
            </div>

            {/* Card 3: Lessons Completed */}
            <div className="ppStatCard">
              <div className="statIcon black"><FaGraduationCap /></div>
              <div>
                <span className="lbl">Lessons Completed</span>
                <strong>48</strong>
                <span className="pctUp green"><FaArrowUp /> 12 vs last month</span>
              </div>
            </div>

            {/* Card 4: Study Streak */}
            <div className="ppStatCard">
              <div className="statIcon red"><FaFire /></div>
              <div>
                <span className="lbl">Study Streak</span>
                <strong>12 Days</strong>
                <span className="streakBest">Best: 18 Days 🔥</span>
              </div>
            </div>

            {/* Card 5: Time Learned */}
            <div className="ppStatCard" style={{ display: "none" }}>
              <div className="statIcon gold"><FaClock /></div>
              <div>
                <span className="lbl">Time Learned</span>
                <strong>36h 45m</strong>
                <span className="pctUp green"><FaArrowUp /> 20% vs last month</span>
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
                      <strong>6,450</strong>
                      <span>Total XP</span>
                    </div>
                  </div>

                  {/* Legend List */}
                  <div className="donutLegendList">
                    <div className="legItem">
                      <span className="dot orange"></span>
                      <span className="name">Courses</span>
                      <strong>45%</strong>
                    </div>

                    <div className="legItem">
                      <span className="dot green"></span>
                      <span className="name">Projects</span>
                      <strong>25%</strong>
                    </div>

                    <div className="legItem">
                      <span className="dot purple"></span>
                      <span className="name">Quizzes</span>
                      <strong>15%</strong>
                    </div>

                    <div className="legItem">
                      <span className="dot blue"></span>
                      <span className="name">Assignments</span>
                      <strong>10%</strong>
                    </div>

                    <div className="legItem">
                      <span className="dot brown"></span>
                      <span className="name">Others</span>
                      <strong>5%</strong>
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
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
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
                        {/* Generate 15x7 GitHub-style Heatmap cells */}
                        {Array.from({ length: 105 }).map((_, idx) => {
                          const level = (idx % 7 === 2 || idx % 5 === 0 || idx % 11 === 1) ? (idx % 4) + 1 : 0;
                          return (
                            <div key={idx} className={`hmCell level-${level}`} title={`Activity: Level ${level}`} />
                          );
                        })}
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
                    <span className="viewAllLink">View All</span>
                  </div>

                  <div className="subjectProgressStack">
                    
                    {/* Item 1 */}
                    <div className="subjProgItem">
                      <div className="subjIcon green"><FaCode /></div>
                      <div className="subjInfo">
                        <h5>Fullstack Web Development</h5>
                        <div className="subjTrack"><div className="subjFill" style={{ width: "62%" }}></div></div>
                      </div>
                      <span className="subjPct">62%</span>
                      <span className="subjMods">5 / 8 Modules</span>
                    </div>

                    {/* Item 2 */}
                    <div className="subjProgItem">
                      <div className="subjIcon blue"><FaCode /></div>
                      <div className="subjInfo">
                        <h5>Data Structures & Algorithms</h5>
                        <div className="subjTrack"><div className="subjFill" style={{ width: "48%" }}></div></div>
                      </div>
                      <span className="subjPct">48%</span>
                      <span className="subjMods">5 / 10 Modules</span>
                    </div>

                    {/* Item 3 */}
                    <div className="subjProgItem">
                      <div className="subjIcon purple"><FaDatabase /></div>
                      <div className="subjInfo">
                        <h5>Database Management</h5>
                        <div className="subjTrack"><div className="subjFill" style={{ width: "35%" }}></div></div>
                      </div>
                      <span className="subjPct">35%</span>
                      <span className="subjMods">3 / 8 Modules</span>
                    </div>

                    {/* Item 4 */}
                    <div className="subjProgItem">
                      <div className="subjIcon pink"><FaPenNib /></div>
                      <div className="subjInfo">
                        <h5>UI/UX Design</h5>
                        <div className="subjTrack"><div className="subjFill" style={{ width: "20%" }}></div></div>
                      </div>
                      <span className="subjPct">20%</span>
                      <span className="subjMods">2 / 10 Modules</span>
                    </div>

                    {/* Item 5 */}
                    <div className="subjProgItem">
                      <div className="subjIcon teal"><FaInfinity /></div>
                      <div className="subjInfo">
                        <h5>DevOps Fundamentals</h5>
                        <div className="subjTrack"><div className="subjFill" style={{ width: "10%" }}></div></div>
                      </div>
                      <span className="subjPct">10%</span>
                      <span className="subjMods">1 / 10 Modules</span>
                    </div>

                  </div>
                </div>

              </div>

              {/* BOTTOM ROW: Recent Activity Horizontal Timeline */}
              <div className="ppCardBlock ppRecentActivity" style={{ display: "none" }}>
                <div className="chartTitleRow">
                  <h4>⏱️ Recent Activity</h4>
                  <span className="viewAllLink">View All Activity</span>
                </div>

                <div className="horizontalTimelineContainer">
                  <div className="timelineTrackLine"></div>

                  <div className="timelineNodeStep">
                    <div className="nodeCircle green"><FaCheckCircle /></div>
                    <div className="nodeInfo">
                      <h5>Completed Lesson</h5>
                      <span>Node.js - Event Loop</span>
                      <span className="timeSub">Today, 10:30 AM</span>
                      <span className="xpBadge green">+20 XP</span>
                    </div>
                  </div>

                  <div className="timelineNodeStep">
                    <div className="nodeCircle purple"><FaCode /></div>
                    <div className="nodeInfo">
                      <h5>Solved 2 Problems</h5>
                      <span>Arrays - Easy</span>
                      <span className="timeSub">Today, 09:15 AM</span>
                      <span className="xpBadge green">+40 XP</span>
                    </div>
                  </div>

                  <div className="timelineNodeStep">
                    <div className="nodeCircle orange"><FaFileAlt /></div>
                    <div className="nodeInfo">
                      <h5>Submitted Assignment</h5>
                      <span>Build REST API</span>
                      <span className="timeSub">Yesterday, 08:45 PM</span>
                      <span className="xpBadge green">+100 XP</span>
                    </div>
                  </div>

                  <div className="timelineNodeStep">
                    <div className="nodeCircle red"><FaAward /></div>
                    <div className="nodeInfo">
                      <h5>Quiz Completed</h5>
                      <span>JavaScript Basics</span>
                      <span className="timeSub">Yesterday, 07:30 PM</span>
                      <span className="xpBadge green">+25 XP</span>
                    </div>
                  </div>

                  <div className="timelineNodeStep">
                    <div className="nodeCircle blue"><FaBook /></div>
                    <div className="nodeInfo">
                      <h5>Completed Lesson</h5>
                      <span>Express.js - Routing</span>
                      <span className="timeSub">Yesterday, 06:10 PM</span>
                      <span className="xpBadge green">+20 XP</span>
                    </div>
                  </div>

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
                    <path className="archFill" d="M10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F9572A" strokeWidth="10" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset="35" />
                  </svg>

                  <div className="archCenterText">
                    <strong>72%</strong>
                    <span>2,160 / 3,000 XP</span>
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
                  <h5>Level 13 – Code Master</h5>
                  <p>Earn 700 more XP to reach Level 13</p>

                  <div className="mTrack"><div className="mFill" style={{ width: "72%" }}></div></div>
                  <span className="mXpText">1800 / 2500 XP</span>

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
