import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

const Cognizant = () => {
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
        .cog-container {
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

        .cog-content-wrapper {
          padding: 40px 5%;
        }

        .cog-header {
          margin-bottom: 40px;
        }

        .cog-header h1 {
          font-size: 2.5rem;
          color: #0f172a;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .cog-header p {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .cog-section {
          margin-bottom: 50px;
        }

        .cog-section h2 {
          font-size: 1.8rem;
          color: #123e72;
          margin-bottom: 20px;
          border-bottom: 2px solid #eff6ff;
          padding-bottom: 15px;
        }
        
        .cog-section h3 {
          font-size: 1.3rem;
          color: #0f172a;
          margin-top: 30px;
          margin-bottom: 15px;
        }

        .cog-section p {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 15px;
        }

        .cog-list {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }
        
        .cog-list li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          line-height: 1.6;
          color: #475569;
          font-size: 1.05rem;
        }

        .cog-list li::before {
          content: '•';
          color: #2563eb;
          position: absolute;
          left: 0;
          font-size: 1.5rem;
          line-height: 1;
        }
        
        .cog-list-numbered {
          counter-reset: custom-counter;
          list-style: none;
          padding-left: 0;
          margin-bottom: 20px;
        }
        
        .cog-list-numbered li {
          counter-increment: custom-counter;
          position: relative;
          padding-left: 28px;
          margin-bottom: 12px;
          line-height: 1.6;
          color: #475569;
          font-size: 1.05rem;
        }
        
        .cog-list-numbered li::before {
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
      
      <div className="cog-container">
        
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="cog-content-wrapper">
          
          <div className="cog-header">
            <h1>COGNIZANT</h1>
            <p>Cognizant is an American multinational corporation providing IT services, digital, technology, consulting, and operations. Founded as Dun & Bradstreet's in-house unit in 1994, it went external in 1996 and is headquartered in Teaneck, New Jersey. Listed on NASDAQ-100 and S&P 500, it has ~244,300 employees and 50+ delivery centers.</p>
            <p><strong>In short, Cognizant:</strong></p>
            <ul className="cog-list">
              <li>Delivers IT consulting, digital transformation, and operations.</li>
              <li>Focuses on AI, cloud, IoT, and enterprise solutions.</li>
              <li>Serves global clients as a Fortune 500 member.</li>
            </ul>
          </div>

          <div className="cog-section">
            <h2>Interview Experiences</h2>
            <p>It is always beneficial if you know what it is to be there at that moment. So, to give you an advantage, we provide you with the interview experiences of candidates who have been in your situation earlier. Make the most of it.</p>
            
            <h2>Eligibility Criteria for Engineering Roles</h2>
            <p>Cognizant seeks candidates for engineering roles with specific qualifications:</p>
            <ul className="cog-list">
              <li>B.E./B.Tech/M.Tech/MCA in any branch.</li>
              <li>Minimum 70% throughout academics (10th, 12th, UG/PG); no active backlogs.</li>
              <li>For freshers, no experience needed; strong aptitude and basics.</li>
            </ul>
            
            <h2>Cognizant Recruitment Process: Selection Rounds</h2>
            <p>Cognizant conducts 3 rounds for freshers (GenC/GenC Elevate profiles).</p>

            <h3>Online Round</h3>
            <p>Aptitude test: Quantitative (Math/Reasoning), Logical Reasoning, Verbal Ability.</p>

            <h3>Technical + HR Round</h3>
            <p>Combined interview: Technical on DSA, DBMS, OS, Networking, OOP, coding; HR on resume, behavioral.</p>

            <h3>Questions Asked in Cognizant</h3>
            <ol className="cog-list-numbered">
              <li>Reverse a linked list</li>
              <li>Binary Search</li>
              <li>Can you modify the constant variable in C?</li>
              <li>What is graceful degradation?</li>
            </ol>
            <p>You can also expect general HR questions like:</p>
            <ul className="cog-list">
              <li>Tell me about Yourself. Why Cognizant?</li>
              <li>How do you see yourself after five years from now?</li>
              <li>What are your strengths and weaknesses?</li>
            </ul>

            <h2>Cognizant Job Roles</h2>
            <p>Cognizant offers diverse engineering roles:</p>
            <ul className="cog-list">
              <li><strong>Software Engineer:</strong> Develops apps using Java, cloud.</li>
              <li><strong>Data Engineer:</strong> Builds analytics with Python, SQL.</li>
              <li><strong>DevOps Engineer:</strong> Manages CI/CD pipelines.</li>
              <li><strong>Internships/Graduate Programs:</strong> GenC for freshers.</li>
            </ul>

            <h2>Technical Skill Requirements for Cognizant Roles</h2>
            <h3>Coursework</h3>
            <ul className="cog-list">
              <li><strong>Data Structures & Algorithms (DSA):</strong> Linked lists, binary search, reversal.</li>
              <li><strong>Databases:</strong> SQL, DBMS concepts.</li>
              <li><strong>Operating Systems:</strong> Basics, constants in C.</li>
              <li><strong>Computer Networks:</strong> Graceful degradation, protocols.</li>
              <li><strong>Software Engineering Principles:</strong> OOP, SDLC, agile practices.</li>
              <li><strong>Domain Knowledge:</strong> Digital services, IT operations.</li>
            </ul>
            
            <h3>Programming Skills</h3>
            <ul className="cog-list">
              <li><strong>Languages:</strong> Proficiency in C, Java, Python.</li>
              <li><strong>Development:</strong> APIs, frameworks (e.g., Spring).</li>
              <li><strong>Data Tools:</strong> SQL, cloud basics.</li>
              <li><strong>Testing & Version Control:</strong> Unit testing, Git.</li>
              <li><strong>Problem-Solving:</strong> Efficient code for enterprise scenarios.</li>
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
                <p>Cognizant conducts campus recruitment through its hiring programs such as <strong>GenC, GenC Elevate, and GenC Next</strong>. The eligibility criteria generally remain similar across most hiring drives.</p>

                <h3>Educational Qualification</h3>
                <ul className="cog-list">
                  <li>Candidates must be pursuing or completed <strong>BE / BTech / ME / MTech / MCA / MSc (CS / IT related fields)</strong>.</li>
                  <li>Students from <strong>Computer Science, IT, Electronics, Electrical, and related branches</strong> are usually preferred.</li>
                </ul>

                <h3>Academic Criteria</h3>
                <ul className="cog-list">
                  <li>Minimum <strong>60% marks</strong> or equivalent <strong>CGPA</strong> in:
                    <ul className="cog-list" style={{marginTop: '10px'}}>
                      <li>10th Standard</li>
                      <li>12th Standard</li>
                      <li>Graduation</li>
                    </ul>
                  </li>
                </ul>
                
                <h3>Backlog Criteria</h3>
                <ul className="cog-list">
                  <li>Candidates should <strong>not have any active backlogs</strong> during the recruitment process.</li>
                </ul>
                
                <h3>Education Gap</h3>
                <ul className="cog-list">
                  <li>A <strong>maximum gap of 2 years</strong> is allowed in education.</li>
                </ul>

                <h3>Other Requirements</h3>
                <ul className="cog-list">
                  <li>Candidates must possess <strong>strong communication skills</strong>.</li>
                  <li>Willingness to work in <strong>any Cognizant development center in India</strong>.</li>
                  <li>Must be comfortable working in <strong>different shifts if required</strong>.</li>
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
                <p>Cognizant offers multiple hiring roles depending on the candidate's performance in assessments and interviews.</p>

                <h3>GenC (Generation Cognizant)</h3>
                <p>This is the <strong>entry-level role</strong> for fresh graduates.</p>
                <h4>Responsibilities</h4>
                <ul className="cog-list">
                  <li>Develop and maintain software applications</li>
                  <li>Work on coding, debugging and testing</li>
                  <li>Support client projects and deliver technical solutions</li>
                  <li>Collaborate with development teams</li>
                </ul>
                <h4>Salary Package</h4>
                <ul className="cog-list">
                  <li>Approximately ₹4 LPA</li>
                </ul>

                <hr />

                <h3>GenC Elevate</h3>
                <p>GenC Elevate is a higher technical role offered to candidates who perform well in coding and technical rounds.</p>
                <h4>Responsibilities</h4>
                <ul className="cog-list">
                  <li>Work on advanced development projects</li>
                  <li>Handle backend development and APIs</li>
                  <li>Participate in system design discussions</li>
                  <li>Solve complex coding problems</li>
                </ul>
                <h4>Salary Package</h4>
                <ul className="cog-list">
                  <li>Approximately ₹6.5 LPA</li>
                </ul>

                <hr />

                <h3>GenC Next</h3>
                <p>GenC Next is the highest technical role offered in Cognizant campus hiring.</p>
                <h4>Responsibilities</h4>
                <ul className="cog-list">
                  <li>Work on high-end technologies such as:
                    <ul className="cog-list" style={{marginTop: '10px'}}>
                      <li>Cloud Computing</li>
                      <li>Artificial Intelligence</li>
                      <li>Data Engineering</li>
                      <li>Cyber Security</li>
                    </ul>
                  </li>
                  <li>Design scalable systems</li>
                  <li>Implement advanced technical solutions</li>
                </ul>
                <h4>Salary Package</h4>
                <ul className="cog-list">
                  <li>Approximately ₹9 LPA – ₹12 LPA</li>
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
                <br />
                <p>The Cognizant recruitment process usually consists of <strong>three major stages</strong>.</p>

                <h3>1. Online Assessment Test</h3>
                <p>The first stage is an online aptitude and technical test.</p>
                <h4>Sections Included</h4>
                
                <h5>1. Quantitative Aptitude</h5>
                <ul className="cog-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>Percentages</li><li>Profit and Loss</li>
                  <li>Time and Work</li><li>Time and Distance</li>
                  <li>Probability</li><li>Number Systems</li>
                </ul>

                <h5>2. Logical Reasoning</h5>
                <ul className="cog-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>Coding Decoding</li><li>Blood Relations</li>
                  <li>Syllogisms</li><li>Puzzles</li>
                  <li>Pattern Recognition</li>
                </ul>

                <h5>3. Verbal Ability</h5>
                <ul className="cog-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>Reading Comprehension</li><li>Sentence Correction</li>
                  <li>Grammar</li><li>Vocabulary</li>
                </ul>

                <h5>4. Programming / Coding</h5>
                <ul className="cog-list">
                  <li>1-2 coding problems</li>
                  <li>Usually based on: Arrays, Strings, Loops, Basic algorithms</li>
                </ul>
                <p><strong>Common languages allowed:</strong> C, C++, Java, Python.</p>

                <hr />

                <h3>2. Technical Interview</h3>
                <p>Candidates who clear the online test are invited for the technical interview round.</p>
                <p><strong>Typical questions include:</strong></p>
                <ul className="cog-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>Programming language concepts</li><li>Data Structures</li>
                  <li>Object Oriented Programming (OOP)</li><li>DBMS basics</li>
                  <li>Operating Systems</li><li>Computer Networks</li>
                  <li>Projects explanation</li>
                </ul>
                <p>Candidates may also be asked to write simple code or explain algorithms.</p>

                <hr />

                <h3>3. HR Interview</h3>
                <p>The final stage is the HR interview.</p>
                <p><strong>Common HR questions include:</strong></p>
                <ul className="cog-list">
                  <li>Tell me about yourself</li>
                  <li>Why do you want to join Cognizant?</li>
                  <li>Explain your project</li>
                  <li>Your strengths and weaknesses</li>
                  <li>Are you willing to relocate?</li>
                </ul>
                <p><strong>This round mainly checks:</strong> Communication skills, Confidence, Cultural fit with the company.</p>
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
                 <h3>Is Cognizant easy to crack?</h3>
                 <p>Yes. With proper preparation in <strong>aptitude, reasoning, and basic programming</strong>, many candidates successfully clear Cognizant recruitment.</p>

                 <hr />

                 <h3>Which programming languages are allowed?</h3>
                 <p>Most coding platforms allow: C, C++, Java, and Python.</p>

                 <hr />

                 <h3>How many interview rounds are there?</h3>
                 <p>Typically there are two interview rounds:</p>
                 <ol className="cog-list-numbered">
                   <li>Technical Interview</li>
                   <li>HR Interview</li>
                 </ol>

                 <hr />

                 <h3>What is the difficulty level of the exam?</h3>
                 <p>The difficulty level is generally easy to moderate, especially in aptitude and reasoning sections.</p>

                 <hr />

                 <h3>Is Cognizant a good company for freshers?</h3>
                 <p>Yes. Cognizant is considered a <strong>good starting company for freshers</strong> because it offers:</p>
                 <ul className="cog-list">
                   <li>Good training programs</li>
                   <li>Exposure to global projects</li>
                   <li>Opportunities to learn new technologies</li>
                 </ul>
                 <br />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Cognizant;
