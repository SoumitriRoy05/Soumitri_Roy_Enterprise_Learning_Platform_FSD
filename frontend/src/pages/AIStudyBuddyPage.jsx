import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import PaperPlaneCursor from "../components/PaperPlaneCursor";
import StudentFooter from "../components/StudentFooter";
import FloatingChatbot from "../components/FloatingChatbot";

import {
  FaHome, FaBook, FaCodeBranch, FaFileAlt, FaComments, FaAward,
  FaCertificate, FaChartLine, FaFileInvoice, FaBolt, FaCog, FaSearch,
  FaBell, FaRobot, FaRocket, FaMapMarkedAlt, FaSun, FaMoon, FaArrowLeft,
  FaCalendarAlt, FaLightbulb, FaQuestionCircle, FaCode, FaClone,
  FaBriefcase, FaGlobe, FaPaperPlane, FaPlus, FaPaperclip, FaMicrophone,
  FaHistory, FaThumbsUp, FaThumbsDown, FaCopy, FaCheck, FaShareAlt,
  FaStickyNote, FaLayerGroup, FaTerminal, FaCrown, FaTimes, FaPlay,
  FaRedo, FaYoutube, FaLink, FaUpload, FaMagic, FaInfoCircle, FaLock,
  FaChevronDown, FaBuilding, FaUser, FaCheckCircle, FaSpinner, FaMinus
} from "react-icons/fa";

import "../styles/aiStudyBuddyPage.css";

