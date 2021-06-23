package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Country;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.CountryRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class CountryController {
    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/countries")
    @PreAuthorize("hasRole('USER')")
    @Transactional
    public List<Country> getCountriesForUser(@CurrentUser final UserPrincipal userPrincipal) {
        return countryRepository.findByUserId(userPrincipal.getId());
    }

    @PostMapping("/addCountry")
    @PreAuthorize("hasRole('USER')")
    @Transactional
    public Country addNewCountry(@CurrentUser final UserPrincipal userPrincipal, @Valid @RequestBody final Country country) {
        System.out.println(country);
        final User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        country.setUser(user);
        country.setName(country.getName());
        return countryRepository.save(country);
    }

    @PostMapping("/deleteCountry/{countryId}")
    @PreAuthorize("hasRole('USER')")
    @Transactional
    public ResponseEntity<?> deleteCountry(@CurrentUser final UserPrincipal userPrincipal, @PathVariable(name = "countryId") String countryId) {
        System.out.println(countryId);
        final long id = Long.parseLong(countryId);
        final Country location = countryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Country", "id", countryId));
        countryRepository.deleteById(id);
        return new ResponseEntity<>(location, HttpStatus.OK);
    }

}
