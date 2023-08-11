import { createSlice } from '@reduxjs/toolkit';
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
  name: 'users',
  reducers: {
    join: (state, action) => {
      let newState: any = {};
      action.payload.map((user: any) => {
        newState[user[0]] = {
          nickname: user[1].nickname,
          top: 0,
          left: 0,
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
      state.val[action.payload.id].top = action.payload.top;
      state.val[action.payload.id].left = action.payload.left;
    },
  },
});

export const usersActions = users.actions;
export default users.reducer;
