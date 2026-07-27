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
  FaRobot,
  FaRocket,
  FaMapMarkedAlt,
  FaBolt,
  FaAward,
  FaCertificate,
  FaChartLine,
  FaFileInvoice,
  FaCog,
  FaSearch,
  FaBell,
  FaCode,
  FaCalendarAlt,
  FaTrophy,
  FaCheckCircle,
  FaRegCircle,
  FaStar,
  FaRegStar,
  FaPlay,
  FaLock,
  FaChevronRight,
  FaChevronLeft,
  FaFilter,
  FaBookmark,
  FaRegBookmark,
  FaArrowRight,
  FaFire,
  FaBullseye,
  FaSun,
  FaMoon
} from "react-icons/fa";

import studentHeroImg from "../assets/student_dashboard_hero_illustration.png";
import darkReactLearningHero from "../assets/dark_react_learning_hero.png";
import lightReactLearningHero from "../assets/light_react_learning_hero.png";
import "../styles/studentDashboard.css";
import "../styles/codeArena.css";

export default function CodeArenaPage() {
  const { user, xp, earnXp, themeMode, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";

  const userName = user?.full_name || user?.username || "Riya Sharma";
  const userXp = xp ?? 16250;
  const userLevel = Math.floor(userXp / 2000) + 1;

  // Active Filters & States
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState("All");
  const [selectedTopicFilter, setSelectedTopicFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isContestRegistered, setIsContestRegistered] = useState(false);

  // Active Problem Solver Modal State
  const [activeProblem, setActiveProblem] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [selectedLang, setSelectedLang] = useState("JavaScript");
  const [testOutput, setTestOutput] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Solved & Bookmarked State
  const [solvedProblemIds, setSolvedProblemIds] = useState([1, 2, 3, 7, 8]);
  const [bookmarkedProblemIds, setBookmarkedProblemIds] = useState([1, 4]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

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

  // Company Cards List
  const companies = [
    { id: "Google", name: "Google", questions: "250 Questions" },
    { id: "Amazon", name: "Amazon", questions: "400 Questions" },
    { id: "Microsoft", name: "Microsoft", questions: "220 Questions" },
    { id: "Adobe", name: "Adobe", questions: "150 Questions" },
    { id: "Goldman Sachs", name: "Goldman Sachs", questions: "180 Questions" },
    { id: "Walmart", name: "Walmart", questions: "130 Questions" },
    { id: "Atlassian", name: "Atlassian", questions: "95 Questions" }
  ];

  // Topics Grid List
  const topics = [
    { id: "Arrays", title: "Arrays", questions: "120 Questions", pct: 78, xpVal: "+250 XP", icon: "📊", color: "#10B981" },
    { id: "Strings", title: "Strings", questions: "95 Questions", pct: 65, xpVal: "+200 XP", icon: "Aa", color: "#3B82F6" },
    { id: "Linked List", title: "Linked List", questions: "85 Questions", pct: 70, xpVal: "+200 XP", icon: "🔗", color: "#6366F1" },
    { id: "Trees", title: "Trees", questions: "110 Questions", pct: 72, xpVal: "+250 XP", icon: "🌲", color: "#10B981" },
    { id: "Graphs", title: "Graphs", questions: "105 Questions", pct: 60, xpVal: "+250 XP", icon: "🕸️", color: "#EC4899" },
    { id: "Heap", title: "Heap", questions: "70 Questions", pct: 55, xpVal: "+150 XP", icon: "🥞", color: "#F59E0B" },
    { id: "DP", title: "DP", questions: "150 Questions", pct: 68, xpVal: "+300 XP", icon: "🧮", color: "#8B5CF6" },
    { id: "Greedy", title: "Greedy", questions: "65 Questions", pct: 62, xpVal: "+150 XP", icon: "👑", color: "#EAB308" },
    { id: "Backtracking", title: "Backtracking", questions: "80 Questions", pct: 50, xpVal: "+150 XP", icon: "🧩", color: "#A855F7" },
    { id: "Bit Manipulation", title: "Bit Manipulation", questions: "60 Questions", pct: 48, xpVal: "+150 XP", icon: "010", color: "#06B6D4" }
  ];

  // Problems Master Dataset
  const problems = [
    { id: 1, title: "Two Sum", company: "Amazon", difficulty: "Easy", xpVal: "+20 XP", acceptance: "58.23%", desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.", starterCode: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}` },
    { id: 2, title: "Merge Intervals", company: "Google", difficulty: "Medium", xpVal: "+50 XP", acceptance: "41.15%", desc: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.", starterCode: `function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = res[res.length - 1];\n    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n    else res.push(intervals[i]);\n  }\n  return res;\n}` },
    { id: 3, title: "LRU Cache", company: "Microsoft", difficulty: "Hard", xpVal: "+100 XP", acceptance: "22.31%", desc: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.", starterCode: `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n}` },
    { id: 4, title: "Sliding Window Maximum", company: "Adobe", difficulty: "Hard", xpVal: "+120 XP", acceptance: "18.12%", desc: "You are given an array of integers nums, there is a sliding window of size k moving from left to right.", starterCode: `function maxSlidingWindow(nums, k) {\n  const q = [];\n  const res = [];\n  for (let i = 0; i < nums.length; i++) {\n    while (q.length && q[q.length - 1] < nums[i]) q.pop();\n    q.push(nums[i]);\n    if (i >= k - 1) {\n      res.push(q[0]);\n      if (nums[i - k + 1] === q[0]) q.shift();\n    }\n  }\n  return res;\n}` },
    { id: 5, title: "Rotate Array", company: "Walmart", difficulty: "Easy", xpVal: "+15 XP", acceptance: "64.81%", desc: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.", starterCode: `function rotate(nums, k) {\n  k %= nums.length;\n  nums.unshift(...nums.splice(nums.length - k));\n}` },
    { id: 6, title: "Trapping Rain Water", company: "Amazon", difficulty: "Hard", xpVal: "+150 XP", acceptance: "20.45%", desc: "Given n non-negative integers representing an elevation map where width of each bar is 1, compute how much water it can trap after raining.", starterCode: `function trap(height) {\n  let left = 0, right = height.length - 1, res = 0;\n  let maxLeft = 0, maxRight = 0;\n  while (left < right) {\n    if (height[left] <= height[right]) {\n      if (height[left] >= maxLeft) maxLeft = height[left];\n      else res += maxLeft - height[left];\n      left++;\n    } else {\n      if (height[right] >= maxRight) maxRight = height[right];\n      else res += maxRight - height[right];\n      right--;\n    }\n  }\n  return res;\n}` },
    { id: 7, title: "Valid Anagram", company: "Meta", difficulty: "Easy", xpVal: "+15 XP", acceptance: "68.90%", desc: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.", starterCode: `function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let c of s) count[c] = (count[c] || 0) + 1;\n  for (let c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}` },
    { id: 8, title: "Binary Tree Level Order Traversal", company: "Goldman Sachs", difficulty: "Medium", xpVal: "+60 XP", acceptance: "52.10%", desc: "Given the root of a binary tree, return the level order traversal of its nodes' values.", starterCode: `function levelOrder(root) {\n  if (!root) return [];\n  const res = [], q = [root];\n  while (q.length) {\n    const size = q.length, level = [];\n    for (let i = 0; i < size; i++) {\n      const curr = q.shift();\n      level.push(curr.val);\n      if (curr.left) q.push(curr.left);\n      if (curr.right) q.push(curr.right);\n    }\n    res.push(level);\n  }\n  return res;\n}` }
  ];

  // Filtered Problems
  const filteredProblems = problems.filter(p => {
    if (selectedDifficulty !== "All" && p.difficulty !== selectedDifficulty) return false;
    if (selectedCompanyFilter !== "All" && p.company !== selectedCompanyFilter) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const openProblemSolver = (problem) => {
    setActiveProblem(problem);
    setUserCode(problem.starterCode || `// Write your solution for ${problem.title}\nfunction solve() {\n  return true;\n}`);
    setTestOutput(null);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setTestOutput({
        status: "Accepted",
        runtime: "48 ms",
        memory: "42.1 MB",
        testsPassed: "5 / 5 Test Cases Passed",
        details: "Test Case 1: Passed\nTest Case 2: Passed\nTest Case 3: Passed\nTest Case 4: Passed\nTest Case 5: Passed"
      });
    }, 800);
  };

  const handleSubmitSolution = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      if (activeProblem && !solvedProblemIds.includes(activeProblem.id)) {
        setSolvedProblemIds(prev => [...prev, activeProblem.id]);
        const xpNum = parseInt(activeProblem.xpVal.replace(/[^0-9]/g, '')) || 20;
        if (earnXp) earnXp(xpNum);
        showToast(`🎉 Problem "${activeProblem.title}" Solved! ${activeProblem.xpVal} Awarded!`);
      } else {
        showToast(`✨ Solution Submitted & Passed!`);
      }
      setActiveProblem(null);
    }, 1000);
  };

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    if (bookmarkedProblemIds.includes(id)) {
      setBookmarkedProblemIds(prev => prev.filter(bId => bId !== id));
      showToast("Removed from bookmarks");
    } else {
      setBookmarkedProblemIds(prev => [...prev, id]);
      showToast("Saved to bookmarks ⭐");
    }
  };

  return (
    <div className={`caWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      <div className="caMainContainer">
        
        {/* ── LEFT SIDEBAR (MATCHING STUDENT DASHBOARD EXACTLY) ── */}
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
                className="sdHomeCircularBtn"
                onClick={() => navigate("/student-home")}
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
                    className={`sdNavItem ${item.id === "code-arena" ? "active" : ""}`}
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
                      else if (item.id === "settings") navigate("/settings");
                      else if (item.id === "code-arena") navigate("/code-arena");
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
            </div>
          </div>
        </aside>

        {/* ── RIGHT MAIN CONTENT AREA ── */}
        <main className="caRightBodyArea">
          
          {/* Header Bar */}
          <header className="caHeaderBar">
            <div className="caHeaderLeftTitle">
              <div className="codeLogoIcon">&lt;/&gt;</div>
              <div>
                <h2>CodeArena</h2>
                <p>Master coding interviews like a pro</p>
              </div>
            </div>

            <div className="caHeaderSearchBox">
              <FaSearch className="searchIcon" />
              <input
                type="text"
                placeholder="Search problems, topics or companies... (Ctrl /)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="caHeaderRightStats">
              <div className="caStreakBadge">
                <FaFire color="#F9572A" /> <span>21 Day Streak</span>
              </div>
              <div className="caXpBadge">
                <FaStar color="#F59E0B" /> <span>{userXp.toLocaleString()} XP</span>
              </div>
              <div className="caNotifBtn" onClick={() => showToast("🔔 3 New Coding Challenges Available!")}>
                <FaBell />
                <span className="notifDot">3</span>
              </div>
              <div className="caUserProfilePill">
                <div className="avatarCircle">👩‍🎓</div>
                <div className="userText">
                  <strong>{userName}</strong>
                  <span>Level {userLevel}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main 2-Column Grid */}
          <div className="caDashboardGrid">
            
            {/* ── LEFT MAIN COLUMN ── */}
            <div className="caCenterCol">
              
              {/* CodeArena Hero Banner */}
              <div className="caHeroBanner">
                <div className="heroTextContent">
                  <h1>CodeArena</h1>
                  <h2>Practice. Compete. Get Hired.</h2>
                  <p>Solve coding challenges from top companies.</p>

                  <div className="heroStatsRow">
                    <span className="heroChip">📦 15,000+ Problems</span>
                    <span className="heroChip">👥 Trusted by 50K+ Students</span>
                  </div>
                </div>

                {/* Floating Brand Logos */}
                <div className="floatingLogosCluster">
                  <div className="logoBubble google">G</div>
                  <div className="logoBubble amazon">a</div>
                  <div className="logoBubble msft">❖</div>
                  <div className="logoBubble adobe">A</div>
                  <div className="logoBubble netflix">N</div>
                </div>

                <div className="heroIllustration">
                  <img src={studentHeroImg} alt="Developer Coding Illustration" />
                </div>
              </div>

              {/* 4 Mini Stat Sparkline Cards */}
              <div className="caStatCardsRow">
                <div className="caStatMiniCard">
                  <div className="statHeader">
                    <span className="iconBox green"><FaCheckCircle /></span>
                    <span className="label">Problems Solved</span>
                  </div>
                  <div className="statVal">187</div>
                  <div className="statSub green">↑ 12 this week</div>
                  <div className="sparklineSvg green">
                    <svg viewBox="0 0 100 20" className="sparkline">
                      <path d="M 0 15 Q 25 5, 50 12 T 100 2" fill="none" stroke="#10B981" strokeWidth="3" />
                    </svg>
                  </div>
                </div>

                <div className="caStatMiniCard">
                  <div className="statHeader">
                    <span className="iconBox orange"><FaFire /></span>
                    <span className="label">Current Streak</span>
                  </div>
                  <div className="statVal">21 Days</div>
                  <div className="statSub orange">Best: 36 days</div>
                  <div className="sparklineSvg orange">
                    <svg viewBox="0 0 100 20" className="sparkline">
                      <path d="M 0 18 Q 30 10, 60 14 T 100 4" fill="none" stroke="#F9572A" strokeWidth="3" />
                    </svg>
                  </div>
                </div>

                <div className="caStatMiniCard">
                  <div className="statHeader">
                    <span className="iconBox purple"><FaBullseye /></span>
                    <span className="label">Interview Readiness</span>
                  </div>
                  <div className="statVal">83%</div>
                  <div className="statSub purple">↑ 7% this week</div>
                  <div className="sparklineSvg purple">
                    <svg viewBox="0 0 100 20" className="sparkline">
                      <path d="M 0 16 Q 20 8, 70 12 T 100 3" fill="none" stroke="#8B5CF6" strokeWidth="3" />
                    </svg>
                  </div>
                </div>

                <div className="caStatMiniCard">
                  <div className="statHeader">
                    <span className="iconBox yellow"><FaStar /></span>
                    <span className="label">XP Earned</span>
                  </div>
                  <div className="statVal">{userXp.toLocaleString()} XP</div>
                  <div className="statSub yellow">↑ 850 this week</div>
                  <div className="sparklineSvg yellow">
                    <svg viewBox="0 0 100 20" className="sparkline">
                      <path d="M 0 14 Q 40 18, 70 6 T 100 1" fill="none" stroke="#F59E0B" strokeWidth="3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Company Based Practice Grid */}
              <div className="caSectionContainer">
                <div className="caSectionHeader">
                  <h3>Company Based Practice</h3>
                  <span className="linkText" onClick={() => setSelectedCompanyFilter("All")}>View All &gt;</span>
                </div>

                <div className="companiesCardsGrid">
                  {companies.map(comp => (
                    <div
                      key={comp.id}
                      className={`companyMiniCard ${selectedCompanyFilter === comp.id ? "selected" : ""}`}
                      onClick={() => {
                        if (selectedCompanyFilter === comp.id) setSelectedCompanyFilter("All");
                        else setSelectedCompanyFilter(comp.id);
                      }}
                    >
                      <div className="compLogoBox">
                        {comp.name === "Google" ? "🔴🟡🟢" : comp.name === "Amazon" ? "📦" : comp.name === "Microsoft" ? "❖" : comp.name === "Adobe" ? "🔺" : comp.name === "Goldman Sachs" ? "🏛️" : comp.name === "Walmart" ? "✳️" : "🔷"}
                      </div>
                      <div className="compText">
                        <strong>{comp.name}</strong>
                        <span>{comp.questions}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Topics Grid */}
              <div className="caSectionContainer">
                <div className="caSectionHeader">
                  <h3>Popular Topics</h3>
                  <span className="linkText" onClick={() => setSelectedTopicFilter("All")}>Explore All Topics &gt;</span>
                </div>

                <div className="topicsGrid2x5">
                  {topics.map(top => (
                    <div
                      key={top.id}
                      className={`topicCard ${selectedTopicFilter === top.id ? "selected" : ""}`}
                      onClick={() => {
                        if (selectedTopicFilter === top.id) setSelectedTopicFilter("All");
                        else setSelectedTopicFilter(top.id);
                      }}
                    >
                      <div className="topicTopRow">
                        <div className="topicIconBox" style={{ color: top.color }}>{top.icon}</div>
                        <div className="topicTitleBlock">
                          <h4>{top.title}</h4>
                          <span>{top.questions}</span>
                        </div>
                      </div>
                      <div className="topicProgressTrack">
                        <div className="topicProgressFill" style={{ width: `${top.pct}%`, background: top.color }}></div>
                      </div>
                      <div className="topicBottomRow">
                        <span className="pctLabel">{top.pct}%</span>
                        <span className="xpBadgeLabel" style={{ color: top.color }}>{top.xpVal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* All Problems Table & Filters */}
              <div className="caSectionContainer">
                <div className="caSectionHeader">
                  <h3>All Problems</h3>
                </div>

                {/* Filter Controls Bar */}
                <div className="problemsFilterBar">
                  <div className="diffPillsRow">
                    {["All", "Easy", "Medium", "Hard"].map(diff => (
                      <button
                        key={diff}
                        className={`diffPill ${selectedDifficulty === diff ? "active " + diff.toLowerCase() : ""}`}
                        onClick={() => setSelectedDifficulty(diff)}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>

                  <div className="dropdownFiltersRow">
                    <select
                      value={selectedCompanyFilter}
                      onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                      className="filterSelect"
                    >
                      <option value="All">All Companies</option>
                      {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>

                    <select
                      value={selectedTopicFilter}
                      onChange={(e) => setSelectedTopicFilter(e.target.value)}
                      className="filterSelect"
                    >
                      <option value="All">All Topics</option>
                      {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                    </select>

                    <button className="iconFilterBtn" onClick={() => showToast("⭐ Filtered by Bookmarks")}>
                      <FaBookmark />
                    </button>
                  </div>
                </div>

                {/* Problems Table */}
                <div className="problemsTableWrapper">
                  <table className="problemsTable">
                    <thead>
                      <tr>
                        <th style={{ width: "40px" }}>#</th>
                        <th>Problem</th>
                        <th>Company</th>
                        <th>Difficulty</th>
                        <th>XP</th>
                        <th>Acceptance</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "right" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProblems.map((prob) => {
                        const isSolved = solvedProblemIds.includes(prob.id);
                        const isBookmarked = bookmarkedProblemIds.includes(prob.id);

                        return (
                          <tr key={prob.id} className={isSolved ? "rowSolved" : ""}>
                            <td className="colNum">{prob.id}</td>
                            <td className="colTitle">
                              <div className="probTitleFlex">
                                <strong>{prob.title}</strong>
                                <span
                                  className={`starIcon ${isBookmarked ? "active" : ""}`}
                                  onClick={(e) => toggleBookmark(prob.id, e)}
                                >
                                  {isBookmarked ? "★" : "☆"}
                                </span>
                              </div>
                            </td>
                            <td className="colCompany">
                              <span className="companyChip">{prob.company}</span>
                            </td>
                            <td className="colDiff">
                              <span className={`diffTag ${prob.difficulty.toLowerCase()}`}>
                                {prob.difficulty}
                              </span>
                            </td>
                            <td className="colXp">
                              <span className="xpTag">{prob.xpVal}</span>
                            </td>
                            <td className="colAcc">
                              <div className="accFlex">
                                <span>{prob.acceptance}</span>
                                <div className="miniBarTrack">
                                  <div className="miniBarFill" style={{ width: prob.acceptance }}></div>
                                </div>
                              </div>
                            </td>
                            <td className="colStatus" style={{ textAlign: "center" }}>
                              {isSolved ? (
                                <span className="solvedCheck">✓</span>
                              ) : (
                                <span className="unsolvedDot">○</span>
                              )}
                            </td>
                            <td className="colAction" style={{ textAlign: "right" }}>
                              <button
                                className="btnSolveAction"
                                onClick={() => openProblemSolver(prob)}
                              >
                                Solve →
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>

            {/* ── RIGHT SIDEBAR WIDGETS COLUMN ── */}
            <div className="caRightCol">
              
              {/* 1. Weekly Contest Card */}
              <div className="caWidgetCard contestCard">
                <div className="widgetHeaderRow">
                  <span className="trophyHeaderIcon"><FaTrophy color="#F59E0B" /></span>
                  <h4>Weekly Contest</h4>
                </div>

                <div className="contestTitleBox">
                  <h5>CodeSprint 113</h5>
                  <p>📅 Sat, 25 May 2025</p>
                  <p>🕒 08:00 PM - 10:00 PM IST</p>
                </div>

                <button
                  className={`btnRegisterContest ${isContestRegistered ? "registered" : ""}`}
                  onClick={() => {
                    setIsContestRegistered(true);
                    showToast("🎉 Registered for CodeSprint 113 Contest!");
                  }}
                >
                  {isContestRegistered ? "✓ Registered" : "Register Now"}
                </button>

                <div className="seeHistoryLink" onClick={() => showToast("📜 Contest History Loaded!")}>
                  See Contest History &gt;
                </div>
              </div>

              {/* 2. Coding Streak Calendar Card */}
              <div className="caWidgetCard">
                <div className="widgetHeaderRow">
                  <span className="fireHeaderIcon"><FaFire color="#F9572A" /></span>
                  <h4>Coding Streak</h4>
                  <span className="monthTag">May 2025 &gt;</span>
                </div>

                <div className="streakCalendarGrid">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, dIdx) => (
                    <span key={dIdx} className="dayHead">{day}</span>
                  ))}
                  {[...Array(31)].map((_, i) => {
                    const dayNum = i + 1;
                    const isStreakDay = [5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 26, 27].includes(dayNum);
                    return (
                      <div
                        key={dayNum}
                        className={`calDayNum ${isStreakDay ? "streakActive" : ""}`}
                      >
                        {dayNum}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Your Rank Widget Card */}
              <div className="caWidgetCard">
                <div className="widgetHeaderRow">
                  <h4>Your Rank</h4>
                  <span className="viewRankLink" onClick={() => navigate("/progress")}>View Leaderboard &gt;</span>
                </div>

                <div className="rankList">
                  <div className="rankRowItem">
                    <div className="rankLeft">
                      <span className="rankIcon">🌐</span>
                      <span>Global Rank</span>
                    </div>
                    <strong className="rankVal">#6,248</strong>
                  </div>

                  <div className="rankRowItem">
                    <div className="rankLeft">
                      <span className="rankIcon">🏛️</span>
                      <span>College Rank</span>
                    </div>
                    <strong className="rankVal">#18</strong>
                  </div>

                  <div className="rankRowItem">
                    <div className="rankLeft">
                      <span className="rankIcon">👥</span>
                      <span>Friends Rank</span>
                    </div>
                    <strong className="rankVal">#2</strong>
                  </div>
                </div>
              </div>

              {/* 4. Today's Challenge Widget */}
              <div className="caWidgetCard challengeCard">
                <div className="widgetHeaderRow">
                  <span className="targetIcon"><FaBullseye color="#F9572A" /></span>
                  <h4>Today's Challenge</h4>
                </div>

                <div className="challengeBodyBox">
                  <h5>Longest Consecutive Sequence</h5>
                  <div className="challengeTags">
                    <span className="diffTag medium">Medium</span>
                    <span className="xpBadge">+75 XP</span>
                  </div>
                  <div className="targetCircleGraphic">🎯</div>
                </div>

                <button
                  className="btnSolveChallenge"
                  onClick={() => openProblemSolver({
                    id: 99,
                    title: "Longest Consecutive Sequence",
                    company: "Amazon",
                    difficulty: "Medium",
                    xpVal: "+75 XP",
                    acceptance: "48.2%",
                    desc: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.",
                    starterCode: `function longestConsecutive(nums) {\n  const set = new Set(nums);\n  let max = 0;\n  for (let num of set) {\n    if (!set.has(num - 1)) {\n      let curr = num;\n      let count = 1;\n      while (set.has(curr + 1)) {\n        curr++;\n        count++;\n      }\n      max = Math.max(max, count);\n    }\n  }\n  return max;\n}`
                  })}
                >
                  Solve Challenge →
                </button>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* ── FLOATING TOAST NOTIFICATION ── */}
      {toastMsg && (
        <div className="caToastBanner">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ── INTERACTIVE PROBLEM SOLVER IDE MODAL ── */}
      {activeProblem && (
        <div className="caModalOverlay" onClick={() => setActiveProblem(null)}>
          <div className="caModalIdeContent" onClick={(e) => e.stopPropagation()}>
            {/* Modal Top Header */}
            <div className="ideModalHeader">
              <div className="ideTitleRow">
                <span className="codeIcon">&lt;/&gt;</span>
                <h3>{activeProblem.title}</h3>
                <span className={`diffTag ${activeProblem.difficulty.toLowerCase()}`}>{activeProblem.difficulty}</span>
                <span className="xpTag">{activeProblem.xpVal}</span>
              </div>
              <button className="modalCloseBtn" onClick={() => setActiveProblem(null)}>✕</button>
            </div>

            {/* Modal IDE Grid */}
            <div className="ideGridContainer">
              {/* Left Statement Panel */}
              <div className="ideStatementCol">
                <h4>Problem Description</h4>
                <p className="probDescText">{activeProblem.desc}</p>

                <div className="exampleBox">
                  <strong>Example 1:</strong>
                  <pre>Input: nums = [2,7,11,15], target = 9{"\n"}Output: [0,1]{"\n"}Explanation: nums[0] + nums[1] == 9, return [0, 1].</pre>
                </div>

                <div className="constraintsBox">
                  <strong>Constraints:</strong>
                  <ul>
                    <li>2 &lt;= nums.length &lt;= 10^4</li>
                    <li>-10^9 &lt;= nums[i] &lt;= 10^9</li>
                    <li>-10^9 &lt;= target &lt;= 10^9</li>
                  </ul>
                </div>
              </div>

              {/* Right Code Editor Panel */}
              <div className="ideEditorCol">
                <div className="editorHeader">
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="langSelect"
                  >
                    <option value="JavaScript">JavaScript (ES6)</option>
                    <option value="Python">Python 3.10</option>
                    <option value="Java">Java 17</option>
                    <option value="C++">C++ 20</option>
                  </select>

                  <div className="ideActionsRow">
                    <button className="btnRunTests" onClick={handleRunCode} disabled={isExecuting}>
                      {isExecuting ? "Executing..." : "▶ Run Tests"}
                    </button>
                    <button className="btnSubmitSolution" onClick={handleSubmitSolution} disabled={isExecuting}>
                      {isExecuting ? "Submitting..." : "Submit Solution →"}
                    </button>
                  </div>
                </div>

                <textarea
                  className="codeEditorTextarea"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="Write your code solution here..."
                />

                {testOutput && (
                  <div className="testOutputPanel">
                    <div className="outputHeader">
                      <span className="statusSuccess">✓ {testOutput.status}</span>
                      <span>Runtime: {testOutput.runtime} • Memory: {testOutput.memory}</span>
                    </div>
                    <pre className="outputLogs">{testOutput.details}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <StudentFooter />
    </div>
  );
}
