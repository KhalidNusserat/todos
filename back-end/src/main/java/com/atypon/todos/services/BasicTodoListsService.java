package com.atypon.todos.services;

import com.atypon.todos.entities.TodoList;
import com.atypon.todos.entities.TodoListItem;
import com.atypon.todos.repositories.TodoListsRepository;
import com.atypon.todos.utils.IdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BasicTodoListsService implements TodoListsService {
    private final TodoListsRepository repository;
    private final IdGenerator idGenerator;

    @Override
    public void createTodoList(String username, TodoList todoList) {
        String generatedId = idGenerator.generateId(todoList);
        todoList.setUsername(username);
        todoList.setId(generatedId);
        Date currentDate = Date.from(Instant.now());
        todoList.getItems().forEach(todoListItem -> todoListItem.setCreationDate(currentDate));
        repository.insert(todoList);
    }

    @Override
    public List<TodoList> getAllUserTodoLists(String username) {
        return repository.findAllByUsername(username);
    }

    @Override
    public void addItemToTodoList(String todoListId, TodoListItem item) {
        TodoList todoList = repository.findById(todoListId).orElseThrow();
        item.setId(idGenerator.generateId(item));
        todoList.getItems().add(item);
        repository.save(todoList);
    }

    @Override
    public void removeTodoList(String todoListId) {
        TodoList todoList = repository.findById(todoListId).orElseThrow();
        repository.removeById(todoListId);
    }

    @Override
    public void removeTodoListItem(String todoListId, String todoListItemId) {
        TodoList todoList = repository.findById(todoListId).orElseThrow();
        todoList.getItems().removeIf(t -> t.getId().equals(todoListItemId));
        repository.save(todoList);
    }

    @Override
    public void renameTodoList(String todoListId, String newTitle) {
        TodoList todoList = repository.findById(todoListId).orElseThrow();
        todoList.setTitle(newTitle);
        repository.save(todoList);
    }

    @Override
    public void changeTodoListItemContent(String todoListId, String itemId, String newContent) {
        TodoList todoList = repository.findById(todoListId).orElseThrow();
        TodoListItem item = todoList.getItems().stream().findFirst().orElseThrow();
        item.setContent(newContent);
        todoList.getItems().removeIf(t -> t.getId().equals(todoListId));
        repository.save(todoList);
    }
}
