package com.example.repository;

import com.example.model.Mood;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MoodRepository extends MongoRepository<Mood, String> {
    List<Mood> findByUserIdOrderByTimestampDesc(String userId); // Fetch moods sorted by latest
}
