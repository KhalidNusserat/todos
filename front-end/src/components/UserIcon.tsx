import { Avatar, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Authentication from "../api/authentication";
import { bindMenu, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

const UserIcon = () => {
    const user = Authentication.getUsername();
    const popupState = usePopupState({
        variant: 'dialog',
        popupId: 'userMenu',
        disableAutoFocus: true
    });
    const navigate = useNavigate();

    if (user === null) {
        return <div></div>;
    }
    else {
        return (
            <div>
                <Avatar
                    style={{
                        position: 'fixed',
                        top: 10,
                        right: 10
                    }}
                    sx={{
                        width: 60,
                        height: 60,
                        ":hover": {
                            cursor: 'pointer'
                        }
                    }}
                    {...bindTrigger(popupState)}
                >
                    {user!.charAt(0)}
                </Avatar>
                <Menu
                    {...bindMenu(popupState)}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <AlternateEmailIcon />
                        </ListItemIcon>
                        <ListItemText>{user}</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                        onClick={_ => {
                            Authentication.logout();
                            navigate('/login');
                        }}
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            </div >
        );
    }
};

export default UserIcon;