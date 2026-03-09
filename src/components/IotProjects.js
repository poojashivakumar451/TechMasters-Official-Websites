import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Layers, Cpu, Globe, CheckCircle, Monitor, ShieldCheck, Wifi } from 'lucide-react';

const IotProjects = () => {
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
      domain: "IoT & Smart Cities",
      title: "Smart Street Lighting System with LoRaWAN Integration",
      abstract: "Urban energy consumption is significantly impacted by street lighting. This project develops an intelligent street lighting system using LoRaWAN technology for long-range communication. Each light pole is equipped with an LDR sensor and a PIR motion sensor. The lights automatically dim to 20% power during late-night hours and brighten to 100% only when pedestrian or vehicle motion is detected. Data regarding energy usage, lamp failures, and motion patterns is transmitted to a central gateway and monitored on a real-time dashboard. This system not only reduces electricity costs by over 50% but also enables proactive maintenance of the lighting infrastructure, ensuring safer and more energy-efficient urban environments.",
      existing: "Current street lights are controlled by simple timers or manual switches, leading to massive energy waste during low-traffic periods and no way to detect failures remotely.",
      proposed: "An IoT-enabled mesh network of street lights that adjust intensity based on ambient light and presence, with centralized monitoring.",
      advantages: ["High energy efficiency", "Long-range LoRaWAN connectivity", "Real-time fault detection", "Reduced light pollution"],
      hardware: ["LoRaWAN Gateway", "ESP32 Microcontroller", "LDR & PIR Sensors", "Solid State Relay"],
      software: ["Arduino IDE", "The Things Network (TTN)", "Grafana Dashboard"]
    },
    {
      id: "2",
      domain: "IoT & Healthcare",
      title: "Remote Patient Monitoring System for Post-Operative Care",
      abstract: "The burden on healthcare facilities can be reduced by monitoring patients remotely after surgery. This IoT project integrates wearable sensors to track vital signs like Heart Rate (BPM), Blood Oxygen (SpO2), and Body Temperature. The data is processed by a NodeMCU and sent via MQTT protocol to a secure hospital database. An AI-based thresholding system analyzes the vitals and sends immediate emergency alerts to doctors and family members if a patient's condition destabilizes. A user-friendly mobile app allows patients to see their recovery progress and maintain a digital medicine log. This system ensures continuous medical oversight without requiring the patient to remain in a hospital bed, significantly improving patient outcomes and reducing readmission rates.",
      existing: "Post-operative monitoring currently relies on periodic manual checks by nurses or at-home patient self-reporting, which can be inaccurate or late in emergencies.",
      proposed: "A wearable IoT hub that provides 24/7 telemetry of vital signs with automated emergency alerting systems.",
      advantages: ["Continuous health oversight", "Early warning alerts", "Reduced hospital stay", "Secured cloud data storage"],
      hardware: ["MAX30102 Oximeter", "DS18B20 Temp Sensor", "NodeMCU ESP8266", "OLED Display"],
      software: ["Arduino C++", "MQTT Broker", "Flask Backend", "React Native App"]
    },
    {
      id: "3",
      domain: "IoT & Industry 4.0",
      title: "Industrial Machine Health Monitoring using Vibration Analysis",
      abstract: "In manufacturing, unexpected machine failure leads to costly downtime. This Industry 4.0 project uses IoT to implement predictive maintenance. An ADXL345 accelerometer is attached to industrial motors or conveyors to capture high-frequency vibration data. By analyzing the Fast Fourier Transform (FFT) of the vibration signals, the system identifies the precursors to mechanical failure such as bearing wear or rotor imbalance. This data is transmitted to an industrial IoT platform over Wi-Fi. The platform uses a machine learning model to predict the remaining useful life (RUL) of the machinery. Maintenance teams receive automated work orders weeks before a failure occurs, shifting the paradigm from 'fix-on-failure' to 'proactive-prevention'.",
      existing: "Industrial machines are typically maintained on fixed schedules (every 6 months) or only fixed after they break down, leading to production losses.",
      proposed: "A vibration-sensing IoT node that uses frequency analysis to predict mechanical failures before they happen.",
      advantages: ["Prevents expensive downtime", "Extends machine life", "Optimizes maintenance labor", "Cloud-based trend analysis"],
      hardware: ["ADXL345 Vibration Sensor", "ESP32", "Current Sensor (ACS712)", "Industrial Enclosure"],
      software: ["ESP-IDF Framework", "Python Signal Processing", "ThingsBoard IoT"]
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
          .project-id { color: #8b5cf6; font-weight: 700; font-size: 1.1rem; }
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
          .req-list li { background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #8b5cf6; display: flex; align-items: center; gap: 10px; }
        `}</style>
        <div className="details-container">
          <button className="back-btn-ui" onClick={handleBack}><ArrowLeft size={18}/> Back to Projects</button>
          <span className="project-id">{selectedProject.id}</span>
          <h1 className="project-title">{selectedProject.title}</h1>
          
          <div className="section-header"><BookOpen size={20} color="#8b5cf6"/> Abstract</div>
          <p className="content-text">{selectedProject.abstract}</p>

          <div className="section-header"><Monitor size={20} color="#f59e0b"/> Existing System</div>
          <p className="content-text">{selectedProject.existing}</p>

          <div className="section-header"><Layers size={20} color="#10b981"/> Proposed System</div>
          <p className="content-text">{selectedProject.proposed}</p>

          <div className="section-header"><CheckCircle size={20} color="#3b82f6"/> Key Advantages</div>
          <ul className="req-list" style={{gridTemplateColumns: '1fr'}}>
            {selectedProject.advantages.map((adv, i) => <li key={i}><CheckCircle size={16} className="text-green-500"/> {adv}</li>)}
          </ul>

          <div className="section-header"><Wifi size={20} color="#8b5cf6"/> Technical Stack</div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
            <div>
              <h4 style={{marginBottom: '10px'}}>Software Stack</h4>
              <ul className="req-list" style={{gridTemplateColumns: '1fr'}}>
                {selectedProject.software.map((sw, i) => <li key={i}><Globe size={16}/> {sw}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{marginBottom: '10px'}}>Hardware Components</h4>
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
        .domain-tag { color: #8b5cf6; font-weight: 600; }
        .abstract-btn { 
          background: #3b82f6; 
          color: white; 
          border: none; 
          padding: 8px 15px; 
          border-radius: 6px; 
          cursor: pointer; 
          font-weight: 600;
          transition: all 0.2s;
        }
        .abstract-btn:hover { background: #2563eb; transform: translateY(-2px); }
        .nav-link-btn { background: #f8fafc; color: #334155; border: 1px solid #e2e8f0; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s; }
        .nav-link-btn:hover { background: #eff6ff; border-color: #3b82f6; color: #3b82f6; }
      `}</style>

      <div className="projects-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="project-table-card">
          <div className="table-header">
            <h1>IOT Projects – 2025</h1>
            <p>Next-Generation Internet of Things (IoT) Solutions for Smart Cities and Industry</p>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>DOMAIN</th>
                <th>PROJECT TITLES</th>
                <th>DETAILS</th>
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
                      Abstract Details
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

export default IotProjects;
