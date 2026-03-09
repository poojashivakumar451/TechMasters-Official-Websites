import React from 'react';
import { ArrowLeft, Layout, Server, Database as DbIcon, ShieldCheck, Cloud } from 'lucide-react';

const DevOpsInternship = () => {
  const handleBack = () => {
    window.location.href = '/services';
  };

  const syllabus = [
    {
      category: "1. Frontend",
      icon: <Layout className="icon-blue" size={24} />,
      bgColor: "#eff6ff",
      items: [
        { name: "Web Hosting", topics: ["Nginx & Apache Setup", "SSL/TLS Configuration", "Static Site Deployment", "CDN Integration"] },
        { name: "UI Observability", topics: ["Frontend Monitoring", "User Experience Tracking", "Real User Monitoring (RUM)", "Client-side Performance"] }
      ]
    },
    {
      category: "2. Backend",
      icon: <Server className="icon-green" size={24} />,
      bgColor: "#f0fdf4",
      items: [
        { name: "Microservices", topics: ["Docker Containerization", "Kubernetes Orchestration", "API Gateways", "Service Mesh (Istio)"] },
        { name: "Scripting", topics: ["Python for Automation", "Bash Shell Scripting", "Backend Infrastructure as Code", "Go for DevOps"] }
      ]
    },
    {
      category: "3. Database",
      icon: <DbIcon className="icon-purple" size={24} />,
      bgColor: "#f5f3ff",
      items: [
        { name: "Data Persistence", topics: ["Database Containerization", "StatefulSets in K8s", "Database Migration Pipelines", "High Availability"] },
        { name: "Monitoring", topics: ["Query Performance Tracking", "DB Health Checks", "Backup Automation", "Scaling Strategies"] }
      ]
    },
    {
      category: "4. Deployment",
      icon: <Cloud className="icon-sky" size={24} />,
      bgColor: "#f0f9ff",
      items: [
        { name: "CI/CD Pipelines", topics: ["Jenkins Pipelines", "GitHub Actions", "Azure DevOps", "Blue-Green Deployment"] },
        { name: "Cloud Infrastructure", topics: ["Terraform (IaC)", "AWS/Azure/GCP Setup", "Auto Scaling", "Serverless Deployment"] }
      ]
    },
    {
      category: "5. Testing",
      icon: <ShieldCheck className="icon-red" size={24} />,
      bgColor: "#fef2f2",
      items: [
        { name: "Automated Testing", topics: ["Unit Test Integration", "Security Scanning (SAST/DAST)", "Load Testing (JMeter)", "Selenium in CI/CD"] },
        { name: "Quality Gates", topics: ["SonarQube Analysis", "Coverage Reports", "Performance Benchmarking", "Pipeline Rollbacks"] }
      ]
    }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .devops-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          background-color: #f3f3f3;
          padding: 20px 0 60px;
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
          transition: all 0.3s ease;
        }
        
        .back-btn:hover {
          background: #123e72;
          color: white;
          border-color: #123e72;
        }

        .content-body {
          padding: 30px 5%;
        }

        .info-card-top {
          background: white;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          margin-bottom: 25px;
        }

        .info-card-top h2 {
          margin: 0 0 15px;
          color: #000;
          font-size: 1.6rem;
        }

        .info-card-top hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 15px 0;
        }

        .top-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .top-grid p {
          margin: 8px 0;
          color: #334155;
          font-size: 0.95rem;
        }

        .top-grid b {
          color: #000;
        }

        .main-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 25px;
          margin-bottom: 25px;
        }

        @media (max-width: 968px) {
          .main-row {
            grid-template-columns: 1fr;
          }
        }

        .sub-info-card {
          background: white;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .sub-info-card h2, .sub-info-card h3 {
          margin: 0 0 15px;
          color: #000;
        }

        .sub-info-card p {
          color: #475569;
          line-height: 1.6;
          margin-bottom: 15px;
          font-size: 0.95rem;
        }

        .company-field {
          margin-bottom: 15px;
        }

        .company-field b {
          display: block;
          margin-bottom: 4px;
          font-size: 1.05rem;
          color: #000;
        }

        .msg-button {
          display: inline-block;
          background: #2563eb;
          color: white;
          padding: 12px 25px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          border: none;
          width: 100%;
          text-align: center;
          transition: background 0.3s;
        }

        .msg-button:hover {
          background: #1d4ed8;
        }

        /* Syllabus Grid */
        .syllabus-header {
          margin-top: 40px;
          margin-bottom: 20px;
        }

        .syllabus-category {
          margin-bottom: 40px;
        }

        .category-title-box {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
        }

        .category-title-box h3 {
          font-size: 1.4rem;
          margin: 0;
          color: #1e293b;
        }

        .tech-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        .tech-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, border-color 0.2s;
        }

        .tech-card:hover {
          transform: translateY(-4px);
          border-color: #2563eb;
        }

        .tech-card h4 {
          margin: 0 0 12px;
          color: #2563eb;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .topic-ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .topic-ul li {
          font-size: 0.9rem;
          color: #64748b;
          padding: 3px 0;
          position: relative;
          padding-left: 15px;
        }

        .topic-ul li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #cbd5e1;
        }

        .icon-blue { color: #2563eb; }
        .icon-green { color: #16a34a; }
        .icon-purple { color: #9333ea; }
        .icon-red { color: #dc2626; }
        .icon-sky { color: #0ea5e9; }

      `}</style>

      <div className="devops-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="content-body">
          
          <div className="info-card-top">
            <h2>DevOps Internship</h2>
            <hr />
            <div className="top-grid">
              <div>
                <p><b>Internship Type:</b> Paid</p>
                <p><b>Duration:</b> 6 Months</p>
              </div>
              <div>
                <p><b>Internship Mode:</b> Offline</p>
                <p><b>Deadline:</b> 2026-12-31</p>
              </div>
              <div>
                <p><b>Fees:</b> ₹15,000</p>
                <p><b>Internship Location:</b> Beside GND Engineering College, Mailoor, Bidar, Karnataka</p>
              </div>
            </div>
          </div>

          <div className="main-row">
            <div className="sub-info-card">
              <h2>Welcome to DevOps Internship</h2>
              <p><b>Description:</b> DevOps is a combination of development and operations practices that aims to shorten the system development life cycle and deliver high-quality software continuously. DevOps integrates automation, CI/CD pipelines, cloud platforms, monitoring, containerization, and infrastructure management.</p>
              <p><b>About Internship:</b> This internship provides hands-on experience in DevOps tools and practices. Students learn version control with Git, containerization using Docker, orchestration with Kubernetes, CI/CD pipelines using Jenkins and GitHub Actions, cloud deployments, infrastructure automation, and monitoring.</p>
            </div>

            <div className="sub-info-card">
              <h3>TechMasters Training Software Private Limited</h3>
              <hr />
              <div className="company-field">
                <b>Year Founded</b>
                <p>2024</p>
              </div>
              <div className="company-field">
                <b>Website</b>
                <p>https://techmasterstrainings.com</p>
              </div>
              <div className="company-field">
                <b>Address</b>
                <p>Beside GND Engineering College, Mailoor, Bidar, Karnataka</p>
              </div>
              <div className="company-field">
                <b>Email</b>
                <p>techmasterstrainings@gmail.com</p>
              </div>
              <button className="msg-button">Send Message</button>
            </div>
          </div>

          <div className="syllabus-header">
            <h2 className="text-3xl font-bold">DevOps Professional Syllabus</h2>
            <hr style={{margin: '20px 0', borderTop: '1px solid #ddd'}} />
          </div>

          {syllabus.map((section, idx) => (
            <div className="syllabus-category" key={idx}>
              <div className="category-title-box">
                {section.icon}
                <h3>{section.category}</h3>
              </div>
              <div className="tech-cards-grid">
                {section.items.map((tech, tIdx) => (
                  <div className="tech-card" key={tIdx} style={{ backgroundColor: section.bgColor }}>
                    <h4>{tech.name}</h4>
                    <ul className="topic-ul">
                      {tech.topics.map((topic, pIdx) => (
                        <li key={pIdx}>{topic}</li>
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

export default DevOpsInternship;
