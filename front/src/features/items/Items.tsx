import React, {useEffect} from 'react';
import {Container, Grid, Typography} from "@mui/material";
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
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{mb:3, mt: 2}} textAlign="center">
                        Items :
                    </Typography>
                    <div style={{display: "flex",flexWrap: "wrap", flexDirection: "row", justifyContent: "center"}}>
                        {cards}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Items;