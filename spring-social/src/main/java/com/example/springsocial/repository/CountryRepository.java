package com.example.springsocial.repository;


import com.example.springsocial.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories("com.example.spring-social.src.java.repository")
public interface CountryRepository extends JpaRepository<Country, Long> {
    List<Country> findByUserId(Long userId);
}
