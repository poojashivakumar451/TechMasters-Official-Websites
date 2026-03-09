import React from 'react';
import { ArrowLeft, Cpu, Cloud, Layers, Box, Globe, ShieldCheck, Zap, Monitor, Activity, Terminal } from 'lucide-react';

const CloudComputing = () => {
  const handleBack = () => {
    window.location.href = '/services';
  };

  const syllabus = [
    {
      category: "1. Computing Paradigms",
      icon: <Cpu className="icon-blue" size={24} />,
      bgColor: "#eff6ff",
      items: [
        { name: "Foundational Paradigms", topics: ["High Performance Computing (HPC)", "Parallel Computing Concepts", "Distributed Computing Systems", "Cluster Computing Architecture"] },
        { name: "Specialized Architectures", topics: ["Grid Computing Environment", "Mobile Computing Basics", "Bio & Quantum Computing", "Nano Computing Technologies"] }
      ]
    },
    {
      category: "2. Cloud Computing Fundamentals",
      icon: <Cloud className="icon-green" size={24} />,
      bgColor: "#f0fdf4",
      items: [
        { name: "Cloud Origins", topics: ["Evolution of Cloud Technology", "Defining Cloud Architecture", "Motivation & Core Characteristics"] },
        { name: "Cloud Landscape", topics: ["Cloud Ecosystem & Components", "Deployment Models (Public/Private/Hybrid)", "Cloud Infrastructure Overview", "Advantages & Limitations"] }
      ]
    },
    {
      category: "3. Cloud Architecture and Management",
      icon: <Layers className="icon-purple" size={24} />,
      bgColor: "#f5f3ff",
      items: [
        { name: "System Design", topics: ["Cloud Architecture Layers", "Anatomy of the Cloud", "Network Connectivity in Cloud", "Cloud Application Design"] },
        { name: "Operations", topics: ["Infrastructure Management", "Deployment Strategies", "Cloud Migration Techniques", "Phases & Planning", "Managing Cloud Resources"] }
      ]
    },
    {
      category: "4. Cloud Service Models",
      icon: <Box className="icon-sky" size={24} />,
      bgColor: "#f0f9ff",
      items: [
        { name: "IaaS & PaaS", topics: ["Infrastructure as a Service (IaaS)", "PaaS Architecture & Pros/Cons", "IaaS Characteristics", "Environment Provisioning"] },
        { name: "SaaS & Beyond", topics: ["Software as a Service (SaaS)", "SaaS Architecture & Apps", "Comparison of IaaS, PaaS, SaaS", "Service Model Selection"] }
      ]
    },
    {
      category: "5. Cloud Service Providers",
      icon: <Globe className="icon-red" size={24} />,
      bgColor: "#fef2f2",
      items: [
        { name: "Market Leaders", topics: ["Amazon Web Services (AWS)", "Google Cloud Platform (GCP)", "Microsoft Azure", "IBM Cloud Services"] },
        { name: "Specialized Platforms", topics: ["SAP HANA Cloud", "Salesforce Cloud", "Rackspace Hosting", "VMware Virtualization", "Aneka Cloud Platform"] }
      ]
    },
    {
      category: "6. Security & Infrastructure",
      icon: <ShieldCheck className="icon-amber" size={24} />,
      bgColor: "#fffbeb",
      items: [
        { name: "Cloud Privacy", topics: ["Identity Access Management (IAM)", "Cloud Cryptography Basics", "VPC & Network Security", "Compliance & Governance"] },
        { name: "High Availability", topics: ["Disaster Recovery Systems", "Cloud Backup Strategy", "Load Balancing & Auto-scaling", "Monitoring (CloudWatch/Monitor)"] }
      ]
    }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .cloud-wrapper {
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
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
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

        .company-field {
          margin-bottom: 22px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f8fafc;
        }

        .company-field b { display: block; color: #64748b; font-size: 0.85rem; margin-bottom: 6px; }
        .company-field p { margin: 0; color: #1e293b; font-weight: 600; font-size: 1.1rem; }

        .enroll-msg-btn {
          width: 100%;
          background: #2f64ff;
          color: white;
          padding: 18px;
          border-radius: 16px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(47, 100, 255, 0.2);
        }

        .enroll-msg-btn:hover {
          background: #1d4ed8;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(47, 100, 255, 0.3);
        }

        .cat-card {
          background: white;
          border-radius: 28px;
          padding: 40px;
          margin-bottom: 40px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);
        }

        .cat-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 35px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f8fafc;
        }

        .cat-header h3 {
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
          margin: 0 0 18px;
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
          font-size: 1.05rem;
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
          background: #2f64ff;
          flex-shrink: 0;
        }

        .icon-blue { color: #2f64ff; }
        .icon-green { color: #16a34a; }
        .icon-purple { color: #8b5cf6; }
        .icon-red { color: #dc2626; }
        .icon-sky { color: #0ea5e9; }
        .icon-amber { color: #f59e0b; }

      `}</style>

      <div className="cloud-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="info-card-top">
          <h2>Cloud Internship</h2>
          <div className="top-grid">
            <div className="meta-box"><b>Internship Type</b><p>Paid</p></div>
            <div className="meta-box"><b>Duration</b><p>6 Months</p></div>
            <div className="meta-box"><b>Internship Mode</b><p>Offline</p></div>
            <div className="meta-box"><b>Deadline</b><p>2026-08-31</p></div>
            <div className="meta-box"><b>Fees</b><p>₹15,000</p></div>
            <div className="meta-box"><b>Location</b><p>Beside GND College, Bidar</p></div>
          </div>
        </div>

        <div className="main-grid">
          <div className="intro-card">
            <h2>Welcome to Cloud Computing</h2>
            <p><b>Description:</b> Cloud Computing refers to delivering computing services such as servers, storage, databases, networking, software, and analytics over the internet to offer faster innovation, flexible resources, and economies of scale.</p>
            <p><b>About Internship:</b> This internship provides practical training in cloud computing technologies and platforms. Students gain hands-on experience in deploying applications, managing cloud infrastructure, and working with modern cloud platforms used in industry.</p>
          </div>

          <div className="intro-card company-info">
            <h3>TechMasters Training</h3>
            <div className="company-field">
              <b>Year Founded</b>
              <p>2024</p>
            </div>
            <div className="company-field">
              <b>Website</b>
              <p>techmasterstrainings.com</p>
            </div>
            <div className="company-field">
              <b>Corporate Address</b>
              <p>Beside GND Engineering College, Mailoor, Bidar, Karnataka</p>
            </div>
            <div className="company-field">
              <b>Email Contact</b>
              <p>techmasterstrainings@gmail.com</p>
            </div>
            <button className="enroll-msg-btn">Send Message</button>
          </div>
        </div>

        <div style={{textAlign: 'center', marginBottom: '50px', marginTop: '60px'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: '800', color: '#0f172a'}}>Cloud Computing Course Syllabus</h2>
          <p style={{color: '#64748b', fontSize: '1.2rem'}}>Distributed Architectures, Service Models, and Enterprise Cloud Solutions</p>
        </div>

        <div className="syllabus-wrap">
          {syllabus.map((section, idx) => (
            <div className="cat-card" key={idx}>
              <div className="cat-header">
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

export default CloudComputing;
