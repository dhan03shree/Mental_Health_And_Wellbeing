package com.example.controller;

import com.example.model.Mood;
import com.example.repository.MoodRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mood")
public class MoodController {

    private final MoodRepository moodRepository;

    public MoodController(MoodRepository moodRepository) {
        this.moodRepository = moodRepository;
    }

    // Save mood entry
    @PostMapping
    public ResponseEntity<Mood> saveMood(@RequestBody Mood mood) {
        System.out.println("Received Mood Data: " + mood); // Debugging Log
        Mood savedMood = moodRepository.save(mood);
        System.out.println("Mood saved successfully with ID: " + savedMood.getId());
        return ResponseEntity.ok(savedMood);
    }

    // Fetch mood history for a user
    @GetMapping("/{userId}")
    public ResponseEntity<List<Mood>> getMoodHistory(@PathVariable String userId) {
        List<Mood> moodHistory = moodRepository.findByUserIdOrderByTimestampDesc(userId);
        System.out.println("Fetched Mood History for user: " + userId);
        return ResponseEntity.ok(moodHistory);
    }
}
