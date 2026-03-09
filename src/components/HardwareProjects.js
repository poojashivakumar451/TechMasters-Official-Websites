import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Cpu, Layers, Monitor, CheckCircle, Globe, ShieldCheck, Zap } from 'lucide-react';

const HardwareProjects = () => {
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
      domain: "Embedded Systems",
      title: "Smart Traffic Light Control System Using Image Processing",
      abstract: "Urban traffic congestion is a growing problem that leads to significant time waste and increased fuel consumption. This project implements a Smart Traffic Light Control System that uses real-time image processing to detect vehicle density. Unlike traditional timer-based signals, this system uses high-resolution cameras installed at intersections to capture the traffic state. Using Raspberry Pi and OpenCV, the system processes these images to count the number of vehicles in each lane. If a lane has significantly higher density, the system dynamically allocates more green-light time to that specific path. This adaptive signal control minimizes idle time at intersections, improves traffic flow, and contributes to a smarter, more efficient urban infrastructure.",
      existing: "Traditional traffic lights operate on fixed timers, which often lead to lanes being green or red even when no vehicles are present, causing unnecessary delays.",
      proposed: "An intelligent, sensor-driven system that uses live camera feeds and microcontroller logic to adjust signal durations based on actual traffic volume.",
      advantages: ["Reduces traffic congestion", "Minimizes fuel consumption", "Optimizes intersection efficiency", "Non-invasive installation"],
      hardware: ["Arduino / Raspberry Pi", "Pi Camera Module", "High-Intensity Signal LEDs", "Connecting Wires"],
      software: ["Python", "OpenCV Library", "Embedded C", "Raspbian OS"]
    },
    {
      id: "2",
      domain: "IoT",
      title: "IoT Based Smart Irrigation System Using Soil Moisture Sensors",
      abstract: "Efficient water management is critical for modern agriculture. This IoT-based Smart Irrigation System automates the watering process by monitoring the soil's moisture level in real-time. A capacitive soil moisture sensor is embedded in the field, which sends data to an ESP8266/Arduino microcontroller. When the moisture level drops below a predefined threshold, the system automatically triggers a water pump. Simultaneously, the data is pushed to a cloud dashboard (Blynk or Thingspeak), allowing farmers to monitor their field status remotely from a mobile app. This ensures that crops receive the exact amount of water needed, preventing both over-irrigation and water scarcity, while significantly reducing the manual labor required for farm maintenance.",
      existing: "Farmers currently irrigate fields manually or using simple timers, which often results in water wastage or inadequate irrigation due to unpredictable weather.",
      proposed: "A closed-loop automated system that uses moisture sensors and IoT connectivity to provide precision irrigation based on real-time soil data.",
      advantages: ["Saves 40% more water", "Reduces manual labor", "Improves crop yield", "Remote monitoring via mobile"],
      hardware: ["NodeMCU (ESP8266)", "Capacitive Soil Moisture Sensor", "Relay Module", "5V DC Water Pump"],
      software: ["Arduino IDE", "Blynk IoT Cloud", "C++ Programming"]
    },
    {
      id: "3",
      domain: "Artificial Intelligence",
      title: "AI Based Smart Garbage Monitoring System Using Sensors",
      abstract: "Waste management is a major challenge in rapidly growing cities. This AI-powered Smart Garbage Monitoring system helps municipal authorities optimize waste collection schedules. Ultrasonic sensors are mounted on the lids of public dustbins to measure the fill-level. When a bin reaches 90% capacity, the system uses a GSM/Wi-Fi module to send an automated alert to the central monitoring station, pinpointing the bin's location via GPS. Furthermore, an AI model analyzes the fill-rates over time to predict which areas generate waste faster, allowing for proactive route planning for collection trucks. This reduces overflowing bins, prevents health hazards, and lowers the operational costs associated with unnecessary collection trips.",
      existing: "Waste collection is currently performed on fixed schedules, leading to bins overflowing if they fill early, or collection trucks visiting half-empty bins.",
      proposed: "A real-time monitoring network of bins that alerts authorities only when collection is necessary, optimized by predictive analysis.",
      advantages: ["Prevents bin overflow", "Optimizes truck routes", "Reduces fuel costs", "Improves urban hygiene"],
      hardware: ["HC-SR04 Ultrasonic Sensor", "Arduino Uno", "SIM800L GSM Module", "GPS Module"],
      software: ["Embedded C", "Thingspeak IoT", "Python for Data Analysis"]
    },
    {
      id: "4",
      domain: "Robotics",
      title: "Gesture Controlled Robotic Arm Using Arduino",
      abstract: "Human-robot interaction is a key area of robotics research. This project develops a robotic arm that mimics the user's hand gestures in real-time. The user wears a control glove equipped with an MPU6050 Accelerometer and Gyroscope sensor. These sensors detect the tilt and rotation of the hand, translating them into X, Y, and Z coordinate data. This data is transmitted wirelessly (via NRF24L01 or Bluetooth) to a robotic arm built with high-torque servo motors. The Arduino receiver interprets the signals and moves the arm's joints accordingly. This technology has vast applications in handling hazardous materials, surgical robotics, and assistive devices for the physically challenged, providing a more intuitive way to control complex machinery.",
      existing: "Most industrial robotic arms are controlled via complex joysticks or pre-programmed scripts, which lack the natural feel of human motion.",
      proposed: "A wearable gesture-sensing glove that allows a user to control a multi-degree-of-freedom robotic arm through natural hand movements.",
      advantages: ["Intuitive control", "Wireless operation", "Handles hazardous tasks", "Scalable for industrial use"],
      hardware: ["Arduino Nano", "MPU6050 Accelerometer", "MG996R Servo Motors", "NRF24L01 Transceiver"],
      software: ["Arduino C++", "Processing IDE (for visualization)"]
    },
    {
      id: "5",
      domain: "IoT",
      title: "Smart Home Automation System Using IoT and Mobile App",
      abstract: "The Smart Home Automation system brings convenience and energy efficiency to modern households. This project allows users to control home appliances like lights, fans, and AC units from anywhere in the world using a smartphone app. Using a NodeMCU microcontroller and an 8-channel relay board, appliances are connected to the home Wi-Fi network. The system also integrates PIR motion sensors and LDR sensors to automatically turn off lights when no one is in the room or according to ambient light levels. All energy consumption data is logged to a cloud server, allowing users to track their usage. The system supports voice commands via Google Assistant or Alexa integration, making it a comprehensive solution for a futuristic living environment.",
      existing: "Manual switching of appliances leads to energy waste when users forget to turn them off and lack of remote accessibility.",
      proposed: "A centralized IoT hub that connects all home appliances to a single mobile interface for manual control and automated power management.",
      advantages: ["Significant energy savings", "Remote access from anywhere", "Voice control support", "Enhanced home security"],
      hardware: ["NodeMCU ESP8266", "Multiple Channel Relays", "PIR Motion Sensors", "LDR Sensor"],
      software: ["Arduino IDE", "Blynk IoT / Adafruit IO", "IFTTT Integration"]
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
          .project-id { color: #dc2626; font-weight: 700; font-size: 1.1rem; }
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
          .req-list li { background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #dc2626; display: flex; align-items: center; gap: 10px; }
        `}</style>
        <div className="details-container">
          <button className="back-btn-ui" onClick={handleBack}><ArrowLeft size={18}/> Back to Projects</button>
          <span className="project-id">{selectedProject.id}</span>
          <h1 className="project-title">{selectedProject.title}</h1>
          
          <div className="section-header"><BookOpen size={20} color="#dc2626"/> Abstract</div>
          <p className="content-text">{selectedProject.abstract}</p>

          <div className="section-header"><Monitor size={20} color="#f59e0b"/> Existing System</div>
          <p className="content-text">{selectedProject.existing}</p>

          <div className="section-header"><Layers size={20} color="#10b981"/> Proposed System</div>
          <p className="content-text">{selectedProject.proposed}</p>

          <div className="section-header"><CheckCircle size={20} color="#8b5cf6"/> Key Advantages</div>
          <ul className="req-list" style={{gridTemplateColumns: '1fr'}}>
            {selectedProject.advantages.map((adv, i) => <li key={i}><CheckCircle size={16} className="text-green-500"/> {adv}</li>)}
          </ul>

          <div className="section-header"><Cpu size={20} color="#dc2626"/> Project Components</div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px'}}>
            <div>
              <h4 style={{marginBottom: '10px'}}>Hardware Components</h4>
              <ul className="req-list" style={{gridTemplateColumns: '1fr'}}>
                {selectedProject.hardware.map((hw, i) => <li key={i}><ShieldCheck size={16}/> {hw}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{marginBottom: '10px'}}>Software & Tools</h4>
              <ul className="req-list" style={{gridTemplateColumns: '1fr'}}>
                {selectedProject.software.map((sw, i) => <li key={i}><Globe size={16}/> {sw}</li>)}
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
          padding: 8px 15px; 
          border-radius: 6px; 
          cursor: pointer; 
          font-weight: 600;
          transition: all 0.2s;
        }
        .abstract-btn:hover { background: #16a34a; transform: translateY(-2px); }
        .nav-link-btn { background: #3b82f6; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background 0.3s; }
        .nav-link-btn:hover { background: #2563eb; }
      `}</style>

      <div className="projects-wrapper">
        <div className="back-nav">
          <button className="back-btn" onClick={handleBack}>
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>

        <div className="project-table-card">
          <div className="table-header">
            <h1>Hardware Projects – 2025</h1>
            <p>Electronics, IoT, Embedded Systems, Robotics and AI Hardware Projects</p>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>DOMAIN</th>
                <th>PROJECT TITLES</th>
                <th>PROJECT DETAILS</th>
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
                      Project Details
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

export default HardwareProjects;
