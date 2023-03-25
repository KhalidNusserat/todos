package com.atypon.todos.controllers;

import com.atypon.todos.security.SignupData;
import com.atypon.todos.services.security.TokensService;
import com.atypon.todos.services.security.UsersService;
import com.atypon.todos.services.verification.VerificationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Log4j2
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/")
public class UsersController {
    private final UsersService usersService;
    private final TokensService tokensService;

    @CrossOrigin
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignupData signupData) {
        try {
            usersService.signup(signupData);
            return ResponseEntity.ok("Success");
        } catch (VerificationException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @CrossOrigin
    @PostMapping("/login")
    public String getToken(Authentication authentication) {
        return tokensService.generateToken(authentication);
    }
}
