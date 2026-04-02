import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Academy from './components/Academy';
import Courses from './components/Courses';
import Dashboard from './components/Dashboard';
import StudentDashboard from './components/StudentDashboard';
import CoursePlayer from './components/CoursePlayer';
import Login from './components/Login';
import Enroll from './components/Enroll';
import Gallery from './components/Gallery';
import Service from './components/Service';
import TcsNqt from './components/TcsNqt';
import TcsCodevita from './components/TcsCodevita';
import CapgeminiExceller from './components/CapgeminiExceller';
import Cognizant from './components/Cognizant';
import WiproElite from './components/WiproElite';
import QuantitativeAptitude from './components/QuantitativeAptitude';
import ReasoningAptitude from './components/ReasoningAptitude';
import VerbalNonVerbal from './components/VerbalNonVerbal';
import ProblemSolving from './components/ProblemSolving';
import Communication from './components/Communication';
import PersonalityDevelopment from './components/PersonalityDevelopment';
import MockInterview from './components/MockInterview';
import JavaFullStack from './components/JavaFullStack';
import PythonFullStack from './components/PythonFullStack';
import MernDevelopment from './components/MernDevelopment';
import CloudComputing from './components/CloudComputing';
import DevOpsInternship from './components/DevOpsInternship';
import SoftwareProjects from './components/SoftwareProjects';
import HardwareProjects from './components/HardwareProjects';
import IotProjects from './components/IotProjects';
import ProblemStatements from './components/ProblemStatements';
import RapidPrototyping from './components/RapidPrototyping';
import TeamCollaboration from './components/TeamCollaboration';
import Innovation from './components/Innovation';
import './App.css';

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAdmin ? children : <Navigate to="/login" />;
};

const StudentRoute = ({ children }) => {
  const hasToken = !!localStorage.getItem('accessToken');
  return hasToken ? children : <Navigate to="/login" />;
};

const LayoutWrapper = ({ children, enrollments, adminCourses, setAdminCourses, setEnrollments, addEnrollment }) => {
  const location = useLocation();
  const isLMSView = location.pathname === '/dashboard' || 
                    location.pathname === '/student-dashboard' || 
                    location.pathname.includes('/play');

  return (
    <div className="app-container">
      {!isLMSView && <Navbar />}
      <main className={isLMSView ? 'dashboard-mode' : 'main-content'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/courses" element={<Courses adminCourses={adminCourses} />} />
          <Route path="/admin" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route 
            path="/dashboard" 
            element={
              <AdminRoute>
                <Dashboard 
                  adminCourses={adminCourses} 
                  enrollments={enrollments}
                  setEnrollments={setEnrollments}
                />
              </AdminRoute>
            } 
          />

          {/* Student LMS Routes */}
          <Route 
            path="/student-dashboard" 
            element={
              <StudentRoute>
                <StudentDashboard />
              </StudentRoute>
            } 
          />
          <Route 
            path="/course/:slug/play" 
            element={
              <StudentRoute>
                <CoursePlayer />
              </StudentRoute>
            } 
          />

          <Route 
            path="/enroll" 
            element={<Enroll addEnrollment={addEnrollment} />} 
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Service />} />
          <Route path="/services/tcs-nqt" element={<TcsNqt />} />
          <Route path="/services/tcs-codevita" element={<TcsCodevita />} />
          <Route path="/services/capgemini-exceller" element={<CapgeminiExceller />} />
          <Route path="/services/cognizant" element={<Cognizant />} />
          <Route path="/services/wipro-elite" element={<WiproElite />} />
          <Route path="/services/quantitative-aptitude" element={<QuantitativeAptitude />} />
          <Route path="/services/reasoning-aptitude" element={<ReasoningAptitude />} />
          <Route path="/services/verbal-non-verbal" element={<VerbalNonVerbal />} />
          <Route path="/services/problem-solving" element={<ProblemSolving />} />
          <Route path="/services/communication" element={<Communication />} />
          <Route path="/services/personality-development" element={<PersonalityDevelopment />} />
          <Route path="/services/mock-interview" element={<MockInterview />} />
          <Route path="/services/java-full-stack" element={<JavaFullStack />} />
          <Route path="/services/python-full-stack" element={<PythonFullStack />} />
          <Route path="/services/mern-development" element={<MernDevelopment />} />
          <Route path="/services/cloud-computing" element={<CloudComputing />} />
          <Route path="/services/devops" element={<DevOpsInternship />} />
          <Route path="/services/software-projects" element={<SoftwareProjects />} />
          <Route path="/services/hardware-projects" element={<HardwareProjects />} />
          <Route path="/services/iot-projects" element={<IotProjects />} />
          <Route path="/services/problem-statements" element={<ProblemStatements />} />
          <Route path="/services/rapid-prototyping" element={<RapidPrototyping />} />
          <Route path="/services/team-collaboration" element={<TeamCollaboration />} />
          <Route path="/services/innovation" element={<Innovation />} />
        </Routes>
      </main>
      {!isLMSView && <Footer />}
    </div>
  );
};

function App() {
  const [adminCourses, setAdminCourses] = React.useState([]);
  const [enrollments, setEnrollments] = React.useState([]);

  const fetchData = React.useCallback(async () => {
    const isAdmin = localStorage.getItem('isAdminAuthenticated') === 'true';
    const token = localStorage.getItem('accessToken');
    
    try {
      const coursesRes = await fetch('http://localhost:8000/api/courses/');
      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        const coursesArray = Array.isArray(coursesData) ? coursesData : (coursesData.results || []);
        setAdminCourses(coursesArray);
      }

      if (isAdmin && token) {
        const enrollRes = await fetch('http://localhost:8000/api/courses/enrollments/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (enrollRes.ok) {
          const enrollData = await enrollRes.json();
          const enrollArray = Array.isArray(enrollData) ? enrollData : (enrollData.results || []);
          const formattedEnrollments = enrollArray.map(e => ({
            ...e, id: e.id,
            name: (e.student_details?.first_name || e.student_details?.username || 'Student'),
            email: e.student_details?.email,
            course: e.course_details?.title || 'Unknown Course',
            status: e.status, paid: e.paid, paidAmount: e.paid_amount,
            totalFee: e.total_fee, startDate: e.start_date, endDate: e.end_date,
            attendance: e.attendance, projectStatus: e.project_status,
            enrolled_on: e.enrolled_on
          }));
          setEnrollments(formattedEnrollments);
        }
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
    window.refreshDashboardData = fetchData;
    return () => { delete window.refreshDashboardData; };
  }, [fetchData]);

  const addEnrollment = () => {
    fetchData(); 
  };

  return (
    <Router>
      <LayoutWrapper 
        enrollments={enrollments} 
        adminCourses={adminCourses} 
        setAdminCourses={setAdminCourses} 
        setEnrollments={setEnrollments} 
        addEnrollment={addEnrollment} 
      />
    </Router>
  );
}

export default App;
