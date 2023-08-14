import { createSlice, current } from "@reduxjs/toolkit";
interface IUserType {
    [key: string]: {
        nickname: string;
        top: number;
        left: number;
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
                };
            });
            state.val = { ...newState };
        },
        updateNickname: (state, action) => {
            let updateValue = {
                [action.payload.id]: {
                    nickname: action.payload.nickname,
                },
            };
            state.val = { ...state.val, ...updateValue };
            // state.val[action.payload.id].nickname = action.payload.nickname;
        },
        updateLocation: (state, action) => {
            let user = { ...current(state).val[action.payload.id] };
            if (user) {
                user.top = action.payload.top;
                user.left = action.payload.left;
                state.val[action.payload.id] = user;
            }
            //   let updateValue = {
            //     [action.payload.id]: {
            //         nickname: action.payload.nickname,
            //     },
            // };
            // state.val[action.payload.id].top = action.payload.top;
            // state.val[action.payload.id].left = action.payload.left;
        },
    },
});

export const usersActions = users.actions;
export default users.reducer;
