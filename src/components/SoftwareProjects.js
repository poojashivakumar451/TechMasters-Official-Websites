import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Layers, Cpu, Globe, CheckCircle, Monitor, ShieldCheck, Database } from 'lucide-react';

const SoftwareProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleBack = () => {
    if (selectedProject) {
      setSelectedProject(null);
    } else {
      window.location.href = '/services';
    }
  };

  const projects = [
    {
      id: "1",
      domain: "Blockchain",
      title: "A Decentralized Voting system using Blockchain",
      abstract: "A decentralized voting system using blockchain ensures transparency, security, and immutability in elections. By leveraging distributed ledger technology, every vote is recorded across multiple nodes, making it impossible to tamper with results. This system uses smart contracts to automate the tallying process and verify voter eligibility without a central authority. It addresses common issues in traditional voting like fraud, double-voting, and lack of trust. The decentralized nature ensures that the data is not controlled by any single entity, providing a truly democratic process. High-end encryption protects voter privacy while keeping the tally public and verifiable. This project demonstrates the potential of blockchain beyond cryptocurrency, focusing on secure governance and public trust.",
      existing: "Traditional systems rely on central databases and manual verification, which are vulnerable to hacking, data manipulation, and human error.",
      proposed: "The proposed system uses Ethereum-based smart contracts to record votes as immutable transactions on a peer-to-peer network.",
      advantages: ["Tamper-proof voting records", "Zero central authority required", "End-to-end verifiability", "Enhanced voter privacy"],
      hardware: ["Minimum 8GB RAM", "Intel i5 Processor", "Strong Internet Connection"],
      software: ["Solidity", "Truffle Suite", "Metamask", "React.js", "Web3.js"]
    },
    {
      id: "2",
      domain: "Machine Learning",
      title: "UPI Fraud Detection Using Machine Learning",
      abstract: "As digital transactions through Unified Payments Interface (UPI) explode, so does the risk of financial fraud. This project implements a real-time fraud detection system using supervised machine learning algorithms. It analyzes behavioral patterns, transaction history, and geolocation data to assign a risk score to every transaction. By utilizing algorithms like Random Forest and XGBoost, the system can identify anomalies that deviate from a user's normal spending habits. The model is trained on historical fraud data to recognize signatures of phishing, unauthorized access, and social engineering attacks. Upon detection of a high-risk transaction, the system can trigger immediate multi-factor authentication or block the transaction for manual review, significantly reducing financial loss for both banks and users.",
      existing: "Current UPI security mostly relies on static rule-based systems that fail to catch evolving fraud patterns or zero-day attacks.",
      proposed: "A machine learning pipeline that processes real-time transaction streams to detect complex fraudulent patterns using predictive modeling.",
      advantages: ["Real-time anomaly detection", "Reduction in false positives", "Automated risk assessment", "Scalable for millions of users"],
      hardware: ["8GB RAM", "4GB Dedicated GPU recommended", "i7 Processor"],
      software: ["Python", "Scikit-Learn", "Pandas", "Django", "PostgreSQL"]
    },
    {
      id: "3",
      domain: "Machine Learning",
      title: "Alzheimer's & Depression Prediction Using EEG Signals",
      abstract: "Mental health and neurological disorders require early diagnosis for effective treatment. This project develops a non-invasive screening tool using Electroencephalogram (EEG) signals and Deep Learning. By analyzing brainwave patterns, the system identifies the subtle biomarkers associated with Alzheimer's disease and clinical depression. The process involves signal preprocessing, feature extraction using Wavelet transform, and classification via Convolutional Neural Networks (CNN). This AI-driven approach provides a high-accuracy alternative to subjective clinical assessments. The system can alert healthcare providers to early-stage cognitive decline before physical symptoms become severe. This project bridges the gap between medical diagnostics and artificial intelligence, offering a fast, reliable, and accessible screening solution for neuro-psychiatric conditions.",
      existing: "Existing diagnostic methods involve expensive MRI scans, time-consuming cognitive tests, and often depend on the severity of symptoms.",
      proposed: "An automated EEG signal analyzer that uses deep learning to classify neurological states with high precision.",
      advantages: ["Early-stage detection", "Non-invasive diagnostic process", "High-accuracy biomarkers", "Cost-effective screening"],
      hardware: ["EEG Biosensor headset", "16GB RAM", "High-end CPU"],
      software: ["Python", "TensorFlow/Keras", "MNE-Python", "OpenCV", "MySQL"]
    },
    {
      id: "4",
      domain: "Machine Learning",
      title: "BloodEye: Blood Group Detection with Eye Images",
      abstract: "BloodEye is a revolutionary project that aims to predict human blood groups through the analysis of eye images using digital image processing and machine learning. Genetic research suggests that certain markers in the iris and sclera can be correlated with blood types. By using High-Resolution image capture and Convolutional Neural Networks (CNN), the system extracts texture and color features from the eye. This non-invasive method provides a substitute for traditional needle-prick tests in emergency situations where time and hygiene are critical. The system is trained on a vast dataset of medical eye captures linked to confirmed blood types. While still in experimental phases globally, this project pushes the boundaries of medical AI and biometric diagnostics.",
      existing: "Blood group detection currently mandates a physical blood sample and chemical reagents, which is invasive and requires medical equipment.",
      proposed: "An image-based predictive model that uses high-res iris patterns to suggest blood group probabilities.",
      advantages: ["Completely non-invasive", "Fast results in emergencies", "No chemical reagents needed"],
      hardware: ["High-resolution IR camera", "8GB RAM", "i5 Processor"],
      software: ["Python", "OpenCV", "TensorFlow", "Flask"]
    }
  ];

  if (selectedProject) {
    return (
      <div className="page-container fade-in">
        <style>{`
          .details-container {
            max-width: 1000px;
            margin: 40px auto;
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          }
          .back-btn-ui {
            background: #1e293b;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            transition: background 0.3s;
          }
          .back-btn-ui:hover { background: #0f172a; }
          .project-id { color: #2563eb; font-weight: 700; font-size: 1.1rem; }
          .project-title { font-size: 2.2rem; color: #000; margin: 10px 0 30px; }
          .section-header { 
            font-size: 1.4rem; 
            color: #1e293b; 
            margin: 30px 0 15px; 
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .content-text { color: #475569; line-height: 1.8; font-size: 1.05rem; }
          .req-list { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; list-style: none; padding: 0; }
          .req-list li { background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; display: flex; align-items: center; gap: 10px; }
        `}</style>
        <div className="details-container">
          <button className="back-btn-ui" onClick={handleBack}><ArrowLeft size={18}/> Back to Projects</button>
          <span className="project-id">{selectedProject.id}</span>
          <h1 className="project-title">{selectedProject.title}</h1>
          
          <div className="section-header"><BookOpen size={20} color="#2563eb"/> Abstract</div>
          <p className="content-text">{selectedProject.abstract}</p>

          <div className="section-header"><Monitor size={20} color="#f59e0b"/> Existing System</div>
          <p className="content-text">{selectedProject.existing}</p>

          <div className="section-header"><Layers size={20} color="#10b981"/> Proposed System</div>
          <p className="content-text">{selectedProject.proposed}</p>

          <div className="section-header"><CheckCircle size={20} color="#8b5cf6"/> Key Advantages</div>
          <ul className="req-list" style={{gridTemplateColumns: '1fr'}}>
            {selectedProject.advantages.map((adv, i) => <li key={i}><CheckCircle size={16} className="text-green-500"/> {adv}</li>)}
          </ul>

          <div className="section-header"><Cpu size={20} color="#dc2626"/> System Requirements</div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
            <div>
              <h4 style={{marginBottom: '10px'}}>Software Requirements</h4>
              <ul className="req-list" style={{gridTemplateColumns: '1fr'}}>
                {selectedProject.software.map((sw, i) => <li key={i}><Globe size={16}/> {sw}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{marginBottom: '10px'}}>Hardware Requirements</h4>
              <ul className="req-list" style={{gridTemplateColumns: '1fr'}}>
                {selectedProject.hardware.map((hw, i) => <li key={i}><ShieldCheck size={16}/> {hw}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <style>{`
        .projects-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          background-color: #f3f3f3;
          padding: 20px 0 60px;
        }
        .back-nav {
          padding: 20px 5%;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .back-btn {
          background: transparent;
          color: #123e72;
          border: 1px solid #cbd5e1;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s;
        }
        .back-btn:hover { background: #123e72; color: white; border-color: #123e72; }
        
        .project-table-card {
          background: white;
          border-radius: 12px;
          margin: 40px 5%;
          padding: 40px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .table-header { text-align: center; margin-bottom: 40px; }
        .table-header h1 { font-size: 2.5rem; color: #0f172a; margin-bottom: 10px; }
        .table-header p { color: #64748b; font-size: 1.2rem; }

        .custom-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .custom-table th { background: #f8fafc; text-align: left; padding: 18px; color: #1e293b; border-bottom: 2px solid #e2e8f0; font-weight: 700; }
        .custom-table td { padding: 18px; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 1rem; }
        .domain-tag { color: #dc2626; font-weight: 600; }
        .abstract-btn { 
          background: #22c55e; 
          color: white; 
          border: none; 
          padding: 8px 20px; 
          border-radius: 6px; 
          cursor: pointer; 
          font-weight: 600;
          transition: transform 0.2s;
        }
        .abstract-btn:hover { transform: scale(1.05); background: #16a34a; }
        
        .iot-banner { 
          margin: 20px 5%; 
          background: linear-gradient(90deg, #3b82f6, #8b5cf6); 
          color: white; 
          padding: 20px 30px; 
          border-radius: 12px; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
        }
        .iot-btn { background: white; color: #3b82f6; border: none; padding: 10px 25px; border-radius: 8px; font-weight: 700; cursor: pointer; }
      `}</style>

      <div className="projects-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="project-table-card">
          <div className="table-header">
            <h1>Software Projects 2025 – 2026</h1>
            <p>Machine Learning, Deep Learning, Artificial Intelligence & Blockchain Ideas</p>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>DOMAIN</th>
                <th>PROJECT TITLES</th>
                <th>DOWNLOAD</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, idx) => (
                <tr key={idx}>
                  <td><b>{proj.id}</b></td>
                  <td className="domain-tag">{proj.domain}</td>
                  <td>{proj.title}</td>
                  <td>
                    <button className="abstract-btn" onClick={() => setSelectedProject(proj)}>
                      ABSTRACT
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SoftwareProjects;
