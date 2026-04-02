import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.clear();
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        
        // Fetch profile to determine role
        const profileRes = await fetch('http://localhost:8000/api/users/profile/', {
          headers: { 'Authorization': `Bearer ${data.access}` }
        });
        
        if (profileRes.ok) {
          const profile = await profileRes.json();
          if (profile.role === 'ADMIN') {
            localStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/dashboard');
          } else {
            localStorage.setItem('isAdminAuthenticated', 'false');
            navigate('/student-dashboard');
          }
        } else {
           navigate('/student-dashboard'); 
        }
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection failed. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container fade-in" style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: '#f8fafc'
    }}>
      <style>{`
        .login-card {
          background: white;
          padding: 48px;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.06);
          width: 100%;
          max-width: 440px;
          border: 1px solid #f1f5f9;
        }
        .login-title {
          font-size: 2.25rem;
          color: #0f172a;
          margin-bottom: 12px;
          text-align: center;
          font-weight: 800;
          letter-spacing: -0.025em;
        }
        .login-subtitle {
          color: #64748b;
          text-align: center;
          margin-bottom: 40px;
          font-size: 1rem;
        }
        .form-group {
          margin-bottom: 24px;
        }
        .form-group label {
          display: block;
          margin-bottom: 10px;
          color: #334155;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .input-with-icon {
          position: relative;
        }
        .input-with-icon input {
          width: 100%;
          padding: 14px 14px 14px 46px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.2s;
          box-sizing: border-box;
          color: #1e293b;
        }
        .input-with-icon input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          outline: none;
        }
        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .btn-login {
          width: 100%;
          padding: 16px;
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .btn-login:hover:not(:disabled) {
          background: #1e293b;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.1);
        }
        .btn-login:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .error-box {
          background: #fef2f2;
          color: #dc2626;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.95rem;
          border: 1px solid #fee2e2;
          font-weight: 600;
        }
      `}</style>
      
      <div className="login-card">
        <h1 className="login-title">TechMasters LMS</h1>
        <p className="login-subtitle">Sign in to your learning portal</p>
        
        {error && (
          <div className="error-box">
            <AlertCircle size={20} />
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="form-group">
            <label>Email ID / Username</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={20} />
              <input 
                type="text" 
                placeholder="pooja@techmasters.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={20} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Authenticating...' : (
              <>
                Sign In to LMS <LogIn size={20} />
              </>
            )}
          </button>
        </form>
        
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            New student? <a href="/enroll" style={{ color: '#3b82f6', fontWeight: 700, textDecoration: 'none' }}>Enroll for your first course</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
