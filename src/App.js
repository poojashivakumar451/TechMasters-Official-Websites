import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Academy from './components/Academy';
import Courses from './components/Courses';
import Dashboard from './components/Dashboard';
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

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

const LayoutWrapper = ({ children, enrollments, adminCourses, setAdminCourses, setEnrollments, addEnrollment }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="app-container">
      {!isDashboard && <Navbar />}
      <main className={isDashboard ? 'dashboard-mode' : 'main-content'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academy" element={<Academy />} />
          <Route 
            path="/courses" 
            element={<Courses adminCourses={adminCourses} />} 
          />
          <Route path="/admin" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard 
                  adminCourses={adminCourses} 
                  setAdminCourses={setAdminCourses} 
                  enrollments={enrollments}
                  setEnrollments={setEnrollments}
                />
              </ProtectedRoute>
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
      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  const [adminCourses, setAdminCourses] = React.useState(() => {
    const saved = localStorage.getItem('adminCourses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [enrollments, setEnrollments] = React.useState(() => {
    const saved = localStorage.getItem('enrollments');
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('adminCourses', JSON.stringify(adminCourses));
  }, [adminCourses]);

  React.useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  const addEnrollment = (data) => {
    setEnrollments(prev => [...prev, { ...data, id: Date.now(), status: 'pending' }]);
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
