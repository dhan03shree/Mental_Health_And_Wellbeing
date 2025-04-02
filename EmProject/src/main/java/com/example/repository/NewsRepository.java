package com.example.repository;

import com.example.model.News;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NewsRepository extends MongoRepository<News, String> {
    List<News> findByCategoryIgnoreCase(String category);
}
