import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Award,
  BookOpen
} from 'lucide-react';

const CoursePlayer = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fetchCourseData = React.useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) { navigate('/login'); return; }

    try {
      // 1. Fetch Course by slug
      const courseRes = await fetch(`http://localhost:8000/api/courses/${slug}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!courseRes.ok) throw new Error('Course not found');
      const courseData = await courseRes.json();
      setCourse(courseData);

      // 2. Fetch User's Enrollment for this course
      const enrollRes = await fetch('http://localhost:8000/api/courses/enrollments/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (enrollRes.ok) {
        const enrollList = await enrollRes.json();
        const enrollArray = Array.isArray(enrollList) ? enrollList : (enrollList.results || []);
        const currentEnroll = enrollArray.find(e => e.course === courseData.id);
        
        if (!currentEnroll || currentEnroll.status === 'pending') {
          alert('Access not yet granted. Please contact admin.');
          navigate('/student-dashboard');
          return;
        }
        setEnrollment(currentEnroll);
        
        // Default to first lesson if not already set
        if (courseData.lessons && courseData.lessons.length > 0) {
          setActiveLesson(courseData.lessons[0]);
        }
      }
    } catch (err) {
      console.error('Player error:', err);
      navigate('/student-dashboard');
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  const markComplete = async (lessonId) => {
    const token = localStorage.getItem('accessToken');
    try {
      const res = await fetch(`http://localhost:8000/api/courses/enrollments/${enrollment.id}/mark-lesson-complete/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lesson_id: lessonId })
      });
      if (res.ok) {
        // Refresh local progress state
        const updatedEnroll = { ...enrollment };
        if (!updatedEnroll.lesson_progress) updatedEnroll.lesson_progress = [];
        const existing = updatedEnroll.lesson_progress.find(p => p.lesson === lessonId);
        if (existing) existing.is_completed = true;
        else updatedEnroll.lesson_progress.push({ lesson: lessonId, is_completed: true });
        
        // Recalculate percent locally for immediate feedback
        const total = course.lessons.length;
        const complete = updatedEnroll.lesson_progress.filter(p => p.is_completed).length;
        updatedEnroll.progress_percentage = Math.round((complete / total) * 100);
        
        setEnrollment(updatedEnroll);
        
        // Auto go to next
        const idx = course.lessons.findIndex(l => l.id === lessonId);
        if (idx < course.lessons.length - 1) {
          setActiveLesson(course.lessons[idx + 1]);
        }
      }
    } catch (err) {
      console.error('Progress update failed:', err);
    }
  };

  const isLessonCompleted = (id) => {
    return enrollment?.lesson_progress?.some(p => p.lesson === id && p.is_completed);
  };

  const goToNext = () => {
    const idx = course.lessons.findIndex(l => l.id === activeLesson.id);
    if (idx < course.lessons.length - 1) setActiveLesson(course.lessons[idx + 1]);
  };

  const goToPrev = () => {
    const idx = course.lessons.findIndex(l => l.id === activeLesson.id);
    if (idx > 0) setActiveLesson(course.lessons[idx - 1]);
  };

  if (loading || !course) return <div className="p-20 text-center">Configuring Player...</div>;

  return (
    <div className="player-parent" style={{ display: 'flex', height: '100vh', background: '#0f172a', overflow: 'hidden' }}>
      <style>{`
        .player-sidebar {
          width: 380px;
          background: var(--secondary);
          border-right: 1px solid rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          color: white;
          transition: transform 0.3s ease;
          position: relative;
          z-index: 50;
        }
        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          background: var(--secondary);
        }
        .sidebar-scroll {
          flex-grow: 1;
          overflow-y: auto;
          background: #18222f; /* Deep Industrial Blue */
        }
        .lesson-item {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .lesson-item:hover { background: rgba(255,255,255,0.05); }
        .lesson-item.active { 
          background: var(--primary);
          box-shadow: inset 4px 0 0 white;
        }
        .main-player-area {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          background: var(--bg-color);
        }
        .video-container {
          width: 100%;
          aspect-ratio: 16/9;
          background: black;
          box-shadow: var(--shadow-premium);
        }
        .player-controls {
          background: white;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        .player-nav-btn {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border-color);
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: var(--transition);
        }
        .player-nav-btn:hover:not(:disabled) { 
          background: var(--bg-color);
          color: var(--text-main);
          border-color: var(--text-main);
        }
        .player-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        
        .lesson-meta {
          padding: 50px;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }
        .lesson-meta h1 { font-family: 'Outfit', sans-serif; font-size: 2.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px; }
        .lesson-meta p { line-height: 1.8; color: var(--text-muted); font-size: 1.1rem; }
        
        .tab-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 12px 24px;
          font-weight: 800;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }
        .tab-btn.active { color: var(--primary); border-bottom-color: var(--primary); }

        @media (max-width: 1024px) {
          .player-sidebar { position: fixed; height: 100%; transform: translateX(-100%); width: 320px; }
          .player-sidebar.open { transform: translateX(0); }
        }
      `}</style>

      {/* Sidebar List */}
      <div className={`player-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1rem', margin: 0, fontWeight: 900, color: 'white', letterSpacing: '1px' }}>CURRICULUM</h2>
            <button onClick={() => navigate('/student-dashboard')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}><X size={18} /></button>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{course.title}</p>
          <div style={{ marginTop: '20px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${enrollment?.progress_percentage || 0}%`, height: '100%', background: 'var(--primary)', borderRadius: '10px' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 800 }}>PROGRESS</span>
            <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 800 }}>{enrollment?.progress_percentage || 0}%</span>
          </div>
        </div>
        
        <div className="sidebar-scroll">
          {course.lessons?.map((lesson, index) => (
            <div 
              key={lesson.id} 
              className={`lesson-item ${activeLesson?.id === lesson.id ? 'active' : ''}`}
              onClick={() => setActiveLesson(lesson)}
            >
              {isLessonCompleted(lesson.id) ? (
                <CheckCircle size={18} style={{ color: '#10b981' }} />
              ) : (
                <Play size={18} style={{ color: activeLesson?.id === lesson.id ? '#3b82f6' : '#64748b' }} />
              )}
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: activeLesson?.id === lesson.id ? 700 : 500 }}>{index + 1}. {lesson.title}</p>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Video · {lesson.duration || '5 mins'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-player-area">
        <header style={{ padding: '12px 24px', background: 'white', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <Menu 
            size={24} 
            style={{ color: 'var(--text-main)', cursor: 'pointer' }} 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
          />
          <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 700 }}>{activeLesson?.title}</h4>
        </header>

        <div className="video-container">
          {activeLesson ? (
            <iframe
              width="100%"
              height="100%"
              src={activeLesson.video_url}
              title={activeLesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#64748b' }}>
              <BookOpen size={48} />
            </div>
          )}
        </div>

        <div className="player-controls">
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="player-nav-btn" onClick={goToPrev} disabled={course.lessons.indexOf(activeLesson) === 0}>
              <ChevronLeft size={20} /> Prev
            </button>
            <button className="player-nav-btn" onClick={goToNext} disabled={course.lessons.indexOf(activeLesson) === course.lessons.length - 1}>
              Next <ChevronRight size={20} />
            </button>
          </div>
          
          {!isLessonCompleted(activeLesson?.id) ? (
             <button 
             className="player-nav-btn" 
             style={{ background: '#3b82f6', color: 'white', borderColor: '#3b82f6' }}
             onClick={() => markComplete(activeLesson.id)}
           >
             Finish & Next <CheckCircle size={18} />
           </button>
          ) : (
             <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
               Completed <CheckCircle size={20} />
             </div>
          )}
        </div>

        <div className="lesson-meta">
          <div style={{ display: 'flex', borderBottom: '1px solid #334155', marginBottom: '32px' }}>
            <button className="tab-btn active">Overview</button>
            <button className="tab-btn">Resources</button>
            <button className="tab-btn">Q&A</button>
          </div>
          
          <h1>{activeLesson?.title}</h1>
          <p>{activeLesson?.content || "No detailed description provided for this lesson module."}</p>
          
          <div style={{ marginTop: '60px', background: 'white', border: '1px solid var(--border-color)', padding: '32px', borderRadius: '24px', boxShadow: 'var(--shadow-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '15px', borderRadius: '15px' }}>
                <Award size={32} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h3 style={{ margin: 0, color: 'var(--text-main)', fontWeight: 800 }}>Institutional Certification</h3>
                <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Complete the curriculum and project milestones to generate your professional certificate.</p>
              </div>
            </div>
            {enrollment?.progress_percentage === 100 && (
              <button 
                className="lms-btn-submit" 
                style={{ width: 'auto', padding: '12px 30px', marginTop: '20px' }}
                onClick={() => navigate('/student-dashboard')}
              >
                Go claim certificate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
