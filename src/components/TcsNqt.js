import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

const TcsNqt = () => {
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
          position: sticky;
          top: 0;
          padding: 20px 5%;
          border-bottom: 1px solid #e2e8f0;
          background: rgba(248, 250, 252, 0.9);
          backdrop-filter: blur(10px);
          z-index: 100;
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

        .highlight-text {
          color: #2563eb;
          font-weight: 600;
        }

        .tcs-table-container {
          width: 100%;
          margin: 50px 0;
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

        .tcs-table tbody td:first-child {
          text-align: left;
          font-weight: 600;
          color: #1e293b;
          background-color: #f8fafc;
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
          max-height: 2000px; /* Arbitrary large max height */
          transition: all 0.5s ease-in-out;
          border-top: 1px solid #eff6ff;
        }
        
        .accordion-content h3 {
          color: #1e293b;
          font-size: 1.1rem;
          margin: 20px 0 10px;
        }

        .pattern-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          border: 1px solid #e2e8f0;
        }
        .pattern-table th, .pattern-table td {
          border: 1px solid #e2e8f0;
          padding: 12px 16px;
          text-align: left;
        }
        .pattern-table thead th { background: #f8fafc; }
      `}</style>
      
      <div className="tcs-container">
        
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="tcs-content-wrapper">
          
          <div className="tcs-header">
            <h1>TCS NQT (National Qualifier Test)</h1>
            <p>TCS National Qualifier Test (NQT) is a standardized assessment conducted by Tata Consultancy Services to evaluate candidates in aptitude, reasoning, programming, and technical skills. Based on performance, candidates are shortlisted for Ninja, Digital, and Prime hiring categories.</p>
            <p className="highlight-text">TCS invites top talent to apply for Prime and Digital Cadre opportunities.</p>
            <p>Launch your career with higher CTC opportunities at TCS-Prime & Digital.</p>
          </div>

          <div className="tcs-table-container">
            <table className="tcs-table">
              <thead>
                <tr>
                  <th rowSpan="2">Offer Category</th>
                  <th colSpan="2">Experience: 0 to 1 year</th>
                  <th colSpan="2">Experience: 1 to 2 years</th>
                </tr>
                <tr>
                  <th>CTC Range – UG</th>
                  <th>CTC Range – PG</th>
                  <th>CTC Range – UG</th>
                  <th>CTC Range – PG</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Prime</td>
                  <td>9.09 LPA – 9.30 LPA</td>
                  <td>11.59 LPA – 11.80 LPA</td>
                  <td>9.45 LPA – 9.66 LPA</td>
                  <td>12.05 LPA – 12.26 LPA</td>
                </tr>
                <tr>
                  <td>Digital</td>
                  <td>7.09 LPA – 7.30 LPA</td>
                  <td>7.39 LPA – 7.60 LPA</td>
                  <td>7.50 LPA – 7.72 LPA</td>
                  <td>7.82 LPA – 8.04 LPA</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tcs-section">
            <p><em>Actual Compensation basis relevant work experience and job location.</em></p>
            <h2>Your career deserves a future as bold and fast-moving as your ambition.</h2>
            <p>At TCS, that future is powered by innovation, real-world impact, and limitless opportunity.</p>
            <p>At TCS, you are not just starting a job - you are stepping into a growth ecosystem designed for learners and leaders of tomorrow. From day one, you will collaborate with global experts, work on cutting-edge projects, and grow through a strong culture of mentorship, continuous upskilling, and lifelong learning.</p>
            <p>Through TCS NQT, you unlock entry into our high-impact Prime and Digital Cadres - a powerful launchpad for a future in next-generation technologies.</p>
          </div>

          <div className="tcs-section">
            <h2>Application Process</h2>
            <p><em>(Note: Please go through the FAQ's before you register and fill the form)</em></p>
            <br/>
            <p><strong>Step 1.</strong> Log in to the <u>TCS NextStep Portal</u></p>
            <p><strong>Step 2.</strong> Register and Apply for the Drive</p>
            <ul className="tcs-list">
              <li><strong>Scenario A:</strong> If you are already a registered user under TCS NextStep Portal, 'IT’ category, kindly log in with your TCS Reference ID (CT/DT reference number). It is mandatory to click on 'Apply For Drive' option to complete your registration.</li>
              <li><strong>Scenario B:</strong> If you are a new user, kindly click on ‘Register Now’, choose category as “IT” and proceed to fill in your details. It is mandatory to click on 'Apply For Drive' option to complete your registration.</li>
            </ul>
            <p>The application form can be filled after the test results are declared.</p>
            <p><strong>Step 3.</strong> Select the skill on which you wish to be evaluated.</p>
            <p><strong>Step 4.</strong> Select In-centre mode of test, choose your 3 preferred test centers and click ‘Apply’. Kindly note that allocation of test centre will depend on the centre availability.</p>
            <p><strong>Step 5.</strong> Select the 3 preferred job cities.</p>
            <p><strong>Step 6.</strong> To confirm your status, check "Track Your Application". The status should reflect as "Applied for Drive".</p>  
          </div>

          <div className="tcs-section">
            <h2>Important Note</h2>
            <ul className="tcs-list">
              <li>You must have all your original academic documents to date, to be submitted at the time of the Interview (if interview shortlisted).</li>
              <li>Communication related to the test will be provided by our official test partner, TCS iON.</li>
              <li>TCS does not send any hiring related communication or job offers from email ids such as Gmail, Rediffmail, Yahoo Mail, Hotmail etc.</li>
              <li>TCS does not ask candidates to deposit money for any employment offer.</li>
              <li>TCS is not associated with any external agency/company to conduct interviews or make offers of employment, on its behalf.</li>
              <li>Do note, meeting TCS eligibility criteria is mandatory. We will review the candidate’s eligibility at every stage of the selection process and if found ineligible or if the declared details are discrepant, the candidature will be disqualified.</li>
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
                <br/>
                <ul className="tcs-list">
                  <li><strong>Highest Qualification:</strong> TCS All India NQT Hiring is exclusively open to for the Batch of 2024, 2025 and 2026 - Bachelor of Technology (B.Tech.)/Bachelor of Engineering (B.E)/Master of Technology (M.Tech.)/Master of Engineering (M.E)/Master of Computer Applications (M.C.A)/Master of Science (M.Sc./M.S) in any specialization offered by AICTE/UGC recognized universities/colleges.</li>
                  <li><strong>Academic Aggregate:</strong> Candidates should have a minimum aggregate of 60% or equivalent CGPA in class 10th, 12th, Diploma, Graduation and Post-Graduation.</li>
                  <li><strong>Backlogs/Arrears/ATKT:</strong> No pending backlog will be permitted at the time of appearing for the TCS selection process.</li>
                  <li><strong>Extended Education:</strong> No extended education will be allowed. Candidates should have completed the course in the stipulated course duration.</li>
                  <li><strong>Gap/Break in Education:</strong> It is mandatory to declare gaps in education, if any. Overall academic gap should not exceed 24 months until highest qualification.</li>
                  <li><strong>Course Types:</strong> Only full-time courses will be considered.</li>
                  <li><strong>Open Schooling:</strong> Candidates who have completed from NIOS are eligible if graduation was full-time.</li>
                  <li><strong>Work Experience:</strong> Candidates with work experience of up to 2 years are eligible to apply.</li>
                  <li><strong>Age:</strong> Candidates should be between 18 to 28 years.</li>
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
                <h3>For Prime Candidates:</h3>
                <ul className="tcs-list">
                  <li>Complex projects with advanced technologies and algorithms</li>
                  <li>Exploration of emerging tech for industry applications</li>
                  <li>Integrate system designs using tech, automation and robust security practices</li>
                </ul>
                <h3>For Digital Candidates:</h3>
                <ul className="tcs-list">
                  <li>Projects on solution development and integration</li>
                  <li>Drive internal initiatives focused on modern technologies</li>
                  <li>Contribute to TCS' ventures in pioneering new product developments</li>
                  <li>Develop tech frameworks and tools for enhanced capabilities</li>
                </ul>
                <h3>For Ninja Candidates:</h3>
                <ul className="tcs-list">
                  <li>Projects on application development and maintenance</li>
                  <li>Enhance systems engineering for better efficiency</li>
                  <li>Explore next-gen technologies for an innovative career path</li>
                </ul>
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
                <br/>
                <h3 style={{marginTop:0}}>Test Features:</h3>
                <ul className="tcs-list">
                  <li>TCS NQT will be conducted in TCS iON Centers.</li>
                  <li>TCS NQT is an integrated test consisting of two sections: Foundation and Advanced.</li>
                  <li>While all are encouraged to attempt both sections, ‘Advanced section’ is mandatory if you aspire for a Digital or Prime offer.</li>
                  <li>Based on the test performance, candidates will qualify for Prime, Digital or Ninja interviews.</li>
                </ul>
                <h3>Test Patterns:</h3>
                <table className="pattern-table" style={{marginBottom: '20px'}}>
                  <thead>
                    <tr>
                      <th>Sections</th>
                      <th>Duration (in min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>Part A: Foundation Section</b></td>
                      <td><b>75</b></td>
                    </tr>
                    <tr><td>Numerical Ability</td><td>25</td></tr>
                    <tr><td>Verbal Ability</td><td>25</td></tr>
                    <tr><td>Reasoning Ability</td><td>25</td></tr>
                    <tr>
                      <td><b>Part B: Advanced Section</b></td>
                      <td><b>115</b></td>
                    </tr>
                    <tr><td>Advanced Quantitative & Reasoning Ability</td><td>25</td></tr>
                    <tr><td>Advanced Coding</td><td>90</td></tr>
                    <tr>
                      <td><strong>Total Duration</strong></td>
                      <td><strong>190</strong></td>
                    </tr>
                  </tbody>
                </table>
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
                 <p><strong>Q1: Which year of passing (YoP) is being considered for the TCS NQT Hiring Process?</strong><br/>
                 A1: Candidates from the batch of 2026, 2025 and 2024 with the standard academic qualifications.</p><br/>
                 
                 <p><strong>Q2: When is the test scheduled?</strong><br/>
                 A2: The test will be scheduled from 10 March 2026 Onwards.</p><br/>

                 <p><strong>Q3: My NextStep account is locked. How can I unlock it?</strong><br/>
                 A3: After 3 unsuccessful OTP attempts, your account will be locked for 4 hours. Ensure you use the right desktop version to login.</p><br/>

                 <p><strong>Q4: I have applied for the drive but have not got a confirmation e-mail, what should I do?</strong><br/>
                 A4: Post applying for the drive, your application status will reflect as 'Applied for Drive'. You will not get further acknowledgment or confirmation mail.</p><br/>

                 <p><strong>Q5: Can I change my photo in the application form?</strong><br/>
                 A5: Yes, the application form can be updated. Ensure formal attire, white background, maximum 200KB limit, and no selfies.</p><br/>

                 <p><strong>Q6: How will I know about my test schedule?</strong><br/>
                 A6: Information related to test will be communicated by our test partner - TCS iON.</p><br/>

                 <p><strong>Q7: Will TCS consider my internship experience for salary fitment?</strong><br/>
                 A7: No, internship experience is not considered for salary fitment.</p>
                 <br />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TcsNqt;
