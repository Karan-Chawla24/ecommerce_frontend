import { createSlice } from "@reduxjs/toolkit";

const localStorageValue = JSON.parse(localStorage.getItem("isAuthenticated"));

const initialState = {
  isAuthenticated: localStorageValue
    ? localStorageValue
    : localStorage.setItem("isAuthenticated", "false"),
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
      localStorage.setItem("isAuthenticated", JSON.stringify(action.payload));
    },
  },
});

export const { setAuthentication } = loginSlice.actions;
export default loginSlice.reducer;
