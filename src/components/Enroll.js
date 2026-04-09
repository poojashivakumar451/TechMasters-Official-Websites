import React, { useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';

const Enroll = ({ addEnrollment, adminCourses = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    background: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [lockedCourse, setLockedCourse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const preselected = sessionStorage.getItem('preselectedCourse');
    if (preselected) {
      setFormData(prev => ({ ...prev, course: preselected }));
      setLockedCourse(true);
      sessionStorage.removeItem('preselectedCourse');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch("http://localhost:8000/api/courses/enrollments/public_enroll/", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        if (addEnrollment) addEnrollment(data);
        setSubmitted(true);
        setShowModal(true);
      } else {
        const errData = await response.json();
        setError(errData.error || 'Enrollment failed. Please try again.');
      }
    } catch (err) {
      console.error("Backend connection error:", err);
      setError('Cannot connect to the server. Please ensure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container fade-in" style={{ padding: '60px 4%', minHeight: '100vh', background: '#f8fafc' }}>
      <style>{`
        .enroll-minimal-card {
          max-width: 850px;
          margin: 0 auto;
          background: white;
          border-radius: 30px;
          padding: 60px 60px;
          box-shadow: 0 40px 80px -20px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }

        .enroll-page-title {
          font-size: 2.8rem;
          font-weight: 900;
          color: #0f172a; /* Black */
          margin-bottom: 10px;
          text-align: center;
        }

        .enroll-page-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          text-align: center;
          margin-bottom: 50px;
          font-weight: 500;
        }

        .form-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 25px;
        }

        .input-wrapper-elite {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .label-elite {
          font-size: 0.8rem;
          font-weight: 800;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .field-elite {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid #f1f5f9;
          background: #f8fafc;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
          transition: all 0.3s;
        }

        .field-elite:focus {
          border-color: #2563eb; /* Blue */
          background: white;
          outline: none;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
        }

        .btn-submit-elite {
          width: 100%;
          background: #0f172a; /* Black */
          color: white;
          padding: 20px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s;
          margin-top: 20px;
        }

        .btn-submit-elite:hover:not(:disabled) { 
          background: #2563eb; /* Blue on hover */
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(37, 99, 235, 0.3);
        }

        @media (max-width: 768px) {
          .enroll-minimal-card { padding: 40px 25px; }
          .form-grid-layout { grid-template-columns: 1fr; }
          .enroll-page-title { font-size: 2.2rem; }
        }
      `}</style>

      <div className="enroll-minimal-card">
        {!submitted ? (
          <>
            <h1 className="enroll-page-title">Enroll the Courses</h1>
            <p className="enroll-page-subtitle">Fill out the application below to start your professional training program.</p>
            
            {error && (
              <div style={{ background: '#fff1f2', color: '#be123c', padding: '18px', borderRadius: '12px', marginBottom: '30px', fontWeight: 700, border: '1px solid #fecdd3' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid-layout">
                 <div className="input-wrapper-elite">
                    <label className="label-elite">Full Name</label>
                    <input required name="name" className="field-elite" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={handleChange} />
                 </div>
                 <div className="input-wrapper-elite">
                    <label className="label-elite">Email Address</label>
                    <input required type="email" name="email" className="field-elite" placeholder="rahul@example.com" value={formData.email} onChange={handleChange} />
                 </div>
              </div>

              <div className="form-grid-layout">
                 <div className="input-wrapper-elite">
                    <label className="label-elite">Mobile Number</label>
                    <input required type="tel" name="phone" className="field-elite" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} />
                 </div>
                 <div className="input-wrapper-elite">
                    <label className="label-elite">Pick Your Course</label>
                    {lockedCourse ? (
                      <input className="field-elite" style={{ background: '#f1f5f9', cursor: 'not-allowed' }} value={formData.course} readOnly />
                    ) : (
                       <select required name="course" className="field-elite" value={formData.course} onChange={handleChange}>
                          <option value="" disabled>Select a course</option>
                          {adminCourses.length > 0 ? (
                            adminCourses.map(c => <option key={c.id} value={c.title || c.name}>{c.title || c.name}</option>)
                          ) : (
                            <>
                              <option value="Java Full Stack Development">Java Full Stack Development</option>
                              <option value="Python Full Stack Development">Python Full Stack Development</option>
                              <option value="MERN Full Stack Development">MERN Full Stack Development</option>
                            </>
                          )}
                       </select>
                    )}
                 </div>
              </div>

              <div className="input-wrapper-elite" style={{ marginBottom: '30px' }}>
                 <label className="label-elite">Brief Background</label>
                 <textarea 
                    name="background" 
                    className="field-elite" 
                    placeholder="Your education, experience, or goals..." 
                    rows="4"
                    style={{ resize: 'none' }}
                    value={formData.background} 
                    onChange={handleChange} 
                 />
              </div>

              <button type="submit" className="btn-submit-elite" disabled={isSubmitting}>
                 {isSubmitting ? 'Syncing with Registry...' : <><Send size={20} /> Complete Enrollment</>}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
             <div style={{ background: '#eff6ff', color: '#2563eb', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 30px' }}>
                <CheckCircle size={50} />
             </div>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>Enrollment Logged</h2>
             <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '450px', margin: '0 auto 40px', lineHeight: '1.6' }}>
               Your application has been received and added to our review queue. A TechMasters counselor will reach out shortly.
             </p>
             <button className="btn-submit-elite" onClick={() => setSubmitted(false)} style={{ maxWidth: '200px', margin: '0 auto' }}>Done</button>
          </div>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
           <div style={{ background: 'white', maxWidth: '450px', borderRadius: '24px', textAlign: 'center', padding: '50px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
              <CheckCircle size={70} color="#2563eb" style={{ marginBottom: '25px' }} />
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Application Sent</h3>
              <p style={{ margin: '20px 0 35px', color: '#64748b', lineHeight: '1.6' }}>Success! Your enrollment for <strong>{formData.course}</strong> has been confirmed by our server.</p>
              <button className="btn-submit-elite" onClick={() => setShowModal(false)}>Back to Dashboard</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Enroll;
