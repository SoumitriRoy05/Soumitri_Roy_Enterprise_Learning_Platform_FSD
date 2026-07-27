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
  FaCheckCircle,
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaCalendarAlt,
  FaDownload,
  FaLinkedin,
  FaShareAlt,
  FaLock,
  FaCheck,
  FaChevronRight,
  FaShieldAlt,
  FaUserCheck,
  FaRegCheckCircle,
  FaTimes,
  FaSignOutAlt
} from "react-icons/fa";

import "../styles/studentDashboard.css";
import "../styles/certificatesPage.css";

export default function CertificatesPage() {
  const { user, xp, logout, themeMode, toggleTheme, completedTopics } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";
  const [activeTab, setActiveTab] = useState("overview");
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

  const allCertificateDefs = [
    {
      id: 1,
      topicPrefix: "node_",
      title: "Node.js Development",
      module: "Module 4 of 5",
      logoText: "🟩",
      logoBg: "#052E16",
      path: "Fullstack Web Development",
      instructor: "Hitesh Choudhary",
      credentialId: "SS-25-05-NODE4-12345",
      unlockReq: "Complete 100% of Node.js course to unlock"
    },
    {
      id: 2,
      topicPrefix: "react_",
      title: "React Development",
      module: "Module 3 of 5",
      logoText: "⚛️",
      logoBg: "#082F49",
      path: "Fullstack Web Development",
      instructor: "Hitesh Choudhary",
      credentialId: "SS-25-05-REACT3-88910",
      unlockReq: "Complete 100% of React course to unlock"
    },
    {
      id: 3,
      topicPrefix: "js_",
      title: "JavaScript Essentials",
      module: "Module 2 of 5",
      logoText: "JS",
      logoBg: "#FEF08A",
      logoColor: "#CA8A04",
      path: "Fullstack Web Development",
      instructor: "Hitesh Choudhary",
      credentialId: "SS-25-04-JS2-44512",
      unlockReq: "Complete 100% of JS course to unlock"
    },
    {
      id: 4,
      topicPrefix: "python_",
      title: "Python Data Science",
      module: "Module 2 of 8",
      logoText: "🐍",
      logoBg: "#172554",
      path: "Data Science with Python",
      instructor: "Dr. Angela Yu",
      credentialId: "SS-25-04-PY2-99812",
      unlockReq: "Complete 100% of Python course to unlock"
    },
    {
      id: 5,
      topicPrefix: "uiux_",
      title: "Figma UI/UX Masterclass",
      module: "Module 1 of 5",
      logoText: "🎨",
      logoBg: "#FAF8F5",
      path: "UI/UX Design Masterclass",
      instructor: "Dan Walter",
      credentialId: "SS-25-03-UI1-33412",
      unlockReq: "Complete 100% of UI/UX course to unlock"
    },
    {
      id: 6,
      topicPrefix: "dsa_",
      title: "Data Structures & Algorithms",
      module: "Module 1 of 6",
      logoText: "📊",
      logoBg: "#E0F2FE",
      path: "FAANG Coding Interview",
      instructor: "Kunal Kushwaha",
      credentialId: "SS-25-03-DSA-77123",
      unlockReq: "Complete 100% of DSA course to unlock"
    }
  ];

  const userCompletedTopics = completedTopics || [];

  const processedCerts = allCertificateDefs.map(cert => {
    const topicsDone = userCompletedTopics.filter(t => t.startsWith(cert.topicPrefix)).length;
    const isEarned = topicsDone >= 6;
    return {
      ...cert,
      isEarned,
      progress: isEarned ? 100 : Math.round((topicsDone / 6) * 100),
      displayDate: isEarned ? "Completed" : "Locked",
      date: isEarned ? "Verified" : cert.unlockReq
    };
  });

  const earnedCertificates = processedCerts.filter(c => c.isEarned);
  const certificatesToEarn = processedCerts.filter(c => !c.isEarned);

  // Active Selected Certificate for Preview
  const defaultCert = earnedCertificates[0] || certificatesToEarn[0] || processedCerts[0];
  const [selectedCert, setSelectedCert] = useState(defaultCert);

  // PNG Certificate Download Generator using HTML5 Canvas
  const handleDownloadPNG = (certToDownload) => {
    const cert = certToDownload || selectedCert;

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");

    // Background Parchment Fill
    ctx.fillStyle = "#FFFDF9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Outer Border
    ctx.strokeStyle = "#FDE8CD";
    ctx.lineWidth = 20;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Inner Dashed Border
    ctx.strokeStyle = "#FAD6C8";
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 8]);
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    ctx.setLineDash([]); // Reset line dash

    // Header Logo & Brand
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#F9572A";
    ctx.textAlign = "center";
    ctx.fillText("⬢ SkillSphere", canvas.width / 2, 120);

    // Certificate Title
    ctx.font = "bold 44px serif";
    ctx.fillStyle = "#1E1B18";
    ctx.fillText("CERTIFICATE OF COMPLETION", canvas.width / 2, 200);

    // Subtitle
    ctx.font = "italic 22px sans-serif";
    ctx.fillStyle = "#64748B";
    ctx.fillText("This is to certify that", canvas.width / 2, 260);

    // Recipient Name
    ctx.font = "italic bold 64px Georgia, serif";
    ctx.fillStyle = "#78350F";
    ctx.fillText(userName, canvas.width / 2, 350);

    // Course Title & Path
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#475569";
    ctx.fillText(`has successfully completed the ${cert.title} - ${cert.module}`, canvas.width / 2, 430);
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#94A3B8";
    ctx.fillText(`as part of the ${cert.path}`, canvas.width / 2, 470);

    // Gold Seal Ribbon
    ctx.font = "60px sans-serif";
    ctx.fillText("🏵️", canvas.width / 2, 570);

    // Footer Dates & Signatures
    ctx.font = "bold 20px sans-serif";
    ctx.fillStyle = "#1E1B18";
    ctx.textAlign = "left";
    ctx.fillText(`Date: ${cert.date || "20 May 2025"}`, 120, 680);

    ctx.textAlign = "right";
    ctx.fillText("Academic Director: Hitesh Choudhary", canvas.width - 120, 680);

    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#94A3B8";
    ctx.textAlign = "left";
    ctx.fillText(`Credential ID: ${cert.credentialId || "SS-25-05-NODE4-12345"}`, 120, 720);

    // Trigger PNG Download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `SkillSphere_Certificate_${cert.title.replace(/\s+/g, "_")}.png`;
    link.href = dataUrl;
    link.click();

    setToastMessage(`📥 Certificate for "${cert.title}" downloaded successfully as PNG!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Share on LinkedIn Generator
  const handleShareLinkedIn = (certToShare) => {
    const cert = certToShare || selectedCert;
    const shareText = encodeURIComponent(
      `I'm excited to share that I've earned my official Certificate of Completion for "${cert.title}" from SkillSphere! 🚀 Credential ID: ${cert.credentialId || "SS-25-05-NODE4-12345"}`
    );
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${shareText}`;
    
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");

    setToastMessage(`💼 Opening LinkedIn to share your "${cert.title}" certificate!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Copy Verification Link
  const handleShareLink = (certToShare) => {
    const cert = certToShare || selectedCert;
    const verifyUrl = `https://skillsphere.edu/verify/${cert.credentialId || "SS-25-05-NODE4-12345"}`;
    navigator.clipboard.writeText(verifyUrl);

    setToastMessage(`🔗 Certificate verification link for "${cert.title}" copied to clipboard!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className={`cpWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      {/* Main Grid Container */}
      <div className="cpMainContainer">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="cpLeftSidebar">
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
                    className={`sdNavItem ${item.id === "certificates" ? "active" : ""}`}
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
        <div className="cpRightBodyArea">
          
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
          <div className="cpPageHeaderRow">
            <div className="cpPageHeader">
              <h1>Certificates 📜</h1>
              <p>Celebrate your achievements and showcase your skills!</p>
            </div>
          </div>

          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className="cpToastAlert">
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Sub-Tabs Bar */}
          <div className="cpSubTabsRow">
            <button
              className={`cpTab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`cpTab ${activeTab === "earned" ? "active" : ""}`}
              onClick={() => setActiveTab("earned")}
            >
              Earned Certificates ({earnedCertificates.length})
            </button>
            <button
              className={`cpTab ${activeTab === "to-earn" ? "active" : ""}`}
              onClick={() => setActiveTab("to-earn")}
            >
              Certificates to Earn ({certificatesToEarn.length})
            </button>
          </div>

          {/* 2-Column Main Workspace */}
          <div className="cpGridContainer">
            
            {/* Center Main Column */}
            <div className="cpCenterColumn">
              
              {/* TOP FEATURED CERTIFICATE PREVIEW BLOCK */}
              <div className="cpFeaturedBlockCard">
                
                {/* Left: Certificate Preview Canvas */}
                <div className="cpCanvasWrapper">
                  <div className="cpCanvasLabel">Certificate Preview</div>
                  <span className="cpCanvasSubLabel">This is how your certificate looks</span>

                  <div className="cpCertificateCanvas">
                    <div className="certInnerBorder">
                      
                      {/* Top Stamp Seal */}
                      <div className="certGoldStamp">
                        {selectedCert.isEarned ? "VERIFIED" : "LOCKED"}
                      </div>

                      {/* Header */}
                      <div className="certBrandHeader">
                        <span className="hex">⬢</span>
                        <strong>SkillSphere</strong>
                      </div>

                      <h2 className="certMainTitle">CERTIFICATE OF COMPLETION</h2>
                      <span className="certCertifyText">This is to certify that</span>

                      {/* Recipient Name in Script Calligraphy */}
                      <div className="certRecipientName">{userName}</div>

                      <p className="certCompletionDesc">
                        has successfully completed the <strong>{selectedCert.title} - {selectedCert.module}</strong>
                        <br />
                        <span className="pathSub">as part of the {selectedCert.path}</span>
                      </p>

                      {/* Certificate Footer Row */}
                      <div className="certCanvasFooter">
                        <div className="signCol">
                          <span className="dateVal">{selectedCert.date || "20 May 2025"}</span>
                          <span className="lbl">Date</span>
                        </div>

                        <div className="ribbonSeal">🏵️</div>

                        <div className="signCol">
                          <span className="signatureScript">Director</span>
                          <span className="lbl">Academic Director</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Actions below Canvas */}
                  <div className="cpCanvasActionsRow">
                    <button
                      className="btnDownloadCert"
                      onClick={() => handleDownloadPNG(selectedCert)}
                    >
                      <FaDownload /> Download Certificate (PNG)
                    </button>
                    <button
                      className="btnShareLinkedIn"
                      onClick={() => handleShareLinkedIn(selectedCert)}
                    >
                      <FaLinkedin /> Share on LinkedIn
                    </button>
                    <button
                      className="btnShareOutline"
                      onClick={() => handleShareLink(selectedCert)}
                    >
                      <FaShareAlt /> Share
                    </button>
                  </div>
                </div>

                {/* Right: Certificate Details Card */}
                <div className="cpDetailsCard">
                  <div className="certLogoHeaderRow">
                    <div
                      className="certCompLogoBadge"
                      style={{ background: selectedCert.logoBg || selectedCert.bg || "#082F49" }}
                    >
                      {selectedCert.logoText || selectedCert.icon}
                    </div>
                    <div>
                      <h4>{selectedCert.title}</h4>
                      <span className="modSub">{selectedCert.module}</span>
                    </div>

                    <span className={selectedCert.isEarned ? "tagCompletedGreen" : "tagLockedGray"}>
                      {selectedCert.isEarned ? "Completed" : "Locked"}
                    </span>
                  </div>

                  <div className="certFieldList">
                    <div className="fieldItem">
                      <div className="fIcon"><FaCodeBranch /></div>
                      <div>
                        <span className="lbl">Learning Path</span>
                        <strong>{selectedCert.path}</strong>
                      </div>
                    </div>

                    <div className="fieldItem">
                      <div className="fIcon"><FaUserCheck /></div>
                      <div>
                        <span className="lbl">Instructor</span>
                        <strong>{selectedCert.instructor}</strong>
                      </div>
                    </div>

                    <div className="fieldItem">
                      <div className="fIcon"><FaCalendarAlt /></div>
                      <div>
                        <span className="lbl">{selectedCert.isEarned ? "Completed On" : "Status"}</span>
                        <strong>{selectedCert.date || selectedCert.unlockReq || "In Progress"}</strong>
                      </div>
                    </div>

                    <div className="fieldItem">
                      <div className="fIcon"><FaShieldAlt /></div>
                      <div>
                        <span className="lbl">Credential ID</span>
                        <strong>{selectedCert.credentialId || "SS-25-LOCK-00000"}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Verified Box */}
                  <div className={selectedCert.isEarned ? "verifiedCertBox" : "lockedCertBox"}>
                    {selectedCert.isEarned ? <FaRegCheckCircle className="chkIconGreen" /> : <FaLock className="lockIconGray" />}
                    <div>
                      <strong>{selectedCert.isEarned ? "Verified Certificate" : "Locked Module"}</strong>
                      <span>{selectedCert.isEarned ? "This certificate is verified and secure" : "Complete previous course modules to unlock"}</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* MIDDLE SECTION: EARNED CERTIFICATES */}
              {(activeTab === "overview" || activeTab === "earned") && (
                <div className="cpSectionBlock">
                  <div className="sectionHeaderRow">
                    <h3>Earned Certificates ({earnedCertificates.length})</h3>
                    <span className="viewAllLink" onClick={() => setActiveTab("earned")}>View All</span>
                  </div>

                  <div className="earnedCertsGrid">
                    {earnedCertificates.map((cert) => (
                      <div
                        key={cert.id}
                        className={`earnedCertCard ${selectedCert.id === cert.id ? "activeSelected" : ""}`}
                        onClick={() => setSelectedCert(cert)}
                      >
                        <div
                          className="certCardIcon"
                          style={{ background: cert.logoBg, color: cert.logoColor || "#FFF" }}
                        >
                          {cert.logoText}
                        </div>

                        <div className="certCardInfo">
                          <h4>{cert.title}</h4>
                          <span className="modSub">{cert.module}</span>
                          <span className="dateSub">{cert.displayDate}</span>

                          <div className="certCardFooter">
                            <span className="verifiedTag"><FaCheck /> Verified</span>
                            <button
                              className="btnDownloadSmall"
                              title="Download PNG"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadPNG(cert);
                              }}
                            >
                              <FaDownload />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button className="cpCarouselArrowRight" title="Scroll Right">
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              )}

              {/* BOTTOM SECTION: CERTIFICATES TO EARN */}
              {(activeTab === "overview" || activeTab === "to-earn") && (
                <div className="cpSectionBlock">
                  <div className="sectionHeaderRow">
                    <h3>Certificates to Earn ({certificatesToEarn.length})</h3>
                  </div>

                  <div className="certsToEarnGrid">
                    {certificatesToEarn.map((item) => (
                      <div
                        key={item.id}
                        className={`toEarnCard ${selectedCert.id === item.id ? "activeSelected" : ""}`}
                        onClick={() => setSelectedCert(item)}
                      >
                        <div
                          className="toEarnIcon"
                          style={{ background: item.bg, color: item.color || "#16A34A" }}
                        >
                          {item.icon}
                        </div>

                        <div className="toEarnInfo">
                          <h4>{item.title}</h4>
                          <span className="modSub">{item.module}</span>
                          <span className="lockSubText">{item.unlockReq}</span>
                          <div className="pctTrackRow">
                            <div className="pTrack"><div className="pFill" style={{ width: `${item.progress}%` }}></div></div>
                            <span className="pctZero">{item.progress}%</span>
                          </div>
                        </div>

                        <FaLock className="cardLockIcon" />
                      </div>
                    ))}

                    <button className="cpCarouselArrowRight" title="Scroll Right">
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* ── RIGHT COLUMN SIDEBAR WIDGETS ── */}
            <div className="cpRightSidebar">
              
              {/* Certificate Summary Widget */}
              <div className="cpWidgetCard">
                <h4>Certificate Summary</h4>

                <div className="summaryList">
                  <div className="summaryItem">
                    <div className="sIcon green">🏅</div>
                    <div><strong>7</strong><span>Certificates Earned</span></div>
                  </div>

                  <div className="summaryItem">
                    <div className="sIcon orange">🎖️</div>
                    <div><strong>3</strong><span>In Progress</span></div>
                  </div>

                  <div className="summaryItem">
                    <div className="sIcon purple">🔒</div>
                    <div><strong>12</strong><span>To Be Earned</span></div>
                  </div>
                </div>
              </div>

              {/* Your Progress Gauge Widget */}
              <div className="cpWidgetCard">
                <h4>Your Progress</h4>

                <div className="cpProgressGaugeContainer">
                  <svg className="gaugeSvg" viewBox="0 0 100 100">
                    <circle className="gaugeBg" cx="50" cy="50" r="40" />
                    <circle className="gaugeFill" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset="160.7" />
                  </svg>
                  <div className="gaugeCenterText">
                    <strong>36%</strong>
                  </div>
                </div>

                <div className="gaugeSubtextRow">
                  <strong>Certificates Earned ✨</strong>
                  <span>Keep up the great work! 🔥</span>
                </div>
              </div>

              {/* Certificate Benefits Checklist Widget */}
              <div className="cpWidgetCard">
                <h4>Certificate Benefits</h4>

                <ul className="benefitsList">
                  <li><FaCheck color="#10B981" /> Showcase your skills</li>
                  <li><FaCheck color="#10B981" /> Boost your resume</li>
                  <li><FaCheck color="#10B981" /> Stand out to employers</li>
                  <li><FaCheck color="#10B981" /> Track your learning journey</li>
                </ul>
              </div>

              {/* Progress by Learning Path Widget */}
              <div className="cpWidgetCard">
                <div className="widgetTitleRow">
                  <h4>Progress by Learning Path</h4>
                  <span className="viewAllLink">View All</span>
                </div>

                <div className="pathProgressList">
                  <div className="pathProgItem">
                    <div className="pIcon dark">⚛️</div>
                    <div className="pInfo">
                      <h5>Fullstack Web Development</h5>
                      <span>5 / 8 Certificates</span>
                      <div className="pTrack"><div className="pFill" style={{ width: "62%" }}></div></div>
                    </div>
                    <span className="pctText">62%</span>
                  </div>

                  <div className="pathProgItem">
                    <div className="pIcon dark">🐍</div>
                    <div className="pInfo">
                      <h5>Data Science with Python</h5>
                      <span>2 / 6 Certificates</span>
                      <div className="pTrack"><div className="pFill" style={{ width: "33%" }}></div></div>
                    </div>
                    <span className="pctText">33%</span>
                  </div>

                  <div className="pathProgItem">
                    <div className="pIcon dark">🤖</div>
                    <div className="pInfo">
                      <h5>AI & ML Fundamentals</h5>
                      <span>0 / 5 Certificates</span>
                      <div className="pTrack"><div className="pFill" style={{ width: "0%" }}></div></div>
                    </div>
                    <span className="pctText">0%</span>
                  </div>
                </div>
              </div>

              {/* Show off your achievement! Banner Widget */}
              <div className="shareLinkedInBanner">
                <div>
                  <h5>Show off your achievement! 🚀</h5>
                  <p>Share your certificate on LinkedIn and inspire your network.</p>
                  <button
                    className="btnInShareNow"
                    onClick={() => handleShareLinkedIn(selectedCert)}
                  >
                    <FaLinkedin /> In Share Now
                  </button>
                </div>
                <div className="trophyGraphic">🏆</div>
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
