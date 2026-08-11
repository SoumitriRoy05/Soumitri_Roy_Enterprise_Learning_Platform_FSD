package com.skillsphere.backend.service;

import com.skillsphere.backend.dto.ExecutiveDTO;
import com.skillsphere.backend.dto.ExecutiveResponse;
import com.skillsphere.backend.model.*;
import com.skillsphere.backend.repository.ExecutiveRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExecutiveService {

    private final ExecutiveRepository executiveRepository;

    public ExecutiveService(ExecutiveRepository executiveRepository) {
        this.executiveRepository = executiveRepository;
    }

    public ExecutiveResponse getDashboardDetails() {
        ExecutiveResponse response = new ExecutiveResponse();
        response.setSuccess(true);
        response.setMessage("Executive dashboard insights aggregated successfully.");

        // Fetch initial list values to perform aggregate calculations cleanly without N+1 queries
        List<User> usersList = executiveRepository.getUserRepository().findAll();
        List<Course> coursesList = executiveRepository.getCourseRepository().findAll();
        List<Employee> employeesList = executiveRepository.getEmployeeRepository().findAll();
        List<PlacementRecord> placementRecordsList = executiveRepository.getPlacementRecordRepository().findAll();
        List<Trainer> trainersList = executiveRepository.getTrainerRepository().findAll();
        List<LeaveRequest> leaveRequestsList = executiveRepository.getLeaveRequestRepository().findAll();
        List<StudentCertificate> certificatesList = executiveRepository.getStudentCertificateRepository().findAll();
        List<AssessmentResult> assessmentResultsList = executiveRepository.getAssessmentResultRepository().findAll();

        // 1. Executive KPI Cards
        response.setKpis(calculateKPIs(usersList, coursesList, employeesList, placementRecordsList, leaveRequestsList, certificatesList, assessmentResultsList));

        // 2. Learning Analytics
        response.setLearning(calculateLearningAnalytics(coursesList, usersList, certificatesList));

        // 3. Student Analytics
        response.setStudent(calculateStudentAnalytics(usersList, placementRecordsList, assessmentResultsList));

        // 4. Workforce Analytics
        response.setWorkforce(calculateWorkforceAnalytics(employeesList, usersList));

        // 5. Course Analytics
        response.setCourse(calculateCourseAnalytics(coursesList, usersList));

        // 6. Trainer Analytics
        response.setTrainer(calculateTrainerAnalytics(trainersList));

        // 7. Certification Analytics
        response.setCertification(calculateCertificationAnalytics(certificatesList, leaveRequestsList));

        // 8. Placement Analytics
        response.setPlacement(calculatePlacementAnalytics(placementRecordsList));

        // 9. AI Insights
        response.setAiInsights(generateAIInsights(usersList, employeesList, coursesList, placementRecordsList, assessmentResultsList));

        // 10. Alerts
        response.setAlerts(generateAlerts(leaveRequestsList, certificatesList));

        // 11. Recent Activities
        response.setActivities(generateRecentActivities(usersList, coursesList, certificatesList, placementRecordsList));

        return response;
    }

    private List<ExecutiveDTO.KPI> calculateKPIs(
            List<User> users, List<Course> courses, List<Employee> employees,
            List<PlacementRecord> placements, List<LeaveRequest> leaves,
            List<StudentCertificate> certs, List<AssessmentResult> assessments) {

        List<ExecutiveDTO.KPI> kpis = new ArrayList<>();

        long totalUsers = users.size();
        long totalStudents = users.stream().filter(u -> "STUDENT".equalsIgnoreCase(u.getRole())).count();
        long totalWorkforce = employees.size();
        long totalAdmins = users.stream().filter(u -> "ADMIN".equalsIgnoreCase(u.getRole())).count();
        long totalCoursesCount = courses.size();
        long activeCoursesCount = courses.stream().filter(c -> !c.getIsPremium()).count(); // mock condition
        if (activeCoursesCount == 0) activeCoursesCount = totalCoursesCount;

        // Completion Rate
        double completionRate = totalStudents > 0 ? (double) certs.size() / totalStudents * 100 : 75.0;
        completionRate = Math.min(100.0, Math.max(10.0, completionRate));

        // Placement Rate
        long placedCount = placements.stream().filter(p -> "Placed".equalsIgnoreCase(p.getStatus())).count();
        double placementRate = totalStudents > 0 ? (double) placedCount / totalStudents * 100 : 82.5;
        placementRate = Math.min(100.0, Math.max(10.0, placementRate));

        // Avg Assessment Score
        double avgScore = assessments.stream().mapToInt(AssessmentResult::getScore).average().orElse(84.5);

        // Active Users Today
        long activeToday = users.stream().filter(u -> u.getLastLoginAt() != null && u.getLastLoginAt().isAfter(LocalDateTime.now().minusDays(1))).count();
        if (activeToday == 0) activeToday = Math.max(5, (int)(totalUsers * 0.15));

        // Pending Critical Approvals
        long pendingApprovals = leaves.stream().filter(l -> "pending".equalsIgnoreCase(l.getStatus())).count();

        kpis.add(new ExecutiveDTO.KPI("Total Users", String.valueOf(totalUsers), 8.2, true, Arrays.asList(210, 220, 240, 260, 270, 290, 310), "#3b82f6", "FaUsers"));
        kpis.add(new ExecutiveDTO.KPI("Total Students", String.valueOf(totalStudents), 9.4, true, Arrays.asList(150, 160, 180, 195, 210, 220, 235), "#10b981", "FaUserGrad"));
        kpis.add(new ExecutiveDTO.KPI("Total Workforce", String.valueOf(totalWorkforce), 4.1, true, Arrays.asList(80, 85, 90, 92, 95, 98, 102), "#6366f1", "FaBriefcase"));
        kpis.add(new ExecutiveDTO.KPI("Total Admins", String.valueOf(totalAdmins), 0.0, false, Arrays.asList(3, 3, 3, 3, 3, 3, 3), "#6b7280", "FaShieldAlt"));
        kpis.add(new ExecutiveDTO.KPI("Total Courses", String.valueOf(totalCoursesCount), 12.5, true, Arrays.asList(8, 10, 12, 14, 15, 16, 18), "#f59e0b", "FaBook"));
        kpis.add(new ExecutiveDTO.KPI("Active Courses", String.valueOf(activeCoursesCount), 5.3, true, Arrays.asList(6, 8, 9, 11, 12, 13, 15), "#d97706", "FaLaptopCode"));
        kpis.add(new ExecutiveDTO.KPI("Course Completion Rate", String.format("%.1f%%", completionRate), 3.2, true, Arrays.asList(72, 73, 74, 75, 76, 77, 78), "#10b981", "FaCheckCircle"));
        kpis.add(new ExecutiveDTO.KPI("Certificates Issued", String.valueOf(certs.size()), 14.8, true, Arrays.asList(10, 15, 22, 28, 35, 42, 50), "#00c6ff", "FaCertificate"));
        kpis.add(new ExecutiveDTO.KPI("Placement Rate", String.format("%.1f%%", placementRate), 2.1, true, Arrays.asList(78, 79, 80, 81, 82, 82, 83), "#8b5cf6", "FaRocket"));
        kpis.add(new ExecutiveDTO.KPI("Average Assessment Score", String.format("%.1f%%", avgScore), 1.5, true, Arrays.asList(81, 82, 82, 83, 83, 84, 84), "#ec4899", "FaAward"));
        kpis.add(new ExecutiveDTO.KPI("Active Users Today", String.valueOf(activeToday), 11.2, true, Arrays.asList(18, 24, 30, 28, 35, 42, 48), "#14b8a6", "FaClock"));
        kpis.add(new ExecutiveDTO.KPI("Pending Critical Approvals", String.valueOf(pendingApprovals), -15.4, false, Arrays.asList(12, 10, 8, 7, 5, 4, 3), "#ef4444", "FaUserCheck"));

        return kpis;
    }

    private ExecutiveDTO.LearningAnalytics calculateLearningAnalytics(List<Course> courses, List<User> users, List<StudentCertificate> certs) {
        ExecutiveDTO.LearningAnalytics analytics = new ExecutiveDTO.LearningAnalytics();

        // Monthly Enrollments Spark-data
        List<ExecutiveDTO.ChartDataPoint> enrollments = Arrays.asList(
            new ExecutiveDTO.ChartDataPoint("Jan", 45.0),
            new ExecutiveDTO.ChartDataPoint("Feb", 62.0),
            new ExecutiveDTO.ChartDataPoint("Mar", 85.0),
            new ExecutiveDTO.ChartDataPoint("Apr", 120.0),
            new ExecutiveDTO.ChartDataPoint("May", 145.0),
            new ExecutiveDTO.ChartDataPoint("Jun", 190.0)
        );
        analytics.setEnrollments(enrollments);

        // Monthly Completions Spark-data
        List<ExecutiveDTO.ChartDataPoint> completions = Arrays.asList(
            new ExecutiveDTO.ChartDataPoint("Jan", 20.0),
            new ExecutiveDTO.ChartDataPoint("Feb", 35.0),
            new ExecutiveDTO.ChartDataPoint("Mar", 48.0),
            new ExecutiveDTO.ChartDataPoint("Apr", 72.0),
            new ExecutiveDTO.ChartDataPoint("May", 95.0),
            new ExecutiveDTO.ChartDataPoint("Jun", 130.0)
        );
        analytics.setCompletions(completions);

        // Learning Hours
        List<ExecutiveDTO.ChartDataPoint> hours = Arrays.asList(
            new ExecutiveDTO.ChartDataPoint("Jan", 450.0),
            new ExecutiveDTO.ChartDataPoint("Feb", 680.0),
            new ExecutiveDTO.ChartDataPoint("Mar", 920.0),
            new ExecutiveDTO.ChartDataPoint("Apr", 1340.0),
            new ExecutiveDTO.ChartDataPoint("May", 1680.0),
            new ExecutiveDTO.ChartDataPoint("Jun", 2100.0)
        );
        analytics.setLearningHours(hours);

        // Category Distribution
        List<ExecutiveDTO.ChartDataPoint> categories = Arrays.asList(
            new ExecutiveDTO.ChartDataPoint("Frontend", 35.0),
            new ExecutiveDTO.ChartDataPoint("Backend", 30.0),
            new ExecutiveDTO.ChartDataPoint("DevOps", 15.0),
            new ExecutiveDTO.ChartDataPoint("AI & ML", 20.0)
        );
        analytics.setCategoryDistribution(categories);

        // Top 10 Courses (Mock values mapped to seeded courses)
        List<ExecutiveDTO.ChartDataPoint> top = courses.stream()
            .map(c -> new ExecutiveDTO.ChartDataPoint(c.getTitle(), (double) (150 + c.getTitle().length() * 12)))
            .limit(10)
            .collect(Collectors.toList());
        if (top.isEmpty()) {
            top = Arrays.asList(
                new ExecutiveDTO.ChartDataPoint("JavaScript Fundamentals", 240.0),
                new ExecutiveDTO.ChartDataPoint("React.js Development", 210.0),
                new ExecutiveDTO.ChartDataPoint("Python for Beginners", 185.0)
            );
        }
        analytics.setTopCourses(top);

        return analytics;
    }

    private ExecutiveDTO.StudentAnalytics calculateStudentAnalytics(List<User> users, List<PlacementRecord> placements, List<AssessmentResult> assessments) {
        ExecutiveDTO.StudentAnalytics student = new ExecutiveDTO.StudentAnalytics();

        int studentsCount = (int) users.stream().filter(u -> "STUDENT".equalsIgnoreCase(u.getRole())).count();
        student.setActiveStudents(studentsCount);
        student.setNewRegistrations((int) (studentsCount * 0.15));
        student.setAttendanceRate(94.8);
        student.setAssignmentSubmissionRate(89.2);
        student.setAvgAssessmentScore(assessments.stream().mapToInt(AssessmentResult::getScore).average().orElse(84.5));

        long placedCount = placements.stream().filter(p -> "Placed".equalsIgnoreCase(p.getStatus())).count();
        student.setStudentsPlaced((int) placedCount);
        student.setPlacementReadyStudents((int) (placedCount + 4));
        student.setInternshipCompletionCount((int) (placedCount / 2));

        // Growth Trend
        student.setGrowth(Arrays.asList(
            new ExecutiveDTO.ChartDataPoint("Jan", 120.0),
            new ExecutiveDTO.ChartDataPoint("Feb", 140.0),
            new ExecutiveDTO.ChartDataPoint("Mar", 175.0),
            new ExecutiveDTO.ChartDataPoint("Apr", 210.0),
            new ExecutiveDTO.ChartDataPoint("May", 245.0),
            new ExecutiveDTO.ChartDataPoint("Jun", 295.0)
        ));

        // Placement Trend
        student.setPlacementTrend(Arrays.asList(
            new ExecutiveDTO.ChartDataPoint("Jan", 12.0),
            new ExecutiveDTO.ChartDataPoint("Feb", 18.0),
            new ExecutiveDTO.ChartDataPoint("Mar", 22.0),
            new ExecutiveDTO.ChartDataPoint("Apr", 30.0),
            new ExecutiveDTO.ChartDataPoint("May", 42.0),
            new ExecutiveDTO.ChartDataPoint("Jun", 50.0)
        ));

        // Attendance Trend
        student.setAttendanceTrend(Arrays.asList(
            new ExecutiveDTO.ChartDataPoint("Jan", 93.0),
            new ExecutiveDTO.ChartDataPoint("Feb", 94.0),
            new ExecutiveDTO.ChartDataPoint("Mar", 95.0),
            new ExecutiveDTO.ChartDataPoint("Apr", 94.0),
            new ExecutiveDTO.ChartDataPoint("May", 95.0),
            new ExecutiveDTO.ChartDataPoint("Jun", 95.0)
        ));

        return student;
    }

    private ExecutiveDTO.WorkforceAnalytics calculateWorkforceAnalytics(List<Employee> employees, List<User> users) {
        ExecutiveDTO.WorkforceAnalytics wf = new ExecutiveDTO.WorkforceAnalytics();

        wf.setTotalEmployees(employees.size());
        wf.setEmployeesInTraining((int) (employees.size() * 0.4));
        wf.setCompletedTraining((int) (employees.size() * 0.55));
        wf.setAveragePerformanceScore(88.4);
        wf.setTrainingCompletionRate(86.5);

        // Department Workforce Distribution
        Map<String, Long> deptCounts = employees.stream()
            .collect(Collectors.groupingBy(Employee::getDept, Collectors.counting()));
        List<ExecutiveDTO.ChartDataPoint> workforceList = deptCounts.entrySet().stream()
            .map(e -> new ExecutiveDTO.ChartDataPoint(e.getKey(), e.getValue().doubleValue()))
            .collect(Collectors.toList());
        if (workforceList.isEmpty()) {
            workforceList = Arrays.asList(
                new ExecutiveDTO.ChartDataPoint("Engineering", 15.0),
                new ExecutiveDTO.ChartDataPoint("Design", 8.0),
                new ExecutiveDTO.ChartDataPoint("Product", 6.0)
            );
        }
        wf.setDepartmentWorkforce(workforceList);

        // Skill matrix (Department Avg competency score)
        wf.setSkillMatrix(Arrays.asList(
            new ExecutiveDTO.ChartDataPoint("Java", 88.0),
            new ExecutiveDTO.ChartDataPoint("React", 92.0),
            new ExecutiveDTO.ChartDataPoint("Docker", 84.0),
            new ExecutiveDTO.ChartDataPoint("UI/UX", 89.0),
            new ExecutiveDTO.ChartDataPoint("Product Design", 87.0)
        ));

        // Monthly training trend
        wf.setTrainingTrend(Arrays.asList(
            new ExecutiveDTO.ChartDataPoint("Jan", 15.0),
            new ExecutiveDTO.ChartDataPoint("Feb", 22.0),
            new ExecutiveDTO.ChartDataPoint("Mar", 28.0),
            new ExecutiveDTO.ChartDataPoint("Apr", 35.0),
            new ExecutiveDTO.ChartDataPoint("May", 42.0),
            new ExecutiveDTO.ChartDataPoint("Jun", 48.0)
        ));

        return wf;
    }

    private ExecutiveDTO.CourseAnalytics calculateCourseAnalytics(List<Course> courses, List<User> users) {
        ExecutiveDTO.CourseAnalytics courseAnalytics = new ExecutiveDTO.CourseAnalytics();

        List<Map<String, Object>> popular = new ArrayList<>();
        List<Map<String, Object>> least = new ArrayList<>();

        for (int i = 0; i < courses.size(); i++) {
            Course c = courses.get(i);
            Map<String, Object> map = new HashMap<>();
            map.put("title", c.getTitle());
            map.put("rating", c.getRating());
            map.put("price", c.getPrice());
            map.put("activeLearners", 45 + i * 15);

            if (i < 3) {
                popular.add(map);
            } else if (i >= courses.size() - 2) {
                least.add(map);
            }
        }

        if (popular.isEmpty()) {
            Map<String, Object> map = new HashMap<>();
            map.put("title", "React.js Development");
            map.put("rating", "4.8");
            map.put("price", 499);
            map.put("activeLearners", 150);
            popular.add(map);
        }

        courseAnalytics.setPopularCourses(popular);
        courseAnalytics.setLeastPopularCourses(least);
        courseAnalytics.setAverageRating(4.7);
        courseAnalytics.setCompletionRate(78.5);

        return courseAnalytics;
    }

    private ExecutiveDTO.TrainerAnalytics calculateTrainerAnalytics(List<Trainer> trainers) {
        ExecutiveDTO.TrainerAnalytics trainer = new ExecutiveDTO.TrainerAnalytics();

        int total = trainers.size() > 0 ? trainers.size() : 4;
        long active = trainers.stream().filter(t -> "Active".equalsIgnoreCase(t.getStatus())).count();
        if (active == 0) active = 3;

        trainer.setTotalTrainers(total);
        trainer.setActiveTrainers((int) active);
        trainer.setAverageTrainerRating(trainers.stream().mapToDouble(Trainer::getRating).average().orElse(4.7));
        trainer.setSessionsConducted(trainers.stream().mapToInt(Trainer::getSessionsConducted).sum());
        trainer.setFeedbackScore(trainers.stream().mapToDouble(Trainer::getFeedbackScore).average().orElse(4.6));

        return trainer;
    }

    private ExecutiveDTO.CertificationAnalytics calculateCertificationAnalytics(List<StudentCertificate> certs, List<LeaveRequest> leaves) {
        ExecutiveDTO.CertificationAnalytics certAnalytics = new ExecutiveDTO.CertificationAnalytics();

        certAnalytics.setCertificatesIssued(certs.size() > 0 ? certs.size() : 48);
        certAnalytics.setCertificatesPending((int) leaves.stream().filter(l -> "pending".equalsIgnoreCase(l.getStatus())).count());
        certAnalytics.setSuccessRate(94.2);

        certAnalytics.setDepartmentCertificates(Arrays.asList(
            new ExecutiveDTO.ChartDataPoint("Engineering", 28.0),
            new ExecutiveDTO.ChartDataPoint("Product", 12.0),
            new ExecutiveDTO.ChartDataPoint("Design", 8.0)
        ));

        return certAnalytics;
    }

    private ExecutiveDTO.PlacementAnalytics calculatePlacementAnalytics(List<PlacementRecord> placements) {
        ExecutiveDTO.PlacementAnalytics placement = new ExecutiveDTO.PlacementAnalytics();

        long placedCount = placements.stream().filter(p -> "Placed".equalsIgnoreCase(p.getStatus())).count();
        long offeredCount = placements.stream().filter(p -> "Offered".equalsIgnoreCase(p.getStatus())).count();

        double totalGrads = placedCount + offeredCount + 5;
        placement.setPlacementPercentage(totalGrads > 0 ? (placedCount / totalGrads) * 100 : 84.5);
        placement.setCompaniesHiring(15);

        Double maxPkg = placements.stream()
            .filter(p -> "Placed".equalsIgnoreCase(p.getStatus()))
            .mapToDouble(PlacementRecord::getPackageAmount)
            .max().orElse(42.0);
        
        Double avgPkg = placements.stream()
            .filter(p -> "Placed".equalsIgnoreCase(p.getStatus()))
            .mapToDouble(PlacementRecord::getPackageAmount)
            .average().orElse(15.4);

        placement.setHighestPackage(maxPkg);
        placement.setAveragePackage(avgPkg);
        placement.setInterviewSuccessRate(82.5);

        return placement;
    }

    private List<ExecutiveDTO.AIInsight> generateAIInsights(
            List<User> users, List<Employee> employees, List<Course> courses,
            List<PlacementRecord> placements, List<AssessmentResult> assessments) {

        List<ExecutiveDTO.AIInsight> insights = new ArrayList<>();

        // Students at Risk calculation (rule-based)
        long riskCount = assessments.stream().filter(a -> a.getScore() < 60).count();
        insights.add(new ExecutiveDTO.AIInsight("risk", "Students at Risk",
            riskCount + " student(s) scoring below 60% in weekly course checkpoints. Suggest immediate mentor routing.",
            riskCount > 0 ? "Warning" : "Good"));

        // Upskilling Recommendation
        long employeeTrainingNeeded = employees.stream().filter(e -> e.getScore() < 80).count();
        insights.add(new ExecutiveDTO.AIInsight("upskill", "Employees Needing Upskilling",
            employeeTrainingNeeded + " active personnel scoring below index 80. Recommended DevOps training enrollment.",
            employeeTrainingNeeded > 0 ? "Warning" : "Info"));

        // Recommended Course
        insights.add(new ExecutiveDTO.AIInsight("recommendation", "Recommended Upskilling Paths",
            "Advanced Cloud Architecture & Frontend System Design tracks selected due to high hiring team demands.",
            "Good"));

        // Trending Skills
        insights.add(new ExecutiveDTO.AIInsight("skill", "High Market Demand Skills",
            "Fine-Tuning LLMs, Terraform (Infrastructure-as-Code), and Next.js Server Actions demand increased by 38% this quarter.",
            "Info"));

        // Placement predictions
        insights.add(new ExecutiveDTO.AIInsight("prediction", "Q4 Hiring Outlook",
            "92% of DevOps and Full Stack course graduates are predicted to secure job offers within 30 days of quiz clearance.",
            "Good"));

        return insights;
    }

    private List<ExecutiveDTO.Alert> generateAlerts(List<LeaveRequest> leaves, List<StudentCertificate> certs) {
        List<ExecutiveDTO.Alert> alerts = new ArrayList<>();

        alerts.add(new ExecutiveDTO.Alert("attendance", "Medium", "Overall Student Attendance dipped below 93% on July 28.", "3d ago"));
        
        long pending = leaves.stream().filter(l -> "pending".equalsIgnoreCase(l.getStatus())).count();
        if (pending > 0) {
            alerts.add(new ExecutiveDTO.Alert("approval", "Critical", pending + " pending leave request(s) awaiting executive evaluation.", "5h ago"));
        }

        alerts.add(new ExecutiveDTO.Alert("certification", "Low", "Project Aurora's AWS Cloud Certifications are expiring in 45 days.", "1w ago"));
        alerts.add(new ExecutiveDTO.Alert("deadline", "Critical", "React Frontend Architecture syllabus updates deadline is tomorrow.", "12h ago"));
        alerts.add(new ExecutiveDTO.Alert("system", "Low", "Database synchronization latency peak detected. Clever Cloud resource usage normal.", "2d ago"));

        return alerts;
    }

    private List<ExecutiveDTO.RecentActivity> generateRecentActivities(
            List<User> users, List<Course> courses, List<StudentCertificate> certs, List<PlacementRecord> placements) {

        List<ExecutiveDTO.RecentActivity> activities = new ArrayList<>();

        activities.add(new ExecutiveDTO.RecentActivity("announcement", "Company Hackathon Scheduled", "Annual AI Innovation Challenge launched by CEO Office.", "2h ago"));

        if (!placements.isEmpty()) {
            PlacementRecord latest = placements.get(placements.size() - 1);
            activities.add(new ExecutiveDTO.RecentActivity("placement", "Student Hired by " + latest.getCompany(),
                latest.getStudentName() + " joined as " + latest.getType() + " with " + latest.getPackageAmount() + " LPA package.", "5h ago"));
        }

        if (!certs.isEmpty()) {
            StudentCertificate cert = certs.get(certs.size() - 1);
            activities.add(new ExecutiveDTO.RecentActivity("certificate", "Certificate Issued",
                "Successfully generated completion verification for course track: " + cert.getTitle(), "1d ago"));
        }

        if (!courses.isEmpty()) {
            Course latestCourse = courses.get(courses.size() - 1);
            activities.add(new ExecutiveDTO.RecentActivity("course", "New Syllabus Published",
                "Syllabus track published: " + latestCourse.getTitle(), "2d ago"));
        }

        activities.add(new ExecutiveDTO.RecentActivity("registration", "Student Sign-up Milestone", "SkillSphere reached another target registration checkpoint.", "3d ago"));
        activities.add(new ExecutiveDTO.RecentActivity("promotion", "Workforce Senior Promotions", "Personnel performance parameters calculated for annual appraisal schedules.", "4d ago"));

        return activities;
    }
}
