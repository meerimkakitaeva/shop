import React, {useState} from 'react';
import {RegisterMutation} from "../../types";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {selectRegisterError} from "./usersSlice";
import {login, register} from "./usersThunk";
import {useAppDispatch, useAppSelector} from "../../app/hook";

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const navigate = useNavigate();

    const [state, setState] = useState<RegisterMutation>({
        username: '',
        password: '',
        displayName: '',
        phone: '',
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(register(state)).unwrap();
            await dispatch(login(state)).unwrap()
            navigate('/');
        } catch (e) {

        }
    };

    const getFieldError = (name: string) => {
        try {
            return error?.errors[name].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Username"
                                name="username"
                                autoComplete="new-username"
                                value={state.username}
                                onChange={inputChangeHandler}
                                sx={{ width: '100%' }}
                                error={!!getFieldError('username')}
                                helperText={getFieldError('username')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                name="displayName"
                                label="Display name"
                                autoComplete="new-displayName"
                                value={state.displayName}
                                onChange={inputChangeHandler}
                                sx={{ width: '100%' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                name="phone"
                                label="phone"
                                autoComplete="new-phone"
                                value={state.phone}
                                onChange={inputChangeHandler}
                                sx={{ width: '100%' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={state.password}
                                onChange={inputChangeHandler}
                                sx={{ width: '100%' }}
                                error={!!getFieldError('password')}
                                helperText={getFieldError('password')}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;