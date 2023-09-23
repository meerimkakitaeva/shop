import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {IItem, IItemMutation} from "../../types";
import {RootState} from "../../app/store";

export const fetchItems = createAsyncThunk<IItem[]>(
    'posts/fetchAll',
    async() => {
        const response = await axiosApi.get<IItem[]>('/items');
        return response.data;
    }
);

export const createItem = createAsyncThunk<void, IItemMutation, { state: RootState }>(
    'items/create',
    async (itemMutation, thunkAPI) => {
        const usersState = thunkAPI.getState().users;
        const token = usersState.user?.token;

        const formData = new FormData();
        const keys = Object.keys(itemMutation) as (keyof IItemMutation)[];

        keys.forEach(key => {
            const value = itemMutation[key];

            if (value !== null) {
                if (value instanceof File) {
                    formData.append(key, value, value.name);
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        await axiosApi.post('/items', formData, {
            headers: { 'Authorization': token },
        });
    }
);

export const fetchOneItem = createAsyncThunk<IItem, string>(
    'items/fetchOneItem',
    async (id) => {
        const response = await axiosApi.get<IItem>('/items/' + id);
        return response.data;
    }
);