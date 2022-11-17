import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialStore } from "./initialStore.js";
import { linkApi } from "../api/linkApi.js";


export const getUserLinks = createAsyncThunk(
    'link/getUserLinks',
    linkApi.getUserLinks
);

export const addUserLink = createAsyncThunk(
    'link/addUserLink',
    linkApi.addUserLink
);

export const clearStatus = () => {
    return {
        type: 'link/clearStatus',
    }
}

const linkSlice = createSlice({
    name: 'link',
    initialState: initialStore.link,
    reducers: {
        clearStatus: (state) => {
            state.message = '';
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserLinks.fulfilled, (state, action) => {
            if (action.payload.status === 200 && action.payload.data.status) {
                state.links = action.payload.data.data;
            }else {
                state.status = action.payload.data.status;
                state.message = action.payload.data.message;
            }
            return state;
        });

        builder.addCase(addUserLink.fulfilled, (state, action) => {
            if (action.payload.status === 200 && action.payload.data.status) {
                state.links.push(action.payload.data.data);
                state.status = action.payload.data.status;
                state.message = action.payload.data.message;
            } else {
                state.status = action.payload.data.status;
                state.message = action.payload.data.message;
            }
            return state;
        });

    }
})
export const linkActions = linkSlice.actions;

export const linkReducer = linkSlice.reducer;
