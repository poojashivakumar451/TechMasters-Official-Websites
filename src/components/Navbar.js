import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Layout, LogIn } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAdminLoggedIn = localStorage.getItem('isAdminAuthenticated') === 'true';
  const isStudentLoggedIn = !!localStorage.getItem('accessToken') && !isAdminLoggedIn;

  const handleAdminLogin = () => {
    if (isAdminLoggedIn) {
      navigate('/dashboard');
      return;
    }
    const pin = prompt("Please enter Admin Access PIN (Standard: 102023):");
    if (pin === "102023") {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      alert("Invalid Enrollment PIN. Access Denied.");
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Gallery', path: '/gallery' }
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="navbar-container">
        <NavLink to="/" className="nav-logo">
          <img src="/logo.jpg" alt="TechMasters Logo" className="navbar-logo-img" />
          <span className="logo-text">Techmasters Trainings</span>
        </NavLink>

        <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          
          <div className="nav-actions">
            {!isAdminLoggedIn && !isStudentLoggedIn && (
              <>
                <button className="login-btn" onClick={handleAdminLogin}>
                   <LogIn size={18} /> Admin Console
                </button>
                <NavLink to="/login" className="login-btn">
                   Student Login
                </NavLink>
              </>
            )}

            {isAdminLoggedIn && (
              <button className="login-btn" onClick={() => navigate('/dashboard')}>
                 <Layout size={18} /> Admin Console
              </button>
            )}

            {isStudentLoggedIn && (
              <button className="login-btn" onClick={() => navigate('/student-dashboard')}>
                 <Layout size={18} /> Dashboard
              </button>
            )}
            
            <NavLink to="/enroll" className="btn-enroll">
              Enroll <ChevronRight size={18} />
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
