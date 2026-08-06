import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Background from "../components/Background";
import StudentFooter from "../components/StudentFooter";
import NotificationDropdown from "../components/NotificationDropdown";
import UserAvatar from "../components/UserAvatar";
import {
  FaHome, FaBook, FaCodeBranch, FaAward, FaCertificate, FaChartLine,
  FaFileInvoice, FaCog, FaSearch, FaSun, FaMoon, FaArrowLeft,
  FaSignOutAlt, FaRobot, FaRocket, FaBolt, FaClock, FaCheckCircle, FaExclamationCircle, FaCode
} from "react-icons/fa";
import "../styles/studentDashboard.css";

const ASSESSMENTS_LIST = [
  {
    id: "js",
    title: "JavaScript Basics Check",
    duration: 60,
    questions: [
      { q: "Which keyword defines block-scoped variables in modern ES6?", options: ["var", "let", "const", "Both let and const"], answer: 3 },
      { q: "What is the output of typeof null in JavaScript?", options: ["null", "undefined", "object", "string"], answer: 2 },
      { q: "Which event loop phase executes setImmediate callbacks?", options: ["Timers", "Poll", "Check", "Close"], answer: 2 }
    ],
    xpReward: 150
  },
  {
    id: "react",
    title: "React Hooks Proficiency",
    duration: 60,
    questions: [
      { q: "Which hook should be used to memoize complex computational values?", options: ["useEffect", "useCallback", "useMemo", "useRef"], answer: 2 },
      { q: "Can hooks be called inside conditional statements in React?", options: ["Yes, absolutely", "No, it violates Hooks rules", "Only inside useEffect", "Only in dev mode"], answer: 1 },
      { q: "What is the second argument of useEffect called?", options: ["Dependency array", "Cleanup handler", "State callback", "Prop map"], answer: 0 }
    ],
    xpReward: 200
  },
  {
    id: "python",
    title: "Python Basics Check",
    duration: 60,
    questions: [
      { q: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Set", "Tuple"], answer: 3 },
      { q: "How do you define a function in Python?", options: ["func name()", "def name():", "function name():", "define name()"], answer: 1 },
      { q: "Which operator is used for integer division in Python?", options: ["/", "//", "%", "div"], answer: 1 }
    ],
    xpReward: 150
  },
  {
    id: "uiux",
    title: "UI/UX Design Check",
    duration: 60,
    questions: [
      { q: "Which principle describes visual hierarchy?", options: ["Fitts' Law", "Rule of Thirds", "Gestalt Principles", "All of the above"], answer: 3 },
      { q: "What does UX stand for?", options: ["User Experience", "User Expansion", "Unified eXtension", "Unique eXploration"], answer: 0 },
      { q: "Which tool is primarily used for vector interface design?", options: ["Photoshop", "Word", "Figma", "Excel"], answer: 2 }
    ],
    xpReward: 150
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms Check",
    duration: 60,
    questions: [
      { q: "What is the average time complexity of QuickSort?", options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], answer: 1 },
      { q: "Which data structure follows LIFO (Last In First Out)?", options: ["Queue", "Stack", "Tree", "Graph"], answer: 1 },
      { q: "Which sorting algorithm is stable by default?", options: ["Merge Sort", "Quick Sort", "Heap Sort", "Selection Sort"], answer: 0 }
    ],
    xpReward: 250
  },
  {
    id: "node",
    title: "Node.js Essentials Check",
    duration: 60,
    questions: [
      { q: "Which module is used to handle file paths in Node.js?", options: ["fs", "path", "http", "os"], answer: 1 },
      { q: "Is Node.js single-threaded or multi-threaded by default?", options: ["Single-threaded", "Multi-threaded", "Depends on CPU cores", "None of the above"], answer: 0 },
      { q: "Which function import syntax is standard in ES6 Node.js?", options: ["require()", "import from", "include()", "using()"], answer: 1 }
    ],
    xpReward: 200
  },
  {
    id: "system",
    title: "System Design Basics Check",
    duration: 60,
    questions: [
      { q: "Which component routes traffic to servers?", options: ["CDN", "Database", "Load Balancer", "Cache"], answer: 2 },
      { q: "What does CDN stand for?", options: ["Content Delivery Network", "Central Data Node", "Client Device Network", "None of the above"], answer: 0 },
      { q: "What is horizontal scaling?", options: ["Adding more RAM to a server", "Adding more servers to the pool", "Optimizing code execution", "Scaling database tables"], answer: 1 }
    ],
    xpReward: 250
  },
  {
    id: "ml",
    title: "Machine Learning Check",
    duration: 60,
    questions: [
      { q: "Which metric measures regression accuracy?", options: ["Precision", "F1 Score", "Mean Squared Error (MSE)", "Recall"], answer: 2 },
      { q: "Which algorithm is commonly used for classification tasks?", options: ["Linear Regression", "Logistic Regression", "K-Means Clustering", "Apriori"], answer: 1 },
      { q: "What is overfitting in machine learning?", options: ["Model performs well on training data but poorly on unseen data", "Model performs poorly on all data", "Model runs too slowly", "None of the above"], answer: 0 }
    ],
    xpReward: 250
  }
];

