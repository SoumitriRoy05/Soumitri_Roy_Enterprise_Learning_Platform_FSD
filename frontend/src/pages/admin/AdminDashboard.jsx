import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { FiUsers, FiBook, FiBriefcase, FiSettings, FiLogOut, FiEdit, FiTrash2, FiPlus, FiCheck, FiX, FiImage } from 'react-icons/fi';
import Background from '../../components/Background';
import '../../styles/dashboard.css';

export default function AdminDashboard() {
  const { logoutAdmin, courses, users, workforce, addCourse, updateCourse, deleteCourse, toggleStudentStatus, changeWorkforceStatus } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin-login');
  };

  return (
    <div className="dashboard-page with-sidebar" style={{ background: '#FFFBF7', minHeight: '100vh', color: '#1E1B18', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Background />
      
      {/* Admin Sidebar */}
      <aside style={{
        width: '260px',
        background: '#FFFFFF',
        borderRight: '1px solid #F3EBE1',
        position: 'fixed',
        top: 0, bottom: 0, left: 0,
        display: 'flex', flexDirection: 'column',
        zIndex: 50,
        boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '30px 20px', borderBottom: '1px solid #F3EBE1', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '22px', color: '#1E1B18', fontWeight: '800' }}>Admin Panel</h2>
          <p style={{ color: '#64748B', fontSize: '12px', margin: '5px 0 0', fontWeight: '600' }}>SkillSphere Master Control</p>
        </div>
        
        <nav style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <SidebarBtn icon={<FiBook />} label="Course Management" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
          <SidebarBtn icon={<FiUsers />} label="Student Management" active={activeTab === 'students'} onClick={() => setActiveTab('students')} />
          <SidebarBtn icon={<FiBriefcase />} label="Workforce Management" active={activeTab === 'workforce'} onClick={() => setActiveTab('workforce')} />
          <SidebarBtn icon={<FiSettings />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
        
        <div style={{ padding: '20px', borderTop: '1px solid #F3EBE1' }}>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%', padding: '12px', background: '#FEF2F2', color: '#EF4444',
              border: '1px solid #FCA5A5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: 'pointer', transition: 'all 0.2s', fontWeight: 'bold'
            }}
          >
            <FiLogOut /> Logout Admin
          </button>
        </div>
      </aside>

      <main style={{ marginLeft: '260px', padding: '40px', position: 'relative', zIndex: 10, minHeight: '100vh', overflowY: 'auto' }}>
        {activeTab === 'courses' && <CourseManagement courses={courses} addCourse={addCourse} updateCourse={updateCourse} deleteCourse={deleteCourse} />}
        {activeTab === 'students' && <StudentManagement users={users} toggleStudentStatus={toggleStudentStatus} />}
        {activeTab === 'workforce' && <WorkforceManagement workforce={workforce} changeWorkforceStatus={changeWorkforceStatus} />}
        {activeTab === 'settings' && <SettingsPanel />}
      </main>
    </div>
  );
}

// ---------------- Components ----------------

function SidebarBtn({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
      background: active ? '#FFF0EB' : 'transparent',
      border: 'none', borderLeft: active ? '3px solid #F9572A' : '3px solid transparent',
      color: active ? '#F9572A' : '#64748B', borderRadius: '0 10px 10px 0',
      cursor: 'pointer', fontSize: '15px', fontWeight: active ? '700' : '600',
      transition: 'all 0.2s', width: '100%', textAlign: 'left'
    }}>
      <span style={{ fontSize: '18px' }}>{icon}</span>
      {label}
    </button>
  );
}

