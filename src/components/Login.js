import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.removeItem('isAdminAuthenticated');
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'techmasterstrainings@gmail.com' && password === 'Fri10Feb@2023') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Authentication issue.');
    }
  };

  return (
    <div className="login-container fade-in" style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <style>{`
        .login-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          width: 100%;
          max-width: 400px;
          border: 1px solid #e2e8f0;
        }
        .login-title {
          font-size: 1.8rem;
          color: #0f172a;
          margin-bottom: 8px;
          text-align: center;
          font-weight: 700;
        }
        .login-subtitle {
          color: #64748b;
          text-align: center;
          margin-bottom: 32px;
          font-size: 0.95rem;
        }
        .form-group {
          margin-bottom: 20px;
          position: relative;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #334155;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .input-with-icon {
          position: relative;
        }
        .input-with-icon input {
          width: 100%;
          padding: 12px 12px 12px 42px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s;
          box-sizing: border-box;
        }
        .input-with-icon input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
          outline: none;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .btn-login {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-login:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }
        .error-box {
          background: #fef2f2;
          color: #dc2626;
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          border: 1px solid #fee2e2;
        }
      `}</style>
      
      <div className="login-card">
        <h1 className="login-title">Admin Login</h1>
        <p className="login-subtitle">Enter your credentials to access the board</p>
        
        {error && (
          <div className="error-box">
            <AlertCircle size={18} />
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>
          
          <button type="submit" className="btn-login">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
