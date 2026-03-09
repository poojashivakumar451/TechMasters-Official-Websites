import React from 'react';
import { ArrowLeft, Users, Share2, Lightbulb, MessageSquare, Briefcase, Code, ShieldCheck, Presentation, Target, Zap, GraduationCap } from 'lucide-react';

const TeamCollaboration = () => {
  const handleBack = () => {
    window.location.href = '/services';
  };

  const framework = [
    { title: "Idea Sharing", desc: "Team members openly exchange ideas and explore different approaches to solve problems.", icon: <Lightbulb className="icon-amber" /> },
    { title: "Knowledge Integration", desc: "Participants combine technical skills to build comprehensive and robust solutions.", icon: <Share2 className="icon-blue" /> },
    { title: "Continuous Feedback", desc: "Teams regularly review progress and suggest real-time modular improvements.", icon: <MessageSquare className="icon-green" /> },
    { title: "Collective Decision Making", desc: "Development decisions are made through healthy discussion and evaluation.", icon: <Users className="icon-purple" /> }
  ];

  const roles = [
    { role: "Solution Planner", responsibility: "Analyzes the problem statement and outlines the core development strategy.", icon: <Target size={24} className="icon-blue" /> },
    { role: "Developer", responsibility: "Implements the technical components using modern programming tools and stacks.", icon: <Code size={24} className="icon-green" /> },
    { role: "Prototype Evaluator", responsibility: "Tests the system and identifies critical improvements to enhance functionality.", icon: <ShieldCheck size={24} className="icon-red" /> },
    { role: "Project Presenter", responsibility: "Explains the concept, design decisions, and value proposition of the prototype.", icon: <Presentation size={24} className="icon-purple" /> }
  ];

  const coordination = [
    { phase: "Problem Understanding", activity: "Team members analyze the challenge and define the objective of the solution." },
    { phase: "Concept Design", activity: "Participants discuss possible approaches and design the system structure." },
    { phase: "Prototype Development", activity: "Tasks are divided among members to build different components simultaneously." },
    { phase: "Testing & Refinement", activity: "Teams evaluate the prototype and implement necessary logic improvements." },
    { phase: "Solution Presentation", activity: "The final prototype is demonstrated and explained to the jury audience." }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .tc-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          background-color: #f8fafc;
          padding: 20px 20px 60px;
        }

        .back-nav { padding: 15px 0; margin-bottom: 30px; }

        .back-btn {
          background: white; color: #1e293b; border: 1px solid #e2e8f0; padding: 10px 20px;
          border-radius: 12px; font-weight: 600; cursor: pointer; display: inline-flex;
          align-items: center; gap: 10px; transition: all 0.3s ease;
        }
        
        .back-btn:hover { background: #f1f5f9; transform: translateX(-5px); }

        .header-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          padding: 70px 40px; border-radius: 30px; color: white;
          text-align: center; margin-bottom: 40px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
        }

        .header-hero h1 { font-size: 3rem; margin-bottom: 20px; font-weight: 800; letter-spacing: -0.025em; }
        .header-hero p { font-size: 1.3rem; color: #94a3b8; max-width: 800px; margin: 0 auto; line-height: 1.6; }

        .overview-card {
          background: white; padding: 45px; border-radius: 24px; border: 1px solid #f1f5f9;
          margin-bottom: 50px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }

        .overview-card h2 { font-size: 2rem; color: #0f172a; margin-bottom: 20px; font-weight: 700; }
        .overview-card p { color: #475569; line-height: 1.9; font-size: 1.1rem; margin-bottom: 20px; }

        .section-title { font-size: 2.2rem; font-weight: 800; color: #0f172a; margin-bottom: 40px; text-align: center; }

        .framework-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 25px; margin-bottom: 60px; }
        .framework-box { 
          background: white; padding: 35px; border-radius: 20px; border: 1px solid #f1f5f9;
          transition: all 0.3s; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .framework-box:hover { transform: translateY(-10px); box-shadow: 0 15px 30px -10px rgba(0,0,0,0.1); }
        .icon-wrap { margin-bottom: 20px; display: flex; justify-content: center; }
        .framework-box h4 { font-size: 1.3rem; margin-bottom: 15px; color: #0f172a; font-weight: 750; }
        .framework-box p { color: #64748b; font-size: 1rem; line-height: 1.6; }

        .roles-section { margin-bottom: 60px; }
        .roles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
        .role-card { 
          background: white; padding: 30px; border-radius: 24px; border: 2px solid #f1f5f9;
          transition: all 0.3s;
        }
        .role-card:hover { border-color: #2563eb; background: #fafbff; }
        .role-card .role-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
        .role-card h4 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin: 0; }
        .role-card p { color: #475569; font-size: 0.95rem; line-height: 1.6; }

        .coordination-section { background: white; padding: 50px; border-radius: 30px; margin-bottom: 60px; border: 1px solid #f1f5f9; }
        .coordination-list { list-style: none; padding: 0; margin: 0; }
        .coord-item { 
          display: flex; gap: 30px; padding: 25px 0; border-bottom: 1px solid #f1f5f9;
          align-items: flex-start;
        }
        .coord-item:last-child { border-bottom: none; }
        .coord-num { 
          width: 40px; height: 40px; border-radius: 50%; background: #2563eb; color: white;
          display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;
        }
        .coord-content h4 { font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0 0 8px; }
        .coord-content p { color: #475569; margin: 0; font-size: 1.05rem; }

        .dual-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 60px; }
        @media (max-width: 768px) { .dual-card-grid { grid-template-columns: 1fr; } }
        .info-box { background: white; padding: 40px; border-radius: 24px; border: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 15px; }
        .info-box h3 { font-size: 1.6rem; color: #0f172a; font-weight: 750; }
        .info-box p { color: #64748b; line-height: 1.8; font-size: 1.05rem; }

        .outcomes-box { 
          background: #eff6ff; padding: 50px; border-radius: 30px; border: 1px solid #dbeafe;
          text-align: center;
        }
        .outcomes-box h2 { color: #1e40af; margin-bottom: 40px; font-weight: 800; font-size: 2.2rem; }
        .outcome-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; }
        .outcome-tag { 
          background: white; padding: 12px 25px; border-radius: 50px; color: #1e40af;
          font-weight: 700; border: 1px solid #bfdbfe; display: flex; align-items: center; gap: 10px;
        }

        .icon-amber { color: #f59e0b; }
        .icon-blue { color: #2563eb; }
        .icon-green { color: #10b981; }
        .icon-purple { color: #8b5cf6; }
        .icon-red { color: #ef4444; }

      `}</style>

      <div className="tc-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="header-hero">
          <h1>Team Collaboration in Hackathons</h1>
          <p>Building innovative solutions through shared knowledge, coordinated effort, and collaborative problem solving.</p>
        </div>

        <div className="overview-card">
          <h2>Concept of Collaborative Development</h2>
          <p>
            Hackathons are designed to encourage collaborative innovation. Rather than working individually, participants form teams where each member contributes unique knowledge, technical ability, and creative thinking. Collaboration allows complex challenges to be addressed from multiple perspectives.
          </p>
          <p>
            When individuals work together, they combine their skills in programming, analysis, and design to build stronger solutions. This cooperative environment enables teams to experiment with ideas, evaluate approaches, and refine solutions through discussion and feedback.
          </p>
        </div>

        <h2 className="section-title">Collaboration Framework</h2>
        <div className="framework-grid">
          {framework.map((item, idx) => (
            <div className="framework-box" key={idx}>
              <div className="icon-wrap">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="roles-section">
          <h2 className="section-title">Team Responsibility Matrix</h2>
          <div className="roles-grid">
            {roles.map((r, idx) => (
              <div className="role-card" key={idx}>
                <div className="role-header">
                  {r.icon}
                  <h4>{r.role}</h4>
                </div>
                <p>{r.responsibility}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="coordination-section">
          <h2 className="section-title">Development Coordination Model</h2>
          <div className="coordination-list">
            {coordination.map((c, idx) => (
              <div className="coord-item" key={idx}>
                <div className="coord-num">{idx + 1}</div>
                <div className="coord-content">
                  <h4>{c.phase}</h4>
                  <p>{c.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dual-card-grid">
          <div className="info-box">
            <h3><Zap size={24} className="icon-amber" /> Technical Communication</h3>
            <p>
              Effective communication is essential when teams develop solutions under time constraints. Participants must explain their ideas clearly, discuss technical challenges, and coordinate development tasks efficiently.
            </p>
          </div>
          <div className="info-box">
            <h3><GraduationCap size={24} className="icon-blue" /> Knowledge Sharing</h3>
            <p>
              Hackathons create an environment where participants learn from each other. Team members exchange knowledge about programming techniques, problem-solving strategies, and development approaches through continuous peer learning.
            </p>
          </div>
        </div>

        <div className="outcomes-box">
          <h2>Professional Growth Outcomes</h2>
          <div className="outcome-tags">
            <div className="outcome-tag"><Zap size={18} /> Improved Teamwork</div>
            <div className="outcome-tag"><Zap size={18} /> Technical Communication</div>
            <div className="outcome-tag"><Zap size={18} /> Agile Coordination</div>
            <div className="outcome-tag"><Zap size={18} /> Pair Programming</div>
            <div className="outcome-tag"><Zap size={18} /> Collective Solving</div>
            <div className="outcome-tag"><Zap size={18} /> Shared Leadership</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px', color: '#64748b', fontSize: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
          <p>© 2024 TechMasters Trainings | Professional Team Framework</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCollaboration;
