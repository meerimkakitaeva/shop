import mongoose from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;