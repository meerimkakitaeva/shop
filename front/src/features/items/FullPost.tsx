import React, { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Container,
    CircularProgress,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Button,
} from '@mui/material';
import {
    useAppDispatch,
    useAppSelector
} from '../../app/hook';
import {
    selectDeleteLoading,
    selectFetchOneLoading,
    selectOneItem
} from './itemsSlice';
import { apiUrl } from '../../constants';
import {deleteItem, fetchOneItem} from './itemsThunk';
import {selectUser} from "../users/usersSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

const FullPost = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const post = useAppSelector(selectOneItem);
    const fetchLoading = useAppSelector(selectFetchOneLoading);
    const deleteLoading = useAppSelector(selectDeleteLoading);
    const user = useAppSelector(selectUser);

    let item: React.ReactNode = <CircularProgress />;

    const onDelete = async () => {
        if (window.confirm('Delete this item ?')) {
            try {
                await dispatch(deleteItem(id));
                alert('Deleted');
                navigate('/');
            } catch (e) {
                alert('Not deleted');
            }
        }
    };


    if (!fetchLoading && post) {
        item = (
            <Container maxWidth="md">
                <Card sx={{ mb: 3 }}>
                    <CardActionArea>
                        <CardContent>
                            <Grid container alignItems="center">
                                <Grid >
                                    <Grid item xs sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Grid item xs>
                                            <Typography gutterBottom component="div" sx={{ fontSize: '20px' }}>
                                                "{post.title}"
                                            </Typography>
                                            <Typography  style={{ display: "flex", alignItems: "center", fontSize: '20px' }}>
                                                {post.price} <SellOutlinedIcon style={{ fontSize: "1.1em", marginLeft: "4px", color: "green" }} />
                                            </Typography>
                                            <Typography gutterBottom component="div">
                                                Description: {post.description}
                                            </Typography>
                                            <Typography gutterBottom component="div" sx={{ color: 'gray', fontSize: '14px' }}>
                                                category: {post.category}
                                            </Typography>
                                            <Typography gutterBottom component="div" sx={{ color: 'gray', fontSize: '14px' }}>
                                                seller: {post.user.displayName}
                                            </Typography>
                                            <Typography sx={{display: "flex", alignItems: "center", color: 'gray', fontSize: '14px' }}>
                                                <LocalPhoneOutlinedIcon style={{ fontSize: "1.1em"}}/>: {post.user.phone}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            {post.image && (
                                                <Grid item sx={{ marginLeft: '10px' }}>
                                                    <CardMedia
                                                        component="img"
                                                        image={`${apiUrl}/${post.image}`}
                                                        sx={{  width: '100%', maxHeight: '300px', objectFit: 'contain'}}
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        {user?._id === post?.user?._id && (
                                            <Button
                                                onClick={onDelete}
                                                disabled={deleteLoading ? deleteLoading === id : false}
                                                startIcon={<DeleteIcon />}
                                            >
                                                Delete
                                            </Button>
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