package com.example.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@RestController
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:3000") // ✅ Allow React frontend
public class ChatbotController {

    private static final String GEMINI_API_KEY = "AIzaSyCDdWkQDtA92EFEn5PqZxqWcJXoPyOqyuQ";  
    private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + GEMINI_API_KEY;

    private static final Map<String, String> appFeatures = new HashMap<>();

    static {
        appFeatures.put("mental health", "Our app provides mental health support through mood tracking, AI-driven recommendations, and professional resources.");
        appFeatures.put("SOS help", "Our SOS Help System allows users to quickly contact emergency services and trusted contacts in critical situations.");
        appFeatures.put("mood tracker", "The mood tracker helps users log their emotions daily, providing insights into mental health patterns.");
        appFeatures.put("chatbot", "Our chatbot assists with mental health guidance, answering questions about stress, anxiety, and well-being.");
        appFeatures.put("video recommendation", "Based on your mood and mental state, the app suggests helpful videos, including guided meditations and expert advice.");
        appFeatures.put("news updates", "Stay informed with the latest mental health news through our integrated News API.");
        appFeatures.put("task management", "Manage daily tasks and set reminders to enhance productivity and mental wellness.");
    }

    @PostMapping("/send")
    public Map<String, String> sendMessage(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message").toLowerCase();
        System.out.println("✅ Received message: " + userMessage);

        // Check if the message matches any predefined feature
        for (Map.Entry<String, String> entry : appFeatures.entrySet()) {
            if (userMessage.contains(entry.getKey())) {
                return Collections.singletonMap("response", "🤖 " + entry.getValue());
            }
        }

        // Call Gemini API for other queries
        String botResponse = callGeminiAPI(userMessage);

        Map<String, String> response = new HashMap<>();
        response.put("response", botResponse);
        return response;
    }

    @SuppressWarnings("null")
    private String callGeminiAPI(String userMessage) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String prompt = "You are a chatbot for a mental health app. Provide helpful, informative, and encouraging responses.\n"
                      + "User: " + userMessage + "\nBot:";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(
            Map.of("parts", List.of(Map.of("text", prompt)))
        ));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            @SuppressWarnings("rawtypes")
            ResponseEntity<Map> response = restTemplate.exchange(GEMINI_URL, HttpMethod.POST, entity, Map.class);

            if (response.getBody() != null && response.getBody().containsKey("candidates")) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
                if (!candidates.isEmpty() && candidates.get(0).containsKey("content")) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                    @SuppressWarnings("unchecked")
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (!parts.isEmpty() && parts.get(0).containsKey("text")) {
                        return parts.get(0).get("text").toString();
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("❌ Error calling Gemini API: " + e.getMessage());
            return "⚠ Sorry, I'm experiencing technical difficulties. Try again later.";
        }

        return "⚠ Sorry, I couldn't generate a response.";
    }
}
