import { ClickAwayListener, TextField, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { useState } from "react";

const defaultProps = {
    editableFromStart: false,
    editable: true,
    autoFocus: false,
    style: {}
}

type EditableTextProps = {
    text: string,
    setText: (_: string) => any,
    variant: Variant,
} & typeof defaultProps;

const EditableText = (props: EditableTextProps) => {
    const [isEdit, setIdEdit] = useState<boolean>(props.editableFromStart);
    const [text, setText] = useState<string>(props.text);
    if (isEdit) {
        return (
            <ClickAwayListener
                onClickAway={_ => {
                    setIdEdit(false);
                    props.setText(props.text);
                }}
            >
                <TextField
                    value={text}
                    onChange={e => setText(e.target.value)}
                    variant='standard'
                    fullWidth
                    onKeyDownCapture={key => {
                        if (key.key === 'Enter') {
                            if (isEdit) {
                                props.setText(text);
                                setIdEdit(false);
                            }
                        }
                    }}
                    multiline
                    autoFocus={props.autoFocus}
                />
            </ClickAwayListener>
        );
    } else {
        return (<Typography
            onDoubleClick={_ => props.editable && setIdEdit(true)}
            variant={props.variant}
            style={props.style}
        >
            {props.text}
        </Typography>
        );
    }
}

EditableText.defaultProps = defaultProps;

export default EditableText;