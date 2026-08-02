import React, { createContext, useState, useEffect, useContext } from 'react';

const AdminContext = createContext(null);

const initialCoursesData = [
  {
    id: 1,
    title: "Frontend System Design",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    isPremium: true,
    price: 999,
    language: "English",
    rating: "4.8",
    reviews: "5K+",
    description: "Go from Zero to Hero in Frontend System Design. Master large-scale application architecture."
  },
  {
    id: 2,
    title: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    isPremium: true,
    price: 499,
    language: "English",
    rating: "4.7",
    reviews: "40K+",
    description: "Master React.js. Learn from the ground up and build real-world applications with ease."
  },
  {
    id: 3,
    title: "JavaScript",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop",
    isPremium: false,
    price: 0,
    language: "English",
    rating: "4.8",
    reviews: "50K+",
    description: "A pure in-depth JavaScript Course released for Free."
  },
  {
    id: 4,
    title: "Data Structures & Algorithms (DSA)",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
    isPremium: true,
    price: 1499,
    language: "English",
    rating: "4.9",
    reviews: "100K+",
    description: "Comprehensive DSA bootcamp for FAANG interviews. Covers arrays, trees, dynamic programming and more."
  },
  {
    id: 5,
    title: "Generative AI Engineering",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    isPremium: true,
    price: 1999,
    language: "English",
    rating: "4.9",
    reviews: "12K+",
    description: "Learn to build LLM applications, RAG pipelines, and integrate AI into your software."
  },
  {
    id: 6,
    title: "Machine Learning Foundations",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
    isPremium: false,
    price: 0,
    language: "English",
    rating: "4.6",
    reviews: "25K+",
    description: "A beginner-friendly guide to Machine Learning concepts, models, and Python implementation."
  },
  {
    id: 7,
    title: "Advanced Node.js & Microservices",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    isPremium: true,
    price: 799,
    language: "English",
    rating: "4.7",
    reviews: "18K+",
    description: "Scale your backend architecture. Learn Docker, Kubernetes, and Node.js microservices."
  },
  {
    id: 8,
    title: "Fullstack Next.js 14",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    isPremium: true,
    price: 1299,
    language: "English",
    rating: "4.8",
    reviews: "30K+",
    description: "Build SEO-friendly, highly performant web applications using App Router and Server Actions."
  },
  {
    id: 9,
    title: "Web3 & Solidity Development",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&h=400&fit=crop",
    isPremium: true,
    price: 1999,
    language: "English",
    rating: "4.5",
    reviews: "8K+",
    description: "Master blockchain development, smart contracts, and decentralized application (dApp) design."
  },
  {
    id: 10,
    title: "Cloud Computing with AWS",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    isPremium: false,
    price: 0,
    language: "English",
    rating: "4.7",
    reviews: "55K+",
    description: "Get certified. Learn EC2, S3, Lambda, and complete AWS infrastructure management."
  },
  {
    id: 11,
    title: "Python for Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    isPremium: true,
    price: 899,
    language: "English",
    rating: "4.8",
    reviews: "60K+",
    description: "Master Pandas, NumPy, Matplotlib, and data analysis techniques using Python."
  },
  {
    id: 12,
    title: "UI/UX Design Masterclass",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    isPremium: true,
    price: 699,
    language: "English",
    rating: "4.9",
    reviews: "22K+",
    description: "Learn Figma, design thinking, user research, and build stunning user interfaces."
  }
];

const initialUsersData = [
  { id: 101, name: "Aarav Sharma", email: "aarav@example.com", role: "STUDENT", status: "Active", createdAt: "2025-05-20T10:00:00" },
  { id: 102, name: "Priya Patel", email: "priya@example.com", role: "STUDENT", status: "Active", createdAt: "2025-05-20T09:15:00" },
  { id: 103, name: "Rohan Verma", email: "rohan@example.com", role: "STUDENT", status: "Active", createdAt: "2025-05-19T14:30:00" },
  { id: 104, name: "Sneha Iyer", email: "sneha@example.com", role: "STUDENT", status: "Active", createdAt: "2025-05-19T11:00:00" },
  { id: 105, name: "Karan Mehta", email: "karan@example.com", role: "STUDENT", status: "Active", createdAt: "2025-05-18T16:45:00" },
  { id: 106, name: "Alice Johnson", email: "alice@example.com", role: "STUDENT", status: "Active", createdAt: "2025-05-15T08:00:00" },
  { id: 107, name: "Bob Smith", email: "bob@example.com", role: "STUDENT", status: "Active", createdAt: "2025-05-14T12:00:00" },
  { id: 108, name: "Charlie Davis", email: "charlie@example.com", role: "STUDENT", status: "Blocked", createdAt: "2025-05-12T15:20:00" }
];

