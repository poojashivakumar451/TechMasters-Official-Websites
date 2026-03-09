import React from 'react';
import { NavLink } from 'react-router-dom';

const Academy = () => {
  return (
    <div className="page-container fade-in">
      <style>{`
        .academy-banner {
          background: #0f172a;
          border-radius: 24px;
          color: white;
          padding: 80px 5%;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 60px;
        }
        .academy-banner::before {
          content: '';
          position: absolute; top:0; left:0; right:0; bottom:0;
          background: radial-gradient(circle at center, rgba(37,99,235,0.2) 0%, transparent 60%);
        }
        .academy-content { position: relative; z-index: 10; max-width: 800px; margin: 0 auto; }
        .academy-content h1 { font-size: 3rem; color: white; margin-bottom: 24px; }
        .academy-content p { color: #94a3b8; font-size: 1.2rem; line-height: 1.8; margin-bottom: 40px; }
        
        .facility-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 60px;
        }
        .facility-item {
          display: flex; gap: 20px;
          background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
        }
        .f-icon { width: 50px; height: 50px; background: #eff6ff; color: #2563eb; font-size: 1.5rem; font-weight: bold; display: flex; align-items: center; justify-content: center; border-radius: 12px; flex-shrink: 0; }
        .facility-item h3 { font-size: 1.3rem; margin-bottom: 10px; color: #0f172a; }
        .facility-item p { color: #64748b; line-height: 1.6; }
        
        @media (max-width: 992px) {
          .facility-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      
      <div className="academy-banner">
        <div className="academy-content">
          <h1>TechMasters Academy</h1>
          <p>
            Where ambition meets opportunity. We provide a world-class environment designed to stimulate growth, creativity, and deep technical comprehension.
          </p>
          <NavLink to="/courses" className="btn-primary" style={{ padding: '14px 30px', fontSize: '1.1rem' }}>
            View Curriculum
          </NavLink>
        </div>
      </div>

      <h2 className="section-title">World-Class Facilities</h2>
      <div className="facility-grid">
        <div className="facility-item">
          <div className="f-icon">1</div>
          <div>
            <h3>High-Tech Labs</h3>
            <p>Our computer labs are equipped with top-tier hardware to handle massive compilations, dual-monitor setups, and dedicated local servers to mimic real production environments.</p>
          </div>
        </div>
        <div className="facility-item">
          <div className="f-icon">2</div>
          <div>
            <h3>Collaborative Spaces</h3>
            <p>We encourage peer programming and team projects. Our campus features open pods and brainstorming boards designed for Agile project management simulations.</p>
          </div>
        </div>
        <div className="facility-item">
          <div className="f-icon">3</div>
          <div>
            <h3>Digital Library</h3>
            <p>Exclusive access to premium O'Reilly subscriptions, Udemy enterprise, and an internal repository of interview experiences and system design architectures.</p>
          </div>
        </div>
        <div className="facility-item">
          <div className="f-icon">4</div>
          <div>
            <h3>Mock Interview Rooms</h3>
            <p>Dedicated spaces where HR professionals and senior engineers conduct realistic mock interviews, complete with whiteboarding algorithms.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academy;
