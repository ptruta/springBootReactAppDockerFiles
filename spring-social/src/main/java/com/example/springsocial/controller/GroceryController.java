package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Grocery;
import com.example.springsocial.model.User;
import com.example.springsocial.payload.AuthResponse;
import com.example.springsocial.repository.GroceryRepository;
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
import java.util.Optional;

@RestController
public class GroceryController {

    @Autowired
    private GroceryRepository groceryRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/groceries")
    @PreAuthorize("hasRole('USER')")
    @Transactional
    public List<Grocery> getGroceriesForUser(@CurrentUser final UserPrincipal userPrincipal) {
        return groceryRepository.findByUserId(userPrincipal.getId());
    }

    @PostMapping("/addGrocery")
    @PreAuthorize("hasRole('USER')")
    @Transactional
    public Grocery addNewGrocery(@CurrentUser final UserPrincipal userPrincipal, @Valid @RequestBody final Grocery grocery) {
        System.out.println(grocery);
        final User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        grocery.setUser(user);
        return groceryRepository.save(grocery);
    }

    @PostMapping("/deleteGrocery/{groceryId}")
    @PreAuthorize("hasRole('USER')")
    @Transactional
    public ResponseEntity<?> deleteGrocery(@CurrentUser final UserPrincipal userPrincipal, @PathVariable(name = "groceryId") String groceryId) {
        System.out.println(groceryId);
        final long id = Long.parseLong(groceryId);
        final Grocery grocery = groceryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Grocery", "id", groceryId));
        groceryRepository.deleteById(id);
        return new ResponseEntity<>(grocery, HttpStatus.OK);
    }

}
