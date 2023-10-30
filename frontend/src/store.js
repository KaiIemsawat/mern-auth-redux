import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {},
    middleware: (getDefultMiddleware) => getDefultMiddleware(),
    devTools: true,
});

export default store;
