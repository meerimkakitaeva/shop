import React from 'react';
import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink, useLocation } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import { useAppSelector } from '../../app/hook';
import { selectUser } from '../../features/users/usersSlice';

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'

    }
});

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    const isAuthenticated = !!user;

    const { pathname } = useLocation();
    const isLoginPathname = pathname === '/login' || pathname === '/register';

  return (
        <AppBar position="sticky" sx={{mb: 5}}>
            <Toolbar>
                <Typography variant="h4" component="div" sx={{flexGrow: 1, color: '#fff'}}>
                    <Link to="/">Lalafo <ShoppingCartOutlinedIcon /></Link>
                </Typography>

                {isAuthenticated && <UserMenu user={user} />}
                {(!isAuthenticated && !isLoginPathname) && <AnonymousMenu />}
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;