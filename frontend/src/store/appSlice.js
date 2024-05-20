import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
export const appSlice = createSlice({
    name: "app",
    initialState: {
        value: 0,
        dataFavorite: [],
    },
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
        dataFavorite: (state, action) => {
            state.dataFavorite = action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount, dataFavorite } =
    appSlice.actions;

export default appSlice.reducer;
