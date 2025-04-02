package com.example.repository;

import com.example.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface VideoRepository extends MongoRepository<Video, String> {
    
    // Find videos where the title contains the given keyword (case insensitive)
    List<Video> findByTitleContainingIgnoreCase(String title);
}
