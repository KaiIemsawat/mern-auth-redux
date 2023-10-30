import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        // auth: authReducer, we will see 'auth' in 'State' in redux devtool
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefultMiddleware) =>
        getDefultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