const initialWorkforceData = [
  { id: 201, name: "Neha Singh", email: "neha@skillsphere.com", role: "EMPLOYEE", status: "Approved", createdAt: "2025-05-20T10:30:00" },
  { id: 202, name: "Vikram Joshi", email: "vikram@skillsphere.com", role: "EMPLOYEE", status: "Approved", createdAt: "2025-05-20T08:45:00" },
  { id: 203, name: "Anjali Desai", email: "anjali@skillsphere.com", role: "EMPLOYEE", status: "Approved", createdAt: "2025-05-19T17:15:00" },
  { id: 204, name: "Rahul Kumar", email: "rahul@skillsphere.com", role: "EMPLOYEE", status: "Approved", createdAt: "2025-05-19T13:10:00" },
  { id: 205, name: "Pooja Nair", email: "pooja@skillsphere.com", role: "EMPLOYEE", status: "Approved", createdAt: "2025-05-18T15:00:00" },
  { id: 206, name: "Eve Trainer", email: "eve@skillsphere.com", role: "MANAGER", status: "Approved", createdAt: "2025-05-15T11:00:00" },
  { id: 207, name: "Frank Mentor", email: "frank@skillsphere.com", role: "EMPLOYEE", status: "Pending", createdAt: "2025-05-14T09:30:00" },
  { id: 208, name: "Grace Guide", email: "grace@skillsphere.com", role: "EMPLOYEE", status: "Rejected", createdAt: "2025-05-12T14:45:00" }
];

const initialCertificatesData = [
  { id: 301, studentName: "Aarav Sharma", studentEmail: "aarav@example.com", title: "Frontend System Design", issuedAt: "2025-05-20T10:00:00", verificationCode: "CERT-FSD-982" },
  { id: 302, studentName: "Priya Patel", studentEmail: "priya@example.com", title: "React Masterclass", issuedAt: "2025-05-20T09:15:00", verificationCode: "CERT-RCT-120" },
  { id: 303, studentName: "Rohan Verma", studentEmail: "rohan@example.com", title: "JavaScript Deep Dive", issuedAt: "2025-05-19T14:30:00", verificationCode: "CERT-JS-542" },
  { id: 304, studentName: "Sneha Iyer", studentEmail: "sneha@example.com", title: "Cloud Computing with AWS", issuedAt: "2025-05-19T11:00:00", verificationCode: "CERT-AWS-871" },
  { id: 305, studentName: "Karan Mehta", studentEmail: "karan@example.com", title: "Machine Learning Foundations", issuedAt: "2025-05-18T16:45:00", verificationCode: "CERT-ML-304" }
];

