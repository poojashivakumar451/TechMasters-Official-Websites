import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, BookOpen, Calculator, LineChart } from 'lucide-react';

const QuantitativeAptitude = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleBack = () => {
    window.location.href = '/services';
  };

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
          margin-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .apt-section h3 {
          font-size: 1.4rem;
          color: #0f172a;
          margin-top: 30px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .apt-section p {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 15px;
        }
        
        .apt-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .apt-card {
          background: white;
          padding: 15px 20px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s;
        }

        .apt-card:hover {
          border-color: #93c5fd;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.1);
          transform: translateY(-2px);
        }

        .apt-number {
          background: #eff6ff;
          color: #2563eb;
          font-weight: 700;
          min-width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        
        .apt-name {
          color: #334155;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .apt-list {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
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

        .accordion-content hr {
          border: 0;
          height: 1px;
          background: #e2e8f0;
          margin: 25px 0;
        }
        
        .resource-box {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
        }
        
        .resource-box h4 {
          color: #166534;
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1.1rem;
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
            <h1>Quantitative Aptitude</h1>
            <p>Quantitative reasoning is the ability to use, interpret, and analyze numerical information and mathematical methods to solve real-world problems. It involves critical thinking, applying concepts like percentages, statistics, and graphs to make logical, data-driven decisions. This skill is essential for analyzing trends, budgeting, and evaluating evidence.</p>
            <p>Mastering Quantitative Aptitude is paramount for competitive exams, campus placements (like TCS, Cognizant, Wipro, Capgemini), and government job interviews.</p>
          </div>

          <div className="apt-section">
            <h2><BookOpen size={24} /> Quantitative Aptitude Syllabus</h2>
            <p>Below is the complete, structured syllabus covering everything you need to master for placement tests.</p>
            
            <h3><Calculator size={20} /> I. ARITHMETICAL ABILITY</h3>
            <div className="apt-grid">
              {[
                "Number System", "H.C.F. and L.C.M. of Numbers", "Decimal Fractions", "Simplification",
                "Square Roots and Cube Roots", "Average", "Problems on Numbers", "Problems on Ages",
                "Surds and Indices", "Logarithm", "Percentage", "Profit and Loss", "Ratio and Proportion",
                "Partnership", "Chain Rule", "Pipes and Cisterns", "Time and Work", "Time and Distance",
                "Boats and Streams", "Problems on Trains", "Alligation or Mixture", "Simple Interest",
                "Compound Interest", "Area", "Volume and Surface Area", "Races and Games of Skill",
                "Calendar", "Clocks", "Stocks and Shares", "Permutations and Combinations",
                "Probability", "True Discount", "Banker's Discount", "Heights and Distances",
                "Odd Man Out and Series"
              ].map((topic, index) => (
                <div className="apt-card" key={index}>
                  <div className="apt-number">{index + 1}</div>
                  <div className="apt-name">{topic}</div>
                </div>
              ))}
            </div>

            <h3><LineChart size={20} /> II. DATA INTERPRETATION</h3>
            <div className="apt-grid">
              {[
                "Tabulation", "Bar Graph", "Line Graph", "Pie Chart", "Mixed Graphs"
              ].map((topic, index) => (
                <div className="apt-card" key={index}>
                  <div className="apt-number">{index + 1}</div>
                  <div className="apt-name">{topic}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="accordion-wrapper">
            
            {/* Accordion 1 */}
            <div className={`accordion-item ${activeAccordion === 1 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(1)}>
                FAQs
                <div className="accordion-icon">
                   {activeAccordion === 1 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                 <br />
                 <h3>How much time is required to prepare Quantitative Aptitude?</h3>
                 <p>With dedicated practice of 2-3 hours daily, a student can comprehensively cover the syllabus and practice quantitative problems within <strong>45 to 60 days</strong>.</p>
                 <hr />

                 <h3>Are calculators allowed during placement aptitude tests?</h3>
                 <p>Usually, <strong>NO</strong>. Some platforms (like the TCS NQT) may provide an on-screen basic calculator, but you should train yourself to calculate manually using shortcuts and approximation techniques.</p>
                 <hr />

                 <h3>What if my mathematical background is weak?</h3>
                 <p>Aptitude math is essentially <strong>up to 10th-grade geometry and arithmetic</strong>. Focus extremely heavily on foundational chapters first—especially Percentages and Ratios—as they form the backbone of nearly all other chapters. Do not rush to advanced topics like Permutations until the core is completely solid.</p>
                 <br />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default QuantitativeAptitude;
