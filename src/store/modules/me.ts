import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  nickname: '',
  top: 0,
  left: 0,
};
const me = createSlice({
  initialState,
  name: 'me',
  reducers: {
    update: (state, action) => {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      return state;
    },
    location: (state, action) => {
      state.top = action.payload.top;
      state.left = action.payload.left;
      return state;
    },
  },
});

export const meActions = me.actions;
export default me.reducer;
