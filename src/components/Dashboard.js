import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  LayoutDashboard, 
  Plus, 
  LogOut, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Save, 
  ChevronRight,
  Menu,
  X,
  UserCheck,
  Search,
  DollarSign,
  TrendingUp,
  Clock,
  Check,
  Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import emailjs from '@emailjs/browser';

const systemCoursesList = [
  { name: 'Python Full Stack', duration: '4 Months', fees: '₹15,000' },
  { name: 'Flask Framework', duration: '4 Months', fees: '₹10,000' },
  { name: 'Java Full Stack Development', duration: '6 Months', fees: '₹12,500' },
  { name: 'Django', duration: '4 Months', fees: '₹10,000' },
  { name: 'Python Programming', duration: '4 Months', fees: '₹8,500' },
  { name: 'Python Full Stack Development', duration: '6 Months', fees: '₹12,500' },
  { name: 'Artificial Intelligence', duration: '6 Months', fees: '₹15,000' },
  { name: 'Data Science', duration: '6 Months', fees: '₹15,000' },
  { name: 'Java DSA', duration: '6 Months', fees: '₹12,000' },
  { name: 'Python DSA', duration: '4 Months', fees: '₹10,500' },
  { name: 'Cloud', duration: '4 Months', fees: '₹14,000' },
  { name: 'Machine Learning', duration: '6 Months', fees: '₹14,500' },
  { name: 'C Programming', duration: '3 Months', fees: '₹6,500' },
  { name: 'Spring Framework', duration: '4 Months', fees: '₹11,000' },
  { name: 'MySQL', duration: '2 Months', fees: '₹5,000' },
  { name: 'Oracle', duration: '3 Months', fees: '₹8,500' },
  { name: 'PostgreSQL', duration: '3 Months', fees: '₹8,500' },
  { name: 'Java', duration: '4 Months', fees: '₹8,500' },
  { name: 'Advance Programming - Databases', duration: '4 Months', fees: '₹11,500' },
  { name: 'MERN Full Stack Development', duration: '6 Months', fees: '₹12,500' },
  { name: 'Development Course', duration: '4 Months', fees: '₹8,500' },
  { name: 'Frontend Development', duration: '4 Months', fees: '₹9,500' },
  { name: 'Backend Development', duration: '4 Months', fees: '₹10,500' },
  { name: 'DSA Programming', duration: '4 Months', fees: '₹10,000' },
  { name: 'Spring Boot', duration: '4 Months', fees: '₹11,500' },
  { name: 'C DSA', duration: '4 Months', fees: '₹9,000' },
];

