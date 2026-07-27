import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import PaperPlaneCursor from "../components/PaperPlaneCursor";
import StudentFooter from "../components/StudentFooter";
import FloatingChatbot from "../components/FloatingChatbot";

import AIStudyBuddy from "../components/AIStudyBuddy";
import OpportunityFeed from "../components/OpportunityFeed";
import StreakHeatmap from "../components/StreakHeatmap";

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
  FaFire,
  FaRobot,
  FaRocket,
  FaMapMarkedAlt,
  FaQuestionCircle,
  FaLaptopCode,
  FaUpload,
  FaQuoteLeft,
  FaChevronRight,
  FaCheckCircle,
  FaFlag,
  FaBookOpen,
  FaCode,
  FaBullseye,
  FaGift,
  FaPaperPlane,
  FaBriefcase,
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaEllipsisH,
  FaCalendarAlt,
  FaSignOutAlt
} from "react-icons/fa";

import studentHeroImg from "../assets/student_dashboard_hero_illustration.png";
import darkStudentHeroImg from "../assets/dark_student_dashboard_hero_illustration.png";
import "../styles/studentDashboard.css";

export default function StudentHome() {
  const { user, xp, logout, themeMode, toggleTheme, enrolledCourses, completedTopics } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const isDarkMode = themeMode === "dark";
  const [widgetChatInput, setWidgetChatInput] = useState("");
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
  const userEnrolledCount = (enrolledCourses || []).length;
  const userCompletedTopicsCount = (completedTopics || []).length;
  const level = Math.floor(currentXp / 2000) + 1;
  const xpInCurrentLevel = currentXp % 2000;
  const xpToNext = 2000 - xpInCurrentLevel;
  const progressPct = Math.min(100, Math.round((xpInCurrentLevel / 2000) * 100));
  const earnedCertsCount = Math.floor(userCompletedTopicsCount / 6);
  const earnedBadgesCount = Array.isArray(user?.badges)
    ? user.badges.filter(Boolean).length
    : typeof user?.badges === "string"
    ? user.badges.split(",").filter(Boolean).length
    : 0;


  // Exact 1-to-1 Sidebar Items matching screenshot
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

  return (
    <div className={`sdDashboardWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      {/* Main Grid Layout Container */}
      <div className="sdMainContainer">
        
        {/* ── LEFT SIDEBAR COLUMN (MATCHING SCREENSHOT) ── */}
        <aside className="sdLeftSidebar">
          <div>
            <Link to="/" className="sdBrandLogo">
              <span className="logoHex">⬢</span>
              <span>SkillSphere</span>
            </Link>

            {/* Connected Arch Line & Orange Circular Home Button Header */}
            <div className="sdSidebarHomeArchHeader">
              <div className="sdArchLine" />
              <button
                className={`sdHomeCircularBtn ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
                title="Dashboard Overview"
              >
                <FaHome />
              </button>
            </div>

            {/* Sidebar Navigation Items */}
            <ul className="sdNavList">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sdNavItem ${activeTab === item.id ? "active" : ""}`}
                    onClick={() => {
                      if (item.id === "settings") navigate("/settings");
                      else if (item.id === "courses") navigate("/courses");
                      else if (item.id === "learning-paths") navigate("/learning-paths");
                      else if (item.id === "assignments") navigate("/assignments");
                      else if (item.id === "ai-buddy") navigate("/ai-buddy");
                      else if (item.id === "opportunity-feed") navigate("/opportunity-feed");
                      else if (item.id === "badges") navigate("/badges");
                      else if (item.id === "discussions") navigate("/discussions");
                      else if (item.id === "certificates") navigate("/certificate");
                      else if (item.id === "progress") navigate("/progress");
                      else if (item.id === "daily-quests") navigate("/daily-quests");
                      else if (item.id === "resume") navigate("/resume");
                      else if (item.id === "code-arena") navigate("/code-arena");
                      else setActiveTab(item.id);
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
        <div className="sdRightBodyArea">
          
          {/* Top Header Bar matching Screenshot */}
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

          {/* DYNAMIC TAB VIEW ROUTING */}
          {activeTab === "ai-buddy" ? (
            <AIStudyBuddy />
          ) : activeTab === "opportunity-feed" ? (
            <OpportunityFeed />
          ) : activeTab === "streak-heatmap" ? (
            <StreakHeatmap />
          ) : (
            /* ── DASHBOARD OVERVIEW (EXACT 1-TO-1 MATCH OF SCREENSHOT) ── */
            <>
              {/* Greeting Header */}
              <div className="sdGreetingHeader">
                <h1>Welcome back, {userName}! 👋</h1>
                <p>Keep learning, keep growing. You're doing great!</p>
              </div>

              {/* 2-Column Main Dashboard Grid */}
              <div className="sdDashboardContentGrid">
                
                {/* ── CENTER COLUMN ── */}
                <div className="sdCenterMainCol">
                  
                  {/* Your Progress Hero Card */}
                  <div className="sdProgressHeroCard">
                    <div className="sdProgressLeftInfo">
                      <span className="sdLevelTagPill">Level {level}</span>
                      <div className="sdProgressTitle">Your Progress</div>
                      <div className="sdXpNumbersHeading">
                        {xpInCurrentLevel} / 2000 XP
                      </div>

                      <div className="sdXpProgressBarTrack">
                        <div
                          className="sdXpProgressBarFill"
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                      <span className="sdXpToNextLevelText">{xpToNext} XP to Level {level + 1}</span>
                    </div>

                    <div className="sdHeroIllustrationBox">
                      <img
                        src={isDarkMode ? darkStudentHeroImg : studentHeroImg}
                        alt="Students Studying Illustration"
                        className="sdHeroIllustrationImg"
                      />
                    </div>
                  </div>

                  {/* 4 Stat Cards Row */}
                  <div className="sdStatCardsRow">
                    <div className="sdMiniStatCard">
                      <div className="sdStatIconBox orangeBox">
                        <FaBook />
                      </div>
                      <div className="sdStatValueText">
                        <span className="statLabel">Courses Enrolled</span>
                        <strong>{userEnrolledCount}</strong>
                        <span className="sdStatSublink orange">Active Courses</span>
                      </div>
                    </div>

                    <div className="sdMiniStatCard">
                      <div className="sdStatIconBox purpleBox">
                        <FaCertificate />
                      </div>
                      <div className="sdStatValueText">
                        <span className="statLabel">Certificates Earned</span>
                        <strong>{earnedCertsCount}</strong>
                        <span className="sdStatSublink orange" onClick={() => navigate("/certificate")}>View All</span>
                      </div>
                    </div>

                    <div className="sdMiniStatCard">
                      <div className="sdStatIconBox yellowBox">
                        <FaTrophy />
                      </div>
                      <div className="sdStatValueText">
                        <span className="statLabel">Badges Earned</span>
                        <strong>{earnedBadgesCount}</strong>
                        <span className="sdStatSublink orange" onClick={() => setActiveTab("badges")}>View All</span>
                      </div>
                    </div>

                    <div className="sdMiniStatCard">
                      <div className="sdStatIconBox orangeBox">
                        <FaBolt />
                      </div>
                      <div className="sdStatValueText">
                        <span className="statLabel">Total XP</span>
                        <strong>{currentXp}</strong>
                        <span className="sdStatSublink orange">Keep Learning!</span>
                      </div>
                    </div>
                  </div>


                  {/* Daily Quests Widget */}
                  <div className="sdWhitePanelCard" style={{ marginTop: "24px" }}>
                    <div className="sdPanelHeaderRow">
                      <h3>Daily Quests</h3>
                      <span className="sdTimerText">Resets in 12:34:56</span>
                    </div>

                    <div className="sdQuestsList">
                      <div className="sdQuestRow">
                        <div className="questRowLeft">
                          <div className="questIconBox orange"><FaFileAlt /></div>
                          <span>Complete 1 Lesson</span>
                        </div>
                        <div className="questRowRight">
                          <span className="questFraction">0 / 1</span>
                          <span className="questRewardPill">+20 XP 🎁</span>
                        </div>
                      </div>

                      <div className="sdQuestRow">
                        <div className="questRowLeft">
                          <div className="questIconBox cyan"><FaCode /></div>
                          <div className="questTitleWithProgress">
                            <span>Solve 3 Coding Problems</span>
                            <div className="miniTrack">
                              <div className="miniFill" style={{ width: "33%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="questRowRight">
                          <span className="questFraction">1 / 3</span>
                          <span className="questRewardPill">+30 XP 🎁</span>
                        </div>
                      </div>

                      <div className="sdQuestRow">
                        <div className="questRowLeft">
                          <div className="questIconBox yellow"><FaComments /></div>
                          <span>Participate in Discussion</span>
                        </div>
                        <div className="questRowRight">
                          <span className="questFraction">0 / 1</span>
                          <span className="questRewardPill">+10 XP 🎁</span>
                        </div>
                      </div>
                    </div>

                    <button className="btnSolidOrangeClaim">
                      🎁 Claim All Rewards
                    </button>
                  </div>

                  {/* Continue Learning Cards Grid */}
                  <div className="sdWhitePanelCard" style={{ marginTop: "24px" }}>
                    <div className="sdPanelHeaderRow">
                      <h3>Continue Learning</h3>
                      <span className="sdViewAllLink" onClick={() => navigate("/courses")}>View All</span>
                    </div>

                    <div className="sdContinueLearningGrid">
                      <div className="sdCourseCardBox">
                        <div className="sdCourseHeaderRow">
                          <div className="sdCourseIconBadge yellowBg">JS</div>
                          <FaEllipsisH className="moreDots" />
                        </div>
                        <h4>JavaScript Fundamentals</h4>
                        <div className="sdCourseProgressBar">
                          <div className="sdCourseProgressFill" style={{ width: "60%" }}></div>
                        </div>
                        <div className="sdCourseFooterRow">
                          <span className="sdCoursePctText">60% Complete</span>
                          <button className="btnContinueCourse" onClick={() => navigate("/learning")}>Continue</button>
                        </div>
                      </div>

                      <div className="sdCourseCardBox">
                        <div className="sdCourseHeaderRow">
                          <div className="sdCourseIconBadge blueBg">⚛️</div>
                          <FaEllipsisH className="moreDots" />
                        </div>
                        <h4>React.js Development</h4>
                        <div className="sdCourseProgressBar">
                          <div className="sdCourseProgressFill" style={{ width: "40%" }}></div>
                        </div>
                        <div className="sdCourseFooterRow">
                          <span className="sdCoursePctText">40% Complete</span>
                          <button className="btnContinueCourse" onClick={() => navigate("/learning")}>Continue</button>
                        </div>
                      </div>

                      <div className="sdCourseCardBox">
                        <div className="sdCourseHeaderRow">
                          <div className="sdCourseIconBadge pyYellowBg">🐍</div>
                          <FaEllipsisH className="moreDots" />
                        </div>
                        <h4>Python for Beginners</h4>
                        <div className="sdCourseProgressBar">
                          <div className="sdCourseProgressFill" style={{ width: "75%" }}></div>
                        </div>
                        <div className="sdCourseFooterRow">
                          <span className="sdCoursePctText">75% Complete</span>
                          <button className="btnContinueCourse" onClick={() => navigate("/learning")}>Continue</button>
                        </div>
                      </div>

                      <div className="sdCourseCardBox">
                        <div className="sdCourseHeaderRow">
                          <div className="sdCourseIconBadge pinkBg">🎨</div>
                          <FaEllipsisH className="moreDots" />
                        </div>
                        <h4>UI/UX Design Essentials</h4>
                        <div className="sdCourseProgressBar">
                          <div className="sdCourseProgressFill" style={{ width: "30%" }}></div>
                        </div>
                        <div className="sdCourseFooterRow">
                          <span className="sdCoursePctText">30% Complete</span>
                          <button className="btnContinueCourse" onClick={() => navigate("/learning")}>Continue</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Build Your Career Ready Profile Promotional Card */}
                  <div className="sdCareerProfileCard">
                    <div className="careerCardLeft">
                      <h3>Build Your Career Ready Profile</h3>
                      <p>Create a professional resume, showcase your skills and stand out to top recruiters.</p>
                      <button className="btnCreateResume" onClick={() => navigate("/settings")}>
                        Create Resume
                      </button>
                    </div>
                    <div className="careerCardRight">
                      <div className="clipboardGraphic">
                        📋 🪴
                      </div>
                    </div>
                  </div>

                  {/* Motivational Quote Footer Banner */}
                  <div className="sdQuoteBanner">
                    <FaQuoteLeft className="quoteIcon" />
                    <span>"The beautiful thing about learning is nobody can take it away from you."</span>
                    <strong className="quoteAuthor">— B.B. King</strong>
                  </div>

                </div>

                {/* ── RIGHT COLUMN SIDEBAR WIDGETS (EXACT SCREENSHOT) ── */}
                <div className="sdRightColumnSidebar">
                  
                  {/* Learning Streak Card */}
                  <div className="sdRightWidgetCard">
                    <div className="sdStreakHeaderRow">
                      <span className="widgetTitle">Learning Streak 🔥</span>
                    </div>
                    <div className="sdStreakBigVal">1 Day</div>
                    <div className="sdStreakSub">Keep it up!</div>

                    <div className="sdDaysRow">
                      <div className="dayCol active">
                        <span>S</span>
                        <div className="dayCircle flame"><FaFire /></div>
                      </div>
                      <div className="dayCol"><span>M</span><div className="dayCircle"></div></div>
                      <div className="dayCol"><span>T</span><div className="dayCircle"></div></div>
                      <div className="dayCol"><span>W</span><div className="dayCircle"></div></div>
                      <div className="dayCol"><span>T</span><div className="dayCircle"></div></div>
                      <div className="dayCol"><span>F</span><div className="dayCircle"></div></div>
                      <div className="dayCol"><span>S</span><div className="dayCircle"></div></div>
                    </div>
                  </div>

                  {/* Learning Streak Heatmap Widget */}
                  <div className="sdRightWidgetCard">
                    <div className="widgetTitleRow">
                      <h4>Learning Streak Heatmap</h4>
                    </div>

                    <div className="miniHeatmapWrapper">
                      <div className="heatmapHeaderDays">
                        <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                      </div>

                      <div className="heatmapRowItem">
                        <span className="rowLabel">This Week</span>
                        <div className="squaresRow">
                          <span className="sq l0"></span><span className="sq l0"></span><span className="sq l0"></span><span className="sq l0"></span><span className="sq l2"></span><span className="sq l3"></span><span className="sq l4"></span>
                        </div>
                      </div>

                      <div className="heatmapRowItem">
                        <span className="rowLabel">Last Week</span>
                        <div className="squaresRow">
                          <span className="sq l1"></span><span className="sq l0"></span><span className="sq l0"></span><span className="sq l2"></span><span className="sq l3"></span><span className="sq l4"></span><span className="sq l1"></span>
                        </div>
                      </div>

                      <div className="heatmapRowItem">
                        <span className="rowLabel">May 12 – 18</span>
                        <div className="squaresRow">
                          <span className="sq l0"></span><span className="sq l0"></span><span className="sq l2"></span><span className="sq l3"></span><span className="sq l4"></span><span className="sq l1"></span><span className="sq l0"></span>
                        </div>
                      </div>

                      <div className="heatmapRowItem">
                        <span className="rowLabel">May 5 – 11</span>
                        <div className="squaresRow">
                          <span className="sq l1"></span><span className="sq l2"></span><span className="sq l3"></span><span className="sq l2"></span><span className="sq l1"></span><span className="sq l0"></span><span className="sq l1"></span>
                        </div>
                      </div>

                      <div className="heatmapLegendFooter">
                        <span>Less</span>
                        <span className="legendBox sq l0"></span>
                        <span className="legendBox sq l1"></span>
                        <span className="legendBox sq l2"></span>
                        <span className="legendBox sq l3"></span>
                        <span className="legendBox sq l4"></span>
                        <span>More</span>
                        <span className="greatPill">Great! 🔥</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Study Buddy Interactive Chat Widget */}
                  <div className="sdRightWidgetCard">
                    <div className="widgetTitleRow">
                      <h4>AI Study Buddy</h4>
                    </div>

                    <div className="miniAiBuddyBox">
                      <div className="aiBotGreeting">
                        <div className="botAvatar">🤖</div>
                        <div className="botBubble">
                          Hi {userName}! 👋 How can I help you today?
                        </div>
                      </div>

                      <div className="aiQuickChips">
                        <button onClick={() => setWidgetChatInput("Explain a topic")}>Explain a topic</button>
                        <button onClick={() => setWidgetChatInput("Quiz me")}>Quiz me</button>
                        <button onClick={() => setWidgetChatInput("Suggest resources")}>Suggest resources</button>
                      </div>

                      <div className="aiWidgetInputRow">
                        <input
                          type="text"
                          placeholder="Ask me anything..."
                          value={widgetChatInput}
                          onChange={(e) => setWidgetChatInput(e.target.value)}
                        />
                        <button
                          className="btnWidgetSend"
                          onClick={() => {
                            if (widgetChatInput.trim()) {
                              setActiveTab("ai-buddy");
                            }
                          }}
                        >
                          <FaPaperPlane />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Opportunity Feed Widget */}
                  <div className="sdRightWidgetCard">
                    <div className="sdPanelHeaderRow">
                      <h4>Opportunity Feed</h4>
                      <span className="sdViewAllLink" onClick={() => setActiveTab("opportunity-feed")}>View All</span>
                    </div>

                    <div className="miniOppFeedList">
                      <div className="oppFeedItem">
                        <div className="oppIconBox blue"><FaBriefcase /></div>
                        <div className="oppItemDetails">
                          <h5>Web Dev Internship</h5>
                          <span>Acme Corp • Internship</span>
                        </div>
                        <div className="oppItemMeta">
                          <span className="badgeNew">New</span>
                          <span className="timeAgo">2h ago</span>
                        </div>
                      </div>

                      <div className="oppFeedItem">
                        <div className="oppIconBox purple"><FaCode /></div>
                        <div className="oppItemDetails">
                          <h5>React Developer (Fresher)</h5>
                          <span>TechNova • Full-time</span>
                        </div>
                        <div className="oppItemMeta">
                          <span className="badgeNew">New</span>
                          <span className="timeAgo">5h ago</span>
                        </div>
                      </div>

                      <div className="oppFeedItem">
                        <div className="oppIconBox green"><FaLaptopCode /></div>
                        <div className="oppItemDetails">
                          <h5>UI/UX Design Challenge</h5>
                          <span>DesignVerse • Competition</span>
                        </div>
                        <div className="oppItemMeta">
                          <span className="badgeNew">New</span>
                          <span className="timeAgo">1d ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="exploreOppLink" onClick={() => setActiveTab("opportunity-feed")}>
                      Explore More Opportunities →
                    </div>
                  </div>

                  {/* Quick Actions 3x2 Grid */}
                  <div className="sdRightWidgetCard">
                    <div className="widgetTitleRow">
                      <h4>Quick Actions</h4>
                    </div>

                    <div className="sdQuickActionsGrid">
                      <div className="sdQuickActionItem" onClick={() => navigate("/courses")}>
                        <div className="sdQuickActionIcon"><FaBook /></div>
                        <span>Browse Courses</span>
                      </div>

                      <div className="sdQuickActionItem" onClick={() => navigate("/discussions")}>
                        <div className="sdQuickActionIcon"><FaComments /></div>
                        <span>Join Discussion</span>
                      </div>

                      <div className="sdQuickActionItem" onClick={() => navigate("/settings")}>
                        <div className="sdQuickActionIcon"><FaFileInvoice /></div>
                        <span>Resume Builder</span>
                      </div>

                      <div className="sdQuickActionItem" onClick={() => setActiveTab("ai-buddy")}>
                        <div className="sdQuickActionIcon"><FaQuestionCircle /></div>
                        <span>Take Quiz</span>
                      </div>

                      <div className="sdQuickActionItem">
                        <div className="sdQuickActionIcon"><FaUpload /></div>
                        <span>Upload Assignment</span>
                      </div>

                      <div className="sdQuickActionItem" onClick={() => navigate("/certificate")}>
                        <div className="sdQuickActionIcon"><FaAward /></div>
                        <span>Certificate Center</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Right Illustration Decor: Books & Plant */}
                  <div className="sdBottomPlantBooksDecor">
                    🪴 📚
                  </div>

                </div>

              </div>
            </>
          )}

        </div>
      </div>

      <FloatingChatbot />
      <StudentFooter />
    </div>
  );
}
