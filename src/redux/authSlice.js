import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token"); // Retrieve token from localStorage

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken, // Set initial token from localStorage
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // Save token to localStorage
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
