package com.atypon.todos.repositories;

import com.atypon.todos.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UsersRepository extends MongoRepository<User, String> {
    Optional<User> getByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
