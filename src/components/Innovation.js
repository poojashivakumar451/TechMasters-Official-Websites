import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Sparkles, Target, Zap, Rocket, Search, Microscope, RefreshCcw, ShieldCheck, TrendingUp, Trophy } from 'lucide-react';

const Innovation = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/services');
  };

  const thinkingModel = [
    { stage: "Observation", desc: "Carefully examine the problem space and identify the core unarticulated needs of users.", icon: <Search className="icon-blue" /> },
    { stage: "Idea Generation", desc: "Brainstorm high-potential solutions using divergence and convergence techniques.", icon: <Lightbulb className="icon-amber" /> },
    { stage: "Experimentation", desc: "Validate hypotheses through rapid technical testing and modular proof-of-concepts.", icon: <Microscope className="icon-purple" /> },
    { stage: "Prototype Creation", desc: "Develop a tangible functional model to demonstrate real-world feasibility.", icon: <Rocket className="icon-green" /> },
    { stage: "Refinement", desc: "Pivot or persevere based on feedback loops, performance metrics, and technical audits.", icon: <RefreshCcw className="icon-red" /> }
  ];

  const developmentSteps = [
    { step: "Problem Exploration", purpose: "Understanding the problem from multiple socio-technical perspectives.", icon: <Target size={20} /> },
    { step: "Creative Brainstorming", purpose: "Generating a wide range of outlier and practical possible solutions.", icon: <Lightbulb size={20} /> },
    { step: "Concept Evaluation", purpose: "Identifying the most practical, scalable, and impactful innovation.", icon: <TrendingUp size={20} /> },
    { step: "Solution Definition", purpose: "Defining the technical architecture and core functionality of the solution.", icon: <ShieldCheck size={20} /> }
  ];

  const evaluationFactors = [
    { factor: "Creativity", desc: "Measures how original, imaginative, and non-linear the proposed solution is.", icon: <Sparkles className="icon-amber" /> },
    { factor: "Problem Relevance", desc: "Determines how effectively and directly the solution addresses the stated challenge.", icon: <Target className="icon-red" /> },
    { factor: "Technical Efficiency", desc: "Evaluates the elegance, stability, and optimization of the code and architecture used.", icon: <Zap className="icon-blue" /> },
    { factor: "Impact & Scaling", desc: "Examines whether the solution can realistically transform existing industrial processes.", icon: <Trophy className="icon-green" /> }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .inn-wrapper {
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

        .hero-section {
          background: #eff6ff;
          padding: 80px 40px; border-radius: 35px; color: #1e40af;
          text-align: center; margin-bottom: 50px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.04);
          border: 1px solid #dbeafe;
        }

        .hero-section h1 { font-size: 3.2rem; margin-bottom: 20px; font-weight: 800; color: #1e3a8a; }
        .hero-section p { font-size: 1.3rem; color: #3b82f6; max-width: 800px; margin: 0 auto; line-height: 1.6; }

        .content-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; margin-bottom: 60px; }
        @media (max-width: 968px) { .content-layout { grid-template-columns: 1fr; } }

        .info-card { background: white; padding: 45px; border-radius: 28px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .info-card h2 { font-size: 2rem; color: #0f172a; margin-bottom: 25px; font-weight: 800; }
        .info-card p { color: #475569; line-height: 1.9; font-size: 1.1rem; }

        .thinking-card { background: #fdf2f8; border: 1px solid #fce7f3; }
        .thinking-card h2 { color: #9d174d; }
        .thinking-list { list-style: none; padding: 0; margin: 0; }
        .think-item { display: flex; gap: 20px; margin-bottom: 25px; align-items: flex-start; }
        .think-item:last-child { margin-bottom: 0; }
        .think-icon-box { 
          width: 50px; height: 50px; border-radius: 15px; background: white;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .think-text h4 { margin: 0 0 5px; color: #0f172a; font-weight: 750; font-size: 1.15rem; }
        .think-text p { margin: 0; color: #64748b; font-size: 0.95rem; line-height: 1.5; }

        .process-section { margin-bottom: 60px; }
        .process-title { text-align: center; font-size: 2.2rem; font-weight: 800; color: #0f172a; margin-bottom: 40px; }
        .process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 25px; }
        .process-box { 
          background: white; padding: 35px; border-radius: 24px; border: 1px solid #f1f5f9;
          text-align: center; transition: all 0.3s;
        }
        .process-box:hover { transform: translateY(-10px); border-color: #3b82f6; box-shadow: 0 15px 30px -10px rgba(0,0,0,0.08); }
        .proc-icon { 
          width: 60px; height: 60px; background: #eff6ff; color: #3b82f6; border-radius: 20px;
          display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
        }
        .process-box h4 { font-size: 1.25rem; margin-bottom: 12px; color: #0f172a; font-weight: 800; }
        .process-box p { color: #64748b; font-size: 0.95rem; line-height: 1.6; }

        .tech-explore { 
          background: #0f172a; padding: 60px; border-radius: 40px; color: white;
          margin-bottom: 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;
        }
        @media (max-width: 850px) { .tech-explore { grid-template-columns: 1fr; padding: 40px; } }
        .tech-explore h2 { font-size: 2.2rem; color: #60a5fa; margin-bottom: 20px; font-weight: 800; }
        .tech-explore p { color: #94a3b8; font-size: 1.1rem; line-height: 1.8; }

        .eval-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; margin-bottom: 60px; }
        .eval-card { background: white; padding: 30px; border-radius: 20px; border-top: 5px solid #3b82f6; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03); }
        .eval-card h4 { display: flex; align-items: center; gap: 12px; font-size: 1.25rem; margin-bottom: 15px; color: #0f172a; font-weight: 800; }
        .eval-card p { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0; }

        .outcome-banner {
          background: #f0fdf4; padding: 50px; border-radius: 35px; border: 1px solid #dcfce7;
          text-align: center;
        }
        .outcome-banner h2 { color: #166534; font-size: 2.2rem; margin-bottom: 40px; font-weight: 800; }
        .outcome-flex { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
        .outcome-pill { 
          background: white; padding: 15px 30px; border-radius: 50px; color: #15803d;
          font-weight: 700; font-size: 1.1rem; border: 1px solid #bbf7d0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          display: flex; align-items: center; gap: 12px;
        }

        .icon-blue { color: #3b82f6; }
        .icon-amber { color: #f59e0b; }
        .icon-purple { color: #a855f7; }
        .icon-green { color: #10b981; }
        .icon-red { color: #ef4444; }

      `}</style>

      <div className="inn-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="hero-section">
          <h1>Innovation Excellence</h1>
          <p>Fostering creative technical breakthroughs and industrial-grade solutions through experimental engineering.</p>
        </div>

        <div className="content-layout">
          <div className="info-card">
            <h2>Concept of Innovation</h2>
            <p>
              Innovation represents the ability to generate new ideas and transform them into meaningful technological solutions. In hackathon environments, innovation is not limited to creating entirely new technologies. It often involves improving existing systems, applying technology in creative ways, and discovering more efficient methods to solve real-world problems.
            </p>
            <p style={{ marginTop: '20px' }}>
              Participants are encouraged to challenge conventional approaches and explore alternative perspectives. By combining creativity with technical skills, teams can develop solutions that address problems more effectively and introduce new possibilities for digital systems.
            </p>
          </div>

          <div className="info-card thinking-card">
            <h2>Innovation Thinking Model</h2>
            <div className="thinking-list">
              {thinkingModel.map((item, idx) => (
                <div className="think-item" key={idx}>
                  <div className="think-icon-box">{item.icon}</div>
                  <div className="think-text">
                    <h4>{item.stage}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="process-section">
          <h2 className="process-title">Idea Generation & Execution</h2>
          <div className="process-grid">
            {developmentSteps.map((s, idx) => (
              <div className="process-box" key={idx}>
                <div className="proc-icon">{s.icon}</div>
                <h4>{s.step}</h4>
                <p>{s.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="tech-explore">
          <div>
            <h2>Technology Exploration</h2>
            <p>
              Innovation in hackathons involves deep-diving into diverse technologies to determine how they can solve complex problems. Participants experiment with cloud architectures, AI algorithms, and distributed systems to build future-ready products.
            </p>
            <p style={{ marginTop: '20px' }}>
              This journey allows participants to expand their technical horizon and discover novel ways of combining existing frameworks to achieve breakthrough results.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Sparkles size={120} color="#60a5fa" strokeWidth={1} style={{ opacity: 0.8 }} />
          </div>
        </div>

        <h2 className="process-title">Innovation Evaluation Matrix</h2>
        <div className="eval-grid">
          {evaluationFactors.map((f, idx) => (
            <div className="eval-card" key={idx}>
              <h4>{f.icon} {f.factor}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="outcome-banner">
          <h2>Learning Outcomes</h2>
          <div className="outcome-flex">
            <div className="outcome-pill"><ShieldCheck /> Creative Solving</div>
            <div className="outcome-pill"><ShieldCheck /> Design Thinking</div>
            <div className="outcome-pill"><ShieldCheck /> Hypothesis testing</div>
            <div className="outcome-pill"><ShieldCheck /> Impactful coding</div>
            <div className="outcome-pill"><ShieldCheck /> Scaling strategies</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px', color: '#64748b', fontSize: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
          <p>© 2024 TechMasters Trainings | Innovation & Breakthrough Research</p>
        </div>
      </div>
    </div>
  );
};

export default Innovation;
