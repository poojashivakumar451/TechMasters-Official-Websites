import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
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
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="contact-list">
              <li>
                <MapPin size={18} className="c-icon"/>
                <span>Techmasters Software Pvt Ltd, Bidar, Karnataka.</span>
              </li>
              <li>
                <Phone size={18} className="c-icon"/>
                <span>+91 9880768222, +91 9019323654</span>
              </li>
              <li>
                <Mail size={18} className="c-icon"/>
                <span>techmasterstrainings@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Techmasters Trainings Pvt Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
