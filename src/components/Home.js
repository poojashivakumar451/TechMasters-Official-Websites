import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle, Code, Briefcase, Award } from 'lucide-react';
import gsap from 'gsap';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Restoring GSAP animations as per previous version
    const tl = gsap.timeline();
    tl.fromTo('.hero-badge-alt', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo('.hero-title-alt', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-desc-alt', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo('.hero-actions-alt', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  }, []);

  return (
    <div className="home-wrapper fade-in">
      {/* Hero Section - Restored to Previous Stable Design */}
      <section className="hero-section" ref={heroRef}>
        <div className="mesh-bg"></div>
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-badge-alt">BATCH 2025-26 — REGISTRATIONS OPEN</div>
            <h1 className="hero-title-alt">
              Empowering Future <span className="text-blue">Technology Leaders</span>
            </h1>
            <p className="hero-desc-alt">
              Empower your career with industry-driven training from Techmaster Software Private Limited. We bridge the gap between academic learning and industry expectations.
            </p>
            <div className="hero-actions-alt">
              <NavLink to="/courses" className="btn-dark">
                Explore Programs &rarr;
              </NavLink>
              <NavLink to="/enroll" className="btn-stories">
                Enroll Now
              </NavLink>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="hero-images-grid">
              <div className="hero-img-card">
                <img src="/gallery-1.jpg" alt="Live Projects" />
                <div className="card-label">Live Projects</div>
              </div>
              <div className="hero-img-card">
                <img src="/gallery-3.jpg" alt="Mentor Led" />
                <div className="card-label">Mentor Led</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="page-container features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Techmaster?</h2>
          <p className="section-subtitle">We don't just teach code; we build professional software engineers ready for the modern tech ecosystem.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Code size={28} /></div>
            <h3>Industry Curriculum</h3>
            <p>Our syllabus is continuously updated to match the demands of top tech companies globally.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Briefcase size={28} /></div>
            <h3>Real-Time Projects</h3>
            <p>Build an impressive portfolio by working on scalable, real-world application architectures.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Award size={28} /></div>
            <h3>Expert Mentors</h3>
            <p>Learn directly from professionals who have built enterprise software and understand production standards.</p>
          </div>
        </div>
      </section>

      {/* Discount Banner - Stylized Version (Image 1) */}
      <section className="discount-banner">
        <div className="flex-discount">
          <div className="discount-content">
            <span className="badge-new">Limited Time Offer</span>
            <h2>Get <span className="text-highlight">10% DISCOUNT</span> on Early Registrations!</h2>
            <p>Start your journey with Techmasters Trainings and transform your career today.</p>
          </div>
          <NavLink to="/enroll" className="btn-discount">Register Now <ArrowRight size={18}/></NavLink>
        </div>
      </section>

      {/* Training Ecosystem Section */}
      <section className="page-container ecosystem-section">
        <div className="section-header">
          <h2 className="section-title">Comprehensive Training Ecosystem</h2>
          <p className="section-subtitle">A structured learning path designed to take you from fundamentals to advanced industry standards.</p>
        </div>

        <div className="ecosystem-grid">
          <div className="eco-card">
            <h3>Basic Programming</h3>
            <ul className="eco-list">
              <li>C &amp; C++ Mastery</li>
              <li>Java Fundamentals</li>
              <li>Python Core / OOPs</li>
              <li>SQL &amp; Database Basics</li>
            </ul>
          </div>
          <div className="eco-card">
            <h3>Advanced Programming</h3>
            <ul className="eco-list">
              <li>DSA (LeetCode Patterns)</li>
              <li>Spring Boot &amp; Hibernate</li>
              <li>Flask &amp; Django Frameworks</li>
              <li>RESTful API Design</li>
            </ul>
          </div>
          <div className="eco-card">
            <h3>Full Stack &amp; Cloud</h3>
            <ul className="eco-list">
              <li>MERN Stack Mastery</li>
              <li>AWS &amp; Azure Essentials</li>
              <li>Docker &amp; Kubernetes</li>
              <li>CI/CD Pipelines</li>
            </ul>
          </div>
          <div className="eco-card">
            <h3>AI &amp; Data Science</h3>
            <ul className="eco-list">
              <li>Machine Learning models</li>
              <li>Natural Language Processing</li>
              <li>Pandas &amp; NumPy Analysis</li>
              <li>Deep Learning / Neural Nets</li>
            </ul>
          </div>
        </div>

        <div className="expertise-strip">
          <div className="expertise-item">EXPERT PREP: TCS NQT, TCS CODEVITA, CAPGEMINI EXCELLER, COGNIZANT, WIPRO ELITE</div>
        </div>
      </section>

      {/* Pathway Section */}
      <section className="pathway-section">
        <div className="page-container flex-pathway">
          <div className="pathway-text">
            <h2>Your Pathway to Success</h2>
            <p className="pathway-desc">Follow our structured approach to go from a beginner to a seasoned professional developer.</p>
            
            <ul className="pathway-list">
              <li><CheckCircle size={20} className="check-icon"/> <span>Identify your interest &amp; enroll in a specialized course.</span></li>
              <li><CheckCircle size={20} className="check-icon"/> <span>Learn through hands-on sessions and interactive modules.</span></li>
              <li><CheckCircle size={20} className="check-icon"/> <span>Build 8+ production-ready projects for your portfolio.</span></li>
              <li><CheckCircle size={20} className="check-icon"/> <span>Receive interview prep and dedicated placement assistance.</span></li>
            </ul>
            
            <NavLink to="/enroll" className="btn-primary" style={{marginTop: '2rem'}}>
              Start Your Journey <ChevronRight size={18} />
            </NavLink>
          </div>
          <div className="pathway-image-placeholder">
            <div className="glass-shape shape-1"></div>
            <div className="glass-shape shape-2"></div>
            <div className="pathway-img-card">
              <img src="/gallery-2.jpg" alt="Student Success" />
              <div className="pathway-img-overlay">
                <span className="pathway-img-label">Our Students in Action</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
