import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, X, Copy, Check } from 'lucide-react';
import './Footer.css';

/* WhatsApp SVG Icon */
const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PhoneModal = ({ onClose }) => {
  const [copied, setCopied] = useState(null);

  const phones = [
    { label: 'Primary', number: '+91 9880768222', tel: 'tel:+919880768222' },
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

  const phones = [
    { number: '+91 9880768222', tel: 'tel:+919880768222', wa: 'https://wa.me/919880768222?text=Hello%20TechMasters!%20I%20would%20like%20to%20know%20more%20about%20your%20courses.' },
  ];

  return (
    <>
      {showPhoneModal && <PhoneModal onClose={() => setShowPhoneModal(false)} />}

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-container">
            <div className="footer-col brand-col">

              <p className="footer-about">
                Empowering students and professionals with industry-standard tech education. Build your future with our specialized training programs.
              </p>
              <div className="social-links">
                <a href="https://www.instagram.com/techmasters_it?igsh=em92MmRvYmdneXY1" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={18} /></a>
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
                <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
                <li><NavLink to="/terms">Terms &amp; Conditions</NavLink></li>
                <li><NavLink to="/faq">FAQ</NavLink></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Contact Info</h4>
              <ul className="contact-list">
                <li>
                  <a
                    href="https://maps.app.goo.gl/irdhH2mw4jimE9Yn9?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    <MapPin size={18} className="c-icon"/>
                    <span>Techmasters Software Pvt Ltd, Bidar, Karnataka.</span>
                  </a>
                </li>
                {phones.map((p, i) => (
                  <li key={i}>
                    <a
                      href={p.tel}
                      className="contact-link"
                      onClick={handlePhoneClick}
                    >
                      <Phone size={18} className={`c-icon ${i > 0 ? 'c-icon-hidden' : ''}`}/>
                      <span>{p.number}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href="mailto:techmasterstrainings@gmail.com" className="contact-link">
                    <Mail size={18} className="c-icon"/>
                    <span>techmasterstrainings@gmail.com</span>
                  </a>
                </li>
              </ul>

              {/* WhatsApp Section */}
              <div className="wa-section">
                <h5 className="wa-heading">
                  <WhatsAppIcon size={16} />
                  Chat on WhatsApp
                </h5>
                <div className="wa-numbers">
                  {phones.map((p, i) => (
                    <a
                      key={i}
                      href={p.wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wa-btn"
                    >
                      <WhatsAppIcon size={16} />
                      <span>{p.number}</span>
                    </a>
                  ))}
                </div>
              </div>
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
