package com.example.services;

import com.example.model.News;
import com.example.model.NewsResponse;
import com.example.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class NewsService {

    private final WebClient webClient;
    private final NewsRepository newsRepository;

    @Value("79c236f8b640477ea53e19d2572ef0ba") // Inject API Key from application.properties
    private String apiKey;

    public NewsService(WebClient.Builder webClientBuilder, NewsRepository newsRepository) {
        this.webClient = webClientBuilder.baseUrl("https://newsapi.org/v2").build();
        this.newsRepository = newsRepository;
    }

    public Mono<List<News>> fetchNews(String category) {
        String url = String.format("/everything?q=%s&apiKey=%s", category, apiKey);

        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(NewsResponse.class)
                .map(NewsResponse::getArticles)
                .doOnNext(newsRepository::saveAll)
                .onErrorResume(error -> {
                    System.err.println("Error fetching news: " + error.getMessage());
                    return Mono.just(List.of());
                });
    }

    // ✅ New Method: Fetch and Save News
    public Mono<List<News>> fetchAndSaveNews(String category) {
        return fetchNews(category).doOnNext(newsRepository::saveAll);
    }
}
