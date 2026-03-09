import React from 'react';
import { ArrowLeft, Layout, Server, Database as DbIcon, ShieldCheck, Cloud, Blocks, Code, Globe, Zap } from 'lucide-react';

const MernDevelopment = () => {
  const handleBack = () => {
    window.location.href = '/services';
  };

  const syllabus = [
    {
      category: "1. HTML5 Foundation",
      icon: <Layout className="icon-blue" size={24} />,
      bgColor: "#eff6ff",
      items: [
        { name: "Web Structure", topics: ["Semantic Elements", "Form Handling & Inputs", "Media Elements (Video/Audio)", "HTML API Concepts"] },
        { name: "SEO & Best Practices", topics: ["Search Engine Optimization", "Accessibility Standards", "Document Lifecycle", "Validation"] }
      ]
    },
    {
      category: "2. CSS3 Advanced Design",
      icon: <Layout className="icon-sky" size={24} />,
      bgColor: "#f0f9ff",
      items: [
        { name: "Layout Mastery", topics: ["Flexbox Grid System", "Grid Areas & Tracks", "Pseudo-classes & Elements", "Modern CSS Architecture"] },
        { name: "Interactive Design", topics: ["Responsive Breakpoints", "Transition & Keyframes", "CSS Custom Properties", "Tailwind CSS Basics"] }
      ]
    },
    {
      category: "3. JavaScript (ES6+)",
      icon: <Code className="icon-green" size={24} />,
      bgColor: "#f0fdf4",
      items: [
        { name: "Modern Logic", topics: ["Standard & Arrow Functions", "Array Destructuring", "Object Literals", "Higher-Order Functions"] },
        { name: "Async Control", topics: ["Promises Lifecycle", "Async/Await Syntax", "Error Handling (Try/Catch)", "Event Loop Mechanics"] }
      ]
    },
    {
      category: "4. React.js Frontend",
      icon: <Blocks className="icon-purple" size={24} />,
      bgColor: "#f5f3ff",
      items: [
        { name: "Hooks & State", topics: ["useState & useEffect", "Component Lifecycle", "Context API State", "Custom Hook Development"] },
        { name: "Navigation & UX", topics: ["React Router Integration", "Protected Routes", "Dynamic Form Handling", "UI Component Libraries"] }
      ]
    },
    {
      category: "5. Node.js & Express",
      icon: <Server className="icon-emerald" size={24} />,
      bgColor: "#ecfdf5",
      items: [
        { name: "Runtime Mastery", topics: ["Module System (CommonJS/ESM)", "File System & Buffers", "Event Emitter Pattern", "NPM Package Management"] },
        { name: "REST API Design", topics: ["Middleware Architecture", "Routing & Controllers", "Authentication (JWT/Passport)", "Request Validation"] }
      ]
    },
    {
      category: "6. MongoDB Engineering",
      icon: <DbIcon className="icon-green" size={24} />,
      bgColor: "#f0fdf4",
      items: [
        { name: "Data Modeling", topics: ["Mongoose Schemas", "One-to-Many Relationships", "Aggregation Pipelines", "Indexing Strategies"] },
        { name: "Database Ops", topics: ["CRUD Operations", "Atlas Cloud Setup", "Transactions in Mongo", "Performance Monitoring"] }
      ]
    },
    {
      category: "7. QA & Software Testing",
      icon: <ShieldCheck className="icon-red" size={24} />,
      bgColor: "#fef2f2",
      items: [
        { name: "Integration Testing", topics: ["Cucumber BDD Gherkin", "Feature Logic Mapping", "Step Definition Logic", "Test Automation Setup"] },
        { name: "Automated Checks", topics: ["Selenium WebDriver JS", "Finding Elements & Locators", "End-to-End Test Suites", "Reporting & Debugging"] }
      ]
    },
    {
      category: "8. DevOps & Cloud Ops",
      icon: <Zap className="icon-amber" size={24} />,
      bgColor: "#fffbeb",
      items: [
        { name: "Version Control", topics: ["Git Branching Strategies", "Conflict Resolution", "Remote Repository Management", "GitHub Actions"] },
        { name: "Infrastructure", topics: ["Docker Containerization", "Kubernetes (K8s) Basics", "AWS EC2 Deployment", "S3 Storage & CloudWatch"] }
      ]
    }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .mern-wrapper {
          max-width: 1240px;
          margin: 0 auto;
          background-color: #f8fafc;
          padding: 20px 20px 60px;
        }

        .back-nav { padding: 15px 0; margin-bottom: 30px; display: flex; align-items: center; }

        .back-btn {
          background: white; color: #1e293b; border: 1px solid #e2e8f0; padding: 10px 20px;
          border-radius: 12px; font-weight: 600; cursor: pointer; display: inline-flex;
          align-items: center; gap: 10px; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        
        .back-btn:hover { background: #f1f5f9; transform: translateX(-5px); }

        .info-card-top {
          background: white; padding: 35px; border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.04);
          margin-bottom: 35px; border: 1px solid #f1f5f9;
        }

        .info-card-top h2 { margin: 0 0 20px; color: #0f172a; font-size: 2.2rem; font-weight: 800; }

        .top-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }

        .meta-box { padding: 20px; background: #fcfcfd; border-radius: 16px; border: 1px solid #f3f4f6; }
        .meta-box b { display: block; color: #64748b; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 5px; }
        .meta-box p { margin: 0; color: #1e293b; font-weight: 700; font-size: 1.1rem; }

        .main-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 35px; margin-bottom: 45px; }

        .intro-card { background: white; padding: 40px; border-radius: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #f1f5f9; }
        .intro-card h2, .intro-card h3 { margin: 0 0 20px; color: #0f172a; font-weight: 800; }
        .intro-card p { color: #475569; line-height: 1.8; font-size: 1.1rem; }

        .company-field { margin-bottom: 20px; }
        .company-field b { display: block; color: #64748b; font-size: 0.85rem; margin-bottom: 4px; }
        .company-field p { margin: 0; color: #1e293b; font-weight: 600; }

        .enroll-btn {
          width: 100%; background: #2563eb; color: white; padding: 18px; border-radius: 16px;
          font-weight: 700; border: none; cursor: pointer; font-size: 1.1rem; transition: all 0.3s;
        }

        .enroll-btn:hover { background: #1d4ed8; transform: translateY(-3px); }

        .cat-card { background: white; border-radius: 28px; padding: 40px; margin-bottom: 45px; border: 1px solid #f1f5f9; }

        .cat-header { display: flex; align-items: center; gap: 18px; margin-bottom: 35px; padding-bottom: 18px; border-bottom: 2px solid #f8fafc; }
        .cat-header h3 { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin: 0; }

        .item-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 30px; }

        .tech-box { padding: 30px; border-radius: 20px; transition: all 0.3s; }
        .tech-box:hover { transform: translateY(-8px); box-shadow: 0 15px 30px -10px rgba(0,0,0,0.1); }
        .tech-box h4 { margin: 0 0 15px; font-size: 1.3rem; font-weight: 750; color: #0f172a; }

        .topic-ul { list-style: none; padding: 0; margin: 0; }
        .topic-ul li { font-size: 1rem; color: #334155; padding: 8px 0; display: flex; align-items: center; gap: 12px; }
        .bullet { width: 8px; height: 8px; border-radius: 50%; background: #2563eb; flex-shrink: 0; }

        .icon-blue { color: #2563eb; }
        .icon-green { color: #16a34a; }
        .icon-purple { color: #9333ea; }
        .icon-red { color: #dc2626; }
        .icon-sky { color: #0ea5e9; }
        .icon-amber { color: #f59e0b; }
        .icon-emerald { color: #10b981; }

      `}</style>

      <div className="mern-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="info-card-top">
          <h2>MERN Development Internship</h2>
          <div className="top-grid">
            <div className="meta-box"><b>Type</b><p>Paid</p></div>
            <div className="meta-box"><b>Duration</b><p>6 Months</p></div>
            <div className="meta-box"><b>Mode</b><p>Offline</p></div>
            <div className="meta-box"><b>Deadline</b><p>2026-08-31</p></div>
            <div className="meta-box"><b>Fees</b><p>₹22,000</p></div>
            <div className="meta-box"><b>Location</b><p>Mailoor, Bidar</p></div>
          </div>
        </div>

        <div className="main-grid">
          <div className="intro-card">
            <h2>Modern MERN Application Mastery</h2>
            <p><b>Description:</b> Master the most in-demand web stack. Learn to build high-performance JavaScript applications using MongoDB, Express, React, and Node.js with a focus on real-time data and scalability.</p>
            <p><b>About Internship:</b> Transition from student to developer with our hands-on MERN program. You will architect end-to-end cloud applications and master the modern DevOps landscape.</p>
          </div>

          <div className="intro-card company-info">
            <div className="company-field"><b>Year Founded</b><p>2024</p></div>
            <div className="company-field"><b>Official Website</b><p>techmasterstrainings.com</p></div>
            <div className="company-field"><b>Address</b><p>Mailoor, Bidar, Karnataka</p></div>
            <div className="company-field"><b>Email Contact</b><p>techmasterstrainings@gmail.com</p></div>
            <button className="enroll-btn">Apply For Program</button>
          </div>
        </div>

        <div className="syllabus-wrap">
          <h2 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px'}}>MERN Specialist Roadmap</h2>
          {syllabus.map((section, idx) => (
            <div className="cat-card" key={idx}>
              <div className="cat-header">{section.icon}<h3>{section.category}</h3></div>
              <div className="item-grid">
                {section.items.map((tech, tIdx) => (
                  <div className="tech-box" key={tIdx} style={{ backgroundColor: section.bgColor }}>
                    <h4>{tech.name}</h4>
                    <ul className="topic-ul">
                      {tech.topics.map((topic, pIdx) => (<li key={pIdx}><div className="bullet" />{topic}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MernDevelopment;
