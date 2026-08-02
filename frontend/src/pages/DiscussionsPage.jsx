import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import PaperPlaneCursor from "../components/PaperPlaneCursor";
import StudentFooter from "../components/StudentFooter";
import FloatingChatbot from "../components/FloatingChatbot";
import NotificationDropdown from "../components/NotificationDropdown";

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
  FaCode,
  FaBolt,
  FaCog,
  FaSearch,
  FaBell,
  FaRobot,
  FaRocket,
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaRegCommentDots,
  FaEye,
  FaEllipsisV,
  FaThumbsUp,
  FaCheck,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaSignOutAlt
} from "react-icons/fa";

import "../styles/studentDashboard.css";
import "../styles/discussionsPage.css";

export default function DiscussionsPage() {
  const { user, xp, logout, themeMode, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";
  const [activeSubTab, setActiveSubTab] = useState("all"); // "all" | "following" | "unanswered" | "my"
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSort, setSelectedSort] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");
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

  // Modals & Drawers state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  // New Thread Form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategoryTag, setNewCategoryTag] = useState("JavaScript");
  const [newContent, setNewContent] = useState("");

  // New Reply Input in Detail Modal
  const [newReplyText, setNewReplyText] = useState("");

  const currentXp = xp ?? 0;
  const userName = user?.full_name || user?.username || "Learner";

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

  // 1-to-1 Discussions Initial State matching Reference Image
  const [discussionsList, setDiscussionsList] = useState([
    {
      id: 1,
      initials: "JS",
      avatarBg: "#E0E7FF",
      avatarColor: "#4338CA",
      title: "How does JavaScript event loop work?",
      category: "JavaScript",
      author: "John Smith",
      time: "2 hours ago",
      repliesCount: 12,
      viewsCount: 125,
      upvotes: 24,
      isUpvoted: false,
      isFollowing: false,
      content:
        "Can someone explain how the call stack, microtask queue, and macrotask queue interact in JavaScript V8 engine? Code examples would be greatly appreciated!",
      comments: [
        { id: 101, author: "Sneha Priya", time: "1 hour ago", text: "The event loop checks if the call stack is empty. If it is, it pushes tasks from microtask queue first (Promises) then macrotask queue (setTimeout)." },
        { id: 102, author: "Tushar Roy", time: "30 mins ago", text: "Great video reference: Philip Roberts' 'What the heck is the event loop anyway?' from JSConf!" }
      ]
    },
    {
      id: 2,
      initials: "AP",
      avatarBg: "#DCFCE7",
      avatarColor: "#15803D",
      title: "Best resources to learn React in 2024?",
      category: "React",
      author: "Ananya Patel",
      time: "5 hours ago",
      repliesCount: 8,
      viewsCount: 98,
      upvotes: 18,
      isUpvoted: false,
      isFollowing: true,
      content:
        "I want to master React 18, Server Components, and Next.js 14. What documentation or interactive courses do you recommend for beginners to advanced developers?",
      comments: [
        { id: 103, author: "Rohit Kumar", time: "4 hours ago", text: "Official react.dev docs are top tier! Also recommend Frontend Masters & SkillSphere React path." }
      ]
    },
    {
      id: 3,
      initials: "RK",
      avatarBg: "#FEF3C7",
      avatarColor: "#B45309",
      title: "Time complexity of HashMap operations",
      category: "Data Structures",
      author: "Rohit Kumar",
      time: "1 day ago",
      repliesCount: 15,
      viewsCount: 210,
      upvotes: 35,
      isUpvoted: false,
      isFollowing: false,
      content:
        "Why is HashMap get/put O(1) on average, but O(n) in worst case? How do collision handling mechanisms like Chaining vs Red-Black trees impact performance?",
      comments: [
        { id: 104, author: "Alex Morgan", time: "18 hours ago", text: "In Java 8+, if bucket size exceeds 8 items, linked list converts to Red-Black tree making worst case O(log N)!" }
      ]
    },
    {
      id: 4,
      initials: "SP",
      avatarBg: "#FCE7F3",
      avatarColor: "#BE185D",
      title: "Tips for cracking coding interviews",
      category: "Career",
      author: "Sneha Priya",
      time: "1 day ago",
      repliesCount: 23,
      viewsCount: 312,
      upvotes: 52,
      isUpvoted: false,
      isFollowing: true,
      content:
        "Here are my top 5 learnings after giving 15+ interviews at top tech companies: 1. Communicate your thought process 2. Master Array/String patterns 3. Dry run edge cases 4. Optimize space/time complexity 5. Stay calm and positive!",
      comments: [
        { id: 105, author: "Mayank Grover", time: "1 day ago", text: "Solid advice! Point #1 is what interviewers care about most." }
      ]
    },
    {
      id: 5,
      initials: "MG",
      avatarBg: "#F3E8FF",
      avatarColor: "#7E22CE",
      title: "Docker vs Kubernetes: When to use what?",
      category: "DevOps",
      author: "Mayank Grover",
      time: "2 days ago",
      repliesCount: 6,
      viewsCount: 87,
      upvotes: 14,
      isUpvoted: false,
      isFollowing: false,
      content:
        "When should a startup transition from simple Docker Compose container setups to a full Kubernetes (K8s) cluster management system?",
      comments: [
        { id: 106, author: "Vanshika R", time: "1 day ago", text: "Stick to Docker Compose until you need automated scaling, self-healing nodes, and multi-cloud deployments!" }
      ]
    },
    {
      id: 6,
      initials: "NK",
      avatarBg: "#E0F2FE",
      avatarColor: "#0369A1",
      title: "How to optimize SQL queries?",
      category: "Database",
      author: "Nikhil Kumar",
      time: "2 days ago",
      repliesCount: 10,
      viewsCount: 132,
      upvotes: 29,
      isUpvoted: false,
      isFollowing: false,
      content:
        "What are the best practices for indexing, avoiding SELECT *, and utilizing EXPLAIN ANALYZE to boost relational database query speeds?",
      comments: [
        { id: 107, author: "Arpita Jain", time: "2 days ago", text: "Index your foreign keys and frequently searched WHERE columns!" }
      ]
    },
    {
      id: 7,
      initials: "VR",
      avatarBg: "#CCFBF1",
      avatarColor: "#0F766E",
      title: "Machine Learning roadmap for beginners",
      category: "Machine Learning",
      author: "Vanshika R",
      time: "3 days ago",
      repliesCount: 18,
      viewsCount: 245,
      upvotes: 41,
      isUpvoted: false,
      isFollowing: false,
      content:
        "Step-by-step roadmap for ML: Python -> NumPy & Pandas -> Math (Linear Algebra & Calculus) -> Scikit-learn -> Deep Learning (PyTorch). What projects should beginners start with?",
      comments: [
        { id: 108, author: "Tushar Roy", time: "3 days ago", text: "Start with House Price Prediction (Regression) and Iris Flower classification!" }
      ]
    }
  ]);

  // Upcoming Discussions Widgets Data
  const upcomingDiscussions = [
    { id: 1, title: "Generative AI: The Future", speaker: "With Prof. Sharma", date: "25 May 2025 • 7:00 PM", icon: "🤖", iconBg: "#F3E8FF" },
    { id: 2, title: "DSA Problem Solving Session", speaker: "With Tushar Roy", date: "27 May 2025 • 6:00 PM", icon: "</>", iconBg: "#DCFCE7" },
    { id: 3, title: "System Design Basics", speaker: "With Arpita Jain", date: "30 May 2025 • 8:00 PM", icon: "📖", iconBg: "#FEF3C7" }
  ];

  // Top Contributors Widgets Data
  const topContributors = [
    { id: 1, name: "Tushar Roy", level: "Level 18", xp: "2,450 XP", avatar: "👨‍💻" },
    { id: 2, name: "Arpita Jain", level: "Level 16", xp: "1,980 XP", avatar: "👩‍💻" },
    { id: 3, name: "Rohit Kumar", level: "Level 14", xp: "1,650 XP", avatar: "👨‍🎓" },
    { id: 4, name: "Sneha Priya", level: "Level 13", xp: "1,240 XP", avatar: "👩‍🎓" },
    { id: 5, name: "Vanshika R", level: "Level 12", xp: "980 XP", avatar: "👩‍🔬" }
  ];

  // Filtered Threads Calculation
  const filteredDiscussions = discussionsList.filter((item) => {
    // Search query filter
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === "All Categories" || item.category.toLowerCase() === selectedCategory.toLowerCase();

    // Sub-tab filter
    if (activeSubTab === "following") return matchesSearch && matchesCategory && item.isFollowing;
    if (activeSubTab === "unanswered") return matchesSearch && matchesCategory && item.repliesCount === 0;
    if (activeSubTab === "my") return matchesSearch && matchesCategory && item.author === userName;

    return matchesSearch && matchesCategory;
  });

  // Handler to Create a New Discussion Thread
  const handleCreateThread = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const initials = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    const newThread = {
      id: Date.now(),
      initials: initials || "AM",
      avatarBg: "#FFF0EB",
      avatarColor: "#F9572A",
      title: newTitle.trim(),
      category: newCategoryTag,
      author: userName,
      time: "Just now",
      repliesCount: 0,
      viewsCount: 1,
      upvotes: 1,
      isUpvoted: true,
      isFollowing: true,
      content: newContent.trim(),
      comments: []
    };

    setDiscussionsList([newThread, ...discussionsList]);
    setNewTitle("");
    setNewContent("");
    setIsCreateModalOpen(false);

    setToastMessage("🚀 Your discussion thread has been published successfully!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Upvote Thread Handler
  const handleUpvoteThread = (threadId) => {
    setDiscussionsList((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const updatedUpvoted = !t.isUpvoted;
          return {
            ...t,
            isUpvoted: updatedUpvoted,
            upvotes: updatedUpvoted ? t.upvotes + 1 : t.upvotes - 1
          };
        }
        return t;
      })
    );

    if (selectedThread && selectedThread.id === threadId) {
      setSelectedThread((prev) => ({
        ...prev,
        isUpvoted: !prev.isUpvoted,
        upvotes: !prev.isUpvoted ? prev.upvotes + 1 : prev.upvotes - 1
      }));
    }
  };

  // Add Comment/Reply in Thread Detail Modal
  const handlePostReply = (e) => {
    e.preventDefault();
    if (!newReplyText.trim() || !selectedThread) return;

    const newCommentObj = {
      id: Date.now(),
      author: userName,
      time: "Just now",
      text: newReplyText.trim()
    };

    setDiscussionsList((prev) =>
      prev.map((t) => {
        if (t.id === selectedThread.id) {
          return {
            ...t,
            repliesCount: t.repliesCount + 1,
            comments: [...t.comments, newCommentObj]
          };
        }
        return t;
      })
    );

    setSelectedThread((prev) => ({
      ...prev,
      repliesCount: prev.repliesCount + 1,
      comments: [...prev.comments, newCommentObj]
    }));

    setNewReplyText("");
    setToastMessage("💬 Reply posted successfully!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className={`dpWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      {/* Main Grid Container */}
      <div className="dpMainContainer">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="sdLeftSidebar">
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
                    className={`sdNavItem ${item.id === "discussions" ? "active" : ""}`}
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
        <div className="dpRightBodyArea">
          
          {/* Top Header Bar */}
          <header className="sdTopHeaderBar">
            <div className="sdSearchWrapper">
              <FaSearch className="sdSearchIcon" />
              <input
                type="text"
                className="sdSearchInput"
                placeholder="Search for courses, skills, discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className="dpToastAlert">
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Page Heading Banner */}
          <div className="dpPageHeaderRow">
            <div className="dpPageHeading">
              <h1>💬 Discussions</h1>
              <p>Ask questions, share knowledge, and learn with the community.</p>
            </div>
          </div>

          {/* Search, Filter & Controls Bar */}
          <div className="dpControlsBar">
            <div className="dpSearchBox">
              <FaSearch className="searchIcon" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="dpDropdownsGroup">
              <select
                className="dpSelect"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All Categories">All Categories ▾</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Data Structures">Data Structures</option>
                <option value="Career">Career</option>
                <option value="DevOps">DevOps</option>
                <option value="Database">Database</option>
                <option value="Machine Learning">Machine Learning</option>
              </select>

              <select
                className="dpSelect"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="Latest">Latest ▾</option>
                <option value="Most Popular">Most Popular</option>
                <option value="Unanswered">Unanswered</option>
                <option value="Top Voted">Top Voted</option>
              </select>

              <button className="btnStartDiscussion" onClick={() => setIsCreateModalOpen(true)}>
                + Start Discussion
              </button>
            </div>
          </div>

          {/* ── TWO-COLUMN MAIN CONTENT WORKSPACE ── */}
          <div className="dpWorkspaceGrid" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
            
            {/* LEFT COLUMN: SUB-TABS & THREAD CARDS STACK */}
            <div className="dpLeftContentCol">
              
              {/* Sub-Tabs Row */}
              <div className="dpSubTabsRow">
                <button
                  className={`dpSubTab ${activeSubTab === "all" ? "active" : ""}`}
                  onClick={() => setActiveSubTab("all")}
                >
                  All Discussions
                </button>
                <button
                  className={`dpSubTab ${activeSubTab === "following" ? "active" : ""}`}
                  onClick={() => setActiveSubTab("following")}
                >
                  Following
                </button>
                <button
                  className={`dpSubTab ${activeSubTab === "unanswered" ? "active" : ""}`}
                  onClick={() => setActiveSubTab("unanswered")}
                >
                  Unanswered
                </button>
                <button
                  className={`dpSubTab ${activeSubTab === "my" ? "active" : ""}`}
                  onClick={() => setActiveSubTab("my")}
                >
                  My Discussions
                </button>
              </div>

              {/* Discussions List Stack (1-to-1 Match) */}
              <div className="dpThreadsStack">
                {filteredDiscussions.length === 0 ? (
                  <div className="dpEmptyStateCard">
                    <span>💬 No discussion threads found matching your filters.</span>
                    <button className="btnResetFilter" onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); setActiveSubTab("all"); }}>Reset Filters</button>
                  </div>
                ) : (
                  filteredDiscussions.map((item) => (
                    <div
                      key={item.id}
                      className="dpThreadCard"
                      onClick={() => setSelectedThread(item)}
                    >
                      {/* Left Initials Avatar */}
                      <div
                        className="dpInitialsAvatar"
                        style={{ background: item.avatarBg, color: item.avatarColor }}
                      >
                        {item.initials}
                      </div>

                      {/* Middle Thread Info */}
                      <div className="dpThreadMainInfo">
                        <h3 className="dpThreadTitle">{item.title}</h3>

                        <div className="dpThreadMetaRow">
                          <span className={`dpCategoryChip ${item.category.toLowerCase().replace(/\s+/g, "")}`}>
                            {item.category}
                          </span>
                          <span className="dpAuthorTimeText">
                            {item.author} • {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Right Metrics & Options */}
                      <div className="dpThreadMetricsGroup" onClick={(e) => e.stopPropagation()}>
                        <div className="metricItem">
                          <FaRegCommentDots className="mIcon" />
                          <div className="mVal">
                            <strong>{item.repliesCount}</strong>
                            <span>Replies</span>
                          </div>
                        </div>

                        <div className="metricItem">
                          <FaEye className="mIcon" />
                          <div className="mVal">
                            <strong>{item.viewsCount}</strong>
                            <span>Views</span>
                          </div>
                        </div>

                        <button
                          className="btnMoreOptions"
                          onClick={() => handleUpvoteThread(item.id)}
                          title="Upvote Thread"
                        >
                          <FaThumbsUp color={item.isUpvoted ? "#F9572A" : "#94A3B8"} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination Controls */}
              <div className="dpPaginationBar">
                <button className="pageArrowBtn"><FaChevronLeft /></button>
                <button className="pagePill active">1</button>
                <button className="pagePill">2</button>
                <button className="pagePill">3</button>
                <span className="pageDots">...</span>
                <button className="pagePill">15</button>
                <button className="pageArrowBtn"><FaChevronRight /></button>
              </div>

            </div>

            {/* RIGHT COLUMN: 3 WIDGET CARDS */}
            <aside className="dpRightWidgetsCol" style={{ display: "none" }}>
              
              {/* Card 1: Upcoming Discussions */}
              <div className="dpWidgetCard">
                <div className="widgetHeaderRow">
                  <h4>📅 Upcoming Discussions</h4>
                  <span className="viewAllLink">View All</span>
                </div>

                <div className="upcomingList">
                  {upcomingDiscussions.map((ud) => (
                    <div key={ud.id} className="upcomingItemRow">
                      <div className="udIconBox" style={{ background: ud.iconBg }}>
                        {ud.icon}
                      </div>
                      <div className="udInfo">
                        <strong>{ud.title}</strong>
                        <span>{ud.speaker}</span>
                        <small>⏰ {ud.date}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Top Contributors */}
              <div className="dpWidgetCard">
                <div className="widgetHeaderRow">
                  <h4>🏆 Top Contributors</h4>
                  <span className="viewAllLink">View All</span>
                </div>

                <div className="contributorsList">
                  {topContributors.map((c) => (
                    <div key={c.id} className="contributorRow">
                      <div className="cAvatar">{c.avatar}</div>
                      <div className="cInfo">
                        <strong>{c.name}</strong>
                      </div>
                      <span className="cLevelPill">{c.level}</span>
                      <span className="cXpText">{c.xp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Discussion Guidelines */}
              <div className="dpWidgetCard guidelines">
                <div className="widgetHeaderRow">
                  <h4>🛡️ Discussion Guidelines</h4>
                </div>

                <ul className="guidelinesList">
                  <li><FaCheck color="#10B981" /> Be respectful and inclusive</li>
                  <li><FaCheck color="#10B981" /> Stay on topic</li>
                  <li><FaCheck color="#10B981" /> Search before posting</li>
                  <li><FaCheck color="#10B981" /> No spam or self-promotion</li>
                  <li><FaCheck color="#10B981" /> Give credit to original sources</li>
                </ul>

                <a href="#guidelines" className="readGuidelinesLink">
                  Read full guidelines →
                </a>
              </div>

            </aside>

          </div>

        </div>
      </div>

      {/* START DISCUSSION MODAL */}
      {isCreateModalOpen && (
        <div className="dpModalOverlay">
          <div className="dpModalContent">
            <div className="modalHeaderRow">
              <h3>🚀 Start a New Discussion</h3>
              <button className="btnCloseModal" onClick={() => setIsCreateModalOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="createThreadForm">
              <div className="inputGroup">
                <label>Discussion Title</label>
                <input
                  type="text"
                  placeholder="e.g. How does JavaScript event loop work?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="inputGroup">
                <label>Category Tag</label>
                <select
                  value={newCategoryTag}
                  onChange={(e) => setNewCategoryTag(e.target.value)}
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="React">React</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="Career">Career</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Database">Database</option>
                  <option value="Machine Learning">Machine Learning</option>
                </select>
              </div>

              <div className="inputGroup">
                <label>Question or Discussion Content</label>
                <textarea
                  rows="5"
                  placeholder="Provide context, code snippets, or details to help the community understand your post..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                />
              </div>

              <div className="modalFooterRow">
                <button type="button" className="btnCancel" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btnSubmit">
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* THREAD DETAIL DRAWER / MODAL */}
      {selectedThread && (
        <div className="dpModalOverlay">
          <div className="dpModalContent threadDetail">
            <div className="modalHeaderRow">
              <span className={`dpCategoryChip ${selectedThread.category.toLowerCase().replace(/\s+/g, "")}`}>
                {selectedThread.category}
              </span>
              <button className="btnCloseModal" onClick={() => setSelectedThread(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="threadDetailBody">
              <h2 className="detailTitle">{selectedThread.title}</h2>
              <div className="detailMetaRow">
                <div className="authorInfo">
                  <div className="dpInitialsAvatar small" style={{ background: selectedThread.avatarBg, color: selectedThread.avatarColor }}>
                    {selectedThread.initials}
                  </div>
                  <div>
                    <strong>{selectedThread.author}</strong>
                    <span>Posted {selectedThread.time}</span>
                  </div>
                </div>

                <button
                  className={`btnUpvote ${selectedThread.isUpvoted ? "active" : ""}`}
                  onClick={() => handleUpvoteThread(selectedThread.id)}
                >
                  <FaThumbsUp /> <span>{selectedThread.upvotes} Upvotes</span>
                </button>
              </div>

              <div className="detailContentBox">
                <p>{selectedThread.content}</p>
              </div>

              {/* Comments Section */}
              <div className="commentsSection">
                <h4>💬 Replies & Community Answers ({selectedThread.comments.length})</h4>

                <div className="commentsList">
                  {selectedThread.comments.map((c) => (
                    <div key={c.id} className="commentItem">
                      <div className="cAuthorRow">
                        <strong>{c.author}</strong>
                        <span>{c.time}</span>
                      </div>
                      <p>{c.text}</p>
                    </div>
                  ))}
                </div>

                {/* Add Reply Input */}
                <form onSubmit={handlePostReply} className="addReplyForm">
                  <textarea
                    rows="3"
                    placeholder="Write a reply or answer..."
                    value={newReplyText}
                    onChange={(e) => setNewReplyText(e.target.value)}
                    required
                  />
                  <button type="submit" className="btnPostReply">
                    Post Reply
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <FloatingChatbot />
      <StudentFooter />
    </div>
  );
}
