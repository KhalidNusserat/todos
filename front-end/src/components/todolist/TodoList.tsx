import { Button, Card, CardContent, CardHeader, Collapse, Grow, IconButton, Tooltip } from "@mui/material";
import EditableText from "../EditableText";
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import ShareIcon from '@mui/icons-material/Share';
import ConfirmationDialog from "../ConfirmationDialog";
import AddIcon from '@mui/icons-material/Add';
import { TransitionGroup } from "react-transition-group";
import TodoListItem, { TodoListItemType } from "./TodoListItem";
import NewTodoListItem from "./NewTodoListItem";
import SharedDialog from "../ShareDialog";

export type TodoListType = {
    id: string,
    title: string,
    creationDate: Date,
    items: TodoListItemType[]
};

const defaultProps = {
    editable: true
};

type TodoListProps = TodoListType & {
    todoLists: TodoListType[],
    setTodoLists: (todoLists: TodoListType[]) => any
} & typeof defaultProps;

const TodoList = (props: TodoListProps ) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
    const [newTodoListItem, setNewTodoListitem] = useState<boolean>(false);
    return (
        <div>
            <Card
                style={{
                    width: 500,
                    padding: '5px',
                    margin: '0 auto',
                    borderRadius: '5px',
                    marginBottom: 15
                }}
                onMouseEnter={_ => setHovered(true)}
                onMouseLeave={_ => setHovered(false)}
                variant='outlined'
            >
                <CardHeader
                    title={
                        <EditableText
                            text={props.title}
                            setText={(title: string) => props.setTodoLists(
                                props.todoLists.map(todoList =>
                                    todoList.id === props.id ?
                                        { ...todoList, title } :
                                        todoList)
                            )}
                            variant="h5"
                            style={{}}
                            editable={props.editable}
                        />
                    }
                    action={
                        <Grow in={hovered && props.editable}>
                            <div>
                                <Tooltip title='Delete todo list'>
                                    <IconButton onClick={_ => setShowDeleteDialog(true)}>
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Share the entire todo list'>
                                    <IconButton onClick={_ => setShowShareDialog(true)}>
                                        <ShareIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Grow>
                    }
                    subheader={`Created: ${props.creationDate}`}
                />
                <CardContent>
                    <TransitionGroup>
                        {
                            props.items.map(item => (
                                <Collapse key={item.id}>
                                    <TodoListItem
                                        {...item}
                                        items={props.todoLists.find(todoList =>
                                            todoList.id === props.id
                                        )!.items}
                                        setItems={items => props.setTodoLists(
                                            props.todoLists.map(todoList =>
                                                todoList.id === props.id ?
                                                    { ...todoList, items } :
                                                    todoList
                                            )
                                        )}
                                        editable={props.editable}
                                    />
                                </Collapse>))
                        }
                        {
                            newTodoListItem && props.editable ?
                                <Collapse key={`new-${Math.random()}`}>
                                    <NewTodoListItem
                                        items={props.todoLists.find(todoList =>
                                            todoList.id === props.id
                                        )!.items}
                                        setItems={items => {
                                            props.setTodoLists(
                                                props.todoLists.map(todoList =>
                                                    todoList.id === props.id ?
                                                        { ...todoList, items } :
                                                        todoList
                                                )
                                            );
                                            setNewTodoListitem(false);
                                        }}
                                    />
                                </Collapse>
                                :
                                hovered && props.editable ?
                                    <Collapse key='addNewItem'>
                                        <Button
                                            onClick={_ => setNewTodoListitem(true)}
                                            fullWidth
                                        >
                                            <AddIcon />
                                            Add a new item
                                        </Button>
                                    </Collapse>
                                    :
                                    <></>
                        }
                    </TransitionGroup>
                </CardContent>
            </Card>
            <ConfirmationDialog
                title="Are you sure you want to delete this todo list?"
                content="This action is irreversible, please make confirm your action to proceed."
                open={showDeleteDialog}
                setOpen={setShowDeleteDialog}
                onYes={() => {
                    props.setTodoLists(props.todoLists.filter(todoList => todoList.id !== props.id));
                    setShowDeleteDialog(false);
                }}
            />
            <SharedDialog
                open={showShareDialog}
                setOpen={setShowShareDialog}
                todoListId={props.id}
                title='Share this todo list'
                message='You are about to share this todo list, please specify the expiration date and confirm to share a temporary link.'
            />
        </div>
    );
};

TodoList.defaultProps = defaultProps;

export default TodoList;