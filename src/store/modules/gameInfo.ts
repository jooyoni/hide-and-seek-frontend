import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isGaming: false,
  isMovable: true,
  lastWonTeam: '',
};
const gameInfo = createSlice({
  initialState,
  name: 'gameInfo',
  reducers: {
    gameStart: (state) => {
      state.isGaming = true;
      state.isMovable = false;
    },
    gameEnd: (state, action) => {
      state.isGaming = false;
      state.lastWonTeam = action.payload;
    },
    isMovable: (state) => {
      state.isMovable = true;
    },
  },
});
export const gameInfoActions = gameInfo.actions;
export default gameInfo.reducer;
