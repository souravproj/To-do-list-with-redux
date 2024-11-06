import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { HomeapiSlice } from "./api/homeApiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [HomeapiSlice.reducerPath]: HomeapiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, HomeapiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
