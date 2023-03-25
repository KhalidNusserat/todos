package com.atypon.todos.security;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignupData {
    private final String username;
    private final String email;
    private final String password;
}
