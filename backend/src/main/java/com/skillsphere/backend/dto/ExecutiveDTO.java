package com.skillsphere.backend.dto;

import java.util.List;
import java.util.Map;

public class ExecutiveDTO {

    public static class KPI {
        private String title;
        private String value;
        private Double percentageChange;
        private boolean isIncrease;
        private List<Integer> sparkline;
        private String color;
        private String icon;

        public KPI() {}

        public KPI(String title, String value, Double percentageChange, boolean isIncrease, List<Integer> sparkline, String color, String icon) {
            this.title = title;
            this.value = value;
            this.percentageChange = percentageChange;
            this.isIncrease = isIncrease;
            this.sparkline = sparkline;
            this.color = color;
            this.icon = icon;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getValue() { return value; }
        public void setValue(String value) { this.value = value; }
        public Double getPercentageChange() { return percentageChange; }
        public void setPercentageChange(Double percentageChange) { this.percentageChange = percentageChange; }
        public boolean getIsIncrease() { return isIncrease; }
        public void setIsIncrease(boolean isIncrease) { this.isIncrease = isIncrease; }
        public List<Integer> getSparkline() { return sparkline; }
        public void setSparkline(List<Integer> sparkline) { this.sparkline = sparkline; }
        public String getColor() { return color; }
        public void setColor(String color) { this.color = color; }
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
    }

    public static class ChartDataPoint {
        private String name;
        private Double value;

        public ChartDataPoint() {}
        public ChartDataPoint(String name, Double value) {
            this.name = name;
            this.value = value;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Double getValue() { return value; }
        public void setValue(Double value) { this.value = value; }
    }

    public static class LearningAnalytics {
        private List<ChartDataPoint> enrollments;
        private List<ChartDataPoint> completions;
        private List<ChartDataPoint> learningHours;
        private List<ChartDataPoint> categoryDistribution;
        private List<ChartDataPoint> topCourses;

        public LearningAnalytics() {}

        public List<ChartDataPoint> getEnrollments() { return enrollments; }
        public void setEnrollments(List<ChartDataPoint> enrollments) { this.enrollments = enrollments; }
        public List<ChartDataPoint> getCompletions() { return completions; }
        public void setCompletions(List<ChartDataPoint> completions) { this.completions = completions; }
        public List<ChartDataPoint> getLearningHours() { return learningHours; }
        public void setLearningHours(List<ChartDataPoint> learningHours) { this.learningHours = learningHours; }
        public List<ChartDataPoint> getCategoryDistribution() { return categoryDistribution; }
        public void setCategoryDistribution(List<ChartDataPoint> categoryDistribution) { this.categoryDistribution = categoryDistribution; }
        public List<ChartDataPoint> getTopCourses() { return topCourses; }
        public void setTopCourses(List<ChartDataPoint> topCourses) { this.topCourses = topCourses; }
    }

    public static class StudentAnalytics {
        private int activeStudents;
        private int newRegistrations;
        private double attendanceRate;
        private double assignmentSubmissionRate;
        private double avgAssessmentScore;
        private int placementReadyStudents;
        private int studentsPlaced;
        private int internshipCompletionCount;
        private List<ChartDataPoint> growth;
        private List<ChartDataPoint> placementTrend;
        private List<ChartDataPoint> attendanceTrend;

        public StudentAnalytics() {}

