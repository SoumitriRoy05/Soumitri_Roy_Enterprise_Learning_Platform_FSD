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
  FaStar,
  FaCheckCircle,
  FaBookmark,
  FaClock,
  FaEllipsisH,
  FaChevronLeft,
  FaChevronRight,
  FaCrown,
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaCalendarAlt,
  FaLock,
  FaShoppingCart,
  FaTimes,
  FaShieldAlt,
  FaShareAlt,
  FaSignOutAlt,
  FaArrowRight
} from "react-icons/fa";

import "../styles/courses.css";

export default function CoursesPage() {
  const { user, xp, logout, themeMode, toggleTheme, enrolledCourses, enrollCourse, completedTopics, earnXp } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const isDarkMode = themeMode === "dark";
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Course Checkout Modal State
  const [selectedCheckoutCourse, setSelectedCheckoutCourse] = useState(null);
  const [isEnrolledToast, setIsEnrolledToast] = useState(false);

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

  const rawCourses = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      subtitle: "Learn the basics of JavaScript and build interactive websites.",
      logoText: "JS",
      logoBg: "#FEF08A",
      logoColor: "#CA8A04",
      rating: "4.8",
      reviews: "5.2K",
      lessons: "12 Lessons",
      bannerType: "code",
      topicPrefix: "js_"
    },
    {
      id: 2,
      title: "React.js Development",
      subtitle: "Build modern web apps using React, hooks and more.",
      logoText: "⚛️",
      logoBg: "#E0F2FE",
      logoColor: "#0284C7",
      rating: "4.7",
      reviews: "4.6K",
      lessons: "18 Lessons",
      bannerType: "react",
      topicPrefix: "react_"
    },
    {
      id: 3,
      title: "Python for Beginners",
      subtitle: "Start your Python journey from basics to real-world examples.",
      logoText: "🐍",
      logoBg: "#FEF9C3",
      logoColor: "#854D0E",
      rating: "4.7",
      reviews: "4.6K",
      lessons: "16 Lessons",
      bannerType: "python",
      topicPrefix: "python_"
    },
    {
      id: 4,
      title: "UI/UX Design Essentials",
      subtitle: "Design stunning user interfaces and improve user experiences.",
      logoText: "🎨",
      logoBg: "#FCE7F3",
      logoColor: "#DB2777",
      rating: "4.6",
      reviews: "2.8K",
      lessons: "14 Lessons",
      bannerType: "figma",
      topicPrefix: "uiux_"
    },
    {
      id: 5,
      title: "Data Structures & Algorithms",
      subtitle: "Master DSA concepts and solve real coding problems.",
      logoText: "📊",
      logoBg: "#E0F2FE",
      logoColor: "#0284C7",
      rating: "4.9",
      reviews: "10K",
      lessons: "20 Lessons",
      bannerType: "dsa",
      topicPrefix: "dsa_"
    },
    {
      id: 6,
      title: "Node.js Essentials",
      subtitle: "Build scalable backend applications with Node.js.",
      logoText: "🟢",
      logoBg: "#DCFCE7",
      logoColor: "#166534",
      rating: "4.8",
      reviews: "3.9K",
      lessons: "15 Lessons",
      bannerType: "node",
      topicPrefix: "node_"
    },
    {
      id: 7,
      title: "System Design Basics",
      subtitle: "Learn how to design scalable and reliable systems.",
      logoText: "📐",
      logoBg: "#F3E8FF",
      logoColor: "#7E22CE",
      rating: "4.7",
      reviews: "2.2K",
      lessons: "10 Lessons",
      bannerType: "system",
      topicPrefix: "system_"
    },
    {
      id: 8,
      title: "Advanced Machine Learning",
      subtitle: "Dive deep into ML algorithms and real-world projects.",
      isPremium: true,
      logoText: "🔒",
      logoBg: "#F1F5F9",
      logoColor: "#475569",
      rating: "4.9",
      reviews: "1.8K",
      lessons: "24 Lessons",
      bannerType: "ml",
      topicPrefix: "ml_"
    }
  ];

  const userEnrolled = enrolledCourses || [];
  const userCompletedTopics = completedTopics || [];

  const courseList = rawCourses.map((c) => {
    const isEnrolled = userEnrolled.includes(c.id.toString()) || userEnrolled.includes(c.id);
    const topicsDone = userCompletedTopics.filter((id) => id.startsWith(c.topicPrefix || "")).length;
    const progress = isEnrolled ? Math.min(100, Math.round((topicsDone / 6) * 100)) : 0;

    let status = "locked";
    let statusText = "Locked";

    if (isEnrolled) {
      if (progress >= 100) {
        status = "completed";
        statusText = "Completed";
      } else {
        status = "in-progress";
        statusText = "In Progress";
      }
    }

    return {
      ...c,
      isEnrolled,
      progress,
      status,
      statusText
    };
  });

  const filteredCourses = courseList.filter((c) => {
    if (filter === "all") return true;
    if (filter === "in-progress") return c.status === "in-progress";
    if (filter === "completed") return c.status === "completed";
    if (filter === "saved") return c.status === "saved";
    if (filter === "wishlist") return c.status === "saved" || c.status === "not-started" || c.status === "locked";
    return true;
  });

  const openCheckoutModal = (course) => {
    const courseToCheckout = course || {
      id: 1,
      title: "Machine Learning Foundations",
      subtitle: "A beginner-friendly guide to Machine Learning concepts, models, and Python implementation.",
      notes: "80 Study Notes Included",
      certificate: "Certificate Included",
      fee: "₹4,999.00"
    };
    setSelectedCheckoutCourse(courseToCheckout);
  };

  const handleCompleteEnrollment = () => {
    if (!selectedCheckoutCourse) return;

    if (enrollCourse && selectedCheckoutCourse.id) {
      enrollCourse(selectedCheckoutCourse.id);
    }
    if (earnXp) earnXp(100);

    setIsEnrolledToast(true);
    setSelectedCheckoutCourse(null);

    setTimeout(() => {
      setIsEnrolledToast(false);
    }, 4000);
  };

  return (
    <div className={`mcCoursesWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      {/* Toast Notification */}
      {isEnrolledToast && (
        <div className="mcEnrollSuccessToast">
          <FaCheckCircle color="#10B981" />
          <span>Enrollment Successful! +100 XP Earned 🎉</span>
        </div>
      )}

      {/* Main Container Grid */}
      <div className="mcMainContainer">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="mcLeftSidebar">
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
                    className={`sdNavItem ${item.id === "courses" ? "active" : ""}`}
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
        <div className="mcRightBodyArea">
          
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

          {/* Page Heading */}
          <div className="mcPageHeader">
            <h1>My Courses 📖</h1>
            <p>Continue your learning journey. Keep going!</p>
          </div>

          {/* Main 2-Column Content Grid */}
          <div className="mcGridContainer">
            
            {/* Center Main Column */}
            <div className="mcCenterColumn">
              
              {/* Filter Pills & Sort Bar Row */}
              <div className="mcFilterSortRow">
                <div className="mcFilterPills">
                  <button
                    className={`mcPill ${filter === "all" ? "active" : ""}`}
                    onClick={() => setFilter("all")}
                  >
                    All Courses
                  </button>
                  <button
                    className={`mcPill ${filter === "in-progress" ? "active" : ""}`}
                    onClick={() => setFilter("in-progress")}
                  >
                    In Progress
                  </button>
                  <button
                    className={`mcPill ${filter === "completed" ? "active" : ""}`}
                    onClick={() => setFilter("completed")}
                  >
                    Completed
                  </button>
                  <button
                    className={`mcPill ${filter === "saved" ? "active" : ""}`}
                    onClick={() => setFilter("saved")}
                  >
                    Saved
                  </button>
                  <button
                    className={`mcPill ${filter === "wishlist" ? "active" : ""}`}
                    onClick={() => setFilter("wishlist")}
                  >
                    Wishlist
                  </button>
                </div>

                <div className="mcSortSelectWrapper">
                  <select
                    className="mcSortSelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recent">Sort by: Recent Activity</option>
                    <option value="progress">Sort by: Progress %</option>
                    <option value="rating">Sort by: Rating</option>
                  </select>
                </div>
              </div>

              {/* 8 Courses Grid */}
              <div className="mcCourseGrid">
                {filteredCourses.map((c) => (
                  <div key={c.id} className={`mcCourseCard ${c.status}`}>
                    
                    {/* Top Banner Image Box */}
                    <div className={`mcBannerBox ${c.bannerType}`}>
                      <div
                        className="mcLogoBadge"
                        style={{ background: c.logoBg, color: c.logoColor }}
                      >
                        {c.logoText}
                      </div>

                      <FaEllipsisH className="mcDotsMenu" />

                      <span className={`mcStatusBadge ${c.status}`}>
                        {c.statusText}
                      </span>

                      {c.bannerType === "code" && (
                        <div className="bannerOverlayCode">
                          <code>const app = () =&gt; &#123;&#125;;</code>
                        </div>
                      )}
                      {c.bannerType === "react" && (
                        <div className="bannerOverlayReact">⚛️</div>
                      )}
                      {c.bannerType === "python" && (
                        <div className="bannerOverlayPython">🐍</div>
                      )}
                      {c.bannerType === "dsa" && (
                        <div className="bannerOverlayDsa">🌐</div>
                      )}
                      {c.bannerType === "node" && (
                        <div className="bannerOverlayNode">🟩 Node.js</div>
                      )}
                      {c.bannerType === "system" && (
                        <div className="bannerOverlaySystem">📘 System Design</div>
                      )}
                      {c.bannerType === "ml" && (
                        <div className="bannerOverlayMl">
                          <FaLock className="lockBigIcon" />
                        </div>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div className="mcCardContent">
                      <h4>{c.title}</h4>
                      <p className="mcCourseSubtitle">{c.subtitle}</p>

                      <div className="mcProgressArea">
                        <div className="mcProgressBarTrack">
                          <div
                            className="mcProgressBarFill"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                        <span className="mcPctLabel">{c.progress}% Complete</span>
                      </div>

                      {c.isPremium && (
                        <div className="mcPremiumBadge">
                          <FaCrown color="#D97706" /> Premium Course
                        </div>
                      )}

                      <div className="mcCardFooterMeta">
                        <span className="ratingText">
                          <FaStar color="#F59E0B" /> {c.rating} ({c.reviews})
                        </span>
                        <span className="lessonsText">{c.lessons}</span>
                      </div>

                      <button
                        className={`btnCourseCardAction ${c.status}`}
                        onClick={() => {
                          if (c.status === "locked" || c.status === "not-started") {
                            openCheckoutModal(c);
                          } else {
                            const trackKey = c.bannerType === "code" ? "javascript" : c.bannerType === "figma" ? "uiux" : c.bannerType === "system" ? "fsd" : c.bannerType;
                            navigate(`/learning?track=${trackKey || "react"}`);
                          }
                        }}
                      >
                        {c.status === "completed"
                          ? "Review Course"
                          : c.status === "locked"
                          ? "Unlock Course"
                          : c.status === "not-started"
                          ? "Start Course"
                          : "Continue"}
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Explore Learning Paths Banner */}
              <div className="mcExplorePathsBanner">
                <div className="bannerLeftInfo">
                  <h3>Explore Learning Paths</h3>
                  <p>Curated paths to help you master skills step by step.</p>
                  <button className="btnBrowsePaths" onClick={() => navigate("/learning-paths")}>
                    Browse Learning Paths →
                  </button>
                </div>
                <div className="mountainGraphicDeco">
                  ⛰️ 🚩
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN SIDEBAR (MY LEARNING OVERVIEW) ── */}
            <div className="mcRightSidebar">
              
              {/* My Learning Overview 2x2 Grid */}
              <div className="mcOverviewCard">
                <h4>My Learning Overview</h4>

                <div className="overviewGrid2x2">
                  <div className="overviewBox">
                    <div className="boxIcon orange"><FaBook /></div>
                    <div className="boxValText">
                      <strong>{courseList.filter(c => c.status === "in-progress").length}</strong>
                      <span>In Progress</span>
                    </div>
                  </div>

                  <div className="overviewBox">
                    <div className="boxIcon green"><FaCheckCircle /></div>
                    <div className="boxValText">
                      <strong>{courseList.filter(c => c.status === "completed").length}</strong>
                      <span>Completed</span>
                    </div>
                  </div>

                  <div className="overviewBox">
                    <div className="boxIcon purple"><FaBookmark /></div>
                    <div className="boxValText">
                      <strong>0</strong>
                      <span>Saved</span>
                    </div>
                  </div>

                  <div className="overviewBox">
                    <div className="boxIcon purpleLight"><FaClock /></div>
                    <div className="boxValText">
                      <strong>{userCompletedTopics.length * 2}</strong>
                      <span>Total Hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Goal Card */}
              <div className="mcOverviewCard">
                <div className="weeklyGoalHeader">
                  <h4>Weekly Goal</h4>
                  <span className="goalVal">{Math.min(7, userCompletedTopics.length * 2)} / 7 hours</span>
                </div>

                <div className="goalTrack">
                  <div className="goalFill" style={{ width: `${Math.min(100, Math.round(((userCompletedTopics.length * 2) / 7) * 100))}%` }}></div>
                </div>
                <span className="goalSubtext">
                  {userCompletedTopics.length > 0 ? "You're on track! Keep it up! 🔥" : "Start a course to track your weekly progress!"}
                </span>
              </div>

              {/* Continue Learning Widget */}
              <div className="mcOverviewCard">
                <h4>Continue Learning</h4>

                <div className="mcContinueList">
                  {courseList.filter(c => c.status === "in-progress").length > 0 ? (
                    courseList.filter(c => c.status === "in-progress").map(c => (
                      <div className="continueItem" key={c.id}>
                        <div className="itemIcon yellow" style={{ background: c.logoBg, color: c.logoColor }}>
                          {c.logoText}
                        </div>
                        <div className="itemInfo">
                          <h5>{c.title}</h5>
                          <span>{c.lessons}</span>
                        </div>
                        <span className="itemPct">{c.progress}%</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", padding: "10px 0" }}>
                      No active courses in progress. Unlock a course to start learning!
                    </p>
                  )}
                </div>

                <div className="viewAllProgressLink" onClick={() => navigate("/learning")}>
                  View All In Progress →
                </div>
              </div>

              {/* Recommended For You Carousel Widget */}
              <div className="mcOverviewCard">
                <div className="recHeaderRow">
                  <h4>Recommended For You</h4>
                  <span className="sdViewAllLink">View All</span>
                </div>

                <div className="recCarouselBox">
                  <button className="carouselArrow left"><FaChevronLeft /></button>
                  <div className="recCard">
                    <div className="recIconBox">🧠</div>
                    <h5>Machine Learning Fundamentals</h5>
                    <div className="recRatingRow">
                      <span><FaStar color="#F59E0B" /> 4.8 (3.1K)</span>
                      <span className="popularPill">Popular</span>
                    </div>
                    <button
                      className="btnExploreCourse"
                      onClick={() =>
                        openCheckoutModal({
                          title: "Machine Learning Foundations",
                          subtitle:
                            "A beginner-friendly guide to Machine Learning concepts, models, and Python implementation.",
                          bannerType: "ml"
                        })
                      }
                    >
                      Explore Course
                    </button>
                  </div>
                  <button className="carouselArrow right"><FaChevronRight /></button>
                </div>
              </div>

              {/* Bottom Right Decor */}
              <div className="mcBottomPlantDecor">
                🪴 📚
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ── COURSE CHECKOUT MODAL (EXACT 1-TO-1 MATCH OF SCREENSHOT) ── */}
      {selectedCheckoutCourse && (
        <div
          className="chkModalBackdrop"
          onClick={(e) => {
            if (e.target.className === "chkModalBackdrop") setSelectedCheckoutCourse(null);
          }}
        >
          <div className="chkModalCard">
            {/* Top Modal Header */}
            <div className="chkModalHeader">
              <div className="chkHeaderTitleRow">
                <div className="chkCartIconBadge">
                  <FaShoppingCart />
                </div>
                <h2>Course Checkout</h2>
              </div>
              <button
                className="chkCloseBtn"
                onClick={() => setSelectedCheckoutCourse(null)}
                title="Close"
              >
                <FaTimes />
              </button>
            </div>

            {/* Course Information Row */}
            <div className="chkCourseInfoRow">
              <div className="chkCourseThumb">
                <div className="codeThumbGraphic">
                  <code>const ml = model.fit();</code>
                </div>
              </div>

              <div className="chkCourseTextInfo">
                <h3>{selectedCheckoutCourse.title || "Machine Learning Foundations"}</h3>
                <p>
                  {selectedCheckoutCourse.subtitle ||
                    "A beginner-friendly guide to Machine Learning concepts, models, and Python implementation."}
                </p>

                <div className="chkPillBadgesRow">
                  <span className="chkBadgePill orange">
                    📖 80 Study Notes Included
                  </span>
                  <span className="chkBadgePill rose">
                    🏵️ Certificate Included
                  </span>
                </div>
              </div>
            </div>

            {/* Price Breakdown Box */}
            <div className="chkPriceBreakdownBox">
              <div className="chkPriceRow">
                <span>Course Tuition Fee:</span>
                <span className="feeVal">₹4,999.00</span>
              </div>

              <div className="chkPriceRow scholarship">
                <span>SkillSphere Scholarship Grant (100% OFF):</span>
                <span className="discountVal">-₹4,999.00</span>
              </div>

              <div className="chkDividerDashed"></div>

              <div className="chkPriceRow total">
                <strong>Total Due Today:</strong>
                <strong className="totalZeroVal">₹0.00</strong>
              </div>
            </div>

            {/* Perks Row */}
            <div className="chkPerksRow">
              <span>⚡ Instant Access</span>
              <span className="bulletDot">•</span>
              <span>✨ +100 XP Bonus</span>
              <span className="bulletDot">•</span>
              <span>📖 80+ Notes</span>
            </div>

            {/* Main Action CTA Button */}
            <button className="btnCompleteEnrollment" onClick={handleCompleteEnrollment}>
              Complete Enrollment (Free) <FaArrowRight />
            </button>

            {/* Security Subtext */}
            <div className="chkSecuritySubtext">
              <FaShieldAlt color="#94A3B8" /> 100% Secure Checkout. Cancel Anytime.
            </div>

          </div>
        </div>
      )}

      <FloatingChatbot />
      <StudentFooter />
    </div>
  );
}
