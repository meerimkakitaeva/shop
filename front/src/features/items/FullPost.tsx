import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    CircularProgress,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import {
    useAppDispatch,
    useAppSelector
} from '../../app/hook';
import {
    selectFetchOneLoading,
    selectOneItem
} from './itemsSlice';
import { apiUrl } from '../../constants';
import { fetchOneItem } from './itemsThunk';

const FullPost = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectOneItem);
    const fetchLoading = useAppSelector(selectFetchOneLoading);

    let item: React.ReactNode = <CircularProgress />;

    if (!fetchLoading && post) {
        item = (
            <Container maxWidth="sm">
                <Card sx={{ mb: 3 }}>
                    <CardActionArea>
                        <CardContent>
                            <Grid container alignItems="center">
                                <Grid item xs sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Grid item xs>
                                        <Typography gutterBottom component="div" sx={{ fontSize: '20px' }}>
                                            "{post.title}"
                                        </Typography>
                                        <Typography gutterBottom component="div" sx={{ fontSize: '20px' }}>
                                            Price: {post.price}
                                        </Typography>
                                        <Typography gutterBottom component="div" sx={{ fontSize: '20px' }}>
                                            Category: {post.category}
                                        </Typography>
                                        <Typography gutterBottom component="div">
                                            Description: {post.description}
                                        </Typography>
                                        <Typography gutterBottom component="div" sx={{ color: 'gray', fontSize: '12px' }}>
                                            seller: {post.user.displayName}
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        {post.image && (
                                            <Grid item sx={{ marginLeft: '10px' }}>
                                                <CardMedia
                                                    component="img"
                                                    image={`${apiUrl}/${post.image}`}
                                                    sx={{ width: '300px', height: '300px' }}
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Container>
        );
    }

    useEffect(() => {
        dispatch(fetchOneItem(id));
    }, [dispatch, id]);

    return (
        <Container maxWidth="lg">
            {item}
        </Container>
    );
};

export default FullPost;