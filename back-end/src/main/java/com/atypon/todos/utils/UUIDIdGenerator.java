package com.atypon.todos.utils;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UUIDIdGenerator implements IdGenerator {
    @Override
    public String generateId(Object object) {
        return UUID.randomUUID().toString();
    }
}
