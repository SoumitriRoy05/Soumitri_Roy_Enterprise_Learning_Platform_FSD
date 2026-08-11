package com.skillsphere.backend.repository;

import com.skillsphere.backend.model.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ExecutiveRepository {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EmployeeRepository employeeRepository;
    private final PlacementRecordRepository placementRecordRepository;
    private final TrainerRepository trainerRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final StudentCertificateRepository studentCertificateRepository;
    private final AssessmentResultRepository assessmentResultRepository;

    public ExecutiveRepository(
            UserRepository userRepository,
            CourseRepository courseRepository,
            EmployeeRepository employeeRepository,
            PlacementRecordRepository placementRecordRepository,
            TrainerRepository trainerRepository,
            LeaveRequestRepository leaveRequestRepository,
            StudentCertificateRepository studentCertificateRepository,
            AssessmentResultRepository assessmentResultRepository) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.employeeRepository = employeeRepository;
        this.placementRecordRepository = placementRecordRepository;
        this.trainerRepository = trainerRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.studentCertificateRepository = studentCertificateRepository;
        this.assessmentResultRepository = assessmentResultRepository;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public CourseRepository getCourseRepository() {
        return courseRepository;
    }

    public EmployeeRepository getEmployeeRepository() {
        return employeeRepository;
    }

    public PlacementRecordRepository getPlacementRecordRepository() {
        return placementRecordRepository;
    }

    public TrainerRepository getTrainerRepository() {
        return trainerRepository;
    }

    public LeaveRequestRepository getLeaveRequestRepository() {
        return leaveRequestRepository;
    }

    public StudentCertificateRepository getStudentCertificateRepository() {
        return studentCertificateRepository;
    }

    public AssessmentResultRepository getAssessmentResultRepository() {
        return assessmentResultRepository;
    }
}
