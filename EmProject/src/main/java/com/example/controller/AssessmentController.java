package com.example.controller;

import com.example.model.Assessment;
import com.example.services.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "*")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitAssessment(@RequestBody Assessment assessment) {
        try {
            Assessment savedAssessment = assessmentService.saveAssessment(assessment);
            return ResponseEntity.ok(savedAssessment);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to submit assessment.");
        }
    }

    @GetMapping("/history/{email}")
    public ResponseEntity<List<Assessment>> getAssessmentHistory(@PathVariable String email) {
        List<Assessment> history = assessmentService.getAssessmentsByEmail(email);
        return ResponseEntity.ok(history);
    }
}
