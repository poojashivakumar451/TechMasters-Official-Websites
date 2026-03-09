import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

const CapgeminiExceller = () => {
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
        .cap-container {
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

        .cap-content-wrapper {
          padding: 40px 5%;
        }

        .cap-header {
          margin-bottom: 40px;
        }

        .cap-header h1 {
          font-size: 2.5rem;
          color: #0f172a;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .cap-header p {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 16px;
        }
        
        .cap-header h3 {
          font-size: 1.5rem;
          color: #1e293b;
          margin-top: 30px;
          margin-bottom: 15px;
        }

        .cap-section {
          margin-bottom: 50px;
        }

        .cap-section h3 {
          font-size: 1.6rem;
          color: #123e72;
          margin-top: 30px;
          margin-bottom: 20px;
          border-bottom: 2px solid #eff6ff;
          padding-bottom: 10px;
        }
        
        .cap-section h4 {
          font-size: 1.2rem;
          color: #0f172a;
          margin-top: 25px;
          margin-bottom: 15px;
        }

        .cap-section p {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 15px;
        }

        .cap-list {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }
        
        .cap-list li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          line-height: 1.6;
          color: #475569;
          font-size: 1.05rem;
        }

        .cap-list li::before {
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
          max-height: 3000px;
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
      
      <div className="cap-container">
        
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="cap-content-wrapper">
          
          <div className="cap-header">
            <h1>CAPGEMINI EXCELLER</h1>
            <p>Capgemini is a global leader in partnering with companies to transform and manage their business by harnessing the power of technology. The Group is guided everyday by its purpose of unleashing human energy through technology for an inclusive and sustainable future. Founded in 1967 in France, it has grown to become one of the world's largest consulting and IT services companies. It is a responsible and diverse organization of nearly 350,000 team members in more than 50 countries.</p>
            <p>With its strong 55-year heritage and deep industry expertise, Capgemini is trusted by its clients to address the entire breadth of their business needs, from strategy and design to operations, fueled by the fast-evolving and innovative world of cloud, data, AI, connectivity, software, digital engineering and platforms. The Group reported 2022 global revenues of €22 billion. Capgemini in India comprises nearly 180,000 team members working across 13 locations: Bangalore, Bhubaneswar, Chennai, Coimbatore, Gandhinagar, Gurugram, Hyderabad, Kolkata, Mumbai, Noida, Pune, Salem and Tiruchirappalli.</p>
            
            <h3>Job Profile & CTC</h3>
            <ul className="cap-list">
              <li>A4 - 4.25 Lacs (4 LPA + 25k one-time incentive)</li>
              <li>A4(P) - 5.75 Lacs (5.5 LPA + 25k one-time incentive)</li>
              <li>A5 - 7.5 Lacs (7.25 LPA + 25k one-time incentive)</li>
            </ul>
          </div>

          <div className="cap-section">
            <h3>Recruitment Process</h3>
            <p>The recruitment process at our college was in online mode but 2 rounds were on-center. For the first 2 rounds of examination, we have to attend from college. They conducted 4 rounds listed below:</p>
            <ul className="cap-list">
              <li>Round 1: Online Assessment Test</li>
              <li>Round 2: Coding Assessment</li>
              <li>Round 3: Online Communication Test</li>
              <li>Round 4: HR Interview (25-30 mins)</li>
            </ul>

            <h3>Round 1: Online Assessment Test</h3>
            <p>This round consists of 3 sections and all 3 sections is an elimination round. If you will be able to clear first section then only you will be eligible to attempt next section. Conducted on the cocubes platform.</p>
            
            <h4>1. Technical Aptitude: Total 25 questions (25 mins)</h4>
            <p>This is an elimination section. In this section, 2 sub sections were there: <strong>Pseudocodes and Computer Fundamentals.</strong></p>
            <p>In Pseudocodes most of the questions are based on <strong>Bitwise Operations, Conditional Statements and Loops.</strong> And in Computer Fundamentals, questions covered the basics of <strong>Data structures like Binary Tree, Min-Max Heap, Stack, Computer Network, Cryptography.</strong></p>
            <p><strong>Tips:</strong> Try to solve lots of questions on the above described topics, so that you can increase your confidence in real test.</p>
            
            <h4>2. Essay Writing</h4>
            <p>This is an elimination section. This section was also conducted on Cocubes Platform. In the 25 mins we have to write 180-220 words. My topic was <strong>Importance of technology in education sector</strong>, and some other topics are <strong>Pollution, Global Warming</strong> etc.</p>
            <p><strong>Tips:</strong> Try to write correct word, because more you will use backspace, the more number will be deducted. Try to write small sentences so that you can easily identify any grammatical or spelling errors. Include more keywords related to the topic more number you will gain.</p>
            
            <h4>3. Game based Test</h4>
            <p>This is also an elimination section. In this section total 4 games were there. In this round they will check your speed and accuracy.</p>
            <p><strong>Note:</strong> You can practice on the <strong>GFG (GeeksforGeeks)</strong> about Grid Challenge, Motion Challenge, Deductive Thinking, Inductive Thinking games.</p>
            <p><strong>Tips:</strong> Attend test in calm environment and with concentration.</p>

            <h3>Round 2: Coding Assessment</h3>
            <p>This round was conducted on college itself. Student who are eligible for coding round can get package of A4(P) & A5 based on performance in coding round. This is not an elimination round. Those who couldn't clear were not allowed to take coding round and only eligible for A4 package.</p>
            <p>There were 2 questions in this round. First question is based on Array and second question is based on Stack. The difficulty level was intermediate.</p>

            <h3>Round 3: Online Communication Test</h3>
            <p>This round was an elimination round. This round was conducted for everyone A5, A4(p), and A4 who were not eligible for coding also need to give this round compulsorily. It was conducted on Aspiring Minds Platform.</p>
            <p>There are multiple sections in this round. <strong>Listen & Repeat</strong>, <strong>Read & Repeat</strong>, <strong>Fill in the blanks</strong> etc. In Listen and Repeat round, you have to listen to the audio clips played and then repeat the sentence.</p>
            <p>Speaking questions like extempore, you can expect questions like speaking for 1 minute on the topic given at that time.</p>
            <p><strong>Tips:</strong> You can not play audio for second time. So try to listen audio actively and with full attention. Try to pronounce correctly. Your pronunciation has to be clear when answering questions. Use good quality wired earphone.</p>
            
            <h3>Round 4: HR Interview (25-30 mins)</h3>
            <p>This was also an elimination round. Interview was conducted virtually on superset platform. We have to wait in the lobby and the interviewer will join you.</p>
            <ul className="cap-list">
              <li>Introduce Yourself.</li>
              <li>Describe your major project.</li>
              <li>Role in the project and many cross questions and deep discussion on the technology which is used in the project.</li>
              <li>Many Questions on the certification.</li>
              <li>What is AI & ML?</li>
              <li>What is Q learning?</li>
              <li>What is Reinforcement Learning?</li>
              <li>1 question on K - means Clustering.</li>
              <li>What is inheritance?</li>
              <li>Write a code for multi level inheritance.</li>
              <li>What is Class loader in Java?</li>
              <li>What is Call-by-reference and Java support Call-by-reference or not?</li>
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
                <p><strong>Capgemini Exceller</strong> is the advanced hiring category offered by Capgemini for candidates with strong technical and analytical skills. It is designed for students who demonstrate higher programming ability and problem-solving capabilities.</p>
                
                <h3>Educational Qualification</h3>
                <p>Candidates must belong to one of the following streams:</p>
                <ul className="cap-list">
                  <li>BE / BTech (All branches)</li>
                  <li>ME / MTech</li>
                  <li>MCA</li>
                  <li>MSc (Computer Science / IT)</li>
                </ul>
                
                <h3>Academic Requirements</h3>
                <ul className="cap-list">
                  <li>Minimum <strong>60% throughout academics</strong> (10th, 12th, and Graduation).</li>
                  <li>No <strong>active backlogs</strong> at the time of the recruitment process.</li>
                  <li>Maximum <strong>1–2 years of education gap</strong> is generally allowed.</li>
                </ul>
                
                <h3>Additional Requirements</h3>
                <ul className="cap-list">
                  <li>Good <strong>programming knowledge</strong></li>
                  <li>Strong <strong>problem-solving skills</strong></li>
                  <li>Basic understanding of <strong>data structures and algorithms</strong></li>
                  <li>Good <strong>communication skills</strong></li>
                </ul>
                <p>Candidates meeting these requirements can apply for the <strong>Exceller role</strong>, which offers higher salary packages compared to the regular analyst role.</p>
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
                <p>Capgemini typically hires candidates under multiple categories depending on their performance in the recruitment process.</p>
                
                <h3>1. Analyst</h3>
                <ul className="cap-list">
                  <li>Entry-level software development role.</li>
                  <li>Works on coding, debugging, and testing applications.</li>
                  <li>Involved in software development lifecycle.</li>
                </ul>
                
                <h3>2. Senior Analyst</h3>
                <ul className="cap-list">
                  <li>Responsible for advanced development tasks.</li>
                  <li>Works on enterprise applications and client projects.</li>
                  <li>May guide junior developers.</li>
                </ul>
                
                <h3>3. Exceller Role</h3>
                <p>The Exceller role is the premium hiring category.</p>
                <p><strong>Nature of Work:</strong></p>
                <ul className="cap-list">
                  <li>Develop scalable software solutions.</li>
                  <li>Work on modern technologies like Cloud computing, AI & Machine Learning, Data Engineering, and Full-stack development.</li>
                  <li>Participate in client-based projects and product development.</li>
                  <li>Solve complex technical challenges.</li>
                </ul>
                <p>This role usually provides <strong>higher responsibilities</strong> and <strong>better salary packages</strong>.</p>
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
                <p>The Capgemini Exceller recruitment test consists of multiple rounds designed to evaluate aptitude, reasoning ability, and programming skills.</p>
                
                <h3>Round 1: Online Assessment</h3>
                <p>This round includes several sections:</p>
                
                <p><strong>Quantitative Aptitude</strong> Topics include:</p>
                <ul className="cap-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>Percentages</li><li>Profit and Loss</li><li>Time & Work</li>
                  <li>Speed, Time & Distance</li><li>Probability</li>
                  <li>Permutation & Combination</li><li>Number Systems</li>
                </ul>
                
                <p><strong>Logical Reasoning</strong> Topics include:</p>
                <ul className="cap-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>Blood Relations</li><li>Coding-Decoding</li><li>Series</li>
                  <li>Syllogisms</li><li>Direction Sense</li><li>Puzzles</li>
                </ul>
                
                <p><strong>Verbal Ability</strong> Topics include:</p>
                <ul className="cap-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>Reading Comprehension</li><li>Sentence Correction</li>
                  <li>Synonyms and Antonyms</li><li>Grammar</li>
                </ul>

                <p><strong>Programming / Coding</strong></p>
                <p>Candidates may be asked to solve coding problems based on Arrays, Strings, Recursion, Searching and Sorting, Basic Data Structures.</p>
                <p>Programming languages allowed usually include: C, C++, Java, Python.</p>

                <hr />

                <h3>Round 2: Technical Interview</h3>
                <p>In this round, interviewers test the candidate's technical knowledge. Common topics asked include:</p>
                <ul className="cap-list" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0'}}>
                  <li>Object Oriented Programming (OOP)</li><li>Data Structures</li>
                  <li>Operating Systems</li><li>DBMS</li>
                  <li>Computer Networks</li><li>Programming concepts</li>
                </ul>
                <p>Candidates may also be asked to write simple coding programs.</p>

                <hr />

                <h3>Round 3: HR Interview</h3>
                <p>The HR interview evaluates Communication skills, Confidence, Career goals, Cultural fit with the company.</p>
                <p>Common HR questions include:</p>
                <ul className="cap-list">
                  <li>Tell me about yourself</li>
                  <li>Why Capgemini?</li>
                  <li>Strengths and weaknesses</li>
                  <li>Where do you see yourself in 5 years?</li>
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
                 <p><strong>1. What is the salary for Capgemini Exceller?</strong></p>
                 <p>The Exceller role salary package is usually around ₹6–7 LPA, depending on the recruitment drive and location.</p>
                 <hr />

                 <p><strong>2. Which programming languages are allowed in the coding round?</strong></p>
                 <p>Candidates can typically choose from C, C++, Java, and Python.</p>
                 <hr />

                 <p><strong>3. Is coding mandatory for Capgemini Exceller?</strong></p>
                 <p>Yes. The Exceller role focuses on strong programming skills, so coding rounds are an important part of the selection process.</p>
                 <hr />
                 
                 <p><strong>4. Can non-CS students apply?</strong></p>
                 <p>Yes. Students from all engineering branches are generally eligible, but they must have good programming knowledge.</p>
                 <hr />

                 <p><strong>5. How should I prepare for Capgemini Exceller?</strong></p>
                 <ul className="cap-list">
                   <li>Practice aptitude questions daily</li>
                   <li>Strengthen Data Structures and Algorithms (DSA) concepts</li>
                   <li>Solve coding problems on platforms like LeetCode, HackerRank, GeeksforGeeks, CodeChef</li>
                   <li>Study core CS subjects</li>
                   <li>Take mock tests regularly</li>
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

export default CapgeminiExceller;
