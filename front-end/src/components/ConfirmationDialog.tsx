import React from 'react';
import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';

type ConfirmationDialogProps = {
    title: string,
    content: string,
    onYes: () => any,
    open: boolean,
    setOpen: (_: boolean) => any
};

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
    return (
        <Dialog
            open={props.open}
            onClose={_ => props.setOpen(false)}
        >
            <DialogTitle>
                {props.title}
            </DialogTitle>
            <DialogContent>
                {props.content}
            </DialogContent>
            <DialogActions>
                <Button onClick={_ => props.setOpen(false)}>
                    No
                </Button>
                <Button onClick={_ => props.onYes()}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;