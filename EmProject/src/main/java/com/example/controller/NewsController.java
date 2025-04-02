package com.example.controller;

import com.example.model.News;
import com.example.services.NewsService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/{category}")
    public Mono<List<News>> getNewsByCategory(@PathVariable String category) {
        return newsService.fetchAndSaveNews(category);
    }
}
