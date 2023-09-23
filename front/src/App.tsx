import React from 'react';
import {CssBaseline} from "@mui/material";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import {Route, Routes} from "react-router";
import Register from "./features/users/Register";
import Login from "./features/users/Login";


const App = () => {
    return (
        <div>
            <>
                <CssBaseline/>
                <AppToolbar/>
                <Routes>
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </>
        </div>
    );
};

export default App;