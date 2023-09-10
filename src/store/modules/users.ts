import { createSlice, current } from "@reduxjs/toolkit";
interface IUserType {
    [key: string]: {
        nickname: string;
        top: number;
        left: number;
        team: "red" | "blue";
        isAdmin: boolean;
        isReady: boolean;
        health: number;
        attacked: boolean;
        getHitted: number;
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
                    health: user[1].health,
                    attacked: user[1].attacked,
                    getHitted: user[1].getHitted,
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
        getHit: (state, action) => {
            console.log(action.payload);
            let users = state.val;
            action.payload.getHitUsers.map((id: string) => {
                users[id].getHitted += 1;
                users[id].health -= 20;
            });
            state.val = { ...users };
        },
    },
});

export const usersActions = users.actions;
export default users.reducer;
