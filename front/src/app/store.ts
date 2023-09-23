import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {usersReducer} from "../features/users/usersSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage"
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {itemsReducer} from "../features/items/itemsSlice";

const usersPersistConfig = {
  key: 'spotify:users',
  storage,
  whiteList: ['user'],
}

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
    items: itemsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
