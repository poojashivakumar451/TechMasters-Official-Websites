import React from 'react';

const Gallery = () => {
  const images = [
    { src: '/gallery-1.jpg', title: 'Interactive Learning Session' },
    { src: '/gallery-2.jpg', title: 'Hands-on Coding Workshop' },
    { src: '/gallery-3.jpg', title: 'Industrial Training Module' },
    { src: '/gallery-4.jpg', title: 'Real-time Project Lab' },
    { src: '/gallery-5.jpg', title: 'Advanced Technology Class' },
    { src: '/gallery-6.jpg', title: 'Industrial Skills Training' },
  ];

  return (
    <div className="page-container fade-in">
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 40px;
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
          font-size: 1.2rem;
          margin: 0;
          font-weight: 600;
          transform: translateY(10px);
          transition: transform 0.3s ease;
        }
        .gallery-item:hover .gallery-title {
          transform: translateY(0);
        }
      `}</style>
      
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="section-title">Life at TechMasters</h1>
        <p className="section-subtitle">A glimpse into our vibrant campuses, dedicated classrooms, and industrial engagements.</p>
      </div>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <div key={i} className="gallery-item">
            <img src={img.src} alt={img.title} className="gallery-img" loading="lazy" />
            <div className="gallery-overlay">
              <h3 className="gallery-title">{img.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
