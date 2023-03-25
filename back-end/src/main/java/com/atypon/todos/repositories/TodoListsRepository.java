package com.atypon.todos.repositories;

import com.atypon.todos.entities.TodoList;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TodoListsRepository extends MongoRepository<TodoList, String> {
    List<TodoList> findAllByUsername(String username);

    Optional<TodoList> findById(String id);

    void removeById(String id);
}