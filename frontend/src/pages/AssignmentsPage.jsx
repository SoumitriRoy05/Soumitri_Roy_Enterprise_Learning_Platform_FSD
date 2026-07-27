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
  FaCode,
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
  FaMapMarkedAlt,
  FaCheckCircle,
  FaChevronRight,
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaCalendarAlt,
  FaArrowRight,
  FaSignal,
  FaUser,
  FaRegClock,
  FaShieldAlt,
  FaQuestionCircle
} from "react-icons/fa";

import "../styles/assignments.css";

export default function AssignmentsPage() {
  const { user, xp, themeMode, toggleTheme, enrolledCourses, completedTopics } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("assignments");
  const [filterTab, setFilterTab] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [sortBy, setSortBy] = useState("duedate");
  const isDarkMode = themeMode === "dark";

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

  const rawAssignments = [
    {
      id: 1,
      title: "Build a React Todo App",
      badgeType: "Project",
      course: "React Developer Path • Module 2",
      courseKey: "react",
      courseId: "2",
      description: "Create a fully functional Todo application with CRUD operations, state management, and local storage.",
      difficulty: "Medium",
      xpReward: "100 XP",
      mode: "Individual",
      dueDateText: "Due in 2 days",
      dueDateFull: "24 May 2025, 11:59 PM",
      defaultStatus: "pending",
      logoText: "⚛️",
      logoBg: "#082F49"
    },
    {
      id: 2,
      title: "Data Analysis with Pandas",
      badgeType: "Project",
      course: "Python for Data Science • Module 3",
      courseKey: "python",
      courseId: "3",
      description: "Analyze the given dataset and answer all the questions using pandas and visualizations.",
      difficulty: "Hard",
      xpReward: "150 XP",
      mode: "Individual",
      dueDateText: "Due in 5 days",
      dueDateFull: "27 May 2025, 11:59 PM",
      defaultStatus: "pending",
      logoText: "🐍",
      logoBg: "#172554"
    },
    {
      id: 3,
      title: "REST API with Node.js",
      badgeType: "Project",
      course: "Fullstack with Node.js • Module 4",
      courseKey: "node",
      courseId: "6",
      description: "Build a RESTful API with authentication, CRUD operations and MongoDB integration.",
      difficulty: "Medium",
      xpReward: "120 XP",
      mode: "Individual",
      defaultStatus: "pending",
      logoText: "🟩",
      logoBg: "#052E16"
    },
    {
      id: 4,
      title: "Redesign Dashboard UI",
      badgeType: "Design",
      course: "UI/UX Design Masterclass • Module 2",
      courseKey: "uiux",
      courseId: "4",
      description: "Redesign the given dashboard in Figma with modern UI principles.",
      difficulty: "Easy",
      xpReward: "80 XP",
      mode: "Individual",
      defaultStatus: "pending",
      logoText: "🎨",
      logoBg: "#FAF8F5"
    },
    {
      id: 5,
      title: "JavaScript Quiz Challenge",
      badgeType: "Quiz",
      course: "React Developer Path • Module 1",
      courseKey: "react",
      courseId: "1",
      description: "Test your understanding of JavaScript fundamentals with this quiz.",
      difficulty: "Easy",
      xpReward: "50 XP",
      mode: "Individual",
      defaultStatus: "pending",
      logoText: "JS",
      logoBg: "#FEF08A",
      logoColor: "#CA8A04"
    }
  ];

  const userEnrolled = enrolledCourses || [];

  const assignmentsList = rawAssignments.map(asgn => {
    const isEnrolled = userEnrolled.includes(asgn.courseId) || userEnrolled.includes(asgn.courseKey);
    return {
      ...asgn,
      status: isEnrolled ? asgn.defaultStatus : "locked"
    };
  });

  const filteredAssignments = assignmentsList.filter((item) => {
    if (filterTab === "pending" && item.status !== "pending") return false;
    if (filterTab === "submitted" && item.status !== "submitted") return false;
    if (filterTab === "graded" && item.status !== "completed") return false;
    if (filterTab === "locked" && item.status !== "locked") return false;
    
    if (courseFilter !== "all" && item.courseKey !== courseFilter) return false;

    return true;
  });

  return (
    <div className={`asWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      {/* Main Grid Container */}
      <div className="asMainContainer">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="asLeftSidebar">
          <div>
            <Link to="/" className="sdBrandLogo">
              <span className="logoHex">⬢</span>
              <span>SkillSphere</span>
            </Link>

            <div className="asSidebarHomeArchHeader">
              <div className="asArchLine" />
              <button
                className="asHomeCircularBtn active"
                onClick={() => navigate("/assignments")}
                title="Assignments"
              >
                <FaFileAlt />
              </button>
            </div>

            <ul className="sdNavList">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sdNavItem ${item.id === "assignments" ? "active" : ""}`}
                    onClick={() => {
                      if (item.id === "dashboard") navigate("/student-home");
                      else if (item.id === "courses") navigate("/courses");
                      else if (item.id === "learning-paths") navigate("/learning-paths");
                      else if (item.id === "ai-buddy") navigate("/ai-buddy");
                      else if (item.id === "opportunity-feed") navigate("/opportunity-feed");
                      else if (item.id === "badges") navigate("/badges");
                      else if (item.id === "progress") navigate("/progress");
                      else if (item.id === "discussions") navigate("/discussions");
                      else if (item.id === "certificates") navigate("/certificate");
                      else if (item.id === "progress") navigate("/progress");
                      else if (item.id === "daily-quests") navigate("/daily-quests");
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

          <div className="sdSidebarBottomSection">
            <div className="sdRocketIllustrationBox">
              <span className="sdRocketEmoji">🚀</span>
            </div>

            <div className="sdSidebarFooterControls">
              <button className="sdThemeToggleBtn" onClick={toggleTheme} title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
              <span className="sdControlDivider">|</span>
              <button className="sdCollapseBtn">
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </aside>

        {/* ── RIGHT MAIN BODY AREA ── */}
        <div className="asRightBodyArea">
          
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
                  <span className="sdNotifBadge">3</span>
                </button>
              </div>

              <div className="sdUserProfilePill" onClick={() => navigate("/settings")}>
                <div className="sdUserAvatarImg">🧑‍🎓</div>
                <div className="sdUserInfoText">
                  <strong>{userName}</strong>
                  <span>Student</span>
                </div>
                <span className="dropdownArrow">▾</span>
              </div>
            </div>
          </header>

          {/* Page Heading */}
          <div className="asPageHeader">
            <h1>Assignments 📋</h1>
            <p>Practice, build, and master your skills with assignments.</p>
          </div>

          {/* 2-Column Grid */}
          <div className="asGridContainer">
            
            {/* Center Main Column */}
            <div className="asCenterColumn">
              
              {/* Top Filter Pills & Sort Bar */}
              <div className="asFilterSortRow">
                <div className="asFilterPills">
                  <button
                    className={`asPill ${filterTab === "all" ? "active" : ""}`}
                    onClick={() => setFilterTab("all")}
                  >
                    All Assignments ({assignmentsList.length})
                  </button>
                  <button
                    className={`asPill ${filterTab === "pending" ? "active" : ""}`}
                    onClick={() => setFilterTab("pending")}
                  >
                    Pending ({assignmentsList.filter(a => a.status === "pending").length})
                  </button>
                  <button
                    className={`asPill ${filterTab === "submitted" ? "active" : ""}`}
                    onClick={() => setFilterTab("submitted")}
                  >
                    Submitted ({assignmentsList.filter(a => a.status === "submitted").length})
                  </button>
                  <button
                    className={`asPill ${filterTab === "graded" ? "active" : ""}`}
                    onClick={() => setFilterTab("graded")}
                  >
                    Graded ({assignmentsList.filter(a => a.status === "completed").length})
                  </button>
                  <button
                    className={`asPill ${filterTab === "locked" ? "active" : ""}`}
                    onClick={() => setFilterTab("locked")}
                  >
                    Locked ({assignmentsList.filter(a => a.status === "locked").length})
                  </button>
                </div>

                <div className="asSortSelectWrapper">
                  <select
                    className="asSortSelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="duedate">Sort by: Due Date (Nearest)</option>
                    <option value="xp">Sort by: XP Reward</option>
                  </select>
                </div>
              </div>

              {/* Filter by Course Bar */}
              <div className="asFilterByCourseBar">
                <span className="barLabel">Filter by Course</span>
                
                <div className="courseChipsRow">
                  <button
                    className={`chip ${courseFilter === "all" ? "active" : ""}`}
                    onClick={() => setCourseFilter("all")}
                  >
                    All Courses
                  </button>
                  <button
                    className={`chip ${courseFilter === "react" ? "active" : ""}`}
                    onClick={() => setCourseFilter("react")}
                  >
                    React Developer Path
                  </button>
                  <button
                    className={`chip ${courseFilter === "python" ? "active" : ""}`}
                    onClick={() => setCourseFilter("python")}
                  >
                    Python for Data Science
                  </button>
                  <button
                    className={`chip ${courseFilter === "node" ? "active" : ""}`}
                    onClick={() => setCourseFilter("node")}
                  >
                    Fullstack with Node.js
                  </button>
                  <button
                    className={`chip ${courseFilter === "uiux" ? "active" : ""}`}
                    onClick={() => setCourseFilter("uiux")}
                  >
                    UI/UX Design
                  </button>
                </div>

                {courseFilter !== "all" && (
                  <span className="clearFilterBtn" onClick={() => setCourseFilter("all")}>
                    Clear Filter
                  </span>
                )}
              </div>

              {/* 5 Assignment Cards Stack */}
              <div className="asCardsStack">
                {filteredAssignments.map((asgn) => (
                  <div key={asgn.id} className="asgnCard">
                    
                    {/* Left Icon Badge */}
                    <div
                      className="asgnLogoBadge"
                      style={{ background: asgn.logoBg, color: asgn.logoColor || "#FFF" }}
                    >
                      {asgn.logoText}
                    </div>

                    {/* Middle Info */}
                    <div className="asgnMiddleInfo">
                      <div className="asgnTitleRow">
                        <h4>{asgn.title}</h4>
                        <span className="asgnBadgeType">{asgn.badgeType}</span>
                      </div>
                      <span className="asgnCourseSubtext">{asgn.course}</span>
                      <p className="asgnDesc">{asgn.description}</p>

                      <div className="asgnMetaTags">
                        <span className={`diffTag ${asgn.difficulty.toLowerCase()}`}>
                          📶 {asgn.difficulty}
                        </span>
                        <span className="xpTag">⚡ {asgn.xpReward}</span>
                        <span className="modeTag">👤 {asgn.mode}</span>
                      </div>
                    </div>

                    {/* Right Status & Actions */}
                    <div className="asgnRightActions">
                      {asgn.status === "pending" && (
                        <>
                          <div className="dueTextRow">
                            <span className="dueTextOrange">📅 {asgn.dueDateText}</span>
                            <span className="dueFullDate">{asgn.dueDateFull}</span>
                          </div>
                          <div className="btnGroup">
                            <button className="btnContinueAsgn">Continue</button>
                            <button className="btnSubmitLink">Submit →</button>
                          </div>
                        </>
                      )}

                      {asgn.status === "submitted" && (
                        <>
                          <span className="submittedTag">✓ Submitted</span>
                          <span className="subDateText">{asgn.submittedDate}</span>
                          <button className="btnOutlineAction">View Submission</button>
                        </>
                      )}

                      {asgn.status === "in-review" && (
                        <>
                          <span className="inReviewTag">ℹ️ In Review</span>
                          <span className="subDateText">{asgn.submittedDate}</span>
                          <button className="btnOutlineAction">View Feedback</button>
                        </>
                      )}

                      {asgn.status === "locked" && (
                        <>
                          <div className="dueTextRow">
                            <span className="dueTextOrange" style={{ color: "var(--text-muted)" }}>🔒 Prerequisite Locked</span>
                            <span className="dueFullDate">Enroll in course to unlock assignment</span>
                          </div>
                          <div className="btnGroup">
                            <button className="btnContinueAsgn" style={{ opacity: 0.6, cursor: "not-allowed" }} disabled onClick={() => navigate("/courses")}>
                              🔒 Locked
                            </button>
                          </div>
                        </>
                      )}

                      {asgn.status === "completed" && (
                        <>
                          <span className="completedTag">✓ Completed</span>
                          <span className="subDateText">{asgn.completedDate}</span>
                          <button className="btnOutlineAction">View Quiz Result</button>
                        </>
                      )}
                    </div>

                  </div>
                ))}
              </div>

              {/* Bottom Promotional Banner */}
              <div className="asPromotionalBanner">
                <div className="promoLeft">
                  <div className="trophyCircle">🏆</div>
                  <div>
                    <h3>Complete Assignments. Earn XP. Level Up!</h3>
                    <p>Stay consistent and unlock amazing rewards.</p>
                  </div>
                </div>
                <button className="btnViewProgress" onClick={() => navigate("/student-home")}>
                  View My Progress →
                </button>
              </div>

            </div>

            {/* ── RIGHT COLUMN SIDEBAR WIDGETS ── */}
            <div className="asRightSidebar">
              
              {/* Submission Stats Donut Chart Widget */}
              <div className="asWidgetCard">
                <h4>Submission Stats</h4>

                <div className="donutChartContainer">
                  <svg className="donutSvg" viewBox="0 0 100 100">
                    <circle className="donutSegment green" cx="50" cy="50" r="38" strokeDasharray="30 200" strokeDashoffset="0" />
                    <circle className="donutSegment blue" cx="50" cy="50" r="38" strokeDasharray="60 200" strokeDashoffset="-35" />
                    <circle className="donutSegment orange" cx="50" cy="50" r="38" strokeDasharray="90 200" strokeDashoffset="-100" />
                    <circle className="donutSegment purple" cx="50" cy="50" r="38" strokeDasharray="30 200" strokeDashoffset="-195" />
                  </svg>
                  <div className="donutCenterText">
                    <strong>{assignmentsList.length}</strong>
                    <span>Total</span>
                  </div>
                </div>

                <div className="statsLegendGrid">
                  <div className="legendItem"><span className="dot green"></span> Completed ({assignmentsList.filter(a => a.status === "completed").length})</div>
                  <div className="legendItem"><span className="dot blue"></span> Submitted ({assignmentsList.filter(a => a.status === "submitted").length})</div>
                  <div className="legendItem"><span className="dot orange"></span> Pending ({assignmentsList.filter(a => a.status === "pending").length})</div>
                  <div className="legendItem"><span className="dot purple"></span> Locked ({assignmentsList.filter(a => a.status === "locked").length})</div>
                </div>

                <div className="statsFooterSub">
                  Keep going! You're doing great 🔥
                </div>
              </div>

              {/* Upcoming Deadlines Widget */}
              <div className="asWidgetCard">
                <div className="widgetTitleRow">
                  <h4>Upcoming Deadlines</h4>
                  <span className="sdViewAllLink">View Calendar</span>
                </div>

                <div className="deadlinesList">
                  <div className="dItem">
                    <div className="dIcon blue">⚛️</div>
                    <div className="dInfo">
                      <h5>Build a React Todo App</h5>
                      <span>React Developer Path</span>
                    </div>
                    <div className="dTime">
                      <span className="daysPill orange">2 days left</span>
                      <span className="dateSub">24 May 2025</span>
                    </div>
                  </div>

                  <div className="dItem">
                    <div className="dIcon darkBlue">🐍</div>
                    <div className="dInfo">
                      <h5>Data Analysis with Pandas</h5>
                      <span>Python for Data Science</span>
                    </div>
                    <div className="dTime">
                      <span className="daysPill orange">5 days left</span>
                      <span className="dateSub">27 May 2025</span>
                    </div>
                  </div>

                  <div className="dItem">
                    <div className="dIcon green">🟩</div>
                    <div className="dInfo">
                      <h5>REST API with Node.js</h5>
                      <span>Fullstack with Node.js</span>
                    </div>
                    <div className="dTime">
                      <span className="daysPill orange">8 days left</span>
                      <span className="dateSub">30 May 2025</span>
                    </div>
                  </div>

                  <div className="dItem">
                    <div className="dIcon pink">🎨</div>
                    <div className="dInfo">
                      <h5>Responsive Landing Page</h5>
                      <span>UI/UX Design Masterclass</span>
                    </div>
                    <div className="dTime">
                      <span className="daysPill orange">12 days left</span>
                      <span className="dateSub">3 Jun 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help? Widget */}
              <div className="asWidgetCard">
                <h4>Need Help?</h4>

                <div className="helpLinksList">
                  <div className="helpLinkItem" onClick={() => navigate("/student-home")}>
                    <div className="hIcon orange"><FaRobot /></div>
                    <div className="hText">
                      <strong>Ask AI Study Buddy</strong>
                      <span>Get instant help with assignments</span>
                    </div>
                    <FaArrowRight className="hArrow" />
                  </div>

                  <div className="helpLinkItem">
                    <div className="hIcon blue"><FaFileAlt /></div>
                    <div className="hText">
                      <strong>View Assignment Guidelines</strong>
                      <span>Check submission rules & FAQs</span>
                    </div>
                    <FaArrowRight className="hArrow" />
                  </div>

                  <div className="helpLinkItem" onClick={() => navigate("/discussions")}>
                    <div className="hIcon purple"><FaComments /></div>
                    <div className="hText">
                      <strong>Join Discussion</strong>
                      <span>Ask doubts & help peers</span>
                    </div>
                    <FaArrowRight className="hArrow" />
                  </div>
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
