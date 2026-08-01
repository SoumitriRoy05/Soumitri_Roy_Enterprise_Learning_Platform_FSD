import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaStar, FaUsers, FaPaperPlane, FaMinus, FaTimes } from "react-icons/fa";
import "../styles/floatingChatbot.css";

export default function FloatingChatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! I am SphereAI, your virtual learning and workspace guide. How can I help you explore SkillSphere today? 👋"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const responseIndicesRef = useRef({
    overview: 0,
    courses: 0,
    xp: 0,
    badges: 0,
    sandbox: 0,
    workforce: 0,
    pricing: 0,
    cert: 0,
    general: 0
  });

  const getDynamicSkillSphereReply = (queryText) => {
    const q = queryText.toLowerCase();

    if (q.includes("course") || q.includes("enroll") || q.includes("pay") || q.includes("unlock") || q.includes("price") || q.includes("approval") || q.includes("admin approve")) {
      return {
        text: "SkillSphere features 16 industry-aligned courses (React, Python, Node.js, Spring Boot, DSA, Web3, AWS, GenAI, etc.).\n\n📌 How Course Unlocking & Approval Works:\n1. Browse Courses & click 'Unlock Course'.\n2. Complete the checkout payment.\n3. Your purchase request is sent to the Admin Dashboard for Admin Verification.\n4. Once approved by the Admin, the course is unlocked in your dashboard instantly!",
        actionLabel: "📚 Browse All Courses",
        actionPath: "/courses"
      };
    }

    if (q.includes("certificat") || q.includes("credential") || q.includes("verify") || q.includes("download") || q.includes("earned")) {
      return {
        text: "Certificates on SkillSphere are issued upon completing course paths or scoring 85%+ on Track Quizzes!\n\n📜 Features:\n• Official Certificate of Completion with Credential ID\n• Canvas PNG High-Res Download\n• One-click LinkedIn Sharing\n• QR/Link Verification",
        actionLabel: "📜 View My Certificates",
        actionPath: "/certificate"
      };
    }

    if (q.includes("xp") || q.includes("point") || q.includes("streak") || q.includes("level") || q.includes("score")) {
      return {
        text: "XP (Experience Points) power your SkillSphere rank!\n\n⚡ How to Earn XP:\n• Complete Chapter Lessons: +100 to +250 XP\n• Track Quiz Questions: +15 XP per correct answer\n• Daily Login Streak: Multiplier XP bonuses\n• Daily Quests: +50 XP per completed task",
        actionLabel: "⚡ Check Daily Quests & XP",
        actionPath: "/daily-quests"
      };
    }

    if (q.includes("badge") || q.includes("trophy") || q.includes("achievement") || q.includes("reward")) {
      return {
        text: "SkillSphere has 11+ unlockable skill badges! Earn badges like React Master, Python Ninja, FAANG DSA Specialist, and Perfect Quizzer by scoring 85%+ on Track Assessments.",
        actionLabel: "🏆 View My Badges",
        actionPath: "/badges"
      };
    }

    if (q.includes("study buddy") || q.includes("ai buddy") || q.includes("gfg") || q.includes("w3school") || q.includes("question") || q.includes("doubt")) {
      return {
        text: "AI Study Buddy is your personal AI tutor! Ask any programming or subject question (React, JS, Python, Java, DSA, Node, etc.) and get step-by-step explanations, code examples, and GeeksforGeeks & W3Schools reference documentation!",
        actionLabel: "🤖 Launch AI Study Buddy",
        actionPath: "/ai-buddy"
      };
    }

    if (q.includes("code arena") || q.includes("arena") || q.includes("battle") || q.includes("coding test")) {
      return {
        text: "CodeArena is SkillSphere's competitive coding environment! Test your speed against algorithmic challenges, fix buggy code snippets, and climb the global leaderboards.",
        actionLabel: "⚔️ Enter CodeArena",
        actionPath: "/code-arena"
      };
    }

    if (q.includes("sandbox") || q.includes("compiler") || q.includes("ide") || q.includes("editor")) {
      return {
        text: "SkillSphere Live Sandbox is an in-browser code editor supporting HTML, CSS, JavaScript, and live iframe execution. Experiment with code without local setup!",
        actionLabel: "💻 Open Live Sandbox",
        actionPath: "/sandbox"
      };
    }

    if (q.includes("resume") || q.includes("cv") || q.includes("job") || q.includes("opportunity")) {
      return {
        text: "SkillSphere provides an AI-powered Resume Builder and an Opportunity Feed for tech jobs, internships, hackathons, and freelance gigs!",
        actionLabel: "📄 Open Resume Builder",
        actionPath: "/resume"
      };
    }

    if (q.includes("workforce") || q.includes("admin") || q.includes("dashboard") || q.includes("manager") || q.includes("team")) {
      return {
        text: "SkillSphere Workforce & Admin Dashboard enables platform administrators and team leads to approve course access, manage student accounts, assign sprint tickets, and audit live analytics.",
        actionLabel: "📊 Admin / Workforce Hub",
        actionPath: "/workforce-dashboard"
      };
    }

    return {
      text: `SkillSphere is a complete gamified learning ecosystem! You can learn 16+ tech tracks, earn certificates, practice with AI Study Buddy, compete in CodeArena, and build ATS resumes.\n\nHow can I guide your learning journey today?`,
      actionLabel: "🚀 Go to Student Dashboard",
      actionPath: "/student-home"
    };
  };

  const handleSendMessage = (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const reply = getDynamicSkillSphereReply(text);
      const replyObj = typeof reply === "string" ? { text: reply } : reply;
      setMessages(prev => [...prev, { sender: "assistant", ...replyObj }]);
      setIsLoading(false);
    }, 600);
  };

  const quickPrompts = [
    { text: "What is SkillSphere?", icon: <FaBookOpen /> },
    { text: "How to earn XP?", icon: <FaStar /> },
    { text: "How to manage teams?", icon: <FaUsers /> }
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className={`floating-chat-bubble ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with SphereAI"
      >
        {isOpen ? <FaTimes /> : "🤖"}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="floating-chat-window">
          {/* Header */}
          <div className="chat-window-header">
            <div className="chat-header-title">
              <div className="chat-status-dot"></div>
              <div className="sphereLogoHex">⬢</div>
              <h4>
                SphereAI <span className="subtitleText">Virtual Assistant</span>
              </h4>
            </div>

            <div className="chat-header-actions">
              <button className="chat-action-btn" onClick={() => setIsOpen(false)} title="Minimize">
                <FaMinus />
              </button>
              <button className="chat-action-btn" onClick={() => setIsOpen(false)} title="Close">
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Messages Log */}
          <div className="chat-window-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message-row ${msg.sender}`}>
                {msg.sender === "assistant" && (
                  <div className="assistantAvatarCircle">
                    🤖
                  </div>
                )}

                <div className={`chat-bubble-card ${msg.sender}`}>
                  <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
                  {msg.actionPath && (
                    <button
                      className="chatActionBtn"
                      onClick={() => {
                        setIsOpen(false);
                        navigate(msg.actionPath);
                      }}
                      style={{
                        marginTop: "10px",
                        padding: "6px 14px",
                        borderRadius: "99px",
                        background: "#F9572A",
                        color: "#FFFFFF",
                        border: "none",
                        fontSize: "11px",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "inline-block"
                      }}
                    >
                      {msg.actionLabel || "Go to Page →"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message-row assistant">
                <div className="assistantAvatarCircle">🤖</div>
                <div className="chat-typing-indicator">
                  <div className="chat-typing-dot"></div>
                  <div className="chat-typing-dot"></div>
                  <div className="chat-typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="chat-window-hints">
            {quickPrompts.map((promptObj, i) => (
              <button
                key={i}
                className="chat-hint-chip-btn"
                onClick={() => handleSendMessage(promptObj.text)}
              >
                <span className="chipIcon">{promptObj.icon}</span>
                <span className="chipText">{promptObj.text}</span>
                <span className="chipArrow">&gt;</span>
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="chat-window-input-area">
            <input
              type="text"
              className="chat-window-input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage(input);
              }}
              disabled={isLoading}
            />

            <button
              className="chat-window-send"
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
