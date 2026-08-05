<div align="center">

# 🚀 SkillSphere Learning Nexus

### Empowering Students • Connecting Talent • Transforming Careers

An AI-powered full-stack learning and workforce platform that bridges the gap between education and industry by providing personalized learning, coding practice, career guidance, and recruitment solutions.

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite)
![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Backend-6DB33F?logo=springboot)
![JWT](https://img.shields.io/badge/JWT-Secure-black)
![License](https://img.shields.io/badge/License-MIT-blue)

</div>

---

# 📖 About

**SkillSphere Learning Nexus** is a full-stack web application developed to provide an integrated ecosystem for students, recruiters, and administrators.

The platform combines AI-assisted learning, placement preparation, coding practice, career roadmap generation, resume building, and workforce management into a single application.

It helps students become industry-ready while providing recruiters with powerful hiring and applicant management tools.

---

# ✨ Key Features

## 🎓 Student Portal

- Personalized Dashboard
- Learning Hub
- AI Study Buddy
- Course Management
- Interactive Coding Arena
- Daily Quests
- Flashcards
- Career Roadmap
- Resume Builder
- Progress Tracker
- Skill Analytics
- Opportunity Feed
- Job Search
- Learning Paths
- Team Collaboration
- Sandbox Environment
- Student Profile
- Certificates Tracking
- Assessments

---

## 💼 Workforce Portal

- Workforce Dashboard
- Recruiter Portal
- Job Posting
- Candidate Management
- Applicant Tracking
- Recruitment Analytics
- Hiring Workflow
- Team Management
- Executive Dashboard
- Service Catalog

---

## 👨‍💼 Admin Panel

- Admin Dashboard
- User Management
- Course Management
- Complaint Tracking
- Certification Management
- Analytics Dashboard
- Platform Monitoring
- Role Management

---

# 🤖 AI Features

- AI Study Buddy
- Personalized Learning Recommendations
- AI Career Roadmap
- Smart Progress Tracking
- AI Resume Suggestions
- AI Learning Assistant
- Intelligent Skill Analysis
- Career Recommendation Engine

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- Context API
- React Router

---

## Backend

- Java 17
- Spring Boot
- Spring Security
- REST APIs
- Maven

---

## Database

- MySQL

---

## Authentication

- JWT Authentication
- Spring Security
- Role-Based Access Control (RBAC)

---

# 📂 Project Structure

```
SkillSphere-Learning-Nexus
│
├── backend
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com.skillsphere.backend
│   │   │   │       ├── config
│   │   │   │       ├── controller
│   │   │   │       ├── model
│   │   │   │       ├── repository
│   │   │   │       ├── security
│   │   │   │       └── BackendApplication.java
│   │   │   └── resources
│   │   │       └── application.properties
│   │   └── test
│   └── pom.xml
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── data
│   │   ├── pages
│   │   ├── styles
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 📚 Modules

### Student Modules

- Login & Registration
- Student Dashboard
- Learning Portal
- AI Study Buddy
- Coding Arena
- Flashcards
- Learning Paths
- Resume Builder
- Progress Tracking
- Career Roadmap
- Job Search
- Opportunity Feed
- Certificates
- Assessments

---

### Workforce Modules

- Recruiter Dashboard
- Workforce Dashboard
- Hiring Portal
- Applicant Tracking
- Team Management
- Executive Dashboard
- Services Catalog

---

### Admin Modules

- User Management
- Course Management
- Complaint Tracking
- Certification Tracking
- Analytics
- Reports

---

# 🔐 User Roles

### 👨‍🎓 Student

- Learn Courses
- Solve Coding Problems
- Build Resume
- Practice Assessments
- Track Progress
- Apply for Jobs
- Access AI Study Buddy

---

### 💼 Recruiter

- Manage Jobs
- View Applicants
- Schedule Interviews
- Track Hiring
- Recruit Talent

---

### 👨‍💻 Administrator

- Manage Platform
- Monitor Analytics
- Manage Users
- Manage Courses
- Handle Complaints

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/SkillSphere-Learning-Nexus.git
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Runs at

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Runs at

```
http://localhost:8080
```

---

# ⚙ Environment Configuration

### Frontend

Create a `.env` file.

```env
VITE_API_URL=http://localhost:8080/api
```

---

### Backend

Configure `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillsphere

spring.datasource.username=root

spring.datasource.password=password

jwt.secret=your_secret_key
```

---

# 📈 Application Workflow

```text
User Registration
        │
        ▼
Authentication
        │
        ▼
Student / Recruiter Dashboard
        │
        ├──────────────┐
        ▼              ▼
Learning         Workforce Portal
        │              │
        ▼              ▼
AI Study Buddy   Candidate Management
        │              │
        ▼              ▼
Coding Arena      Recruitment
        │              │
        ▼              ▼
Career Roadmap    Hiring
        │
        ▼
Resume Builder
        │
        ▼
Job Applications
```

---

# 📷 Screenshots

Add project screenshots inside a **screenshots** folder.

```
screenshots/

├── landing-page.png
├── student-dashboard.png
├── workforce-dashboard.png
├── coding-arena.png
├── ai-study-buddy.png
├── career-roadmap.png
├── resume-builder.png
├── admin-dashboard.png
```

---

# 🌟 Future Scope

- AI Mock Interviews
- Video Interview Platform
- Live Coding Interviews
- Real-time Chat
- AI Resume Analyzer
- Gamification
- Mobile Application
- Company Portal
- Discussion Forum
- Notifications
- Cloud Deployment
- AI Mentor

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit changes

```bash
git commit -m "Added New Feature"
```

4. Push

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request.

---

---

# 👨‍💻 Development Team

<table align="center">
<tr>
<td align="center" width="33%">

### 🎨 Frontend Development

**Soumitri Roy**

- UI/UX Design
- React.js Development
- Student Portal
- Workforce Portal
- Dashboard Design
- Responsive Interface
- Frontend Integration

</td>

<td align="center" width="33%">

### 🎨 Frontend Development

**Tanu Kashyap**

- React.js Development
- UI/UX Components
- Dashboard Design
- Frontend Integration
- Student Portal
- Admin Portal
- Styling & User Experience

</td>

<td align="center" width="33%">

### ⚙️ Backend Development

**Shabira Begum**

- Spring Boot Development
- REST APIs
- Database Integration
- Authentication
- Backend Architecture

</td>
</tr>
</table>

<br>

<div align="center">

### 🤖 AI Chatbot Integration

| Developer | Contribution |
|------------|--------------|
| **Soumitri Roy** | AI Chatbot Integration & Frontend Integration |
| **Shabira Begum** | Backend API Integration & AI Services |

</div>

---

## 📌 Project Responsibilities

| Module | Developer(s) |
|---------|--------------|
| 🎨 Frontend Development | **Soumitri Roy**, **Tanu Kashyap** |
| ⚙️ Backend Development | **Shabira Begum** |
| 💼 Admin Portal | **Tanu Kashyap** |
| 🤖 AI Chatbot Integration | **Soumitri Roy**, **Shabira Begum** |
| 🎓 Student Portal | **Soumitri Roy** ,**Tanu Kashyap**|
| 💼 Workforce Portal | **Soumitri Roy** |
| 🔐 Authentication | **Shabira Begum** |
| 🌐 REST API Development | **Shabira Begum** |
| 🎯 UI/UX Design | **Soumitri Roy**, **Tanu Kashyap** |

---

# 📜 License

This project is licensed under the MIT License.

---

<div align="center">

## ⭐ If you like this project, consider giving it a Star!

### SkillSphere Learning Nexus

**Learn • Build • Practice • Grow • Get Hired 🚀**

</div>
