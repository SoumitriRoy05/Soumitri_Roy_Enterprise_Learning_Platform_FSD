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
  FaCode,
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
  FaExternalLinkAlt,
  FaBuilding,
  FaGlobe,
  FaMapMarkerAlt,
  FaUserCheck,
  FaFolderOpen,
  FaRegClock,
  FaTimes
} from "react-icons/fa";

import "../styles/studentDashboard.css";
import "../styles/opportunityFeedPage.css";

export default function OpportunityFeedPage() {
  const { user, xp, themeMode, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";

  const [activeTab, setActiveTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [expFilter, setExpFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [showAllHackathons, setShowAllHackathons] = useState(false);
  const [showAllInternships, setShowAllInternships] = useState(false);
  const [showAllPlacements, setShowAllPlacements] = useState(false);

  const [myApplicationsModal, setMyApplicationsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [appliedList, setAppliedList] = useState([
    { title: "Microsoft - Software Development Intern", date: "20 May 2025", status: "In Review" },
    { title: "Smart India Hackathon 2025", date: "18 May 2025", status: "Submitted" },
    { title: "TCS - Digital | Ninja", date: "15 May 2025", status: "Applied" }
  ]);

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

  const hackathonsData = [
    {
      id: "h1",
      title: "Smart India Hackathon 2025",
      isFeatured: true,
      badgeText: "National Level",
      dates: "Jul 15 - Sep 30, 2025",
      description: "Solve real-world problems and build innovative solutions for a better India.",
      tags: ["🌐 Online", "👥 Team (2-6)"],
      bannerClass: "sihBanner",
      bannerLogo: "🇮🇳",
      applyUrl: "https://sih.gov.in/"
    },
    {
      id: "h2",
      title: "Cohort Hack 2.0",
      prizeText: "₹ 2 Lakh+ Prizes",
      dates: "Jun 20 - Jul 20, 2025",
      description: "Build scalable solutions in Web3, AI and Blockchain.",
      tags: ["🌐 Online", "👥 Team (1-4)"],
      bannerClass: "cohortBanner",
      bannerLogo: "🟩",
      applyUrl: "https://devfolio.co/hackathons"
    },
    {
      id: "h3",
      title: "MLH Local Hack Day",
      badgeText: "Global Event",
      dates: "May 31 - Jun 1, 2025",
      description: "Collaborate locally. Build globally. One day. Infinite impact.",
      tags: ["📍 Offline", "👥 Team (1-4)"],
      bannerClass: "mlhBanner",
      bannerLogo: "⚡",
      applyUrl: "https://localhackday.mlh.io/"
    },
    {
      id: "h4",
      title: "HackWithIndia 3.0",
      prizeText: "₹ 5 Lakh+ Prizes",
      dates: "Aug 10 - Aug 12, 2025",
      description: "India's largest open innovation hackathon. Build for social impact with AI, IoT & Cloud.",
      tags: ["🌐 Online", "👥 Team (1-5)"],
      bannerClass: "hwiaBanner",
      bannerLogo: "🇮🇳",
      applyUrl: "https://hackwithindia.com/"
    }
  ];

  const internshipsData = [
    {
      id: "i1",
      title: "Software Development Intern",
      company: "Microsoft",
      location: "Bangalore, India",
      isVerified: true,
      tags: ["On-site", "Full-time", "Summer 2025"],
      description: "Work on real-world products with a team of world-class engineers.",
      deadline: "10 Jun 2025",
      stipend: "₹50K / Month",
      logoBg: "#0078D4",
      logoText: "❖",
      applyUrl: "https://careers.microsoft.com/"
    },
    {
      id: "i2",
      title: "STEP Intern 2025",
      company: "Google",
      location: "Hyderabad, India",
      isVerified: true,
      tags: ["Hybrid", "Internship", "Summer 2025"],
      description: "Solve challenging problems and scale technologies used by billions.",
      deadline: "15 Jun 2025",
      stipend: "₹60K / Month",
      logoBg: "#EA4335",
      logoText: "G",
      applyUrl: "https://careers.google.com/students/"
    },
    {
      id: "i3",
      title: "Backend Intern",
      company: "PhonePe",
      location: "Bangalore, India",
      isVerified: true,
      tags: ["On-site", "Full-time", "Summer 2025"],
      description: "Build secure, reliable and scalable backend systems.",
      deadline: "12 Jun 2025",
      stipend: "₹45K / Month",
      logoBg: "#5F259F",
      logoText: "Pe",
      applyUrl: "https://www.naukri.com/phonepe-jobs"
    },
    {
      id: "i4",
      title: "Data Science Intern",
      company: "Amazon",
      location: "Chennai, India",
      isVerified: true,
      tags: ["Hybrid", "Full-time", "Summer 2025"],
      description: "Leverage big data and ML to build insights that power millions of customer decisions.",
      deadline: "20 Jun 2025",
      stipend: "₹55K / Month",
      logoBg: "#FF9900",
      logoText: "a",
      applyUrl: "https://www.amazon.jobs/en/teams/internships-for-students"
    }
  ];

  const placementsData = [
    {
      id: "p1",
      company: "Tata Consultancy Services",
      role: "Digital | Ninja",
      eligibility: "B.Tech, MCA",
      location: "Across India",
      ctc: "CTC 7 LPA",
      deadline: "30 Jun 2025",
      logoBg: "#004B87",
      logoText: "tcs",
      applyUrl: "https://nextstep.tcs.com/campus/"
    },
    {
      id: "p2",
      company: "Infosys",
      role: "Systems Engineer",
      eligibility: "B.Tech, MCA",
      location: "Across India",
      ctc: "CTC 6.5 LPA",
      deadline: "25 Jun 2025",
      logoBg: "#007CC3",
      logoText: "Infosys",
      applyUrl: "https://www.naukri.com/infosys-jobs"
    },
    {
      id: "p3",
      company: "Wipro",
      role: "Project Engineer",
      eligibility: "B.Tech, MCA",
      location: "Across India",
      ctc: "CTC 5 LPA",
      deadline: "28 Jun 2025",
      logoBg: "#006699",
      logoText: "wipro",
      applyUrl: "https://www.naukri.com/wipro-jobs"
    },
    {
      id: "p4",
      company: "Cognizant",
      role: "Programmer Analyst Trainee",
      eligibility: "B.Tech, MCA, BCA",
      location: "Across India",
      ctc: "CTC 4.5 LPA",
      deadline: "05 Jul 2025",
      logoBg: "#1A4788",
      logoText: "CTS",
      applyUrl: "https://careers.cognizant.com/"
    }
  ];

  // Derived display data – show 4 by default, all when expanded
  const displayedHackathons = showAllHackathons ? hackathonsData : hackathonsData.slice(0, 4);
  const displayedInternships = showAllInternships ? internshipsData : internshipsData.slice(0, 4);
  const displayedPlacements = showAllPlacements ? placementsData : placementsData.slice(0, 4);

  const handleApplyClick = (title, url) => {
    // Open real Naukri/official portal link in new tab
    window.open(url, "_blank", "noopener,noreferrer");

    // Record application in user state
    if (!appliedList.some(item => item.title === title)) {
      setAppliedList(prev => [
        { title, date: new Date().toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }), status: "Applied" },
        ...prev
      ]);
    }

    setToastMessage(`Opening official application page for "${title}"! Application recorded.`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className={`ofpWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      {/* Main Grid Container */}
      <div className="ofpMainContainer">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="ofpLeftSidebar">
          <div>
            <Link to="/" className="sdBrandLogo">
              <span className="logoHex">⬢</span>
              <span>SkillSphere</span>
            </Link>

            <div className="ofpSidebarHomeArchHeader">
              <div className="ofpArchLine" />
              <button
                className="ofpHomeCircularBtn active"
                onClick={() => navigate("/opportunity-feed")}
                title="Opportunity Feed"
              >
                <FaRocket />
              </button>
            </div>

            <ul className="sdNavList">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sdNavItem ${item.id === "opportunity-feed" ? "active" : ""}`}
                    onClick={() => {
                      if (item.id === "dashboard") navigate("/student-home");
                      else if (item.id === "courses") navigate("/courses");
                      else if (item.id === "learning-paths") navigate("/learning-paths");
                      else if (item.id === "assignments") navigate("/assignments");
                      else if (item.id === "discussions") navigate("/discussions");
                      else if (item.id === "ai-buddy") navigate("/ai-buddy");
                      else if (item.id === "badges") navigate("/badges");
                      else if (item.id === "progress") navigate("/progress");
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
        <div className="ofpRightBodyArea">
          
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

          {/* Page Heading & My Applications Action */}
          <div className="ofpPageHeaderRow">
            <div className="ofpPageHeader">
              <h1>Opportunity Feed 🚀</h1>
              <p>Discover and apply to hackathons, internships & placement opportunities.</p>
            </div>

            <button className="btnMyApplications" onClick={() => setMyApplicationsModal(true)}>
              <FaFolderOpen /> My Applications
            </button>
          </div>

          {/* Toast Message Notification */}
          {toastMessage && (
            <div className="ofpToastNotification">
              <span>{toastMessage}</span>
            </div>
          )}

          {/* 2-Column Workspace Grid */}
          <div className="ofpGridContainer">
            
            {/* Center Main Column */}
            <div className="ofpCenterColumn">
              
              {/* Filter Tabs Bar (Row 1) */}
              <div className="ofpFilterTabsRow">
                <button
                  className={`ofpTab ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => setActiveTab("all")}
                >
                  All Opportunities <span className="tabBadge">23 New</span>
                </button>
                <button
                  className={`ofpTab ${activeTab === "hackathons" ? "active" : ""}`}
                  onClick={() => setActiveTab("hackathons")}
                >
                  Hackathons <span className="tabBadge">8 New</span>
                </button>
                <button
                  className={`ofpTab ${activeTab === "internships" ? "active" : ""}`}
                  onClick={() => setActiveTab("internships")}
                >
                  Internships <span className="tabBadge">9 New</span>
                </button>
                <button
                  className={`ofpTab ${activeTab === "placements" ? "active" : ""}`}
                  onClick={() => setActiveTab("placements")}
                >
                  Placements <span className="tabBadge">6 New</span>
                </button>
              </div>

              {/* Dropdown Filters Bar (Row 2) */}
              <div className="ofpDropdownFiltersRow">
                <select
                  className="ofpSelect"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">🌐 All Categories</option>
                  <option value="webdev">Web Development</option>
                  <option value="ai">AI / Machine Learning</option>
                  <option value="data">Data Science</option>
                </select>

                <select
                  className="ofpSelect"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="all">📍 All Locations</option>
                  <option value="online">Online / Remote</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="hyderabad">Hyderabad</option>
                </select>

                <select
                  className="ofpSelect"
                  value={expFilter}
                  onChange={(e) => setExpFilter(e.target.value)}
                >
                  <option value="all">🎓 Experience Level</option>
                  <option value="student">Student / Fresher</option>
                  <option value="intermediate">1-2 Years</option>
                </select>

                <select
                  className="ofpSelect"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">⚡ Sort by: Newest</option>
                  <option value="deadline">Sort by: Deadline</option>
                </select>

                <span
                  className="clearFiltersLink"
                  onClick={() => {
                    setCategoryFilter("all");
                    setLocationFilter("all");
                    setExpFilter("all");
                    setSortBy("newest");
                    setActiveTab("all");
                    setShowAllHackathons(false);
                    setShowAllInternships(false);
                    setShowAllPlacements(false);
                  }}
                >
                  ✕ Clear Filters
                </span>
              </div>

              {/* ── SECTION 1: 🔥 HACKATHONS ── */}
              {(activeTab === "all" || activeTab === "hackathons") && (
                <div className="ofpSectionBlock">
                  <div className="sectionTitleRow">
                    <h3>🔥 Hackathons</h3>
                    <span
                      className="viewAllLink"
                      onClick={() => {
                        setShowAllHackathons(prev => !prev);
                        setActiveTab("hackathons");
                      }}
                    >
                      {showAllHackathons ? "Show Less" : `View All (${hackathonsData.length})`}
                    </span>
                  </div>

                  <div className="hackathonsGrid">
                    {displayedHackathons.map((h) => (
                      <div key={h.id} className="hackathonCard">
                        <div className={`hackathonBanner ${h.bannerClass}`}>
                          {h.isFeatured && <span className="featuredBadge">Featured</span>}
                          {h.badgeText && <span className="levelPill">{h.badgeText}</span>}
                          {h.prizeText && <span className="prizePill">{h.prizeText}</span>}

                          <div className="bannerLogo">{h.bannerLogo}</div>
                          <h4>{h.title}</h4>
                        </div>

                        <div className="hackathonBody">
                          <h4>{h.title}</h4>
                          <span className="dateSub text-muted">📅 {h.dates}</span>
                          <p className="descText">{h.description}</p>

                          <div className="tagsRow">
                            {h.tags.map((t, idx) => (
                              <span key={idx} className="tagPill">{t}</span>
                            ))}
                          </div>

                          <div className="cardFooterRow">
                            <button
                              className="btnApplyNowOutline"
                              onClick={() => handleApplyClick(h.title, h.applyUrl)}
                            >
                              Apply Now →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SECTION 2: 💼 INTERNSHIPS ── */}
              {(activeTab === "all" || activeTab === "internships") && (
                <div className="ofpSectionBlock">
                  <div className="sectionTitleRow">
                    <h3>💼 Internships</h3>
                    <span
                      className="viewAllLink"
                      onClick={() => {
                        setShowAllInternships(prev => !prev);
                        setActiveTab("internships");
                      }}
                    >
                      {showAllInternships ? "Show Less" : `View All (${internshipsData.length})`}
                    </span>
                  </div>

                  <div className="internshipsGrid">
                    {displayedInternships.map((intern) => (
                      <div key={intern.id} className="internshipCard">
                        
                        <div className="internHeader">
                          <div
                            className="compLogoBadge"
                            style={{ background: intern.logoBg }}
                          >
                            {intern.logoText}
                          </div>
                          {intern.isVerified && <span className="verifiedGreenTag">Verified</span>}
                        </div>

                        <div className="internBody">
                          <h4>{intern.title}</h4>
                          <span className="companySub">{intern.company} • {intern.location}</span>

                          <div className="internChipsRow">
                            {intern.tags.map((t, idx) => (
                              <span key={idx} className="chip">{t}</span>
                            ))}
                          </div>

                          <p className="descP">{intern.description}</p>

                          <div className="internFooter">
                            <div className="footerMeta">
                              <span>Apply by {intern.deadline}</span>
                              <strong>💰 {intern.stipend}</strong>
                            </div>

                            <button
                              className="btnApplyNowOutline"
                              onClick={() => handleApplyClick(`${intern.company} - ${intern.title}`, intern.applyUrl)}
                            >
                              Apply Now →
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SECTION 3: 🎯 PLACEMENTS ── */}
              {(activeTab === "all" || activeTab === "placements") && (
                <div className="ofpSectionBlock">
                  <div className="sectionTitleRow">
                    <h3>🎯 Placements</h3>
                    <span
                      className="viewAllLink"
                      onClick={() => {
                        setShowAllPlacements(prev => !prev);
                        setActiveTab("placements");
                      }}
                    >
                      {showAllPlacements ? "Show Less" : `View All (${placementsData.length})`}
                    </span>
                  </div>

                  <div className="placementsTableCard">
                    <table className="placementsTable">
                      <tbody>
                        {displayedPlacements.map((p) => (
                          <tr key={p.id}>
                            <td>
                              <div className="compTableCell">
                                <div
                                  className="compLogoSquare"
                                  style={{ background: p.logoBg }}
                                >
                                  {p.logoText}
                                </div>
                                <div>
                                  <strong>{p.company}</strong>
                                  <span className="roleSub">{p.role}</span>
                                </div>
                              </div>
                            </td>

                            <td className="eligibilityCell">{p.eligibility}</td>
                            <td className="locCell">📍 {p.location}</td>
                            <td className="ctcCell"><strong>{p.ctc}</strong></td>
                            <td className="deadlineCell">Apply by {p.deadline}</td>

                            <td>
                              <button
                                className="btnApplyNowOutline"
                                onClick={() => handleApplyClick(`${p.company} - ${p.role}`, p.applyUrl)}
                              >
                                Apply Now
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Bottom Center Button */}
              <div className="ofpBottomActionRow">
                <button
                  className="btnViewMoreOpps"
                  onClick={() => {
                    setActiveTab("all");
                    setShowAllHackathons(true);
                    setShowAllInternships(true);
                    setShowAllPlacements(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {(showAllHackathons && showAllInternships && showAllPlacements)
                    ? "✓ All Opportunities Shown"
                    : "View More Opportunities →"}
                </button>
              </div>

            </div>

            {/* ── RIGHT COLUMN SIDEBAR WIDGETS ── */}
            <div className="ofpRightSidebar">
              
              {/* Opportunity Summary Donut Chart Widget */}
            {/*  <div className="ofpWidgetCard">
                <h4>📊 Opportunity Summary</h4>

                <div className="summaryDonutContainer">
                  <svg className="summaryDonutSvg" viewBox="0 0 100 100">
                    <circle className="donutSegment orange" cx="50" cy="50" r="38" strokeDasharray="70 200" strokeDashoffset="0" />
                    <circle className="donutSegment green" cx="50" cy="50" r="38" strokeDasharray="80 200" strokeDashoffset="-75" />
                    <circle className="donutSegment blue" cx="50" cy="50" r="38" strokeDasharray="50 200" strokeDashoffset="-160" />
                  </svg>
                  <div className="donutCenterText">
                    <strong>23</strong>
                    <span>Total</span>
                  </div>
                </div>

                <div className="summaryLegendList">
                  <div className="legendRow"><span className="dot orange"></span> Hackathons <strong>8</strong></div>
                  <div className="legendRow"><span className="dot green"></span> Internships <strong>9</strong></div>
                  <div className="legendRow"><span className="dot blue"></span> Placements <strong>6</strong></div>
                </div>

                <div className="progressSubLink" onClick={() => setMyApplicationsModal(true)}>
                  {appliedList.length} Applications in progress →
                </div>
              </div>

            {/* Recommended For You Widget */}
           {/*   <div className="ofpWidgetCard">
                <div className="widgetTitleRow">
                  <h4>🚀 Recommended For You</h4>
                </div>

                <div className="recList">
                  <div className="recItem">
                    <div className="rIcon blue">D</div>
                    <div className="rInfo">
                      <h5>Devfolio Hackathon</h5>
                      <span>AI/ML • Online</span>
                    </div>
                    <span className="badgeNew">New</span>
                  </div>

                  <div className="recItem">
                    <div className="rIcon yellow">🛒</div>
                    <div className="rInfo">
                      <h5>Flipkart Grid 6.0</h5>
                      <span>SDE Intern • Bangalore</span>
                    </div>
                    <span className="badgeNew">New</span>
                  </div>

                  <div className="recItem">
                    <div className="rIcon purple">a</div>
                    <div className="rInfo">
                      <h5>Accenture ASE</h5>
                      <span>Entry Level • Pan India</span>
                    </div>
                    <span className="badgeNew">New</span>
                  </div>
                </div>

                <span className="viewAllRecsLink">View All Recommendations →</span>
              </div>
*/}
              {/* Never Miss An Opportunity Widget */}
           {/*   <div className="ofpWidgetCard">
                <h4>⏰ Never Miss An Opportunity</h4>
                <p className="subP">Enable notifications and be the first to know about new openings.</p>

                <button className="btnEnableNotifs">
                  🔔 Enable Notifications
                </button>
              </div>*/}

              {/* Trending Skills Widget */}
            {/*  <div className="ofpWidgetCard">
                <h4>🔥 Trending Skills</h4>

                <div className="skillsChipsGrid">
                  <span className="sChip">React.js</span>
                  <span className="sChip">Python</span>
                  <span className="sChip">Machine Learning</span>
                  <span className="sChip">Node.js</span>
                  <span className="sChip">Data Science</span>
                  <span className="sChip">UI/UX</span>
                </div>

                <span className="explorePathsLink" onClick={() => navigate("/learning-paths")}>
                  Explore Learning Paths →
                </span>
              </div>*/}

              {/* Host a Hackathon Banner Widget (Dark Gradient Box) */}
             {/* <div className="hostHackathonBanner">
                <div>
                  <h5>Host a Hackathon?</h5>
                  <p>Partner with SkillSphere and reach 50K+ student developers.</p>
                  <button className="btnPartnerWithUs">Partner With Us →</button>
                </div>
                <div className="trophyGraphic">🏆</div>
              </div>
*/}
            </div>
            
          </div>

        </div>
      </div>

      {/* My Applications Modal */}
      {myApplicationsModal && (
        <div className="modalOverlay" onClick={() => setMyApplicationsModal(false)}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>📋 My Applications</h3>
              <button className="modalCloseBtn" onClick={() => setMyApplicationsModal(false)}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <ul className="appliedList">
                {appliedList.map((item, idx) => (
                  <li key={idx} className="appliedItem">
                    <div>
                      <strong>{item.title}</strong>
                      <span className="appDate">{item.date}</span>
                    </div>
                    <span className="appStatus">{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <FloatingChatbot />
      <StudentFooter />
    </div>
  );
}
