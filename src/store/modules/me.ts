import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  nickname: '',
};
const me = createSlice({
  initialState,
  name: 'me',
  reducers: {
    update: (state, action) => {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
    },
  },
});

export const meActions = me.actions;
export default me.reducer;
