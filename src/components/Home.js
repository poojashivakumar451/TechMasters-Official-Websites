import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle, Code, Briefcase, Award } from 'lucide-react';
import gsap from 'gsap';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo('.hero-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  }, []);

  return (
    <div className="home-wrapper fade-in">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="mesh-bg"></div>
        <div className="hero-container">
          <div className="hero-left">
            <div className="hero-badge-alt">BATCH 2025-26 — ENROLLMENT OPEN</div>
            <h1 className="hero-title-alt">
              Empowering Future <span className="text-blue">Technology Leaders</span>
            </h1>
            <p className="hero-desc-alt">
              Elevate your career with the most advanced, industry-driven training in the region. Bridge the gap between theory and high-performance engineering.
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
                <div className="card-label">Industrial R&D</div>
              </div>
              <div className="hero-img-card">
                <img src="/gallery-3.jpg" alt="Mentor Led" />
                <div className="card-label">Elite Mentorship</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Partners Strip */}
      <section className="trust-strip">
        <div className="page-container">
          <p className="trust-label">OUR ALUMNI WORK AT LEADING INNOVATORS</p>
          <div className="logo-grid-alt">
            <div className="logo-placeholder">GOOGLE</div>
            <div className="logo-placeholder">MICROSOFT</div>
            <div className="logo-placeholder">AMAZON</div>
            <div className="logo-placeholder">META</div>
            <div className="logo-placeholder">TCS</div>
            <div className="logo-placeholder">INFOSYS</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="page-container stats-grid">
          <div className="stat-card">
            <span className="stat-number">10K+</span>
            <span className="stat-desc">Alumni Globally</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">95%</span>
            <span className="stat-desc">Placement Success</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">150+</span>
            <span className="stat-desc">Hiring Partners</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">25+</span>
            <span className="stat-desc">Elite Programs</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="page-container features-section">
        <div className="section-header">
          <h2 className="section-title">Beyond Traditional Learning</h2>
          <p className="section-subtitle">We don't just teach code; we engineer professional mindsets ready for the global software industry.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Code size={28} /></div>
            <h3>Production Standards</h3>
            <p>Master CI/CD, unit testing, and scalable architecture pattern utilized by top-tier engineering firms.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Briefcase size={28} /></div>
            <h3>Project Portfolios</h3>
            <p>Build real-world assets. Our students deploy production-ready apps that impress recruiters instantly.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Award size={28} /></div>
            <h3>Strategic Placement</h3>
            <p>Access our exclusive network of 150+ partners with dedicated mock interview and resume workshops.</p>
          </div>
        </div>
      </section>

      {/* Tech Stack Strip - Knowledgeable Content */}
      <section className="tech-stack-section">
        <div className="page-container">
          <h3 className="sub-heading">MASTER THE MODERN TECH STACK</h3>
          <div className="tech-icons-row">
            <div className="tech-tag">React.js</div>
            <div className="tech-tag">Node.js</div>
            <div className="tech-tag">Python</div>
            <div className="tech-tag">Java</div>
            <div className="tech-tag">AWS</div>
            <div className="tech-tag">Docker</div>
            <div className="tech-tag">Kubernetes</div>
            <div className="tech-tag">TensorFlow</div>
          </div>
        </div>
      </section>

      {/* Discount Banner */}
      <section className="discount-banner">
        <div className="page-container flex-discount">
          <div className="discount-content">
            <span className="badge-new">Strategic Enrollment</span>
            <h2>Secure Your Seat with <span className="text-highlight">10% DISCOUNT</span></h2>
            <p>Invest in your future. Join the elite cohort for 2025-26 and transform your technical career path.</p>
          </div>
          <NavLink to="/enroll" className="btn-discount">Get Early Access <ArrowRight size={18}/></NavLink>
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
              <li>C & C++ Mastery</li>
              <li>Java Fundamentals</li>
              <li>Python Core / OOPs</li>
              <li>SQL & Database Basics</li>
            </ul>
          </div>
          <div className="eco-card">
            <h3>Advanced Programming</h3>
            <ul className="eco-list">
              <li>DSA (LeetCode Patterns)</li>
              <li>Spring Boot & Hibernate</li>
              <li>Flask & Django Frameworks</li>
              <li>RESTful API Design</li>
            </ul>
          </div>
          <div className="eco-card">
            <h3>Full Stack & Cloud</h3>
            <ul className="eco-list">
              <li>MERN Stack Mastery</li>
              <li>AWS & Azure Essentials</li>
              <li>Docker & Kubernetes</li>
              <li>CI/CD Pipelines</li>
            </ul>
          </div>
          <div className="eco-card">
            <h3>AI & Data Science</h3>
            <ul className="eco-list">
              <li>Machine Learning models</li>
              <li>Natural Language Processing</li>
              <li>Pandas & NumPy Analysis</li>
              <li>Deep Learning / Neural Nets</li>
            </ul>
          </div>
        </div>

        <div className="expertise-strip">
          <div className="expertise-item">EXPERT PREP:</div>
          <div className="expertise-item">TCS NQT</div>
          <div className="expertise-item">TCS CODEVITA</div>
          <div className="expertise-item">CAPGEMINI EXCELLER</div>
          <div className="expertise-item">COGNIZANT</div>
          <div className="expertise-item">WIPRO ELITE</div>
        </div>
      </section>

      {/* Industry Insights - Knowledgeable Section */}
      <section className="insight-section">
        <div className="page-container flex-insight">
          <div className="insight-image">
             <div className="glass-card-insight">
                <div className="insight-badge">KNOWLEDGE HUB</div>
                <h4>The 2026 Skills Gap</h4>
                <p>Industry data shows a 45% increase in demand for Engineers who master both <strong>DevOps</strong> and <strong>AI Integration</strong>.</p>
                <div className="insight-line"></div>
                <ul className="learning-tips">
                  <li>Mastering State Management</li>
                  <li>Efficient API Design</li>
                  <li>Cloud Native Architectures</li>
                </ul>
             </div>
          </div>
          <div className="insight-text">
            <h2 className="section-title" style={{textAlign: 'left'}}>Career Strategic Insights</h2>
            <p className="insight-para">Our training methodology is built on <strong>Three Pillars of Excellence</strong> that ensure our students are not just applicants, but top-priority candidates.</p>
            
            <div className="pillar-row">
              <div className="pillar">
                <div className="pillar-num">01</div>
                <div>
                  <h4>Technical Depth</h4>
                  <p>Mastering core syntax isn't enough. We dive deep into engine internals and performance tuning.</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-num">02</div>
                <div>
                  <h4>System Design</h4>
                  <p>Learn to think at scale. Our curriculum includes Distributed Systems and Microservices patterns.</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-num">03</div>
                <div>
                  <h4>Professional Ethics</h4>
                  <p>Understand Agile, Code Reviews, and the soft skills required to lead engineering teams.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pathway Section */}
      <section className="pathway-section">
        <div className="page-container flex-pathway">
          <div className="pathway-text">
            <h2>Your Elite Career Pipeline</h2>
            <p className="pathway-desc">We operate as a high-performance training ground. Our 4-stage pipeline is designed for maximum career impact.</p>
            
            <ul className="pathway-list">
              <li><CheckCircle size={20} className="check-icon"/> <span><strong>Selection:</strong> Rigorous screening to ensure dedicated cohorts.</span></li>
              <li><CheckCircle size={20} className="check-icon"/> <span><strong>immersion:</strong> 600+ hours of lab-driven intensive development.</span></li>
              <li><CheckCircle size={20} className="check-icon"/> <span><strong>Validation:</strong> Industry-standard code reviews and testing.</span></li>
              <li><CheckCircle size={20} className="check-icon"/> <span><strong>Deployment:</strong> Strategic placement within our corporate ecosystem.</span></li>
            </ul>
            
            <NavLink to="/enroll" className="btn-primary" style={{marginTop: '2rem'}}>
              Join The Pipeline <ChevronRight size={18} />
            </NavLink>
          </div>
          <div className="pathway-image-placeholder">
            <div className="glass-shape shape-1"></div>
            <div className="glass-shape shape-2"></div>
            <div className="mockup-screen">
              <div className="window-dots"><span></span><span></span><span></span></div>
              <div className="code-lines">
                <div className="cl" style={{width: '60%'}}></div>
                <div className="cl cl-blue" style={{width: '80%'}}></div>
                <div className="cl" style={{width: '40%'}}></div>
                <div className="cl" style={{width: '90%'}}></div>
                <div className="cl cl-blue" style={{width: '70%'}}></div>
              </div>
              <div className="success-badge-mockup">PIPELINE ACTIVE</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
