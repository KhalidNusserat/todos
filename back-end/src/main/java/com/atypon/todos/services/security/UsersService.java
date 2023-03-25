package com.atypon.todos.services.security;

import com.atypon.todos.security.SignupData;
import com.atypon.todos.services.verification.VerificationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UsersService extends UserDetailsService {
    UserDetails loadUserByUsername(String username);

    void signup(SignupData signupData) throws VerificationException;
}
