package com.example.services;

import com.example.model.Video;
import com.example.model.VideoResponse;
import com.example.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class VideoService {

    private final WebClient webClient;
    private final VideoRepository videoRepository;

    @Value("$AIzaSyD2iTCXK59lIscWvWQetd0RqJqVY_Ncx-U")
    private String apiKey;

    public VideoService(WebClient.Builder webClientBuilder, VideoRepository videoRepository) {
        this.webClient = webClientBuilder.baseUrl("https://www.googleapis.com/youtube/v3").build();
        this.videoRepository = videoRepository;
    }

    public Mono<VideoResponse> fetchVideos(String query) {
        String url = String.format("/search?part=snippet&type=video&maxResults=10&q=%s&key=%s", query, apiKey);

        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(Map.class)
                .map(this::mapToVideoResponse)
                .flatMap(response -> {
                    if (!response.getVideos().isEmpty()) {
                        videoRepository.saveAll(response.getVideos());  // Save videos
                    }
                    return Mono.just(response);
                })
                .onErrorResume(error -> {
                    error.printStackTrace();
                    return Mono.just(new VideoResponse()); // Return empty response on error
                });
    }

    @SuppressWarnings("unused")
    private VideoResponse mapToVideoResponse(Map<String, Object> response) {
        if (response == null || !response.containsKey("items")) {
            return new VideoResponse();  // Prevent NullPointerException
        }

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) response.get("items");

        List<Video> videos = items.stream().map(item -> {
            try {
                @SuppressWarnings("unchecked")
                Map<String, Object> id = (Map<String, Object>) item.get("id");
                @SuppressWarnings("unchecked")
                Map<String, Object> snippet = (Map<String, Object>) item.get("snippet");
                @SuppressWarnings("unchecked")
                Map<String, Object> thumbnails = (Map<String, Object>) snippet.get("thumbnails");
                @SuppressWarnings("unchecked")
                Map<String, Object> defaultThumbnail = (Map<String, Object>) thumbnails.get("default");

                String videoId = (String) id.get("videoId");
                String title = (String) snippet.get("title");
                String description = (String) snippet.get("description");
                String thumbnailUrl = (String) defaultThumbnail.get("url");

                return new Video();
            } catch (Exception e) {
                return null;
            }
        }).filter(video -> video != null).collect(Collectors.toList());

        return new VideoResponse(videos);
    }
}