// --- Course Management ---
function CourseManagement({ courses, addCourse, updateCourse, deleteCourse }) {
  const [editingCourse, setEditingCourse] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (course = null) => {
    if (course) {
      setEditingCourse(course);
    } else {
      setEditingCourse({
        title: '', description: '', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop', 
        isPremium: false, price: 0, category: 'General', language: 'English'
      });
    }
    setIsFormOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCourse.id) {
      updateCourse(editingCourse.id, editingCourse);
    } else {
      addCourse(editingCourse);
    }
    setIsFormOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '800', color: '#1E1B18' }}>Course Management</h1>
          <p style={{ color: '#64748B', margin: 0 }}>Add, edit, or remove courses from the platform.</p>
        </div>
        <button onClick={() => handleOpenForm()} style={{
          background: '#F9572A', color: '#FFFFFF', border: 'none',
          padding: '12px 24px', borderRadius: '99px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px',
          cursor: 'pointer', boxShadow: '0 4px 12px rgba(249, 87, 42, 0.2)', transition: 'transform 0.2s ease'
        }}>
          <FiPlus /> Add New Course
        </button>
      </div>

      <div style={{ background: '#FFFFFF', border: "1px solid #F3EBE1", borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#FAF8F5', color: '#64748B', fontSize: '12px', textTransform: 'uppercase', fontWeight: '700', borderBottom: '1px solid #F3EBE1' }}>
              <th style={{ padding: '16px 20px' }}>Course</th>
              <th style={{ padding: '16px 20px' }}>Type</th>
              <th style={{ padding: '16px 20px' }}>Price</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} style={{ borderBottom: '1px solid #F3EBE1' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={course.image} alt="thumb" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div>
                    <div style={{ fontWeight: '700', color: '#1E1B18', fontSize: '14px' }}>{course.title}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{course.language} • {course.rating} ⭐</div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  {course.isPremium ? 
                    <span style={{ background: '#FFFBEB', color: '#F59E0B', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>👑 Premium</span> 
                    : <span style={{ background: '#ECFDF5', color: '#10B981', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>Free</span>}
                </td>
                <td style={{ padding: '16px 20px', color: '#F9572A', fontWeight: '700' }}>
                  {course.isPremium ? `₹${course.price}` : '-'}
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button onClick={() => handleOpenForm(course)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', marginRight: '15px' }}><FiEdit size={18} /></button>
                  <button onClick={() => deleteCourse(course.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><FiTrash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #F3EBE1', borderRadius: '20px', width: '500px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 20px', color: '#1E1B18', fontWeight: '800' }}>{editingCourse.id ? 'Edit Course' : 'Create Course'}</h2>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '5px' }}>Course Title</label>
                <input required value={editingCourse.title} onChange={e => setEditingCourse({...editingCourse, title: e.target.value})} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '5px' }}>Image URL</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input required value={editingCourse.image} onChange={e => setEditingCourse({...editingCourse, image: e.target.value})} style={inputStyle} />
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #F3EBE1' }}>
                    {editingCourse.image ? <img src={editingCourse.image} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <FiImage color="#94A3B8" />}
                  </div>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '5px' }}>Description</label>
                <textarea required value={editingCourse.description} onChange={e => setEditingCourse({...editingCourse, description: e.target.value})} style={{...inputStyle, height: '80px', resize: 'none'}} />
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '5px' }}>Course Type</label>
                  <select value={editingCourse.isPremium ? "Premium" : "Free"} onChange={e => setEditingCourse({...editingCourse, isPremium: e.target.value === "Premium"})} style={inputStyle}>
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div style={{ flex: 1, opacity: editingCourse.isPremium ? 1 : 0.5 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748B', marginBottom: '5px' }}>Price (₹)</label>
                  <input type="number" required={editingCourse.isPremium} disabled={!editingCourse.isPremium} value={editingCourse.price} onChange={e => setEditingCourse({...editingCourse, price: parseInt(e.target.value) || 0})} style={inputStyle} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsFormOpen(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid #CBD5E1', color: '#64748B', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '12px', background: '#F9572A', border: 'none', color: '#FFFFFF', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Student Management ---
function StudentManagement({ users, toggleStudentStatus }) {
  return (
    <div>
      <h1 style={{ margin: '0 0 30px', fontSize: '28px', fontWeight: '800', color: '#1E1B18' }}>Student Management</h1>
      <div style={{ background: '#FFFFFF', border: "1px solid #F3EBE1", borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#FAF8F5', color: '#64748B', fontSize: '12px', textTransform: 'uppercase', fontWeight: '700', borderBottom: '1px solid #F3EBE1' }}>
              <th style={{ padding: '16px 20px' }}>ID</th>
              <th style={{ padding: '16px 20px' }}>Name / Email</th>
              <th style={{ padding: '16px 20px' }}>Role</th>
              <th style={{ padding: '16px 20px' }}>Status</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #F3EBE1' }}>
                <td style={{ padding: '16px 20px', color: '#94A3B8', fontWeight: '600' }}>#{u.id}</td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: '700', color: '#1E1B18' }}>{u.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{u.email}</div>
                </td>
                <td style={{ padding: '16px 20px', color: '#F9572A', fontWeight: '600' }}>{u.role}</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    background: u.status === 'Active' ? '#ECFDF5' : '#FEF2F2', 
                    color: u.status === 'Active' ? '#10B981' : '#EF4444', 
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' 
                  }}>
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button onClick={() => toggleStudentStatus(u.id)} style={{
                    background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#64748B',
                    padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: '600'
                  }}>
                    {u.status === 'Active' ? 'Block Access' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Workforce Management ---
function WorkforceManagement({ workforce, changeWorkforceStatus }) {
  return (
    <div>
      <h1 style={{ margin: '0 0 30px', fontSize: '28px', fontWeight: '800', color: '#1E1B18' }}>Workforce Management</h1>
      <div style={{ background: '#FFFFFF', border: "1px solid #F3EBE1", borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#FAF8F5', color: '#64748B', fontSize: '12px', textTransform: 'uppercase', fontWeight: '700', borderBottom: '1px solid #F3EBE1' }}>
              <th style={{ padding: '16px 20px' }}>ID</th>
              <th style={{ padding: '16px 20px' }}>Name / Email</th>
              <th style={{ padding: '16px 20px' }}>Status</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workforce.map(w => (
              <tr key={w.id} style={{ borderBottom: '1px solid #F3EBE1' }}>
                <td style={{ padding: '16px 20px', color: '#94A3B8', fontWeight: '600' }}>#{w.id}</td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: '700', color: '#1E1B18' }}>{w.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{w.email}</div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    background: w.status === 'Approved' ? '#ECFDF5' : w.status === 'Rejected' ? '#FEF2F2' : '#FFFBEB', 
                    color: w.status === 'Approved' ? '#10B981' : w.status === 'Rejected' ? '#EF4444' : '#F59E0B', 
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' 
                  }}>
                    {w.status}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  {w.status !== 'Approved' && (
                    <button onClick={() => changeWorkforceStatus(w.id, 'Approved')} style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#10B981', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><FiCheck /></button>
                  )}
                  {w.status !== 'Rejected' && (
                    <button onClick={() => changeWorkforceStatus(w.id, 'Rejected')} style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><FiX /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Settings ---
function SettingsPanel() {
  return (
    <div>
      <h1 style={{ margin: '0 0 30px', fontSize: '28px', fontWeight: '800', color: '#1E1B18' }}>Platform Settings</h1>
      <div style={{ maxWidth: '600px', background: '#FFFFFF', border: "1px solid #F3EBE1", borderRadius: '16px', padding: '30px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#64748B', marginBottom: '8px' }}>Platform Name</label>
          <input value="SkillSphere" readOnly style={inputStyle} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#64748B', marginBottom: '8px' }}>Admin Notification Email</label>
          <input value="admin@skillsphere.com" readOnly style={inputStyle} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#64748B', marginBottom: '8px' }}>Global Tax Rate (%)</label>
          <input value="18" type="number" readOnly style={inputStyle} />
        </div>
        <button style={{
          padding: '12px 24px', background: '#F9572A', border: 'none', color: '#FFFFFF', borderRadius: '10px', fontWeight: '800', cursor: 'not-allowed', opacity: 0.7
        }}>
          Save Settings (Demo)
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 14px', background: '#FFFFFF', border: '1px solid #E2E8F0',
  borderRadius: '10px', color: '#1E1B18', fontSize: '14px', outline: 'none'
};
