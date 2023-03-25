package com.atypon.todos.services;

import com.atypon.todos.entities.TodoList;

import java.util.Date;
import java.util.Optional;

public interface SharedTodoListsService {
    Optional<TodoList> getSharedTodoList(String id);

    String addSharedTodoList(String todoListId, Date expiresAt);
}
