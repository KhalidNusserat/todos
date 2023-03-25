package com.atypon.todos.controllers;

import com.atypon.todos.entities.TodoList;
import com.atypon.todos.services.SharedTodoListsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Log4j2
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/shared/todo-lists/")
public class SharedTodoListsController {
    private final SharedTodoListsService sharedTodoListsService;

    @GetMapping("/{sharedTodoListId}/")
    public ResponseEntity<TodoList> getSharedTodoList(@PathVariable String sharedTodoListId) {
        try {
            Optional<TodoList> todoList = sharedTodoListsService.getSharedTodoList(sharedTodoListId);
            return todoList.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<String> addSharedTodoList(@RequestBody Map<String, String> body) {
        try {
            String todoListId = body.get("todoListId");
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date expiresAt = format.parse(body.get("expiresAt"));
            String id = sharedTodoListsService.addSharedTodoList(
                    todoListId,
                    expiresAt
            );
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Couldn't create a shared todo list");
        }
    }
}
