import { createSlice, current } from "@reduxjs/toolkit";
interface IUserType {
    [key: string]: {
        nickname: string;
        top: number;
        left: number;
        team: string;
        isAdmin: boolean;
        isReady: boolean;
    };
}
const initialState: { val: IUserType } = {
    val: {},
};
const users = createSlice({
    initialState,
    name: "users",
    reducers: {
        join: (state, action) => {
            let newState: any = {};
            action.payload.map((user: any) => {
                newState[user[0]] = {
                    nickname: user[1].nickname,
                    top: user[1].top,
                    left: user[1].left,
                    team: user[1].team,
                    isAdmin: user[1].isAdmin,
                    isReady: user[1].isReady,
                };
            });
            state.val = { ...newState };
        },
        updateNickname: (state, action) => {
            let user = { ...current(state).val[action.payload.id] };
            user.nickname = action.payload.nickname;
            state.val[action.payload.id] = user;
        },
        updateLocation: (state, action) => {
            let user = { ...current(state).val[action.payload.id] };
            if (user) {
                user.top = action.payload.top;
                user.left = action.payload.left;
                state.val[action.payload.id] = user;
            }
        },
        ready: (state, action) => {
            let user = { ...current(state).val[action.payload.id] };
            user.isReady = action.payload.isReady;
            state.val[action.payload.id] = user;
        },
    },
});

export const usersActions = users.actions;
export default users.reducer;