export default function AIStudyBuddyPage() {
  const { user, xp, themeMode, toggleTheme } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";

  const userName = user?.full_name || user?.username || "Learner";
  const currentXp = xp ?? 0;

  // Interactive States
  const [inputMsg, setInputMsg] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isWebSearch, setIsWebSearch] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [activeCourseContext, setActiveCourseContext] = useState({
    title: "React Developer Path",
    module: "Module 2: React Components",
    icon: "⚛️"
  });

  // Modal States
  const [activeModal, setActiveModal] = useState(null);
  const [toolModalContent, setToolModalContent] = useState(null);
  const [dailyGoalXP, setDailyGoalXP] = useState(50);

  // ── SUMMARIZE NOTES MODAL STATE ──
  const [notesText, setNotesText] = useState(
    "Virtual DOM in React is a lightweight JavaScript object that is a representation of the actual DOM. React uses it as an intermediate step to efficiently update the real DOM.\n\nWhen a component's state or props change, React first updates the Virtual DOM. Then it diffs the previous Virtual DOM with the new one to find the minimum number of changes required. Finally, it updates only those parts in the real DOM that have actually changed."
  );
  const [summaryLength, setSummaryLength] = useState("Medium");
  const [keyPoints, setKeyPoints] = useState(4);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState([
    "Virtual DOM is a lightweight JS object that represents the real DOM.",
    "React uses it as an intermediate layer to optimize updates.",
    "When state or props change:",
    "React updates the Virtual DOM.",
    "It compares (diffs) it with the previous Virtual DOM.",
    "It calculates the minimum number of changes.",
    "Only the changed parts are updated in the real DOM."
  ]);
  const [summaryGenerated, setSummaryGenerated] = useState(true);
  const notesFileRef = useRef(null);

  // ── CREATE FLASHCARDS MODAL STATE ──
  const [flashcardSource, setFlashcardSource] = useState("text");
  const [flashcardNotes, setFlashcardNotes] = useState(
    "Virtual DOM in React is a lightweight JavaScript object that is a representation of the actual DOM. React uses it as an intermediate step to efficiently update the real DOM.\n\nWhen a component's state or props change, React first updates the Virtual DOM. Then it diffs the previous Virtual DOM with the new one to find the minimum number of changes required. Finally, it updates only those parts in the real DOM that have actually changed."
  );
  const [numCards, setNumCards] = useState(10);
  const [difficultyLevel, setDifficultyLevel] = useState("Medium");
  const [questionType, setQuestionType] = useState("Conceptual");
  const [aiExplanations, setAiExplanations] = useState(true);
  const [isGeneratingCards, setIsGeneratingCards] = useState(false);
  const [webLinkInput, setWebLinkInput] = useState("");
  const [youtubeInput, setYoutubeInput] = useState("");
  const [aiTopicInput, setAiTopicInput] = useState("");
  const flashcardFileRef = useRef(null);

  // ── INTERVIEW PREP MODAL STATE ──
  const [interviewPracticeType, setInterviewPracticeType] = useState("mock");
  const [jobRole, setJobRole] = useState("Frontend Developer");
  const [experienceLevel, setExperienceLevel] = useState("2-4 Years");
  const [interviewDifficulty, setInterviewDifficulty] = useState("Medium");
  const [interviewType, setInterviewType] = useState("Mixed");
  const [isStartingInterview, setIsStartingInterview] = useState(false);

  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "courses", label: "My Courses", icon: <FaBook /> },
    { id: "learning-paths", label: "Learning Paths", icon: <FaCodeBranch /> },
    { id: "assignments", label: "Assignments", icon: <FaFileAlt /> },
    { id: "discussions", label: "Discussions", icon: <FaComments /> },
    { id: "ai-buddy", label: "AI Study Buddy", icon: <FaRobot />, isNew: true },
    { id: "opportunity-feed", label: "Opportunity Feed", icon: <FaRocket />, isNew: true },
    { id: "quest-map", label: "Quest Map", icon: <FaMapMarkedAlt />, isNew: true },
    { id: "daily-quests", label: "Daily Quests", icon: <FaBolt /> },
    { id: "badges", label: "Badges", icon: <FaAward /> },
    { id: "certificates", label: "Certificates", icon: <FaCertificate /> },
    { id: "progress", label: "Progress", icon: <FaChartLine /> },
    { id: "resume", label: "Resume Builder", icon: <FaFileInvoice /> },
    { id: "settings", label: "Settings", icon: <FaCog /> }
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: `Hi ${userName || "S Roy"}! 👋 🔥\nI'm your AI Study Buddy. What would you like to learn today?`,
      quickPrompts: [
        "Explain React useState hook",
        "What is Big O Notation?",
        "Summarize TCP/IP Model"
      ]
    },
    {
      id: 2,
      sender: "user",
      text: "Explain the concept of Virtual DOM in React with an example.",
      time: "10:30 AM"
    },
    {
      id: 3,
      sender: "bot",
      type: "explanation",
      title: "What is Virtual DOM?",
      intro: "The Virtual DOM is a lightweight JavaScript object that is a representation of the actual DOM. React uses it as an intermediate step to efficiently update the real DOM.",
      howItWorks: [
        "When a component's state or props change, React creates a new Virtual DOM.",
        "React then compares it with the previous Virtual DOM (Diffing Algorithm).",
        "React calculates the minimal number of changes needed.",
        "Only those changes are updated in the real DOM."
      ],
      codeSnippet: `function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
      followUps: ["Explain more", "Give real world example", "Create diagram"]
    }
  ]);

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMsg("");

    setTimeout(() => {
      let botResponse = { id: Date.now() + 1, sender: "bot" };

      if (text.toLowerCase().includes("usestate")) {
        botResponse = {
          ...botResponse,
          type: "explanation",
          title: "React useState Hook Explained",
          intro: "The useState hook allows functional components to manage local state.",
          howItWorks: [
            "Import useState from 'react'.",
            "Call useState(initialValue) inside component.",
            "De-structure array [state, setState].",
            "Call setState(newValue) to trigger re-render."
          ],
          codeSnippet: `const [theme, setTheme] = useState('light');
const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');`,
          followUps: ["What is useEffect?", "Explain custom hooks"]
        };
      } else if (text.toLowerCase().includes("big o")) {
        botResponse = {
          ...botResponse,
          type: "explanation",
          title: "Big O Notation Overview",
          intro: "Big O notation measures algorithm efficiency in terms of time and space complexity as input size grows.",
          howItWorks: [
            "O(1): Constant Time - Array lookup by index.",
            "O(log N): Logarithmic Time - Binary Search.",
            "O(N): Linear Time - Single loop over array.",
            "O(N^2): Quadratic Time - Nested loops (Bubble Sort)."
          ],
          codeSnippet: `// O(N) Example
function findItem(arr, target) {
  for (let item of arr) {
    if (item === target) return true;
  }
  return false;
}`,
          followUps: ["Explain O(log N)", "Space Complexity vs Time Complexity"]
        };
      } else if (text.toLowerCase().includes("virtual dom") || text.toLowerCase().includes("explain virtual")) {
        botResponse = {
          ...botResponse,
          type: "explanation",
          title: "What is Virtual DOM?",
          intro: "The Virtual DOM is a lightweight JavaScript object that represents the actual DOM. React uses it as an intermediate step to efficiently update the real DOM.",
          howItWorks: [
            "When a component's state or props change, React creates a new Virtual DOM.",
            "React then compares it with the previous Virtual DOM (Diffing Algorithm).",
            "React calculates the minimal number of changes needed.",
            "Only those changes are updated in the real DOM."
          ],
          codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);
  // Only <h1> re-renders, not the entire page
  return <div><h1>{count}</h1><button onClick={() => setCount(count + 1)}>+</button></div>;
}`,
          followUps: ["Explain Diffing Algorithm", "Real DOM vs Virtual DOM", "Show diagram"]
        };
      } else {
        botResponse.text = `Here is a clear breakdown for "${text}":\n\n1. Key Principle: Focus on modular design and core concepts.\n2. Implementation: Apply clean code practices with optimal data structures.\n3. Try testing with edge cases to verify performance!`;
        botResponse.followUps = ["Give code example", "Explain in simple terms"];
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const triggerVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInputMsg("Explain React Component Lifecycle");
    }, 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleSend(`Attached file: ${file.name} (${(file.size / 1024).toFixed(1)} KB). Please analyze this document.`);
    }
  };

  const openToolModal = (toolName, toolDesc) => {
    setToolModalContent({ name: toolName, desc: toolDesc });
    setActiveModal("tool");
  };

  // ── SUMMARIZE NOTES HANDLERS ──
  const handleGenerateSummary = () => {
    if (!notesText.trim()) return;
    setIsGeneratingSummary(true);
    setSummaryGenerated(false);
    setTimeout(() => {
      const summaries = {
        Short: [
          "Virtual DOM is a lightweight JS representation of the real DOM.",
          "React optimizes updates by diffing the Virtual DOM first.",
          "Only changed elements get updated in the real DOM."
        ],
        Medium: [
          "Virtual DOM is a lightweight JS object that represents the real DOM.",
          "React uses it as an intermediate layer to optimize updates.",
          "When state or props change:",
          "React updates the Virtual DOM.",
          "It compares (diffs) it with the previous Virtual DOM.",
          "It calculates the minimum number of changes.",
          "Only the changed parts are updated in the real DOM."
        ],
        Long: [
          "Virtual DOM is a lightweight JavaScript object that represents the real DOM.",
          "React uses it as an intermediate layer to batch and optimize UI updates.",
          "The reconciliation process (diffing) compares old and new Virtual DOM trees.",
          "React identifies the minimum number of DOM operations required.",
          "Only the changed nodes are updated in the actual DOM.",
          "This approach significantly improves performance for complex UIs.",
          "React Fiber further optimizes this with incremental rendering.",
          "Virtual DOM enables declarative programming and predictable state management."
        ]
      };
      setGeneratedSummary(summaries[summaryLength] || summaries.Medium);
      setIsGeneratingSummary(false);
      setSummaryGenerated(true);
    }, 1800);
  };

  const handleNotesFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNotesText(`[File uploaded: ${file.name}]\n\nContent extracted from ${file.name} will appear here. The AI will analyze and summarize this document.`);
    }
  };

  // ── FLASHCARDS HANDLERS ──
  const handleGenerateFlashcards = () => {
    setIsGeneratingCards(true);
    setTimeout(() => {
      setIsGeneratingCards(false);
      setActiveModal(null);
      handleSend(`Create ${numCards} ${difficultyLevel.toLowerCase()} difficulty ${questionType.toLowerCase()} flashcards about Virtual DOM in React`);
    }, 2000);
  };

  // ── INTERVIEW PREP HANDLERS ──
  const handleStartInterview = () => {
    setIsStartingInterview(true);
    setTimeout(() => {
      setIsStartingInterview(false);
      setActiveModal(null);
      handleSend(`Start Mock Interview for ${jobRole} position with ${experienceLevel} experience. Interview type: ${interviewType}. Difficulty: ${interviewDifficulty}.`);
    }, 1500);
  };

  const interviewPracticeTypes = [
    { id: "mock", label: "Mock Interview", icon: <FaUser />, desc: "Simulate real interview experience" },
    { id: "question", label: "Question Practice", icon: <FaQuestionCircle />, desc: "Practice from a vast question bank" },
    { id: "behavioral", label: "Behavioral Prep", icon: <FaCheckCircle />, desc: "Master behavioral questions" },
    { id: "resume", label: "Resume Review", icon: <FaFileAlt />, desc: "Get AI feedback on your resume" },
    { id: "company", label: "Company Interview", icon: <FaBuilding />, desc: "Practice specific company interviews" },
    { id: "coding", label: "Coding Interview", icon: <FaCode />, desc: "Practice coding rounds" }
  ];

  const flashcardSources = [
    { id: "text", label: "Text / Notes", icon: <FaFileAlt />, desc: "Paste your notes or text" },
    { id: "file", label: "File Upload", icon: <FaUpload />, desc: "Upload PDF, DOCX, TXT" },
    { id: "web", label: "Web Link", icon: <FaLink />, desc: "Summarize any webpage" },
    { id: "youtube", label: "YouTube Video", icon: <FaYoutube />, desc: "Create cards from videos" },
    { id: "ai", label: "AI Generate", icon: <FaMagic />, desc: "Generate from a topic" }
  ];

  const closeModal = () => setActiveModal(null);

  return (
    <div className={`aisbpWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />
      <PaperPlaneCursor />

      {/* Main Grid Layout Container */}
      <div className="aisbpMainContainer">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="aisbpLeftSidebar">
          <div>
            <Link to="/" className="sdBrandLogo">
              <span className="logoHex">⬢</span>
              <span>SkillSphere</span>
            </Link>

            <div className="aisbpSidebarHomeArchHeader">
              <div className="aisbpArchLine" />
              <button
                className="aisbpHomeCircularBtn active"
                onClick={() => navigate("/ai-buddy")}
                title="AI Study Buddy"
              >
                <FaRobot />
              </button>
            </div>

            <ul className="sdNavList">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sdNavItem ${item.id === "ai-buddy" ? "active" : ""}`}
                    onClick={() => {
                      if (item.id === "dashboard") navigate("/student-home");
                      else if (item.id === "courses") navigate("/courses");
                      else if (item.id === "learning-paths") navigate("/learning-paths");
                      else if (item.id === "assignments") navigate("/assignments");
                      else if (item.id === "opportunity-feed") navigate("/opportunity-feed");
                      else if (item.id === "badges") navigate("/badges");
                      else if (item.id === "progress") navigate("/progress");
                      else if (item.id === "discussions") navigate("/discussions");
                      else if (item.id === "certificates") navigate("/certificate");
                      else if (item.id === "daily-quests") navigate("/daily-quests");
                      else if (item.id === "resume") navigate("/resume");
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
        <div className="aisbpRightBodyArea">

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

          {/* AI Study Buddy Header Row */}
          <div className="aisbpHeaderBar">
            <div className="aisbpHeaderTitle">
              <h2>🤖 AI Study Buddy ✨</h2>
              <p>Your intelligent learning companion. Ask anything, learn everything!</p>
            </div>
            <button className="btnStudyHistory" onClick={() => setActiveModal("history")}>
              <FaHistory /> Study Buddy History
            </button>
          </div>

          {/* 3-COLUMN WORKSPACE GRID */}
          <div className="aisbpWorkspaceGrid">

            {/* 1. LEFT PROMPT ACTION CARDS COLUMN */}
            <div className="aisbpLeftCol">
              <h4>How can I help you today?</h4>

              <div className="aisbpPromptCardsList">
                <div className="aisbpPromptCard" onClick={() => handleSend("Explain a Concept in React")}>
                  <div className="pCardIcon yellow"><FaLightbulb /></div>
                  <div>
                    <strong>Explain a Concept</strong>
                    <span>Get simple explanations</span>
                  </div>
                </div>

                <div className="aisbpPromptCard" onClick={() => setActiveModal("summarize-notes")}>
                  <div className="pCardIcon blue"><FaFileAlt /></div>
                  <div>
                    <strong>Summarize Notes</strong>
                    <span>Summarize any topic</span>
                  </div>
                </div>

                <div className="aisbpPromptCard" onClick={() => handleSend("Generate Quiz on JavaScript")}>
                  <div className="pCardIcon green"><FaQuestionCircle /></div>
                  <div>
                    <strong>Generate Quiz</strong>
                    <span>Practice with AI quizzes</span>
                  </div>
                </div>

                <div className="aisbpPromptCard" onClick={() => handleSend("Code Explanation: useState hook")}>
                  <div className="pCardIcon orange"><FaCode /></div>
                  <div>
                    <strong>Code Explanation</strong>
                    <span>Explain &amp; debug code</span>
                  </div>
                </div>

                <div className="aisbpPromptCard" onClick={() => setActiveModal("create-flashcards")}>
                  <div className="pCardIcon purple"><FaClone /></div>
                  <div>
                    <strong>Create Flashcards</strong>
                    <span>Make flashcards instantly</span>
                  </div>
                </div>

                <div className="aisbpPromptCard" onClick={() => setActiveModal("interview-prep")}>
                  <div className="pCardIcon rose"><FaBriefcase /></div>
                  <div>
                    <strong>Interview Prep</strong>
                    <span>Get interview questions</span>
                  </div>
                </div>

                <div className="aisbpPromptCard" onClick={() => handleSend("Create 7-day Study Plan for React")}>
                  <div className="pCardIcon cyan"><FaCalendarAlt /></div>
                  <div>
                    <strong>Study Plan</strong>
                    <span>Personalized study plan</span>
                  </div>
                </div>

                <div className="aisbpPromptCard" onClick={() => handleSend("Translate technical notes to Hindi")}>
                  <div className="pCardIcon blueLight"><FaGlobe /></div>
                  <div>
                    <strong>Translate</strong>
                    <span>Translate to any language</span>
                  </div>
                </div>
              </div>

              {/* Upgrade to Pro Banner Card */}
              <div className="aisbpUpgradeCard">
                <div className="upgradeCardContent">
                  <h5>Upgrade to Pro</h5>
                  <p>Unlock GPT-4, advanced PDFs, image analysis &amp; more!</p>
                  <button className="btnUpgradeNow" onClick={() => setActiveModal("upgrade")}>
                    <FaCrown /> Upgrade Now
                  </button>
                </div>
                <div className="bot3dAvatar">🤖</div>
              </div>
            </div>

            {/* 2. CENTER CHAT THREAD AREA */}
            <div className="aisbpCenterCol">
              <div className="chatThreadWindow">
                {messages.map((m) => (
                  <div key={m.id} className={`chatRow ${m.sender}`}>
                    {m.sender === "bot" && <div className="botRowAvatar">🤖</div>}

                    <div className={`chatBubble ${m.sender}`}>
                      {m.text && <p className="msgText">{m.text}</p>}

                      {m.quickPrompts && (
                        <div className="quickPromptChipsRow">
                          {m.quickPrompts.map((qp, qIdx) => (
                            <button key={qIdx} onClick={() => handleSend(qp)}>
                              {qp}
                            </button>
                          ))}
                        </div>
                      )}

                      {m.type === "explanation" && (
                        <div className="explanationCardContent">
                          <p className="introText">Sure! Here's a simple explanation of {m.title}.</p>

                          <h4>{m.title}</h4>
                          <p className="descP">{m.intro}</p>

                          <h5 className="subHeading">How it works?</h5>
                          <ol className="stepsOrderedList">
                            {m.howItWorks.map((step, sIdx) => (
                              <li key={sIdx}>{step}</li>
                            ))}
                          </ol>

                          <h5 className="subHeading">Example</h5>
                          <div className="codeTerminalBlock">
                            <div className="terminalHeader">
                              <button className="btnCopyCode" onClick={() => handleCopyCode(m.codeSnippet)}>
                                {copiedCode ? <FaCheck color="#10B981" /> : <FaCopy />} {copiedCode ? "Copied" : "Copy"}
                              </button>
                            </div>
                            <pre><code>{m.codeSnippet}</code></pre>
                          </div>

                          {m.followUps && (
                            <div className="followUpChipsRow">
                              {m.followUps.map((fu, fIdx) => (
                                <button key={fIdx} onClick={() => handleSend(fu)}>
                                  {fu}
                                </button>
                              ))}

                              <div className="feedbackIcons">
                                <FaThumbsUp className="fIcon" title="Helpful" />
                                <FaThumbsDown className="fIcon" title="Not Helpful" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {m.time && <span className="msgTimestamp">{m.time} ✓✓</span>}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Floating Bottom Input Bar */}
              <div className="aisbpInputContainer">
                <div className="aisbpInputRow">
                  <input
                    type="text"
                    placeholder={isListening ? "Listening... Speak your question now" : "Ask anything..."}
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />

                  <div className="inputControlsRow">
                    <button className="iconBtn" title="More Options"><FaPlus /></button>

                    <div
                      className={`dropdownPill ${isWebSearch ? "active" : ""}`}
                      onClick={() => setIsWebSearch(!isWebSearch)}
                      title="Toggle Web Search"
                    >
                      <FaGlobe /> <span>Web Search</span> ▾
                    </div>

                    <button
                      className="fileAttachBtn"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    >
                      <FaPaperclip /> Attach File
                    </button>

                    <button
                      className={`iconBtn mic ${isListening ? "listening" : ""}`}
                      onClick={triggerVoiceInput}
                      title="Voice Search"
                    >
                      <FaMicrophone />
                    </button>

                    <button className="btnSendOrange" onClick={() => handleSend()}>
                      <FaPaperPlane />
                    </button>
                  </div>
                </div>

                <span className="disclaimerText">AI can make mistakes. Please verify important information.</span>
              </div>

            </div>

            {/* 3. RIGHT COLUMN SIDEBAR WIDGETS */}
            <div className="aisbpRightCol">

              {/* Current Course Context Card */}
              <div className="aisbpWidgetCard">
                <div className="widgetTitleHeader">
                  <h4>Current Course Context</h4>
                  <span className="changeLink" onClick={() => setActiveModal("context")}>Change</span>
                </div>

                <div className="courseContextCard">
                  <div className="contextBadgeIcon">{activeCourseContext.icon}</div>
                  <div>
                    <strong>{activeCourseContext.title}</strong>
                    <span>{activeCourseContext.module}</span>
                  </div>
                </div>
              </div>

              {/* Study Buddy Tools (2x3 Grid) */}
              <div className="aisbpWidgetCard">
                <h4>Study Buddy Tools</h4>

                <div className="toolsGrid2x3">
                  <div className="toolGridBox" onClick={() => openToolModal("Mind Map", "Generate interactive visual diagrams of complex topics.")}>
                    <div className="tIcon rose"><FaShareAlt /></div>
                    <strong>Mind Map</strong>
                    <span>Visualize concepts</span>
                  </div>

                  <div className="toolGridBox" onClick={() => openToolModal("Generate Notes", "Create instant summary study notes from any lecture.")}>
                    <div className="tIcon blue"><FaStickyNote /></div>
                    <strong>Generate Notes</strong>
                    <span>Create notes instantly</span>
                  </div>

                  <div className="toolGridBox" onClick={() => openToolModal("Practice Quiz", "Test your knowledge with AI-generated multiple choice quizzes.")}>
                    <div className="tIcon green"><FaQuestionCircle /></div>
                    <strong>Practice Quiz</strong>
                    <span>Test your knowledge</span>
                  </div>

                  <div className="toolGridBox" onClick={() => setActiveModal("create-flashcards")}>
                    <div className="tIcon orange"><FaClone /></div>
                    <strong>Flashcards</strong>
                    <span>Smart flashcards</span>
                  </div>

                  <div className="toolGridBox" onClick={() => openToolModal("Concept Diagram", "Generate architectural flowcharts and diagrams.")}>
                    <div className="tIcon purple"><FaLayerGroup /></div>
                    <strong>Concept Diagram</strong>
                    <span>Generate diagrams</span>
                  </div>

                  <div className="toolGridBox" onClick={() => openToolModal("Code Playground", "Run and test JavaScript & Python code live in your browser.")}>
                    <div className="tIcon cyan"><FaTerminal /></div>
                    <strong>Code Playground</strong>
                    <span>Run &amp; test code</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ══════════════════════════════════════════════════════
          INTERACTIVE MODALS
      ══════════════════════════════════════════════════════ */}

      {/* 1. History Modal */}
      {activeModal === "history" && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3><FaHistory /> Study Buddy History</h3>
              <button className="modalCloseBtn" onClick={closeModal}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <ul className="historyList">
                <li onClick={() => { handleSend("Virtual DOM"); closeModal(); }}>
                  <strong>Virtual DOM in React</strong> <span>Today, 10:30 AM</span>
                </li>
                <li onClick={() => { handleSend("Props vs State"); closeModal(); }}>
                  <strong>Props vs State in React</strong> <span>Yesterday, 6:20 PM</span>
                </li>
                <li onClick={() => { handleSend("useEffect"); closeModal(); }}>
                  <strong>Explain useEffect Hook</strong> <span>27 May 2025</span>
                </li>
                <li onClick={() => { handleSend("SQL vs NoSQL"); closeModal(); }}>
                  <strong>Difference between SQL &amp; NoSQL</strong> <span>25 May 2025</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. Upgrade to Pro Modal */}
      {activeModal === "upgrade" && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContainer proModal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3><FaCrown color="#F59E0B" /> SkillSphere AI Pro</h3>
              <button className="modalCloseBtn" onClick={closeModal}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <p>Supercharge your learning with advanced AI capabilities!</p>
              <ul className="proFeaturesList">
                <li>✨ Unlimited GPT-4o &amp; Claude 3.5 Sonnet queries</li>
                <li>📄 PDF &amp; Slide document analysis</li>
                <li>🖼️ Visual code diagram &amp; image recognition</li>
                <li>⚡ 2x Faster response speed</li>
              </ul>
              <button className="btnConfirmPro">Upgrade Now — ₹499 / month</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Course Context Switcher Modal */}
      {activeModal === "context" && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Switch Active Course Context</h3>
              <button className="modalCloseBtn" onClick={closeModal}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <div className="contextOptionsList">
                {[
                  { title: "React Developer Path", module: "Module 2: React Components", icon: "⚛️" },
                  { title: "Python for Data Science", module: "Module 3: Pandas & Dataframes", icon: "🐍" },
                  { title: "Fullstack with Node.js", module: "Module 4: RESTful APIs", icon: "🟩" },
                  { title: "UI/UX Design Masterclass", module: "Module 2: Figma Wireframing", icon: "🎨" }
                ].map((ctx) => (
                  <div key={ctx.title} className={`ctxOption ${activeCourseContext.title === ctx.title ? "active" : ""}`}
                    onClick={() => { setActiveCourseContext(ctx); closeModal(); }}>
                    <span className="icon">{ctx.icon}</span>
                    <div><strong>{ctx.title}</strong><span>{ctx.module}</span></div>
                    {activeCourseContext.title === ctx.title && <FaCheckCircle className="ctxActiveCheck" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Tool Feature Modal */}
      {activeModal === "tool" && toolModalContent && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>🛠️ {toolModalContent.name}</h3>
              <button className="modalCloseBtn" onClick={closeModal}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <p>{toolModalContent.desc}</p>
              <button className="btnConfirmPro" onClick={() => {
                handleSend(`Launch ${toolModalContent.name} tool for ${activeCourseContext.title}`);
                closeModal();
              }}>
                Launch {toolModalContent.name} →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Edit Goal Modal */}
      {activeModal === "edit-goal" && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Edit Daily Study Goal</h3>
              <button className="modalCloseBtn" onClick={closeModal}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <label className="modalLabel">Target Daily XP Goal:</label>
              <select className="modalSelect"
                value={dailyGoalXP}
                onChange={(e) => setDailyGoalXP(Number(e.target.value))}>
                <option value={50}>50 XP / day (Beginner)</option>
                <option value={100}>100 XP / day (Intermediate)</option>
                <option value={200}>200 XP / day (Pro)</option>
              </select>
              <button className="btnConfirmPro" onClick={closeModal}>Save Goal</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          6. SUMMARIZE NOTES MODAL (Matching Image 1 Reference)
      ══════════════════════════════════════════════════════ */}
      {activeModal === "summarize-notes" && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContainer snModal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="snModalHeader">
              <div className="snModalTitleRow">
                <div className="snModalIcon">📋</div>
                <div>
                  <h3>Summarize Notes</h3>
                  <p>Get concise summaries of any topic, notes or content.</p>
                </div>
              </div>
              <button className="modalCloseBtn" onClick={closeModal}><FaTimes /></button>
            </div>

            {/* Two-Column Layout */}
            <div className="snModalBody">

              {/* LEFT: Notes Input */}
              <div className="snLeftPanel">
                <div className="snPanelHeader">
                  <span className="snPanelTitle">Your Notes</span>
                  <span className="snCharCount">{notesText.length}/5000</span>
                </div>
                <textarea
                  className="snNotesTextarea"
                  placeholder="Paste your notes here..."
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value.slice(0, 5000))}
                  maxLength={5000}
                />

                {/* File Upload Area */}
                <div className="snUploadSection">
                  <p className="snUploadLabel">Upload Notes (Optional)</p>
                  <div
                    className="snDropZone"
                    onClick={() => notesFileRef.current && notesFileRef.current.click()}
                  >
                    <div className="snDropZoneIcon">📎</div>
                    <p>Drag &amp; drop your file here</p>
                    <span>or <span className="snBrowseLink">browse</span></span>
                    <small>Supports: PDF, DOCX, TXT, MD (Max 10MB)</small>
                  </div>
                  <input
                    type="file"
                    ref={notesFileRef}
                    style={{ display: "none" }}
                    accept=".pdf,.docx,.txt,.md"
                    onChange={handleNotesFileUpload}
                  />
                </div>

                {/* Controls */}
                <div className="snControlsRow">
                  <div className="snControlGroup">
                    <label>Summary Length</label>
                    <select className="snSelect" value={summaryLength} onChange={(e) => setSummaryLength(e.target.value)}>
                      <option>Short</option>
                      <option>Medium</option>
                      <option>Long</option>
                    </select>
                  </div>
                  <div className="snControlGroup">
                    <label>Key Points</label>
                    <select className="snSelect" value={keyPoints} onChange={(e) => setKeyPoints(Number(e.target.value))}>
                      {[3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                <button
                  className="snGenerateBtn"
                  onClick={handleGenerateSummary}
                  disabled={isGeneratingSummary || !notesText.trim()}
                >
                  {isGeneratingSummary ? (
                    <><FaSpinner className="spinIcon" /> Generating...</>
                  ) : (
                    <>✨ Generate Summary</>
                  )}
                </button>
              </div>

              {/* RIGHT: Summary Output */}
              <div className="snRightPanel">
                <div className="snPanelHeader">
                  <span className="snPanelTitle">Summary</span>
                  {summaryGenerated && (
                    <span className="snAIBadge">✨ AI Generated</span>
                  )}
                </div>

                {summaryGenerated && generatedSummary.length > 0 ? (
                  <div className="snSummaryOutput">
                    <ul className="snSummaryList">
                      {generatedSummary.map((point, idx) => (
                        <li key={idx}>
                          {idx >= 3 && idx < 3 + 4 ? (
                            <span className="snBulletItem">
                              <span className="snBulletDot" style={{ background: "#F9572A" }}></span>
                              {point}
                            </span>
                          ) : (
                            <span className="snBulletItem">
                              <span className="snBulletDot"></span>
                              {point}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="snEmptyState">
                    <div className="snEmptyIcon">📝</div>
                    <p>Your AI-generated summary will appear here.</p>
                    <small>Paste your notes and click Generate Summary</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          7. CREATE FLASHCARDS MODAL (Matching Images 2 & 3)
      ══════════════════════════════════════════════════════ */}
      {activeModal === "create-flashcards" && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContainer fcModal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="fcModalHeader">
              <div className="fcModalTitleRow">
                <div className="fcModalIcon">✦</div>
                <div>
                  <h3>Create Flashcards</h3>
                  <p>Generate or create flashcards to boost your learning.</p>
                </div>
              </div>
              <button className="modalCloseBtn" onClick={closeModal}><FaTimes /></button>
            </div>

            {/* Body */}
            <div className="fcModalBody">

              {/* LEFT: Source Selection */}
              <div className="fcLeftPanel">
                <p className="fcPanelTitle">✦ Source</p>
                <div className="fcSourceList">
                  {flashcardSources.map((src) => (
                    <div
                      key={src.id}
                      className={`fcSourceItem ${flashcardSource === src.id ? "active" : ""}`}
                      onClick={() => setFlashcardSource(src.id)}
                    >
                      <div className={`fcSourceIcon ${src.id === "youtube" ? "youtube" : ""}`}>
                        {src.icon}
                      </div>
                      <div>
                        <strong>{src.label}</strong>
                        <span>{src.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upgrade Banner */}
                <div className="fcUpgradeBanner">
                  <div className="fcUpgradeContent">
                    <FaCrown color="#F59E0B" />
                    <div>
                      <strong>Upgrade to Pro</strong>
                      <p>Unlock unlimited mocks, AI evaluation, resume score &amp; more!</p>
                    </div>
                  </div>
                  <button className="fcUpgradeBtn" onClick={() => setActiveModal("upgrade")}>
                    🔥 Upgrade Now
                  </button>
                </div>
              </div>

              {/* RIGHT: Content Area */}
              <div className="fcRightPanel">

                {/* Dynamic Source Content */}
                {flashcardSource === "text" && (
                  <div className="fcContentArea">
                    <div className="fcTextAreaHeader">
                      <span>Paste your notes or content</span>
                      <span className="fcCharCount">{flashcardNotes.length}/5000</span>
                    </div>
                    <textarea
                      className="fcNotesTextarea"
                      placeholder="Paste your study notes, textbook content, or any material here..."
                      value={flashcardNotes}
                      onChange={(e) => setFlashcardNotes(e.target.value.slice(0, 5000))}
                    />
                    <button className="fcEnhanceBtn">
                      <FaMagic /> Enhance with AI
                    </button>
                  </div>
                )}

                {flashcardSource === "file" && (
                  <div className="fcContentArea">
                    <div
                      className="fcDropZone"
                      onClick={() => flashcardFileRef.current && flashcardFileRef.current.click()}
                    >
                      <div className="fcDropIcon">📎</div>
                      <p>Drop your file here or <span className="fcBrowseLink">browse</span></p>
                      <small>Supports PDF, DOCX, TXT (Max 10MB)</small>
                    </div>
                    <input type="file" ref={flashcardFileRef} style={{ display: "none" }} accept=".pdf,.docx,.txt" />
                  </div>
                )}

                {flashcardSource === "web" && (
                  <div className="fcContentArea">
                    <label className="fcInputLabel">Enter Webpage URL</label>
                    <div className="fcInputWithIcon">
                      <FaLink className="fcInputIcon" />
                      <input
                        type="url"
                        className="fcUrlInput"
                        placeholder="https://example.com/article"
                        value={webLinkInput}
                        onChange={(e) => setWebLinkInput(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {flashcardSource === "youtube" && (
                  <div className="fcContentArea">
                    <label className="fcInputLabel">Enter YouTube Video URL</label>
                    <div className="fcInputWithIcon">
                      <FaYoutube className="fcInputIcon youtube" />
                      <input
                        type="url"
                        className="fcUrlInput"
                        placeholder="https://youtube.com/watch?v=..."
                        value={youtubeInput}
                        onChange={(e) => setYoutubeInput(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {flashcardSource === "ai" && (
                  <div className="fcContentArea">
                    <label className="fcInputLabel">Enter Topic to Generate From</label>
                    <input
                      type="text"
                      className="fcTopicInput"
                      placeholder="e.g. React Hooks, Machine Learning Basics, World War II..."
                      value={aiTopicInput}
                      onChange={(e) => setAiTopicInput(e.target.value)}
                    />
                  </div>
                )}

                {/* Controls Row */}
                <div className="fcControlsGrid">
                  <div className="fcControlGroup">
                    <label>Number of Cards <FaInfoCircle className="fcInfoIcon" /></label>
                    <div className="fcCounterRow">
                      <button className="fcCounterBtn" onClick={() => setNumCards(Math.max(1, numCards - 1))}><FaMinus /></button>
                      <span className="fcCounterVal">{numCards}</span>
                      <button className="fcCounterBtn" onClick={() => setNumCards(Math.min(50, numCards + 1))}><FaPlus /></button>
                    </div>
                    <small className="fcRecommended">Recommended: 8-15</small>
                  </div>

                  <div className="fcControlGroup">
                    <label>Difficulty Level</label>
                    <select className="fcSelect" value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)}>
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>

                  <div className="fcControlGroup">
                    <label>Question Type</label>
                    <select className="fcSelect" value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                      <option>Conceptual</option>
                      <option>Factual</option>
                      <option>Application</option>
                      <option>Mixed</option>
                    </select>
                  </div>
                </div>

                {/* AI Explanations Toggle */}
                <div className="fcToggleRow">
                  <div className="fcToggleInfo">
                    <span>AI Explanations <FaInfoCircle className="fcInfoIcon" /></span>
                    <small>Add explanations for better understanding</small>
                  </div>
                  <div
                    className={`fcToggleSwitch ${aiExplanations ? "on" : "off"}`}
                    onClick={() => setAiExplanations(!aiExplanations)}
                  >
                    <div className="fcToggleKnob"></div>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  className="fcGenerateBtn"
                  onClick={handleGenerateFlashcards}
                  disabled={isGeneratingCards}
                >
                  {isGeneratingCards ? (
                    <><FaSpinner className="spinIcon" /> Generating...</>
                  ) : (
                    <>✦ Generate Flashcards</>
                  )}
                </button>

                {/* Security Notice */}
                <p className="fcSecurityNote"><FaLock /> Your data is secure and never shared.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          8. INTERVIEW PREP MODAL (Matching Image 4)
      ══════════════════════════════════════════════════════ */}
      {activeModal === "interview-prep" && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContainer ipModal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="ipModalHeader">
              <div className="ipModalTitleRow">
                <div className="ipModalIcon">✦</div>
                <div>
                  <h3>Interview Prep</h3>
                  <p>Prepare, practice and ace your interviews with AI-powered tools.</p>
                </div>
              </div>
              <button className="modalCloseBtn" onClick={closeModal}><FaTimes /></button>
            </div>

            {/* Body */}
            <div className="ipModalBody">

              {/* LEFT: Practice Type Selection */}
              <div className="ipLeftPanel">
                <p className="ipPanelTitle">Choose a Practice Type</p>
                <div className="ipPracticeList">
                  {interviewPracticeTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`ipPracticeItem ${interviewPracticeType === type.id ? "active" : ""}`}
                      onClick={() => setInterviewPracticeType(type.id)}
                    >
                      <div className={`ipPracticeIcon ${interviewPracticeType === type.id ? "active" : ""}`}>
                        {type.icon}
                      </div>
                      <div>
                        <strong>{type.label}</strong>
                        <span>{type.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upgrade Banner */}
                <div className="ipUpgradeBanner">
                  <div className="ipUpgradeContent">
                    <FaCrown color="#F59E0B" />
                    <div>
                      <strong>Upgrade to Pro</strong>
                      <p>Unlock unlimited mocks, AI evaluation, resume score &amp; more!</p>
                    </div>
                  </div>
                  <button className="ipUpgradeBtn" onClick={() => setActiveModal("upgrade")}>
                    🔥 Upgrade Now
                  </button>
                </div>
              </div>

              {/* RIGHT: Configuration Panel */}
              <div className="ipRightPanel">

                {interviewPracticeType === "mock" && (
                  <div className="ipConfigArea">
                    <div className="ipConfigHeader">
                      <h4>Mock Interview <FaInfoCircle className="ipInfoIcon" /></h4>
                      <p>Select role, difficulty and get matched with AI interviewer.</p>
                    </div>

                    {/* Job Role & Experience Level */}
                    <div className="ipSelectRow">
                      <div className="ipSelectGroup">
                        <label>Job Role</label>
                        <select className="ipSelect" value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
                          <option>Frontend Developer</option>
                          <option>Backend Developer</option>
                          <option>Full Stack Developer</option>
                          <option>Data Scientist</option>
                          <option>DevOps Engineer</option>
                          <option>UI/UX Designer</option>
                          <option>Product Manager</option>
                        </select>
                      </div>
                      <div className="ipSelectGroup">
                        <label>Experience Level</label>
                        <select className="ipSelect" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
                          <option>0-1 Years</option>
                          <option>1-2 Years</option>
                          <option>2-4 Years</option>
                          <option>4-6 Years</option>
                          <option>6+ Years</option>
                        </select>
                      </div>
                    </div>

                    {/* Difficulty Level */}
                    <div className="ipFieldGroup">
                      <label>Difficulty Level</label>
                      <div className="ipButtonGroup">
                        {["Easy", "Medium", "Hard"].map((d) => (
                          <button
                            key={d}
                            className={`ipOptionBtn ${interviewDifficulty === d ? "active" : ""}`}
                            onClick={() => setInterviewDifficulty(d)}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interview Type */}
                    <div className="ipFieldGroup">
                      <label>Interview Type</label>
                      <div className="ipButtonGroup">
                        {["Technical", "HR / Behavioral", "Mixed"].map((t) => (
                          <button
                            key={t}
                            className={`ipOptionBtn ${interviewType === t ? "active" : ""}`}
                            onClick={() => setInterviewType(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* What you'll get */}
                    <div className="ipBenefitsList">
                      <p className="ipBenefitsTitle">What you'll get</p>
                      {[
                        "Real-time conversation with AI interviewer",
                        "Personalized questions based on your profile",
                        "Detailed feedback and improvement tips",
                        "Performance report & readiness score"
                      ].map((benefit, i) => (
                        <div key={i} className="ipBenefitItem">
                          <FaCheckCircle className="ipCheckIcon" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* AI Interviewer Row + Start Button */}
                    <div className="ipStartRow">
                      <div className="ipAIInterviewerBadge">
                        <div className="ipAIAvatar">🤖</div>
                        <div>
                          <strong>AI Interviewer</strong>
                          <span>Powered by advanced AI models</span>
                        </div>
                      </div>
                      <button
                        className="ipStartBtn"
                        onClick={handleStartInterview}
                        disabled={isStartingInterview}
                      >
                        {isStartingInterview ? (
                          <><FaSpinner className="spinIcon" /> Starting...</>
                        ) : (
                          <>Start Mock Interview →</>
                        )}
                      </button>
                    </div>

                    <div className="ipDurationNote">Duration: 45-60 minutes</div>
                  </div>
                )}

                {interviewPracticeType === "question" && (
                  <div className="ipConfigArea ipGenericConfig">
                    <div className="ipGenericIcon">❓</div>
                    <h4>Question Practice</h4>
                    <p>Access our vast question bank with thousands of real interview questions across topics and difficulty levels.</p>
                    <button className="ipStartBtn" onClick={() => { handleSend("Start question practice for " + jobRole); closeModal(); }}>
                      Start Practice →
                    </button>
                  </div>
                )}

                {interviewPracticeType === "behavioral" && (
                  <div className="ipConfigArea ipGenericConfig">
                    <div className="ipGenericIcon">🧠</div>
                    <h4>Behavioral Prep</h4>
                    <p>Master the STAR method and ace behavioral questions with our AI-guided coaching sessions.</p>
                    <button className="ipStartBtn" onClick={() => { handleSend("Start behavioral interview prep"); closeModal(); }}>
                      Start Behavioral Prep →
                    </button>
                  </div>
                )}

                {interviewPracticeType === "resume" && (
                  <div className="ipConfigArea ipGenericConfig">
                    <div className="ipGenericIcon">📄</div>
                    <h4>Resume Review</h4>
                    <p>Get detailed AI feedback on your resume with actionable improvement suggestions and ATS optimization tips.</p>
                    <button className="ipStartBtn" onClick={() => navigate("/resume")}>
                      Go to Resume Builder →
                    </button>
                  </div>
                )}

                {interviewPracticeType === "company" && (
                  <div className="ipConfigArea ipGenericConfig">
                    <div className="ipGenericIcon">🏢</div>
                    <h4>Company Interview</h4>
                    <p>Practice company-specific interview questions tailored to Google, Amazon, Microsoft, and 500+ more companies.</p>
                    <button className="ipStartBtn" onClick={() => { handleSend("Start company-specific interview practice"); closeModal(); }}>
                      Choose Company →
                    </button>
                  </div>
                )}

                {interviewPracticeType === "coding" && (
                  <div className="ipConfigArea ipGenericConfig">
                    <div className="ipGenericIcon">💻</div>
                    <h4>Coding Interview</h4>
                    <p>Sharpen your DSA skills with timed coding challenges, live code execution, and AI-powered hints.</p>
                    <button className="ipStartBtn" onClick={() => navigate("/code-arena")}>
                      Go to Code Arena →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="ipSecurityNote"><FaLock /> Your data is secure and never shared.</div>
          </div>
        </div>
      )}

      <FloatingChatbot />
      <StudentFooter />
    </div>
  );
}
