import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, X, Copy, Check } from 'lucide-react';
import './Footer.css';

const PhoneModal = ({ onClose }) => {
  const [copied, setCopied] = useState(null);

  const phones = [
    { label: 'Primary', number: '+91 9880768222', tel: 'tel:+919880768222' },
    { label: 'Secondary', number: '+91 9019323654', tel: 'tel:+919019323654' },
  ];

  const handleCopy = (number, index) => {
    navigator.clipboard.writeText(number);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="phone-modal-overlay" onClick={onClose}>
      <div className="phone-modal" onClick={(e) => e.stopPropagation()}>
        <button className="phone-modal-close" onClick={onClose}>
          <X size={18} />
        </button>
        <div className="phone-modal-icon">
          <Phone size={28} />
        </div>
        <h3 className="phone-modal-title">Call TechMasters</h3>
        <p className="phone-modal-subtitle">Choose a number to call or copy it</p>
        <div className="phone-modal-numbers">
          {phones.map((p, i) => (
            <div key={i} className="phone-modal-row">
              <div className="phone-modal-info">
                <span className="phone-label">{p.label}</span>
                <span className="phone-number">{p.number}</span>
              </div>
              <div className="phone-modal-actions">
                <a href={p.tel} className="phone-call-btn" onClick={onClose}>
                  <Phone size={15} /> Call
                </a>
                <button className="phone-copy-btn" onClick={() => handleCopy(p.number, i)}>
                  {copied === i ? <Check size={15} /> : <Copy size={15} />}
                  {copied === i ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="phone-modal-note">
          💡 On desktop, clicking <strong>Call</strong> opens your default calling app (Skype, WhatsApp etc.)
        </p>
      </div>
    </div>
  );
};

const Footer = () => {
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const handlePhoneClick = (e) => {
    // On mobile devices – let tel: link work naturally
    // On desktop – show the modal popup
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      setShowPhoneModal(true);
    }
  };

  return (
    <>
      {showPhoneModal && <PhoneModal onClose={() => setShowPhoneModal(false)} />}

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-container">
            <div className="footer-col brand-col">
              <div className="footer-logo">
                <img src="/logo.jpg" alt="TechMasters Logo" className="footer-logo-img" />
              </div>
              <p className="footer-about">
                Empowering students and professionals with industry-standard tech education. Build your future with our specialized training programs.
              </p>
              <div className="social-links">
                <a href="#" className="social-icon"><Facebook size={18} /></a>
                <a href="#" className="social-icon"><Twitter size={18} /></a>
                <a href="#" className="social-icon"><Linkedin size={18} /></a>
                <a href="#" className="social-icon"><Instagram size={18} /></a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About Us</NavLink></li>
                <li><NavLink to="/services">Services</NavLink></li>
                <li><NavLink to="/courses">Courses</NavLink></li>
                <li><NavLink to="/academy">Academy</NavLink></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li><NavLink to="/enroll">Enroll Now</NavLink></li>
                <li><NavLink to="/gallery">Gallery</NavLink></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Contact Info</h4>
              <ul className="contact-list">
                <li>
                  <a
                    href="https://www.google.com/maps/search/Techmasters+Software+Pvt+Ltd/@17.9104,76.8235,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <MapPin size={18} className="c-icon"/>
                    <span>Techmasters Software Pvt Ltd, Bidar, Karnataka.</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919880768222"
                    className="contact-link"
                    onClick={handlePhoneClick}
                  >
                    <Phone size={18} className="c-icon"/>
                    <span>+91 9880768222, +91 9019323654</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:techmasterstrainings@gmail.com" className="contact-link">
                    <Mail size={18} className="c-icon"/>
                    <span>techmasterstrainings@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Techmasters Trainings Pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
