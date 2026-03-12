import React, { useState } from 'react';

const Gallery = () => {
  const [lightboxImg, setLightboxImg] = useState(null);

  const generalImages = [
    { src: '/gallery-1.jpg', title: 'Interactive Learning Session' },
    { src: '/gallery-2.jpg', title: 'Hands-on Coding Workshop' },
    { src: '/gallery-3.jpg', title: 'Industrial Training Module' },
    { src: '/gallery-4.jpg', title: 'Real-time Project Lab' },
    { src: '/gallery-5.jpg', title: 'Advanced Technology Class' },
    { src: '/gallery-6.jpg', title: 'Industrial Skills Training' },
  ];

  const govEngImages = [
    { src: '/gallery/gov-eng/1.png', title: 'Java with DSA – Instructor-led Session' },
    { src: '/gallery/gov-eng/2.png', title: 'Classroom Training – Government Engineering College' },
    { src: '/gallery/gov-eng/3.png', title: 'Attentive Students During DSA Module' },
    { src: '/gallery/gov-eng/4.png', title: 'In-depth Learning – Java Fundamentals' },
    { src: '/gallery/gov-eng/5.png', title: 'Engaging Lecture by TechMasters Trainer' },
  ];

  const basavakalyanImages = [
    { src: '/gallery/basavakalyan-eng/1.jpg', title: 'Java Full Stack – Projector-led Session' },
    { src: '/gallery/basavakalyan-eng/2.jpg', title: 'Interactive Classroom Training' },
    { src: '/gallery/basavakalyan-eng/3.jpg', title: 'Students Engaged in Full Stack Module' },
    { src: '/gallery/basavakalyan-eng/4.jpg', title: 'Hands-on Learning – Java Development' },
    { src: '/gallery/basavakalyan-eng/5.png', title: 'Live Coding Session by TechMasters Trainer' },
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 30px;
        }
        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 4/3;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          cursor: pointer;
        }
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 24px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gallery-item:hover .gallery-img {
          transform: scale(1.05);
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-title {
          color: white;
          font-size: 1.1rem;
          margin: 0;
          font-weight: 600;
          transform: translateY(10px);
          transition: transform 0.3s ease;
        }
        .gallery-item:hover .gallery-title {
          transform: translateY(0);
        }

        /* Special section for Gov Eng College */
        .gov-eng-section {
          margin-top: 70px;
          margin-bottom: 10px;
        }
        .gov-eng-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1b4e8b 100%);
          border-radius: 20px;
          padding: 36px 40px;
          display: flex;
          gap: 20px;
          align-items: center;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.2);
        }
        .gov-eng-banner::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 200px; height: 200px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
        }
        .gov-eng-banner::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 260px; height: 260px;
          background: rgba(255,255,255,0.03);
          border-radius: 50%;
        }
        .gov-eng-icon {
          font-size: 3rem;
          flex-shrink: 0;
        }
        .gov-eng-text { position: relative; z-index: 1; }
        .gov-eng-tag {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          color: #93c5fd;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 12px;
        }
        .gov-eng-headline {
          font-size: 1.65rem;
          font-weight: 800;
          color: white;
          margin: 0 0 10px;
          line-height: 1.3;
        }
        .gov-eng-desc {
          color: #94a3b8;
          font-size: 0.97rem;
          margin: 0;
          line-height: 1.6;
        }
        .gov-eng-badges {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          flex-wrap: wrap;
        }
        .gov-eng-badge {
          background: rgba(255,255,255,0.1);
          color: #e2e8f0;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.15);
        }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: zoom-out;
          padding: 20px;
        }
        .lightbox-img {
          max-width: 90vw;
          max-height: 88vh;
          border-radius: 12px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5);
          object-fit: contain;
        }
        .lightbox-close {
          position: fixed;
          top: 24px; right: 28px;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          background: rgba(255,255,255,0.1);
          border: none;
          border-radius: 50%;
          width: 46px; height: 46px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .lightbox-close:hover { background: rgba(255,255,255,0.2); }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @media (max-width: 600px) {
          .gov-eng-banner { padding: 24px 20px; flex-direction: column; text-align: center; }
          .gov-eng-headline { font-size: 1.25rem; }
          .gov-eng-badges { justify-content: center; }
        }
      `}</style>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImg(null)}>✕</button>
          <img src={lightboxImg} alt="Gallery fullscreen" className="lightbox-img" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Main Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="section-title">Life at TechMasters</h1>
        <p className="section-subtitle">A glimpse into our vibrant campuses, dedicated classrooms, and industrial engagements.</p>
      </div>

      {/* ── Python & Full Stack Internship Section ── */}
      <div className="gov-eng-section" style={{ marginTop: '0' }}>
        <div className="gov-eng-banner" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)' }}>
          <div className="gov-eng-icon">🚀</div>
          <div className="gov-eng-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span className="gov-eng-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#6ee7b7' }}>Internship Programme · Feb – May 2026</span>
              <span style={{
                background: '#22c55e',
                color: 'white',
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                animation: 'pulse 2s infinite'
              }}>
                <span style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', display: 'inline-block' }}></span>
                Currently Running
              </span>
            </div>
            <h2 className="gov-eng-headline">Python & Full Stack Development Internship</h2>
            <p className="gov-eng-desc">
              TechMasters is currently conducting an intensive <strong style={{ color: '#6ee7b7' }}>Python & Full Stack Development Internship</strong> programme (Feb – May 2026). Students are gaining hands-on experience in Python programming, web frameworks, databases, frontend technologies, and end-to-end full stack project development under expert mentorship.
            </p>
            <div className="gov-eng-badges">
              <span className="gov-eng-badge">📅 Feb – May 2026</span>
              <span className="gov-eng-badge">⏱️ 4 Months</span>
              <span className="gov-eng-badge">🐍 Python Full Stack</span>
              <span className="gov-eng-badge">📍 Bidar, Karnataka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Internship Gallery */}
      <div className="gallery-grid">
        {generalImages.map((img, i) => (
          <div key={i} className="gallery-item" onClick={() => setLightboxImg(img.src)}>
            <img src={img.src} alt={img.title} className="gallery-img" loading="lazy" />
            <div className="gallery-overlay">
              <h3 className="gallery-title">{img.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* ── Government Engineering College Section ── */}
      <div className="gov-eng-section">
        <div className="gov-eng-banner">
          <div className="gov-eng-icon">🏛️</div>
          <div className="gov-eng-text">
            <span className="gov-eng-tag">Special Training Programme · 2025</span>
            <h2 className="gov-eng-headline">Java with DSA Training at Government Engineering College, Bidar</h2>
            <p className="gov-eng-desc">
              TechMasters conducted an exclusive <strong style={{ color: '#93c5fd' }}>1-Month Java with Data Structures &amp; Algorithms (DSA)</strong> training programme for the students of Government Engineering College, Bidar. The programme focused on strengthening core programming concepts, algorithmic thinking, and real-world Java application development.
            </p>
            <div className="gov-eng-badges">
              <span className="gov-eng-badge">📅 2025</span>
              <span className="gov-eng-badge">⏱️ 1 Month</span>
              <span className="gov-eng-badge">☕ Java + DSA</span>
              <span className="gov-eng-badge">📍 Bidar, Karnataka</span>
            </div>
          </div>
        </div>

        <div className="gallery-grid">
          {govEngImages.map((img, i) => (
            <div key={i} className="gallery-item" onClick={() => setLightboxImg(img.src)}>
              <img src={img.src} alt={img.title} className="gallery-img" loading="lazy" />
              <div className="gallery-overlay">
                <h3 className="gallery-title">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Basavakalyan Engineering College Section ── */}
      <div className="gov-eng-section">
        <div className="gov-eng-banner" style={{ background: 'linear-gradient(135deg, #4a1a0a 0%, #7c2d12 60%, #b45309 100%)' }}>
          <div className="gov-eng-icon">🎓</div>
          <div className="gov-eng-text">
            <span className="gov-eng-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fbbf24' }}>Special Training Programme · 2025</span>
            <h2 className="gov-eng-headline">Java Full Stack Development Training at Basavakalyan Engineering College</h2>
            <p className="gov-eng-desc">
              TechMasters organized a comprehensive <strong style={{ color: '#fbbf24' }}>1-Month Java Full Stack Development</strong> training programme at Basavakalyan Engineering College. Students received in-depth training covering Java programming, Spring Boot, databases, frontend technologies, and full-stack project development.
            </p>
            <div className="gov-eng-badges">
              <span className="gov-eng-badge">📅 2025</span>
              <span className="gov-eng-badge">⏱️ 1 Month</span>
              <span className="gov-eng-badge">☕ Java Full Stack</span>
              <span className="gov-eng-badge">📍 Basavakalyan, Karnataka</span>
            </div>
          </div>
        </div>

        <div className="gallery-grid">
          {basavakalyanImages.map((img, i) => (
            <div key={i} className="gallery-item" onClick={() => setLightboxImg(img.src)}>
              <img src={img.src} alt={img.title} className="gallery-img" loading="lazy" />
              <div className="gallery-overlay">
                <h3 className="gallery-title">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
