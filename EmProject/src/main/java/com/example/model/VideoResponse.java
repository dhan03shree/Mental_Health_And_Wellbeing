package com.example.model;

import java.util.List;

public class VideoResponse {
    private List<Video> videos;

    // Constructors
    public VideoResponse() {
    }

    public VideoResponse(List<Video> videos) {
        this.videos = videos;
    }

    // Getters and Setters
    public List<Video> getVideos() {
        return videos;
    }

    public void setVideos(List<Video> videos) {
        this.videos = videos;
    }
}
