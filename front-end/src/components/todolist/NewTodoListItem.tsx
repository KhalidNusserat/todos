import EditableText from "../EditableText";
import { TodoListItemType } from "./TodoListItem";

type NewTodoListItemProps = {
    items: TodoListItemType[],
    setItems: (_: TodoListItemType[]) => any
};

const NewTodoListItem = (props: NewTodoListItemProps) => {
    return (
        <EditableText
            text={''}
            setText={content => {
                if (content.trim().length !== 0) {
                    props.setItems([
                        ...props.items,
                        {
                            id: `new-${Math.random()}`,
                            content,
                            creationDate: new Date(),
                            finished: false,
                            finishDate: null
                        }
                    ])
                } else {
                    props.setItems(props.items);
                }
            }}
            variant="h5"
            autoFocus
            editableFromStart
        />
    );
};

export default NewTodoListItem;