import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

const WiproElite = () => {
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
        .wipro-container {
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

        .wipro-content-wrapper {
          padding: 40px 5%;
        }

        .wipro-header {
          margin-bottom: 40px;
        }

        .wipro-header h1 {
          font-size: 2.5rem;
          color: #0f172a;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .wipro-header p {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .wipro-section {
          margin-bottom: 50px;
        }

        .wipro-section h2 {
          font-size: 1.8rem;
          color: #123e72;
          margin-bottom: 20px;
          border-bottom: 2px solid #eff6ff;
          padding-bottom: 15px;
        }
        
        .wipro-section h3 {
          font-size: 1.3rem;
          color: #0f172a;
          margin-top: 30px;
          margin-bottom: 15px;
        }

        .wipro-section p {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 15px;
        }

        .wipro-list {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }
        
        .wipro-list li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          line-height: 1.6;
          color: #475569;
          font-size: 1.05rem;
        }

        .wipro-list li::before {
          content: '•';
          color: #2563eb;
          position: absolute;
          left: 0;
          font-size: 1.5rem;
          line-height: 1;
        }
        
        .wipro-list-numbered {
          counter-reset: custom-counter;
          list-style: none;
          padding-left: 0;
          margin-bottom: 20px;
        }
        
        .wipro-list-numbered li {
          counter-increment: custom-counter;
          position: relative;
          padding-left: 28px;
          margin-bottom: 12px;
          line-height: 1.6;
          color: #475569;
          font-size: 1.05rem;
        }
        
        .wipro-list-numbered li::before {
          content: counter(custom-counter) ".";
          color: #2563eb;
          font-weight: bold;
          position: absolute;
          left: 0;
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
          max-height: 3000px;
          transition: all 0.5s ease-in-out;
          border-top: 1px solid #eff6ff;
        }
        
        .accordion-content h3 {
          color: #123e72;
          font-size: 1.2rem;
          margin: 25px 0 15px;
        }
        
        .accordion-content h4 {
          color: #0f172a;
           font-size: 1.1rem;
           margin: 20px 0 10px;
        }
        
        .accordion-content h5 {
          color: #1e293b;
          font-size: 1.05rem;
          margin: 15px 0 10px;
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
      
      <div className="wipro-container">
        
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="wipro-content-wrapper">
          
          <div className="wipro-header">
            <h1>Wipro Elite National Talent Hunt</h1>
            <p>Wipro Elite (National Level Talent Hunt - NLTH) is a premier hiring program for engineering freshers to join as Project Engineers, typically offering a package of INR 3.5 LPA.</p>
          </div>

          <div className="wipro-section">
            <h2>Wipro Elite National Talent Hunt Syllabus</h2>
            <p>Below you'll find all the related important topics that are asked in Wipro Elite National Talent Hunt Aptitude Section</p>
            
            <p><strong>More Information:</strong></p>
            <ul className="wipro-list">
              <li><strong>Total Time</strong> - 48 min (shared with logical and verbal)</li>
            </ul>

            <h3>Basic Mathematics</h3>
            <ul className="wipro-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
              <li>LCM & HCF</li>
              <li>Divisibility</li>
              <li>Numbers, decimal fractions and power</li>
              <li>Time & Work</li>
              <li>Pipes and Cisterns</li>
              <li>Averages</li>
              <li>Profit and Loss</li>
              <li>Simple and Compound Interest</li>
            </ul>

            <h3>Applied Mathematics</h3>
            <ul className="wipro-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
              <li>Time, Speed and Distance</li>
              <li>Inverse</li>
              <li>Problems on Trains</li>
              <li>Geometry, Coordinate Geometry</li>
              <li>Clocks & Calendar</li>
              <li>Logarithms</li>
              <li>Permutation and Combinations</li>
              <li>Probability</li>
            </ul>

            <h3>Engineering Mathematics</h3>
            <ul className="wipro-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
              <li>Ratio & Proportion</li>
              <li>Algebra</li>
              <li>Surds & Indices</li>
              <li>Allegations and Mixtures</li>
              <li>Problem on Ages</li>
            </ul>
          </div>

          <div className="accordion-wrapper">
            
            {/* Accordion 1 */}
            <div className={`accordion-item ${activeAccordion === 1 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(1)}>
                Test Eligibility
                <div className="accordion-icon">
                   {activeAccordion === 1 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <p>Wipro Elite National Level Talent Hunt (NLTH) is a recruitment exam conducted by Wipro to hire fresh graduates for entry-level software engineering roles.</p>

                <h3>Educational Qualification</h3>
                <p>Candidates must belong to the following streams:</p>
                <ul className="wipro-list">
                  <li>B.E / B.Tech</li>
                  <li>M.E / M.Tech</li>
                  <li>MCA</li>
                  <li>M.Sc (Computer Science / IT)</li>
                </ul>

                <h3>Academic Requirements</h3>
                <p>Candidates must meet these academic criteria:</p>
                <ul className="wipro-list">
                  <li>Minimum 60% or 6.0 CGPA in 10th, 12th, and Graduation</li>
                  <li>No active backlogs at the time of the selection process</li>
                  <li>Maximum 1 year education gap allowed</li>
                </ul>

                <h3>Year of Passing</h3>
                <p>Candidates graduating in the current academic year are eligible.</p>
                <p><strong>Example:</strong></p>
                <ul className="wipro-list">
                  <li>2025 or 2026 graduating batch (depending on recruitment cycle)</li>
                </ul>

                <h3>Eligible Branches</h3>
                <p>Usually eligible branches include:</p>
                <ul className="wipro-list">
                  <li>Computer Science Engineering (CSE)</li>
                  <li>Information Technology (IT)</li>
                  <li>Electronics & Communication (ECE)</li>
                  <li>Electrical Engineering (EEE)</li>
                  <li>Data Science / AI related branches</li>
                </ul>

                <h3>Additional Requirements</h3>
                <ul className="wipro-list">
                  <li>Candidates must be Indian citizens</li>
                  <li>Must be willing to work in any Wipro office location</li>
                  <li>Should have good communication and problem-solving skills</li>
                </ul>
              </div>
            </div>

            {/* Accordion 2 */}
            <div className={`accordion-item ${activeAccordion === 2 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(2)}>
                Hiring Categories – Nature of work
                <div className="accordion-icon">
                   {activeAccordion === 2 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <p>Wipro Elite typically hires candidates for entry-level technical roles in software development and IT services.</p>

                <h3>1. Project Engineer</h3>
                <p>This is the most common role offered through Wipro Elite.</p>
                <p><strong>Responsibilities include:</strong></p>
                <ul className="wipro-list">
                  <li>Software development</li>
                  <li>Application maintenance</li>
                  <li>Testing and debugging programs</li>
                  <li>Working with different technologies and frameworks</li>
                  <li>Supporting enterprise software solutions</li>
                </ul>

                <h3>Nature of Work</h3>
                <p>Selected candidates may work on:</p>
                <ul className="wipro-list">
                  <li>Web Application Development</li>
                  <li>Cloud Technologies</li>
                  <li>Data Analytics</li>
                  <li>Artificial Intelligence / Machine Learning</li>
                  <li>Software Testing</li>
                  <li>Enterprise IT Solutions</li>
                </ul>

                <h3>Work Environment</h3>
                <p>Employees work in:</p>
                <ul className="wipro-list">
                  <li>Agile development teams</li>
                  <li>Client-based project environments</li>
                  <li>Global delivery centers</li>
                </ul>
                <p>Freshers receive <strong>training before project allocation.</strong></p>
              </div>
            </div>

            {/* Accordion 3 */}
            <div className={`accordion-item ${activeAccordion === 3 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(3)}>
                Test Features & Pattern
                <div className="accordion-icon">
                   {activeAccordion === 3 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <p>The Wipro Elite NLTH exam is an online assessment designed to evaluate analytical, coding, and communication skills.</p>

                <h3>Total Duration</h3>
                <p>Approximately 128 minutes</p>

                <h3>Sections in the Exam</h3>

                <h4>1. Aptitude Test</h4>
                <p>Tests problem-solving and analytical ability. Topics include:</p>
                <ul className="wipro-list">
                  <li>Quantitative Aptitude</li>
                  <li>Logical Reasoning</li>
                  <li>Data Interpretation</li>
                  <li>Basic Mathematics</li>
                </ul>

                <h4>2. Verbal Ability</h4>
                <p>Evaluates English language proficiency. Topics include:</p>
                <ul className="wipro-list">
                  <li>Reading Comprehension</li>
                  <li>Grammar</li>
                  <li>Vocabulary</li>
                  <li>Sentence Correction</li>
                </ul>

                <h4>3. Essay Writing</h4>
                <p>Candidates must write an essay based on a given topic. This section evaluates:</p>
                <ul className="wipro-list">
                  <li>Written communication</li>
                  <li>Clarity of thought</li>
                  <li>Grammar and structure</li>
                </ul>

                <h4>4. Coding Test</h4>
                <p>Candidates must solve 2 programming problems.</p>
                <p>Programming languages allowed:</p>
                <ul className="wipro-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>C</li><li>C++</li><li>Java</li><li>Python</li>
                </ul>
                <p>Coding questions test:</p>
                <ul className="wipro-list">
                  <li>Data structures</li>
                  <li>Algorithms</li>
                  <li>Logical thinking</li>
                  <li>Problem solving</li>
                </ul>

                <h3>Exam Mode</h3>
                <ul className="wipro-list">
                  <li>Conducted online</li>
                  <li>Can be remote proctored or test center based</li>
                </ul>
              </div>
            </div>

            {/* Accordion 4 */}
            <div className={`accordion-item ${activeAccordion === 4 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(4)}>
                FAQs
                <div className="accordion-icon">
                   {activeAccordion === 4 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                 <br />
                 <h3>What is Wipro Elite NLTH?</h3>
                 <p>Wipro Elite NLTH (National Level Talent Hunt) is an online recruitment exam conducted by Wipro to hire fresh graduates for software engineering roles.</p>
                 <hr />

                 <h3>What is the salary offered in Wipro Elite?</h3>
                 <p>The typical salary package for Project Engineer is approximately:</p>
                 <p><strong>₹3.5 LPA to ₹4 LPA</strong></p>
                 <hr />

                 <h3>How many coding questions are asked in Wipro Elite?</h3>
                 <p>Candidates usually receive 2 coding questions in the final section of the test.</p>
                 <hr />

                 <h3>Is there negative marking in Wipro Elite exam?</h3>
                 <p>No, the Wipro Elite exam usually does not have negative marking.</p>
                 <hr />

                 <h3>Which programming languages are allowed in the coding test?</h3>
                 <p>Candidates can choose from:</p>
                 <ul className="wipro-list">
                   <li>C</li>
                   <li>C++</li>
                   <li>Java</li>
                   <li>Python</li>
                 </ul>
                 <hr />

                 <h3>What happens after clearing the Wipro Elite test?</h3>
                 <p>Candidates who clear the online assessment are invited for:</p>
                 <ol className="wipro-list-numbered">
                   <li>Technical Interview</li>
                   <li>HR Interview</li>
                 </ol>
                 <p>Successful candidates receive an offer letter from Wipro.</p>
                 <br />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default WiproElite;
