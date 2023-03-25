import { Button, Card, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import API from "../api/API";
import CONSTANTS from "../constants";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Authentication from "../api/authentication";

type SharedDialogProps = {
    open: boolean,
    setOpen: (open: boolean) => any,
    todoListId: string,
    title: string,
    message: string
};

const SharedDialog = (props: SharedDialogProps) => {
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    return (
        <Dialog
            open={props.open}
            onClose={_ => props.setOpen(false)}
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.message}
                </DialogContentText>
                <ul>
                    <li>
                        <form>
                            <label htmlFor='expirationDate'>Expiration date: </label>
                            <input
                                type="date"
                                id='expirationDate'
                                name='expirationDate'
                                value={expirationDate}
                                onChange={e => setExpirationDate(e.target.value)}
                            />
                        </form>
                    </li>
                </ul>
                {
                    url !== '' ?
                        <Card
                            variant="outlined"
                            onClick={_ => {
                                navigator.clipboard.writeText(url);
                                setCopied(true);
                            }}
                            style={{
                                borderColor: copied ? 'green' : 'black',
                                padding: 10,
                                fontStyle: copied ? 'italic' : 'normal',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <ContentPasteIcon />
                                }
                            />
                            <Typography variant="body2">
                                {copied ? 'URL (copied!): ' : 'URL: '}
                                {url}
                            </Typography>
                        </Card> :
                        <></>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={_ => props.setOpen(false)}>
                    No
                </Button>
                <Button onClick={async _ => {
                    const id = await API.Todos.shareTodoList(props.todoListId, expirationDate);
                    const username = Authentication.getUsername();
                    const url = `${CONSTANTS.FRONTEND.URL}/users/${username}/shared/todo-lists/${id}`;
                    setUrl(url);
                }}>
                    Share
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SharedDialog;