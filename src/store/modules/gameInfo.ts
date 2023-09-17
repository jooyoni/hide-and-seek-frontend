import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isGaming: false,
    isMovable: true,
    winTeam: "",
};
const gameInfo = createSlice({
    initialState,
    name: "gameInfo",
    reducers: {
        gameStart: (state) => {
            state.isGaming = true;
            state.isMovable = false;
        },
        gameEnd: (state, action) => {
            state.isGaming = false;
            state.winTeam = action.payload;
        },
        isMovable: (state) => {
            state.isMovable = true;
        },
        resetWinTeam: (state) => {
            state.winTeam = "";
        },
    },
});
export const gameInfoActions = gameInfo.actions;
export default gameInfo.reducer;
