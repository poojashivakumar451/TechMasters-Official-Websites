import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Code2, Server, LayoutTemplate, Braces } from 'lucide-react';

const ProblemSolving = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleBack = () => {
    window.location.href = '/services';
  };

  const basicTopics = [
    { title: "Control Flow", subs: ["Conditional statements (if / else / switch)", "Loops (for, while, do-while)", "Break and Continue statements"] },
    { title: "Core Data Types", subs: ["Strings and Character manipulation", "Arrays and Multi-dimensional Arrays", "Pointers and References"] },
    { title: "Functions", subs: ["Method overloading", "Recursion", "Pass by value vs Pass by reference"] }
  ];

  const advancedTopics = [
    { title: "Data Structures", subs: ["Linked Lists", "Stacks & Queues", "Trees (BST, AVL, Red-Black)", "Graphs", "Hash Tables & Heaps"] },
    { title: "Algorithms", subs: ["Sorting (Merge, Quick, Heap)", "Searching (Binary, Linear)", "Dynamic Programming", "Greedy Algorithms", "Backtracking"] },
    { title: "Complexity", subs: ["Big O Notation", "Time Complexity analysis", "Space Complexity optimization"] }
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
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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

        .apt-sub-list {
          list-style: none;
          padding: 0;
          margin: 0 0 0 40px;
        }
        
        .apt-sub-list li {
          position: relative;
          padding-left: 16px;
          margin-bottom: 6px;
          font-size: 0.95rem;
          color: #475569;
        }

        .apt-sub-list li::before {
          content: '•';
          color: #94a3b8;
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
        
        .accordion-content ul {
          margin-bottom: 15px;
          padding-left: 20px;
        }

        .accordion-content li {
          line-height: 1.7;
          margin-bottom: 8px;
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
            <h1>Problem Solving Training</h1>
            <p>Problem Solving training at TechMasters focuses on improving students' logical thinking and their ability to solve complex programming challenges step by step. We go beyond mere syntax, teaching you how to analytically break down problem statements, blueprint mathematical algorithms, and implement highly optimized code.</p>
          </div>

          <div className="apt-section">
            <h2><Braces size={26} /> Programming Foundations</h2>
            <p className="section-desc">The core building blocks required to conceptualize structural logic across any modern language (C, C++, Java, or Python).</p>
            
            <div className="apt-grid">
              {basicTopics.map((item, index) => (
                <div className="apt-card" key={index}>
                  <div className="apt-card-header">
                    <div className="apt-number">{index + 1}</div>
                    <div className="apt-name">{item.title}</div>
                  </div>
                  {item.subs.length > 0 && (
                    <ul className="apt-sub-list">
                      {item.subs.map((sub, j) => (
                        <li key={j}>{sub}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="apt-section">
            <h2><Server size={26} /> Data Structures & Algorithms</h2>
            <p className="section-desc">Advanced techniques vital for solving the complex pattern queries issued by major tier-1 product companies during coding rounds.</p>
            
            <div className="apt-grid">
              {advancedTopics.map((item, index) => (
                <div className="apt-card" key={index}>
                  <div className="apt-card-header">
                     <div className="apt-number" style={{background: '#f0fdf4', color: '#16a34a'}}>{index + 1}</div>
                    <div className="apt-name">{item.title}</div>
                  </div>
                  {item.subs.length > 0 && (
                    <ul className="apt-sub-list">
                      {item.subs.map((sub, j) => (
                        <li key={j}>{sub}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="accordion-wrapper">
            
            {/* Accordion 1 */}
            <div className={`accordion-item ${activeAccordion === 1 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(1)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <LayoutTemplate size={20} /> The TechMasters Methodology
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 1 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <h3>Phase 1: Deep Problem Comprehension</h3>
                <ul>
                  <li>Students learn how to carefully dissect the problem statement rather than jumping instantly into the editor.</li>
                  <li>Identification of edge cases, time constraints, and understanding input/output data bounds.</li>
                </ul>
                
                <h3>Phase 2: Architectural Breakdown</h3>
                <ul>
                  <li>Breaking massive algorithmic problems into small, modular, logical sequences.</li>
                  <li>Drafting pseudocode and testing logic mentally before typing out the physical codebase.</li>
                </ul>

                <h3>Phase 3: Implementation & Review</h3>
                <ul>
                  <li>Trainer demonstrates standard solution techniques followed by optimized variants.</li>
                  <li>Students write real source code, compare complexity with peers, and refine constraints dynamically.</li>
                </ul>
              </div>
            </div>

            {/* Accordion 2 */}
            <div className={`accordion-item ${activeAccordion === 2 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(2)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Code2 size={20} /> Utilizing Digital Practice Platforms
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 2 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <h3>Where Do You Execute Your Code?</h3>
                <p>Theory is only the beginning. Our candidates aggressively leverage competitive programming platforms like global judge networks to simulate high-pressure recruitment environments.</p>
                <ul>
                  <li><strong>Improve Logical Agility:</strong> Exposing developers to vast arrays of unique mathematical and structural queries.</li>
                  <li><strong>Pattern Recognition:</strong> Discovering hidden parallels between different scenarios so you can instantly recognize whether a problem demands Dynamic Programming or a Greedy approach.</li>
                  <li><strong>Confidence Building:</strong> Climbing the leaderboards provides concrete validation prior to facing the intensity of live corporate technical screenings.</li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProblemSolving;