export function AdminProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const [courses, setCourses] = useState(() => {
    const local = localStorage.getItem('admin_courses');
    return local ? JSON.parse(local) : initialCoursesData;
  });
  
  const [users, setUsers] = useState(() => {
    const local = localStorage.getItem('admin_users');
    return local ? JSON.parse(local) : initialUsersData;
  });

  const [workforce, setWorkforce] = useState(() => {
    const local = localStorage.getItem('admin_workforce');
    return local ? JSON.parse(local) : initialWorkforceData;
  });

  const [certificates, setCertificates] = useState(() => {
    const local = localStorage.getItem('admin_certificates');
    return local ? JSON.parse(local) : initialCertificatesData;
  });

  // ── Course Pending Approval Requests ──
  const [pendingCourseRequests, setPendingCourseRequests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('skillsphere_pending_course_requests') || '[]');
    } catch {
      return [];
    }
  });
  
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return localStorage.getItem('admin_session') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('admin_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('admin_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('admin_workforce', JSON.stringify(workforce));
  }, [workforce]);

  useEffect(() => {
    localStorage.setItem('admin_certificates', JSON.stringify(certificates));
  }, [certificates]);

  // Keep pendingCourseRequests in sync with localStorage (written by CoursesPage)
  useEffect(() => {
    const sync = () => {
      try {
        const fresh = JSON.parse(localStorage.getItem('skillsphere_pending_course_requests') || '[]');
        setPendingCourseRequests(fresh);
      } catch {}
    };
    // Sync on mount and on storage events
    sync();
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const fetchCourses = async () => {
    try {
      const coursesRes = await fetch(`${API_URL}/api/admin/courses`);
      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        if (coursesData.success && coursesData.courses && coursesData.courses.length > 0) {
          setCourses(coursesData.courses);
        }
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const fetchData = async () => {
    try {
      await fetchCourses();

      const usersRes = await fetch(`${API_URL}/api/admin/users`);
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        if (usersData.success) {
          const allUsers = usersData.users || [];
          
          if (allUsers.length > 0) {
            // Filter students
            const students = allUsers.filter(u => u.role === "STUDENT").map(u => ({
              id: u.id,
              name: u.fullName || u.username,
              email: u.email,
              role: u.role,
              status: u.isActive ? 'Active' : 'Blocked',
              createdAt: u.createdAt || new Date().toISOString()
            }));
            setUsers(prev => {
              // Merge: keep local ones if not present in backend
              const merged = [...students];
              prev.forEach(p => {
                if (!merged.some(m => m.email === p.email)) {
                  merged.push(p);
                }
              });
              return merged;
            });

            // Filter workforce
            const wf = allUsers.filter(u => u.role === "EMPLOYEE" || u.role === "MANAGER").map(u => ({
              id: u.id,
              name: u.fullName || u.username,
              email: u.email,
              role: u.role,
              status: u.isActive ? 'Approved' : 'Pending',
              createdAt: u.createdAt || new Date().toISOString()
            }));
            setWorkforce(prev => {
              const merged = [...wf];
              prev.forEach(p => {
                if (!merged.some(m => m.email === p.email)) {
                  merged.push(p);
                }
              });
              return merged;
            });
          }
        }
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (isAdminAuth) {
      fetchData();
    }
  }, [isAdminAuth]);

  const loginAdmin = (email, password) => {
    if (email === "admin@skillsphere.com" && password === "admin123") {
      setIsAdminAuth(true);
      localStorage.setItem('admin_session', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuth(false);
    localStorage.removeItem('admin_session');
  };

  // Course Management
  const addCourse = async (course) => {
    const newCourse = {
      ...course,
      id: course.id || Date.now(),
      rating: course.rating || "4.5",
      reviews: course.reviews || "1K+"
    };
    setCourses(prev => [...prev, newCourse]);

    try {
      // New courses must not include the temporary browser id. The server assigns
      // the persisted id, which is then used for future edits and deletes.
      const { id: temporaryId, ...coursePayload } = newCourse;
      const response = await fetch(`${API_URL}/api/admin/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coursePayload)
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.course) {
        throw new Error(data.message || "Unable to save course");
      }
      setCourses(prev => prev.map(c => c.id === temporaryId ? data.course : c));
    } catch (err) {
      console.error("Failed to add course API call:", err);
    }
  };

  const updateCourse = async (id, updatedCourse) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updatedCourse } : c));

    try {
      const response = await fetch(`${API_URL}/api/admin/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedCourse, id })
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.course) {
        throw new Error(data.message || "Unable to update course");
      }
      setCourses(prev => prev.map(c => c.id === id ? data.course : c));
    } catch (err) {
      console.error("Failed to update course API call:", err);
    }
  };

  const deleteCourse = async (id) => {
    const deletedCourse = courses.find(c => c.id === id);
    setCourses(prev => prev.filter(c => c.id !== id));

    try {
      const response = await fetch(`${API_URL}/api/admin/courses/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Unable to delete course");
      }
    } catch (err) {
      console.error("Failed to delete course API call:", err);
      // Keep the local catalog intact when a persisted course could not be deleted.
      if (deletedCourse) {
        setCourses(prev => prev.some(c => c.id === id) ? prev : [...prev, deletedCourse]);
      }
    }
  };

  // Student Management
  const addStudent = (student) => {
    const newStudent = {
      id: student.id || Date.now(),
      name: student.name,
      email: student.email,
      role: "STUDENT",
      status: student.status || "Active",
      createdAt: student.createdAt || new Date().toISOString()
    };
    setUsers(prev => [newStudent, ...prev]);
  };

  const toggleStudentStatus = async (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));

    try {
      await fetch(`${API_URL}/api/admin/users/${id}/toggle-status`, {
        method: "POST"
      });
    } catch (err) {
      console.error("Failed to toggle student status API call:", err);
    }
  };

  const deleteStudent = async (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));

    try {
      await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.error("Failed to delete student API call:", err);
    }
  };

  // Workforce Management
  const addWorkforce = (member) => {
    const newMember = {
      id: member.id || Date.now(),
      name: member.name,
      email: member.email,
      role: member.role || "EMPLOYEE",
      status: member.status || "Approved",
      createdAt: member.createdAt || new Date().toISOString()
    };
    setWorkforce(prev => [newMember, ...prev]);
  };

  const changeWorkforceStatus = async (id, status) => {
    setWorkforce(prev => prev.map(w => w.id === id ? { ...w, status } : w));

    try {
      await fetch(`${API_URL}/api/admin/users/${id}/toggle-status`, {
        method: "POST"
      });
    } catch (err) {
      console.error("Failed to change workforce status API call:", err);
    }
  };

  // Certifications Management
  const addCertificate = (cert) => {
    const newCert = {
      id: cert.id || Date.now(),
      studentName: cert.studentName,
      studentEmail: cert.studentEmail,
      title: cert.title,
      issuedAt: cert.issuedAt || new Date().toISOString(),
      verificationCode: cert.verificationCode || `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    setCertificates(prev => [newCert, ...prev]);
  };

  const deleteCertificate = (id) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  // ── Approve / Reject Course Requests ──
  const approveCourseRequest = (requestId) => {
    const updated = pendingCourseRequests.map(r =>
      r.id === requestId ? { ...r, status: 'approved' } : r
    );
    setPendingCourseRequests(updated);
    localStorage.setItem('skillsphere_pending_course_requests', JSON.stringify(updated));

    // Enroll the student: write to their enrolled courses key
    const req = pendingCourseRequests.find(r => r.id === requestId);
    if (req) {
      // The student's enrolled courses are stored under 'enrolledCourses_{userKey}'
      const userKey = req.studentEmail || 'default';
      const storageKey = `enrolledCourses_${userKey}`;
      try {
        const enrolled = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (!enrolled.includes(req.courseId)) {
          enrolled.push(req.courseId);
          localStorage.setItem(storageKey, JSON.stringify(enrolled));
        }
      } catch {}

      // Also update courses list enrollment count
      setCourses(prev => prev.map(c =>
        c.id.toString() === req.courseId
          ? { ...c, enrollments: (c.enrollments || 0) + 1 }
          : c
      ));
    }
  };

  const rejectCourseRequest = (requestId) => {
    const updated = pendingCourseRequests.map(r =>
      r.id === requestId ? { ...r, status: 'rejected' } : r
    );
    setPendingCourseRequests(updated);
    localStorage.setItem('skillsphere_pending_course_requests', JSON.stringify(updated));
  };

  const refreshPendingRequests = () => {
    try {
      const fresh = JSON.parse(localStorage.getItem('skillsphere_pending_course_requests') || '[]');
      setPendingCourseRequests(fresh);
    } catch {}
  };

  const value = {
    isAdminAuth, loginAdmin, logoutAdmin,
    courses, addCourse, updateCourse, deleteCourse,
    users, addStudent, toggleStudentStatus, deleteStudent,
    workforce, addWorkforce, changeWorkforceStatus,
    certificates, addCertificate, deleteCertificate,
    pendingCourseRequests, approveCourseRequest, rejectCourseRequest, refreshPendingRequests
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
}

