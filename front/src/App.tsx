import React from 'react';
import {CssBaseline} from "@mui/material";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import {Route, Routes} from "react-router";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import Items from "./features/items/Items";
import NewItem from "./features/items/NewItem";
import FullPost from "./features/items/FullPost";


const App = () => {
    return (
        <div>
            <>
                <CssBaseline/>
                <AppToolbar/>
                <Routes>
                    <Route path="/" element={<Items/>}/>
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/item-create" element={<NewItem />} />
                    <Route path="/items/:id" element={<FullPost/>}/>
                </Routes>
            </>
        </div>
    );
};

export default App;