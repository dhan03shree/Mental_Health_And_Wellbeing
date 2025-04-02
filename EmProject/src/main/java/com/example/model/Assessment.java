package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;

@Document(collection = "assessments")
public class Assessment {

    @Id
    private String id;
    private String email;  // Store user's email instead of username
    private Map<Integer, Integer> responses;
    private int totalScore;
    private String evaluation;
    private long timestamp;

    public Assessment() {}

    public Assessment(String email, Map<Integer, Integer> responses, int totalScore, String evaluation) {
        this.email = email;
        this.responses = responses;
        this.totalScore = totalScore;
        this.evaluation = evaluation;
        this.timestamp = System.currentTimeMillis();
    }

    public String getId() { return id; }
    public String getEmail() { return email; }
    public Map<Integer, Integer> getResponses() { return responses; }
    public int getTotalScore() { return totalScore; }
    public String getEvaluation() { return evaluation; }
    public long getTimestamp() { return timestamp; }
}
