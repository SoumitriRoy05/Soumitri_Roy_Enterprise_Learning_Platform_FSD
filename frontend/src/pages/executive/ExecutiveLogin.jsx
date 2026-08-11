import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserTie, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import Background from '../../components/Background';
import '../../styles/loginPage.css';

export default function ExecutiveLogin() {
  const { loginLocal, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [devEmail, setDevEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setError("");
      const loggedUser = await loginLocal(email, password);
      if (loggedUser) {
        if (loggedUser.role !== 'EXECUTIVE') {
          setError('Access Denied: This account does not have Executive privileges.');
          await logout();
          return;
        }
        navigate('/executive/dashboard');
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  const handleDevBypass = async (e) => {
    e.preventDefault();
    const targetEmail = devEmail || 'executive@skillsphere.com';
    try {
      setError("");
      const loggedUser = await loginWithGoogle(`mock_google_token_${targetEmail}`, 'EXECUTIVE');
      if (loggedUser) {
        if (loggedUser.role !== 'EXECUTIVE') {
          setError('Access Denied: This account does not have Executive privileges.');
          await logout();
          return;
        }
        navigate('/executive/dashboard');
      }
    } catch (err) {
      setError(err.message || "Developer bypass login failed");
    }
  };

  return (
    <div className="loginPageWrapper">
      <Background />

      <div className="loginMainContainer" style={{ maxWidth: '460px', gridTemplateColumns: '1fr' }}>
        <div className="loginRightPanel" style={{ borderRadius: '28px', padding: '48px 40px' }}>
          
          <div className="portalTitleHeader">
            <div className="regHeaderIconBadge" style={{ width: '64px', height: '64px', fontSize: '28px', background: 'linear-gradient(135deg, #00C6FF, #0072FF)', color: '#ffffff' }}>
              <FaUserTie />
            </div>

            <h2 style={{ fontSize: '24px', margin: '16px 0 8px 0' }}>Executive Portal</h2>
            <p className="regSubtext" style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)' }}>
              Secure access for SkillSphere Leadership and C-Suite.
            </p>
            <div className="orangeUnderline" style={{ background: 'linear-gradient(90deg, #00C6FF, #0072FF)' }}></div>
          </div>

          {error && <div className="errorMessageCard">{error}</div>}

          <form onSubmit={handleSubmit} className="loginFormContent">
            <div className="inputFieldGroup">
              <label htmlFor="executive-email">Executive Email</label>
              <div className="inputWithIconWrapper">
                <FaEnvelope className="fieldPrefixIcon" />
                <input
                  id="executive-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@skillsphere.com"
                />
              </div>
            </div>

            <div className="inputFieldGroup">
              <label htmlFor="executive-password">Password</label>
              <div className="inputWithIconWrapper">
                <FaLock className="fieldPrefixIcon" />
                <input
                  id="executive-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="passwordEyeToggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btnSubmitLogin" style={{ marginTop: '12px', background: 'linear-gradient(135deg, #00C6FF, #0072FF)' }}>
              Authenticate
            </button>

            {/* Mock Dev Mode Box */}
            <div className="mockDevModeBox" style={{ marginTop: '24px' }}>
              <div className="mockDevHeader">
                <FaShieldAlt /> Mock Dev Mode
              </div>
              <div className="mockDevSubtext">
                Enter email to bypass Google (EXECUTIVE)
              </div>
              <div className="mockDevFormRow">
                <input
                  type="email"
                  className="mockDevInput"
                  placeholder="executive@skillsphere.com"
                  value={devEmail}
                  onChange={(e) => setDevEmail(e.target.value)}
                />
                <button type="button" className="btnDevBypass" onClick={handleDevBypass} style={{ background: 'linear-gradient(135deg, #00C6FF, #0072FF)', borderColor: '#00C6FF' }}>
                  Bypass
                </button>
              </div>
            </div>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#00C6FF',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FaArrowLeft /> Return to Homepage
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
