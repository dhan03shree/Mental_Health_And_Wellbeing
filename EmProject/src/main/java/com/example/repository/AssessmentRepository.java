package com.example.repository;

import com.example.model.Assessment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AssessmentRepository extends MongoRepository<Assessment, String> {
    List<Assessment> findByEmail(String email);
}
