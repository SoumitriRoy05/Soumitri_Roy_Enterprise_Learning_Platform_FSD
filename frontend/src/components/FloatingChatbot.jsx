import React, { useState, useEffect, useRef } from "react";
import { FaBookOpen, FaStar, FaUsers, FaPaperPlane, FaMinus, FaTimes } from "react-icons/fa";
import "../styles/floatingChatbot.css";

export default function FloatingChatbot() {
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

    const responses = {
      overview: [
        "SkillSphere is an all-in-one gamified learning and workforce operations platform! It empowers developers with 12+ tech tracks, live code sandboxes, XP rewards, and blockchain-verified certificates.",
        "Think of SkillSphere as your futuristic growth accelerator! For students, it provides structured learning roadmaps and video lessons. For teams, it offers employee directories, task assignment, and live metrics logging."
      ],
      courses: [
        "SkillSphere features 12 comprehensive learning tracks including React, JavaScript, Data Structures & Algorithms, Generative AI, Machine Learning, Node.js, and Web3!",
        "Our Learning Portal is structured into curriculum modules per course track equipped with reference notes, video tutorials, XP rewards, and assessment quizzes!"
      ],
      xp: [
        "You earn XP on SkillSphere by completing chapter modules (+100 to +250 XP per chapter) and scoring high on track quizzes (+15 XP per mark). Accumulating XP levels up your profile!",
        "Gamification is embedded into every learning action on SkillSphere! Maintaining your daily login streak grants XP multipliers!"
      ],
      badges: [
        "SkillSphere features 11 unlockable badges, including React Master, Java Master, Fast Learner, Code Ninja, and Perfect Quizzer!",
        "Badges on SkillSphere represent verified skill milestones! When you achieve high scores on quizzes, the corresponding badge is awarded to your profile."
      ],
      workforce: [
        "SkillSphere Work Hub empowers team leads to oversee employee directories, assign sprint tickets, handle leave request approvals, and audit live metrics.",
        "For enterprise teams, SkillSphere provides a robust operations hub: managers can review team productivity, track active project progress, and manage roles."
      ],
      general: [
        `I'd be glad to help with your question about "${queryText}"! SkillSphere provides interactive learning tracks, real-time code sandboxes, XP rewards, and workforce management tools.`
      ]
    };

    let category = "general";
    if (q.includes("course") || q.includes("study") || q.includes("learn") || q.includes("react") || q.includes("java") || q.includes("dsa") || q.includes("ai")) {
      category = "courses";
    } else if (q.includes("xp") || q.includes("level") || q.includes("streak") || q.includes("point") || q.includes("score")) {
      category = "xp";
    } else if (q.includes("badge") || q.includes("achievement") || q.includes("trophy")) {
      category = "badges";
    } else if (q.includes("workforce") || q.includes("employee") || q.includes("manager") || q.includes("team")) {
      category = "workforce";
    } else if (q.includes("what is") || q.includes("skillsphere") || q.includes("about") || q.includes("overview")) {
      category = "overview";
    }

    const list = responses[category] || responses.general;
    const currentIndex = responseIndicesRef.current[category] || 0;
    const selectedReply = list[currentIndex % list.length];
    responseIndicesRef.current[category] = (currentIndex + 1) % list.length;
    return selectedReply;
  };

  const handleSendMessage = (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const reply = getDynamicSkillSphereReply(text);
      setMessages(prev => [...prev, { sender: "assistant", text: reply }]);
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
                  {msg.text}
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
