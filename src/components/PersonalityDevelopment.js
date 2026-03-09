import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, UserCheck, Clock, Users, Smile, Briefcase } from 'lucide-react';

const PersonalityDevelopment = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleBack = () => {
    window.location.href = '/services';
  };

  const coreSkills = [
    { title: "Confidence Building", desc: "Develop unshakable confidence while speaking, presenting, and interacting with senior stakeholders." },
    { title: "Professional Behavior", desc: "Learn essential corporate etiquette, emotional intelligence, and standard workplace behavior." },
    { title: "Time Management", desc: "Manage tasks effectively, prioritize sprint workloads, and meet rigid industry deadlines." },
    { title: "Positive Mindset", desc: "Build a resilient, positive attitude essential for continuous learning and handling project feedback." }
  ];

  const workplaceSkills = [
    { title: "Personal Accountability", desc: "Taking full workplace responsibility and ownership of your assigned modules." },
    { title: "Respectful Communication", desc: "Navigating disagreements and giving constructive technical feedback politely." },
    { title: "Team Collaboration", desc: "Working seamlessly with cross-functional team members and participating actively in scrum discussions." },
    { title: "Clear Ideation", desc: "Structuring your thoughts logically before speaking so ideas are communicated with absolute clarity." }
  ];

  const presentationSkills = [
    { title: "Effective Self Presentation", desc: "Mastering strong eye contact, power postures, body language, and delivering clear, impactful introductions." },
    { title: "Confident Delivery", desc: "Speaking clearly at the right tempo and presenting ideas with undeniable authority and confidence." }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .apt-container {
          max-width: 1200px;
          margin: 0 auto;
          background-color: #ffffff;
          padding-bottom: 60px;
        }

        .back-nav {
          padding: 20px 5%;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .back-btn {
          background: transparent;
          color: #123e72;
          border: 1px solid #cbd5e1;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s;
        }
        
        .back-btn:hover {
          background: #123e72;
          color: white;
          border-color: #123e72;
        }

        .apt-content-wrapper {
          padding: 40px 5%;
        }

        .apt-header {
          margin-bottom: 40px;
        }

        .apt-header h1 {
          font-size: 2.5rem;
          color: #0f172a;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .apt-header p {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .apt-section {
          margin-bottom: 50px;
          background: #f8fafc;
          padding: 30px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .apt-section h2 {
          font-size: 1.8rem;
          color: #123e72;
          margin-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .apt-section .section-desc {
          margin-bottom: 30px;
          color: #64748b;
          font-size: 1.05rem;
        }
        
        .apt-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .apt-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .apt-card:hover {
          border-color: #93c5fd;
          box-shadow: 0 6px 12px -2px rgba(37, 99, 235, 0.1);
          transform: translateY(-3px);
        }

        .apt-card-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .apt-number {
          background: #eff6ff;
          color: #2563eb;
          font-weight: 700;
          min-width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-size: 0.9rem;
          margin-top: 2px;
        }
        
        .apt-name {
          color: #1e293b;
          font-weight: 600;
          font-size: 1.1rem;
          line-height: 1.4;
        }

        .apt-desc {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-left: 40px;
        }

        .apt-list {
          list-style: none;
          padding: 0;
          margin-bottom: 0;
        }
        
        .apt-list li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          line-height: 1.6;
          color: #475569;
          font-size: 1.05rem;
        }

        .apt-list li::before {
          content: '•';
          color: #2563eb;
          position: absolute;
          left: 0;
          font-size: 1.5rem;
          line-height: 1;
        }

        /* Modern Accordion */
        .accordion-wrapper {
          margin-top: 50px;
        }

        .accordion-item {
          background-color: white;
          margin-bottom: 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          transition: all 0.3s;
        }

        .accordion-item:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 10px rgba(0,0,0,0.03);
        }

        .accordion-item.active {
          border-color: #bfdbfe;
          box-shadow: 0 10px 25px -10px rgba(37,99,235,0.15);
        }

        .accordion-header {
          padding: 20px 24px;
          font-size: 1.2rem;
          font-weight: 600;
          color: #0f172a;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s;
          user-select: none;
        }

        .accordion-item.active .accordion-header {
          background-color: #eff6ff;
          color: #1d4ed8;
        }

        .accordion-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #64748b;
          transition: all 0.3s;
        }

        .accordion-item.active .accordion-icon {
          background: #3b82f6;
          color: white;
          transform: rotate(180deg);
        }

        .accordion-content {
          padding: 0 24px;
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0, 1, 0, 1);
          color: #475569;
          background: white;
        }

        .accordion-item.active .accordion-content {
          padding: 0 24px 24px;
          max-height: 2000px;
          transition: all 0.5s ease-in-out;
          border-top: 1px solid #eff6ff;
        }
        
        .accordion-content h3 {
          color: #123e72;
          font-size: 1.2rem;
          margin: 25px 0 15px;
        }
        
        .accordion-content p {
          line-height: 1.7;
          margin-bottom: 15px;
        }
      `}</style>
      
      <div className="apt-container">
        
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="apt-content-wrapper">
          
          <div className="apt-header">
            <h1>Personality Development Training</h1>
            <p><strong>Build Confidence & Professional Skills</strong></p>
            <p>Preparing for success in the tech industry requires significantly more than just technical aptitude. Success relies heavily on building confidence, robust communication abilities, and outstanding professional behavior. Our Personality Development training helps students rapidly improve their attitude and interpersonal skills required for elite corporate workplace environments.</p>
          </div>

          <div className="apt-section">
            <h2><Smile size={26} /> Core Competencies Developed</h2>
            <p className="section-desc">The foundational personality traits necessary to excel in any professional tech ecosystem.</p>
            
            <div className="apt-grid">
              {coreSkills.map((item, index) => (
                <div className="apt-card" key={index}>
                  <div className="apt-card-header">
                     <div className="apt-number" style={{background: '#e0e7ff', color: '#4338ca', border: '1px solid #c7d2fe'}}>{index + 1}</div>
                    <div className="apt-name">{item.title}</div>
                  </div>
                  <div className="apt-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="apt-section">
            <h2><Briefcase size={26} /> Professional Workplace Skills & Etiquette</h2>
            <p className="section-desc">Transforming students from academic mentalities into responsible corporate professionals.</p>
            
            <div className="apt-grid">
              {workplaceSkills.map((item, index) => (
                <div className="apt-card" key={index}>
                  <div className="apt-card-header">
                     <div className="apt-number" style={{background: '#fcf6bd', color: '#d97706', border: '1px solid #fde68a'}}>{index + 1}</div>
                    <div className="apt-name">{item.title}</div>
                  </div>
                  <div className="apt-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="apt-section">
            <h2><UserCheck size={26} /> Self Presentation & Body Language</h2>
            <p className="section-desc">The silent communicators that ultimately dictate your first impression.</p>
            
            <div className="apt-grid">
              {presentationSkills.map((item, index) => (
                <div className="apt-card" key={index}>
                  <div className="apt-card-header">
                     <div className="apt-number" style={{background: '#fce7f3', color: '#be185d', border: '1px solid #fbcfe8'}}>{index + 1}</div>
                    <div className="apt-name">{item.title}</div>
                  </div>
                  <div className="apt-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="accordion-wrapper">
            
            {/* Accordion 1 */}
            <div className={`accordion-item ${activeAccordion === 1 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(1)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Users size={20} /> Training Activities
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 1 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <p>We believe personality is shaped through experience, not lectures. Our active learning pipeline includes:</p>
                <ul className="apt-list">
                  <li><strong>Interactive Exercises:</strong> Roleplaying stressful workplace scenarios and conflict resolution.</li>
                  <li><strong>Group Discussions:</strong> Learning how to dominate a room's logic without appearing aggressive.</li>
                  <li><strong>Practice Sessions:</strong> Repeated exposure to public speaking and immediate peer review.</li>
                  <li><strong>Trainer Feedback:</strong> Micro-level adjustment of your posture, vocal tonality, and eye movements.</li>
                </ul>
              </div>
            </div>

            {/* Accordion 2 */}
            <div className={`accordion-item ${activeAccordion === 2 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(2)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={20} /> Your Success Outcome
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 2 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <p>Upon completing this comprehensive development program, candidates will have inherently adopted:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                   <div>
                      <ul className="apt-list">
                        <li>Radically increased public confidence</li>
                        <li>An automatic, professional workplace behavior reflex</li>
                      </ul>
                   </div>
                   <div>
                      <ul className="apt-list">
                        <li>Vastly better communication fluidity</li>
                        <li>Polished, executive-level self presentation</li>
                      </ul>
                   </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PersonalityDevelopment;
