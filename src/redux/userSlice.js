import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUser: (state, action) => {
      state.users = state.users.map(user =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { setUsers, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
