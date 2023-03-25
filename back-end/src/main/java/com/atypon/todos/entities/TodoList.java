package com.atypon.todos.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document("todoLists")
public class TodoList {
    @Id
    private String id;
    private String username;
    private String title;
    private Date creationDate;
    private List<TodoListItem> items;
}