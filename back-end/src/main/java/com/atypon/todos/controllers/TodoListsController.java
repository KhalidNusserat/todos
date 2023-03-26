package com.atypon.todos.controllers;

import com.atypon.todos.entities.TodoList;
import com.atypon.todos.entities.TodoListItem;
import com.atypon.todos.services.TodoListsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Log4j2
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users/{username}/todo-lists")
public class TodoListsController {
    private final TodoListsService todoListsService;

    @GetMapping("/")
    public ResponseEntity<List<TodoList>> getAllUserTodoLists(@PathVariable String username) {
        return ResponseEntity.ok(todoListsService.getAllUserTodoLists(username));
    }

    @PostMapping("/")
    public ResponseEntity<String> createUserTodoList(@PathVariable String username, @RequestBody TodoList todoList) {
        todoListsService.createTodoList(username, todoList);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/{todoListId}/items")
    public ResponseEntity<String> createTodoListItem(@PathVariable String todoListId, @RequestBody TodoListItem item) {
        try {
            todoListsService.addItemToTodoList(todoListId, item);
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("There was an error while adding the item");
        }
    }

    @DeleteMapping("/{todoListId}")
    public ResponseEntity<String> removeTodoList(@PathVariable String todoListId) {
        try {
            todoListsService.removeTodoList(todoListId);
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("There was an error while removing the todo list");
        }
    }

    @DeleteMapping("/{todoListId}/items/{itemId}")
    public ResponseEntity<String> removeTodoListItem(@PathVariable String todoListId, @PathVariable String itemId) {
        try {
            todoListsService.removeTodoListItem(todoListId, itemId);
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("There was an error while removing the item");
        }
    }

    @PutMapping("/{todoListId}")
    public ResponseEntity<String> renameTodoList(
            @PathVariable String todoListId,
            @RequestBody Map<String, String> body) {
        try {
            todoListsService.renameTodoList(todoListId, body.get("title"));
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("There was an error while renaming the todo list");
        }
    }

    @PutMapping("/{todoListId}/items/{itemId}")
    public ResponseEntity<String> changeTodoListItemContent(
            @PathVariable String todoListId,
            @PathVariable String itemId,
            @RequestBody Map<String, Object> body) {
        try {
            if (body.containsKey("content")) {
                todoListsService.changeTodoListItemContent(todoListId, itemId, (String) body.get("content"));
            } else if (body.containsKey("finished")) {
                todoListsService.changeTodoListItemStatus(todoListId, itemId, (boolean) body.get("finished"));
            }
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("There was an error while changing the todo list item's content");
        }
    }
}
