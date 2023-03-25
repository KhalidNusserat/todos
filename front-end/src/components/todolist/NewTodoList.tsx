import { Card, CardHeader } from "@mui/material";
import { TodoListType } from "./TodoList";
import EditableText from "../EditableText";

type NewTodoListProps = {
    todoLists: TodoListType[],
    setTodoLists: (_: TodoListType[]) => any
};

const NewTodoList = (props: NewTodoListProps) => {
    return (
        <Card
            style={{
                width: 500,
                padding: '5px',
                margin: '0 auto',
                borderRadius: '5px',
                marginBottom: 15
            }}
            variant='outlined'
        >
            <CardHeader
                title={
                    <EditableText
                        text=''
                        setText={(title: string) => {
                            if (title.trim().length !== 0) {
                                props.setTodoLists([
                                    ...props.todoLists,
                                    {
                                        id: `new-${Math.random()}`,
                                        title,
                                        creationDate: new Date(),
                                        items: []
                                    }
                                ])
                            } else {
                                props.setTodoLists(props.todoLists);
                            }
                        }}
                        variant="h5"
                        style={{}}
                        autoFocus
                        editableFromStart
                    />
                }
            >
            </CardHeader>
        </Card>
    );
};

export default NewTodoList;