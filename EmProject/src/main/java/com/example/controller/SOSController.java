package com.example.controller;

import com.example.model.SOS;
import com.example.services.SOSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
@RestController
@RequestMapping("/api/sos")
public class SOSController {

    @Autowired
    private SOSService sosService;

    @PostMapping("/save")
    public SOS saveSOS(@RequestBody SOS sos) {
        return sosService.saveSOS(sos);
    }

    @GetMapping("/history")
    public List<SOS> getSOSHistory(@RequestParam String phoneNumber) {
        return sosService.getSOSHistory(phoneNumber);
    }
}