        public int getActiveStudents() { return activeStudents; }
        public void setActiveStudents(int activeStudents) { this.activeStudents = activeStudents; }
        public int getNewRegistrations() { return newRegistrations; }
        public void setNewRegistrations(int newRegistrations) { this.newRegistrations = newRegistrations; }
        public double getAttendanceRate() { return attendanceRate; }
        public void setAttendanceRate(double attendanceRate) { this.attendanceRate = attendanceRate; }
        public double getAssignmentSubmissionRate() { return assignmentSubmissionRate; }
        public void setAssignmentSubmissionRate(double assignmentSubmissionRate) { this.assignmentSubmissionRate = assignmentSubmissionRate; }
        public double getAvgAssessmentScore() { return avgAssessmentScore; }
        public void setAvgAssessmentScore(double avgAssessmentScore) { this.avgAssessmentScore = avgAssessmentScore; }
        public int getPlacementReadyStudents() { return placementReadyStudents; }
        public void setPlacementReadyStudents(int placementReadyStudents) { this.placementReadyStudents = placementReadyStudents; }
        public int getStudentsPlaced() { return studentsPlaced; }
        public void setStudentsPlaced(int studentsPlaced) { this.studentsPlaced = studentsPlaced; }
        public int getInternshipCompletionCount() { return internshipCompletionCount; }
        public void setInternshipCompletionCount(int internshipCompletionCount) { this.internshipCompletionCount = internshipCompletionCount; }
        public List<ChartDataPoint> getGrowth() { return growth; }
        public void setGrowth(List<ChartDataPoint> growth) { this.growth = growth; }
        public List<ChartDataPoint> getPlacementTrend() { return placementTrend; }
        public void setPlacementTrend(List<ChartDataPoint> placementTrend) { this.placementTrend = placementTrend; }
        public List<ChartDataPoint> getAttendanceTrend() { return attendanceTrend; }
        public void setAttendanceTrend(List<ChartDataPoint> attendanceTrend) { this.attendanceTrend = attendanceTrend; }
    }

    public static class WorkforceAnalytics {
        private int totalEmployees;
        private int employeesInTraining;
        private int completedTraining;
        private double averagePerformanceScore;
        private double trainingCompletionRate;
        private List<ChartDataPoint> departmentWorkforce;
        private List<ChartDataPoint> skillMatrix;
        private List<ChartDataPoint> trainingTrend;

        public WorkforceAnalytics() {}

        public int getTotalEmployees() { return totalEmployees; }
        public void setTotalEmployees(int totalEmployees) { this.totalEmployees = totalEmployees; }
        public int getEmployeesInTraining() { return employeesInTraining; }
        public void setEmployeesInTraining(int employeesInTraining) { this.employeesInTraining = employeesInTraining; }
        public int getCompletedTraining() { return completedTraining; }
        public void setCompletedTraining(int completedTraining) { this.completedTraining = completedTraining; }
        public double getAveragePerformanceScore() { return averagePerformanceScore; }
        public void setAveragePerformanceScore(double averagePerformanceScore) { this.averagePerformanceScore = averagePerformanceScore; }
        public double getTrainingCompletionRate() { return trainingCompletionRate; }
        public void setTrainingCompletionRate(double trainingCompletionRate) { this.trainingCompletionRate = trainingCompletionRate; }
        public List<ChartDataPoint> getDepartmentWorkforce() { return departmentWorkforce; }
        public void setDepartmentWorkforce(List<ChartDataPoint> departmentWorkforce) { this.departmentWorkforce = departmentWorkforce; }
        public List<ChartDataPoint> getSkillMatrix() { return skillMatrix; }
        public void setSkillMatrix(List<ChartDataPoint> skillMatrix) { this.skillMatrix = skillMatrix; }
        public List<ChartDataPoint> getTrainingTrend() { return trainingTrend; }
        public void setTrainingTrend(List<ChartDataPoint> trainingTrend) { this.trainingTrend = trainingTrend; }
    }

    public static class CourseAnalytics {
        private List<Map<String, Object>> popularCourses;
        private List<Map<String, Object>> leastPopularCourses;
        private double averageRating;
        private double completionRate;

        public CourseAnalytics() {}

        public List<Map<String, Object>> getPopularCourses() { return popularCourses; }
        public void setPopularCourses(List<Map<String, Object>> popularCourses) { this.popularCourses = popularCourses; }
        public List<Map<String, Object>> getLeastPopularCourses() { return leastPopularCourses; }
        public void setLeastPopularCourses(List<Map<String, Object>> leastPopularCourses) { this.leastPopularCourses = leastPopularCourses; }
        public double getAverageRating() { return averageRating; }
        public void setAverageRating(double averageRating) { this.averageRating = averageRating; }
        public double getCompletionRate() { return completionRate; }
        public void setCompletionRate(double completionRate) { this.completionRate = completionRate; }
    }

    public static class TrainerAnalytics {
        private int totalTrainers;
        private int activeTrainers;
        private double averageTrainerRating;
        private int sessionsConducted;
        private double feedbackScore;

        public TrainerAnalytics() {}

