import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {apiUrl} from "../../../constants";

interface Props {
    _id: string,
    title: string,
    price: number,
    image: string,
}

const OneItem: React.FC<Props> = ({ _id, title, price, image }) => {
    const itemImage = image ? `${apiUrl}/${image}` : '';

    return (
        <Card sx={{ mb: 3, maxWidth: 300, m: 3, position: 'relative', textDecoration: "none" }} component={Link} to={`/items/${_id}`}>
            <CardActionArea>
                <CardMedia component="img" image={itemImage} alt={title} />
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                        {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default OneItem;