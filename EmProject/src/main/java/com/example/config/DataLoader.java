package com.example.config;

import com.example.model.Video;
import com.example.repository.VideoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final VideoRepository videoRepository;

    public DataLoader(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @Override
    public void run(String... args) {
        if (videoRepository.count() == 0) { // Load only if DB is empty
            List<Video> videos = List.of(
                new Video(),
                new Video(),
                new Video()
            );
            videoRepository.saveAll(videos);
            System.out.println("Sample videos inserted!");
        }
    }
}
