package com.atypon.todos.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoListItem {
    private String id;
    private String content;
    private Date creationDate;
    private boolean finished;
    private Date finishDate;
}