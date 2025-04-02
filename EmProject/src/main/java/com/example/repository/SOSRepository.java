package com.example.repository;

import com.example.model.SOS;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SOSRepository extends MongoRepository<SOS, String> {
    List<SOS> findByPhoneNumber(String phoneNumber);
}
