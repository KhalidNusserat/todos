package com.atypon.todos.services;

import com.atypon.todos.entities.SharedTodoList;
import com.atypon.todos.entities.TodoList;
import com.atypon.todos.repositories.SharedTodoListsRepository;
import com.atypon.todos.repositories.TodoListsRepository;
import com.atypon.todos.utils.IdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BasicSharedTodoListsService implements SharedTodoListsService {
    private final SharedTodoListsRepository sharedTodoListsRepository;
    private final TodoListsRepository todoListsRepository;
    private final IdGenerator idGenerator;

    @Override
    public Optional<TodoList> getSharedTodoList(String id) {
        SharedTodoList sharedTodoList = sharedTodoListsRepository.findById(id).orElseThrow();
        if (Instant.now().isAfter(sharedTodoList.expireAt().toInstant())) {
            sharedTodoListsRepository.deleteById(sharedTodoList.id());
            return Optional.empty();
        } else {
            return todoListsRepository.findById(sharedTodoList.todoListId());
        }
    }

    @Override
    public String addSharedTodoList(String todoListId, Date expiresAt) {
        if (expiresAt.before(Date.from(Instant.now()))) {
            throw new IllegalArgumentException("Invalid expiration date provided");
        }
        TodoList todoList = todoListsRepository.findById(todoListId).orElseThrow();
        String generatedId = idGenerator.generateId(todoList);
        sharedTodoListsRepository.insert(
                SharedTodoList.builder()
                        .id(generatedId)
                        .todoListId(todoListId)
                        .expireAt(expiresAt)
                        .build()
        );
        return generatedId;
    }
}
