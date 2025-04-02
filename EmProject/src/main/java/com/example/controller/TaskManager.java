package com.example.controller;

import com.example.model.Task;
import com.example.model.TaskPriority;
import com.example.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskManager {

    private final TaskService taskService;

    public TaskManager(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> createTask(@RequestBody Task task) {
        System.out.println("Received POST request to /api/tasks with body: " + task);
        Task savedTask = taskService.createTask(task);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Task created successfully!");
        response.put("taskId", savedTask.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> updateTask(@PathVariable String id, @RequestBody Task task) {
        System.out.println("Received PUT request to /api/tasks/" + id + " with body: " + task);
        Task updatedTask = taskService.updateTask(id, task);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Task updated successfully!");
        response.put("taskId", updatedTask.getId());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Task deleted successfully!");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getTasksByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(taskService.getTasksByUserId(userId));
    }

    @GetMapping("/user/{userId}/priority/{priority}")
    public ResponseEntity<List<Task>> getTasksByPriority(@PathVariable String userId, @PathVariable TaskPriority priority) {
        return ResponseEntity.ok(taskService.getTasksByUserAndPriority(userId, priority));
    }
    
    @GetMapping("/user/{userId}/high-priority")
    public ResponseEntity<List<Task>> getHighPriorityTasks(@PathVariable String userId) {
        return ResponseEntity.ok(taskService.getHighPriorityTasks(userId));
    }
}
