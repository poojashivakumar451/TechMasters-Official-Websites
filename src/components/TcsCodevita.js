import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

const TcsCodevita = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  const handleBack = () => {
    window.location.href = '/services';
  };

  return (
    <div className="page-container fade-in">
      <style>{`
        .tcs-container {
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

        .tcs-content-wrapper {
          padding: 40px 5%;
        }

        .tcs-header {
          margin-bottom: 40px;
        }

        .tcs-header h1 {
          font-size: 2.5rem;
          color: #0f172a;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .tcs-header p {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .tcs-table-container {
          width: 100%;
          margin: 30px 0 50px;
          overflow-x: auto;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .tcs-table {
          width: 100%;
          border-collapse: collapse;
          text-align: center;
          background: white;
        }

        .tcs-table th, .tcs-table td {
          border: 1px solid #e2e8f0;
          padding: 16px 20px;
          font-size: 0.95rem;
        }

        .tcs-table thead th {
          background-color: #f8fafc;
          font-weight: 700;
          color: #0f172a;
        }

        .tcs-table tbody tr {
          transition: background-color 0.2s;
        }

        .tcs-table tbody tr:hover {
          background-color: #eff6ff;
        }

        .tcs-section {
          margin-bottom: 50px;
        }

        .tcs-section h2 {
          font-size: 1.8rem;
          color: #123e72;
          margin-bottom: 20px;
          border-bottom: 2px solid #eff6ff;
          padding-bottom: 15px;
        }
        
        .tcs-section h3 {
          font-size: 1.3rem;
          color: #0f172a;
          margin-top: 30px;
          margin-bottom: 15px;
        }

        .tcs-section p {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 15px;
        }

        .tcs-list {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }
        
        .tcs-list li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          line-height: 1.6;
          color: #475569;
          font-size: 1.05rem;
        }

        .tcs-list li::before {
          content: '•';
          color: #2563eb;
          position: absolute;
          left: 0;
          font-size: 1.5rem;
          line-height: 1;
        }

        /* Modern Accordion */
        .accordion-wrapper {
          margin-top: 40px;
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
          margin: 20px 0 10px;
        }
        
        .accordion-content h4 {
          color: #0f172a;
          font-size: 1.05rem;
          margin: 15px 0 10px;
        }
        
        .accordion-content p {
          line-height: 1.7;
          margin-bottom: 15px;
        }
      `}</style>
      
      <div className="tcs-container">
        
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="tcs-content-wrapper">
          
          <div className="tcs-header">
            <h1>TCS CODEVITA</h1>
            <p>TCS is one of the largest Indian companies by market capitalization ($80 billion). TCS is now placed among the ‘Big 4’ most valuable IT services brands worldwide. TCS alone generates 70% dividends of its parent company, Tata Sons. In 2015, TCS is ranked 66th overall in the Forbes World’s Most Innovative Companies ranking, making it both the highest-ranked IT services company and the top Indian company. It is the world’s 10th largest IT services provider by revenue. As of December 2015, it is ranked 10th on the Fortune India 500 list.</p>
            <p>CodeVita is organized by TCS every year in which any graduate students can participate and give their best. It is used to promote competitive programming and grow your programming skills. Also, top rankers get the opportunity to interview with TCS for job offers. First CodeVita was organized in 2012 in India to spread awareness about competitive coding and various applications of coding.</p>
          </div>

          <div className="tcs-section">
            <h2>Why participate in CodeVita?</h2>
            <ul className="tcs-list">
              <li>You will get a Global Ranking which will boost weightage in your resume.</li>
              <li>Top 3 Rankers will get a chance to win USD 20,000.</li>
              <li>Participation certificate for those who qualify first round (Qualifier Round).</li>
              <li>Job opportunity with world's number one organization (As per 2021 listing) TCS.</li>
            </ul>
          </div>

          <div className="tcs-section">
            <h2>CodeVita Rounds</h2>
            <div className="tcs-table-container">
              <table className="tcs-table">
                <thead>
                  <tr>
                    <th>Rounds</th>
                    <th>Name of the Round</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Round 1</td>
                    <td>Pre-Qualifier</td>
                  </tr>
                  <tr>
                    <td>Round 2</td>
                    <td>Qualifier</td>
                  </tr>
                  <tr>
                    <td>Round 3</td>
                    <td>Finale</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Round 1 (Pre-Qualifier):</h3>
            <ul className="tcs-list">
              <li>You have a 6 hours online coding challenge.</li>
              <li>It should be completed within 24-hours at your comfort times.</li>
              <li>If you qualify this round with a good rank there are high chances to get an interview map with TCS.</li>
            </ul>

            <h3>Round 2 (Qualifier):</h3>
            <ul className="tcs-list">
              <li>Shortlisted students from Round 1 will get a chance to attend Round 2.</li>
              <li>You will get 6 hours to complete questions but this time questions will be more difficult than round 1.</li>
              <li>The benefit of getting a good rank in this round is a good hike and a chance to get allocated in the latest technology projects.</li>
            </ul>

            <h3>Round 3 (Finale):</h3>
            <ul className="tcs-list">
              <li>You will get an invitation to any one of the TCS Campuses for this round. For participants who are from a country outside of India, their expenses are covered by TCS.</li>
              <li>Top 3 Rankers will get a chance to win USD 20,000.</li>
            </ul>

            <h3>How to clear CodeVita?</h3>
            <ul className="tcs-list">
              <li>You should have strong data structures and problem-solving skills.</li>
              <li>Good speed in writing code.</li>
              <li>Come up with brute force and optimized solutions.</li>
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
                <p>TCS CodeVita is open to students who are currently pursuing or have recently completed their undergraduate or postgraduate degrees in engineering, science, or related fields.</p>
                
                <h3>Eligibility Criteria</h3>
                <ul className="tcs-list">
                  <li>Students pursuing BE / BTech / ME / MTech / MCA / MSc / Integrated programs can participate.</li>
                  <li>Candidates must be enrolled in a recognized university or institution.</li>
                  <li>Students from all engineering branches and computer science related fields are eligible.</li>
                  <li>There is no strict percentage requirement, but strong programming knowledge is recommended.</li>
                  <li>Students should have knowledge of basic programming languages.</li>
                </ul>

                <h3>Recommended Programming Languages</h3>
                <p>Participants can code using languages such as:</p>
                <ul className="tcs-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>C</li><li>C++</li><li>Java</li><li>Python</li>
                  <li>C#</li><li>Perl</li><li>PHP</li><li>Ruby</li>
                </ul>

                <h3>Who Should Participate</h3>
                <ul className="tcs-list">
                  <li>Students interested in competitive programming</li>
                  <li>Students aiming for software development roles</li>
                  <li>Candidates who want to improve algorithmic thinking</li>
                </ul>
                <p>Participating in CodeVita helps students develop strong problem-solving skills and gain exposure to real-world coding challenges.</p>
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
                <p>Although CodeVita is primarily a global coding competition, top performers often get opportunities to interact with recruiters from Tata Consultancy Services (TCS).</p>

                <h3>Opportunities Through CodeVita</h3>
                <p>Top ranked participants may receive:</p>
                <ul className="tcs-list">
                  <li>Internship opportunities</li>
                  <li>Interview opportunities with TCS</li>
                  <li>Recognition from global recruiters</li>
                </ul>

                <h3>Nature of Work in TCS Roles</h3>
                <p>Candidates hired through coding competitions like CodeVita may work on:</p>
                <ul className="tcs-list">
                  <li>Software development projects</li>
                  <li>Application development</li>
                  <li>Backend system development</li>
                  <li>Cloud computing solutions</li>
                  <li>Data engineering projects</li>
                  <li>Artificial intelligence and machine learning applications</li>
                </ul>

                <h3>Key Skills Required</h3>
                <ul className="tcs-list">
                  <li>Strong programming knowledge</li>
                  <li>Problem solving ability</li>
                  <li>Data structures and algorithms</li>
                  <li>Logical thinking</li>
                  <li>Debugging skills</li>
                </ul>
                <p>These skills help candidates succeed both in the competition and in real industry projects.</p>
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
                <p>TCS CodeVita is known as one of the largest global coding competitions organized by Tata Consultancy Services.</p>

                <h3>Competition Structure</h3>
                <p>The competition is generally conducted in multiple rounds:</p>

                <h4>Round 1 – Online Qualification Round</h4>
                <ul className="tcs-list">
                  <li>Participants solve coding problems online.</li>
                  <li>Problems focus on algorithmic thinking and programming logic.</li>
                  <li>Participants must write optimized code to pass test cases.</li>
                  <li>The top scorers move to the next round.</li>
                </ul>

                <h4>Round 2 – Advanced Coding Round</h4>
                <ul className="tcs-list">
                  <li>This round contains more complex algorithmic problems.</li>
                  <li>Time management and efficient coding are very important.</li>
                  <li>Participants must handle edge cases and optimize performance.</li>
                </ul>

                <h4>Grand Finale</h4>
                <ul className="tcs-list">
                  <li>Top finalists from across the world compete in the final round.</li>
                  <li>The competition may be conducted at a TCS location or online event.</li>
                  <li>Winners receive global recognition and prizes.</li>
                </ul>

                <h3>Key Areas Tested</h3>
                <ul className="tcs-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>Data Structures</li>
                  <li>Algorithms</li>
                  <li>Mathematical problem solving</li>
                  <li>String manipulation</li>
                  <li>Logical reasoning</li>
                  <li>Optimization techniques</li>
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
                 <h3>What is TCS CodeVita?</h3>
                 <p>TCS CodeVita is a global programming competition organized by Tata Consultancy Services that encourages students to solve real-world algorithmic problems using programming.</p>

                 <h3>Is CodeVita only for Indian students?</h3>
                 <p>No. CodeVita is a global competition, and students from many countries participate every year.</p>

                 <h3>Is there any registration fee?</h3>
                 <p>No. Participation in CodeVita is completely free.</p>

                 <h3>What are the prizes for winners?</h3>
                 <p>Top performers receive cash prizes, certificates, and global recognition. In some cases, participants may also get opportunities to interact with TCS recruiters.</p>

                 <h3>How should I prepare for CodeVita?</h3>
                 <p>Students should practice:</p>
                 <ul className="tcs-list">
                   <li>Data structures and algorithms</li>
                   <li>Competitive programming problems</li>
                   <li>Logical puzzles and coding challenges</li>
                   <li>Online coding platforms like CodeChef, LeetCode, and HackerRank.</li>
                 </ul>
                 <p>Regular practice and understanding efficient algorithms are key to performing well in the competition.</p>
                 <br />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TcsCodevita;
