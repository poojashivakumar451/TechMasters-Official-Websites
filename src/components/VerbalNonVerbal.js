import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, BookOpen, Shapes, Lightbulb } from 'lucide-react';

const VerbalNonVerbal = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleBack = () => {
    window.location.href = '/services';
  };

  const verbalTopics = [
    { title: "Vocabulary", subs: ["Synonyms", "Antonyms", "One Word Substitution", "Idioms and Phrases", "Phrasal Verbs"] },
    { title: "Grammar", subs: ["Parts of Speech", "Articles", "Tenses", "Prepositions", "Conjunctions", "Subject-Verb Agreement", "Active and Passive Voice", "Direct and Indirect Speech"] },
    { title: "Error Detection", subs: ["Spotting Errors", "Sentence Correction", "Sentence Improvement"] },
    { title: "Sentence Structure", subs: ["Sentence Completion", "Sentence Formation", "Para Jumbles (Sentence Arrangement)", "Fill in the Blanks"] },
    { title: "Reading Skills", subs: ["Reading Comprehension", "Passage Completion"] },
    { title: "Word Usage", subs: ["Choosing Correct Word", "Vocabulary Usage in Sentences"] },
    { title: "Verbal Logic", subs: ["Statement and Conclusion (verbal logic)", "Cause and Effect"] }
  ];

  const nonVerbalTopics = [
    { title: "Series", subs: ["Figure Series", "Missing Figure"] },
    { title: "Analogy", subs: ["Figure Analogy"] },
    { title: "Classification", subs: ["Odd Figure Out"] },
    { title: "Image Problems", subs: ["Mirror Images", "Water Images"] },
    { title: "Pattern Problems", subs: ["Completion of Incomplete Pattern", "Figure Matrix", "Rule Detection"] },
    { title: "Figure Analysis", subs: ["Embedded Figures", "Grouping of Identical Figures", "Figure Formation"] },
    { title: "Paper Problems", subs: ["Paper Folding", "Paper Cutting"] },
    { title: "Spatial Problems", subs: ["Cubes and Dice", "Dot Situation"] },
    { title: "Construction Problems", subs: ["Construction of Squares", "Construction of Triangles"] },
    { title: "Shape Analysis", subs: ["Figure Formation and Analysis"] }
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
            <h1>Verbal and Non-Verbal Ability Syllabus</h1>
            <p>Mastering both Verbal and Non-Verbal ability is essential for demonstrating strong communication skills, grammatical precision, and rapid visual pattern recognition. These components heavily influence your overall assessment scores during comprehensive recruitment evaluating both language proficiency and abstract reasoning.</p>
          </div>

          <div className="apt-section">
            <h2><BookOpen size={26} /> Verbal Ability Syllabus</h2>
            <p className="section-desc">Assessments on vocabulary width, grammatical structure, reading comprehension, and language logic.</p>
            
            <div className="apt-grid">
              {verbalTopics.map((item, index) => (
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
            <h2><Shapes size={26} /> Non-Verbal Ability Syllabus</h2>
            <p className="section-desc">Visual evaluations consisting of abstract shapes, spatial arrangement analysis, and matrix rules.</p>
            
            <div className="apt-grid">
              {nonVerbalTopics.map((item, index) => (
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
                  <Lightbulb size={20} /> Importance of Ability Tests
                </div>
                <div className="accordion-icon">
                   {activeAccordion === 1 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <h3>Why Company Assessments Include This</h3>
                <p>Verbal Ability directly correlates to how professionally an employee can communicate with clients, draft documentation, and articulate logic within team environments. Non-Verbal assignments test your brain's raw processing power independently of language or mathematical background.</p>
                <p>Combined, they paint a complete picture of an applicant's potential for absorbing new technologies and integrating smoothly into corporate operations.</p>
              </div>
            </div>

            {/* Accordion 2 */}
            <div className={`accordion-item ${activeAccordion === 2 ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleAccordion(2)}>
                Preparation Strategy
                <div className="accordion-icon">
                   {activeAccordion === 2 ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
              <div className="accordion-content">
                <br />
                <h3>Strategic Approach</h3>
                <p><strong>1. Consistent Reading:</strong> Enhance your vocabulary, grammar, and passage comprehension simply by habitually reading business and technical editorials daily.</p>
                <p><strong>2. Structural grammar:</strong> Do not just wing grammar questions based on what "sounds right." Re-learn explicit rules regarding subject-verb agreement and conditional tenses.</p>
                <p><strong>3. Visual Repetition:</strong> Non-verbal problem solving speeds up dramatically once your brain begins memorizing typical rotations (45, 90, 180 degrees) and common matrix alterations.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default VerbalNonVerbal;
