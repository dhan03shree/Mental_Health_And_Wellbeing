package com.example.services;

import com.example.model.SOS;
import com.example.repository.SOSRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class SOSService {

    @Autowired
    private SOSRepository sosRepository;

    public SOS saveSOS(SOS sos) {
        sos.setTimestamp(Instant.now().toString());  // Set current timestamp
        return sosRepository.save(sos);
    }

    public List<SOS> getSOSHistory(String phoneNumber) {
        return sosRepository.findByPhoneNumber(phoneNumber);
    }
}
