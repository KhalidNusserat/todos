import { useParams } from "react-router-dom";
import Centered from "../components/Centered";
import TodoList, { TodoListType } from "../components/todolist/TodoList";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import API from "../api/API";

const SharedTodoListPage = () => {
    const { username, sharedTodoListId } = useParams<{ username: string, sharedTodoListId: string }>();
    const [todoLists, setTodoLists] = useState<TodoListType[]>([]);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        API.Todos.getSharedTodoList(username!, sharedTodoListId!)
            .then(todoList => setTodoLists([todoList]))
            .catch(() => setNotFound(true));
    }, []);

    return (
        <Centered>
            {
                todoLists.length ?
                    <TodoList
                        editable={false}
                        {...todoLists[0]}
                        todoLists={todoLists}
                        setTodoLists={setTodoLists}
                    />
                    :
                    notFound ?
                        <Typography variant="h3">
                            The requested todo list is not found, maybe it expired :(
                        </Typography> :
                        <Typography>
                            Loading...
                        </Typography>
            }
        </Centered>
    );
}

export default SharedTodoListPage;