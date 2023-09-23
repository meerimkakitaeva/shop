import mongoose, {ObjectId} from "mongoose";

export interface IUser {
    username: string,
    password: string,
    displayName: string,
    phone: string,
    token: string,
}

export interface IItem {
    id: string,
    user: ObjectId;
    title: string,
    description: string;
    price: number;
    image: string;
    category: string;
}

export interface IItemMutation {
    user: mongoose.Types.ObjectId;
    title: string,
    description: string;
    price: number;
    image: string;
    category: string;
}