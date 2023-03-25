import { TransitionGroup } from "react-transition-group";
import PrivatePage from "../components/PrivatePage";
import UserIcon from "../components/UserIcon";
import TodoList, { TodoListType } from "../components/todolist/TodoList";
import { Button, Collapse } from "@mui/material";
import Centered from "../components/Centered";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import NewTodoList from "../components/todolist/NewTodoList";
import API from "../api/API";

export default function Home() {
    const [todoLists, setTodoLists] = useState<TodoListType[]>([]);
    const [newTodoList, setNewTodoList] = useState<boolean>(false);
    const syncTodoLists = (updatedTodoList: TodoListType[]) => {
        API.Todos.sync(todoLists, updatedTodoList);
        setTodoLists(updatedTodoList);
    };
    useEffect(() => {
        API.Todos.getTodoLists().then(todoLists => setTodoLists(todoLists));
    }, []);
    return <div>
        <PrivatePage>
            <UserIcon />
            <Centered>
                <TransitionGroup>
                    {
                        todoLists.map(todoList => (
                            <Collapse key={todoList.id}>
                                <TodoList
                                    {...todoList}
                                    todoLists={todoLists}
                                    setTodoLists={syncTodoLists}
                                />
                            </Collapse>
                        ))
                    }
                    {
                        <Collapse key={`new-${Math.random()}`}>
                            {
                                newTodoList ?
                                    <NewTodoList
                                        todoLists={todoLists}
                                        setTodoLists={todoLists => {
                                            syncTodoLists(todoLists);
                                            setNewTodoList(false);
                                        }}
                                    />
                                    :
                                    <Button
                                        onClick={_ => setNewTodoList(true)}
                                        fullWidth
                                    >
                                        <AddIcon />
                                        Add a new todo list
                                    </Button>
                            }
                        </Collapse>
                    }
                </TransitionGroup>
            </Centered>
        </PrivatePage>
    </div>;
}