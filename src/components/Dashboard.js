import React, { useState } from 'react';
import { Users, BookOpen, AlertCircle, TrendingUp, Bell, Plus, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ adminCourses, setAdminCourses, enrollments, setEnrollments }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    location: 'Bidar, Karnataka.',
    mode: 'Offline',
    duration: '',
    fees: '',
    description: ''
  });

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    setAdminCourses([...adminCourses, { ...newCourse, id: Date.now(), status: 'pending' }]);
    setIsModalOpen(false);
    setNewCourse({ name: '', location: 'Bidar, Karnataka.', mode: 'Offline', duration: '', fees: '', description: '' });
  };

  const handleStatusChange = (id, newStatus) => {
    setAdminCourses(adminCourses.map(course => 
      course.id === id ? { ...course, status: newStatus } : course
    ));
    alert(`Course ${newStatus}.`);
  };

  const handleEnrollmentStatus = (id, status) => {
    setEnrollments(prev => prev.map(e => 
      e.id === id ? { ...e, status: status } : e
    ));
    // Safe lookup for confirmation logging or internal use
    const student = enrollments.find(e => e.id === id);
    if (student) {
      console.log(`Student ${student.name} enrollment ${status}.`);
    }
  };

  return (
    <div className="admin-wrapper fade-in" style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 5%' }}>
      <style>{`
        /* ... Styles ... */
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .admin-title { font-size: 2rem; color: #0f172a; margin: 0; font-weight: 800; }
        .admin-actions { display: flex; align-items: center; gap: 15px; }
        .btn-add { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.3s; }
        .btn-logout { background: #f1f5f9; color: #ef4444; border: 1px solid #fee2e2; padding: 10px; border-radius: 10px; cursor: pointer; }
        
        .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 40px; }
        .kpi-card { background: white; border-radius: 20px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 20px; }
        .kpi-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; justify-content: center; align-items: center; }
        .kpi-data h4 { font-size: 0.85rem; color: #64748b; margin-bottom: 4px; font-weight: 700; text-transform: uppercase; }
        .kpi-data p { font-size: 1.6rem; color: #0f172a; font-weight: 800; margin: 0; }
        
        .dashboard-content { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 40px; }
        .content-panel { background: white; border-radius: 20px; padding: 30px; border: 1px solid #e2e8f0; }
        .panel-heading { font-size: 1.25rem; color: #0f172a; margin-bottom: 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; }

        .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .status-pending { background: #fef9c3; color: #854d0e; }
        .status-accepted { background: #dcfce7; color: #166534; }
        .status-rejected { background: #fee2e2; color: #991b1b; }
        .btn-accept { background: #16a34a; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin-right: 8px; font-weight: 600; }
        .btn-reject { background: #dc2626; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; }

        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
        .modal-content { background: white; padding: 32px; border-radius: 20px; width: 100%; max-width: 500px; }
        .input-group { margin-bottom: 16px; }
        .input-group label { display: block; margin-bottom: 6px; font-weight: 600; color: #334155; }
        .input-group input, .input-group textarea { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box; }
        .modal-footer { display: flex; gap: 12px; margin-top: 24px; }
        .btn-cancel { flex: 1; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; }
        .btn-submit { flex: 1; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
        .empty-state { text-align: center; padding: 60px 20px; color: #94a3b8; }
        @media (max-width: 992px) { .dashboard-content { grid-template-columns: 1fr; } }
      `}</style>
      
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginBottom: '20px' }}>Add New Course</h2>
            <form onSubmit={handleAddCourse}>
              <div className="input-group"><label>Course Name</label><input required value={newCourse.name} onChange={e => setNewCourse({...newCourse, name: e.target.value})} placeholder="e.g. Flask Framework" /></div>
              <div className="input-group"><label>Internship Location</label><input required value={newCourse.location} onChange={e => setNewCourse({...newCourse, location: e.target.value})} /></div>
              <div className="input-group"><label>Work Mode</label><input required value={newCourse.mode} onChange={e => setNewCourse({...newCourse, mode: e.target.value})} /></div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="input-group" style={{ flex: 1 }}><label>Duration</label><input required value={newCourse.duration} onChange={e => setNewCourse({...newCourse, duration: e.target.value})} placeholder="4 Months" /></div>
                <div className="input-group" style={{ flex: 1 }}><label>Fees</label><input required value={newCourse.fees} onChange={e => setNewCourse({...newCourse, fees: e.target.value})} placeholder="₹10,000" /></div>
              </div>
              <div className="input-group"><label>Description</label><textarea required rows="3" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} /></div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Add Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-header">
        <div><h1 className="admin-title">Admin Dashboard</h1><p style={{ color: '#64748b' }}>Techmasters Trainings Control Center</p></div>
        <div className="admin-actions">
          <button className="btn-add" onClick={() => setIsModalOpen(true)}><Plus size={18} /> Add Course</button>
          <button className="btn-logout" onClick={handleLogout} title="Logout"><LogOut size={20} /></button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card"><div className="kpi-icon" style={{ background: '#eff6ff', color: '#2563eb' }}><Users size={28} /></div><div className="kpi-data"><h4>Total Students</h4><p>{enrollments.filter(e => e.status === 'accepted').length}</p></div></div>
        <div className="kpi-card"><div className="kpi-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><BookOpen size={28} /></div><div className="kpi-data"><h4>Active Courses</h4><p>{24 + adminCourses.filter(c => c.status === 'accepted').length}</p></div></div>
        <div className="kpi-card"><div className="kpi-icon" style={{ background: '#fffbeb', color: '#d97706' }}><AlertCircle size={28} /></div><div className="kpi-data"><h4>Pending Enrollments</h4><p>{enrollments.filter(e => e.status === 'pending').length}</p></div></div>
      </div>

      <div className="dashboard-content">
        <div className="content-panel">
          <div className="panel-heading"><span>Student Enrollments</span></div>
          {enrollments.length === 0 ? (
            <div className="empty-state"><Users size={48} strokeWidth={1} /><p>No enrollments at the moment.</p></div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                    <th style={{ padding: '12px' }}>Student</th>
                    <th style={{ padding: '12px' }}>Course</th>
                    <th style={{ padding: '12px' }}>Status</th>
                    <th style={{ padding: '12px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map(e => (
                    <tr key={e.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: 600 }}>{e.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{e.email}</div>
                      </td>
                      <td style={{ padding: '12px', fontSize: '0.9rem' }}>{e.course}</td>
                      <td style={{ padding: '12px' }}>
                        <span className={`status-badge status-${e.status}`}>{e.status}</span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        {e.status === 'pending' ? (
                          <>
                            <button className="btn-accept" onClick={() => handleEnrollmentStatus(e.id, 'accepted')}>Accept</button>
                            <button className="btn-reject" onClick={() => handleEnrollmentStatus(e.id, 'rejected')}>Reject</button>
                          </>
                        ) : (
                          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="content-panel"><div className="panel-heading">System Activity</div><div className="empty-state" style={{ padding: '40px 0' }}><TrendingUp size={32} strokeWidth={1} /><p>No data.</p></div></div>
      </div>

      {adminCourses.length > 0 && (
        <div className="content-panel" style={{ marginTop: '40px' }}>
          <div className="panel-heading">Manage Added Courses (Review)</div>
          <style>{`
            .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
            .status-pending { background: #fef9c3; color: #854d0e; }
            .status-accepted { background: #dcfce7; color: #166534; }
            .status-rejected { background: #fee2e2; color: #991b1b; }
            .btn-accept { background: #16a34a; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin-right: 8px; font-weight: 600; }
            .btn-reject { background: #dc2626; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; }
          `}</style>
          <div style={{ overflowX: 'auto' }}>
            <table className="table-modern" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                  <th style={{ padding: '12px' }}>Course Name</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {adminCourses.map(course => (
                  <tr key={course.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{course.name}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`status-badge status-${course.status}`}>
                        {course.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {course.status === 'pending' ? (
                        <>
                          <button className="btn-accept" onClick={() => handleStatusChange(course.id, 'accepted')}>Accept</button>
                          <button className="btn-reject" onClick={() => handleStatusChange(course.id, 'rejected')}>Reject</button>
                        </>
                      ) : (
                        <button 
                          style={{ color: '#64748b', background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'not-allowed' }}
                          disabled
                        >
                          Processed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
