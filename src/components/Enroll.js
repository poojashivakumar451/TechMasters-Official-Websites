import React, { useState } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';

const Enroll = ({ addEnrollment }) => {
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
    <div className="page-container fade-in" style={{ padding: '40px 5%' }}>
      <style>{`
        .enroll-card {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          background: white;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: var(--shadow-premium);
          border: 1px solid var(--border-color);
        }
        .enroll-sidebar {
          background: var(--secondary);
          color: white;
          padding: 60px 40px;
          position: relative;
        }
        .enroll-sidebar h2 { color: white; margin-bottom: 20px; font-size: 2.25rem; }
        .enroll-sidebar p { opacity: 0.8; line-height: 1.8; margin-bottom: 40px; }
        
        .enroll-form { padding: 60px 50px; }
        .form-input-lms {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #f1f5f9;
          background: #f8fafc;
          border-radius: 12px;
          font-size: 1rem;
          transition: var(--transition);
        }
        .form-input-lms:focus {
          border-color: var(--primary);
          background: white;
          outline: none;
          box-shadow: 0 0 0 4px rgba(139, 0, 0, 0.1);
        }
        .lms-btn-submit {
          width: 100%;
          background: var(--primary);
          color: white;
          padding: 18px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: var(--transition);
        }
        .lms-btn-submit:hover:not(:disabled) { background: var(--primary-dark); transform: translateY(-3px); }
        .lms-btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        
        @media (max-width: 900px) {
          .enroll-card { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="enroll-card">
        <aside className="enroll-sidebar">
           <h2>Ignite Your Potential</h2>
           <p>Join TechMasters Training Institute. Our elite programs are designed for innovators like you. Take the first step towards your professional career today.</p>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                 <div style={{ background: 'rgba(255,255,255,0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 800 }}>01</div>
                 <div>
                    <h4 style={{ margin: 0 }}>Register</h4>
                    <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>Tell us about yourself</span>
                 </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                 <div style={{ background: 'rgba(255,255,255,0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 800 }}>02</div>
                 <div>
                    <h4 style={{ margin: 0 }}>Consult</h4>
                    <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>Screening & Counseling</span>
                 </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                 <div style={{ background: 'rgba(255,255,255,0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 800 }}>03</div>
                 <div>
                    <h4 style={{ margin: 0 }}>Launch</h4>
                    <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>Access Global LMS</span>
                 </div>
              </div>
           </div>
        </aside>

        <main className="enroll-form">
           {!submitted ? (
             <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '2rem', marginBottom: '30px', color: 'var(--text-main)' }}>Student Application</h3>
                
                {error && (
                  <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '15px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 600 }}>
                    {error}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                   <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Full Name</label>
                      <input required name="name" className="form-input-lms" placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
                   </div>
                   <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Email ID</label>
                      <input required type="email" name="email" className="form-input-lms" placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                   </div>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                   <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Contact Number</label>
                   <input required type="tel" name="phone" className="form-input-lms" placeholder="+91 00000 00000" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                   <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Target Program</label>
                   {lockedCourse ? (
                     <input className="form-input-lms" style={{ background: '#e2e8f0', cursor: 'not-allowed' }} value={formData.course} readOnly />
                   ) : (
                     <select required name="course" className="form-input-lms" value={formData.course} onChange={handleChange}>
                        <option value="" disabled>Select a course path</option>
                        <option value="Java Full Stack Development">Java Full Stack Development</option>
                        <option value="Python Full Stack Development">Python Full Stack Development</option>
                        <option value="MERN Full Stack Development">MERN Full Stack Development</option>
                        <option value="Data Science & ML">Data Science & ML</option>
                        <option value="React Advanced">React Advanced</option>
                     </select>
                   )}
                </div>

                <div className="form-group" style={{ marginBottom: '40px' }}>
                   <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Background Info</label>
                   <input name="background" className="form-input-lms" placeholder="Major, Graduation Year, etc." value={formData.background} onChange={handleChange} />
                </div>

                <button type="submit" className="lms-btn-submit" disabled={isSubmitting}>
                   {isSubmitting ? 'Processing Application...' : <><Send size={20} /> Submit Enrollment</>}
                </button>
             </form>
           ) : (
             <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ background: '#dcfce7', color: 'var(--success)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 30px' }}>
                   <CheckCircle size={50} />
                </div>
                <h2 style={{ fontSize: '2.5rem' }}>Success!</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '400px', margin: '0 auto 40px' }}>Your application has been logged into our secure database. An admissions counselor will reach out to you shortly.</p>
                <div className="premium-card" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left', background: '#f8fafc' }}>
                   <div style={{ display: 'flex', gap: '15px' }}>
                      <Clock size={20} color="var(--primary)" />
                      <div style={{ fontSize: '0.9rem' }}>
                         <strong>Pending Review</strong>
                         <p style={{ margin: '5px 0 0', opacity: 0.7 }}>Credentials verification in progress.</p>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </main>
      </div>

      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
           <div className="premium-card fade-in" style={{ maxWidth: '450px', textAlign: 'center', padding: '40px' }}>
              <CheckCircle size={60} color="var(--success)" style={{ marginBottom: '20px' }} />
              <h3>Enrollment Confirmed</h3>
              <p style={{ margin: '15px 0 30px', color: 'var(--text-muted)' }}>Thank you for choosing TechMasters. Your journey to excellence starts here. Use your email to login once approved.</p>
              <button className="lms-btn-submit" onClick={() => window.location.href='/login'}>Navigate to Login</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Enroll;
