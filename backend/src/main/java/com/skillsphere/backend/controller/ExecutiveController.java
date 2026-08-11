package com.skillsphere.backend.controller;

import com.skillsphere.backend.dto.ExecutiveResponse;
import com.skillsphere.backend.service.ExecutiveService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/executive")
public class ExecutiveController {

    private final ExecutiveService executiveService;

    public ExecutiveController(ExecutiveService executiveService) {
        this.executiveService = executiveService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ExecutiveResponse> getDashboardData() {
        return ResponseEntity.ok(executiveService.getDashboardDetails());
    }

    @GetMapping("/reports/export")
    public ResponseEntity<byte[]> exportReport(
            @RequestParam("type") String type,
            @RequestParam("format") String format) {

        StringBuilder csvContent = new StringBuilder();

        if ("learning".equalsIgnoreCase(type)) {
            csvContent.append("Month,Enrollments,Completions,Learning Hours\n");
            csvContent.append("January,45,20,450\n");
            csvContent.append("February,62,35,680\n");
            csvContent.append("March,85,48,920\n");
            csvContent.append("April,120,72,1340\n");
            csvContent.append("May,145,95,1680\n");
            csvContent.append("June,190,130,2100\n");
        } else if ("student".equalsIgnoreCase(type)) {
            csvContent.append("Metric,Value,Status\n");
            csvContent.append("Active Students,295,Active\n");
            csvContent.append("New Registrations,44,Active\n");
            csvContent.append("Average Attendance,94.8%,Normal\n");
            csvContent.append("Assignment Submissions,89.2%,Healthy\n");
            csvContent.append("Assessment Avg Score,84.5%,Healthy\n");
        } else if ("workforce".equalsIgnoreCase(type)) {
            csvContent.append("Department,Employees,Average Rating,Training Completed\n");
            csvContent.append("Engineering,15,92%,12\n");
            csvContent.append("Design,8,88%,5\n");
            csvContent.append("Product,6,87%,3\n");
        } else if ("placement".equalsIgnoreCase(type)) {
            csvContent.append("Student Name,Student Email,Company,Package,Status,Interview Score\n");
            csvContent.append("S Roy,sroy@gmail.com,Microsoft,24.5 LPA,Placed,4.8\n");
            csvContent.append("Student Demo,student@skillsphere.com,Google,32.0 LPA,Placed,4.9\n");
            csvContent.append("Aditi Rao,aditi@company.com,Amazon,28.0 LPA,Placed,4.7\n");
            csvContent.append("Rahul Verma,rahul@company.com,Meta,35.0 LPA,Placed,4.8\n");
            csvContent.append("Priya Nair,priya.nair@gmail.com,Netflix,42.0 LPA,Offered,4.9\n");
        } else if ("certification".equalsIgnoreCase(type)) {
            csvContent.append("Department,Certificates Issued,Success Rate\n");
            csvContent.append("Engineering,28,95.4%\n");
            csvContent.append("Product,12,92.0%\n");
            csvContent.append("Design,8,89.5%\n");
        } else if ("course".equalsIgnoreCase(type)) {
            csvContent.append("Course Name,Rating,Price,Active Learners\n");
            csvContent.append("JavaScript Fundamentals,4.8,Free,240\n");
            csvContent.append("React.js Development,4.7,499 INR,210\n");
            csvContent.append("Python for Beginners,4.6,Free,185\n");
        } else {
            csvContent.append("No data available\n");
        }

        byte[] outputBytes = csvContent.toString().getBytes();
        String filename = type + "_report." + ("excel".equalsIgnoreCase(format) ? "xls" : ("pdf".equalsIgnoreCase(format) ? "pdf" : "csv"));
        MediaType mediaType = "excel".equalsIgnoreCase(format) ? MediaType.parseMediaType("application/vnd.ms-excel")
                            : ("pdf".equalsIgnoreCase(format) ? MediaType.APPLICATION_PDF : MediaType.parseMediaType("text/csv"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", filename);
        headers.setContentType(mediaType);

        return new ResponseEntity<>(outputBytes, headers, HttpStatus.OK);
    }
}
