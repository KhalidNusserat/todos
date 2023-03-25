package com.atypon.todos.repositories;

import com.atypon.todos.entities.SharedTodoList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SharedTodoListsRepository extends MongoRepository<SharedTodoList, String> {
}
