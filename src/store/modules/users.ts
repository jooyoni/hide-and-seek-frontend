import { createSlice } from '@reduxjs/toolkit';

const initialState: any[] = [];
const users = createSlice({
  initialState,
  name: 'users',
  reducers: {
    join: (state, action) => {
      state = action.payload.map((user: any) => {
        return {
          id: user[0],
          nickname: user[1].nickname,
        };
      });
    },
  },
});

export const usersActions = users.actions;
export default users.reducer;
