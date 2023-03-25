package com.atypon.todos.security;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginData {
    private final String username;
    private final String password;
}
