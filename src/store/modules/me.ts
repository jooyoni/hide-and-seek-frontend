import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    id: string;
    nickname: string;
    top: number;
    left: number;
    team: "red" | "blue" | undefined;
    isAdmin: boolean;
    isReady: boolean;
} = {
    id: "",
    nickname: "",
    top: 0,
    left: 0,
    team: undefined,
    isAdmin: false,
    isReady: false,
};
const me = createSlice({
    initialState,
    name: "me",
    reducers: {
        update: (state, action) => {
            state.id = action.payload.id;
            state.nickname = action.payload.nickname;
            if (action.payload.data) {
                state.team = action.payload.data.team;
                state.isAdmin = action.payload.data.isAdmin;
                state.isReady = action.payload.data.isReady;
            }
            return state;
        },
        location: (state, action) => {
            state.top = action.payload.top;
            state.left = action.payload.left;
            return state;
        },
        ready: (state, action) => {
            state.isReady = action.payload;
        },
    },
});

export const meActions = me.actions;
export default me.reducer;
