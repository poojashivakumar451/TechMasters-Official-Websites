import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Award, 
  BookOpen, 
  Layout, 
  LogOut,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  Play,
  FileDown
} from 'lucide-react';
import { generateCertificatePDF } from '../utils/certificateGenerator';

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchStudentData = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const userRes = await fetch('http://localhost:8000/api/users/profile/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }

      const enrollRes = await fetch('http://localhost:8000/api/courses/enrollments/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (enrollRes.ok) {
        const enrollData = await enrollRes.json();
        setEnrollments(Array.isArray(enrollData) ? enrollData : (enrollData.results || []));
      }
    } catch (err) {
      console.error('Error fetching student data:', err);
    } finally {
      setTimeout(() => setLoading(false), 800); // For smooth transition
    }
  }, [navigate]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const calculateOverallProgress = () => {
    if (enrollments.length === 0) return 0;
    const total = enrollments.reduce((acc, curr) => acc + (curr.progress_percentage || 0), 0);
    return Math.round(total / enrollments.length);
  };

  const calculateEligibility = (e) => {
    if (e.status === 'completed') return true;
    const attendance = e.attendance || 0;
    const project = e.projectStatus === 'Completed';
    const isPaid = e.paid;
    // Eligibility criteria: 75% attendance OR Paid AND Project
    return (attendance >= 75 && isPaid) || (project && isPaid);
  };

  const handleDownloadCert = async (enrollment) => {
    const studentData = {
      name: `${user.first_name} ${user.last_name}`.trim() || user.username,
      course: enrollment.course_details?.title || enrollment.course,
      start_date: enrollment.start_date,
      end_date: enrollment.end_date,
      id: enrollment.id
    };
    const pdfBytes = await generateCertificatePDF(studentData);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certificate_${studentData.course}.pdf`;
    link.click();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-color)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="shimmer" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '20px' }}></div>
          <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '2px' }}>LOADING TECHMASTERS LMS...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="lms-page" style={{ background: 'var(--bg-color)', minHeight: '100vh' }}>
       <style>{`
          .student-hero {
             background: var(--secondary);
             color: white;
             padding: 60px 5%;
             margin-bottom: -40px;
          }
          .student-hero h1 { color: white; fontSize: 2.5rem; margin: 0; }
          .lms-content-wrapper {
             max-width: 1300px;
             margin: 0 auto;
             padding: 0 5%;
             position: relative;
             z-index: 2;
          }
          .student-stat-grid {
             display: grid;
             grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
             gap: 24px;
             margin-bottom: 40px;
          }
          .lms-btn-action {
             padding: 12px 24px;
             border-radius: 12px;
             font-weight: 700;
             cursor: pointer;
             transition: var(--transition);
             border: none;
             display: flex;
             align-items: center;
             justify-content: center;
             gap: 10px;
          }
          .lms-btn-action-primary { background: var(--primary); color: white; }
          .lms-btn-action-primary:hover { background: var(--primary-dark); transform: translateY(-3px); }
          .lms-btn-action-secondary { background: white; color: var(--text-main); border: 1px solid var(--border-color); }
          
          .course-card-premium {
             background: white;
             border-radius: var(--radius-lg);
             overflow: hidden;
             border: 1px solid var(--border-color);
             box-shadow: var(--shadow-subtle);
             transition: var(--transition);
             display: flex;
             flex-direction: column;
          }
          .course-card-premium:hover { box-shadow: var(--shadow-premium); transform: translateY(-5px); }
          .card-thumb { height: 180px; background: var(--secondary); position: relative; }
          .card-badge { position: absolute; top: 15px; left: 15px; }
          .progress-ring { margin-top: 20px; }
       `}</style>

       <header className="student-hero">
          <div className="lms-content-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div>
                <h1>Hello, {user?.first_name || 'TechMaster'}!</h1>
                <p style={{ opacity: 0.8, marginTop: '5px' }}>Keep growing and stay updated with the latest in technology.</p>
             </div>
             <button onClick={handleLogout} className="lms-btn-action lms-btn-action-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
                <LogOut size={18} /> Logout
             </button>
          </div>
       </header>

       <div className="lms-content-wrapper">
          <div className="student-stat-grid">
             <div className="premium-card" style={{ borderTop: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                   <div style={{ background: 'rgba(139, 0, 0, 0.1)', color: 'var(--primary)', padding: '12px', borderRadius: '12px' }}><BookOpen size={24} /></div>
                   <div>
                      <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{enrollments.length}</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>ACTIVE COURSES</p>
                   </div>
                </div>
             </div>
             <div className="premium-card" style={{ borderTop: '4px solid var(--success)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                   <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '12px', borderRadius: '12px' }}><TrendingUp size={24} /></div>
                   <div>
                      <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{calculateOverallProgress()}%</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>OVERALL PROGRESS</p>
                   </div>
                </div>
             </div>
             <div className="premium-card" style={{ borderTop: '4px solid var(--accent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                   <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent)', padding: '12px', borderRadius: '12px' }}><Award size={24} /></div>
                   <div>
                      <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{enrollments.filter(e => calculateEligibility(e)).length}</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, margin: 0 }}>CERTIFICATES UNLOCKED</p>
                   </div>
                </div>
             </div>
          </div>

          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px', fontSize: '1.75rem' }}>
             <Layout color="var(--primary)" /> Your Learning Programs
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px', paddingBottom: '60px' }}>
             {enrollments.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
                   <BookOpen size={60} color="#cbd5e1" style={{ marginBottom: '20px' }} />
                   <h3>No active enrollments found.</h3>
                   <p style={{ color: 'var(--text-muted)' }}>Explore our high-end courses and launch your career.</p>
                   <button onClick={() => navigate('/services')} className="lms-btn-action lms-btn-action-primary" style={{ margin: '30px auto 0' }}>Browse Programs</button>
                </div>
             ) : enrollments.map(enrol => (
                <div key={enrol.id} className="course-card-premium">
                   <div className="card-thumb">
                      <div className="card-badge">
                         <span className={`status-capsule ${enrol.status === 'accepted' ? 'success' : 'warning'}`} style={{ color: enrol.status === 'accepted' ? '#166534' : '#854d0e', background: enrol.status === 'accepted' ? '#dcfce7' : '#fef9c3' }}>
                            {enrol.status}
                         </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'white', opacity: 0.2 }}>
                         <ShieldCheck size={100} />
                      </div>
                   </div>
                   <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary)' }}>{enrol.course_details?.title || enrol.course}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                           <Clock size={14} /> {enrol.course_details?.duration || '4 Months'}
                        </div>
                      </div>
                      
                      <div className="progress-ring">
                         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                            <span>CURRICULUM PROGRESS</span>
                            <span>{enrol.progress_percentage || 0}%</span>
                         </div>
                         <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ width: `${enrol.progress_percentage || 0}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--primary-dark))', borderRadius: '10px' }}></div>
                         </div>
                      </div>

                      <div style={{ marginTop: 'auto', paddingTop: '30px', display: 'flex', gap: '12px' }}>
                         <button 
                           className="lms-btn-action lms-btn-action-primary" 
                           style={{ flex: 2 }}
                           disabled={enrol.status === 'pending'}
                           onClick={() => navigate(`/course/${enrol.course_details?.slug || enrol.id}/play`)}
                         >
                            {enrol.status === 'pending' ? 'Activation Pending' : <><Play size={18} fill="white" /> Start Learning</>}
                         </button>
                         <button 
                           className="lms-btn-action lms-btn-action-secondary" 
                           style={{ flex: 1, color: calculateEligibility(enrol) ? 'var(--primary)' : 'var(--text-muted)', borderColor: calculateEligibility(enrol) ? 'var(--primary)' : 'var(--border-color)' }}
                           disabled={!calculateEligibility(enrol)}
                           onClick={() => handleDownloadCert(enrol)}
                         >
                            <Award size={20} />
                         </button>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default StudentDashboard;
