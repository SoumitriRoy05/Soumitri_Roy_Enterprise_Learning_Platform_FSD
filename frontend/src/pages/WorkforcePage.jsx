import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import PaperPlaneCursor from "../components/PaperPlaneCursor";

import {
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaAward,
  FaBrain,
  FaCogs,
  FaUserCheck,
  FaChartBar,
  FaBriefcase,
  FaStar,
  FaFolderOpen,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";

import workHubHeroImg from "../assets/work_hub_hero_illustration.png";
import darkWorkHubHeroImg from "../assets/dark_work_hub_hero_illustration.png";
import "../styles/workHubPage.css";
import "../styles/footer.css";

const orgToolsList = [
  {
    icon: <FaUsers />,
    title: "Team Management",
    description: "Create teams, assign roles, and manage access with ease.",
    actionText: "Manage Teams →",
    link: "/team-space"
  },
  {
    icon: <FaClipboardList />,
    title: "Learning Assignments",
    description: "Assign courses and learning paths based on roles, skills, and goals.",
    actionText: "Assign Learning →",
    link: "/team-space"
  },
  {
    icon: <FaChartLine />,
    title: "Analytics & Reports",
    description: "Track progress, performance, and engagement with real-time insights.",
    actionText: "View Reports →",
    link: "/workforce-dashboard"
  },
  {
    icon: <FaAward />,
    title: "Certificates",
    description: "Recognize achievements and share verified certificates with your team.",
    actionText: "Manage Certificates →",
    link: "/certificate"
  },
  {
    icon: <FaBrain />,
    title: "Skill Insights",
    description: "Identify skill gaps and get AI-driven recommendations to build future-ready teams.",
    actionText: "Explore Insights →",
    link: "/workforce-dashboard"
  },
  {
    icon: <FaCogs />,
    title: "Integrations",
    description: "Seamlessly integrate with your HRMS, LMS, and collaboration tools.",
    actionText: "View Integrations →",
    link: "/workforce-home"
  }
];

export default function WorkforcePage() {
  const navigate = useNavigate();
  const { user, themeMode } = useAuth();
  const isDarkMode = themeMode === "dark";

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="workHubPage">
      <Background />
      <PaperPlaneCursor />
      <Navbar />

      <main className="workHubContainer">
        {/* ── HERO SECTION (3-COLUMN LAYOUT) ── */}
        <section className="whHeroSection">
          {/* Left Column */}
          <div className="whHeroLeft">
            <div className="whBadge">
              💼 WORK HUB
            </div>

            <h1>
              Empower Your Workforce. <br />
              <span>Drive Results. 🚀</span>
            </h1>

            <p>
              Manage learning, track performance, and build high-performing
              teams with intelligent tools designed for modern organizations.
            </p>

            <div className="whHeroButtons">
              <button
                className="whBtnPrimary"
                onClick={() => navigate(user ? '/workforce-home' : '/register', { state: { role: 'EMPLOYEE', step: 2 } })}
              >
                Go to Dashboard <FaArrowRight />
              </button>

              <button
                className="whBtnSecondary"
                onClick={() => navigate('/register', { state: { role: 'EMPLOYEE', step: 2 } })}
              >
                Request Demo
              </button>
            </div>

            <div className="whHeroMicroPills">
              <div className="whMicroPill">
                <div className="whPillIcon"><FaUsers /></div>
                <div className="whPillText">
                  <h5>Upskill Teams</h5>
                  <span>Build job-ready skills</span>
                </div>
              </div>

              <div className="whMicroPill">
                <div className="whPillIcon"><FaChartBar /></div>
                <div className="whPillText">
                  <h5>Track Impact</h5>
                  <span>Measure learning outcomes</span>
                </div>
              </div>

              <div className="whMicroPill">
                <div className="whPillIcon"><FaChartLine /></div>
                <div className="whPillText">
                  <h5>Boost Productivity</h5>
                  <span>Improve performance</span>
                </div>
              </div>

              <div className="whMicroPill">
                <div className="whPillIcon"><FaUserCheck /></div>
                <div className="whPillText">
                  <h5>Retain Talent</h5>
                  <span>Grow careers & engagement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Corporate Team Hero Graphic */}
          <div className="whHeroCenter">
            <div className="whHeroGraphicWrapper">
              <img
                src={isDarkMode ? darkWorkHubHeroImg : workHubHeroImg}
                alt="Corporate Team Work Hub Illustration"
                className="whHeroTeamImg"
              />
            </div>
          </div>

          {/* Right Column: Performance Overview Widget Card */}
          <div className="whHeroRight">
            <div className="perfWidgetCard">
              <div className="perfWidgetHeader">
                <h4>Performance Overview</h4>
              </div>

              {/* Visual Donut / Progress Bar Placeholder */}
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'conic-gradient(#F9572A 0% 78%, #FBBF24 78% 94%, #E2E8F0 94% 100%)',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(249, 87, 42, 0.15)'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <strong style={{ fontSize: '15px', color: '#1E1B18' }}>78%</strong>
                    <span style={{ fontSize: '8px', color: '#64748B' }}>Completed</span>
                  </div>
                </div>
              </div>

              <ul className="donutLegendList">
                <li>
                  <span><span className="legendDot" style={{ background: '#F9572A' }}></span> Completed</span>
                  <strong>78%</strong>
                </li>
                <li>
                  <span><span className="legendDot" style={{ background: '#FBBF24' }}></span> In Progress</span>
                  <strong>16%</strong>
                </li>
                <li>
                  <span><span className="legendDot" style={{ background: '#E2E8F0' }}></span> Not Started</span>
                  <strong>6%</strong>
                </li>
              </ul>
            </div>

            <div className="completionRateWidget">
              <h5>Completion Rate</h5>
              <strong>78%</strong>
              <span>All Teams</span>
              <div className="compTrack">
                <div className="compFill"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR (6 METRICS) ── */}
        <section className="whStatsBarContainer">
          <div className="whStatItem">
            <div className="whStatIconCircle"><FaUsers /></div>
            <div className="whStatText">
              <strong>245</strong>
              <span>Total Employees</span>
            </div>
          </div>

          <div className="whStatItem">
            <div className="whStatIconCircle"><FaUserCheck /></div>
            <div className="whStatText">
              <strong>198</strong>
              <span>Active Learners</span>
            </div>
          </div>

          <div className="whStatItem">
            <div className="whStatIconCircle"><FaClipboardList /></div>
            <div className="whStatText">
              <strong>32</strong>
              <span>Courses Assigned</span>
            </div>
          </div>

          <div className="whStatItem">
            <div className="whStatIconCircle"><FaChartLine /></div>
            <div className="whStatText">
              <strong>78%</strong>
              <span>Completion Rate</span>
            </div>
          </div>

          <div className="whStatItem">
            <div className="whStatIconCircle"><FaStar /></div>
            <div className="whStatText">
              <strong>4.8/5</strong>
              <span>Average Rating</span>
            </div>
          </div>

          <div className="whStatItem">
            <div className="whStatIconCircle"><FaBriefcase /></div>
            <div className="whStatText">
              <strong>56</strong>
              <span>Active Projects</span>
            </div>
          </div>
        </section>

        {/* ── POWERFUL TOOLS FOR YOUR ORGANIZATION (6 CARDS - 3x2) ── */}
        <section className="orgToolsSection">
          <div className="orgToolsTag">EVERYTHING YOU NEED</div>
          <h2>Powerful Tools for Your Organization</h2>
          <div className="titleUnderline"></div>

          <div className="orgToolsGrid3x2">
            {orgToolsList.map((item, index) => (
              <div className="orgToolCard" key={index}>
                <div>
                  <div className="orgToolIconCircle">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <span
                  className="orgToolActionLink"
                  onClick={() => navigate(item.link)}
                >
                  {item.actionText}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── USE WORK HUB ACROSS YOUR ORGANIZATION (5 AUDIENCE COLUMNS) ── */}
        <section className="teamAudienceSection">
          <div className="teamAudienceContainerCard">
            <div className="teamAudienceTag">FOR EVERY TEAM</div>
            <h2>Use Work Hub Across Your Organization</h2>

            <div className="teamAudienceGrid">
              <div className="teamColItem">
                <div className="teamIconCircle"><FaUserCheck /></div>
                <h4>HR Teams</h4>
                <p>Manage training programs and employee development.</p>
              </div>

              <div className="teamColItem">
                <div className="teamIconCircle"><FaClipboardList /></div>
                <h4>Team Leaders</h4>
                <p>Assign learning, track progress & upskill teams.</p>
              </div>

              <div className="teamColItem">
                <div className="teamIconCircle"><FaBrain /></div>
                <h4>L&D Managers</h4>
                <p>Create learning paths and measure training impact.</p>
              </div>

              <div className="teamColItem">
                <div className="teamIconCircle"><FaStar /></div>
                <h4>Executives</h4>
                <p>Get insights and reports to drive strategic decisions.</p>
              </div>

              <div className="teamColItem">
                <div className="teamIconCircle"><FaUsers /></div>
                <h4>Employees</h4>
                <p>Access assigned learning and grow your skills.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── VIBRANT ORANGE CTA BANNER ── */}
        <section className="whCtaSection">
          <div className="whCtaBanner">
            <div className="whCtaLeft">
              <div className="dashPreviewBox">
                <div style={{ fontSize: '32px', textAlign: 'center', padding: '10px 0' }}>📊</div>
              </div>
              <div className="whCtaText">
                <h2>Ready to Transform Your Workforce?</h2>
                <p>
                  Join leading organizations using Work Hub to build smarter teams and better results.
                </p>
              </div>
            </div>

            <div className="whCtaButtons">
              <button
                className="whBtnReqDemo"
                onClick={() => navigate('/register', { state: { role: 'EMPLOYEE', step: 2 } })}
              >
                Request Demo <FaArrowRight />
              </button>

              <button
                className="whBtnGoogleCta"
                onClick={() => navigate('/login')}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google logo"
                />
                Continue with Google
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER MATCHING MOCKUP ── */}
      <footer className="footerSection">
        <div className="footerContainer">
          <div className="footerTopGrid" style={{ gridTemplateColumns: '2fr 1fr 1.2fr 1.2fr' }}>
            {/* Col 1: Brand */}
            <div className="footerBrandCol">
              <Link to="/" className="footerLogo" onClick={handleScrollTop}>
                <span className="logoIcon">⬢</span>
                <span>SkillSphere</span>
              </Link>
              <p className="footerBrandDesc">
                Empowering organizations through smart learning, real-time analytics, and measurable results.
              </p>
              <div className="socialIconsRow">
                <a href="#facebook" className="socialIconBtn" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#twitter" className="socialIconBtn" aria-label="Twitter"><FaTwitter /></a>
                <a href="#linkedin" className="socialIconBtn" aria-label="LinkedIn"><FaLinkedinIn /></a>
                <a href="#instagram" className="socialIconBtn" aria-label="Instagram"><FaInstagram /></a>
                <a href="#youtube" className="socialIconBtn" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="footerColTitle">Quick Links</h4>
              <ul className="footerLinkList">
                <li><Link to="/" onClick={handleScrollTop}>Home</Link></li>
                <li><Link to="/features" onClick={handleScrollTop}>Features</Link></li>
                <li><Link to="/student-features" onClick={handleScrollTop}>Students Hub</Link></li>
                <li><Link to="/workforce" onClick={handleScrollTop} style={{ color: '#F9572A', fontWeight: '700' }}>Work Hub</Link></li>
                <li><Link to="/sandbox" onClick={handleScrollTop}>Sandbox</Link></li>
                <li><Link to="/admin-login" onClick={handleScrollTop}>Admin Portal</Link></li>
                <li><Link to="/executive/dashboard" onClick={handleScrollTop}>Executive Portal</Link></li>
              </ul>
            </div>

            {/* Col 3: For Organizations */}
            <div>
              <h4 className="footerColTitle">For Organizations</h4>
              <ul className="footerLinkList">
                <li><Link to="/workforce-dashboard" onClick={handleScrollTop}>Dashboard</Link></li>
                <li><Link to="/team-space" onClick={handleScrollTop}>Team Management</Link></li>
                <li><Link to="/team-space" onClick={handleScrollTop}>Assignments</Link></li>
                <li><Link to="/workforce-dashboard" onClick={handleScrollTop}>Reports & Analytics</Link></li>
                <li><Link to="/workforce" onClick={handleScrollTop}>Work Hub</Link></li>
              </ul>
            </div>

            {/* Col 4: Support */}
            <div>
              <h4 className="footerColTitle">Support</h4>
              <ul className="footerLinkList">
                <li><Link to="/" onClick={handleScrollTop}>Help Center</Link></li>
                <li><Link to="/" onClick={handleScrollTop}>FAQs</Link></li>
                <li><Link to="/" onClick={handleScrollTop}>Contact Support</Link></li>
                <li><Link to="/" onClick={handleScrollTop}>Privacy Policy</Link></li>
                <li><Link to="/" onClick={handleScrollTop}>Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footerBottomRow">
            <div>© 2025 SkillSphere. All rights reserved.</div>
            <div>Made with ❤️ for teams & organizations</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
