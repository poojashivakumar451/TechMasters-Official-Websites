import React from 'react';
import { ArrowLeft, Rocket, Zap, Sliders, Layers, Monitor, Code, Database, Share2, ClipboardCheck, Sparkles, Layout } from 'lucide-react';

const RapidPrototyping = () => {
  const handleBack = () => {
    window.location.href = '/services';
  };

  const principles = [
    { title: "Speed of Development", desc: "Solutions are built quickly so that ideas can be tested within the hackathon timeframe.", icon: <Zap className="icon-amber" /> },
    { title: "Core Functionality", desc: "Focuses on demonstrating the key idea rather than implementing every minor feature.", icon: <Target className="icon-blue" /> },
    { title: "Iterative Improvement", desc: "Teams continuously refine their prototype based on rapid testing and feedback.", icon: <Sliders className="icon-purple" /> },
    { title: "Experimentation", desc: "Participants explore different technologies to identify the most effective solution.", icon: <Sparkles className="icon-green" /> }
  ];

  const lifecycle = [
    { title: "Problem Understanding", desc: "Analyze the challenge and identify the core objective.", icon: <Layers size={20} /> },
    { title: "Idea Exploration", desc: "Generate possible solution concepts through brainstorming.", icon: <Zap size={20} /> },
    { title: "Prototype Design", desc: "Create a simple structure outlining the operation.", icon: <Layout size={20} /> },
    { title: "Implementation", desc: "Develop using programming tools and frameworks.", icon: <Code size={20} /> },
    { title: "Testing", desc: "Evaluate whether it demonstrates the solution.", icon: <ClipboardCheck size={20} /> },
    { title: "Demonstration", desc: "Present the working model and explain decisions.", icon: <Share2 size={20} /> }
  ];

  const components = [
    { name: "User Interface", purpose: "Allows users to interact with and observe functionality.", icon: <Monitor size={24} className="icon-blue" /> },
    { name: "Application Logic", purpose: "Implements the core algorithm or process.", icon: <Code size={24} className="icon-green" /> },
    { name: "Data Handling", purpose: "Processes input data and produces meaningful output.", icon: <Database size={24} className="icon-purple" /> },
    { name: "Integration Layer", purpose: "Connects different services required for the prototype.", icon: <Zap size={24} className="icon-amber" /> }
  ];

  const evaluation = [
    { criteria: "Innovation", desc: "Measures how creative and original the proposed solution is." },
    { criteria: "Functionality", desc: "Evaluates whether the prototype demonstrates the solution." },
    { criteria: "Usability", desc: "Determines how easily users can interact with the system." },
    { criteria: "Technical Implementation", desc: "Examines the effectiveness of the development approach." }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .rp-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          background-color: #f8fafc;
          padding: 20px 20px 60px;
        }

        .back-nav { padding: 15px 0; margin-bottom: 30px; }

        .back-btn {
          background: white; color: #1e293b; border: 1px solid #e2e8f0; padding: 10px 20px;
          border-radius: 12px; font-weight: 600; cursor: pointer; display: inline-flex;
          align-items: center; gap: 10px; transition: all 0.3s;
        }
        
        .back-btn:hover { background: #f1f5f9; transform: translateX(-5px); }

        .header-card {
          background: white; padding: 60px 40px; border-radius: 30px; 
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.04); margin-bottom: 40px;
          text-align: center; border: 1px solid #f1f5f9;
        }

        .header-card h1 { font-size: 2.8rem; color: #0f172a; margin-bottom: 20px; font-weight: 800; }
        .header-card p { font-size: 1.3rem; color: #64748b; max-width: 750px; margin: 0 auto; }

        .intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 60px; }
        @media (max-width: 968px) { .intro-grid { grid-template-columns: 1fr; } }

        .card-standard { background: white; padding: 40px; border-radius: 24px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .card-standard h2 { font-size: 1.8rem; color: #0f172a; margin-bottom: 25px; font-weight: 700; }
        .card-standard p { color: #475569; line-height: 1.8; font-size: 1.1rem; }

        .principle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .principle-item { padding: 25px; background: #fcfcfd; border-radius: 20px; border: 1px solid #f3f4f6; transition: transform 0.3s; }
        .principle-item:hover { transform: translateY(-5px); }
        .principle-item h4 { margin: 15px 0 10px; color: #0f172a; font-weight: 700; }
        .principle-item p { font-size: 0.95rem; margin: 0; color: #64748b; }

        .lifecycle-section { margin-bottom: 60px; }
        .lifecycle-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .lifecycle-box { 
          background: white; padding: 30px; border-radius: 24px; border: 1px solid #f1f5f9;
          display: flex; gap: 20px; align-items: flex-start;
        }
        .icon-circle { 
          width: 50px; height: 50px; border-radius: 15px; background: #eff6ff;
          display: flex; align-items: center; justify-content: center; color: #2563eb; flex-shrink: 0;
        }
        .lifecycle-box h4 { margin: 0 0 10px; color: #0f172a; font-size: 1.25rem; font-weight: 750; }
        .lifecycle-box p { margin: 0; color: #64748b; font-size: 1rem; line-height: 1.6; }

        .arch-section { background: #0f172a; padding: 70px 40px; border-radius: 40px; margin-bottom: 60px; color: white; }
        .arch-section h2 { text-align: center; font-size: 2.2rem; margin-bottom: 50px; }
        .arch-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; }
        .arch-card { background: rgba(255,255,255,0.05); padding: 35px; border-radius: 25px; border: 1px solid rgba(255,255,255,0.1); text-align: center; }
        .arch-card .icon-box { margin-bottom: 20px; display: flex; justify-content: center; }
        .arch-card h4 { font-size: 1.35rem; margin-bottom: 12px; font-weight: 700; }
        .arch-card p { color: #94a3b8; line-height: 1.6; }

        .eval-section { margin-bottom: 60px; }
        .eval-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 25px; }
        .eval-card { padding: 30px; background: white; border-radius: 20px; border-left: 5px solid #2563eb; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .eval-card h4 { color: #0f172a; margin-bottom: 10px; font-weight: 800; font-size: 1.2rem; }
        .eval-card p { color: #64748b; margin: 0; font-size: 0.95rem; }

        .outcome-card { background: #f0fdf4; padding: 45px; border-radius: 30px; border: 1px solid #dcfce7; }
        .outcome-card h2 { color: #166534; margin-bottom: 30px; text-align: center; font-weight: 800; }
        .outcome-list { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 40px; list-style: none; padding: 0; }
        @media (max-width: 768px) { .outcome-list { grid-template-columns: 1fr; } }
        .outcome-list li { display: flex; align-items: center; gap: 15px; color: #14532d; font-weight: 600; font-size: 1.1rem; }
        .check-dot { width: 10px; height: 10px; border-radius: 50%; background: #22c55e; }

        .icon-blue { color: #2563eb; }
        .icon-amber { color: #f59e0b; }
        .icon-purple { color: #8b5cf6; }
        .icon-green { color: #22c55e; }

      `}</style>

      <div className="rp-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="header-card">
          <h1>Rapid Prototyping in Hackathons</h1>
          <p>The art of transforming visionary ideas into functional technical demonstrations within tight constraints.</p>
        </div>

        <div className="intro-grid">
          <div className="card-standard">
            <h2>Concept Overview</h2>
            <p>Rapid prototyping is a development approach where ideas are quickly converted into working models that demonstrate the core functionality of a solution.</p>
            <p style={{ marginTop: '20px' }}>In hackathons, where time is the most valuable asset, teams create prioritized versions that prove feasibility and identify technical roadblocks early in the journey.</p>
          </div>
          <div className="card-standard">
            <h2>Core Principles</h2>
            <div className="principle-grid">
              {principles.map((item, idx) => (
                <div className="principle-item" key={idx}>
                  {item.icon}
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lifecycle-section">
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '40px', textAlign: 'center' }}>Development Lifecycle</h2>
          <div className="lifecycle-grid">
            {lifecycle.map((item, idx) => (
              <div className="lifecycle-box" key={idx}>
                <div className="icon-circle">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="arch-section">
          <h2>Prototype Architecture</h2>
          <div className="arch-grid">
            {components.map((c, idx) => (
              <div className="arch-card" key={idx}>
                <div className="icon-box">{c.icon}</div>
                <h4>{c.name}</h4>
                <p>{c.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="eval-section">
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: '800' }}>Evaluation Framework</h2>
          <div className="eval-grid">
            {evaluation.map((e, idx) => (
              <div className="eval-card" key={idx}>
                <h4>{e.criteria}</h4>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="outcome-card">
          <h2>Professional Learning Outcomes</h2>
          <ul className="outcome-list">
            <li><div className="check-dot" /> Experience in agile development</li>
            <li><div className="check-dot" /> Design thinking implementation</li>
            <li><div className="check-dot" /> Collaborative technical creation</li>
            <li><div className="check-dot" /> Turning vision into working code</li>
            <li><div className="check-dot" /> Prototype-based validation</li>
            <li><div className="check-dot" /> High-pressure decision making</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px', color: '#64748b', fontSize: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
          <p>© 2024 TechMasters Trainings | Hackathon Module 02</p>
        </div>
      </div>
    </div>
  );
};

const Target = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export default RapidPrototyping;
