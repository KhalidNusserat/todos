package com.atypon.todos.entities;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Builder
@Document("sharedTodoLists")
public record SharedTodoList(
        @Id
        String id,
        String todoListId,
        Date expireAt
) {
}
