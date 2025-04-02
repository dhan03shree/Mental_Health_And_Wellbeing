package com.example.services;

import com.example.model.Mood;
import com.example.repository.MoodRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MoodService {
    private final MoodRepository moodRepository;

    public MoodService(MoodRepository moodRepository) {
        this.moodRepository = moodRepository;
    }

    public Mood saveMood(Mood mood) {
        return moodRepository.save(mood);
    }

    public List<Mood> getMoodsByUserId(String userId) {
        return moodRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    public void deleteMood(String id) {
        moodRepository.deleteById(id);
    }
}