const Dashboard = ({ adminCourses, setAdminCourses, enrollments, setEnrollments }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    location: 'Bidar, Karnataka.',
    mode: 'Offline',
    duration: '',
    fees: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payStudent, setPayStudent] = useState(null);
  const [payStep, setPayStep] = useState(1);
  const [payPin, setPayPin] = useState('');
  const [payError, setPayError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, cash
  
  // New States for Progress and Certification
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Certificate Authorization Security
  const [isCertAuthOpen, setIsCertAuthOpen] = useState(false);
  const [isCertPreviewOpen, setIsCertPreviewOpen] = useState(false);
  const [certAuthStudent, setCertAuthStudent] = useState(null);
  const [certAuthPin, setCertAuthPin] = useState('');
  const [certAuthError, setCertAuthError] = useState('');
  
  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  // One-time emergency clean-up for accidental test payment logs
  React.useEffect(() => {
    const isCleaned = localStorage.getItem('tm_payment_clean_001');
    if (!isCleaned && setEnrollments) {
      setEnrollments(prev => prev.map(e => ({ ...e, paid: false, paidAmount: 0 })));
      localStorage.setItem('tm_payment_clean_001', 'true');
    }
  }, [setEnrollments]);

  const calculateEligibility = (e) => {
    const attendance = e.attendance || 0;
    const project = e.projectStatus === 'Completed';
    const isPaid = e.paid;
    return attendance >= 75 && project && isPaid;
  };

  const getCourseShortName = (courseName) => {
    const name = courseName.toUpperCase();
    if (name.includes('JAVA')) return 'JFS';
    if (name.includes('PYTHON')) return 'PFS';
    if (name.includes('MERN')) return 'MERN';
    if (name.includes('DATA SCIENCE')) return 'DS';
    if (name.includes('CLOUD')) return 'CC';
    if (name.includes('FULL STACK')) return 'FS';
    return name.split(' ').map(w => w[0]).join('').slice(0, 4);
  };

  const getCertificateID = (student) => {
    if (!student) return '';
    const shortName = getCourseShortName(student.course);
    const studentNum = student.id.toString().slice(-3); 
    return `TM-${shortName}-2026-${studentNum}`;
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (editingId) {
      setAdminCourses(adminCourses.map(c => 
        c.id === editingId ? { ...newCourse, id: c.id, status: c.status } : c
      ));
      setEditingId(null);
    } else {
      setAdminCourses([...adminCourses, { ...newCourse, id: Date.now(), status: 'pending' }]);
    }
    setIsModalOpen(false);
    setNewCourse({ name: '', location: 'Bidar, Karnataka.', mode: 'Offline', duration: '', fees: '', description: '' });
  };

  const handleEditClick = (course) => {
    setNewCourse(course);
    setEditingId(course.id);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setNewCourse({ name: '', location: 'Bidar, Karnataka.', mode: 'Offline', duration: '', fees: '', description: '' });
    setIsModalOpen(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setAdminCourses(adminCourses.map(course => 
      course.id === id ? { ...course, status: newStatus } : course
    ));
  };

  const sendAcceptanceEmail = (student) => {
    if (!student.email) return;

    const enrollmentDate = new Date(student.id).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });

    // Determine duration based on course name
    let duration = '6 Months'; 
    const courseLower = student.course.toLowerCase();
    if (courseLower.includes('python')) duration = '4 Months';
    else if (courseLower.includes('mern')) duration = '6 Months';
    else if (courseLower.includes('java')) duration = '6 Months';
    else if (courseLower.includes('data science')) duration = '6 Months';

    const message = `Dear Student,

Greetings from TechMasters Training Institute.

We are pleased to inform you that your enrollment for the course ${student.course} has been successfully processed.

Enrollment Details:
• Course Name: ${student.course}
• Course Duration: ${duration}
• Enrollment Date: ${enrollmentDate}

This course is designed to provide you with comprehensive knowledge and practical exposure to industry-relevant technologies. Throughout the training program, you will gain hands-on experience in core concepts, real-time project development, coding best practices, and modern development tools. The curriculum focuses on enhancing your technical skills, problem-solving abilities, and overall readiness for career opportunities in the software development domain.

Kindly note that your admission will be confirmed only after the completion of the course fee payment.
You are requested to complete the payment within 2–3 days from the date of receiving this email. Failure to do so may result in declining or cancellation of your enrollment, as the seat will be allocated to another eligible candidate.

If you have any questions, need clarification regarding the course structure, payment process, or batch schedule, please feel free to contact us.

📞 Contact Number: 9880768222

We look forward to your prompt response and wish you a successful learning journey with us.

Warm Regards,
Admin Team
TechMasters Training Institute
Email: techmasterstrainings@gmail.com`;

    const mailtoSubject = `Enrollment Confirmation - ${student.course}`;
    const mailtoBody = encodeURIComponent(message);
    const fromEmail = encodeURIComponent("techmasterstrainings@gmail.com");
    window.location.href = `mailto:${student.email}?from=${fromEmail}&subject=${encodeURIComponent(mailtoSubject)}&body=${mailtoBody}`;
  };

  const handleEnrollmentStatus = (id, status) => {
    const student = enrollments.find(e => e.id === id);
    
    setEnrollments(prev => prev.map(e => 
      e.id === id ? { ...e, status: status } : e
    ));

    if (status === 'accepted' && student) {
      sendAcceptanceEmail(student);
    }
  };

  const sendPaymentEmail = (student) => {
    if (!student.email) return;

    const templateParams = {
      to_name: student.name,
      to_email: student.email,
      course_name: student.course,
      amount: student.fees || '₹5,000',
      reply_to: 'techmasterstrainings@gmail.com',
      message: `Dear ${student.name}, we have successfully received your payment for the ${student.course} course. Your seat is now fully confirmed. Welcome to Techmasters Trainings!`
    };

    emailjs.send(
      'service_dr7aayx',
      'template_yqu81i5',
      templateParams,
      'yks84H3K2yWlD_gO7'
    )
    .then(() => {
       alert(`Payment confirmation sent to ${student.email}!`);
    })
    .catch((err) => {
       console.error('Payment email failed:', err);
    });
  };

  const handleMarkAsPaid = () => {
    if (!payStudent) return;
    
    setEnrollments(prev => prev.map(e => 
      e.id === payStudent.id ? { ...e, paid: true, datePaid: new Date().toISOString() } : e
    ));

    sendPaymentEmail(payStudent);
    setIsPayModalOpen(false);
    setPayStudent(null);
    setPayPin('');
    setPayStep(1);
    alert('Payment verified and enrollment confirmed!');
  };

  const openPayModal = (student) => {
    setPayStudent(student);
    setPayStep(1);
    setPayPin('');
    setPayError('');
    setPaymentMethod('upi');
    setIsPayModalOpen(true);
  };

  const verifyPin = () => {
    // Updated Security PIN as per institutional policy
    const SECURE_PIN = '102023';
    
    if (payPin === SECURE_PIN) {
      setPayStep(2);
      setPayError('');
      setFailedAttempts(0); // Reset on success
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setPayError('CRITICAL: Multiple Authorization Failures. Security Alert Sent.');
        sendSecurityAlert('Payment Authorization Breach', `Multiple failed attempts (3+) detected for payment of ${payStudent?.name}.`);
        // Optionally lock the UI or reset
      } else {
        setPayError(`Invalid Authorization PIN. (${3 - newAttempts} attempts remaining)`);
      }
    }
  };

  const sendSecurityAlert = (type, details) => {
    const templateParams = {
      from_name: 'TechMasters Security System',
      to_name: 'Admin Team',
      to_email: 'techmasterstrainings@gmail.com',
      subject: `[SECURITY ALERT] ${type}`,
      message: `Unauthorized access attempt detected in the Admin Dashboard.\n\nDetails:\n${details}\n\nTimestamp: ${new Date().toLocaleString()}\nLocation: Bidar HQ\n\nPlease review your security logs immediately.`,
      reply_to: 'techmasterstrainings@gmail.com'
    };

    emailjs.send(
      'service_dr7aayx',
      'template_yqu81i5',
      templateParams,
      'yks84H3K2yWlD_gO7'
    )
    .then(() => console.log('Security Alert Dispatched.'))
    .catch(err => console.error('Security Alert Failed:', err));
  };

  const openCertAuthModal = (student) => {
    setCertAuthStudent(student);
    setCertAuthPin('');
    setCertAuthError('');
    setIsCertAuthOpen(true);
  };

  const verifyCertPinAndIssue = () => {
    // Standardized Security PIN: 102023
    const SECURE_PIN = '102023';
    
    if (certAuthPin === SECURE_PIN) {
      const e = certAuthStudent;
      setFailedAttempts(0);
      setIsCertAuthOpen(false);
      setIsCertPreviewOpen(true);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setCertAuthError('CRITICAL: Certificate Authorization Breach. Admin Notified.');
        sendSecurityAlert('Certificate Issuance Breach', `Unauthorized attempt to unlock certificate for ${certAuthStudent?.name}.`);
      } else {
        setCertAuthError(`Invalid Institutional PIN. (${3 - newAttempts} attempts remaining)`);
      }
    }
  };

  // Sidebar Items
  const sidebarItems = [
    { id: 'overview', name: 'Dashboard Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'students', name: 'Student Enrollment', icon: <UserCheck size={20} /> },
    { id: 'courses', name: 'Course Enrollment', icon: <BookOpen size={20} /> },
    { id: 'payments', name: 'Fee Management', icon: <CreditCard size={20} /> },
    { id: 'progress', name: 'Course Progress', icon: <TrendingUp size={20} /> },
    { id: 'certification', name: 'Certifications', icon: <CheckCircle size={20} /> },
  ];

  return (
    <div className="admin-dashboard-root">
      <style>{`
        :root {
          --header-bg: #b20000;
          --sidebar-bg: #212d3b;
          --sidebar-active: #c43232;
          --content-bg: #f5f7fa;
          --text-main: #333;
          --text-muted: #64748b;
          --accent: #2563eb;
        }

        .admin-dashboard-root {
          font-family: 'Inter', -apple-system, sans-serif;
          background-color: var(--content-bg);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Top Header */
        .dashboard-header {
          background-color: var(--header-bg);
          color: white;
          padding: 0 20px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .header-brand {
          font-size: 1.25rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .header-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .header-link:hover {
          color: white;
        }

        .btn-logout-header {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          color: white;
          padding: 6px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.2s;
        }

        .btn-logout-header:hover {
          background: rgba(255,255,255,0.1);
          border-color: white;
        }

        /* Main Layout */
        .dashboard-main {
          display: flex;
          flex: 1;
        }

        /* Sidebar */
        .dashboard-sidebar {
          background-color: var(--sidebar-bg);
          width: 260px;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.05);
        }

        .sidebar-header {
          padding: 24px;
          color: white;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.7;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .sidebar-menu {
          padding: 10px 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
          font-weight: 500;
          border-left: 4px solid transparent;
        }

        .menu-item:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        .menu-item.active {
          background: var(--sidebar-active);
          color: white;
          border-left-color: #fff;
        }

        /* Content Area */
        .dashboard-content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        .content-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 25px;
        }

        /* KPI Cards */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .kpi-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          border-left: 5px solid var(--header-bg);
          transition: transform 0.2s;
        }
        
        .kpi-card:hover { transform: translateY(-3px); }

        .kpi-value {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 10px 0;
        }

        .kpi-label {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .kpi-action {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #1e293b;
          color: white;
          padding: 8px 20px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-top: 15px;
          align-self: flex-start;
          cursor: pointer;
          transition: background 0.2s;
        }

        .kpi-action:hover {
          background: #334155;
        }

        /* Data Tables */
        .data-panel {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .panel-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 15px;
          background: #f8fafc;
          color: #64748b;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        td {
          padding: 15px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.95rem;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-pending { background: #fef9c3; color: #854d0e; }
        .status-accepted { background: #dcfce7; color: #166534; }
        .status-rejected { background: #fee2e2; color: #991b1b; }
        .status-paid { background: #dcfce7; color: #166534; }

        .action-btns {
          display: flex;
          gap: 8px;
        }

        .btn-action {
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          border: none;
        }

        .btn-success { background: #22c55e; color: white; }
        .btn-danger { background: #ef4444; color: white; }
        .btn-info { background: #3b82f6; color: white; }
        .btn-warning { background: #f59e0b; color: white; }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          padding: 30px;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-item.full { grid-column: span 2; }

        label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #334155;
        }

        input, textarea, select {
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-family: inherit;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 20px;
        }

        .btn-primary {
          background: var(--header-bg);
          color: white;
          padding: 10px 24px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-secondary {
          background: #f1f5f9;
          color: #64748b;
          padding: 10px 24px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Payment Verification Modal */
        .pay-modal-header {
          text-align: center;
          margin-bottom: 25px;
        }
        .pay-modal-icon {
          width: 60px;
          height: 60px;
          background: #fef2f2;
          color: #b20000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
        }
        .bank-details-grid {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          border: 1px dashed #cbd5e1;
        }
        .bank-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .bank-row:last-child { border: none; }
        .bank-label { color: #64748b; font-size: 0.85rem; font-weight: 500; }
        .bank-value { color: #1e293b; font-weight: 700; font-size: 0.9rem; }
        
        .qr-placeholder {
          width: 180px;
          height: 180px;
          background: white;
          border: 1px solid #e2e8f0;
          margin: 20px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .pin-input-group {
          max-width: 300px;
          margin: 0 auto;
          text-align: center;
        }
        .pin-field {
          letter-spacing: 1em;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 700;
          padding: 12px;
          width: 100%;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          margin-bottom: 10px;
        }
        .pin-field:focus { border-color: #b20000; outline: none; }
        .error-msg { color: #ef4444; font-size: 0.85rem; margin-bottom: 15px; font-weight: 600; }

        @media (max-width: 900px) {
          .dashboard-sidebar {
            width: 70px;
          }
          .sidebar-header, .menu-item span {
            display: none;
          }
          .menu-item {
            justify-content: center;
            padding: 15px;
          }
          .kpi-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Top Red Header */}
      <header className="dashboard-header">
        <div className="header-brand">
          <img src="/logo.jpg" alt="Logo" style={{ height: '35px', borderRadius: '4px' }} />
          <span>TechMasters Admin</span>
        </div>
        <div className="header-nav">
          <a href="/" className="header-link">Home</a>
          <a href="/courses" className="header-link">Courses</a>
          <button className="btn-logout-header" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-main">
        {/* Dark Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">Admin Panel</div>
          <nav className="sidebar-menu">
            {sidebarItems.map((item) => (
              <div 
                key={item.id}
                className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Dynamic Content Area */}
        <main className="dashboard-content">
          <h1 className="content-title">
            {sidebarItems.find(i => i.id === activeTab)?.name}
          </h1>

          {/* KPI Cards */}
          {activeTab === 'overview' && (
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-label">Active Courses</div>
                <div className="kpi-value">{adminCourses.filter(c => c.status === 'accepted').length + systemCoursesList.length}</div>
                <div className="kpi-action" onClick={() => setActiveTab('courses')}>View Courses →</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">Pending Payments</div>
                <div className="kpi-value">{enrollments.filter(e => e.status === 'accepted' && !e.paid).length}</div>
                <div className="kpi-action" onClick={() => setActiveTab('payments')}>Recover Fees →</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">Certificates Issued</div>
                <div className="kpi-value">{enrollments.filter(e => calculateEligibility(e)).length}</div>
                <div className="kpi-action" onClick={() => setActiveTab('certification')}>Verification →</div>
              </div>
            </div>
          )}

          {/* Tab Views */}
          <div className="data-panel">
            {activeTab === 'students' && (
              <div className="panel-content">
                <div className="panel-header">
                  <div className="panel-title">Student Enrollments</div>
                  <div className="search-box">
                    <input type="text" placeholder="Search students..." style={{ width: '250px' }} />
                  </div>
                </div>
                <div className="table-container">
                  {enrollments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                      <Users size={40} style={{ marginBottom: '10px' }} />
                      <p>No enrollment requests found.</p>
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Student Info</th>
                          <th>Selected Course</th>
                          <th>Application Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrollments.map(e => (
                          <tr key={e.id}>
                            <td>
                              <div style={{ fontWeight: 700 }}>{e.name}</div>
                              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{e.email || 'N/A'}</div>
                            </td>
                            <td>{e.course}</td>
                            <td>{new Date(e.id).toLocaleDateString()}</td>
                            <td>
                              <span className={`status-badge status-${e.status}`}>{e.status}</span>
                            </td>
                            <td className="action-btns">
                              {e.status === 'pending' ? (
                                <>
                                  <button className="btn-action btn-success" onClick={() => handleEnrollmentStatus(e.id, 'accepted')}>Accept</button>
                                  <button className="btn-action btn-danger" onClick={() => handleEnrollmentStatus(e.id, 'rejected')}>Reject</button>
                                </>
                              ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                  <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
                                    {e.status === 'accepted' ? 'Accepted' : 'Rejected'}
                                  </span>
                                  {e.status === 'accepted' && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                                      <button 
                                        onClick={() => sendAcceptanceEmail(e)}
                                        className="btn-action btn-info" 
                                        style={{ padding: '4px 8px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                                      >
                                        <Mail size={12} /> Send Mail
                                      </button>
                                      <button 
                                        className="btn-action btn-danger" 
                                        style={{ padding: '4px 8px', fontSize: '0.75rem' }} 
                                        onClick={() => handleEnrollmentStatus(e.id, 'pending')}
                                      >
                                        Cancel Enrollment
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="panel-content">
                <div className="panel-header">
                  <div className="panel-title">System Courses</div>
                  <button className="btn-primary" onClick={openAddModal}>+ Add New Course</button>
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: '60px' }}>S.No</th>
                        <th>Course Module</th>
                        <th>Duration</th>
                        <th>Fees</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const totalCourses = adminCourses.length + systemCoursesList.length;
                        return (
                          <>
                            {/* Dynamically Added Courses (Newest First at the Top) */}
                            {adminCourses.slice().reverse().map((course, idx) => (
                              <tr key={course.id}>
                                <td><div style={{ fontWeight: 600, color: '#64748b' }}>{totalCourses - idx}</div></td>
                                <td><div style={{ fontWeight: 700 }}>{course.name}</div></td>
                                <td>{course.duration}</td>
                                <td>{course.fees}</td>
                                <td>
                                  <span className={`status-badge status-${course.status}`}>{course.status}</span>
                                </td>
                                <td className="action-btns">
                                  {course.status === 'pending' && (
                                    <>
                                      <button className="btn-action btn-success" onClick={() => handleStatusChange(course.id, 'accepted')}>Approve</button>
                                      <button className="btn-action btn-danger" onClick={() => handleStatusChange(course.id, 'rejected')}>Decline</button>
                                    </>
                                  )}
                                  <button className="btn-action btn-info" onClick={() => handleEditClick(course)}>Edit</button>
                                </td>
                              </tr>
                            ))}
                            
                            {/* System Courses List (Locked at the Bottom) */}
                            {systemCoursesList.map((sc, idx) => (
                              <tr key={`sys-${idx}`}>
                                <td><div style={{ fontWeight: 600, color: '#64748b' }}>{systemCoursesList.length - idx}</div></td>
                                <td><div style={{ fontWeight: 700 }}>{sc.name}</div></td>
                                <td>{sc.duration}</td>
                                <td>{sc.fees}</td>
                                <td><span className="status-badge status-accepted">SYSTEM</span></td>
                                <td><span style={{ color: '#475569', fontWeight: 600, fontSize: '0.9rem' }}>Locked</span></td>
                              </tr>
                            ))}
                          </>
                        );
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="panel-content">
                <div className="panel-header">
                  <div className="panel-title">Fee & Revenue Management</div>
                </div>
                <div className="table-container">
                  {enrollments.filter(e => e.status === 'accepted').length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                      <CreditCard size={40} style={{ marginBottom: '10px' }} />
                      <p>No active enrollments to manage fees.</p>
                    </div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Student / Course</th>
                          <th>Total Fee</th>
                          <th>Paid</th>
                          <th>Balance</th>
                          <th>Mode / Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enrollments.filter(e => e.status === 'accepted').map(e => (
                          <tr key={e.id}>
                            <td>
                              <div style={{ fontWeight: 700 }}>{e.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{e.course}</div>
                            </td>
                            <td>₹{e.totalFee || '15,000'}</td>
                            <td>₹{e.paidAmount || (e.paid ? (e.totalFee || '15,000') : '0')}</td>
                            <td>₹{(parseInt(e.totalFee || '15000') - parseInt(e.paidAmount || (e.paid ? '15000' : '0')))}</td>
                            <td>
                              <span className={`status-badge status-${e.paid ? 'paid' : 'pending'}`}>
                                {e.paid ? 'Full Paid' : 'Pending'}
                              </span>
                            </td>
                            <td>
                              <button className="btn-action btn-info" style={{ fontSize: '0.75rem' }} onClick={() => openPayModal(e)}>Process Payment</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="panel-content">
                <div className="panel-header">
                  <div className="panel-title">Batch Schedule & Academic Progress</div>
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Course Period</th>
                        <th>Attendance</th>
                        <th>Milestones</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.filter(e => e.status === 'accepted').map(e => (
                        <tr key={e.id}>
                          <td style={{ fontWeight: 700 }}>{e.name}</td>
                          <td>
                            <div style={{ fontSize: '0.8rem' }}>
                              <div><strong>Start:</strong> {e.startDate || 'Not Set'}</div>
                              <div><strong>End:</strong> {e.endDate || 'Not Set'}</div>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', minWidth: '80px' }}>
                                <div style={{ height: '100%', width: `${e.attendance || 0}%`, background: (e.attendance || 0) >= 75 ? '#22c55e' : '#f59e0b' }}></div>
                              </div>
                              <span style={{ fontSize: '0.8rem' }}>{e.attendance || 0}%</span>
                            </div>
                          </td>
                          <td>
                            <div style={{ fontSize: '0.75rem' }}>
                              <div style={{ color: e.projectStatus === 'Completed' ? '#22c55e' : '#64748b' }}>
                                {e.projectStatus === 'Completed' ? '✓ Project Done' : '○ Project Pending'}
                              </div>
                              <div style={{ color: e.paid ? '#22c55e' : '#64748b' }}>
                                {e.paid ? '✓ Fees Paid' : '○ Fees Outstanding'}
                              </div>
                            </div>
                          </td>
                          <td>
                            <button className="btn-action btn-info" style={{ fontSize: '0.7rem' }} onClick={() => {
                              const sDate = prompt('Enter Batch Start Date (e.g. 01/03/2026):', e.startDate || '');
                              const eDate = prompt('Enter Batch End Date (e.g. 01/09/2026):', e.endDate || '');
                              const att = prompt('Enter Attendance %:', e.attendance || 0);
                              const proj = window.confirm('Has the student completed the final project?') ? 'Completed' : 'Ongoing';
                              
                              setEnrollments(prev => prev.map(item => item.id === e.id ? { 
                                ...item, 
                                startDate: sDate || item.startDate, 
                                endDate: eDate || item.endDate,
                                attendance: parseInt(att),
                                projectStatus: proj
                              } : item));
                            }}>Update Academic Info</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'certification' && (
              <div className="panel-content">
                <div className="panel-header">
                  <div className="panel-title">Institutional Certificate Issuance</div>
                </div>
                <div className="table-container">
                  <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd', fontSize: '0.85rem' }}>
                    <strong>Note:</strong> Following the <strong>TechMasters Institution Guidelines</strong>, certificates are dynamically generated using Student Name, Course Name, Batch Duration (Start/End), and a Unique QR-Verified ID. They remain LOCKED until all graduation criteria are met.
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
                      {enrollments.filter(e => e.status === 'accepted').map(e => (
                        <tr key={e.id}>
                          <td>
                            <div style={{ fontWeight: 700 }}>{e.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Course: {e.course}</div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>ID: {calculateEligibility(e) ? getCertificateID(e) : 'N/A'}</div>
                          </td>
                          <td>
                            <div style={{ fontSize: '0.75rem' }}>
                              <div><strong>From:</strong> {e.startDate || 'TBD'}</div>
                              <div><strong>To:</strong> {e.endDate || 'TBD'}</div>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <span title="Attendance" style={{ color: (e.attendance || 0) >= 75 ? '#22c55e' : '#cbd5e1' }}><Users size={14} /></span>
                              <span title="Payment" style={{ color: e.paid ? '#22c55e' : '#cbd5e1' }}><DollarSign size={14} /></span>
                              <span title="Project" style={{ color: e.projectStatus === 'Completed' ? '#22c55e' : '#cbd5e1' }}><CheckCircle size={14} /></span>
                            </div>
                          </td>
                          <td>
                            {calculateEligibility(e) && e.startDate && e.endDate ? (
                              <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <Check size={14} /> READY
                              </span>
                            ) : (
                              <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <XCircle size={14} /> LOCKED
                              </span>
                            )}
                          </td>
                          <td>
                            <button 
                              className="btn-action btn-success" 
                              style={{ 
                                padding: '6px 15px',
                                fontSize: '0.75rem',
                                opacity: 1,
                                cursor: 'pointer'
                              }}
                              onClick={() => openCertAuthModal(e)}
                            >
                              Unlock & Issue
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="panel-content">
                <div className="panel-header">
                  <div className="panel-title">System Activity Log</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ background: '#dcfce7', color: '#166534', padding: '10px', borderRadius: '50%' }}><Clock size={20} /></div>
                    <div>
                      <div style={{ fontWeight: 600 }}>New enrollment received</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Check Student Enrollment for new applicants.</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '15px', background: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '10px', borderRadius: '50%' }}><TrendingUp size={20} /></div>
                    <div>
                      <div style={{ fontWeight: 600 }}>System Stability</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Admin controls are live and synchronized.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Course Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="panel-header">
              <h2 className="panel-title">{editingId ? 'Edit Course Module' : 'Add New Course Module'}</h2>
              <X className="cursor-pointer" onClick={() => setIsModalOpen(false)} />
            </div>
            <form onSubmit={handleSaveCourse}>
              <div className="form-grid">
                <div className="form-item full">
                  <label>Course Name</label>
                  <input required value={newCourse.name} onChange={e => setNewCourse({...newCourse, name: e.target.value})} placeholder="e.g. Advanced Cloud Computing" />
                </div>
                <div className="form-item">
                  <label>Location</label>
                  <input required value={newCourse.location} onChange={e => setNewCourse({...newCourse, location: e.target.value})} />
                </div>
                <div className="form-item">
                  <label>Work Mode</label>
                  <select value={newCourse.mode} onChange={e => setNewCourse({...newCourse, mode: e.target.value})}>
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="form-item">
                  <label>Duration</label>
                  <input required value={newCourse.duration} onChange={e => setNewCourse({...newCourse, duration: e.target.value})} placeholder="e.g. 4 Months" />
                </div>
                <div className="form-item">
                  <label>Fees</label>
                  <input required value={newCourse.fees} onChange={e => setNewCourse({...newCourse, fees: e.target.value})} placeholder="e.g. ₹12,000" />
                </div>
                <div className="form-item full">
                  <label>Description</label>
                  <textarea required rows="3" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} placeholder="Describe the course curriculum and benefits..." />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Save Changes' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Verification Modal */}
      {isPayModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            {payStep === 1 ? (
              <div className="pay-step-1">
                <div className="pay-modal-header">
                  <div className="pay-modal-icon"><CreditCard size={30} /></div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Authorize Transaction</h2>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Enter Security PIN to process payment for <strong>{payStudent?.name}</strong>.</p>
                </div>
                
                <div className="pin-input-group">
                  <input 
                    type="password" 
                    className="pin-field" 
                    placeholder="••••" 
                    maxLength={10} 
                    value={payPin} 
                    onChange={e => setPayPin(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && verifyPin()}
                  />
                  {payError && <div className="error-msg">{payError}</div>}
                  <button className="btn-primary" style={{ width: '100%' }} onClick={verifyPin}>
                    Authorize Access
                  </button>
                  <p style={{ marginTop: '15px', fontSize: '0.75rem', color: '#94a3b8' }}>Only authorized administrators can verify fees.</p>
                </div>
                <div className="modal-footer" style={{ marginTop: '20px' }}>
                  <button className="btn-secondary" onClick={() => setIsPayModalOpen(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="pay-step-2">
                <div className="pay-modal-header">
                  <div className="pay-modal-icon" style={{ background: '#dcfce7', color: '#166534' }}><CheckCircle size={30} /></div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Administrative Payment Desk</h2>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Select the processing channel for <strong>{payStudent?.name}</strong>.</p>
                </div>

                <div className="payment-method-selector" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button 
                    className={`method-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: paymentMethod === 'upi' ? '#1e293b' : 'white', color: paymentMethod === 'upi' ? 'white' : '#64748b', fontWeight: 600, cursor: 'pointer' }}
                  >
                    UPI / QR
                  </button>
                  <button 
                    className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: paymentMethod === 'card' ? '#1e293b' : 'white', color: paymentMethod === 'card' ? 'white' : '#64748b', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Credit Card
                  </button>
                  <button 
                    className={`method-btn ${paymentMethod === 'cash' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('cash')}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: paymentMethod === 'cash' ? '#1e293b' : 'white', color: paymentMethod === 'cash' ? 'white' : '#64748b', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cash Desk
                  </button>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="method-content">
                    <div className="qr-placeholder">
                      <div style={{ textAlign: 'center' }}>
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=techmasters@hdfcbank&pn=TechMasters%20Trainings&am=5000&cu=INR`} 
                          alt="Payment Scanner" 
                          style={{ width: '130px' }}
                        />
                        <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: '5px' }}>Official Institute QR</div>
                      </div>
                    </div>
                    <div className="bank-details-grid">
                      <div className="bank-row">
                        <span className="bank-label">UPI ID</span>
                        <span className="bank-value">techmasters@hdfcbank</span>
                      </div>
                      <div className="bank-row">
                        <span className="bank-label">Payee Name</span>
                        <span className="bank-value">TechMasters Trainings</span>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="method-content" style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>CARDHOLDER NAME</label>
                      <input disabled value={payStudent?.name} style={{ width: '100%', background: '#fff', padding: '8px', marginTop: '5px', fontSize: '0.9rem' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>CARD NUMBER</label>
                        <input placeholder="•••• •••• •••• ••••" style={{ width: '100%', background: '#fff', padding: '8px', marginTop: '5px' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>EXPIRY</label>
                          <input placeholder="MM/YY" style={{ width: '100%', background: '#fff', padding: '8px', marginTop: '5px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>CVC</label>
                          <input placeholder="•••" style={{ width: '100%', background: '#fff', padding: '8px', marginTop: '5px' }} />
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '10px' }}>Card transactions are processed through our secure HDFC payment gateway.</p>
                  </div>
                )}

                {paymentMethod === 'cash' && (
                  <div className="method-content" style={{ padding: '20px', background: '#fff8eb', borderRadius: '12px', border: '1px solid #ffeeba', textAlign: 'center' }}>
                    <div style={{ background: '#f59e0b', color: 'white', display: 'inline-block', padding: '10px', borderRadius: '12px', marginBottom: '10px' }}>
                      <DollarSign size={30} />
                    </div>
                    <h4 style={{ margin: '0 0 5px 0' }}>Manual Cash Handover</h4>
                    <p style={{ fontSize: '0.85rem', color: '#854d0e', margin: '0' }}>Please ensure you have physical possession of the currency before confirming.</p>
                    <div className="bank-details-grid" style={{ background: 'white', marginTop: '15px' }}>
                      <div className="bank-row">
                        <span className="bank-label">Amount Handover</span>
                        <span className="bank-value" style={{ color: '#b45309' }}>₹{payStudent?.fees || '5,000'}</span>
                      </div>
                      <div className="bank-row">
                        <span className="bank-label">Admin Witness</span>
                        <span className="bank-value">Official Seal Required</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="modal-footer" style={{ marginTop: '20px' }}>
                  <button className="btn-secondary" onClick={() => setPayStep(1)}>Back</button>
                  <button className="btn-success" style={{ padding: '10px 24px', borderRadius: '6px', fontWeight: 600, border: 'none', cursor: 'pointer' }} onClick={handleMarkAsPaid}>
                    Confirm Received ({paymentMethod.toUpperCase()})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Certificate Unlocking / Authorization Modal */}
      {isCertAuthOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '450px' }}>
            <div className="pay-modal-header">
              <div className="pay-modal-icon" style={{ background: '#fefce8', color: '#854d0e' }}><Plus size={30} /></div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Certificate Security Desk</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Enter authorization credential to unlock the certificate for <strong>{certAuthStudent?.name}</strong>.</p>
            </div>
            
            <div className="pin-input-group">
              <label style={{ display: 'block', marginBottom: '10px', textAlign: 'left' }}>Admin Issuance PIN</label>
              <input 
                type="password" 
                className="pin-field" 
                placeholder="••••" 
                maxLength={10} 
                value={certAuthPin} 
                onChange={e => setCertAuthPin(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && verifyCertPinAndIssue()}
              />
              {certAuthError && <div className="error-msg">{certAuthError}</div>}
              
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', margin: '15px 0', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Certificate ID:</span>
                    <span style={{ fontWeight: 700 }}>{getCertificateID(certAuthStudent)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Verification:</span>
                    <span style={{ color: '#22c55e', fontWeight: 700 }}>Passed (All Criteria)</span>
                  </div>
                </div>
              </div>

              <button className="btn-success" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={verifyCertPinAndIssue}>
                Validate & Unlock Certificate
              </button>
            </div>
            
            <div className="modal-footer" style={{ marginTop: '20px' }}>
              <button className="btn-secondary" onClick={() => setIsCertAuthOpen(false)}>Cancel Action</button>
            </div>
          </div>
        </div>
      )}
      {/* Institutional Certificate Preview Modal */}
      {isCertPreviewOpen && certAuthStudent && (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.85)', overflowY: 'auto', padding: '20px 0', alignItems: 'flex-start' }}>
          <div className="certificate-preview-container" style={{ position: 'relative', width: '95%', maxWidth: '1000px', margin: '20px auto' }}>
            <button 
              onClick={() => setIsCertPreviewOpen(false)}
              style={{ position: 'absolute', right: '-10px', top: '-10px', background: '#ef4444', border: 'none', color: 'white', cursor: 'pointer', zIndex: 10, borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <X size={24} />
            </button>
            
            <div id="official-certificate" style={{ 
              background: '#ffffff', 
              padding: '0', 
              position: 'relative', 
              fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
              minHeight: '750px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              color: '#1e293b'
            }}>
              {/* Simple, Elegant Curved SVG Background to match the Canva Template */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} viewBox="0 0 1000 750" preserveAspectRatio="none">
                  {/* Top Left Smooth Curves */}
                  <path d="M0,0 L350,0 C200,100 100,200 0,350 Z" fill="#1e293b" />
                  <path d="M0,0 L320,0 C170,90 85,170 0,320 Z" fill="#d4af37" />
                  <path d="M0,0 L300,0 C150,80 75,150 0,300 Z" fill="#0f172a" />
                  
                  {/* Bottom Right Smooth Curves */}
                  <path d="M1000,750 L650,750 C800,650 900,550 1000,400 Z" fill="#1e293b" />
                  <path d="M1000,750 L680,750 C830,660 915,580 1000,430 Z" fill="#d4af37" />
                  <path d="M1000,750 L700,750 C850,670 925,600 1000,450 Z" fill="#0f172a" />
                  
                  {/* Top Right Angular Accents */}
                  <polygon points="1000,0 750,0 1000,250" fill="#1e293b" />
                  <polygon points="1000,0 800,0 1000,200" fill="#d4af37" />
                  <polygon points="1000,0 820,0 1000,180" fill="#0f172a" />

                  {/* Bottom Left Angular Accents */}
                  <polygon points="0,750 250,750 0,500" fill="#1e293b" />
                  <polygon points="0,750 200,750 0,550" fill="#d4af37" />
                  <polygon points="0,750 180,750 0,570" fill="#0f172a" />
              </svg>

              <div style={{ position: 'relative', zIndex: 1, padding: '40px 60px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '750px' }}>
                
                {/* Top Center: Institution Name */}
                <div style={{ textAlign: 'center', marginBottom: '10px', paddingTop: '10px' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.5px' }}>Parishudha Seva Samsthe (R)</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.9rem', letterSpacing: '0.5px' }}>DRBI/SOR/261/2025-2026</p>
                </div>

                {/* Grid Layout: Logo | Certificate Title | Seal */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', marginBottom: '30px' }}>
                  
                  {/* Left: Logo */}
                  <div style={{ textAlign: 'center', padding: '10px' }}>
                    <img src="/logo.jpg" alt="Logo" style={{ height: '90px', marginBottom: '8px', objectFit: 'contain' }} />
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>UDYAM-KR-06-0029856</div>
                  </div>

                  {/* Center: Title */}
                  <div style={{ textAlign: 'center', padding: '0 20px' }}>
                    <h1 style={{ fontFamily: "Georgia, serif", fontSize: '4rem', margin: '0 0 5px 0', color: '#0f172a', letterSpacing: '6px', fontWeight: 400 }}>CERTIFICATE</h1>
                    <h2 style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: '1.6rem', margin: '0 0 20px 0', color: '#d4af37', letterSpacing: '6px', fontWeight: 600 }}>OF COMPLETION</h2>
                    <p style={{ fontStyle: 'italic', color: '#475569', fontSize: '1.2rem', margin: '0' }}>This is to certify that</p>
                  </div>

                  {/* Right: Golden Seal */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', width: '120px', height: '150px' }}>
                      <div style={{ position: 'absolute', bottom: '10px', left: '15px', width: '30px', height: '60px', background: '#d4af37', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)', transform: 'rotate(15deg)' }}></div>
                      <div style={{ position: 'absolute', bottom: '10px', right: '15px', width: '30px', height: '60px', background: '#d4af37', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)', transform: 'rotate(-15deg)' }}></div>
                      
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, #fcf6ba, #d4af37)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.8)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Candidate Name Section */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#0f172a', margin: '0', paddingBottom: '5px' }}>
                    {certAuthStudent.name}
                  </div>
                  <div style={{ width: '400px', height: '2px', background: '#d4af37', margin: '0 auto' }}></div>
                </div>
                
                {/* Certificate Paragraph */}
                <div style={{ textAlign: 'center', margin: '0 auto', maxWidth: '800px', lineHeight: 1.8, fontSize: '1.25rem', color: '#334155' }}>
                  This certificate is awarded to the participant for successfully completing the <strong style={{color: '#0f172a'}}>{certAuthStudent.course}</strong> program 
                  conducted by TechMasters Training private Limited, 
                  signifying successful acquisition of foundational and advanced skills in the chosen discipline.
                </div>

                {/* Issue Date */}
                <div style={{ textAlign: 'center', marginTop: '30px', fontWeight: 700, color: '#0f172a', fontSize: '1.1rem' }}>
                  Date Issued: {new Date().toLocaleDateString('en-GB')}
                </div>

                {/* Signatures Section */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingRight: '40px', paddingTop: '40px' }}>
                  <div style={{ textAlign: 'center', width: '220px' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '8px', color: '#0f172a' }}>Sachin Anil</div>
                    <div style={{ borderTop: '2px dashed #94a3b8', paddingTop: '8px', fontSize: '0.95rem', color: '#475569', fontWeight: 600 }}>Course Director</div>
                  </div>
                </div>

              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '30px', paddingBottom: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
              <button 
                className="btn-secondary" 
                onClick={() => setIsCertPreviewOpen(false)}
                style={{ padding: '12px 30px', fontSize: '1rem', borderRadius: '8px', fontWeight: 600, background: '#475569', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Back to Certification
              </button>
              <button 
                className="btn-success" 
                onClick={() => {
                  window.print();
                  alert(`Certificate successfully issued and logged for ${certAuthStudent.name}.`);
                  setIsCertPreviewOpen(false);
                }}
                style={{ padding: '12px 30px', fontSize: '1rem', borderRadius: '8px', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 5px 15px rgba(34,197,94,0.3)' }}
              >
                Issue this Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
