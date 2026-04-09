import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (email !== 'techmasterstrainings@gmail.com' || password !== 'Fri10Feb@2023') {
        setError('Invalid Admin credentials.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);

        const profileRes = await fetch('http://localhost:8000/api/users/profile/', {
          headers: { 'Authorization': `Bearer ${data.access}` }
        });

        if (profileRes.ok) {
          const profile = await profileRes.json();
          if (profile.role === 'ADMIN' || profile.is_superuser) {
            localStorage.setItem('isAdminAuthenticated', 'true');
            if (window.refreshDashboardData) await window.refreshDashboardData();
            navigate('/dashboard');
          } else {
            localStorage.removeItem('accessToken');
            setError('Access Denied — Admin privileges required.');
          }
        } else {
          localStorage.removeItem('accessToken');
          setError('Could not verify profile.');
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        setError(errData.detail || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#ffffff',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: '#eff6ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 16px'
          }}>
            <ShieldCheck size={24} color="#2563eb" />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#111827', margin: '0 0 8px', fontWeight: 700 }}>Admin Login</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>Please enter your credentials</p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            color: '#b91c1c',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} autoComplete="off">
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="email"
                autoComplete="off"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => (e.target.style.borderColor = '#2563eb')}
                onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                placeholder="Enter admin email"
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="password"
                autoComplete="new-password"
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => (e.target.style.borderColor = '#2563eb')}
                onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                placeholder="Enter password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#9ca3af' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
