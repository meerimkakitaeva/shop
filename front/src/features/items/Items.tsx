import React, {useEffect} from 'react';
import {Container, Grid} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import {selectFetchLoading, selectItems} from "./itemsSlice";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import OneItem from "./components/OneItem";
import {fetchItems} from "./itemsThunk";

const Items = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const fetchLoading = useAppSelector(selectFetchLoading);


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

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{display: "flex",flexWrap: "wrap", flexDirection: "row", justifyContent: "center"}}>
                        {cards}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Items;