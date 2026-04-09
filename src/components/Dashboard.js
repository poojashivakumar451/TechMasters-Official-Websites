import React, { useState, useCallback } from 'react';
import { 
  Users, 
  BookOpen, 
  CheckCircle,
  Plus,
  Mail,
  CreditCard,
  TrendingUp,
  Award,
  Search,
  Unlock,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = ({ adminCourses, enrollments }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [unlockPasswordInput, setUnlockPasswordInput] = useState('');
  const [unlockedEnrollments, setUnlockedEnrollments] = useState([]);
  const masterUnlockPassword = "102023";
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [mailContent, setMailContent] = useState({ subject: '', body: '', to: '' });
  const [selectedMailId, setSelectedMailId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [selectedEnrollmentForProgress, setSelectedEnrollmentForProgress] = useState(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedEnrollmentForCert, setSelectedEnrollmentForCert] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [newCourse, setNewCourse] = useState({
    name: '',
    location: 'Bidar, Karnataka.',
    mode: 'Offline',
    duration: '',
    fees: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin');
  };

  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`http://localhost:8000/api/courses/enrollments/${id}/`, {
        method: 'PATCH',
        headers: getAuthHeader(),
        body: JSON.stringify({ status })
      });
      if (status === 'accepted') {
        await fetch(`http://localhost:8000/api/courses/enrollments/${id}/send-mail/`, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify({ mail_type: 'acceptance' })
        });
      }
      refreshData();
    } catch (err) { console.error(err); }
  };

  const handleCourseStatusChange = async (id, status) => {
    try {
      await fetch(`http://localhost:8000/api/courses/${id}/`, {
        method: 'PATCH',
        headers: getAuthHeader(),
        body: JSON.stringify({ status })
      });
      refreshData();
    } catch (err) { console.error(err); }
  };

  const handleSaveCourse = async () => {
    try {
      setLoading(true);
      const url = editingId 
        ? `http://localhost:8000/api/courses/${editingId}/`
        : 'http://localhost:8000/api/courses/';
      
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({
          title: newCourse.name,
          duration: newCourse.duration,
          price: parseFloat(newCourse.fees) || 0,
          description: newCourse.description || `Learning path for ${newCourse.name}`,
          location: newCourse.location,
          mode: newCourse.mode,
          status: 'accepted'
        })
      });

      if (res.ok) {
        setIsModalOpen(false);
        refreshData();
        setNewCourse({ name: '', location: 'Bidar, Karnataka.', mode: 'Offline', duration: '', fees: '', description: '' });
        setEditingId(null);
      } else {
        const errData = await res.json();
        alert("Error saving course: " + JSON.stringify(errData));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockCert = async (id) => {
    try {
        await fetch(`http://localhost:8000/api/courses/enrollments/${id}/`, {
            method: 'PATCH',
            headers: getAuthHeader(),
            body: JSON.stringify({ certificate_unlocked: true })
        });
        refreshData();
    } catch (err) { console.error(err); }
  };

  const handlePaymentUpdate = async (id, amount) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/courses/enrollments/${id}/`, {
        method: 'PATCH',
        headers: getAuthHeader(),
        body: JSON.stringify({ 
            paid_amount: parseFloat(amount),
            paid: true 
        })
      });
      if (res.ok) {
        setIsPaymentModalOpen(false);
        refreshData();
      } else {
        const errData = await res.json();
        alert("Error recording payment: " + JSON.stringify(errData));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openMailDraft = (e) => {
    const course = adminCourses.find(c => (c.title === e.course || c.name === e.course)) || {};
    const subject = `Enrollment Approved: ${e.course} - TechMasters Trainings`;
    const body = `Dear ${e.name},

Greetings from TechMasters Trainings!

We are pleased to inform you that your enrollment for the ${e.course} has been successfully reviewed and approved. Congratulations on taking this important step toward enhancing your skills and career.

The details of your enrolled course are as follows: the course duration is ${course.duration || '[Duration]'}, scheduled to begin on ${e.start_date || '[Start Date]'}, and will be conducted in ${course.mode || '[Mode]'} mode. The class timings will be ${course.timings || '[Timings]'}, ensuring a structured and effective learning experience.

The total course fee for this program is ₹${course.price || course.fees || '[Amount]'}, including any applicable registration charges. You may complete the payment using the available methods such as UPI, bank transfer, or the online payment link provided by our team.

To confirm your admission, we request you to complete the payment within 2 days from the date of this email. Kindly note that failure to complete the payment within the given timeline may result in cancellation of your enrollment.

Once the payment is completed, please share the payment receipt via email for verification and confirmation of your admission.

If you have any questions or require further assistance, please feel free to contact us at support@techmasterstrainings.com or call us at +91-7204439007. Our team will be happy to assist you.

We look forward to welcoming you to TechMasters Trainings and wish you a successful learning journey ahead.

Warm regards,
Admissions Team
TechMasters Trainings`;

    setMailContent({ subject, body, to: e.email });
    setSelectedMailId(e.id);
    setIsMailModalOpen(true);
  };

  const handleSendCustomMail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/courses/enrollments/${selectedMailId}/send-mail/`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ 
          mail_type: 'custom', 
          subject: mailContent.subject, 
          body: mailContent.body 
        })
      });
      const data = await res.json();
      if (res.ok) {
        setIsMailModalOpen(false);
        alert("Email sent successfully!");
        refreshData();
      } else {
        alert("Failed to send email: " + (data.error || "Unknown server error"));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sidebarItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: <TrendingUp size={18} /> },
    { id: 'students', name: 'Student Enrollment', icon: <Users size={18} /> },
    { id: 'courses', name: 'Course Enrollment', icon: <BookOpen size={18} /> },
    { id: 'fees', name: 'Fee Management', icon: <CreditCard size={18} /> },
    { id: 'progress', name: 'Course Progress', icon: <TrendingUp size={18} /> },
    { id: 'certs', name: 'Certifications', icon: <Award size={18} /> },
  ];

  const filteredEnrollments = enrollments.filter(e => 
    (e.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (e.course || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-root">
      <style>{`
        :root {
          --admin-red: #b91c1c;
          --sidebar-bg: #1e293b;
          --active-red: #ef4444;
          --bg-gray: #f1f5f9;
          --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .admin-root {
          display: flex;
          flex-direction: column;
          height: 100vh;
          font-family: 'Inter', sans-serif;
          background: var(--bg-gray);
        }
        
        /* Top Navigation Header */
        .admin-nav {
          background: var(--admin-red);
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          color: white;
          z-index: 1000;
        }
        .admin-nav-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .admin-nav-left img {
          height: 40px;
          border-radius: 4px;
        }
        .admin-nav-left h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          color: white;
        }
        .admin-nav-right {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .admin-nav-right a {
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          opacity: 0.9;
        }
        .admin-nav-right a:hover { opacity: 1; }
        .btn-logout-top {
          background: none;
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 6px 15px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.95rem;
        }
        .btn-logout-top:hover { background: rgba(255,255,255,0.1); }

        /* Main Workspace */
        .admin-workspace {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 250px;
          background: var(--sidebar-bg);
          color: #94a3b8;
          display: flex;
          flex-direction: column;
          padding-top: 20px;
        }
        .sidebar-label {
          padding: 0 24px 15px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
        }
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .sidebar-item:hover {
          color: white;
          background: rgba(255,255,255,0.05);
        }
        .sidebar-item.active {
          background: var(--active-red);
          color: white;
        }

        /* Content Area */
        .admin-content {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .content-inner {
          padding: 40px;
        }
        .page-title-tab {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 40px;
        }

        /* Overview Summary Cards */
        .overview-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 40px;
        }
        .summary-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          position: relative;
          box-shadow: var(--card-shadow);
          border-left: 5px solid #ef4444; 
          transition: transform 0.2s;
        }
        .summary-card:hover { transform: translateY(-5px); }
        .summary-card label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748b;
          letter-spacing: 0.02em;
        }
        .summary-card .value {
          font-size: 2.8rem;
          font-weight: 800;
          color: #0f172a;
        }
        .btn-manage-card {
          background: #1e293b;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          width: fit-content;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Activity Log Section */
        .activity-section {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: var(--card-shadow);
        }
        .section-header {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 25px;
        }
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .activity-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: #f8fafc;
          border-radius: 10px;
        }
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .activity-details h4 { margin: 0 0 5px; font-size: 0.95rem; font-weight: 700; color: #334155; }
        .activity-details p { margin: 0; font-size: 0.85rem; color: #64748b; }

        /* Tables & Lists Area */
        .data-panel {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: var(--card-shadow);
        }
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .panel-title { font-size: 1.4rem; font-weight: 800; color: #1e293b; }
        
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; background: #f8fafc; padding: 16px 20px; font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
        td { padding: 20px; border-bottom: 1px solid #f1f5f9; font-size: 0.95rem; color: #334155; vertical-align: middle; }
        
        .badge { padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
        .badge-system { background: #dcfce7; color: #166534; }
        .badge-accepted { background: #dcfce7; color: #15803d; }
        .badge-pending { background: #fef9c3; color: #854d0e; }
        
        .btn-approve { background: #22c55e; color: white; border: none; padding: 7px 15px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.85rem; margin-right: 8px; }
        .btn-decline { background: #ef4444; color: white; border: none; padding: 7px 15px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.85rem; margin-right: 8px; }
        .btn-edit-inline { background: #3b82f6; color: white; border: none; padding: 7px 15px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.85rem; }
        .btn-add-main { background: #b91c1c; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        /* Certifications Special Box */
        .info-box {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          padding: 20px 25px;
          border-radius: 8px;
          margin-bottom: 30px;
          color: #0369a1;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .btn-issue { background: #22c55e; color: white; border: none; padding: 8px 18px; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; }
        .lock-badge { color: #ef4444; font-weight: 800; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; }

        .search-inner { position: relative; width: 300px; }
        .search-inner input { width: 100%; padding: 10px 15px 10px 40px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.9rem; outline: none; }
        .search-inner svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; }

        /* Mobile Responsiveness Queries */
        @media (max-width: 1024px) {
          .overview-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 768px) {
          .admin-nav { padding: 0 15px; }
          .admin-nav-right { display: none; } /* Hide desktop links */
          
          .admin-workspace { position: relative; }
          
          .admin-sidebar {
            position: absolute;
            left: -250px;
            top: 0;
            bottom: 0;
            z-index: 2000;
            transition: left 0.3s ease;
            box-shadow: 10px 0 30px rgba(0,0,0,0.1);
          }
          .admin-sidebar.mobile-open { left: 0; }
          
          .admin-content { width: 100%; }
          .content-inner { padding: 20px; }
          
          .overview-cards { grid-template-columns: 1fr !important; gap: 15px; }
          .summary-card { padding: 20px; }
          .summary-card .value { font-size: 2rem; }
          
          .page-title-tab { font-size: 1.4rem; margin-bottom: 25px; }
          
          .data-panel { padding: 15px; overflow-x: auto; }
          table { min-width: 600px; } /* Ensure table doesn't squish too much */
          
          .panel-header { flex-direction: column; align-items: flex-start; gap: 15px; }
          .search-inner { width: 100%; }
          
          /* Modals Mobile */
          .modal-content { width: 95% !important; padding: 20px !important; margin: 10px; }
          .cert-modal-container { width: 98% !important; }
          #capture-cert { 
            width: 100% !important; 
            height: auto !important; 
            min-height: 400px; 
            padding: 20px !important;
            border-width: 10px !important;
          }
        }

        .hamburger {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px;
        }
        @media (max-width: 768px) {
          .hamburger { display: block; }
        }
      `}</style>

      <nav className="admin-nav">
        <div className="admin-nav-left">
          <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div style={{ width: '24px', height: '2px', background: 'white', marginBottom: '5px' }}></div>
            <div style={{ width: '24px', height: '2px', background: 'white', marginBottom: '5px' }}></div>
            <div style={{ width: '24px', height: '2px', background: 'white' }}></div>
          </button>
          <img src="/logo.jpg" alt="Logo" />
          <h1>TechMasters Admin</h1>
        </div>
        <div className="admin-nav-right">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <button className="btn-logout-top" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="admin-workspace">
        {/* Overlay for mobile when sidebar is open */}
        {isMobileMenuOpen && (
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1500 }}
          ></div>
        )}

        <aside className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-label">Admin Panel</div>
          {sidebarItems.map(item => (
            <div 
              key={item.id} 
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false); // Close menu on selection
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </aside>

        <main className="admin-content">
          <div className="content-inner">
            <h1 className="page-title-tab">{sidebarItems.find(i => i.id === activeTab)?.name}</h1>
            
            {activeTab === 'overview' && (
              <>
                <div className="overview-cards" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  <div className="summary-card" style={{ borderLeftColor: '#3b82f6' }}>
                    <label>Total Courses</label>
                    <div className="value">{adminCourses.length}</div>
                    <button className="btn-manage-card" onClick={() => setActiveTab('courses')}>
                      Manage <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="summary-card" style={{ borderLeftColor: '#10b981' }}>
                    <label>Total Students</label>
                    <div className="value">{enrollments.filter(e => e.status === 'accepted').length}</div>
                    <button className="btn-manage-card" onClick={() => setActiveTab('progress')}>
                      Details <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="summary-card" style={{ borderLeftColor: '#f59e0b' }}>
                    <label>Fee Pendings</label>
                    <div className="value">
                      {enrollments.filter(e => e.status === 'accepted' && !e.paid).length}
                    </div>
                    <button className="btn-manage-card" onClick={() => setActiveTab('fees')}>
                      Review <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="summary-card" style={{ borderLeftColor: '#ef4444' }}>
                    <label>Pending Apps</label>
                    <div className="value">
                      {enrollments.filter(e => e.status === 'pending').length}
                    </div>
                    <button className="btn-manage-card" onClick={() => setActiveTab('students')}>
                      Approve <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="activity-section" style={{ marginTop: '40px' }}>
                  <div className="section-header">Recent System Activity</div>
                  <div className="activity-list">
                    {enrollments.slice(0, 5).map((e, idx) => (
                      <div key={idx} className="activity-item">
                        <div className="activity-icon" style={{ 
                          background: e.status === 'accepted' ? '#dcfce7' : e.status === 'pending' ? '#fef9c3' : '#fee2e2' 
                        }}>
                          {e.status === 'accepted' ? <CheckCircle size={18} color="#15803d" /> : <TrendingUp size={18} color="#854d0e" />}
                        </div>
                        <div className="activity-details">
                          <h4>{e.name} {e.status === 'accepted' ? 'enrolled in' : 'applied for'} {e.course}</h4>
                          <p>Status updated to <strong>{e.status.toUpperCase()}</strong> • {new Date(e.enrolled_on).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                    {enrollments.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                        No recent activity recorded.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'students' && (
              <div className="data-panel">
                <div className="panel-header">
                  <div className="panel-title">Student Enrollments</div>
                  <div className="search-inner">
                    <Search size={18} />
                    <input 
                      type="text" 
                      placeholder="Search students..." 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Student Info</th>
                      <th>Selected Program</th>
                      <th>Enrolled On</th>
                      <th>Enrollment Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnrollments.length > 0 ? (
                      filteredEnrollments.map(e => (
                        <tr key={e.id}>
                          <td>
                            <div style={{ fontWeight: 800, color: '#0f172a' }}>{e.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{e.email}</div>
                          </td>
                          <td style={{ fontWeight: 700 }}>{e.course}</td>
                          <td>{e.enrolled_on ? new Date(e.enrolled_on).toLocaleDateString('en-GB') : 'N/A'}</td>
                          <td>
                            <span className={`badge badge-${e.status}`}>{e.status}</span>
                          </td>
                          <td>
                            {e.status === 'pending' ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <button 
                                   className="btn-approve" 
                                   onClick={() => handleStatusChange(e.id, 'accepted')}
                                 >Approve</button>
                                 <button 
                                   style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}
                                   onClick={() => handleStatusChange(e.id, 'rejected')}
                                 >Reject</button>
                              </div>
                            ) : (
                              <div>
                                 <div style={{ fontWeight: 700, color: e.status === 'accepted' ? '#15803d' : '#ef4444', marginBottom: '8px', fontSize: '0.85rem' }}>
                                   {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                                 </div>
                                 {e.status === 'accepted' && (
                                   <div style={{ display: 'flex', gap: '8px' }}>
                                      <button 
                                        style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontWeight: 700 }}
                                        onClick={() => openMailDraft(e)}
                                      >
                                        <Mail size={12} /> Send Mail
                                      </button>
                                      <button 
                                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}
                                        onClick={() => handleStatusChange(e.id, 'pending')}
                                      >
                                        Cancel Enrollment
                                      </button>
                                   </div>
                                 )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                          No students have enrolled yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="data-panel">
                <div className="panel-header">
                  <div className="panel-title">System Courses</div>
                  <button className="btn-add-main" onClick={() => {
                      setNewCourse({ name: '', location: 'Bidar, Karnataka.', mode: 'Offline', duration: '', fees: '', description: '' });
                      setEditingId(null);
                      setIsModalOpen(true);
                  }}>
                    <Plus size={18} /> Add New Course
                  </button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Course Module</th>
                      <th>Duration</th>
                      <th>Fees</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminCourses.length > 0 ? (
                      adminCourses.map(course => (
                        <tr key={course.id}>
                          <td style={{ fontWeight: 800 }}>{course.title || course.name}</td>
                          <td>{course.duration || 'N/A'}</td>
                          <td>₹{course.price || course.fees || '0'}</td>
                          <td>
                            <span className={`badge badge-${course.status || 'accepted'}`}>
                              {course.status || 'Accepted'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                className="btn-approve" 
                                style={{ padding: '6px 12px', opacity: course.status === 'accepted' ? 0.5 : 1 }}
                                disabled={course.status === 'accepted'}
                                onClick={() => handleCourseStatusChange(course.id, 'accepted')}
                              >Approve</button>
                              <button 
                                className="btn-decline"
                                style={{ padding: '6px 12px', opacity: course.status === 'rejected' ? 0.5 : 1 }}
                                disabled={course.status === 'rejected'}
                                onClick={() => handleCourseStatusChange(course.id, 'rejected')}
                              >Decline</button>
                              <button 
                                className="btn-edit-inline"
                                style={{ padding: '6px 12px' }}
                                onClick={() => {
                                    setNewCourse({
                                        name: course.title,
                                        duration: course.duration,
                                        fees: course.price || course.fees,
                                        location: course.location || 'Bidar, Karnataka.',
                                        mode: course.mode || 'Offline',
                                        description: course.description
                                    });
                                    setEditingId(course.id);
                                    setIsModalOpen(true);
                                }}
                              >Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                          No courses available in the system.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'certs' && (
              <div className="data-panel">
                <div className="panel-header">
                  <div className="panel-title">Institutional Certificate Issuance</div>
                </div>
                
                <div className="info-box">
                  <strong>Note:</strong> Following the <strong>TechMasters Institution Guidelines</strong>, certificates are dynamically generated using Student Name, Course Name, Batch Duration (Start/End), and a Unique QR-Verified ID. They remain <strong>LOCKED</strong> until all graduation criteria are met.
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Student / Institution Metadata</th>
                      <th>Course Period</th>
                      <th>Criteria Status</th>
                      <th>Certificate Lock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.filter(e => e.status === 'accepted').length > 0 ? (
                      enrollments.filter(e => e.status === 'accepted').map(e => {
                        const isAutoUnlocked = (e.progress_percentage || 0) >= 100;
                        const isManuallyUnlocked = unlockedEnrollments.includes(e.id) || e.certificate_unlocked;
                        const isUnlocked = isAutoUnlocked || isManuallyUnlocked;

                        return (
                          <tr key={e.id}>
                            <td>
                              <div style={{ fontWeight: 800, color: '#0f172a' }}>{e.name}</div>
                              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Course: {e.course}</div>
                              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>ID: TM-2023-{e.id}</div>
                            </td>
                            <td>
                               <div style={{ fontSize: '0.85rem', color: '#475569' }}>From: <span style={{ fontWeight: 700 }}>TBD</span></div>
                               <div style={{ fontSize: '0.85rem', color: '#475569' }}>To: <span style={{ fontWeight: 700 }}>TBD</span></div>
                            </td>
                            <td>
                               <div style={{ display: 'flex', gap: '8px', color: '#cbd5e1' }}>
                                  <Users size={16} title="Student Verified" /> 
                                  <span style={{ color: e.paid ? '#10b981' : '#f43f5e' }} title="Fee Status">$</span>
                                  <CheckCircle size={16} color={isUnlocked ? '#10b981' : '#cbd5e1'} title="Course Complete" />
                               </div>
                            </td>
                            <td>
                               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isUnlocked ? '#10b981' : '#f43f5e', fontWeight: 800, fontSize: '0.85rem' }}>
                                  {isUnlocked ? <Unlock size={16} /> : <Lock size={16} />}
                                  {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                                  {!isUnlocked && (
                                    <button 
                                      onClick={() => {
                                        setSelectedEnrollment(e);
                                        setIsUnlockModalOpen(true);
                                      }}
                                      style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', cursor: 'pointer', color: '#1e3a8a', fontWeight: 700 }}
                                    >
                                      Override
                                    </button>
                                  )}
                               </div>
                            </td>
                            <td>
                               <button 
                                 className="btn-issue"
                                 style={{ 
                                   background: isUnlocked ? '#2563eb' : '#eff6ff', 
                                   color: isUnlocked ? 'white' : '#2563eb', 
                                   border: isUnlocked ? 'none' : '1px solid #dbeafe', 
                                   padding: '10px 24px', 
                                   borderRadius: '8px', 
                                   fontWeight: 800, 
                                   cursor: 'pointer',
                                   display: 'flex',
                                   alignItems: 'center',
                                   gap: '8px'
                                 }}
                                 onClick={() => {
                                   setSelectedEnrollment(e);
                                   if (isUnlocked) {
                                      setSelectedEnrollmentForCert(e);
                                      setIsCertModalOpen(true);
                                   } else {
                                      setIsUnlockModalOpen(true);
                                   }
                                 }}
                               >
                                  {isUnlocked ? (
                                    <><CheckCircle size={16} /> Issue Certificate</>
                                  ) : (
                                    <><Lock size={16} /> Unlock & Issue</>
                                  )}
                               </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                          No accepted enrollments eligible for certification.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'fees' && (
              <div className="data-panel">
                <div className="panel-header">
                  <div className="panel-title">Institutional Fee Details</div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>STUDENT NAME / ID</th>
                      <th>JOINED ON / BATCH</th>
                      <th>COURSE FEES</th>
                      <th>PAST TRANSACTIONS</th>
                      <th>BALANCE REMAINING</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.filter(e => e.status === 'accepted').map(e => (
                      <tr key={e.id}>
                        <td>
                          <div style={{ fontWeight: 800 }}>{e.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ID: TM-2023-{e.id}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.9rem' }}>{new Date(e.enrolled_on).toLocaleDateString()}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Morning Batch</div>
                        </td>
                        <td style={{ fontWeight: 700 }}>
                          ₹{(() => {
                            const cObj = adminCourses.find(c => (c.title === e.course || c.name === e.course));
                            return parseFloat(e.total_fee) > 0 ? e.total_fee : (cObj ? (cObj.price || cObj.fees || 15000) : 15000);
                          })()}
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem' }}>₹{e.paid_amount || '0'}</div>
                          <div style={{ fontSize: '0.8rem', color: e.paid ? '#16a34a' : '#ef4444' }}>
                            {e.paid ? 'Confirmed' : 'Pending'}
                          </div>
                        </td>
                        <td>
                          <div style={{ color: '#ef4444', fontWeight: 800 }}>
                            ₹{(() => {
                              const cObj = adminCourses.find(c => (c.title === e.course || c.name === e.course));
                              const tFee = parseFloat(e.total_fee) > 0 ? e.total_fee : (cObj ? (cObj.price || cObj.fees || 15000) : 15000);
                              const balance = tFee - (e.paid_amount || 0);
                              return balance > 0 ? balance : 0;
                            })()}
                          </div>
                          {!e.paid && <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444' }}>OVERDUE</div>}
                        </td>
                        <td>
                          <button 
                            style={{ background: '#1e293b', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                            onClick={() => {
                                setSelectedEnrollment(e);
                                const courseObj = adminCourses.find(c => (c.title === e.course || c.name === e.course));
                                const amountToSet = (parseFloat(e.total_fee) > 0) ? e.total_fee : (courseObj ? (courseObj.price || courseObj.fees || 15000) : 15000);
                                setPaymentAmount(amountToSet);
                                setIsPaymentModalOpen(true);
                            }}
                          >Process Payment</button>
                        </td>
                      </tr>
                    ))}
                    {enrollments.filter(e => e.status === 'accepted').length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No active student payments found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="data-panel">
                <div className="panel-header">
                  <div className="panel-title">Student Learning Progress</div>
                  <div className="search-inner">
                    <Search size={18} />
                    <input 
                      type="text" 
                      placeholder="Search courses..." 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Course <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} /></th>
                      <th>Progress <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} /></th>
                      <th>Status <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} /></th>
                      <th>Enrolled On <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} /></th>
                      <th style={{ minWidth: '150px' }}>Last Accessed <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} /></th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.filter(e => e.status === 'accepted').map(e => (
                      <tr key={e.id}>
                        <td>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{e.course}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{e.course_details?.mode || 'Hybrid'}</div>
                        </td>
                        <td style={{ fontWeight: 700, color: '#1e293b' }}>{e.progress_percentage || 0}%</td>
                        <td>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            padding: '6px 14px', 
                            borderRadius: '20px', 
                            background: '#fef9c3', 
                            color: '#854d0e',
                            border: '1px solid #fef08a'
                          }}>
                            In Progress
                          </span>
                        </td>
                        <td style={{ color: '#475569' }}>
                          {new Date(e.enrolled_on).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td style={{ color: '#94a3b8' }}>
                          {e.last_accessed ? '10 mins ago' : 'Not Started'}
                        </td>
                        <td>
                           <button 
                             style={{ background: 'none', border: 'none', color: '#d97706', padding: 0, fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                             className="btn-view-course"
                             onClick={() => {
                               setSelectedEnrollmentForProgress(e);
                               setIsProgressModalOpen(true);
                             }}
                           >
                              <Search size={16} /> View Course
                           </button>
                        </td>
                      </tr>
                    ))}
                    {enrollments.filter(e => e.status === 'accepted').length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No student progress data available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Professional Secure Payment Modal */}
      {isPaymentModalOpen && selectedEnrollment && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, backdropFilter: 'blur(4px)' }}>
           <div style={{ background: 'white', borderRadius: '20px', width: 'min(850px, 95%)', display: 'flex', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
              
              {/* Left Sidebar: Payment Summary */}
              <div style={{ width: '300px', background: '#f8fafc', padding: '40px 30px', borderRight: '1px solid #e2e8f0' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', color: '#1e3a8a' }}>
                    <div style={{ background: '#dbeafe', padding: '8px', borderRadius: '12px' }}>
                       <CreditCard size={24} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Secure Checkout</span>
                 </div>

                 <div style={{ marginBottom: '30px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Student Details</label>
                    <div style={{ marginTop: '10px' }}>
                       <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{selectedEnrollment.name}</div>
                       <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>{selectedEnrollment.email}</div>
                    </div>
                 </div>

                 <div style={{ marginBottom: '30px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Course Enrolled</label>
                    <div style={{ marginTop: '10px', fontWeight: 700, color: '#1e293b' }}>{selectedEnrollment.course}</div>
                 </div>

                 <div style={{ marginTop: 'auto', paddingTop: '30px', borderTop: '2px dashed #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                       <span style={{ color: '#64748b', fontWeight: 600 }}>Total Fee</span>
                       <span style={{ fontWeight: 700 }}>₹{selectedEnrollment.total_fee || '15,000'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                       <span style={{ color: '#64748b', fontWeight: 600 }}>GST (0%)</span>
                       <span style={{ fontWeight: 700 }}>₹0</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <span style={{ color: '#0f172a', fontWeight: 800 }}>Payable Amount</span>
                       <span style={{ color: '#2563eb', fontWeight: 900, fontSize: '1.5rem' }}>₹{paymentAmount || selectedEnrollment.total_fee || '15,000'}</span>
                    </div>
                 </div>
              </div>

              {/* Right Side: Payment Methods */}
              <div style={{ flex: 1, padding: '40px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h3 style={{ margin: 0, fontWeight: 800, fontSize: '1.4rem' }}>Payment Method</h3>
                    <button onClick={() => setIsPaymentModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                       <Plus style={{ transform: 'rotate(45deg)' }} size={24} />
                    </button>
                 </div>

                 <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                    <button 
                      onClick={() => setPaymentMethod('upi')}
                      style={{ flex: 1, padding: '15px', borderRadius: '12px', border: `2px solid ${paymentMethod === 'upi' ? '#2563eb' : '#e2e8f0'}`, background: paymentMethod === 'upi' ? '#eff6ff' : 'white', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                       <div style={{ color: paymentMethod === 'upi' ? '#2563eb' : '#64748b', marginBottom: '8px' }}><TrendingUp size={20} /></div>
                       <div style={{ fontWeight: 700, fontSize: '0.9rem', color: paymentMethod === 'upi' ? '#1e3a8a' : '#475569' }}>UPI Payment</div>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      style={{ flex: 1, padding: '15px', borderRadius: '12px', border: `2px solid ${paymentMethod === 'card' ? '#2563eb' : '#e2e8f0'}`, background: paymentMethod === 'card' ? '#eff6ff' : 'white', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                       <div style={{ color: paymentMethod === 'card' ? '#2563eb' : '#64748b', marginBottom: '8px' }}><CreditCard size={20} /></div>
                       <div style={{ fontWeight: 700, fontSize: '0.9rem', color: paymentMethod === 'card' ? '#1e3a8a' : '#475569' }}>Card Payment</div>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('scanner')}
                      style={{ flex: 1, padding: '15px', borderRadius: '12px', border: `2px solid ${paymentMethod === 'scanner' ? '#2563eb' : '#e2e8f0'}`, background: paymentMethod === 'scanner' ? '#eff6ff' : 'white', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                       <div style={{ color: paymentMethod === 'scanner' ? '#2563eb' : '#64748b', marginBottom: '8px' }}><Search size={20} /></div>
                       <div style={{ fontWeight: 700, fontSize: '0.9rem', color: paymentMethod === 'scanner' ? '#1e3a8a' : '#475569' }}>QR Scanner</div>
                    </button>
                 </div>

                 <div style={{ minHeight: '260px' }}>
                    {paymentMethod === 'upi' && (
                       <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px' }}>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '10px' }}>Enter UPI ID (VPA)</label>
                          <input 
                             type="text" 
                             placeholder="username@bank"
                             style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '1rem', marginBottom: '10px' }}
                          />
                          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Example: shiva@okaxis, 7204439007@ybl</p>
                       </div>
                    )}

                    {paymentMethod === 'card' && (
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                          <div style={{ gridColumn: 'span 2' }}>
                             <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Card Number</label>
                             <input type="text" placeholder="XXXX XXXX XXXX XXXX" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                          </div>
                          <div>
                             <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Expiry Date</label>
                             <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                          </div>
                          <div>
                             <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>CVV</label>
                             <input type="password" placeholder="***" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                          </div>
                       </div>
                    )}

                    {paymentMethod === 'scanner' && (
                       <div style={{ textAlign: 'center' }}>
                          <div style={{ width: '160px', height: '160px', background: '#fff', border: '1px solid #e2e8f0', margin: '0 auto 15px', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                             {/* Mock QR Code */}
                             <div style={{ width: '100%', height: '100%', border: '8px solid #0f172a', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '40%', border: '4px solid #0f172a' }}></div>
                                <div style={{ position: 'absolute', top: 0, right: 0, width: '30%', height: '30%', border: '4px solid #0f172a' }}></div>
                                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30%', height: '30%', border: '4px solid #0f172a' }}></div>
                                <div style={{ position: 'absolute', inset: '35%', background: '#0f172a' }}></div>
                             </div>
                          </div>
                          <p style={{ fontWeight: 700, color: '#1e3a8a', margin: 0 }}>Scan to pay ₹{paymentAmount || selectedEnrollment.total_fee}</p>
                          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '5px' }}>Accepts all UPI Apps (GPay, PhonePe, Paytm)</p>
                       </div>
                    )}
                 </div>

                 <button 
                   onClick={() => handlePaymentUpdate(selectedEnrollment.id, paymentAmount || selectedEnrollment.total_fee)}
                   disabled={loading}
                   style={{ 
                     width: '100%', 
                     padding: '18px', 
                     background: '#2563eb', 
                     color: 'white', 
                     border: 'none', 
                     borderRadius: '14px', 
                     fontSize: '1.1rem', 
                     fontWeight: 800, 
                     cursor: 'pointer',
                     marginTop: '30px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: '10px',
                     transition: 'all 0.3s'
                   }}
                 >
                    {loading ? 'Processing...' : (
                       <>
                          <CheckCircle size={20} />
                          Finalize Payment
                       </>
                    )}
                 </button>
                 
                 <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '20px' }}>
                    🔐 Encrypted by TechMasters Financial Gateway • Secure Transaction
                 </p>
              </div>
           </div>
        </div>
      )}

      {/* Basic Course Modal Logic */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
           <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: 'min(500px, 95%)' }}>
              <h3 style={{ margin: '0 0 20px', fontWeight: 800 }}>{editingId ? 'Edit' : 'Add New'} Course</h3>
              <input style={{ width: '100%', padding: '10px', marginBottom: '15px' }} placeholder="Course Title" value={newCourse.name} onChange={e => setNewCourse({...newCourse, name: e.target.value})} />
              <input style={{ width: '100%', padding: '10px', marginBottom: '15px' }} placeholder="Duration (e.g. 4 Months)" value={newCourse.duration} onChange={e => setNewCourse({...newCourse, duration: e.target.value})} />
              <input style={{ width: '100%', padding: '10px', marginBottom: '20px' }} placeholder="Fees (₹)" value={newCourse.fees} onChange={e => setNewCourse({...newCourse, fees: e.target.value})} />
              <div style={{ display: 'flex', gap: '10px' }}>
                 <button 
                   style={{ flex: 1, padding: '12px', background: '#b91c1c', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }} 
                   disabled={loading}
                   onClick={handleSaveCourse}
                 >
                   {loading ? 'Saving...' : 'Save Course'}
                 </button>
                 <button 
                   style={{ flex: 1, padding: '12px', background: '#f1f5f9', color: '#1e293b', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                   onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                 >Discard</button>
              </div>
           </div>
        </div>
      )}

      {isMailModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
           <div style={{ background: 'white', padding: '30px', borderRadius: '12px', width: 'min(700px, 95%)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontWeight: 800 }}>Draft Enrollment Approval Mail</h3>
                <button onClick={() => setIsMailModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '5px' }}>Recipient:</label>
                <input 
                  type="text" 
                  value={mailContent.to} 
                  readOnly
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '5px' }}>Subject:</label>
                <input 
                  type="text" 
                  value={mailContent.subject} 
                  onChange={e => setMailContent({...mailContent, subject: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '5px' }}>Email Content:</label>
                <textarea 
                  value={mailContent.body} 
                  onChange={e => setMailContent({...mailContent, body: e.target.value})}
                  style={{ width: '100%', height: '350px', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: '1.6' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                 <button 
                   style={{ padding: '12px 25px', background: '#f1f5f9', color: '#1e293b', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                   onClick={() => setIsMailModalOpen(false)}
                 >Discard</button>
                 <button 
                   style={{ padding: '12px 30px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                   onClick={handleSendCustomMail}
                   disabled={loading}
                 >
                   {loading ? 'Sending...' : <><Mail size={18} /> Send Professional Mail</>}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* White, Blue, Black Professional Progress Detail Modal */}
      {isProgressModalOpen && selectedEnrollmentForProgress && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, backdropFilter: 'blur(8px)' }}>
           <div style={{ background: '#ffffff', borderRadius: '24px', width: 'min(900px, 95%)', padding: '0', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)', border: '1px solid #e2e8f0' }}>
              
              {/* Blue Header Strip */}
              <div style={{ height: '8px', background: 'linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)' }}></div>
              
              <div style={{ padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '35px' }}>
                  <div>
                    <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em' }}>
                       {selectedEnrollmentForProgress.course}
                    </h1>
                    <div style={{ color: '#2563eb', fontSize: '1.2rem', fontWeight: 700, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></div>
                       {selectedEnrollmentForProgress.course_details?.mode || 'Hybrid'} Edition
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsProgressModalOpen(false)}
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', color: '#64748b', padding: '10px', borderRadius: '12px', transition: 'all 0.2s' }}
                  >
                    <Plus style={{ transform: 'rotate(45deg)' }} size={24} />
                  </button>
                </div>

                <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '16px', borderLeft: '5px solid #1e3a8a', marginBottom: '40px' }}>
                   <p style={{ color: '#334155', lineHeight: '1.7', fontSize: '1rem', margin: 0, fontWeight: 500 }}>
                      {selectedEnrollmentForProgress.course_details?.description || "This institutional program is precision-engineered to transform candidates into industry-ready professionals. It covers end-to-end technical modules with practical deployment focus."}
                   </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                  
                  {/* Status Card */}
                  <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                     <label style={{ display: 'block', color: '#2563eb', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>Student Status</label>
                     <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.2rem' }}>In Training</div>
                  </div>

                  {/* Enrolled Card */}
                  <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                     <label style={{ display: 'block', color: '#2563eb', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>Enrollment Date</label>
                     <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.2rem' }}>
                        {new Date(selectedEnrollmentForProgress.enrolled_on).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                     </div>
                  </div>

                  {/* Progress Card */}
                  <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <label style={{ color: '#2563eb', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Curriculum</label>
                        <span style={{ fontWeight: 900, color: '#0f172a' }}>{selectedEnrollmentForProgress.progress_percentage || 0}%</span>
                     </div>
                     <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{ width: `${selectedEnrollmentForProgress.progress_percentage || 0}%`, height: '100%', background: 'linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)' }}></div>
                     </div>
                  </div>

                  {/* Attendance Card */}
                  <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <label style={{ color: '#2563eb', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Attendance</label>
                        <span style={{ fontWeight: 900, color: (selectedEnrollmentForProgress.attendance > 0) ? '#0f172a' : '#94a3b8' }}>
                          {selectedEnrollmentForProgress.attendance > 0 ? `${selectedEnrollmentForProgress.attendance}%` : 'TBD'}
                        </span>
                     </div>
                     <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
                        <div style={{ width: `${selectedEnrollmentForProgress.attendance || 0}%`, height: '100%', background: '#10b981' }}></div>
                     </div>
                     <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>
                        {selectedEnrollmentForProgress.attendance > 0 ? 'Min: 60% Required' : 'Waiting for Start'}
                     </div>
                  </div>
                </div>

                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                   <button 
                     onClick={() => setIsProgressModalOpen(false)}
                     style={{ padding: '14px 40px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s', fontSize: '0.95rem', boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)' }}
                   >
                     Done Reviewing
                   </button>
                </div>
              </div>
           </div>
        </div>
      )}

      {loading && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: 'white', padding: '10px 20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 3000 }}>
           <div style={{ width: '16px', height: '16px', border: '2px solid #b91c1c', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
           <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>Syncing data...</span>
        </div>
      )}
      {/* Professional Unlock Override Modal */}
      {isUnlockModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, backdropFilter: 'blur(10px)' }}>
           <div style={{ background: '#ffffff', borderRadius: '24px', width: 'min(400px, 95%)', padding: '35px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '2px solid #e2e8f0' }}>
                 <Lock color="#1e3a8a" size={28} />
              </div>
              <h2 style={{ margin: '0 0 10px', color: '#0f172a', fontWeight: 900 }}>Admin Override</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '25px', lineHeight: '1.5' }}>
                 Enter the secure institutional PIN to manually unlock this certificate for <strong>{selectedEnrollment?.name}</strong>.
              </p>
              
              <input 
                type="password" 
                placeholder="Enter PIN Code"
                value={unlockPasswordInput}
                onChange={(e) => setUnlockPasswordInput(e.target.value)}
                style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1.2rem', textAlign: 'center', fontWeight: 800, marginBottom: '25px', color: '#1e3a8a', outline: 'none' }}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                 <button 
                   onClick={() => {
                     setIsUnlockModalOpen(false);
                     setUnlockPasswordInput('');
                   }}
                   style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={() => {
                     if (unlockPasswordInput === masterUnlockPassword) {
                        handleUnlockCert(selectedEnrollment.id);
                        setIsUnlockModalOpen(false);
                        setUnlockPasswordInput('');
                        setSelectedEnrollmentForCert(selectedEnrollment);
                        setIsCertModalOpen(true);
                     } else {
                        alert("Access Denied: Incorrect PIN.");
                     }
                   }}
                   style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#1e3a8a', color: 'white', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.4)' }}
                 >
                   Verify PIN
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Professional Certificate Preview & Download Modal */}
      {isCertModalOpen && selectedEnrollmentForCert && (
        <div className="cert-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 4000, backdropFilter: 'blur(10px)', padding: '10px' }}>
           <div className="cert-modal-container" style={{ background: 'white', width: 'min(1000px, 98%)', borderRadius: '0', display: 'flex', flexDirection: 'column', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
              
              <div style={{ background: '#0f172a', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                 <div>
                    <h3 style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem' }}>Certificate Management Portal</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Previewing official document for Enrollment: TM-2023-{selectedEnrollmentForCert.id}</p>
                 </div>
                 <button 
                   onClick={() => setIsCertModalOpen(false)}
                   style={{ background: '#1e293b', border: '1px solid #334155', color: 'white', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
                 >Close Portal</button>
              </div>

              <div style={{ padding: '60px', background: '#f8fafc', overflowY: 'auto', maxHeight: '70vh', display: 'flex', justifyContent: 'center' }}>
                 {/* Certificate Design */}
                 <div id="capture-cert" style={{ 
                   width: '842px', 
                   height: '595px', 
                   background: 'white', 
                   border: '25px solid #0f172a', 
                   position: 'relative', 
                   padding: '50px',
                   boxSizing: 'border-box',
                   boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                 }}>
                    {/* Inner Border */}
                    <div style={{ border: '2px solid #e2e8f0', height: '100%', width: '100%', position: 'relative', padding: '40px', boxSizing: 'border-box', textAlign: 'center' }}>
                       
                       <img src="/logo.jpg" alt="TM Logo" style={{ width: '100px', marginBottom: '20px' }} />
                       
                       <h1 style={{ fontFamily: "'Times New Roman', serif", fontSize: '3rem', margin: '0 0 10px', color: '#0f172a', fontWeight: 400, fontStyle: 'italic' }}>Certificate of Completion</h1>
                       <p style={{ fontSize: '1.2rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>This institutional document certifies that</p>
                       
                       <h2 style={{ fontSize: '2.8rem', margin: '0 0 20px', color: '#1e3a8a', fontWeight: 800, textDecoration: 'underline' }}>{selectedEnrollmentForCert.name}</h2>
                       
                       <p style={{ fontSize: '1.1rem', color: '#444', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 40px' }}>
                          has successfully fulfilled all academic and professional requirements for the comprehensive training program in 
                          <strong style={{ display: 'block', fontSize: '1.5rem', color: '#0f172a', marginTop: '10px' }}>{selectedEnrollmentForCert.course}</strong>
                       </p>

                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '50px', padding: '0 50px' }}>
                          <div style={{ textAlign: 'center' }}>
                             <div style={{ borderBottom: '2px solid #0f172a', width: '180px', marginBottom: '10px' }}></div>
                             <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9rem' }}>Academic Director</p>
                             <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>TechMasters Trainings</p>
                          </div>
                          
                          <div style={{ textAlign: 'center' }}>
                             <div style={{ width: '100px', height: '100px', border: '5px double #1e3a8a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                                <div style={{ fontWeight: 900, fontSize: '0.75rem', color: '#1e3a8a' }}>SEAL OF<br/>EXCELLENCE</div>
                             </div>
                          </div>

                          <div style={{ textAlign: 'center' }}>
                             <div style={{ borderBottom: '2px solid #0f172a', width: '180px', marginBottom: '10px' }}></div>
                             <p style={{ margin: 0, fontWeight: 800, fontSize: '0.9rem' }}>Verification Officer</p>
                             <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>TechMasters Institutional Body</p>
                          </div>
                       </div>

                       <div style={{ position: 'absolute', bottom: '20px', left: '40px', fontSize: '0.75rem', color: '#94a3b8' }}>
                          Verify Certificate ID: TM-ADMIN-VER-{selectedEnrollmentForCert.id}2023
                       </div>
                    </div>
                 </div>
              </div>

              <div style={{ padding: '30px 40px', background: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                 <button 
                   onClick={() => {
                     alert("Certificate issues is completed");
                     // Logic for actual PDF download can be added here
                   }}
                   style={{ background: '#2563eb', color: 'white', border: 'none', padding: '16px 50px', borderRadius: '12px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)' }}
                 >
                    <Award size={24} /> Download Certificate (PDF)
                 </button>
                 <button 
                   onClick={() => setIsCertModalOpen(false)}
                   style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '16px 30px', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
                 >Exit Preview</button>
              </div>

           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
