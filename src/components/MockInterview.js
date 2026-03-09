import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Users, Target, Zap, Award, Info } from 'lucide-react';

const MockInterview = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleBack = () => {
    window.location.href = '/services';
  };

  const programInfo = [
    { label: "Program Type", value: "Interview Preparation" },
    { label: "Mode", value: "Offline Practice" },
    { label: "Location", value: "TechMasters Training Center, Bidar, Karnataka" }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .mock-container {
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

        .mock-content-wrapper {
          padding: 40px 5%;
        }

        .mock-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .mock-header h1 {
          font-size: 2.5rem;
          color: #0f172a;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        .mock-header p {
          font-size: 1.2rem;
          color: #1e40af;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .info-card {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          font-weight: 700;
        }

        .info-value {
          font-size: 1.1rem;
          color: #0f172a;
          font-weight: 600;
        }

        .intro-section {
          background: white;
          padding: 30px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          margin-bottom: 40px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .intro-section h2 {
          font-size: 1.5rem;
          color: #123e72;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .intro-section p {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.8;
        }

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
        }

        .accordion-item.active .accordion-content {
          padding: 0 24px 24px;
          max-height: 1000px;
          transition: all 0.5s ease-in-out;
          border-top: 1px solid #eff6ff;
        }

        .mock-list {
          list-style: none;
          padding: 0;
          margin: 15px 0 0;
        }

        .mock-list li {
          position: relative;
          padding-left: 28px;
          margin-bottom: 12px;
          line-height: 1.6;
          font-size: 1.05rem;
        }

        .mock-list li::before {
          content: '✓';
          color: #10b981;
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .steps-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 15px;
        }

        .step-item {
          display: flex;
          gap: 15px;
        }

        .step-num {
          background: #3b82f6;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .step-content b {
          color: #0f172a;
          display: block;
          margin-bottom: 4px;
        }

        .footer-note {
          text-align: center;
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
        }
      `}</style>
      
      <div className="mock-container">
        
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="mock-content-wrapper">
          
          <div className="mock-header">
            <h1>Mock Interview Practice</h1>
            <p>TechMasters Training Software Private Limited</p>
          </div>

          <div className="info-grid">
            {programInfo.map((info, idx) => (
              <div key={idx} className="info-card">
                <span className="info-label">{info.label}</span>
                <span className="info-value">{info.value}</span>
              </div>
            ))}
          </div>

          <div className="intro-section">
            <h2><Info size={24} /> Introduction</h2>
            <p>
              Mock interviews are practice interview sessions designed to simulate real job interviews.
              These sessions help students understand how technical and HR interviews work in the industry.
            </p>
            <p style={{ marginTop: '15px' }}>
              Through mock interviews, students gain practical experience in answering technical questions,
              explaining their projects, and communicating their ideas clearly.
            </p>
          </div>

          <div className="accordion-wrapper">
            
            {/* Accordion 1 */}
            <div className={`accordion-item ${activeAccordion === 1 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(1)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Target size={20} color="#3b82f6" /> Objectives of Mock Interviews
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 1 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <ul className="mock-list">
                  <li>Prepare students for real job interviews</li>
                  <li>Improve problem solving ability</li>
                  <li>Develop confidence while answering questions</li>
                  <li>Improve communication and explanation skills</li>
                  <li>Understand real interview environments</li>
                </ul>
              </div>
            </div>

            {/* Accordion 2 */}
            <div className={`accordion-item ${activeAccordion === 2 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(2)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Zap size={20} color="#f59e0b" /> How Mock Interview Sessions Work
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 2 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <div className="steps-wrapper">
                  <div className="step-item">
                    <div className="step-num">1</div>
                    <div className="step-content">
                      <b>Interview Preparation</b>
                      Students prepare technical concepts, programming problems, and project explanations before attending the mock interview.
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-num">2</div>
                    <div className="step-content">
                      <b>Interview Session</b>
                      Students attend a simulated interview where questions related to programming and technical concepts are asked.
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-num">3</div>
                    <div className="step-content">
                      <b>Feedback and Improvement</b>
                      After the session, personalized feedback is provided to help students identify areas for improvement.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion 3 */}
            <div className={`accordion-item ${activeAccordion === 3 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(3)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Award size={20} color="#10b981" /> Skills Developed
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 3 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <ul className="mock-list">
                  <li>Technical problem solving under pressure</li>
                  <li>Professional communication during interviews</li>
                  <li>Project explanation and articulation skills</li>
                  <li>Confidence during high-stakes technical discussions</li>
                  <li>Deep understanding of industry interview processes</li>
                </ul>
              </div>
            </div>

            {/* Accordion 4 */}
            <div className={`accordion-item ${activeAccordion === 4 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(4)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Users size={20} color="#8b5cf6" /> Benefits of Mock Interview Practice
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 4 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <ul className="mock-list">
                  <li>Experience real interview situations hands-on</li>
                  <li>Improve confidence significantly before actual company interviews</li>
                  <li>Identify common mistakes and systematically improve performance</li>
                  <li>Prepare effectively for both technical and HR rounds</li>
                </ul>
              </div>
            </div>

          </div>

          <div className="footer-note">
            <p><b>TechMasters Training Software Private Limited</b></p>
            <p>Bidar, Karnataka</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MockInterview;
