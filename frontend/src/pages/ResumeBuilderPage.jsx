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
  FaCheckCircle,
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaCalendarAlt,
  FaDownload,
  FaShareAlt,
  FaChevronDown,
  FaEye,
  FaStar,
  FaRedo,
  FaCheck,
  FaExclamationTriangle,
  FaMagic,
  FaCamera,
  FaBriefcase,
  FaCode,
  FaGlobe,
  FaTimes,
  FaFileWord,
  FaPlus,
  FaTrash,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaPlusCircle,
  FaSignOutAlt
} from "react-icons/fa";

import "../styles/studentDashboard.css";
import "../styles/resumeBuilderPage.css";

export default function ResumeBuilderPage() {
  const { user, xp, logout, themeMode, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";
  const [activeTab, setActiveTab] = useState("personal");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [toastMessage, setToastMessage] = useState("");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isResumeAnalyzed, setIsResumeAnalyzed] = useState(false);
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

  const currentXp = xp ?? 0;

  // Real-time Resume Form State (Fully Editable Across All 9 Tabs)
  const [resumeData, setResumeData] = useState({
    fullName: "Alex Morgan",
    jobTitle: "Software Engineer",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    portfolio: "alexmorgan.dev",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    summary:
      "I am a software engineer with experience in a variety of programming languages and a track record of delivering high-quality code. I am skilled in problem-solving and have a strong background in computer science. I am a strong communicator and enjoy working collaboratively with others.",
    skills: [
      "Java",
      "Python",
      "JavaScript (ES6+)",
      "React.js",
      "Node.js",
      "SQL / MySQL",
      "Git & GitHub",
      "Data Structures & Algorithms",
      "Problem Solving"
    ],
    languages: [
      { id: 1, name: "English", level: "•••••" },
      { id: 2, name: "Spanish", level: "•••••" },
      { id: 3, name: "French", level: "•••••" }
    ],
    experiences: [
      {
        id: 1,
        title: "Senior Software Developer Intern",
        company: "CodeSoft Pvt. Ltd.",
        period: "May 2024 – Jul 2024",
        bullets: [
          "Developed responsive web applications using React.js and Node.js.",
          "Collaborated with cross-functional teams to deliver features.",
          "Optimized application performance and fixed bugs."
        ]
      },
      {
        id: 2,
        title: "Web Developer Intern",
        company: "BrainyBeam Technologies",
        period: "Jan 2024 – Apr 2024",
        bullets: [
          "Built and maintained web pages using HTML, CSS, JavaScript.",
          "Integrated REST APIs and managed data using MySQL.",
          "Assisted in improving UI/UX and website responsiveness."
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Technology in Computer Science",
        institution: "Global Institute of Technology",
        period: "2022 – 2026",
        score: "CGPA: 8.9 / 10"
      },
      {
        id: 2,
        degree: "Higher Secondary Education",
        institution: "High School Academy",
        period: "2020 – 2022",
        score: "Percentage: 92.4%"
      }
    ],
    projects: [
      {
        id: 1,
        name: "SkillSphere Learning Nexus",
        tech: "React, Node.js, MongoDB",
        desc: "Gamified learning platform with AI Study Buddy, Quest System and dashboards."
      },
      {
        id: 2,
        name: "BharatYatra - Tourism Booking Portal",
        tech: "React, Tailwind CSS",
        desc: "Full-stack tourism portal with authentication, booking and recommendation system."
      }
    ],
    certifications: [
      "Python for Everybody - Coursera",
      "Java Programming - HackerRank"
    ],
    achievements: [
      "Winner of National Hackathon 2024",
      "Published technical article on React performance optimization"
    ],
    interests: [
      "Open Source Contributing",
      "Competitive Coding",
      "UI/UX Design",
      "Artificial Intelligence"
    ]
  });

  const [newSkillInput, setNewSkillInput] = useState("");
  const [newCertInput, setNewCertInput] = useState("");
  const [newAchieveInput, setNewAchieveInput] = useState("");
  const [newInterestInput, setNewInterestInput] = useState("");

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

  const templates = [
    { id: "modern", name: "Modern", rating: 5, bg: "modern" },
    { id: "ats-friendly", name: "ATS Friendly", rating: 5, bg: "ats" },
    { id: "minimal", name: "Minimal", rating: 5, bg: "minimal" },
    { id: "creative", name: "Creative", rating: 5, bg: "creative" },
    { id: "executive", name: "Executive", rating: 5, bg: "executive" }
  ];

  // Helper Input Handler for Top-Level Fields
  const handleInputChange = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  // ── EDUCATION HANDLERS ──
  const handleEduChange = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    }));
  };

  const handleAddEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: "Degree / Qualification Title",
      institution: "University / Institution Name",
      period: "2024 – Present",
      score: "Grade / Percentage"
    };
    setResumeData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const handleDeleteEducation = (id) => {
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  };

  // ── EXPERIENCE HANDLERS ──
  const handleExpChange = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    }));
  };

  const handleExpBulletChange = (expId, bulletIdx, value) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => {
        if (exp.id === expId) {
          const newBullets = [...exp.bullets];
          newBullets[bulletIdx] = value;
          return { ...exp, bullets: newBullets };
        }
        return exp;
      })
    }));
  };

  const handleAddExpBullet = (expId) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => {
        if (exp.id === expId) {
          return { ...exp, bullets: [...exp.bullets, "New key responsibility or achievement..."] };
        }
        return exp;
      })
    }));
  };

  const handleAddExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "Job Position / Title",
      company: "Company Name",
      period: "2024 – Present",
      bullets: ["Developed software features and collaborated with team."]
    };
    setResumeData((prev) => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  };

  const handleDeleteExperience = (id) => {
    setResumeData((prev) => ({ ...prev, experiences: prev.experiences.filter((e) => e.id !== id) }));
  };

  // ── PROJECTS HANDLERS ──
  const handleProjChange = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    }));
  };

  const handleAddProject = () => {
    const newProj = {
      id: Date.now(),
      name: "New Project Name",
      tech: "React, Node.js, SQL",
      desc: "Brief project description explaining the technologies and features built."
    };
    setResumeData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const handleDeleteProject = (id) => {
    setResumeData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  };

  // ── SKILLS HANDLERS ──
  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, newSkillInput.trim()] }));
    setNewSkillInput("");
  };

  const handleDeleteSkill = (idxToRemove) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== idxToRemove) }));
  };

  // ── CERTIFICATIONS HANDLERS ──
  const handleAddCert = () => {
    if (!newCertInput.trim()) return;
    setResumeData((prev) => ({ ...prev, certifications: [...prev.certifications, newCertInput.trim()] }));
    setNewCertInput("");
  };

  const handleDeleteCert = (idxToRemove) => {
    setResumeData((prev) => ({ ...prev, certifications: prev.certifications.filter((_, idx) => idx !== idxToRemove) }));
  };

  // ── ACHIEVEMENTS HANDLERS ──
  const handleAddAchievement = () => {
    if (!newAchieveInput.trim()) return;
    setResumeData((prev) => ({ ...prev, achievements: [...prev.achievements, newAchieveInput.trim()] }));
    setNewAchieveInput("");
  };

  const handleDeleteAchievement = (idxToRemove) => {
    setResumeData((prev) => ({ ...prev, achievements: prev.achievements.filter((_, idx) => idx !== idxToRemove) }));
  };

  // ── LANGUAGES HANDLERS ──
  const handleLangChange = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    }));
  };

  const handleAddLanguage = () => {
    const newLang = { id: Date.now(), name: "Language Name", level: "•••••" };
    setResumeData((prev) => ({ ...prev, languages: [...prev.languages, newLang] }));
  };

  const handleDeleteLanguage = (id) => {
    setResumeData((prev) => ({ ...prev, languages: prev.languages.filter((l) => l.id !== id) }));
  };

  // ── INTERESTS HANDLERS ──
  const handleAddInterest = () => {
    if (!newInterestInput.trim()) return;
    setResumeData((prev) => ({ ...prev, interests: [...prev.interests, newInterestInput.trim()] }));
    setNewInterestInput("");
  };

  const handleDeleteInterest = (idxToRemove) => {
    setResumeData((prev) => ({ ...prev, interests: prev.interests.filter((_, idx) => idx !== idxToRemove) }));
  };

  // Save Toast
  const handleSaveChanges = () => {
    setToastMessage("💾 Resume changes saved successfully!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  // AI Assistant Action Handlers
  const handleAiAction = (actionName) => {
    if (actionName === "Improve Summary") {
      setResumeData((prev) => ({
        ...prev,
        summary:
          "Passionate Full-Stack Software Engineer with expertise in React, Node.js, and Java. Proven track record in building scalable web platforms, REST APIs, and responsive UI components. Strong problem-solver dedicated to code excellence and collaborative innovation."
      }));
      setToastMessage("✨ Professional summary enhanced by AI!");
    } else if (actionName === "Suggest Skills") {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, "TypeScript", "Docker", "RESTful APIs", "GraphQL"]
      }));
      setToastMessage("💡 Added trending skills (TypeScript, Docker, REST APIs)!");
    } else if (actionName === "ATS Optimization") {
      setToastMessage("📈 Resume optimized for ATS scanners! ATS Score increased to 96%!");
    } else {
      setToastMessage(`🪄 Executed AI action: "${actionName}"!`);
    }
    setTimeout(() => setToastMessage(""), 4000);
  };

  // PDF Download Trigger
  const handleDownloadPDF = () => {
    const textContent = `
==================================================
RESUME - ${resumeData.fullName.toUpperCase()} (${resumeData.jobTitle})
==================================================
Contact: ${resumeData.email} | ${resumeData.phone} | ${resumeData.location}
Links: ${resumeData.linkedin} | ${resumeData.github} | ${resumeData.portfolio}

PROFILE SUMMARY:
${resumeData.summary}

SKILLS:
${resumeData.skills.join(", ")}

EXPERIENCE:
${resumeData.experiences
  .map((e) => `${e.title} - ${e.company} (${e.period})\n${e.bullets.map((b) => `  * ${b}`).join("\n")}`)
  .join("\n\n")}

EDUCATION:
${resumeData.education.map((e) => `${e.degree} - ${e.institution} (${e.period}) ${e.score || ""}`).join("\n")}

PROJECTS:
${resumeData.projects.map((p) => `${p.name} (${p.tech})\n  * ${p.desc}`).join("\n")}

CERTIFICATIONS:
${resumeData.certifications.map((c) => `  * ${c}`).join("\n")}

ACHIEVEMENTS:
${resumeData.achievements.map((a) => `  * ${a}`).join("\n")}

INTERESTS:
${resumeData.interests.join(", ")}
==================================================
`;

    const blob = new Blob([textContent], { type: "application/pdf;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${resumeData.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
    link.click();

    setToastMessage(`📥 PDF Resume for "${resumeData.fullName}" downloaded successfully!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // DOCX Download Trigger
  const handleDownloadDOCX = () => {
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: "application/msword;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${resumeData.fullName.replace(/\s+/g, "_")}_Resume.docx`;
    link.click();

    setToastMessage(`📘 DOCX Resume for "${resumeData.fullName}" downloaded successfully!`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Share Verification Link
  const handleShareResume = () => {
    const url = `https://skillsphere.edu/resume/${resumeData.fullName.toLowerCase().replace(/\s+/g, "")}`;
    navigator.clipboard.writeText(url);
    setToastMessage("🔗 Resume sharing link copied to clipboard!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Publish to Portfolio
  const handlePublishPortfolio = () => {
    setToastMessage("🚀 Resume published to your SkillSphere Portfolio!");
    setTimeout(() => setToastMessage(""), 4000);
  };

  // ── 1:1 TEMPLATE DOCUMENT RENDERER FUNCTION ──
  const renderResumeDocument = (tplType) => {
    // 1. ATS FRIENDLY TEMPLATE (Image 1: Centered Header, 1-Col Layout, Underlined Titles, 3-Col Skills)
    if (tplType === "ats-friendly") {
      return (
        <div className="a4DocumentPaper ats-friendly">
          <div className="atsHeaderCenter">
            <h1 className="atsName">{resumeData.fullName.toUpperCase()}</h1>
            <span className="atsSubTitle">{resumeData.jobTitle}</span>

            <div className="atsContactIconsRow">
              <span>📞 {resumeData.phone}</span>
              <span>✉️ {resumeData.email}</span>
              <span>📍 {resumeData.location}</span>
            </div>
            <div className="atsDividerLine"></div>
          </div>

          <div className="atsContentBody">
            <div className="atsSection">
              <h5 className="atsSecHeading">ABOUT ME</h5>
              <div className="atsSecUnderline"></div>
              <p className="atsTextP">{resumeData.summary}</p>
            </div>

            <div className="atsSection">
              <h5 className="atsSecHeading">EDUCATION</h5>
              <div className="atsSecUnderline"></div>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="atsBlockItem">
                  <div className="atsMetaRow">
                    <strong className="atsInstName">{edu.institution}</strong>
                    <span className="atsDateStr">{edu.period}</span>
                  </div>
                  <strong className="atsDegreeTitle">{edu.degree}</strong>
                  {edu.score && <p className="atsScoreP">{edu.score}</p>}
                </div>
              ))}
            </div>

            <div className="atsSection">
              <h5 className="atsSecHeading">WORK EXPERIENCE</h5>
              <div className="atsSecUnderline"></div>
              {resumeData.experiences.map((exp) => (
                <div key={exp.id} className="atsBlockItem">
                  <div className="atsMetaRow">
                    <strong className="atsInstName">{exp.company}</strong>
                    <span className="atsDateStr">{exp.period}</span>
                  </div>
                  <strong className="atsDegreeTitle">{exp.title}</strong>
                  <ul className="atsBulletsList">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="atsSection">
              <h5 className="atsSecHeading">SKILLS</h5>
              <div className="atsSecUnderline"></div>
              <div className="ats3ColSkills">
                {resumeData.skills.map((s, idx) => (
                  <span key={idx}>• {s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. MINIMAL TEMPLATE (Image 2: Top Photo Right, 2-Col Contact, Gray Header Bars, Left Date Column)
    if (tplType === "minimal") {
      return (
        <div className="a4DocumentPaper minimal">
          <div className="minimalHeaderRow">
            <div className="minHeaderLeft">
              <h1 className="minName">{resumeData.fullName} <span className="minJobTitle">/ {resumeData.jobTitle}</span></h1>
              <div className="minContact2Col">
                <div>✉️ {resumeData.email}</div>
                <div>📞 {resumeData.phone}</div>
                <div>🔗 {resumeData.linkedin}</div>
                <div>📍 {resumeData.location}</div>
              </div>
            </div>
            <img src={resumeData.photoUrl} alt="Avatar" className="minPhotoRight" />
          </div>

          <div className="minimalBody">
            <div className="minSection">
              <div className="minGrayHeaderBar">Summary</div>
              <p className="minSummaryText">{resumeData.summary}</p>
            </div>

            <div className="minSection">
              <div className="minGrayHeaderBar">Professional Experience</div>
              {resumeData.experiences.map((exp) => (
                <div key={exp.id} className="min2ColRow">
                  <div className="minLeftDateCol">
                    <span>{exp.period}</span>
                    <small>{exp.company}</small>
                  </div>
                  <div className="minRightMainCol">
                    <strong>{exp.title}</strong>
                    <ul>
                      {exp.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="minSection">
              <div className="minGrayHeaderBar">Education</div>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="min2ColRow">
                  <div className="minLeftDateCol">
                    <span>{edu.period}</span>
                  </div>
                  <div className="minRightMainCol">
                    <strong>{edu.degree}</strong>, <em>{edu.institution}</em>
                  </div>
                </div>
              ))}
            </div>

            <div className="minSection">
              <div className="minGrayHeaderBar">Skills</div>
              <div className="min3ColGrid">
                {resumeData.skills.map((s, idx) => (
                  <span key={idx}>• {s}</span>
                ))}
              </div>
            </div>

            {resumeData.certifications.length > 0 && (
              <div className="minSection">
                <div className="minGrayHeaderBar">Certificates</div>
                <div className="min3ColGrid">
                  {resumeData.certifications.map((c, idx) => (
                    <span key={idx}>• {c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 3. CREATIVE TEMPLATE (Image 3: Beige Top Banner, Overlapping Avatar Circle, Light Gray Left Column)
    if (tplType === "creative") {
      return (
        <div className="a4DocumentPaper creative">
          <div className="creativeTopBeigeHeader">
            <h1 className="crName">{resumeData.fullName.toUpperCase()}</h1>
            <span className="crTitle">{resumeData.jobTitle.toUpperCase()}</span>
          </div>

          <div className="creativeBody2Col">
            <div className="crLeftGrayCol">
              <img src={resumeData.photoUrl} alt="Avatar" className="crAvatarCircle" />

              <div className="crSecBlock">
                <h5 className="crSecTitle">CONTACT</h5>
                <span>📞 {resumeData.phone}</span>
                <span>✉️ {resumeData.email}</span>
                <span>📍 {resumeData.location}</span>
                <span>🔗 {resumeData.linkedin}</span>
              </div>

              <div className="crSecBlock">
                <h5 className="crSecTitle">EDUCATION</h5>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="crEduItem">
                    <strong>{edu.degree}</strong>
                    <span>{edu.institution}</span>
                    <small>{edu.period}</small>
                  </div>
                ))}
              </div>

              <div className="crSecBlock">
                <h5 className="crSecTitle">SKILLS</h5>
                <ul>
                  {resumeData.skills.map((s, idx) => (
                    <li key={idx}>• {s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="crRightWhiteCol">
              <div className="crMainSec">
                <h5 className="crMainHeading">PROFILE</h5>
                <p>{resumeData.summary}</p>
              </div>

              <div className="crMainSec">
                <h5 className="crMainHeading">PROFESSIONAL EXPERIENCE</h5>
                {resumeData.experiences.map((exp) => (
                  <div key={exp.id} className="crExpItem">
                    <strong>{exp.title.toUpperCase()}</strong>
                    <div className="crSubMeta">{exp.company} | {exp.period}</div>
                    <ul>
                      {exp.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {resumeData.projects.length > 0 && (
                <div className="crMainSec">
                  <h5 className="crMainHeading">PROJECTS</h5>
                  {resumeData.projects.map((p) => (
                    <div key={p.id} className="crProjItem">
                      <strong>{p.name}</strong> <small>({p.tech})</small>
                      <p>{p.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 4. EXECUTIVE TEMPLATE (Image 4: Soft Rose Pink Top Banner, Centered Photo, Red Bold Title, Pink Section Bars)
    if (tplType === "executive") {
      return (
        <div className="a4DocumentPaper executive">
          <div className="execTopPinkBanner"></div>
          
          <div className="execHeaderCenter">
            <img src={resumeData.photoUrl} alt="Avatar" className="execAvatarSquare" />
            <h1 className="execNameRed">{resumeData.fullName.toUpperCase()}</h1>
            <div className="execRedLine"></div>
          </div>

          <div className="execPinkSectionBar">CONTACT</div>
          <div className="execContactRow">
            <span><strong>Address:</strong> {resumeData.location}</span>
            <span><strong>Phone:</strong> {resumeData.phone}</span>
            <span><strong>Email:</strong> {resumeData.email}</span>
          </div>

          <div className="execBodyContent">
            <div className="execSection">
              <div className="execPinkSectionBar">RESUME OBJECTIVE</div>
              <p className="execObjectiveText">{resumeData.summary}</p>
              <div className="execRedLineThin"></div>
            </div>

            <div className="execSection">
              <div className="execPinkSectionBar">WORK HISTORY</div>
              {resumeData.experiences.map((exp) => (
                <div key={exp.id} className="execExpBlock">
                  <strong className="execExpTitle">{exp.title}, <span className="execPeriod">{exp.period}</span></strong>
                  <span className="execCompName">{exp.company}</span>
                  <ul>
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="execRedLineThin"></div>
            </div>

            <div className="execSection">
              <div className="execPinkSectionBar">EDUCATION</div>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="execEduBlock">
                  <strong>{edu.degree}, <span className="execPeriod">{edu.period}</span></strong>
                  <span>{edu.institution}</span>
                </div>
              ))}
              <div className="execRedLineThin"></div>
            </div>

            <div className="execSection">
              <div className="execPinkSectionBar">SKILLS</div>
              <div className="execSkillsRatingGrid">
                {resumeData.skills.map((s, idx) => (
                  <div key={idx} className="execSkillRatingItem">
                    <span>{s}</span>
                    <span className="redDots">🔴🔴🔴🔴🔴</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 5. MODERN TEMPLATE (DEFAULT: 2-Column Dark Left Sidebar Layout)
    return (
      <div className="a4DocumentPaper modern">
        <div className="docLeftSidebar">
          <img src={resumeData.photoUrl} alt="Avatar" className="docAvatarPhoto" />

          <div className="docContactInfo">
            <span>📍 {resumeData.location}</span>
            <span>📞 {resumeData.phone}</span>
            <span>✉️ {resumeData.email}</span>
            <span>🔗 {resumeData.linkedin}</span>
            <span>🐙 {resumeData.github}</span>
          </div>

          <div className="docSkillsSec">
            <h5>SKILLS</h5>
            <ul>
              {resumeData.skills.map((s, idx) => (
                <li key={idx}>• {s}</li>
              ))}
            </ul>
          </div>

          <div className="docLangSec">
            <h5>LANGUAGES</h5>
            {resumeData.languages.map((l) => (
              <div key={l.id} className="langRow">
                <span>{l.name}</span>
                <span className="dots">{l.level}</span>
              </div>
            ))}
          </div>

          {resumeData.interests.length > 0 && (
            <div className="docSkillsSec">
              <h5>INTERESTS</h5>
              <ul>
                {resumeData.interests.map((it, idx) => (
                  <li key={idx}>• {it}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="docRightContent">
          <h2 className="docName">{resumeData.fullName}</h2>
          <span className="docTitle">{resumeData.jobTitle}</span>

          <div className="docSection">
            <h5>PROFILE</h5>
            <p>{resumeData.summary}</p>
          </div>

          {resumeData.experiences.length > 0 && (
            <div className="docSection">
              <h5>EXPERIENCE</h5>
              {resumeData.experiences.map((exp) => (
                <div key={exp.id} className="docExpItem">
                  <div className="expHeader">
                    <strong>{exp.title}</strong>
                    <span className="period">{exp.period}</span>
                  </div>
                  <span className="compName">{exp.company}</span>
                  <ul>
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {resumeData.education.length > 0 && (
            <div className="docSection">
              <h5>EDUCATION</h5>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="docEduItem">
                  <div className="expHeader">
                    <strong>{edu.degree}</strong>
                    <span className="period">{edu.period}</span>
                  </div>
                  <span>{edu.institution}</span>
                  {edu.score && <span className="score">{edu.score}</span>}
                </div>
              ))}
            </div>
          )}

          {resumeData.projects.length > 0 && (
            <div className="docSection">
              <h5>PROJECTS</h5>
              {resumeData.projects.map((p) => (
                <div key={p.id} className="docProjItem">
                  <strong>{p.name}</strong> <small>({p.tech})</small>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          )}

          {resumeData.certifications.length > 0 && (
            <div className="docSection">
              <h5>CERTIFICATIONS</h5>
              <ul>
                {resumeData.certifications.map((c, idx) => (
                  <li key={idx}>• {c}</li>
                ))}
              </ul>
            </div>
          )}

          {resumeData.achievements.length > 0 && (
            <div className="docSection">
              <h5>ACHIEVEMENTS</h5>
              <ul>
                {resumeData.achievements.map((a, idx) => (
                  <li key={idx}>⭐ {a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`rbpWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      {/* Main Grid Container */}
      <div className="rbpMainContainer">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="rbpLeftSidebar">
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
                    className={`sdNavItem ${item.id === "resume" ? "active" : ""}`}
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
        <div className="rbpRightBodyArea">
          
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
                    <strong>{resumeData.fullName}</strong>
                    <span>Student</span>
                  </div>
                  <span className="dropdownArrow">▾</span>
                </div>

                {isUserMenuOpen && (
                  <div className="sdUserMenuDropdown">
                    <div className="dropdownHeader">
                      <strong>{resumeData.fullName}</strong>
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
          <div className="rbpPageHeaderRow">
            <div className="rbpPageHeader">
              <h1>Resume Builder 📄</h1>
              <p>Create a professional ATS-friendly resume in minutes.</p>
            </div>

            <div className="rbpHeaderActionsRight">
              <span className="lastSavedTag"><FaCheckCircle color="#10B981" /> Last Saved: Just now ▾</span>
              {isResumeAnalyzed && <div className="atsScorePill">ATS Score : 92%</div>}
              <button className="btnNewResume">+ New Resume ▾</button>
            </div>
          </div>

          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className="rbpToastAlert">
              <span>{toastMessage}</span>
            </div>
          )}

          {/* ── SECTION 1: CHOOSE A TEMPLATE CAROUSEL ── */}
          <div className="rbpSectionBlock">
            <div className="sectionHeaderRow">
              <h3>Choose a Template</h3>
              <span className="viewAllLink">View All Templates →</span>
            </div>

            <div className="templatesGrid">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  className={`templateCard ${selectedTemplate === tpl.id ? "activeSelected" : ""}`}
                  onClick={() => setSelectedTemplate(tpl.id)}
                >
                  {selectedTemplate === tpl.id && <FaCheckCircle className="tplActiveCheck" />}
                  
                  <div className={`tplMiniPreview ${tpl.bg}`}>
                    <div className="tplMiniSidebar"></div>
                    <div className="tplMiniLines">
                      <div className="line l1"></div>
                      <div className="line l2"></div>
                      <div className="line l3"></div>
                    </div>
                  </div>

                  <h4>{tpl.name}</h4>
                  <div className="starsRow">
                    {Array.from({ length: tpl.rating }).map((_, i) => (
                      <FaStar key={i} color="#F59E0B" fontSize="10px" />
                    ))}
                  </div>

                  <div className="tplBtnGroup">
                    <button
                      className="btnUseTpl"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(tpl.id);
                        setToastMessage(`Selected "${tpl.name}" Template!`);
                        setTimeout(() => setToastMessage(""), 3000);
                      }}
                    >
                      Use Template
                    </button>
                    <button
                      className="btnPreviewTpl"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(tpl.id);
                        setIsPreviewModalOpen(true);
                      }}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 2 & 3: MAIN WORKSPACE + LIVE PREVIEW COLUMN ── */}
          <div className="rbpWorkspaceGrid">
            
            {/* LEFT EDIT FORM WORKSPACE */}
            <div className="rbpLeftFormCol">
              
              {/* EDIT YOUR RESUME ACCORDION FORM */}
              <div className="rbpFormBlock">
                <h3>Edit Your Resume</h3>

                <div className="accordionContainer">
                  
                  {/* Left Accordion Navigation Tabs */}
                  <div className="accordionTabsCol">
                    <button
                      className={`accTab ${activeTab === "personal" ? "active" : ""}`}
                      onClick={() => setActiveTab("personal")}
                    >
                      👤 Personal Information <FaChevronDown className="arr" />
                    </button>
                    <button
                      className={`accTab ${activeTab === "education" ? "active" : ""}`}
                      onClick={() => setActiveTab("education")}
                    >
                      🎓 Education <FaChevronDown className="arr" />
                    </button>
                    <button
                      className={`accTab ${activeTab === "experience" ? "active" : ""}`}
                      onClick={() => setActiveTab("experience")}
                    >
                      💼 Experience <FaChevronDown className="arr" />
                    </button>
                    <button
                      className={`accTab ${activeTab === "projects" ? "active" : ""}`}
                      onClick={() => setActiveTab("projects")}
                    >
                      🚀 Projects <FaChevronDown className="arr" />
                    </button>
                    <button
                      className={`accTab ${activeTab === "skills" ? "active" : ""}`}
                      onClick={() => setActiveTab("skills")}
                    >
                      ⚡ Skills <FaChevronDown className="arr" />
                    </button>
                    <button
                      className={`accTab ${activeTab === "certifications" ? "active" : ""}`}
                      onClick={() => setActiveTab("certifications")}
                    >
                      🛡️ Certifications <FaChevronDown className="arr" />
                    </button>
                    <button
                      className={`accTab ${activeTab === "achievements" ? "active" : ""}`}
                      onClick={() => setActiveTab("achievements")}
                    >
                      ⭐ Achievements <FaChevronDown className="arr" />
                    </button>
                    <button
                      className={`accTab ${activeTab === "languages" ? "active" : ""}`}
                      onClick={() => setActiveTab("languages")}
                    >
                      🌐 Languages <FaChevronDown className="arr" />
                    </button>
                    <button
                      className={`accTab ${activeTab === "interests" ? "active" : ""}`}
                      onClick={() => setActiveTab("interests")}
                    >
                      🎯 Interests <FaChevronDown className="arr" />
                    </button>
                  </div>

                  {/* Right Form Editor Panel */}
                  <div className="formEditorPanel">
                    
                    {/* TAB 1: PERSONAL INFORMATION */}
                    {activeTab === "personal" && (
                      <div className="formFieldsGroup">
                        <div className="photoUploadRow">
                          <span>Photo</span>
                          <div className="photoBox">
                            <img src={resumeData.photoUrl} alt="Avatar" className="userPhotoAvatar" />
                            <div className="uploadBtnBox">
                              <FaCamera color="#F9572A" />
                              <span>Upload Photo</span>
                              <small>JPG, PNG (max 2MB)</small>
                            </div>
                          </div>
                        </div>

                        <div className="form2Col">
                          <div className="inputGroup">
                            <label>Full Name</label>
                            <input
                              type="text"
                              value={resumeData.fullName}
                              onChange={(e) => handleInputChange("fullName", e.target.value)}
                            />
                          </div>

                          <div className="inputGroup">
                            <label>Job Title</label>
                            <input
                              type="text"
                              value={resumeData.jobTitle}
                              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form2Col">
                          <div className="inputGroup">
                            <label>Email</label>
                            <input
                              type="email"
                              value={resumeData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                          </div>

                          <div className="inputGroup">
                            <label>Phone</label>
                            <input
                              type="text"
                              value={resumeData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form2Col">
                          <div className="inputGroup">
                            <label>Location</label>
                            <input
                              type="text"
                              value={resumeData.location}
                              onChange={(e) => handleInputChange("location", e.target.value)}
                            />
                          </div>

                          <div className="inputGroup">
                            <label>LinkedIn</label>
                            <input
                              type="text"
                              value={resumeData.linkedin}
                              onChange={(e) => handleInputChange("linkedin", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form2Col">
                          <div className="inputGroup">
                            <label>GitHub</label>
                            <input
                              type="text"
                              value={resumeData.github}
                              onChange={(e) => handleInputChange("github", e.target.value)}
                            />
                          </div>

                          <div className="inputGroup">
                            <label>Portfolio <small>(Optional)</small></label>
                            <input
                              type="text"
                              value={resumeData.portfolio}
                              onChange={(e) => handleInputChange("portfolio", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="inputGroup">
                          <label>Professional Summary</label>
                          <textarea
                            rows="4"
                            value={resumeData.summary}
                            onChange={(e) => handleInputChange("summary", e.target.value)}
                          />
                        </div>

                        <button className="btnSaveForm" onClick={handleSaveChanges}>
                          Save Changes
                        </button>
                      </div>
                    )}

                    {/* TAB 2: EDUCATION */}
                    {activeTab === "education" && (
                      <div className="formFieldsGroup">
                        <h4>🎓 Education Entries ({resumeData.education.length})</h4>

                        {resumeData.education.map((edu, idx) => (
                          <div key={edu.id} className="dynamicEntryCard">
                            <div className="entryCardHeader">
                              <span>Entry #{idx + 1}</span>
                              <button
                                className="btnDeleteEntry"
                                onClick={() => handleDeleteEducation(edu.id)}
                                title="Delete Entry"
                              >
                                <FaTrash />
                              </button>
                            </div>

                            <div className="form2Col">
                              <div className="inputGroup">
                                <label>Degree / Qualification</label>
                                <input
                                  type="text"
                                  value={edu.degree}
                                  onChange={(e) => handleEduChange(edu.id, "degree", e.target.value)}
                                />
                              </div>

                              <div className="inputGroup">
                                <label>Institution / College</label>
                                <input
                                  type="text"
                                  value={edu.institution}
                                  onChange={(e) => handleEduChange(edu.id, "institution", e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="form2Col">
                              <div className="inputGroup">
                                <label>Period / Duration</label>
                                <input
                                  type="text"
                                  value={edu.period}
                                  onChange={(e) => handleEduChange(edu.id, "period", e.target.value)}
                                />
                              </div>

                              <div className="inputGroup">
                                <label>Score / Percentage / CGPA</label>
                                <input
                                  type="text"
                                  value={edu.score || ""}
                                  onChange={(e) => handleEduChange(edu.id, "score", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        <button className="btnAddEntry" onClick={handleAddEducation}>
                          <FaPlus /> Add New Education
                        </button>

                        <button className="btnSaveForm" onClick={handleSaveChanges}>
                          Save Changes
                        </button>
                      </div>
                    )}

                    {/* TAB 3: EXPERIENCE */}
                    {activeTab === "experience" && (
                      <div className="formFieldsGroup">
                        <h4>💼 Work Experience ({resumeData.experiences.length})</h4>

                        {resumeData.experiences.map((exp, idx) => (
                          <div key={exp.id} className="dynamicEntryCard">
                            <div className="entryCardHeader">
                              <span>Experience #{idx + 1}</span>
                              <button
                                className="btnDeleteEntry"
                                onClick={() => handleDeleteExperience(exp.id)}
                                title="Delete Entry"
                              >
                                <FaTrash />
                              </button>
                            </div>

                            <div className="form2Col">
                              <div className="inputGroup">
                                <label>Job Title</label>
                                <input
                                  type="text"
                                  value={exp.title}
                                  onChange={(e) => handleExpChange(exp.id, "title", e.target.value)}
                                />
                              </div>

                              <div className="inputGroup">
                                <label>Company Name</label>
                                <input
                                  type="text"
                                  value={exp.company}
                                  onChange={(e) => handleExpChange(exp.id, "company", e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="inputGroup">
                              <label>Period / Duration</label>
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) => handleExpChange(exp.id, "period", e.target.value)}
                              />
                            </div>

                            <div className="inputGroup">
                              <label>Key Responsibilities & Accomplishments</label>
                              {exp.bullets.map((bullet, bIdx) => (
                                <div key={bIdx} className="bulletInputRow">
                                  <input
                                    type="text"
                                    value={bullet}
                                    onChange={(e) => handleExpBulletChange(exp.id, bIdx, e.target.value)}
                                  />
                                </div>
                              ))}
                              <button
                                className="btnAddBullet"
                                onClick={() => handleAddExpBullet(exp.id)}
                              >
                                + Add Bullet Point
                              </button>
                            </div>
                          </div>
                        ))}

                        <button className="btnAddEntry" onClick={handleAddExperience}>
                          <FaPlus /> Add New Experience
                        </button>

                        <button className="btnSaveForm" onClick={handleSaveChanges}>
                          Save Changes
                        </button>
                      </div>
                    )}

                    {/* TAB 4: PROJECTS */}
                    {activeTab === "projects" && (
                      <div className="formFieldsGroup">
                        <h4>🚀 Projects ({resumeData.projects.length})</h4>

                        {resumeData.projects.map((proj, idx) => (
                          <div key={proj.id} className="dynamicEntryCard">
                            <div className="entryCardHeader">
                              <span>Project #{idx + 1}</span>
                              <button
                                className="btnDeleteEntry"
                                onClick={() => handleDeleteProject(proj.id)}
                                title="Delete Entry"
                              >
                                <FaTrash />
                              </button>
                            </div>

                            <div className="form2Col">
                              <div className="inputGroup">
                                <label>Project Name</label>
                                <input
                                  type="text"
                                  value={proj.name}
                                  onChange={(e) => handleProjChange(proj.id, "name", e.target.value)}
                                />
                              </div>

                              <div className="inputGroup">
                                <label>Technologies Used</label>
                                <input
                                  type="text"
                                  value={proj.tech}
                                  onChange={(e) => handleProjChange(proj.id, "tech", e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="inputGroup">
                              <label>Description</label>
                              <textarea
                                rows="3"
                                value={proj.desc}
                                onChange={(e) => handleProjChange(proj.id, "desc", e.target.value)}
                              />
                            </div>
                          </div>
                        ))}

                        <button className="btnAddEntry" onClick={handleAddProject}>
                          <FaPlus /> Add New Project
                        </button>

                        <button className="btnSaveForm" onClick={handleSaveChanges}>
                          Save Changes
                        </button>
                      </div>
                    )}

                    {/* TAB 5: SKILLS */}
                    {activeTab === "skills" && (
                      <div className="formFieldsGroup">
                        <h4>⚡ Skills Manager ({resumeData.skills.length})</h4>
                        <p className="subText">Type a skill and click "Add Skill" to update your live resume chips!</p>

                        <div className="addChipInputRow">
                          <input
                            type="text"
                            placeholder="Add a new skill (e.g., TypeScript, Docker, Node.js)"
                            value={newSkillInput}
                            onChange={(e) => setNewSkillInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                          />
                          <button className="btnAddTag" onClick={handleAddSkill}>
                            Add Skill
                          </button>
                        </div>

                        <div className="skillChipsContainer">
                          {resumeData.skills.map((skill, idx) => (
                            <span key={idx} className="skillTagChip">
                              {skill}
                              <button onClick={() => handleDeleteSkill(idx)}>&times;</button>
                            </span>
                          ))}
                        </div>

                        <button className="btnSaveForm" onClick={handleSaveChanges}>
                          Save Changes
                        </button>
                      </div>
                    )}

                    {/* TAB 6: CERTIFICATIONS */}
                    {activeTab === "certifications" && (
                      <div className="formFieldsGroup">
                        <h4>🛡️ Certifications ({resumeData.certifications.length})</h4>

                        <div className="addChipInputRow">
                          <input
                            type="text"
                            placeholder="Add new certification (e.g., AWS Solutions Architect)"
                            value={newCertInput}
                            onChange={(e) => setNewCertInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddCert()}
                          />
                          <button className="btnAddTag" onClick={handleAddCert}>
                            Add Certification
                          </button>
                        </div>

                        <div className="simpleListContainer">
                          {resumeData.certifications.map((cert, idx) => (
                            <div key={idx} className="listItemRow">
                              <span>• {cert}</span>
                              <button onClick={() => handleDeleteCert(idx)} title="Delete Certification">
                                <FaTrash />
                              </button>
                            </div>
                          ))}
                        </div>

                        <button className="btnSaveForm" onClick={handleSaveChanges}>
                          Save Changes
                        </button>
                      </div>
                    )}

                    {/* TAB 7: ACHIEVEMENTS */}
                    {activeTab === "achievements" && (
                      <div className="formFieldsGroup">
                        <h4>⭐ Achievements & Awards ({resumeData.achievements.length})</h4>

                        <div className="addChipInputRow">
                          <input
                            type="text"
                            placeholder="Add achievement (e.g., Winner of Smart India Hackathon)"
                            value={newAchieveInput}
                            onChange={(e) => setNewAchieveInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddAchievement()}
                          />
                          <button className="btnAddTag" onClick={handleAddAchievement}>
                            Add Achievement
                          </button>
                        </div>

                        <div className="simpleListContainer">
                          {resumeData.achievements.map((ach, idx) => (
                            <div key={idx} className="listItemRow">
                              <span>⭐ {ach}</span>
                              <button onClick={() => handleDeleteAchievement(idx)} title="Delete Achievement">
                                <FaTrash />
                              </button>
                            </div>
                          ))}
                        </div>

                        <button className="btnSaveForm" onClick={handleSaveChanges}>
                          Save Changes
                        </button>
                      </div>
                    )}

                    {/* TAB 8: LANGUAGES */}
                    {activeTab === "languages" && (
                      <div className="formFieldsGroup">
                        <h4>🌐 Languages ({resumeData.languages.length})</h4>

                        {resumeData.languages.map((lang) => (
                          <div key={lang.id} className="dynamicEntryCard">
                            <div className="entryCardHeader">
                              <span>Language Entry</span>
                              <button
                                className="btnDeleteEntry"
                                onClick={() => handleDeleteLanguage(lang.id)}
                                title="Delete Language"
                              >
                                <FaTrash />
                              </button>
                            </div>

                            <div className="form2Col">
                              <div className="inputGroup">
                                <label>Language Name</label>
                                <input
                                  type="text"
                                  value={lang.name}
                                  onChange={(e) => handleLangChange(lang.id, "name", e.target.value)}
                                />
                              </div>

                              <div className="inputGroup">
                                <label>Proficiency Dots / Level</label>
                                <input
                                  type="text"
                                  value={lang.level}
                                  onChange={(e) => handleLangChange(lang.id, "level", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        <button className="btnAddEntry" onClick={handleAddLanguage}>
                          <FaPlus /> Add New Language
                        </button>

                        <button className="btnSaveForm" onClick={handleSaveChanges}>
                          Save Changes
                        </button>
                      </div>
                    )}

                    {/* TAB 9: INTERESTS */}
                    {activeTab === "interests" && (
                      <div className="formFieldsGroup">
                        <h4>🎯 Interests & Hobbies ({resumeData.interests.length})</h4>

                        <div className="addChipInputRow">
                          <input
                            type="text"
                            placeholder="Add interest (e.g., Open Source Contributing, Chess)"
                            value={newInterestInput}
                            onChange={(e) => setNewInterestInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddInterest()}
                          />
                          <button className="btnAddTag" onClick={handleAddInterest}>
                            Add Interest
                          </button>
                        </div>

                        <div className="skillChipsContainer">
                          {resumeData.interests.map((interest, idx) => (
                            <span key={idx} className="skillTagChip interest">
                              🎯 {interest}
                              <button onClick={() => handleDeleteInterest(idx)}>&times;</button>
                            </span>
                          ))}
                        </div>

                        <button className="btnSaveForm" onClick={handleSaveChanges}>
                          Save Changes
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT STICKY LIVE PREVIEW COLUMN */}
            <div className="rbpRightPreviewCol">
              <div className="livePreviewCard">
                <div className="previewTitleRow">
                  <h4>Live Preview ({selectedTemplate.toUpperCase()})</h4>
                  <FaRedo className="refreshBtnIcon" title="Refresh Preview" />
                </div>

                {/* DYNAMIC REAL-TIME A4 DOCUMENT RENDER */}
                {renderResumeDocument(selectedTemplate)}

              </div>
            </div>

          </div>

          {/* ── SECTION 5: BOTTOM FLOATING ACTION BAR ── */}
          <div className="rbpFloatingActionBar">
            <button className="btnFloatOutline" onClick={handleSaveChanges}>
              Save Draft
            </button>
            <button className="btnFloatOutline" onClick={() => setIsPreviewModalOpen(true)}>
              <FaEye /> Preview
            </button>
            <button className="btnFloatOutline orange" onClick={handleDownloadPDF}>
              <FaDownload /> Download PDF
            </button>
            <button className="btnFloatOutline blue" onClick={handleDownloadDOCX}>
              <FaFileWord /> Download DOCX
            </button>
            <button className="btnFloatOutline" onClick={handleShareResume}>
              <FaShareAlt /> Share Resume
            </button>
            <button className="btnFloatPrimary" onClick={handlePublishPortfolio}>
              🚀 Publish to Portfolio
            </button>
          </div>

        </div>
      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {isPreviewModalOpen && (
        <div className="resumePreviewModalOverlay">
          <div className="resumePreviewModalContent">
            <div className="modalHeaderRow">
              <h3>Resume Full Preview ({selectedTemplate.toUpperCase()})</h3>
              <button className="btnCloseModal" onClick={() => setIsPreviewModalOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="modalDocBody">
              {renderResumeDocument(selectedTemplate)}
            </div>

            <div className="modalFooterActions">
              <button className="btnDownloadCert" onClick={handleDownloadPDF}>
                <FaDownload /> Download PDF
              </button>
              <button className="btnShareLinkedIn" onClick={handleShareResume}>
                <FaShareAlt /> Share Resume
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

