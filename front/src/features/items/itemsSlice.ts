import {RootState} from "../../app/store";
import {createSlice} from '@reduxjs/toolkit';
import {IItem} from '../../types';
import {createItem, fetchItems, fetchOneItem} from "./itemsThunk";

interface PostsState {
    items: IItem[],
    item: IItem | null,
    fetchOneItemLoading: boolean,
    fetchLoading: boolean,
    createLoading: boolean,
}

const initialState: PostsState = {
    items: [],
    item: null,
    fetchOneItemLoading: false,
    fetchLoading: false,
    createLoading: false,
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.fetchLoading = true;
        });


        builder.addCase(createItem.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createItem.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createItem.rejected, (state) => {
            state.createLoading = true;
        });



        builder.addCase(fetchOneItem.pending, (state) => {
            state.fetchOneItemLoading = true;
        });
        builder.addCase(fetchOneItem.fulfilled, (state, action) => {
            state.fetchOneItemLoading = false;
            state.item = action.payload;
        });
        builder.addCase(fetchOneItem.rejected, (state) => {
            state.fetchOneItemLoading = true;
        });

    }
});

export const itemsReducer = itemsSlice.reducer;
export const selectItems = (state: RootState) => state.items.items;
export const selectFetchLoading = (state: RootState) => state.items.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.items.createLoading;
export const selectOneItem = (state: RootState) => state.items.item;
export const selectFetchOneLoading = (state: RootState) => state.items.fetchOneItemLoading;

