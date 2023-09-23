import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import {IUser} from "../../types";
import {useAppDispatch} from "../../app/hook";
import {logout} from "../../features/users/usersThunk";
import {unsetUser} from "../../features/users/usersSlice";
import {Link as NavLink} from "react-router-dom";

interface Props {
    user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(unsetUser());
        dispatch(logout());
    };

    return (
        <>
            <Button component={NavLink} to="/item-create" color="inherit" sx={{me: "5px"}}>
                Add new item
            </Button>

            <Button
                onClick={handleClick}
                color="inherit"
            >
                Hello , {user.displayName}
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;