import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  LayoutDashboard, 
  Plus, 
  CheckCircle, 
  XCircle, 
  X,
  UserCheck,
  DollarSign,
  TrendingUp,
  Clock,
  Check,
  Mail,
  FileDown,
  Award,
  Search,
  RefreshCcw,
  ShieldCheck,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateCertificatePDF } from '../utils/certificateGenerator';

const Dashboard = ({ adminCourses, enrollments, setEnrollments }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newCourse, setNewCourse] = useState({
    name: '',
    location: 'Bidar, Karnataka.',
    mode: 'Offline',
    duration: '',
    fees: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  
  // Payment States
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payStudent, setPayStudent] = useState(null);
  const [payStep, setPayStep] = useState(1);
  const [payPin, setPayPin] = useState('');
  const [payError, setPayError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Certification States
  const [isCertAuthOpen, setIsCertAuthOpen] = useState(false);
  const [isCertPreviewOpen, setIsCertPreviewOpen] = useState(false);
  const [certAuthStudent, setCertAuthStudent] = useState(null);
  const [certAuthPin, setCertAuthPin] = useState('');
  const [certAuthError, setCertAuthError] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Eligibility: Simplified for "Unlock" state as requested. 
  // Admin can now manually unlock even if criteria aren't 100% met.
  const calculateEligibility = (e) => {
    // If admin has specifically completed it, it's eligible
    if (e.status === 'completed') return true;
    
    const attendance = e.attendance || 0;
    const project = e.projectStatus === 'Completed';
    const isPaid = e.paid;
    
    // Eligibility criteria: 75% attendance OR Paid AND Project
    return (attendance >= 75 && isPaid) || (project && isPaid);
  };

  const getAuthHeader = useCallback(() => ({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json'
  }), []);

  const refreshData = async () => {
    setLoading(true);
    if (window.refreshDashboardData) {
      await window.refreshDashboardData();
    }
    setLoading(false);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `http://localhost:8000/api/courses/${editingId}/` : 'http://localhost:8000/api/courses/';
      const method = editingId ? 'PUT' : 'POST';
      
      const payload = {
        title: newCourse.name,
        description: newCourse.description,
        duration: newCourse.duration,
        price: String(newCourse.fees).replace(/[^0-9.]/g, ''),
        location: newCourse.location,
        mode: newCourse.mode,
      };

      const res = await fetch(url, {
        method: method,
        headers: getAuthHeader(),
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNewCourse({ name: '', location: 'Bidar, Karnataka.', mode: 'Offline', duration: '', fees: '', description: '' });
        setEditingId(null);
        refreshData();
      }
    } catch (err) {
      console.error('Error saving course:', err);
    }
  };

  const handleEnrollmentStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:8000/api/courses/enrollments/${id}/`, {
        method: 'PATCH',
        headers: getAuthHeader(),
        body: JSON.stringify({ status: status })
      });
      if (res.ok) refreshData();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleMarkAsPaid = async () => {
    if (!payStudent) return;
    try {
      const res = await fetch(`http://localhost:8000/api/courses/enrollments/${payStudent.id}/`, {
        method: 'PATCH',
        headers: getAuthHeader(),
        body: JSON.stringify({ paid: true, date_paid: new Date().toISOString() })
      });
      if (res.ok) {
        setIsPayModalOpen(false);
        refreshData();
        alert('Payment verified successfully!');
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  // Academic Progress States
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [progressStudent, setProgressStudent] = useState(null);
  const [progressData, setProgressData] = useState({
    percentage: 0,
    attendance: 0,
    project: 'Pending'
  });

  const handleUpdateProgress = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/courses/enrollments/${progressStudent.id}/`, {
        method: 'PATCH',
        headers: getAuthHeader(),
        body: JSON.stringify({
          progress_percentage: progressData.percentage,
          attendance: progressData.attendance,
          project_status: progressData.project
        })
      });
      if (res.ok) {
        setIsProgressModalOpen(false);
        refreshData();
      }
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const verifyPayPinAndConfirm = () => {
    const SECURE_PIN = '102023';
    if (payPin === SECURE_PIN) {
      handleMarkAsPaid();
    } else {
      setPayError('Invalid Security PIN');
    }
  };

  const verifyCertPinAndIssue = () => {
    const SECURE_PIN = '102023';
    if (certAuthPin === SECURE_PIN) {
      setIsCertAuthOpen(false);
      setIsCertPreviewOpen(true);
    } else {
      setCertAuthError('Invalid Authorization PIN');
    }
  };

  const filteredEnrollments = enrollments.filter(e => 
    e.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'students', name: 'Students', icon: <Users size={20} /> },
    { id: 'courses', name: 'Courses', icon: <BookOpen size={20} /> },
    { id: 'payments', name: 'Fees', icon: <CreditCard size={20} /> },
    { id: 'progress', name: 'Academic', icon: <TrendingUp size={20} /> },
    { id: 'certification', name: 'Certs', icon: <Award size={20} /> },
  ];

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <style>{`
        .admin-sidebar {
          width: 280px;
          background: var(--secondary);
          color: white;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 3rem;
          padding: 0 1rem;
        }
        .sidebar-brand h2 {
          color: white;
          font-size: 1.25rem;
          margin: 0;
        }
        .main-content-area {
          flex: 1;
          padding: 2.5rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        .dashboard-header-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .search-bar-container {
          background: white;
          padding: 12px 20px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 30px;
          border: 1px solid var(--border-color);
        }
        .search-bar-container input {
          border: none;
          outline: none;
          flex: 1;
          font-size: 0.95rem;
        }
        .lms-btn {
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
        }
        .lms-btn-primary { background: var(--primary); color: white; }
        .lms-btn-primary:hover { background: var(--primary-dark); }
        .lms-btn-secondary { background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color); }
        
        .badge-pill {
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
        }
        .badge-success { background: #dcfce7; color: #166534; }
        .badge-warning { background: #fef9c3; color: #854d0e; }
        .badge-danger { background: #fee2e2; color: #991b1b; }
      `}</style>

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <ShieldCheck size={32} color="var(--primary)" fill="white" />
          <div>
            <h2>TechMasters</h2>
            <p style={{ fontSize: '0.7rem', opacity: 0.6, margin: 0 }}>ADMIN CONTROL PANEL</p>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {sidebarItems.map(item => (
            <div 
              key={item.id} 
              className={`lms-sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span style={{ fontWeight: 600 }}>{item.name}</span>
            </div>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', 
              background: 'rgba(239, 68, 68, 0.1)', 
              color: '#f87171', 
              padding: '12px', 
              borderRadius: '8px', 
              border: 'none', 
              fontWeight: 700, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <XCircle size={18} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content-area">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0, fontWeight: 800 }}>{sidebarItems.find(i => i.id === activeTab)?.name} Center</h1>
            <p style={{ color: 'var(--text-muted)', margin: '4px 0 0' }}>Welcome back, Institutional Admin.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
             <button className="lms-btn lms-btn-secondary" onClick={refreshData}>
               <RefreshCcw size={18} className={loading ? 'spin' : ''} /> Refresh
             </button>
             {activeTab === 'courses' && (
               <button className="lms-btn lms-btn-primary" onClick={() => setIsModalOpen(true)}>
                 <Plus size={18} /> Add Course
               </button>
             )}
          </div>
        </header>

        {activeTab === 'overview' && (
          <>
            <div className="dashboard-header-stats">
              <div className="premium-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.85rem' }}>TOTAL STUDENTS</span>
                  <Users size={20} color="var(--primary)" />
                </div>
                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{enrollments.length}</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600, margin: '10px 0 0' }}>↑ 12% from last month</p>
              </div>
              <div className="premium-card" style={{ borderLeft: '4px solid var(--accent)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.85rem' }}>PENDING ENROLLMENTS</span>
                  <Clock size={20} color="var(--accent)" />
                </div>
                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{enrollments.filter(e => e.status === 'pending').length}</h2>
                <div className="lms-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem', marginTop: '15px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setActiveTab('students')}>View Pending</div>
              </div>
              <div className="premium-card" style={{ borderLeft: '4px solid var(--info)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.85rem' }}>ESTIMATED REVENUE</span>
                  <DollarSign size={20} color="var(--info)" />
                </div>
                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>₹{enrollments.reduce((acc, curr) => acc + (curr.paid ? parseInt(curr.totalFee || 15000) : 0), 0).toLocaleString()}</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '10px 0 0' }}>Based on collected fees</p>
              </div>
            </div>

            <div className="premium-card">
              <h3 style={{ marginBottom: '20px' }}>Recent Enrollment Requests</h3>
              <table className="lms-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.slice(0, 5).map(e => (
                    <tr key={e.id}>
                      <td style={{ fontWeight: 700 }}>{e.name}</td>
                      <td>{e.course}</td>
                      <td>{new Date(e.enrolled_on).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge-pill ${e.status === 'accepted' ? 'badge-success' : e.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>
                          {e.status}
                        </span>
                      </td>
                      <td><ChevronRight size={18} cursor="pointer" onClick={() => setActiveTab('students')} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab !== 'overview' && (
          <div className="search-bar-container">
            <Search size={20} color="var(--text-muted)" />
            <input 
              placeholder={`Search ${activeTab}...`} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {activeTab === 'students' && (
          <div className="premium-card">
             <table className="lms-table">
                <thead>
                  <tr>
                    <th>Student Details</th>
                    <th>Course Info</th>
                    <th>Enrollment Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No students found matching your search.</td></tr>
                  ) : filteredEnrollments.map(e => (
                    <tr key={e.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{e.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{e.email}</div>
                      </td>
                      <td>{e.course}</td>
                      <td>{new Date(e.enrolled_on).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge-pill ${e.status === 'accepted' ? 'badge-success' : e.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>
                          {e.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {e.status === 'pending' && (
                            <button className="lms-btn lms-btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleEnrollmentStatus(e.id, 'accepted')}>Approve</button>
                          )}
                          <button className="lms-btn lms-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => {
                            if(window.confirm('Delete this user?')) handleEnrollmentStatus(e.id, 'rejected');
                          }}>Remove</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="premium-card">
             <table className="lms-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Course Fees</th>
                    <th>Paid Amount</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.filter(e => e.status === 'accepted').map(e => (
                    <tr key={e.id}>
                      <td style={{ fontWeight: 700 }}>{e.name}</td>
                      <td>₹{e.totalFee || '15,000'}</td>
                      <td>₹{e.paid ? (e.totalFee || '15,000') : '0'}</td>
                      <td>
                        <span className={`badge-pill ${e.paid ? 'badge-success' : 'badge-danger'}`}>
                          {e.paid ? 'Fully Paid' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        {!e.paid && (
                          <button className="lms-btn lms-btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => {
                            setPayStudent(e);
                            setIsPayModalOpen(true);
                          }}>
                            Process Fee
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="premium-card">
             <table className="lms-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Course Progress</th>
                    <th>Attendance</th>
                    <th>Project Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.filter(e => e.status === 'accepted').map(e => (
                    <tr key={e.id}>
                      <td style={{ fontWeight: 700 }}>{e.name}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${e.progress_percentage || 0}%`, height: '100%', background: 'var(--primary)' }}></div>
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{e.progress_percentage || 0}%</span>
                        </div>
                      </td>
                      <td>{e.attendance || 0}%</td>
                      <td>
                        <span className={`badge-pill ${e.project_status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                          {e.project_status}
                        </span>
                      </td>
                      <td>
                        <button className="lms-btn lms-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => {
                          setProgressStudent(e);
                          setProgressData({
                            percentage: e.progress_percentage || 0,
                            attendance: e.attendance || 0,
                            project: e.project_status || 'Pending'
                          });
                          setIsProgressModalOpen(true);
                        }}>
                          Update Records
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}

        {activeTab === 'certification' && (
          <div className="premium-card">
             <div style={{ padding: '15px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', borderRadius: '8px', marginBottom: '20px', color: '#0369a1', fontSize: '0.9rem' }}>
               <ShieldCheck size={18} style={{ marginRight: '8px' }} />
               Certificates are cryptographically locked by default. Admins can manually unlock issuance for qualified students.
             </div>
             <table className="lms-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Eligibility</th>
                    <th>Release State</th>
                    <th>Issue Date</th>
                    <th>Certificate Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.filter(e => e.status === 'accepted').map(e => (
                    <tr key={e.id}>
                      <td style={{ fontWeight: 700 }}>{e.name}</td>
                      <td>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: calculateEligibility(e) ? 'var(--success)' : 'var(--danger)' }}>
                          {calculateEligibility(e) ? '✓ Qualified' : '○ Pending Criteria'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge-pill ${calculateEligibility(e) ? 'badge-success' : 'badge-danger'}`}>
                          {calculateEligibility(e) ? 'Unlocked' : 'Locked'}
                        </span>
                      </td>
                      <td>{e.status === 'completed' ? new Date().toLocaleDateString() : 'N/A'}</td>
                      <td>
                        <button 
                          className="lms-btn lms-btn-primary" 
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                          onClick={() => {
                            setCertAuthStudent(e);
                            setIsCertAuthOpen(true);
                          }}
                        >
                          {calculateEligibility(e) ? 'Issue Certificate' : 'Force Unlock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="premium-card">
             <table className="lms-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Course Title</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminCourses.map((c, idx) => (
                    <tr key={c.id}>
                      <td>{idx + 1}</td>
                      <td style={{ fontWeight: 700 }}>{c.title}</td>
                      <td>₹{c.price}</td>
                      <td>{c.duration}</td>
                      <td><span className="badge-pill badge-success">{c.status}</span></td>
                      <td>
                        <button className="lms-btn lms-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => {
                           setEditingId(c.id);
                           setNewCourse({
                             name: c.title,
                             location: c.location,
                             mode: c.mode,
                             duration: c.duration,
                             fees: c.price,
                             description: c.description
                           });
                           setIsModalOpen(true);
                        }}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}
      </main>

      {/* Modal Overlays */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="premium-card" style={{ width: '90%', maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>{editingId ? 'Edit Course' : 'Create New Course'}</h3>
              <X cursor="pointer" onClick={() => setIsModalOpen(false)} />
            </div>
            <form onSubmit={handleSaveCourse} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
               <div style={{ gridColumn: 'span 2' }}>
                 <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Course Title</label>
                 <input style={{ width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px' }} value={newCourse.name} onChange={e => setNewCourse({...newCourse, name: e.target.value})} required />
               </div>
               <div>
                 <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Fees (INR)</label>
                 <input style={{ width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px' }} value={newCourse.fees} onChange={e => setNewCourse({...newCourse, fees: e.target.value})} required />
               </div>
               <div>
                 <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Duration</label>
                 <input style={{ width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px' }} value={newCourse.duration} onChange={e => setNewCourse({...newCourse, duration: e.target.value})} required />
               </div>
               <div style={{ gridColumn: 'span 2' }}>
                 <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Description</label>
                 <textarea rows="3" style={{ width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px' }} value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} required />
               </div>
               <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                 <button type="button" className="lms-btn lms-btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                 <button type="submit" className="lms-btn lms-btn-primary">Save Course</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* Security Pin Modal */}
      {isPayModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="premium-card" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <Lock size={40} color="var(--primary)" style={{ marginBottom: '15px' }} />
            <h3>Administrative Access</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enter the 6-digit institutional PIN to authorize payment verification for <strong>{payStudent?.name}</strong>.</p>
            <input 
              type="password" 
              placeholder="••••••" 
              style={{ width: '100%', padding: '12px', fontSize: '1.5rem', textAlign: 'center', letterSpacing: '8px', border: '2px solid var(--border-color)', borderRadius: '12px', margin: '20px 0' }}
              value={payPin}
              onChange={e => setPayPin(e.target.value)}
            />
            {payError && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '15px' }}>{payError}</div>}
            <button className="lms-btn lms-btn-primary" style={{ width: '100%', padding: '15px' }} onClick={verifyPayPinAndConfirm}>Verify & Confirm Payment</button>
            <button className="lms-btn lms-btn-secondary" style={{ width: '100%', marginTop: '10px' }} onClick={() => setIsPayModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Cert Auth Modal */}
      {isCertAuthOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="premium-card" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <Award size={40} color="var(--primary)" style={{ marginBottom: '15px' }} />
            <h3>Institutional Issuance</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Authorize the release of digital certificate for <strong>{certAuthStudent?.name}</strong>.</p>
            <input 
              type="password" 
              placeholder="••••••" 
              style={{ width: '100%', padding: '12px', fontSize: '1.5rem', textAlign: 'center', letterSpacing: '8px', border: '2px solid var(--border-color)', borderRadius: '12px', margin: '20px 0' }}
              value={certAuthPin}
              onChange={e => setCertAuthPin(e.target.value)}
            />
            <button className="lms-btn lms-btn-primary" style={{ width: '100%', padding: '15px' }} onClick={verifyCertPinAndIssue}>Authorize Issuance</button>
            <button className="lms-btn lms-btn-secondary" style={{ width: '100%', marginTop: '10px' }} onClick={() => setIsCertAuthOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Certificate Preview */}
      {isCertPreviewOpen && certAuthStudent && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
            <button className="lms-btn lms-btn-primary" onClick={async () => {
               const pdfBytes = await generateCertificatePDF(certAuthStudent);
               const blob = new Blob([pdfBytes], { type: 'application/pdf' });
               const url = URL.createObjectURL(blob);
               const link = document.createElement('a');
               link.href = url;
               link.download = `Certificate_${certAuthStudent.name}.pdf`;
               link.click();
            }}>Download PDF</button>
            <button className="lms-btn lms-btn-secondary" onClick={() => setIsCertPreviewOpen(false)}>Close Preview</button>
          </div>
          <div style={{ background: 'white', width: '800px', height: '560px', padding: '40px', position: 'relative', border: '15px solid var(--secondary)', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}>
             <img src="/logo.jpg" alt="TechMasters" style={{ height: '60px', position: 'absolute', top: '20px', left: '20px' }} />
             <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <h1 style={{ fontFamily: 'serif', fontSize: '3.5rem', color: 'var(--secondary)' }}>CERTIFICATE</h1>
                <h2 style={{ letterSpacing: '5px', marginTop: '-10px' }}>OF COMPLETION</h2>
                <p style={{ fontStyle: 'italic', fontSize: '1.2rem', marginTop: '20px' }}>This is to certify that</p>
                <h2 style={{ fontSize: '3rem', margin: '20px 0', borderBottom: '2px solid var(--secondary)', display: 'inline-block', padding: '0 40px' }}>{certAuthStudent.name}</h2>
                <p style={{ fontSize: '1.1rem' }}>has successfully completed the professional training program in</p>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>{certAuthStudent.course}</h3>
                <p style={{ marginTop: '20px' }}>Awarded this day of {new Date().toLocaleDateString()}</p>
             </div>
             <div style={{ position: 'absolute', bottom: '40px', left: '40px' }}>
                <div style={{ width: '150px', borderTop: '1px solid black', textAlign: 'center', fontSize: '0.8rem' }}>Course Coordinator</div>
             </div>
             <div style={{ position: 'absolute', bottom: '40px', right: '40px' }}>
                <div style={{ width: '150px', borderTop: '1px solid black', textAlign: 'center', fontSize: '0.8rem' }}>Director</div>
             </div>
          </div>
        </div>
      )}

      {/* Progress Update Modal */}
      {isProgressModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="premium-card" style={{ maxWidth: '450px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Student Progress: {progressStudent?.name}</h3>
              <X cursor="pointer" onClick={() => setIsProgressModalOpen(false)} />
            </div>
            
            <form onSubmit={handleUpdateProgress}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Course Progress (%)</label>
                <input 
                  type="range" min="0" max="100" 
                  style={{ width: '100%' }}
                  value={progressData.percentage}
                  onChange={e => setProgressData({...progressData, percentage: parseInt(e.target.value)})}
                />
                <div style={{ textAlign: 'center', fontWeight: 800, marginTop: '5px' }}>{progressData.percentage}%</div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Attendance (%)</label>
                <input 
                  type="number" min="0" max="100" 
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '10px' }}
                  value={progressData.attendance}
                  onChange={e => setProgressData({...progressData, attendance: parseInt(e.target.value)})}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Project Status</label>
                <select 
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '10px' }}
                  value={progressData.project}
                  onChange={e => setProgressData({...progressData, project: e.target.value})}
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <button type="button" className="lms-btn lms-btn-secondary" style={{ flex: 1 }} onClick={() => setIsProgressModalOpen(false)}>Cancel</button>
                <button type="submit" className="lms-btn lms-btn-primary" style={{ flex: 1 }}>Update State</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
