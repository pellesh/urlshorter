import { configureStore } from "@reduxjs/toolkit";
import { linkReducer } from "./linksReducer";
import { statisticReducer } from "./statisticReducer";
export const store = configureStore({
    reducer: {
        link: linkReducer,
        statistic: statisticReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
