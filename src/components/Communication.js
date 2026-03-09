import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, MessageSquare, Users, Presentation, CheckCircle, Briefcase } from 'lucide-react';

const Communication = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleBack = () => {
    window.location.href = '/services';
  };

  const typesOfCommunication = [
    { title: "Verbal Communication", desc: "Speaking clearly during meetings, interviews, and discussions." },
    { title: "Non-Verbal Communication", desc: "Using body language, appropriate eye contact, and gestures." },
    { title: "Written Communication", desc: "Writing professional emails, documentation, and technical reports." },
    { title: "Active Listening", desc: "Paying full attention, understanding, responding, and remembering what is being said." }
  ];

  const industrySituations = [
    { title: "Team Meetings", desc: "Discussing progress, blockers, and coordinating agile work." },
    { title: "Project Discussions", desc: "Explaining system design decisions and proposed software solutions." },
    { title: "Client Communication", desc: "Understanding project requirements and delivering sprint updates." },
    { title: "Technical Presentations", desc: "Explaining systems, tech-stacks, tools, and algorithms to stakeholders." }
  ];

  const trainingActivities = [
    { title: "Group Discussions", desc: "Students participate in moderated group conversations to improve speaking confidence." },
    { title: "Presentation Practice", desc: "Students present technical topics to improve public speaking ability and articulation." },
    { title: "Technical Explanation", desc: "Students are tasked with explaining their coding logic or project concepts simply." },
    { title: "Interactive Exercises", desc: "Role-playing activities designed to simulate real-world corporate communication." }
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

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          background: white;
          padding: 25px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
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

        .accordion-content hr {
          border: 0;
          height: 1px;
          background: #e2e8f0;
          margin: 25px 0;
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
            <h1>Communication Skills Training</h1>
            <p>Communication skills play an enormously important role in the modern technology industry. Developers, engineers, and IT professionals must clearly explain ideas, participate in discussions, and collaborate with teams while working on software projects effortlessly.</p>
            <p>Strong communication skills help professionals express technical concepts without ambiguity, share crucial knowledge, and work seamlessly in team environments.</p>
          </div>

          <div className="apt-section">
            <h2><MessageSquare size={26} /> Types of Communication</h2>
            <p className="section-desc">We cover all core facets of communication required to thrive in a professional corporate environment.</p>
            
            <div className="apt-grid">
              {typesOfCommunication.map((item, index) => (
                <div className="apt-card" key={index}>
                  <div className="apt-card-header">
                    <div className="apt-number">{index + 1}</div>
                    <div className="apt-name">{item.title}</div>
                  </div>
                  <div className="apt-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="apt-section">
            <h2><Briefcase size={26} /> Communication in the Tech Industry</h2>
            <p className="section-desc">Real-world scenarios where precise articulation and listening are critical.</p>
            
            <div className="apt-grid">
              {industrySituations.map((item, index) => (
                <div className="apt-card" key={index}>
                  <div className="apt-card-header">
                     <div className="apt-number" style={{background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0'}}>{index + 1}</div>
                    <div className="apt-name">{item.title}</div>
                  </div>
                  <div className="apt-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="apt-section">
            <h2><Presentation size={26} /> Training Activities & Outcomes</h2>
            <p className="section-desc">Interactive engagement designed to organically foster confidence and vocabulary.</p>
            
            <div className="apt-grid">
              {trainingActivities.map((item, index) => (
                <div className="apt-card" key={index}>
                  <div className="apt-card-header">
                     <div className="apt-number" style={{background: '#fff1f2', color: '#e11d48'}}>{index + 1}</div>
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
                  <Users size={20} /> Skills Students Develop
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 1 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <div className="skills-grid">
                  <div>
                    <ul className="apt-list">
                      <li>Clear speaking and precise enunciation</li>
                      <li>Active listening and empathy</li>
                      <li>Confidence in spontaneous conversations</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="apt-list">
                      <li>Maintaining a professional tone</li>
                      <li>Explaining complex technical ideas simply</li>
                      <li>Participating and leading group discussions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion 2 */}
            <div className={`accordion-item ${activeAccordion === 2 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(2)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} /> Final Learning Outcomes
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 2 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <p>Upon completing the TechMasters communication modules, candidates will demonstrably show:</p>
                <ul className="apt-list">
                  <li><strong>Improved Speaking Confidence:</strong> Eliminating hesitation and anxiety when addressing superiors or groups.</li>
                  <li><strong>Clear Explanation of Technical Ideas:</strong> The ability to translate code architecture into plain business language.</li>
                  <li><strong>Better Teamwork Communication:</strong> Integrating with agile teams smoothly, giving and receiving constructive feedback.</li>
                  <li><strong>Professional Habits:</strong> Utilizing the correct channels, maintaining email etiquette, and possessing a reliable, strong corporate presence.</li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Communication;
