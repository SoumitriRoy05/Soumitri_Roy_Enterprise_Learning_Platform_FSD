package com.skillsphere.backend.dto;

import java.util.List;

public class ExecutiveResponse {
    private boolean success;
    private String message;
    private List<ExecutiveDTO.KPI> kpis;
    private ExecutiveDTO.LearningAnalytics learning;
    private ExecutiveDTO.StudentAnalytics student;
    private ExecutiveDTO.WorkforceAnalytics workforce;
    private ExecutiveDTO.CourseAnalytics course;
    private ExecutiveDTO.TrainerAnalytics trainer;
    private ExecutiveDTO.CertificationAnalytics certification;
    private ExecutiveDTO.PlacementAnalytics placement;
    private List<ExecutiveDTO.AIInsight> aiInsights;
    private List<ExecutiveDTO.Alert> alerts;
    private List<ExecutiveDTO.RecentActivity> activities;

    public ExecutiveResponse() {}

    public ExecutiveResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public List<ExecutiveDTO.KPI> getKpis() { return kpis; }
    public void setKpis(List<ExecutiveDTO.KPI> kpis) { this.kpis = kpis; }
    public ExecutiveDTO.LearningAnalytics getLearning() { return learning; }
    public void setLearning(ExecutiveDTO.LearningAnalytics learning) { this.learning = learning; }
    public ExecutiveDTO.StudentAnalytics getStudent() { return student; }
    public void setStudent(ExecutiveDTO.StudentAnalytics student) { this.student = student; }
    public ExecutiveDTO.WorkforceAnalytics getWorkforce() { return workforce; }
    public void setWorkforce(ExecutiveDTO.WorkforceAnalytics workforce) { this.workforce = workforce; }
    public ExecutiveDTO.CourseAnalytics getCourse() { return course; }
    public void setCourse(ExecutiveDTO.CourseAnalytics course) { this.course = course; }
    public ExecutiveDTO.TrainerAnalytics getTrainer() { return trainer; }
    public void setTrainer(ExecutiveDTO.TrainerAnalytics trainer) { this.trainer = trainer; }
    public ExecutiveDTO.CertificationAnalytics getCertification() { return certification; }
    public void setCertification(ExecutiveDTO.CertificationAnalytics certification) { this.certification = certification; }
    public ExecutiveDTO.PlacementAnalytics getPlacement() { return placement; }
    public void setPlacement(ExecutiveDTO.PlacementAnalytics placement) { this.placement = placement; }
    public List<ExecutiveDTO.AIInsight> getAiInsights() { return aiInsights; }
    public void setAiInsights(List<ExecutiveDTO.AIInsight> aiInsights) { this.aiInsights = aiInsights; }
    public List<ExecutiveDTO.Alert> getAlerts() { return alerts; }
    public void setAlerts(List<ExecutiveDTO.Alert> alerts) { this.alerts = alerts; }
    public List<ExecutiveDTO.RecentActivity> getActivities() { return activities; }
    public void setActivities(List<ExecutiveDTO.RecentActivity> activities) { this.activities = activities; }
}
