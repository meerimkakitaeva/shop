import React, { useEffect, useState } from 'react';
import { Container, Grid, Tab, Tabs } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { selectFetchLoading, selectItems } from "./itemsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import OneItem from "./components/OneItem";
import { fetchItems } from "./itemsThunk";
import { categories } from "../../constants";

const Items = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const fetchLoading = useAppSelector(selectFetchLoading);
    const [category, setCategory] = useState('');
    const onChange = (e: React.ChangeEvent<{}>, newValue: string) => {
        e.preventDefault();
        setCategory(newValue);
    };

    useEffect(() => {
        dispatch(fetchItems(category));
    }, [dispatch, category]);

    let cards: React.ReactNode = <CircularProgress />;

    if (!fetchLoading) {
        const newAlbums = [...items];
        cards = newAlbums.map((item) => (
            <OneItem
                key={item._id}
                _id={item._id}
                title={item.title}
                price={item.price}
                image={item.image}
            />
        ));
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Tabs
                        value={category}
                        onChange={onChange}
                        textColor="primary"
                        centered
                    >
                        <Tab label="all" value=''/>
                        {categories.map(category => (
                            <Tab key={category} label={category} value={category} />
                        ))}
                    </Tabs>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
                        {cards}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Items;