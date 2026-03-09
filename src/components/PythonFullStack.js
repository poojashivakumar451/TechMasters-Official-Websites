import React from 'react';
import { ArrowLeft, Layout, Server, Database as DbIcon, ShieldCheck, Cloud, Code, Globe, Zap, Terminal } from 'lucide-react';

const PythonFullStack = () => {
  const handleBack = () => {
    window.location.href = '/services';
  };

  const syllabus = [
    {
      category: "1. HTML5 & Web Structure",
      icon: <Layout className="icon-blue" size={24} />,
      bgColor: "#eff6ff",
      items: [
        { name: "Markup Essentials", topics: ["Document Object Model", "Semantic HTML5 Elements", "Advanced Forms & Inputs", "SVG & Canvas Graphics"] },
        { name: "SEO Basics", topics: ["Meta Tags Optimization", "Accessibility (WAI-ARIA)", "Structured Data", "Sitemaps & Robots"] }
      ]
    },
    {
      category: "2. CSS3 & Design Systems",
      icon: <Layout className="icon-sky" size={24} />,
      bgColor: "#f0f9ff",
      items: [
        { name: "Modern Layouts", topics: ["Flexbox Architecture", "CSS Grid Mastery", "Mobile-First Design", "Responsive Media Queries"] },
        { name: "Advanced Styling", topics: ["SASS/SCSS Fundamentals", "CSS Variables", "Keyframe Animations", "Glassmorphism & Gradients"] }
      ]
    },
    {
      category: "3. JavaScript Development",
      icon: <Code className="icon-green" size={24} />,
      bgColor: "#f0fdf4",
      items: [
        { name: "Modern JS (ES6+)", topics: ["Arrow Functions & Destructuring", "Promises & Async/Await", "Fetch API Integration", "Template Literals"] },
        { name: "Dynamic UI", topics: ["Event Loops & Listeners", "DOM Manipulation", "Object-Oriented JS", "Modular JavaScript"] }
      ]
    },
    {
      category: "4. Angular Framework",
      icon: <Globe className="icon-red" size={24} />,
      bgColor: "#fef2f2",
      items: [
        { name: "Angular Basics", topics: ["CLI & Components", "Templates & Directives", "Data Binding (1-way/2-way)", "Services & Providers"] },
        { name: "Angular Advanced", topics: ["Observables & RxJS", "Reactive Forms", "Routing & Guards", "Dependency Injection"] }
      ]
    },
    {
      category: "5. Python Core Mastery",
      icon: <Terminal className="icon-blue" size={24} />,
      bgColor: "#eff6ff",
      items: [
        { name: "Python Logic", topics: ["Data Structures & Collections", "Functional Programming", "Decorators & Generators", "List Comprehensions"] },
        { name: "Advance OOPs", topics: ["Classes & Inheritance", "Method Overloading", "Abstract Base Classes", "Packages & Modules"] }
      ]
    },
    {
      category: "6. Django Backend",
      icon: <Server className="icon-emerald" size={24} />,
      bgColor: "#ecfdf5",
      items: [
        { name: "Django Core", topics: ["MTV Architecture", "Models & ORM Queries", "Class-based Views", "Forms & Formsets"] },
        { name: "Django REST (DRF)", topics: ["Serializers", "Viewsets & Routers", "Token Authentication", "Permissions & Throttling"] }
      ]
    },
    {
      category: "7. Database Engineering",
      icon: <DbIcon className="icon-purple" size={24} />,
      bgColor: "#f5f3ff",
      items: [
        { name: "NoSQL (MongoDB)", topics: ["BSON Data Structure", "Indexing & Sharding", "Aggregation Framework", "Cloud Atlas Setup"] },
        { name: "Big Data (Cassandra)", topics: ["Partitioning Strategy", "CQL Queries", "Data Replication", "Peer-to-Peer Architecture"] }
      ]
    },
    {
      category: "8. Testing & QA Automation",
      icon: <ShieldCheck className="icon-amber" size={24} />,
      bgColor: "#fffbeb",
      items: [
        { name: "BDD & Cucumber", topics: ["Gherkin Feature Writing", "Step Definitions", "Test Hooks", "Reporting Graphs"] },
        { name: "Selenium & Mockito", topics: ["WebDriver Automation", "Mocking Remote APIs", "Handling Dynamic Elements", "Parallel Test Execution"] }
      ]
    },
    {
      category: "9. Cloud & Deployment",
      icon: <Zap className="icon-sky" size={24} />,
      bgColor: "#f0f9ff",
      items: [
        { name: "CI/CD & Git", topics: ["GitHub Actions", "Jenkins Pipelines", "Dockerizing Python Apps", "Linux Server Essentials"] },
        { name: "AWS Cloud", topics: ["EC2 Instance Hosting", "S3 Media Storage", "Lambda Functions", "CloudWatch Monitoring"] }
      ]
    }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .python-wrapper {
          max-width: 1240px;
          margin: 0 auto;
          background-color: #f8fafc;
          padding: 20px 20px 60px;
        }

        .back-nav {
          padding: 15px 0;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
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
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        
        .back-btn:hover {
          background: #f1f5f9;
          transform: translateX(-5px);
        }

        .info-card-top {
          background: white;
          padding: 35px;
          border-radius: 24px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.04);
          margin-bottom: 35px;
          border: 1px solid #f1f5f9;
        }

        .info-card-top h2 {
          margin: 0 0 20px;
          color: #0f172a;
          font-size: 2.2rem;
          font-weight: 800;
        }

        .top-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .meta-box {
          padding: 20px;
          background: #fcfcfd;
          border-radius: 16px;
          border: 1px solid #f3f4f6;
        }

        .meta-box b { display: block; color: #64748b; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 5px; }
        .meta-box p { margin: 0; color: #1e293b; font-weight: 700; font-size: 1.1rem; }

        .main-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 35px;
          margin-bottom: 45px;
        }

        @media (max-width: 968px) { .main-grid { grid-template-columns: 1fr; } }

        .intro-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
        }

        .intro-card h2, .intro-card h3 { margin: 0 0 20px; color: #0f172a; font-weight: 800; }
        .intro-card p { color: #475569; line-height: 1.8; font-size: 1.1rem; }

        .company-field { margin-bottom: 20px; }
        .company-field b { display: block; color: #64748b; font-size: 0.85rem; margin-bottom: 4px; }
        .company-field p { margin: 0; color: #1e293b; font-weight: 600; }

        .enroll-btn {
          width: 100%;
          background: #2563eb;
          color: white;
          padding: 18px;
          border-radius: 16px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.3s;
        }

        .enroll-btn:hover { background: #1d4ed8; transform: translateY(-3px); }

        .cat-card {
          background: white;
          border-radius: 28px;
          padding: 40px;
          margin-bottom: 45px;
          border: 1px solid #f1f5f9;
        }

        .cat-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 35px;
          padding-bottom: 18px;
          border-bottom: 2px solid #f8fafc;
        }

        .cat-header h3 { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin: 0; }

        .item-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 30px;
        }

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

      <div className="python-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="info-card-top">
          <h2>Python Full Stack Internship</h2>
          <div className="top-grid">
            <div className="meta-box"><b>Type</b><p>Paid</p></div>
            <div className="meta-box"><b>Duration</b><p>6 Months</p></div>
            <div className="meta-box"><b>Mode</b><p>Offline</p></div>
            <div className="meta-box"><b>Deadline</b><p>2026-12-31</p></div>
            <div className="meta-box"><b>Fees</b><p>₹22,000</p></div>
            <div className="meta-box"><b>Location</b><p>Beside GND College, Bidar</p></div>
          </div>
        </div>

        <div className="main-grid">
          <div className="intro-card">
            <h2>Master Python Ecosystem</h2>
            <p><b>Description:</b> Python Full Stack Development focuses on building high-performance web applications using Django backend, Angular/React frontend, and modern NoSQL databases.</p>
            <p><b>About Internship:</b> Join our 6-month elite program to master Python programming, full stack development, and AI integration. We provide hands-on training on enterprise-grade projects.</p>
          </div>

          <div className="intro-card company-info">
            <div className="company-field"><b>Year Founded</b><p>2024</p></div>
            <div className="company-field"><b>Global Website</b><p>techmasterstrainings.com</p></div>
            <div className="company-field"><b>Address</b><p>Beside GND Engineering College, Mailoor, Bidar</p></div>
            <div className="company-field"><b>Official Email</b><p>techmasterstrainings@gmail.com</p></div>
            <button className="enroll-btn">Apply Now</button>
          </div>
        </div>

        <div className="syllabus-wrap">
          <h2 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px'}}>Full Stack Career Roadmap</h2>
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

export default PythonFullStack;