export default function AssessmentsPage() {
  const { user, xp, logout, themeMode, toggleTheme, earnXp } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = themeMode === "dark";
  
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  // Timer Effect
  useEffect(() => {
    if (activeQuiz && timeLeft > 0 && !quizFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (activeQuiz && timeLeft === 0 && !quizFinished) {
      submitQuiz();
    }
  }, [activeQuiz, timeLeft, quizFinished]);

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setTimeLeft(quiz.duration);
    setQuizFinished(false);
    setScore(0);
  };

  const selectAnswer = (ansIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: ansIdx
    }));
  };

  const submitQuiz = () => {
    let calculatedScore = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setQuizFinished(true);

    // If passed (more than 50% correct), reward XP
    const passed = calculatedScore >= activeQuiz.questions.length / 2;
    if (passed && earnXp) {
      earnXp(activeQuiz.xpReward);
      const passedList = JSON.parse(localStorage.getItem(`skillsphere_assessments_passed_${user?.email || "guest"}`) || "[]");
      if (!passedList.includes(activeQuiz.id)) {
        passedList.push(activeQuiz.id);
        localStorage.setItem(`skillsphere_assessments_passed_${user?.email || "guest"}`, JSON.stringify(passedList));
      }
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "student-profile", label: "Student Profile", icon: <FaAward /> },
    { id: "services-catalog", label: "Services & Catalog", icon: <FaBook /> },
    { id: "assessments", label: "Assessments", icon: <FaBolt /> },
    { id: "certification-tracking", label: "Cert Tracking", icon: <FaCertificate /> },
    { id: "tracking-dashboard", label: "Tracking Dashboard", icon: <FaChartLine /> },
    { id: "complaint-tracking", label: "Complaint & Renewal", icon: <FaFileInvoice /> },
    { id: "career-roadmap", label: "Career Roadmap", icon: <FaCodeBranch /> },
    { id: "job-search", label: "Job Search", icon: <FaRocket /> },
    { id: "courses", label: "Courses", icon: <FaBook /> },
    { id: "learning-paths", label: "Learning Paths", icon: <FaCodeBranch /> },
    { id: "ai-buddy", label: "AI Study Buddy", icon: <FaRobot /> },
    { id: "opportunity-feed", label: "Opportunity Feed", icon: <FaRocket /> },
    { id: "daily-quests", label: "Daily Quests", icon: <FaBolt /> },
    { id: "badges", label: "Badges", icon: <FaAward /> },
    { id: "certificates", label: "Certificates", icon: <FaCertificate /> },
    { id: "progress", label: "Progress", icon: <FaChartLine /> },
    { id: "resume", label: "Resume Builder", icon: <FaFileInvoice /> },
    { id: "code-arena", label: "CodeArena", icon: <FaCode /> }
  ];

  return (
    <div className={`sdDashboardWrapper ${isDarkMode ? "dark-theme" : ""}`}>
      <Background />

      <div className="sdMainContainer">
        {/* Left Sidebar */}
        <aside className="sdLeftSidebar">
          <div>
            <Link to="/" className="sdBrandLogo">
              <span className="logoHex">⬢</span>
              <span>SkillSphere</span>
            </Link>
            <div className="sdSidebarHomeArchHeader">
              <div className="sdArchLine" />
              <button className="sdHomeCircularBtn" onClick={() => navigate("/student-home")}>
                <FaHome />
              </button>
            </div>
            <ul className="sdNavList">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sdNavItem ${item.id === "assessments" ? "active" : ""}`}
                    onClick={() => {
                      if (item.id === "dashboard") navigate("/student-home");
                      else if (item.id === "student-profile") navigate("/student-profile");
                      else if (item.id === "services-catalog") navigate("/services-catalog");
                      else if (item.id === "assessments") navigate("/assessments");
                      else if (item.id === "certification-tracking") navigate("/certification-tracking");
                      else if (item.id === "tracking-dashboard") navigate("/tracking-dashboard");
                      else if (item.id === "complaint-tracking") navigate("/complaint-tracking");
                      else if (item.id === "career-roadmap") navigate("/career-roadmap");
                      else if (item.id === "job-search") navigate("/job-search");
                      else navigate(`/${item.id}`);
                    }}
                  >
                    <span className="navIcon">{item.icon}</span>
                    <span className="navLabel">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="sdSidebarBottomSection">
            <div className="sdSidebarFooterControls">
              <button className="sdThemeToggleBtn" onClick={toggleTheme}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
              <span className="sdControlDivider">|</span>
              <button className="sdCollapseBtn" onClick={() => navigate(-1)}>
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="sdRightBodyArea">
          <header className="sdTopHeaderBar">
            <div className="sdSearchWrapper">
              <FaSearch className="sdSearchIcon" />
              <input type="text" className="sdSearchInput" placeholder="Search assessments..." />
            </div>
            <div className="sdHeaderActionsRow">
              <div className="sdXpBadgePill">
                <FaBolt color="#F9572A" /> <span>{xp ?? 0} XP</span>
              </div>
              <NotificationDropdown type="student" />
              <button className="sdLogoutHeaderBtn" onClick={handleLogout}>
                <FaSignOutAlt /> <span>Logout</span>
              </button>
              <div className="sdUserProfilePillWrapper">
                <div className="sdUserProfilePill">
                  <UserAvatar user={user} />
                  <div className="sdUserInfoText">
                    <strong>{user?.full_name || "Learner"}</strong>
                    <span>Student</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="sdGreetingHeader">
            <h1>Skill Assessments</h1>
            <p>Prove your technical expertise and earn high bonus XP rewards.</p>
          </div>

          <div className="sdDashboardContentGrid">
            {/* Center column: Assessment execution or selection */}
            <div className="sdCenterMainCol">
              {!activeQuiz ? (
                <div className="sdWhitePanelCard">
                  <h3>Available Skill Assessments</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginTop: "16px" }}>
                    {ASSESSMENTS_LIST.map((quiz) => {
                      const completedList = JSON.parse(localStorage.getItem(`skillsphere_assessments_passed_${user?.email || "guest"}`) || "[]");
                      const isCompleted = completedList.includes(quiz.id);
                      return (
                        <div key={quiz.id} style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                              <span style={{ fontSize: "12px", background: "var(--border-color)", padding: "2px 8px", borderRadius: "10px", color: "var(--text-secondary)" }}>
                                ⏱️ {quiz.duration}s Limit
                              </span>
                              {isCompleted && <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "bold" }}>Completed ✓</span>}
                            </div>
                            <h4 style={{ margin: "0 0 8px 0", color: "var(--text-primary)" }}>{quiz.title}</h4>
                             <p style={{ margin: "0 0 16px 0", color: "var(--text-secondary)", fontSize: "13px" }}>
                              Test your knowledge on {
                                quiz.id === "js" ? "JavaScript V8 engine, closures and event scopes." :
                                quiz.id === "react" ? "React functional components, custom hooks, and state lifecycles." :
                                quiz.id === "python" ? "Python variables, immutable data structures, lists, and loops." :
                                quiz.id === "uiux" ? "UI/UX principles, design systems, visual hierarchy, and wireframes." :
                                quiz.id === "dsa" ? "Data structures, sorting algorithms, arrays, lists, and time complexity." :
                                quiz.id === "node" ? "Node.js non-blocking I/O, file systems, events, and HTTP servers." :
                                quiz.id === "system" ? "System design concepts, load balancers, caching, and CDN routing." :
                                "Machine Learning algorithms, regression metrics, and dataset split validation."
                              }
                            </p>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "14px" }}>+{quiz.xpReward} XP</span>
                            <button className="btnContinueCourse" onClick={() => startQuiz(quiz)}>
                              {isCompleted ? "Retake Exam" : "Start Test"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="sdWhitePanelCard" style={{ padding: "30px" }}>
                  {!quizFinished ? (
                    <div>
                      {/* Quiz Interface */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "20px" }}>
                        <h3 style={{ margin: 0, color: "var(--text-primary)" }}>{activeQuiz.title}</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: timeLeft <= 10 ? "#ef4444" : "var(--accent)" }}>
                          <FaClock /> <strong>{timeLeft}s remaining</strong>
                        </div>
                      </div>

                      <div style={{ marginBottom: "24px" }}>
                        <span style={{ color: "var(--text-secondary)", fontSize: "12px", display: "block", marginBottom: "8px" }}>
                          Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
                        </span>
                        <h4 style={{ color: "var(--text-primary)", fontSize: "18px", margin: 0, lineHeight: "1.5" }}>
                          {activeQuiz.questions[currentQuestionIdx].q}
                        </h4>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
                        {activeQuiz.questions[currentQuestionIdx].options.map((opt, idx) => {
                          const isSelected = selectedAnswers[currentQuestionIdx] === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => selectAnswer(idx)}
                              style={{
                                width: "100%",
                                padding: "16px",
                                textAlign: "left",
                                background: isSelected ? "var(--btn-primary-bg)" : "var(--bg-secondary)",
                                color: isSelected ? "var(--btn-primary-text)" : "var(--text-primary)",
                                border: isSelected ? "none" : "1px solid var(--border-color)",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: isSelected ? "bold" : "normal",
                                transition: "all 0.2s"
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button
                          disabled={currentQuestionIdx === 0}
                          onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
                          style={{
                            padding: "10px 20px",
                            background: "var(--bg-secondary)",
                            color: "var(--text-primary)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "8px",
                            cursor: "pointer"
                          }}
                        >
                          Previous
                        </button>

                        {currentQuestionIdx < activeQuiz.questions.length - 1 ? (
                          <button
                            onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                            style={{
                              padding: "10px 20px",
                              background: "var(--accent)",
                              color: "black",
                              border: "none",
                              borderRadius: "8px",
                              fontWeight: "bold",
                              cursor: "pointer"
                            }}
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            onClick={submitQuiz}
                            style={{
                              padding: "10px 24px",
                              background: "#10b981",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              fontWeight: "bold",
                              cursor: "pointer"
                            }}
                          >
                            Finish & Submit
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Quiz Results */
                    <div style={{ textAlign: "center", padding: "20px" }}>
                      <span style={{ fontSize: "64px" }}>
                        {score >= activeQuiz.questions.length / 2 ? "🎉" : "😢"}
                      </span>
                      <h3 style={{ color: "var(--text-primary)", margin: "20px 0 8px 0" }}>
                        {score >= activeQuiz.questions.length / 2 ? "Congratulations! You Passed!" : "Test Failed. Try Again!"}
                      </h3>
                      <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: "0 0 20px 0" }}>
                        You scored {score} out of {activeQuiz.questions.length} questions correctly.
                      </p>
                      
                      {score >= activeQuiz.questions.length / 2 ? (
                        <div style={{ display: "flex", justifyContent: "center", gap: "8px", color: "#10b981", fontWeight: "bold", marginBottom: "24px" }}>
                          <FaCheckCircle /> <span>Earned +{activeQuiz.xpReward} XP!</span>
                        </div>
                      ) : (
                        <div style={{ display: "flex", justifyContent: "center", gap: "8px", color: "#ef4444", fontWeight: "bold", marginBottom: "24px" }}>
                          <FaExclamationCircle /> <span>{"Score must be >= 50% to pass."}</span>
                        </div>
                      )}

                      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                        <button className="btnOutlineOrange" onClick={() => startQuiz(activeQuiz)}>Retake Quiz</button>
                        <button className="btnContinueCourse" onClick={() => setActiveQuiz(null)}>Back to Selection</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: High scores */}
            <div className="sdRightColumnSidebar">
              <div className="sdRightWidgetCard">
                <h4>Quiz Highscores</h4>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                    <span style={{ color: "var(--text-secondary)" }}>1. Alex Morgan (You)</span>
                    <strong style={{ color: "var(--text-primary)" }}>100%</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                    <span style={{ color: "var(--text-secondary)" }}>2. Soumitri Roy</span>
                    <strong style={{ color: "var(--text-primary)" }}>100%</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                    <span style={{ color: "var(--text-secondary)" }}>3. Aarav Sharma</span>
                    <strong style={{ color: "var(--text-primary)" }}>66%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StudentFooter />
    </div>
  );
}