        public int getTotalTrainers() { return totalTrainers; }
        public void setTotalTrainers(int totalTrainers) { this.totalTrainers = totalTrainers; }
        public int getActiveTrainers() { return activeTrainers; }
        public void setActiveTrainers(int activeTrainers) { this.activeTrainers = activeTrainers; }
        public double getAverageTrainerRating() { return averageTrainerRating; }
        public void setAverageTrainerRating(double averageTrainerRating) { this.averageTrainerRating = averageTrainerRating; }
        public int getSessionsConducted() { return sessionsConducted; }
        public void setSessionsConducted(int sessionsConducted) { this.sessionsConducted = sessionsConducted; }
        public double getFeedbackScore() { return feedbackScore; }
        public void setFeedbackScore(double feedbackScore) { this.feedbackScore = feedbackScore; }
    }

    public static class CertificationAnalytics {
        private int certificatesIssued;
        private int certificatesPending;
        private double successRate;
        private List<ChartDataPoint> departmentCertificates;

        public CertificationAnalytics() {}

        public int getCertificatesIssued() { return certificatesIssued; }
        public void setCertificatesIssued(int certificatesIssued) { this.certificatesIssued = certificatesIssued; }
        public int getCertificatesPending() { return certificatesPending; }
        public void setCertificatesPending(int certificatesPending) { this.certificatesPending = certificatesPending; }
        public double getSuccessRate() { return successRate; }
        public void setSuccessRate(double successRate) { this.successRate = successRate; }
        public List<ChartDataPoint> getDepartmentCertificates() { return departmentCertificates; }
        public void setDepartmentCertificates(List<ChartDataPoint> departmentCertificates) { this.departmentCertificates = departmentCertificates; }
    }

    public static class PlacementAnalytics {
        private double placementPercentage;
        private int companiesHiring;
        private double highestPackage;
        private double averagePackage;
        private double interviewSuccessRate;

        public PlacementAnalytics() {}

        public double getPlacementPercentage() { return placementPercentage; }
        public void setPlacementPercentage(double placementPercentage) { this.placementPercentage = placementPercentage; }
        public int getCompaniesHiring() { return companiesHiring; }
        public void setCompaniesHiring(int companiesHiring) { this.companiesHiring = companiesHiring; }
        public double getHighestPackage() { return highestPackage; }
        public void setHighestPackage(double highestPackage) { this.highestPackage = highestPackage; }
        public double getAveragePackage() { return averagePackage; }
        public void setAveragePackage(double averagePackage) { this.averagePackage = averagePackage; }
        public double getInterviewSuccessRate() { return interviewSuccessRate; }
        public void setInterviewSuccessRate(double interviewSuccessRate) { this.interviewSuccessRate = interviewSuccessRate; }
    }

    public static class AIInsight {
        private String type; // risk, upskill, recommendation, skill, prediction
        private String title;
        private String description;
        private String status; // Warning, Info, Good

        public AIInsight() {}
        public AIInsight(String type, String title, String description, String status) {
            this.type = type;
            this.title = title;
            this.description = description;
            this.status = status;
        }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    public static class Alert {
        private String type; // attendance, approval, certification, deadline, system
        private String severity; // Low, Medium, Critical
        private String message;
        private String timeAgo;

        public Alert() {}
        public Alert(String type, String severity, String message, String timeAgo) {
            this.type = type;
            this.severity = severity;
            this.message = message;
            this.timeAgo = timeAgo;
        }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getTimeAgo() { return timeAgo; }
        public void setTimeAgo(String timeAgo) { this.timeAgo = timeAgo; }
    }

    public static class RecentActivity {
        private String type; // registration, course, certificate, placement, promotion, announcement
        private String title;
        private String detail;
        private String timeAgo;

        public RecentActivity() {}
        public RecentActivity(String type, String title, String detail, String timeAgo) {
            this.type = type;
            this.title = title;
            this.detail = detail;
            this.timeAgo = timeAgo;
        }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDetail() { return detail; }
        public void setDetail(String detail) { this.detail = detail; }
        public String getTimeAgo() { return timeAgo; }
        public void setTimeAgo(String timeAgo) { this.timeAgo = timeAgo; }
    }
}
