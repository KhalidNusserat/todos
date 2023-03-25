import Authentication from "./authentication";
import { TodoListType } from "../components/todolist/TodoList";
import API from "./API";
import { diff } from "just-diff";
import { TodoListItemType } from "../components/todolist/TodoListItem";

export class Todos {
    public static async getTodoLists() {
        const username = Authentication.getUsername();
        const todoLists = await API.Axios.get<TodoListType[]>(
            `/api/v1/users/${username}/todo-lists/`,
            {
                headers: {
                    Authorization: `Bearer ${Authentication.getToken()}`
                }
            });
        return todoLists.data;
    }

    public static async addTodoList(todoList: TodoListType) {
        const username = Authentication.getUsername();
        await API.Axios.post<string>(
            `/api/v1/users/${username}/todo-lists/`,
            JSON.stringify(todoList),
            {
                headers: {
                    Authorization: `Bearer ${Authentication.getToken()}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    public static async removeTodoList(todoListId: string) {
        const username = Authentication.getUsername();
        await API.Axios.delete<string>(
            `/api/v1/users/${username}/todo-lists/${todoListId}`,
            {
                headers: {
                    Authorization: `Bearer ${Authentication.getToken()}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    public static async renameTodoList(todoListId: string, newTitle: string) {
        const username = Authentication.getUsername();
        await API.Axios.put<string>(
            `/api/v1/users/${username}/todo-lists/${todoListId}`,
            JSON.stringify({title: newTitle}),
            {
                headers: {
                    Authorization: `Bearer ${Authentication.getToken()}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    public static async addTodoListItem(todoListId: string, item: TodoListItemType) {
        const username = Authentication.getUsername();
        await API.Axios.post<string>(
            `/api/v1/users/${username}/todo-lists/${todoListId}/items`,
            JSON.stringify(item),
            {
                headers: {
                    Authorization: `Bearer ${Authentication.getToken()}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    public static async removeTodoListItem(todoListId: string, todoListItemId: string) {
        const username = Authentication.getUsername();
        await API.Axios.delete<string>(
            `/api/v1/users/${username}/todo-lists/${todoListId}/items/${todoListItemId}`,
            {
                headers: {
                    Authorization: `Bearer ${Authentication.getToken()}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    public static async changeTodoListItemContent(todoListId: string, todoListItemId: string, newContent: string) {
        const username = Authentication.getUsername();
        await API.Axios.put<string>(
            `/api/v1/users/${username}/todo-lists/${todoListId}/items/${todoListItemId}`,
            JSON.stringify({content: newContent}),
            {
                headers: {
                    Authorization: `Bearer ${Authentication.getToken()}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    public static async shareTodoList(todoListId: string, expiresAt: string) {
        const username = Authentication.getUsername();
        const response = await API.Axios.post<string>(
            `/api/v1/shared/todo-lists/`,
            JSON.stringify({todoListId, expiresAt, username}),
            {
                headers: {
                    Authorization: `Bearer ${Authentication.getToken()}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }

    public static async getSharedTodoList(username: string, sharedTodoListId: string) {
        const response = await API.Axios.get<TodoListType>(
            `/api/v1/shared/todo-lists/${sharedTodoListId}/`,
            {
                headers: {
                    Authorization: `Bearer ${Authentication.getToken()}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }

    public static async sync(todoLists: TodoListType[], updatedTodoLists: TodoListType[]) {
        const delta = diff(todoLists, updatedTodoLists);
        console.log(delta);
        delta.forEach(difference => {
            if (difference.op === 'add' && difference.path.length === 1) {
                const todoList: TodoListType = difference.value;
                Todos.addTodoList(todoList);
            }
            else if (difference.op === 'add') {
                const todoListItem: TodoListItemType = difference.value;
                const [todoListIndex, ,] = difference.path as number[];
                const todoListId = todoLists[todoListIndex].id;
                Todos.addTodoListItem(todoListId, todoListItem);
            }
            else if (difference.op === 'remove' && difference.path.length === 1) {
                const [todoListIndex] = difference.path as number[];
                const todoListId = todoLists[todoListIndex].id;
                Todos.removeTodoList(todoListId);
            }
            else if (difference.op === 'remove') {
                const [todoListIndex, , todoListItemIndex] = difference.path as number[];
                const todoListId = todoLists[todoListIndex].id;
                const todoListItemId = todoLists[todoListIndex].items[todoListItemIndex].id;
                Todos.removeTodoListItem(todoListId, todoListItemId);
            }
            else if (difference.op === 'replace' && difference.path.length === 2) {
                const [todoListIndex] = difference.path as number[];
                const todoListId = todoLists[todoListIndex].id;
                const newTitle = difference.value;
                Todos.renameTodoList(todoListId, newTitle);
            }
            else {
                const [todoListIndex, , todoListItemIndex] = difference.path as number[];
                const todoListId = todoLists[todoListIndex].id;
                const todoListItemId = todoLists[todoListIndex].items[todoListItemIndex].id;
                const newContent = difference.value;
                Todos.changeTodoListItemContent(todoListId, todoListItemId, newContent);
            }
        })
    }
}