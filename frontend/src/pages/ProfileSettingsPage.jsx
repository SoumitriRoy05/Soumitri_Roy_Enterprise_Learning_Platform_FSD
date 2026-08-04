import React, { useState, useEffect, useRef } from "react";
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
  FaCamera,
  FaUser,
  FaLock,
  FaLink,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaShieldAlt,
  FaLaptop,
  FaMobileAlt,
  FaKey,
  FaHeadset,
  FaTimes,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaCheck,
  FaArrowRight,
  FaDownload,
  FaQuestionCircle
} from "react-icons/fa";

import "../styles/studentDashboard.css";
import "../styles/profileSettings.css";

export default function ProfileSettingsPage() {
  const { user, xp, themeMode, toggleTheme, updateUserProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "account"
  const [toastMessage, setToastMessage] = useState("");
  const photoInputRef = useRef(null);

  // Modals state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

  // Profile Form State
  const [profileData, setProfileData] = useState({
    fullName: user?.full_name || "Alex Morgan",
    username: user?.username || "alex_student",
    email: user?.email || "alex.morgan@skillsphere.edu",
    phone: "+1 (555) 019-2834",
    bio: "Passionate Computer Science student learning Fullstack Web Development & AI engineering.",
    location: "San Francisco, CA",
    dob: "2003-05-15",
    college: "Global Institute of Technology",
    branch: "Computer Science & Engineering",
    linkedin: "https://linkedin.com/in/alexmorgan",
    github: "https://github.com/alexmorgan",
    website: user?.portfolio || "",
    avatarUrl: ""
  });

  // Account Preferences State
  const [accountPrefs, setAccountPrefs] = useState({
    language: user?.preferred_language || "English",
    timezone: user?.timezone || "(GMT+05:30) Asia/Kolkata",
    country: user?.country || "India",
    dateFormat: user?.date_format || "DD MMM YYYY",
    enable2FA: !!user?.enable_2fa
  });

  React.useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.full_name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "Bhubaneswar, Odisha",
        dob: user.date_of_birth || "",
        college: user.college || "",
        branch: user.branch || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
        website: user.portfolio || "",
        avatarUrl: ""
      });
      setAccountPrefs({
        language: user.preferred_language || "English",
        timezone: user.timezone || "(GMT+05:30) Asia/Kolkata",
        country: user.country || "India",
        dateFormat: user.date_format || "DD MMM YYYY",
        enable2FA: !!user.enable_2fa
      });
    }
  }, [user]);

  // Connected Apps State
  const [connectedApps, setConnectedApps] = useState([]);

  // Popular Apps List
  const popularApps = [
    { id: "github", name: "GitHub", desc: "Sync your repositories and track your coding progress.", icon: "🐙" },
    { id: "linkedin", name: "LinkedIn", desc: "Import your profile and showcase your achievements.", icon: "💼" },
    { id: "gdrive", name: "Google Drive", desc: "Access and save your documents and files.", icon: "📁" },
    { id: "notion", name: "Notion", desc: "Sync your notes and learning resources.", icon: "📝" },
    { id: "discord", name: "Discord", desc: "Join study groups and get notifications.", icon: "💬" },
    { id: "figma", name: "Figma", desc: "Share and collaborate on your design projects.", icon: "🎨" },
    { id: "leetcode", name: "LeetCode", desc: "Track your coding practice and problem-solving stats.", icon: "⚡" },
    { id: "gcal", name: "Google Calendar", desc: "Sync your schedule and never miss a deadline.", icon: "📅" },
    { id: "slack", name: "Slack", desc: "Get updates and collaborate with your team.", icon: "💬" }
  ];

  const currentXp = xp ?? 0;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData((prev) => ({ ...prev, avatarUrl: reader.result }));
      setToastMessage("📸 Photo updated! Click 'Save Changes' to preserve.");
      setTimeout(() => setToastMessage(""), 4000);
    };
    reader.readAsDataURL(file);
  };

  // Save Profile Handler
  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        full_name: profileData.fullName,
        username: profileData.username,
        email: profileData.email,
        phone: profileData.phone,
        bio: profileData.bio,
        location: profileData.location,
        date_of_birth: profileData.dob,
        college: profileData.college,
        branch: profileData.branch,
        linkedin: profileData.linkedin,
        github: profileData.github,
        portfolio: profileData.website
      });
      setToastMessage("💾 Profile settings saved successfully!");
      if (refreshProfile) {
        await refreshProfile();
      }
    } catch (e) {
      console.error(e);
      setToastMessage("❌ Failed to save profile settings.");
    }
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Save Account Prefs Handler
  const handleSaveAccount = async () => {
    try {
      await updateUserProfile({
        full_name: profileData.fullName,
        username: profileData.username,
        email: profileData.email,
        phone: profileData.phone,
        preferred_language: accountPrefs.language,
        timezone: accountPrefs.timezone,
        country: accountPrefs.country,
        date_format: accountPrefs.dateFormat,
        enable_2fa: String(accountPrefs.enable2FA)
      });
      setToastMessage("🔒 Account settings and preferences saved successfully!");
      if (refreshProfile) {
        await refreshProfile();
      }
    } catch (e) {
      console.error(e);
      setToastMessage("❌ Failed to save account settings.");
    }
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Connect/Disconnect App Handler
  const toggleAppConnection = (app) => {
    if (connectedApps.some((a) => a.id === app.id)) {
      setConnectedApps(connectedApps.filter((a) => a.id !== app.id));
      setToastMessage(`🔌 Disconnected from ${app.name}.`);
    } else {
      setConnectedApps([...connectedApps, app]);
      setToastMessage(`⚡ Successfully connected ${app.name} to your SkillSphere account!`);
    }
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Profile Completion Calculation
  const getProfileCompletion = () => {
    let score = 0;
    let total = 7;
    const checks = {
      fullName: !!user?.full_name,
      bio: !!user?.bio,
      location: !!user?.location,
      socials: !!(user?.linkedin || user?.github || user?.portfolio),
      dob: !!user?.date_of_birth,
      college: !!user?.college,
      branch: !!user?.branch
    };
    if (checks.fullName) score++;
    if (checks.bio) score++;
    if (checks.location) score++;
    if (checks.socials) score++;
    if (checks.dob) score++;
    if (checks.college) score++;
    if (checks.branch) score++;

    const percent = Math.round((score / total) * 100);
    return { percent, checks };
  };

  const { percent: compPercent, checks: compChecks } = getProfileCompletion();

  const earnedBadgesCount = Array.isArray(user?.badges)
    ? user.badges.filter(Boolean).length
    : typeof user?.badges === "string"
    ? user.badges.split(",").filter(Boolean).length
    : 0;

  const enrolledCoursesCount = Array.isArray(user?.enrolled_courses)
    ? user.enrolled_courses.filter(Boolean).length
    : typeof user?.enrolled_courses === "string"
    ? user.enrolled_courses.split(',').filter(Boolean).length
    : 0;

  return (
    <div className={`psWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      {/* Main Grid Container */}
      <div className="psMainContainer">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="psLeftSidebar">
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
                    className={`sdNavItem ${item.id === "settings" ? "active" : ""}`}
                    onClick={() => {
                      if (item.id === "dashboard") navigate("/student-home");
                      else if (item.id === "courses") navigate("/courses");
                      else if (item.id === "learning-paths") navigate("/learning-paths");
                      else if (item.id === "assignments") navigate("/assignments");
                      else if (item.id === "discussions") navigate("/discussions");
                      else if (item.id === "ai-buddy") navigate("/ai-buddy");
                      else if (item.id === "opportunity-feed") navigate("/opportunity-feed");
                      else if (item.id === "badges") navigate("/badges");
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
        <div className="psRightBodyArea">
          
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

              <div className="sdUserProfilePill" onClick={() => navigate("/settings")}>
                <div className="sdUserAvatarImg">🧑‍🎓</div>
                <div className="sdUserInfoText">
                  <strong>{profileData.fullName}</strong>
                  <span>Student</span>
                </div>
                <span className="dropdownArrow">▾</span>
              </div>
            </div>
          </header>

          {/* Page Heading Row */}
          <div className="psPageHeaderRow">
            <div className="psPageHeader">
              <h1>Settings ⚙️</h1>
              <p>Manage your account preferences and settings</p>
            </div>
          </div>

          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className="psToastAlert">
              <span>{toastMessage}</span>
            </div>
          )}

          {/* SUB-TABS BAR (ONLY 2 TABS AS REQUESTED) */}
          <div className="psSubTabsRow">
            <button
              className={`psTab ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser /> Profile Settings
            </button>

            <button
              className={`psTab ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              <FaLock /> Account Settings
            </button>
          </div>

          {/* ── TAB 1: PROFILE SETTINGS (IMAGE 1) ── */}
          {activeTab === "profile" && (
            <div className="psWorkspaceGrid">
              
              {/* Left Form Block */}
              <div className="psFormBlock">
                <h3>Profile Settings</h3>
                <p className="subText">Update your personal information and how others see you on SkillSphere.</p>

                {/* Avatar Photo Section */}
                <div className="avatarSectionRow">
                  <div className="avatarCircleBox" onClick={() => photoInputRef.current?.click()} style={{ cursor: "pointer", position: "relative" }}>
                    {profileData.avatarUrl ? (
                      <img src={profileData.avatarUrl} alt="Avatar" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div className="avatarPlaceholder">🧑‍🎓</div>
                    )}
                    <button className="cameraBtn" title="Upload Photo" type="button" onClick={(e) => { e.stopPropagation(); photoInputRef.current?.click(); }}>
                      <FaCamera />
                    </button>
                    <input
                      type="file"
                      ref={photoInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  <span className="photoSub">JPG, PNG or WEBP. Max size 2MB</span>
                </div>

                {/* Form Fields */}
                <div className="psForm2Col">
                  <div className="inputGroup">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="inputGroup">
                    <label>Username</label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    />
                  </div>
                </div>

                <div className="psForm2Col">
                  <div className="inputGroup">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>

                  <div className="inputGroup">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="inputGroup">
                  <label>Bio</label>
                  <textarea
                    rows="3"
                    maxLength="150"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  />
                  <span className="charCounter">{profileData.bio.length}/150</span>
                </div>

                <div className="psForm2Col">
                  <div className="inputGroup">
                    <label>Location</label>
                    <select
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    >
                      <option value="" disabled>Select Location</option>
                      <option value="Bhubaneswar, Odisha">Bhubaneswar, Odisha</option>
                      <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
                      <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
                      <option value="Delhi, NCR">Delhi, NCR</option>
                    </select>
                  </div>

                  <div className="inputGroup">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={profileData.dob}
                      onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                    />
                  </div>
                </div>

                <div className="psForm2Col">
                  <div className="inputGroup">
                    <label>College / University</label>
                    <input
                      type="text"
                      value={profileData.college}
                      onChange={(e) => setProfileData({ ...profileData, college: e.target.value })}
                    />
                  </div>

                  <div className="inputGroup">
                    <label>Branch / Field of Study</label>
                    <input
                      type="text"
                      value={profileData.branch}
                      onChange={(e) => setProfileData({ ...profileData, branch: e.target.value })}
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="socialLinksSection">
                  <label>Social Links</label>
                  <div className="social3Row">
                    <div className="socialInputGroup">
                      <FaLinkedin className="sIcon" />
                      <input
                        type="text"
                        placeholder="LinkedIn URL"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                      />
                    </div>

                    <div className="socialInputGroup">
                      <FaGithub className="sIcon" />
                      <input
                        type="text"
                        placeholder="GitHub URL"
                        value={profileData.github}
                        onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                      />
                    </div>

                    <div className="socialInputGroup">
                      <FaGlobe className="sIcon" />
                      <input
                        type="text"
                        placeholder="Website URL"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="btnFormRow">
                  <button className="btnSavePrimary" onClick={handleSaveProfile}>Save Changes</button>
                  <button className="btnCancelOutline" onClick={() => navigate("/student-home")}>Cancel</button>
                </div>
              </div>

              {/* Right Sidebar Widgets */}
              <div className="psRightSidebarCol">
                
                {/* Profile Preview Widget */}
                <div className="psWidgetCard">
                  <h4>Profile Preview</h4>

                  <div className="profilePreviewCard">
                    <div className="gradientBanner"></div>
                    {profileData.avatarUrl ? (
                      <img src={profileData.avatarUrl} alt="Avatar" className="avatarPreviewCircle" style={{ objectFit: "cover", width: "70px", height: "70px", borderRadius: "50%" }} />
                    ) : (
                      <div className="avatarPreviewCircle">🧑‍🎓</div>
                    )}

                    <h3 style={{ margin: "10px 0 2px 0", fontSize: "16px", fontWeight: "800", color: "#0F172A" }}>
                      {profileData.fullName || "Learner"}
                    </h3>
                    <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#64748B" }}>
                      @{profileData.username || "learner"}
                    </p>

                    <div className="lvlBadgeText">Level {Math.floor((user?.xp || 0) / 2000) + 1} • {user?.role === "STUDENT" ? "Student" : "Developer"}</div>

                    <div className="stats3Grid">
                      <div><strong>{earnedBadgesCount}</strong><span>Badges</span></div>
                      <div><strong>{(user?.xp || 0).toLocaleString()}</strong><span>XP Points</span></div>
                      <div><strong>{enrolledCoursesCount}</strong><span>Courses</span></div>
                    </div>
                  </div>
                </div>

                {/* Profile Completion Widget */}
                <div className="psWidgetCard">
                  <div className="widgetTitleRow">
                    <h4>Profile Completion</h4>
                    <span className="pctGreen">{compPercent}% Completed</span>
                  </div>
                  <div className="pTrack"><div className="pFill" style={{ width: `${compPercent}%` }}></div></div>

                  <ul className="completionChecklist">
                    <li>{compChecks.fullName ? <FaCheckCircle color="#10B981" /> : <FaExclamationTriangle color="#F59E0B" />} <span>Full Name</span> <strong className={compChecks.fullName ? "cmp" : "pnd"}>{compChecks.fullName ? "Completed" : "Pending"}</strong></li>
                    <li>{compChecks.bio ? <FaCheckCircle color="#10B981" /> : <FaExclamationTriangle color="#F59E0B" />} <span>Bio</span> <strong className={compChecks.bio ? "cmp" : "pnd"}>{compChecks.bio ? "Completed" : "Pending"}</strong></li>
                    <li>{compChecks.location ? <FaCheckCircle color="#10B981" /> : <FaExclamationTriangle color="#F59E0B" />} <span>Location</span> <strong className={compChecks.location ? "cmp" : "pnd"}>{compChecks.location ? "Completed" : "Pending"}</strong></li>
                    <li>{compChecks.socials ? <FaCheckCircle color="#10B981" /> : <FaExclamationTriangle color="#F59E0B" />} <span>Social Links</span> <strong className={compChecks.socials ? "cmp" : "pnd"}>{compChecks.socials ? "Completed" : "Pending"}</strong></li>
                    <li>{compChecks.dob ? <FaCheckCircle color="#10B981" /> : <FaExclamationTriangle color="#F59E0B" />} <span>Date of Birth</span> <strong className={compChecks.dob ? "cmp" : "pnd"}>{compChecks.dob ? "Completed" : "Pending"}</strong></li>
                    <li>{compChecks.college ? <FaCheckCircle color="#10B981" /> : <FaExclamationTriangle color="#F59E0B" />} <span>College</span> <strong className={compChecks.college ? "cmp" : "pnd"}>{compChecks.college ? "Completed" : "Pending"}</strong></li>
                    <li>{compChecks.branch ? <FaCheckCircle color="#10B981" /> : <FaExclamationTriangle color="#F59E0B" />} <span>Branch</span> <strong className={compChecks.branch ? "cmp" : "pnd"}>{compChecks.branch ? "Completed" : "Pending"}</strong></li>
                  </ul>
                </div>

                {/* Quick Actions Widget */}
                <div className="psWidgetCard">
                  <h4>Quick Actions</h4>
                  <div className="quickActionsList">
                    <button onClick={() => navigate("/student-home")}>
                      <FaUser /> <span>View My Profile</span> <FaArrowRight />
                    </button>
                    <button onClick={() => navigate("/badges")}>
                      <FaAward /> <span>Manage My Badges</span> <FaArrowRight />
                    </button>
                    <button onClick={handleSaveProfile}>
                      <FaDownload /> <span>Download My Data</span> <FaArrowRight />
                    </button>
                  </div>
                </div>

                {/* Profile Tips Card Box */}
                <div className="profileTipsBox">
                  <FaShieldAlt className="shieldIcon" />
                  <div>
                    <h5>Profile Tips</h5>
                    <p>A complete profile helps your peers know you better and improves your visibility in discussions and opportunities.</p>
                  </div>
                  <button className="btnViewProfileOutline" onClick={() => navigate("/student-home")}>View Profile</button>
                </div>

              </div>

            </div>
          )}

          {/* ── TAB 2: ACCOUNT SETTINGS (IMAGE 2) ── */}
          {activeTab === "account" && (
            <div className="psWorkspaceGrid">
              
              {/* Left Form Block */}
              <div className="psFormBlock">
                <h3>Account Settings</h3>
                <p className="subText">Manage your account information and preferences.</p>

                {/* Account Information Group */}
                <div className="formGroupBlock">
                  <h4>Account Information</h4>

                  <div className="psForm2Col">
                    <div className="inputGroup">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      />
                    </div>

                    <div className="inputGroup">
                      <label>Username</label>
                      <input
                        type="text"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="psForm2Col">
                    <div className="inputGroup">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>

                    <div className="inputGroup">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="inputGroup">
                    <label>Password</label>
                    <div className="pwdInputRow">
                      <input type="password" value="••••••••••••" readOnly />
                      <button className="btnChangePwd" onClick={() => setIsPasswordModalOpen(true)}>
                        <FaLock /> Change Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Account Preferences Group */}
                <div className="formGroupBlock">
                  <h4>Account Preferences</h4>

                  <div className="psForm2Col">
                    <div className="inputGroup">
                      <label>Preferred Language</label>
                      <select
                        value={accountPrefs.language}
                        onChange={(e) => setAccountPrefs({ ...accountPrefs, language: e.target.value })}
                      >
                        <option value="" disabled>Select Language</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                      </select>
                    </div>

                    <div className="inputGroup">
                      <label>Timezone</label>
                      <select
                        value={accountPrefs.timezone}
                        onChange={(e) => setAccountPrefs({ ...accountPrefs, timezone: e.target.value })}
                      >
                        <option value="" disabled>Select Timezone</option>
                        <option value="(GMT+05:30) Asia/Kolkata">(GMT+05:30) Asia/Kolkata</option>
                        <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
                        <option value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</option>
                      </select>
                    </div>
                  </div>

                  <div className="psForm2Col">
                    <div className="inputGroup">
                      <label>Country</label>
                      <select
                        value={accountPrefs.country}
                        onChange={(e) => setAccountPrefs({ ...accountPrefs, country: e.target.value })}
                      >
                        <option value="" disabled>Select Country</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>

                    <div className="inputGroup">
                      <label>Date Format</label>
                      <select
                        value={accountPrefs.dateFormat}
                        onChange={(e) => setAccountPrefs({ ...accountPrefs, dateFormat: e.target.value })}
                      >
                        <option value="" disabled>Select Date Format</option>
                        <option value="DD MMM YYYY">DD MMM YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div className="checkboxGroup">
                    <label>
                      <input
                        type="checkbox"
                        checked={accountPrefs.enable2FA}
                        onChange={(e) => setAccountPrefs({ ...accountPrefs, enable2FA: e.target.checked })}
                      />
                      <span><strong>Enable two-factor authentication (2FA)</strong></span>
                    </label>
                    <small>Add an extra layer of security to your account</small>
                  </div>
                </div>

                {/* Deactivate Account */}
                <div className="deactivateBlock">
                  <div>
                    <h4>Deactivate Account</h4>
                    <p>Temporarily deactivate your account. You can reactivate it anytime by logging in.</p>
                  </div>
                  <button className="btnDeactivate" onClick={() => setIsDeactivateModalOpen(true)}>
                    Deactivate Account
                  </button>
                </div>

                <div className="btnFormRow">
                  <button className="btnSavePrimary" onClick={handleSaveAccount}>Save Changes</button>
                </div>
              </div>

              {/* Right Sidebar Widgets */}
              <div className="psRightSidebarCol">
                
                {/* Security Overview */}
                <div className="psWidgetCard">
                  <h4>Security Overview</h4>

                  <div className="securityOverviewCard">
                    <div className="secShieldIcon">🛡️</div>
                    <div>
                      <span>Your account security status is</span>
                      <strong className="secGoodText">Good</strong>
                    </div>
                  </div>

                  <ul className="secChecklist">
                    <li><FaCheckCircle color="#10B981" /> Password is strong</li>
                    <li><FaCheckCircle color="#10B981" /> Two-factor authentication is {accountPrefs.enable2FA ? "ON" : "OFF"}</li>
                    <li><FaCheckCircle color="#10B981" /> No suspicious activity detected</li>
                  </ul>

                  <button className="btnGoSecurityOutline" onClick={() => setIsPasswordModalOpen(true)}>
                    Go to Security Settings
                  </button>
                </div>



                {/* Need Help? Widget */}
                <div className="helpCenterBox">
                  <FaHeadset className="headsetIcon" />
                  <div>
                    <h5>Need Help?</h5>
                    <p>Visit our Help Center for guides and support articles.</p>
                  </div>
                  <button className="btnGoHelpCenter" onClick={() => navigate("/discussions")}>
                    Go to Help Center
                  </button>
                </div>

              </div>

            </div>
          )}



        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {isPasswordModalOpen && (
        <div className="psModalOverlay" onClick={() => setIsPasswordModalOpen(false)}>
          <div className="psModalContent" onClick={(e) => e.stopPropagation()}>
            <button className="btnCloseModal" onClick={() => setIsPasswordModalOpen(false)}>
              <FaTimes />
            </button>

            <h3>🔒 Change Password</h3>
            <p className="modalSub">Enter your current password and a new secure password.</p>

            <div className="inputGroup">
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" />
            </div>

            <div className="inputGroup">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>

            <div className="inputGroup">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>

            <div className="modalBtnRow">
              <button
                className="btnSavePrimary"
                onClick={() => {
                  setIsPasswordModalOpen(false);
                  setToastMessage("🔑 Password changed successfully!");
                  setTimeout(() => setToastMessage(""), 4000);
                }}
              >
                Update Password
              </button>
              <button className="btnCancelOutline" onClick={() => setIsPasswordModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEACTIVATE ACCOUNT MODAL */}
      {isDeactivateModalOpen && (
        <div className="psModalOverlay" onClick={() => setIsDeactivateModalOpen(false)}>
          <div className="psModalContent" onClick={(e) => e.stopPropagation()}>
            <button className="btnCloseModal" onClick={() => setIsDeactivateModalOpen(false)}>
              <FaTimes />
            </button>

            <h3 style={{ color: "#EF4444" }}>⚠️ Deactivate Account</h3>
            <p className="modalSub">Are you sure you want to deactivate your SkillSphere account? You will be logged out immediately.</p>

            <div className="modalBtnRow">
              <button
                className="btnDeactivate"
                onClick={() => {
                  setIsDeactivateModalOpen(false);
                  navigate("/login");
                }}
              >
                Confirm Deactivation
              </button>
              <button className="btnCancelOutline" onClick={() => setIsDeactivateModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <FloatingChatbot />
      <StudentFooter />
    </div>
  );
}
