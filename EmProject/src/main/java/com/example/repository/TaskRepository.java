package com.example.repository;

import com.example.model.Task;
import com.example.model.TaskPriority;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByUserId(String userId);
    List<Task> findByUserIdAndPriority(String userId, TaskPriority priority);
}
