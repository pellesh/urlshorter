import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialStore } from "./initialStore.js";
import { statisticApi } from "../api/statisticApi.js";


export const getStatistic = createAsyncThunk(
    'statistin/getStatistic',
    statisticApi.getStatistic
);


const statisticSlice = createSlice({
    name: 'statistin',
    initialState: initialStore.statistic,
    reducers: {
     
    },
    extraReducers: (builder) => {
        builder.addCase(getStatistic.fulfilled, (state, action) => {
            if (action.payload.status === 200 && action.payload.data.status) {
                state.stats = action.payload.data.data;
            }else {
                state.status = action.payload.data.status;
                state.message = action.payload.data.message;
            }
            return state;
        });

    }
})
export const statisticActions = statisticSlice.actions;

export const statisticReducer = statisticSlice.reducer;
