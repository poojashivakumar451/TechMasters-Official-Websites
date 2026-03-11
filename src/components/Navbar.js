import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Admin', path: '/admin' }
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
            <NavLink to="/enroll" className="btn-enroll">
              Enroll Now <ChevronRight size={18} />
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
