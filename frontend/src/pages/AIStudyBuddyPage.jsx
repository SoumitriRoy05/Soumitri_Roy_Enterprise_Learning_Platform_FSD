import React, { useState, useRef } from "react";
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
  FaCog,
  FaSearch,
  FaBell,
  FaRobot,
  FaRocket,
  FaMapMarkedAlt,
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaCalendarAlt,
  FaLightbulb,
  FaQuestionCircle,
  FaCode,
  FaClone,
  FaBriefcase,
  FaGlobe,
  FaPaperPlane,
  FaPlus,
  FaPaperclip,
  FaMicrophone,
  FaHistory,
  FaThumbsUp,
  FaThumbsDown,
  FaCopy,
  FaCheck,
  FaShareAlt,
  FaStickyNote,
  FaLayerGroup,
  FaTerminal,
  FaCrown,
  FaTimes,
  FaPlay,
  FaRedo
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
  const [activeModal, setActiveModal] = useState(null); // 'history', 'upgrade', 'context', 'tool', 'edit-goal'
  const [toolModalContent, setToolModalContent] = useState(null);
  const [dailyGoalXP, setDailyGoalXP] = useState(50);

  const fileInputRef = useRef(null);

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

  // Chat Conversation State (Default 1-to-1 Match with Image)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi Alex! 👋\nI'm your AI Study Buddy. What would you like to learn today?",
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

    // Simulate Tailored AI Response
    setTimeout(() => {
      let botResponse = {
        id: Date.now() + 1,
        sender: "bot"
      };

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
                  <span className="sdNotifBadge">3</span>
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

                <div className="aisbpPromptCard" onClick={() => handleSend("Summarize Notes on React Hooks")}>
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
                    <span>Explain & debug code</span>
                  </div>
                </div>

                <div className="aisbpPromptCard" onClick={() => navigate("/flashcards")}>
                  <div className="pCardIcon purple"><FaClone /></div>
                  <div>
                    <strong>Create Flashcards</strong>
                    <span>Make flashcards instantly</span>
                  </div>
                </div>

                <div className="aisbpPromptCard" onClick={() => handleSend("Interview Prep for Frontend Role")}>
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
                  <p>Unlock GPT-4, advanced PDFs, image analysis & more!</p>
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
              </div>

              {/* Floating Bottom Input Bar matching Image 1 */}
              <div className="aisbpInputContainer">
                <div className="aisbpInputRow">
                  <input
                    type="text"
                    placeholder={isListening ? "Listening... Speak your question now" : "Ask anything..."}
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />

                  {/* Hidden File Input */}
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

                  <div className="toolGridBox" onClick={() => navigate("/flashcards")}>
                    <div className="tIcon orange"><FaClone /></div>
                    <strong>Flashcards</strong>
                    <span>Smart Flashcards</span>
                  </div>

                  <div className="toolGridBox" onClick={() => openToolModal("Concept Diagram", "Generate architectural flowcharts and diagrams.")}>
                    <div className="tIcon purple"><FaLayerGroup /></div>
                    <strong>Concept Diagram</strong>
                    <span>Generate diagrams</span>
                  </div>

                  <div className="toolGridBox" onClick={() => openToolModal("Code Playground", "Run and test JavaScript & Python code live in your browser.")}>
                    <div className="tIcon cyan"><FaTerminal /></div>
                    <strong>Code Playground</strong>
                    <span>Run & test code</span>
                  </div>
                </div>
              </div>

              {/* Recent Chats List */}
              <div className="aisbpWidgetCard">
                <div className="widgetTitleHeader">
                  <h4>Recent Chats</h4>
                  <span className="changeLink" onClick={() => setActiveModal("history")}>View All</span>
                </div>

                <div className="recentChatsList">
                  <div className="recentChatRow active" onClick={() => handleSend("Explain Virtual DOM")}>
                    <strong>Virtual DOM in React</strong>
                    <span>Today, 10:30 AM</span>
                  </div>

                  <div className="recentChatRow" onClick={() => handleSend("Explain Props vs State")}>
                    <strong>Props vs State in React</strong>
                    <span>Yesterday, 6:20 PM</span>
                  </div>

                  <div className="recentChatRow" onClick={() => handleSend("Explain useEffect Hook")}>
                    <strong>Explain useEffect Hook</strong>
                    <span>27 May 2025</span>
                  </div>

                  <div className="recentChatRow" onClick={() => handleSend("Explain Difference between SQL & NoSQL")}>
                    <strong>Difference between SQL & NoSQL</strong>
                    <span>25 May 2025</span>
                  </div>
                </div>
              </div>

              {/* Daily Study Goal Widget */}
              <div className="aisbpWidgetCard">
                <div className="widgetTitleHeader">
                  <h4>Daily Study Goal</h4>
                  <span className="changeLink" onClick={() => setActiveModal("edit-goal")}>Edit</span>
                </div>

                <div className="studyGoalGaugeRow">
                  <div className="goalRingSvgBox">
                    <svg viewBox="0 0 100 100">
                      <circle className="ringBg" cx="50" cy="50" r="40" />
                      <circle className="ringFill" cx="50" cy="50" r="40" strokeDasharray="251.2" strokeDashoffset="75.3" />
                    </svg>
                    <div className="ringPctText">70%</div>
                  </div>

                  <div className="goalTextInfo">
                    <span className="lbl">Study Goal</span>
                    <strong>35 / {dailyGoalXP} XP</strong>
                    <span className="flameSub">Keep it up! 🔥</span>
                  </div>
                </div>

                <div className="goalTrackBottom">
                  <div className="goalFillBottom" style={{ width: "70%" }}></div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ── INTERACTIVE MODALS ── */}

      {/* 1. History Modal */}
      {activeModal === "history" && (
        <div className="modalOverlay" onClick={() => setActiveModal(null)}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3><FaHistory /> Study Buddy History</h3>
              <button className="modalCloseBtn" onClick={() => setActiveModal(null)}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <ul className="historyList">
                <li onClick={() => { handleSend("Virtual DOM"); setActiveModal(null); }}>
                  <strong>Virtual DOM in React</strong> <span>Today, 10:30 AM</span>
                </li>
                <li onClick={() => { handleSend("Props vs State"); setActiveModal(null); }}>
                  <strong>Props vs State in React</strong> <span>Yesterday, 6:20 PM</span>
                </li>
                <li onClick={() => { handleSend("useEffect"); setActiveModal(null); }}>
                  <strong>Explain useEffect Hook</strong> <span>27 May 2025</span>
                </li>
                <li onClick={() => { handleSend("SQL vs NoSQL"); setActiveModal(null); }}>
                  <strong>Difference between SQL & NoSQL</strong> <span>25 May 2025</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. Upgrade to Pro Modal */}
      {activeModal === "upgrade" && (
        <div className="modalOverlay" onClick={() => setActiveModal(null)}>
          <div className="modalContainer proModal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3><FaCrown color="#F59E0B" /> SkillSphere AI Pro</h3>
              <button className="modalCloseBtn" onClick={() => setActiveModal(null)}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <p>Supercharge your learning with advanced AI capabilities!</p>
              <ul className="proFeaturesList">
                <li>✨ Unlimited GPT-4o & Claude 3.5 Sonnet queries</li>
                <li>📄 PDF & Slide document analysis</li>
                <li>🖼️ Visual code diagram & image recognition</li>
                <li>⚡ 2x Faster response speed</li>
              </ul>
              <button className="btnConfirmPro">Upgrade Now — ₹499 / month</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Course Context Switcher Modal */}
      {activeModal === "context" && (
        <div className="modalOverlay" onClick={() => setActiveModal(null)}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Switch Active Course Context</h3>
              <button className="modalCloseBtn" onClick={() => setActiveModal(null)}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <div className="contextOptionsList">
                <div
                  className="ctxOption"
                  onClick={() => {
                    setActiveCourseContext({ title: "React Developer Path", module: "Module 2: React Components", icon: "⚛️" });
                    setActiveModal(null);
                  }}
                >
                  <span className="icon">⚛️</span>
                  <div><strong>React Developer Path</strong><span>Module 2: React Components</span></div>
                </div>

                <div
                  className="ctxOption"
                  onClick={() => {
                    setActiveCourseContext({ title: "Python for Data Science", module: "Module 3: Pandas & Dataframes", icon: "🐍" });
                    setActiveModal(null);
                  }}
                >
                  <span className="icon">🐍</span>
                  <div><strong>Python for Data Science</strong><span>Module 3: Pandas & Dataframes</span></div>
                </div>

                <div
                  className="ctxOption"
                  onClick={() => {
                    setActiveCourseContext({ title: "Fullstack with Node.js", module: "Module 4: RESTful APIs", icon: "🟩" });
                    setActiveModal(null);
                  }}
                >
                  <span className="icon">🟩</span>
                  <div><strong>Fullstack with Node.js</strong><span>Module 4: RESTful APIs</span></div>
                </div>

                <div
                  className="ctxOption"
                  onClick={() => {
                    setActiveCourseContext({ title: "UI/UX Design Masterclass", module: "Module 2: Figma Wireframing", icon: "🎨" });
                    setActiveModal(null);
                  }}
                >
                  <span className="icon">🎨</span>
                  <div><strong>UI/UX Design Masterclass</strong><span>Module 2: Figma Wireframing</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Tool Feature Modal */}
      {activeModal === "tool" && toolModalContent && (
        <div className="modalOverlay" onClick={() => setActiveModal(null)}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>🛠️ {toolModalContent.name}</h3>
              <button className="modalCloseBtn" onClick={() => setActiveModal(null)}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <p>{toolModalContent.desc}</p>
              <button
                className="btnConfirmPro"
                onClick={() => {
                  handleSend(`Launch ${toolModalContent.name} tool for ${activeCourseContext.title}`);
                  setActiveModal(null);
                }}
              >
                Launch {toolModalContent.name} →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Edit Goal Modal */}
      {activeModal === "edit-goal" && (
        <div className="modalOverlay" onClick={() => setActiveModal(null)}>
          <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h3>Edit Daily Study Goal</h3>
              <button className="modalCloseBtn" onClick={() => setActiveModal(null)}><FaTimes /></button>
            </div>
            <div className="modalBody">
              <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "8px" }}>
                Target Daily XP Goal:
              </label>
              <select
                value={dailyGoalXP}
                onChange={(e) => setDailyGoalXP(Number(e.target.value))}
                style={{ width: "100%", padding: "10px", borderRadius: "12px", border: "1px solid #E2E8F0", outline: "none", marginBottom: "16px" }}
              >
                <option value={50}>50 XP / day (Beginner)</option>
                <option value={100}>100 XP / day (Intermediate)</option>
                <option value={200}>200 XP / day (Pro)</option>
              </select>
              <button className="btnConfirmPro" onClick={() => setActiveModal(null)}>Save Goal</button>
            </div>
          </div>
        </div>
      )}

      <FloatingChatbot />
      <StudentFooter />
    </div>
  );
}
