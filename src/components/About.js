import React from 'react';
import { Award, Users, Target, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <div className="page-container fade-in">
      <style>{`
        .about-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 80px;
        }
        .about-img-box {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          border-radius: 20px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .about-content h2 {
          font-size: 2.2rem;
          margin-bottom: 24px;
        }
        .about-content p {
          color: #475569;
          font-size: 1.1rem;
          margin-bottom: 20px;
        }
        .mission-vision-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-top: 40px;
        }
        .mv-card {
          padding: 30px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          border: 1px solid #e2e8f0;
        }
        .mv-card h3 {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .stats-banner {
          background: #123e72;
          color: white;
          border-radius: 20px;
          padding: 60px 5%;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 30px;
        }
        .stat-circle {
          text-align: center;
        }
        .stat-circle h4 {
          color: white;
          font-size: 3rem;
          margin-bottom: 8px;
        }
        @media (max-width: 992px) {
          .about-grid, .mission-vision-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      
      <div className="about-header">
        <h1 className="section-title">About Techmasters</h1>
        <p className="section-subtitle">Bridging the gap between ambitious learners and the dynamic tech industry.</p>
      </div>

      <div className="about-grid">
        <div className="about-content">
          <h2>Empowering the Next Generation of Engineers</h2>
          <p>
            Established in Bidar, TechMasters Software Private Limited is a premier educational platform and software consultancy. We observed a vast discrepancy between collegiate curriculum and real-world industrial demands, and we set out to fix it.
          </p>
          <p>
            By offering state-of-the-art syllabus structures, real-time project experiences, and expert mentorship, we transform students and job seekers into well-rounded, capable professionals who add value from day one.
          </p>
          
          <div className="mission-vision-grid">
            <div className="mv-card">
              <h3><Target color="#2563eb" /> Our Mission</h3>
              <p>To provide accessible, high-quality technical education that directly translates to career success in the global marketplace.</p>
            </div>
            <div className="mv-card">
              <h3><BookOpen color="#2563eb" /> Our Vision</h3>
              <p>To become the leading hub of tech talent production, known for our rigorous standards and exceptional graduate outcomes.</p>
            </div>
          </div>
        </div>
        
        <div className="about-img-box" style={{ overflow: 'hidden' }}>
          <img 
            src="/about-institution.jpg" 
            alt="Techmasters Classroom" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} 
          />
        </div>
      </div>

      <div className="stats-banner">
        <div className="stat-circle">
          <h4>250+</h4>
          <p>Students Trained</p>
        </div>
        <div className="stat-circle">
          <h4>3</h4>
          <p>Experienced Trainers</p>
        </div>
        <div className="stat-circle">
          <h4>100%</h4>
          <p>Practical Training</p>
        </div>
        <div className="stat-circle">
          <h4>Placement</h4>
          <p>Guidance</p>
        </div>
      </div>
    </div>
  );
};

export default About;
