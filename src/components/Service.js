import React, { useState } from 'react';
import { Target, Briefcase, Rocket, FlaskConical, Zap, Trophy, MapPin, Monitor } from 'lucide-react';

const Service = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  const companyName = "TechMasters Software Private Limited";
  const location = "Bidar (Karnataka)";
  const workMode = "Offline Training";

  const tagDescriptions = {
    "TCS NQT": "TCS National Qualifier Test (NQT) is a multi-level assessment to assess competence on core cognitive processes required for entry-level jobs.",
    "TCS CODEVITA": "TCS CodeVita is a global programming competition by TCS that promotes programming as a sport and offers interview opportunities.",
    "CAPGEMINI EXCELLER": "Capgemini Exceller is an off-campus recruitment drive for hiring engineering graduates who possess strong technical and cognitive skills.",
    "COGNIZANT": "Cognizant recruitment covers technical assessments, logical reasoning, and HR interviews for hiring diverse talent.",
    "WIPRO ELITE": "Wipro Elite National Talent Hunt (NTH) aims to attract the best engineering talent in the country for freshers' recruitment.",
    "QUANTITATIVE APTITUDE": "Training to solve mathematical problems quickly and accurately, crucial for clearing the initial rounds of recruitment.",
    "REASONING APTITUDE": "Enhancing logical thinking and problem-solving abilities to tackle tricky patterns and data interpretation questions.",
    "VERBAL/NON-VERBAL ABILITY": "Improving communication skills, grammar, and vocabulary alongside visual reasoning capabilities.",
    "PROBLEM SOLVING": "Developing a structured approach to analyzing complex issues and identifying the most efficient algorithmic solutions.",
    "COMMUNICATION": "Fostering clear and concise expression of ideas, essential for teamwork, client meetings, and professional growth.",
    "PERSONALITY DEVELOPMENT": "Building confidence, professional etiquette, and interpersonal skills to excel in corporate environments.",
    "MOCK INTERVIEWS": "Simulated interview sessions with industry experts to help candidates overcome anxiety and refine their responses.",
    "JAVA FULL STACK": "End-to-end development using Java, Spring Boot on the backend, and modern JavaScript frameworks like React on the frontend.",
    "PYTHON FULL STACK": "Building robust web applications using Python-based frameworks like Django or Flask alongside frontend technologies.",
    "MERN DEVELOPMENT": "Mastering the popular JavaScript stack comprising MongoDB, Express.js, React, and Node.js for scalable web applications.",
    "CLOUD COMPUTING": "Understanding cloud architecture, deployment, and management using platforms like AWS, Microsoft Azure, or Google Cloud.",
    "DEVOPS": "Bridging the gap between development and operations through continuous integration, deployment, and automation tools.",
    "HARDWARE PROJECTS": "Hands-on experience in building physical devices, IoT systems, and embedded programming using microcontrollers.",
    "SOFTWARE PROJECTS": "Real-world web, mobile, and desktop application development following agile methodologies and software lifecycles.",
    "PROBLEM STATEMENTS": "Tackling industry-provided challenges to build innovative and practical technological solutions within tight deadlines.",
    "RAPID PROTOTYPING": "Quickly creating functional models to test ideas, gather feedback, and iterate before full-scale development.",
    "TEAM COLLABORATION": "Learning to work effectively in diverse groups, utilizing version control, and practicing agile teamwork dynamics.",
    "INNOVATION": "Thinking outside the box to engineer novel features, optimize existing processes, and conceptualize breakthrough tech products."
  };

  const services = [
    {
      icon: <Target size={24} color="#ec4899" />,
      bgIcon: "rgba(236, 72, 153, 0.1)",
      title: "Expertise",
      desc: "Crack top IT company recruitment exams with specialized preparation for leading MNC hiring processes.",
      tags: ["TCS NQT", "TCS CODEVITA", "CAPGEMINI EXCELLER", "COGNIZANT", "WIPRO ELITE"]
    },
    {
      icon: <Briefcase size={24} color="#8b5cf6" />,
      bgIcon: "rgba(139, 92, 246, 0.1)",
      title: "Interviews & Placements",
      desc: "Comprehensive interview preparation covering aptitude, reasoning, coding challenges, and company-specific patterns.",
      tags: ["QUANTITATIVE APTITUDE", "REASONING APTITUDE", "VERBAL/NON-VERBAL ABILITY"]
    },
    {
      icon: <Rocket size={24} color="#f43f5e" />,
      bgIcon: "rgba(244, 63, 94, 0.1)",
      title: "Skill Development",
      desc: "Holistic professional development programs focusing on core competencies required for career success.",
      tags: ["PROBLEM SOLVING", "COMMUNICATION", "PERSONALITY DEVELOPMENT", "MOCK INTERVIEWS"]
    },
    {
      icon: <FlaskConical size={24} color="#6366f1" />,
      bgIcon: "rgba(99, 102, 241, 0.1)",
      title: "Internships",
      desc: "Hands-on industry internships in cutting-edge technologies with real-world project experience.",
      tags: ["JAVA FULL STACK", "PYTHON FULL STACK", "MERN DEVELOPMENT", "CLOUD COMPUTING", "DEVOPS"]
    },
    {
      icon: <Zap size={24} color="#f59e0b" />,
      bgIcon: "rgba(245, 158, 11, 0.1)",
      title: "Live Projects",
      desc: "Real-world project implementation combining hardware and software development for portfolio building.",
      tags: ["HARDWARE PROJECTS", "SOFTWARE PROJECTS", "IOT PROJECTS"]
    },
    {
      icon: <Trophy size={24} color="#eab308" />,
      bgIcon: "rgba(234, 179, 8, 0.1)",
      title: "Hackathons",
      desc: "Participate in intense coding competitions to solve real-world problems and showcase your innovative solutions.",
      tags: ["PROBLEM STATEMENTS", "RAPID PROTOTYPING", "TEAM COLLABORATION", "INNOVATION"]
    }
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .service-grid-new {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        .srv-card-new {
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .srv-card-new:hover {
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.08);
          border-color: #bfdbfe;
        }
        .srv-top {
          display: flex;
          justify-content: space-between;
          padding: 24px;
        }
        .srv-top-left {
          flex: 1;
        }
        .srv-title {
          font-size: 1.4rem;
          color: #0f172a;
          margin-bottom: 6px;
          line-height: 1.3;
          font-weight: 700;
        }
        .srv-company {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
        }
        .srv-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          background: white;
          border: 1px solid #f1f5f9;
        }
        .srv-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 0 24px;
        }
        .srv-middle {
          padding: 24px;
          flex-grow: 1;
        }
        .srv-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #334155;
          font-size: 0.95rem;
          margin-bottom: 12px;
        }
        .srv-i-icon {
          color: #ec4899; /* Pink Map pin styling */
        }
        .srv-i-icon-monitor {
          color: #3b82f6; /* Blue monitor styling */
        }
        .srv-info-row strong {
          color: #0f172a;
          margin-right: 4px;
        }
        .srv-desc {
          margin-top: 24px;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 24px;
        }
        .srv-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .srv-tag {
          background: #eff6ff;
          color: #3b82f6;
          border: 1px solid #bfdbfe;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .srv-tag:hover {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .modal-content {
          background: white;
          padding: 40px;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 2rem;
          line-height: 1;
          cursor: pointer;
          color: #64748b;
          transition: color 0.2s;
        }
        .modal-close:hover {
          color: #0f172a;
        }
        .modal-body h3 {
          font-size: 1.5rem;
          color: #0f172a;
          margin-bottom: 16px;
        }
        .modal-body p {
          color: #475569;
          font-size: 1.05rem;
          line-height: 1.7;
        }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="section-title">Our Capabilities & Services</h1>
        <p className="section-subtitle">Beyond education, we provide comprehensive technical services and training for robust career growth.</p>
      </div>

      <div className="service-grid-new">
        {services.map((s, i) => (
          <div key={i} className="srv-card-new">
            <div className="srv-top">
              <div className="srv-top-left">
                <h3 className="srv-title">{s.title}</h3>
                <p className="srv-company">at {companyName}</p>
              </div>
              <div className="srv-icon-box" style={{ background: s.bgIcon }}>
                {s.icon}
              </div>
            </div>
            
            <div className="srv-divider"></div>
            
            <div className="srv-middle">
              <div className="srv-info-row">
                <MapPin size={16} className="srv-i-icon" /> 
                <strong>Location:</strong> {location}
              </div>
              <div className="srv-info-row">
                <Monitor size={16} className="srv-i-icon-monitor" /> 
                <strong>Mode:</strong> {workMode}
              </div>
              
              <p className="srv-desc">{s.desc}</p>

              <div className="srv-tags">
                {s.tags.map((tag, j) => (
                  <button 
                    key={j} 
                    className="srv-tag" 
                    onClick={() => {
                      if (tag.toUpperCase() === "TCS NQT") {
                        window.location.href = '/services/tcs-nqt';
                      } else if (tag.toUpperCase() === "TCS CODEVITA") {
                        window.location.href = '/services/tcs-codevita';
                      } else if (tag.toUpperCase() === "CAPGEMINI EXCELLER") {
                        window.location.href = '/services/capgemini-exceller';
                      } else if (tag.toUpperCase() === "COGNIZANT") {
                        window.location.href = '/services/cognizant';
                      } else if (tag.toUpperCase() === "WIPRO ELITE") {
                        window.location.href = '/services/wipro-elite';
                      } else if (tag.toUpperCase() === "QUANTITATIVE APTITUDE") {
                        window.location.href = '/services/quantitative-aptitude';
                      } else if (tag.toUpperCase() === "REASONING APTITUDE") {
                        window.location.href = '/services/reasoning-aptitude';
                      } else if (tag.toUpperCase() === "VERBAL/NON-VERBAL ABILITY") {
                        window.location.href = '/services/verbal-non-verbal';
                      } else if (tag.toUpperCase() === "PROBLEM SOLVING") {
                        window.location.href = '/services/problem-solving';
                      } else if (tag.toUpperCase() === "COMMUNICATION") {
                        window.location.href = '/services/communication';
                      } else if (tag.toUpperCase() === "PERSONALITY DEVELOPMENT") {
                        window.location.href = '/services/personality-development';
                      } else if (tag.toUpperCase() === "MOCK INTERVIEWS") {
                        window.location.href = '/services/mock-interview';
                      } else if (tag.toUpperCase() === "JAVA FULL STACK") {
                        window.location.href = '/services/java-full-stack';
                      } else if (tag.toUpperCase() === "PYTHON FULL STACK") {
                        window.location.href = '/services/python-full-stack';
                      } else if (tag.toUpperCase() === "MERN DEVELOPMENT") {
                        window.location.href = '/services/mern-development';
                      } else if (tag.toUpperCase() === "INNOVATION") {
                        window.location.href = '/services/innovation';
                      } else if (tag.toUpperCase() === "TEAM COLLABORATION") {
                        window.location.href = '/services/team-collaboration';
                      } else if (tag.toUpperCase() === "RAPID PROTOTYPING") {
                        window.location.href = '/services/rapid-prototyping';
                      } else if (tag.toUpperCase() === "PROBLEM STATEMENTS") {
                        window.location.href = '/services/problem-statements';
                      } else if (tag.toUpperCase() === "CLOUD COMPUTING") {
                        window.location.href = '/services/cloud-computing';
                      } else if (tag.toUpperCase() === "DEVOPS") {
                        window.location.href = '/services/devops';
                      } else if (tag.toUpperCase() === "SOFTWARE PROJECT" || tag.toUpperCase() === "SOFTWARE PROJECTS") {
                        window.location.href = '/services/software-projects';
                      } else if (tag.toUpperCase() === "HARDWARE PROJECT" || tag.toUpperCase() === "HARDWARE PROJECTS") {
                        window.location.href = '/services/hardware-projects';
                      } else if (tag.toUpperCase() === "IOT PROJECTS" || tag.toUpperCase() === "IOT PROJECT") {
                        window.location.href = '/services/iot-projects';
                      } else {
                        setSelectedTag(tag);
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTag && (
        <div className="modal-overlay" onClick={() => setSelectedTag(null)}>
          <div className="modal-content fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTag(null)}>&times;</button>
            <div className="modal-body">
              <h3>{selectedTag}</h3>
              <p>{tagDescriptions[selectedTag] || "Detailed information about this specific module will be provided during the course orientation."}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
