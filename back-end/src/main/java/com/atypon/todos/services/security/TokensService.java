package com.atypon.todos.services.security;

import org.springframework.security.core.Authentication;

public interface TokensService {
    String generateToken(Authentication authentication);
}
