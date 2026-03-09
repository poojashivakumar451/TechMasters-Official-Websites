import React from 'react';
import { ArrowLeft, Lightbulb, Target, Rocket, ShieldCheck, Cpu, Code, Users, ClipboardCheck, ArrowRight } from 'lucide-react';

const ProblemStatements = () => {
  const handleBack = () => {
    window.location.href = '/services';
  };

  const importanceData = [
    { title: "Encourages Analytical Thinking", desc: "Participants must study the problem carefully and identify the root challenge before developing a solution.", icon: <Target className="icon-blue" /> },
    { title: "Promotes Creative Solutions", desc: "Students explore different technologies and ideas to design innovative and unique solutions.", icon: <Lightbulb className="icon-amber" /> },
    { title: "Real-World Challenges", desc: "Problem statements reflect situations that developers encounter in real professional environments.", icon: <Cpu className="icon-purple" /> },
    { title: "Technical Application", desc: "Participants apply programming concepts, tools, and frameworks to build functional solutions.", icon: <Code className="icon-green" /> }
  ];

  const categories = [
    { title: "Web Applications", desc: "Develop platforms or tools that improve user productivity and accessibility.", icon: <Rocket size={20} />, bgColor: "#eff6ff" },
    { title: "Automation Systems", desc: "Create software solutions that automate repetitive tasks and improve efficiency.", icon: <Cpu size={20} />, bgColor: "#f0fdf4" },
    { title: "Data Processing", desc: "Analyze complex data and generate actionable insights using programming techniques.", icon: <Users size={20} />, bgColor: "#f5f3ff" },
    { title: "Productivity Tools", desc: "Build digital tools that simplify workflows and streamline corporate processes.", icon: <ClipboardCheck size={20} />, bgColor: "#f0f9ff" }
  ];

  const steps = [
    { step: "Step 1", title: "Analyze", desc: "Understand the challenge and identify the main objective." },
    { step: "Step 2", title: "Ideate", desc: "Discuss ideas and explore different possible approaches." },
    { step: "Step 3", title: "Design", desc: "Design a technical plan to implement the solution functionality." },
    { step: "Step 4", title: "Develop", desc: "Develop the solution using modern programming tools and stacks." },
    { step: "Step 5", title: "Test", desc: "Test and refine the solution to improve stability and performance." },
    { step: "Step 6", title: "Present", desc: "Present the final concept and working prototype to the jury." }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .ps-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          background-color: #f8fafc;
          padding: 20px 20px 60px;
        }

        .back-nav {
          padding: 15px 0;
          margin-bottom: 30px;
        }

        .back-btn {
          background: white;
          color: #1e293b;
          border: 1px solid #e2e8f0;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }
        
        .back-btn:hover {
          background: #f1f5f9;
          transform: translateX(-5px);
        }

        .info-card-top {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.04);
          margin-bottom: 40px;
          text-align: center;
          border: 1px solid #f1f5f9;
        }

        .info-card-top h1 {
          font-size: 2.5rem;
          color: #0f172a;
          margin-bottom: 15px;
          font-weight: 800;
        }

        .info-card-top p {
          font-size: 1.2rem;
          color: #64748b;
          max-width: 700px;
          margin: 0 auto;
        }

        .section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 50px;
        }

        @media (max-width: 968px) {
          .section-grid { grid-template-columns: 1fr; }
        }

        .content-card {
          background: white;
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
        }

        .content-card h2 {
          font-size: 1.75rem;
          color: #0f172a;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .content-card p {
          color: #475569;
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .importance-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .importance-box {
          padding: 20px;
          background: #fcfcfd;
          border-radius: 16px;
          border: 1px solid #f3f4f6;
          transition: transform 0.3s;
        }
        
        .importance-box:hover {
          transform: translateY(-5px);
        }

        .importance-box h4 {
          margin: 12px 0 8px;
          color: #0f172a;
          font-weight: 700;
        }

        .importance-box p {
          font-size: 0.9rem;
          margin: 0;
          color: #64748b;
        }

        .categories-section {
          margin-bottom: 50px;
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        .cat-card-mini {
          padding: 25px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.03);
          transition: all 0.3s;
        }

        .cat-card-mini:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
        }

        .cat-card-mini h4 {
          margin: 12px 0 8px;
          font-weight: 750;
          color: #0f172a;
        }

        .steps-section {
          background: #1e293b;
          padding: 60px 40px;
          border-radius: 30px;
          margin-bottom: 50px;
          color: white;
        }

        .steps-section h2 {
          text-align: center;
          margin-bottom: 40px;
          font-size: 2rem;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .step-box {
          background: rgba(255,255,255,0.05);
          padding: 25px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          position: relative;
        }

        .step-label {
          background: #2563eb;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 12px;
          display: inline-block;
        }

        .step-box h4 {
          margin: 0 0 10px;
          font-size: 1.2rem;
        }

        .step-box p {
          margin: 0;
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .outcomes-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          margin-bottom: 50px;
        }

        .outcomes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 30px;
        }

        @media (max-width: 768px) {
          .outcomes-grid { grid-template-columns: 1fr; }
        }

        .outcome-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .outcome-list li {
          padding: 10px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #475569;
          font-weight: 500;
        }

        .icon-blue { color: #2563eb; }
        .icon-amber { color: #f59e0b; }
        .icon-purple { color: #8b5cf6; }
        .icon-green { color: #10b981; }

        .footer-note {
          text-align: center;
          color: #64748b;
          padding-top: 30px;
          border-top: 1px solid #e2e8f0;
        }

      `}</style>

      <div className="ps-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="info-card-top">
          <h1>Problem Statements in Hackathons</h1>
          <p>The foundation of every innovative solution begins with a clearly defined challenge. Transforming ideas into meaningful, real-world solutions.</p>
        </div>

        <div className="section-grid">
          <div className="content-card">
            <h2>Overview</h2>
            <p>
              In hackathons, the foundation of every innovative solution begins with a problem statement. A problem statement defines a challenge that requires participants to analyze the situation, identify possible approaches, and develop a practical technological solution.
            </p>
            <p style={{ marginTop: '15px' }}>
              At TechMasters, hackathon problem statements encourage students to explore real-world scenarios where technology can be applied to improve efficiency, automation, or productivity. This process helps participants learn how to approach problems in a structured and logical manner.
            </p>
          </div>

          <div className="content-card">
            <h2>Why It Matters</h2>
            <div className="importance-grid">
              {importanceData.map((item, idx) => (
                <div className="importance-box" key={idx}>
                  {item.icon}
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="categories-section">
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#0f172a' }}>Common Problem Categories</h2>
          <div className="cat-grid">
            {categories.map((cat, idx) => (
              <div className="cat-card-mini" key={idx} style={{ backgroundColor: cat.bgColor }}>
                {cat.icon}
                <h4>{cat.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0 }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="steps-section">
          <h2>Approach to Solving a Problem Statement</h2>
          <div className="steps-grid">
            {steps.map((s, idx) => (
              <div className="step-box" key={idx}>
                <span className="step-label">{s.step}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="outcomes-card">
          <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Learning Outcomes</h2>
          <p style={{ textAlign: 'center', color: '#64748b' }}>What you gain by participating in TechMasters Hackathons</p>
          
          <div className="outcomes-grid">
            <ul className="outcome-list">
              <li><ShieldCheck size={18} className="icon-blue" /> Improved logical thinking</li>
              <li><ShieldCheck size={18} className="icon-blue" /> Ability to analyze complex problems</li>
              <li><ShieldCheck size={18} className="icon-blue" /> Practical application of skills</li>
            </ul>
            <ul className="outcome-list">
              <li><ShieldCheck size={18} className="icon-green" /> Collaborative problem solving</li>
              <li><ShieldCheck size={18} className="icon-green" /> Real technology challenges</li>
              <li><ShieldCheck size={18} className="icon-green" /> Innovative solution development</li>
            </ul>
          </div>
        </div>

        <div className="footer-note">
          <p>© 2024 TechMasters Software Private Limited | Bidar, Karnataka</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemStatements;
