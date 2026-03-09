import React from 'react';
import { ArrowLeft, Layout, Server, Database as DbIcon, ShieldCheck, Code, Globe, Zap, Terminal } from 'lucide-react';

const JavaFullStack = () => {
  const handleBack = () => {
    window.location.href = '/services';
  };

  const syllabus = [
    {
      category: "1. HTML & CSS",
      icon: <Layout className="icon-blue" size={24} />,
      bgColor: "#eff6ff",
      items: [
        { name: "Modern HTML5", topics: ["Document Structure", "Elements & Attributes", "Web Forms & Validation", "Semantic HTML Implementation"] },
        { name: "Advanced Styling", topics: ["CSS3 Flexbox & Grid", "Responsive Design with Media Queries", "Animations & Keyframes", "CSS Variables & Themes"] }
      ]
    },
    {
      category: "2. JavaScript Essentials",
      icon: <Code className="icon-green" size={24} />,
      bgColor: "#f0fdf4",
      items: [
        { name: "Core JavaScript", topics: ["ES6+ Syntax Essentials", "Arrays & Object Manipulation", "DOM Manipulation & Events", "Asynchronous Programming (Fetch/Async)"] },
        { name: "Web APIs", topics: ["Working with LocalStorage", "JSON Data Handling", "Browser Objects (BOM)", "Modern Debugging Techniques"] }
      ]
    },
    {
      category: "3. React Framework",
      icon: <Globe className="icon-purple" size={24} />,
      bgColor: "#f5f3ff",
      items: [
        { name: "React Fundamentals", topics: ["JSX & Vertical DOM", "Component Architecture", "State Management (useState/useReducer)", "Props & Functional Components"] },
        { name: "Advanced React", topics: ["Hooks (useEffect/useContext)", "React Router & Navigation", "Redux & Context API Basics", "Third-party Library Integration"] }
      ]
    },
    {
      category: "4. Java Core Mastery",
      icon: <Terminal className="icon-red" size={24} />,
      bgColor: "#fef2f2",
      items: [
        { name: "OOPs Principles", topics: ["Inheritance, Polymorphism", "Abstraction & Interfaces", "Encapsulation Best Practices", "Exception Handling Strategies"] },
        { name: "Advanced Java", topics: ["Java Collections Framework", "Multithreading & Concurrency", "Lambda Expressions & Streams", "File I/O & Serialization"] }
      ]
    },
    {
      category: "5. Spring Boot & Microservices",
      icon: <Server className="icon-sky" size={24} />,
      bgColor: "#f0f9ff",
      items: [
        { name: "Spring Ecosystem", topics: ["Spring MVC Architecture", "Spring Boot CLI & Starters", "REST API Development", "Dependency Injection (DI/IOC)"] },
        { name: "Microservice Design", topics: ["Spring Data JPA Integration", "Spring Security & JWT", "Service Discovery (Eureka)", "Load Balancing & Config Server"] }
      ]
    },
    {
      category: "6. Database Management",
      icon: <DbIcon className="icon-amber" size={24} />,
      bgColor: "#fffbeb",
      items: [
        { name: "Relational SQL", topics: ["Database Schema Design", "Complex Joins & Subqueries", "Stored Procedures & Triggers", "Indexes & Performance Tuning"] },
        { name: "Data Handling", topics: ["CRUD Operations", "Transactions & ACID", "Database Migration Pipelines", "Query Optimization"] }
      ]
    },
    {
      category: "7. Testing & Automation",
      icon: <ShieldCheck className="icon-emerald" size={24} />,
      bgColor: "#ecfdf5",
      items: [
        { name: "Automation Tools", topics: ["Selenium WebDriver Basics", "Cucumber BDD & Feature Files", "Page Object Model (POM)", "Automation Reporting with Extent"] },
        { name: "Unit Testing", topics: ["JUnit 5 Framework", "Mockito Mocking Techniques", "Integration Testing Basics", "Test-driven Development (TDD)"] }
      ]
    },
    {
      category: "8. DevOps & Deployment",
      icon: <Zap className="icon-violet" size={24} />,
      bgColor: "#f5f3ff",
      items: [
        { name: "Version Control", topics: ["Git Advanced Workflows", "Branching & Merging", "Collaborative GitHub Practices", "Conflict Resolution"] },
        { name: "CI/CD & Cloud", topics: ["Jenkins Pipeline Setup", "Docker Containerization", "AWS EC2 & S3 Deployment", "Monitoring & Logging Basics"] }
      ]
    }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .java-wrapper {
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        
        .back-btn:hover {
          background: #f1f5f9;
          transform: translateX(-5px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
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
          letter-spacing: -0.025em;
        }

        .top-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .meta-box {
          padding: 20px;
          background: #fcfcfd;
          border-radius: 16px;
          border: 1px solid #f3f4f6;
        }

        .meta-box b {
          display: block;
          color: #64748b;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .meta-box p {
          margin: 0;
          color: #1e293b;
          font-weight: 700;
          font-size: 1.15rem;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 35px;
          margin-bottom: 45px;
        }

        @media (max-width: 968px) {
          .main-grid { grid-template-columns: 1fr; }
        }

        .intro-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
        }

        .intro-card h2, .intro-card h3 {
          margin: 0 0 20px;
          color: #0f172a;
          font-weight: 800;
        }

        .intro-card p {
          color: #475569;
          line-height: 1.8;
          font-size: 1.1rem;
          margin-bottom: 25px;
        }

        .company-header-box {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f8fafc;
        }

        .company-field { margin-bottom: 22px; }
        .company-field b { display: block; color: #64748b; font-size: 0.85rem; margin-bottom: 6px; }
        .company-field p { margin: 0; color: #1e293b; font-weight: 600; font-size: 1.1rem; }

        .enroll-msg-btn {
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
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }

        .enroll-msg-btn:hover {
          background: #1d4ed8;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }

        .syllabus-wrap {
          margin-top: 20px;
        }

        .cat-card {
          background: white;
          border-radius: 28px;
          padding: 40px;
          margin-bottom: 45px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }

        .cat-header-row {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 35px;
          padding-bottom: 18px;
          border-bottom: 2px solid #f8fafc;
        }

        .cat-header-row h3 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .item-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 30px;
        }

        .tech-box {
          padding: 30px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .tech-box:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px -10px rgba(0,0,0,0.1);
        }

        .tech-box h4 {
          margin: 0 0 20px;
          font-size: 1.3rem;
          font-weight: 750;
          color: #0f172a;
        }

        .topic-ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .topic-ul li {
          font-size: 1rem;
          color: #334155;
          padding: 8px 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2563eb;
          flex-shrink: 0;
        }

        .icon-blue { color: #2563eb; }
        .icon-green { color: #16a34a; }
        .icon-purple { color: #9333ea; }
        .icon-red { color: #dc2626; }
        .icon-sky { color: #0ea5e9; }
        .icon-amber { color: #f59e0b; }
        .icon-emerald { color: #10b981; }
        .icon-violet { color: #8b5cf6; }

      `}</style>

      <div className="java-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="info-card-top">
          <h2>Java Full Stack Internship</h2>
          <div className="top-grid">
            <div className="meta-box">
              <b>Type</b>
              <p>Paid</p>
            </div>
            <div className="meta-box">
              <b>Duration</b>
              <p>6 Months</p>
            </div>
            <div className="meta-box">
              <b>Mode</b>
              <p>Offline</p>
            </div>
            <div className="meta-box">
              <b>Deadline</b>
              <p>2026-08-31</p>
            </div>
            <div className="meta-box">
              <b>Fees</b>
              <p>₹22,000</p>
            </div>
            <div className="meta-box">
              <b>Location</b>
              <p>Mailoor, Bidar</p>
            </div>
          </div>
        </div>

        <div className="main-grid">
          <div className="intro-card">
            <h2>Welcome to Java Full Stack Mastery</h2>
            <p><b>Description:</b> Java Full Stack refers to the comprehensive skill set required to architect, develop, and deploy entire web applications. You will master both front-end aesthetics and back-end logic powered by the Java ecosystem.</p>
            <p><b>About Internship:</b> This 6-month intensive program transforms students into industry-ready engineers. You will build and deploy real-world banking and e-commerce portals while mastering Spring Boot microservices and modern React interfaces.</p>
          </div>

          <div className="intro-card company-info">
            <div className="company-header-box">
              <h3>TechMasters Software</h3>
            </div>
            <div className="company-field">
              <b>Year Founded</b>
              <p>2024</p>
            </div>
            <div className="company-field">
              <b>Global Website</b>
              <p>techmasterstrainings.com</p>
            </div>
            <div className="company-field">
              <b>Corporate Address</b>
              <p>Beside GND Engineering College, Mailoor, Bidar, Karnataka</p>
            </div>
            <div className="company-field">
              <b>Official Email</b>
              <p>techmasterstrainings@gmail.com</p>
            </div>
            <button className="enroll-msg-btn">Enroll / Send Message</button>
          </div>
        </div>

        <div className="syllabus-header" style={{textAlign: 'center', marginBottom: '50px'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '10px'}}>Complete Course Roadmap</h2>
          <p style={{color: '#64748b', fontSize: '1.2rem'}}>A step-by-step guide to becoming a professional Java Full Stack Engineer</p>
        </div>

        <div className="syllabus-wrap">
          {syllabus.map((section, idx) => (
            <div className="cat-card" key={idx}>
              <div className="cat-header-row">
                {section.icon}
                <h3>{section.category}</h3>
              </div>
              <div className="item-grid">
                {section.items.map((tech, tIdx) => (
                  <div className="tech-box" key={tIdx} style={{ backgroundColor: section.bgColor }}>
                    <h4>{tech.name}</h4>
                    <ul className="topic-ul">
                      {tech.topics.map((topic, pIdx) => (
                        <li key={pIdx}><div className="bullet" /> {topic}</li>
                      ))}
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

export default JavaFullStack;
