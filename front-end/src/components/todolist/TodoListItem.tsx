import { Card, CardContent, Checkbox, Grid, Grow, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import EditableText from "../EditableText";
import ClearIcon from '@mui/icons-material/Clear';
import ConfirmationDialog from "../ConfirmationDialog";

export type TodoListItemType = {
    id: string,
    content: string,
    creationDate: Date,
    finished: boolean,
    finishDate: string | null,
};

const defaultProps = {
    editable: true
};

type TodoListItemProps = TodoListItemType & {
    items: TodoListItemType[],
    setItems: (_: TodoListItemType[]) => any
} & typeof defaultProps;

const TodoListItem = (props: TodoListItemProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [showShareDialog, setShowShareDialog] = useState<boolean>(false);
    return (
        <div>
            <Card
                variant="outlined"
                onMouseEnter={_ => setHovered(true)}
                onMouseLeave={_ => setHovered(false)}
                style={{
                    borderWidth: '0px'
                }}
            >
                <Grid container>
                    <Grid item>
                        <Checkbox
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                            checked={props.finished}
                            onChange={e => props.setItems(
                                props.items.map(todoListItem => 
                                    todoListItem.id === props.id ? {...todoListItem, finished: e.target.checked} : todoListItem
                                )
                            )}
                        />
                    </Grid>
                    <Grid item flex={1}>
                        <CardContent>
                            {
                                <EditableText
                                    text={props.content}
                                    setText={(content: string) => props.setItems(
                                        props.items.map(todoListItem => 
                                            todoListItem.id === props.id ? {...todoListItem, content} : todoListItem
                                        )
                                    )}
                                    variant="body1"
                                    style={
                                        props.finished ?
                                            {
                                                textDecoration: 'line-through',
                                                color: 'gray',
                                                fontStyle: 'italic'
                                            } : {}
                                    }
                                />
                            }
                        </CardContent>
                    </Grid>
                    <Grid item>
                        <Grow in={hovered && props.editable}>
                            <div>
                                <Tooltip title='Delete this item'>
                                    <IconButton onClick={_ => props.setItems(
                                        props.items.filter(todoListItem => todoListItem.id !== props.id)
                                    )}>
                                        <ClearIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            </Card>
            <ConfirmationDialog
                title="Are you sure you want to share this item?"
                content="The link will be valid for 1 hour."
                open={showShareDialog}
                setOpen={setShowShareDialog}
                onYes={() => null}
            />
        </div>

    );
}

TodoListItem.defaultProps = defaultProps;

export default TodoListItem;