package com.atypon.todos.services;

import com.atypon.todos.entities.TodoList;
import com.atypon.todos.entities.TodoListItem;

import java.util.List;

public interface TodoListsService {
    void createTodoList(String username, TodoList todoList);

    List<TodoList> getAllUserTodoLists(String username);

    void addItemToTodoList(String todoListId, TodoListItem item);

    void removeTodoList(String todoListId);

    void removeTodoListItem(String todoListId, String todoListItemId);

    void renameTodoList(String todoListId, String newTitle);

    void changeTodoListItemContent(String todoListId, String itemId, String newContent);
}
