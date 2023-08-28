import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isGaming: false,
    isMovable: true,
};
const gameInfo = createSlice({
    initialState,
    name: "gameInfo",
    reducers: {
        gameStart: (state) => {
            state.isGaming = true;
            state.isMovable = false;
        },
        gameEnd: (state) => {
            state.isGaming = false;
        },
        isMovable: (state) => {
            state.isMovable = true;
        },
    },
});
export const gameInfoActions = gameInfo.actions;
export default gameInfo.reducer;
