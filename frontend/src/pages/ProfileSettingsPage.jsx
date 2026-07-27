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
  const { user, xp, themeMode, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "account" | "apps"
  const [toastMessage, setToastMessage] = useState("");

  // Modals state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  // Profile Form State (Anonymous Generic Data)
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
    website: "https://alexmorgan.dev"
  });

  // Account Preferences State
  const [accountPrefs, setAccountPrefs] = useState({
    language: "English",
    timezone: "(GMT+05:30) Asia/Kolkata",
    country: "India",
    dateFormat: "DD MMM YYYY",
    enable2FA: false
  });

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

  // Save Profile Handler
  const handleSaveProfile = () => {
    setToastMessage("💾 Profile settings saved successfully!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Save Account Prefs Handler
  const handleSaveAccount = () => {
    setToastMessage("🔒 Account settings and security preferences saved!");
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

              <div className="sdNotificationBtnWrapper">
                <button className="sdNotificationBtn">
                  <FaBell />
                  <span className="sdNotifBadge">5</span>
                </button>
              </div>

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

          {/* SUB-TABS BAR (ONLY 3 TABS AS REQUESTED) */}
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

            <button
              className={`psTab ${activeTab === "apps" ? "active" : ""}`}
              onClick={() => setActiveTab("apps")}
            >
              <FaLink /> Connected Apps
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
                  <div className="avatarCircleBox">
                    <div className="avatarPlaceholder">🧑‍🎓</div>
                    <button className="cameraBtn" title="Upload Photo">
                      <FaCamera />
                    </button>
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
                    <div className="avatarPreviewCircle">🧑‍🎓</div>

                    <div className="lvlBadgeText">Level 12 • Code Explorer</div>

                    <div className="stats3Grid">
                      <div><strong>18</strong><span>Badges</span></div>
                      <div><strong>6,450</strong><span>XP Points</span></div>
                      <div><strong>12</strong><span>Courses</span></div>
                    </div>
                  </div>
                </div>

                {/* Profile Completion Widget */}
                <div className="psWidgetCard">
                  <div className="widgetTitleRow">
                    <h4>Profile Completion</h4>
                    <span className="pctGreen">80% Completed</span>
                  </div>
                  <div className="pTrack"><div className="pFill" style={{ width: "80%" }}></div></div>

                  <ul className="completionChecklist">
                    <li><FaCheckCircle color="#10B981" /> <span>Profile Picture</span> <strong className="cmp">Completed</strong></li>
                    <li><FaCheckCircle color="#10B981" /> <span>Full Name</span> <strong className="cmp">Completed</strong></li>
                    <li><FaCheckCircle color="#10B981" /> <span>Bio</span> <strong className="cmp">Completed</strong></li>
                    <li><FaCheckCircle color="#10B981" /> <span>Location</span> <strong className="cmp">Completed</strong></li>
                    <li><FaCheckCircle color="#10B981" /> <span>Social Links</span> <strong className="cmp">Completed</strong></li>
                    <li><FaCheckCircle color="#10B981" /> <span>Date of Birth</span> <strong className="cmp">Completed</strong></li>
                    <li><FaExclamationTriangle color="#F59E0B" /> <span>Add a cover photo</span> <strong className="pnd">Pending</strong></li>
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
                      <input type="text" value={profileData.fullName} readOnly />
                    </div>

                    <div className="inputGroup">
                      <label>Username</label>
                      <input type="text" value={profileData.username} readOnly />
                    </div>
                  </div>

                  <div className="psForm2Col">
                    <div className="inputGroup">
                      <label>Email Address</label>
                      <input type="email" value={profileData.email} readOnly />
                    </div>

                    <div className="inputGroup">
                      <label>Phone Number</label>
                      <input type="text" value={profileData.phone} readOnly />
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

                {/* Recent Account Activity */}
                <div className="psWidgetCard">
                  <div className="widgetTitleRow">
                    <h4>Recent Account Activity</h4>
                  </div>

                  <div className="activityList">
                    <div className="actItem">
                      <FaLaptop className="aIcon" />
                      <div>
                        <h5>Logged in from Web</h5>
                        <span>Kolkata, India • Today, 10:30 AM</span>
                      </div>
                    </div>

                    <div className="actItem">
                      <FaMobileAlt className="aIcon" />
                      <div>
                        <h5>Logged in from Mobile</h5>
                        <span>Kolkata, India • Yesterday, 9:15 PM</span>
                      </div>
                    </div>

                    <div className="actItem">
                      <FaKey className="aIcon" />
                      <div>
                        <h5>Password changed</h5>
                        <span>Kolkata, India • 3 days ago</span>
                      </div>
                    </div>
                  </div>

                  <span className="viewAllActivityLink">View All Activity →</span>
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

          {/* ── TAB 3: CONNECTED APPS (IMAGE 3) ── */}
          {activeTab === "apps" && (
            <div className="psWorkspaceGrid">
              
              {/* Left Workspace Block */}
              <div className="psFormBlock">
                <h3>Connected Apps</h3>
                <p className="subText">Manage third-party apps and services connected to your SkillSphere account.</p>

                {/* Connected Apps List */}
                <div className="connectedSection">
                  <h4>Connected Apps ({connectedApps.length})</h4>

                  {connectedApps.length === 0 ? (
                    <div className="emptyAppsBox">
                      <div className="emptyLinkIcon">🔗</div>
                      <h5>No apps connected yet</h5>
                      <p>Connect your favorite tools and platforms to enhance your learning experience.</p>
                      <button className="btnExploreApps" onClick={() => setToastMessage("Choose a tool below to connect!")}>
                        Explore Apps
                      </button>
                    </div>
                  ) : (
                    <div className="connectedAppsGrid">
                      {connectedApps.map((app) => (
                        <div key={app.id} className="activeConnectedCard">
                          <span className="appIcon">{app.icon}</span>
                          <div>
                            <h5>{app.name}</h5>
                            <span className="statusConnected">✓ Connected</span>
                          </div>
                          <button className="btnDisconnect" onClick={() => toggleAppConnection(app)}>
                            Disconnect
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Popular Apps Grid */}
                <div className="popularAppsSection">
                  <h4>Popular Apps</h4>
                  <p className="subText">Connect with tools you already use</p>

                  <div className="popularAppsGrid">
                    {popularApps.map((app) => {
                      const isConnected = connectedApps.some((a) => a.id === app.id);
                      return (
                        <div key={app.id} className="appCard">
                          <div className="appHeaderRow">
                            <span className="appLogoIcon">{app.icon}</span>
                            <div>
                              <h5>{app.name}</h5>
                              <p>{app.desc}</p>
                            </div>
                            <button
                              className={`btnConnectApp ${isConnected ? "connected" : ""}`}
                              onClick={() => toggleAppConnection(app)}
                            >
                              {isConnected ? "Connected" : "Connect"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="showMoreRow">
                    <button className="btnShowMore">Show More Apps ▾</button>
                  </div>
                </div>

              </div>

              {/* Right Sidebar Widgets */}
              <div className="psRightSidebarCol">
                
                {/* About Connected Apps Widget */}
                <div className="psWidgetCard">
                  <h4>About Connected Apps</h4>

                  <div className="aboutAppsBox">
                    <div className="appShieldIcon">📲</div>
                    <p>Connected apps help you streamline your workflow, track progress, and access your important data all in one place.</p>
                  </div>

                  <ul className="secChecklist">
                    <li><FaCheckCircle color="#10B981" /> Secure and encrypted connections</li>
                    <li><FaCheckCircle color="#10B981" /> Control what data is shared</li>
                    <li><FaCheckCircle color="#10B981" /> Disconnect anytime you want</li>
                  </ul>
                </div>

                {/* Connection Security Widget */}
                <div className="psWidgetCard">
                  <div className="widgetTitleRow">
                    <h4><FaLock color="#F59E0B" /> Connection Security</h4>
                  </div>
                  <p className="secSubtext">Your data is safe with us. We never share your data with third-party apps without your permission.</p>
                  <span className="learnSecurityLink">Learn more about security</span>
                </div>

                {/* Need Help? Widget */}
                <div className="helpCenterBox">
                  <FaHeadset className="headsetIcon" />
                  <div>
                    <h5>Need Help?</h5>
                    <p>Having trouble connecting an app? Visit our Help Center for step-by-step guides and support.</p>
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
