import { createSlice } from '@reduxjs/toolkit';

const initialState: { val: any } = {
  val: {},
};
const users = createSlice({
  initialState,
  name: 'users',
  reducers: {
    join: (state, action) => {
      let newState: any = {};
      state.val = action.payload.map((user: any) => {
        newState[user[0]] = {
          nickname: user[1].nickname,
        };
      });
    },
    updateNickname: (state, action) => {
      console.log(state.val, action.payload);
      let updateValue = {
        [action.payload.id]: {
          nickname: action.payload.nickname,
        },
      };
      state.val = { ...state.val, ...updateValue };
      // state.val[action.payload.id].nickname = action.payload.nickname;
    },
  },
});

export const usersActions = users.actions;
export default users.reducer;
