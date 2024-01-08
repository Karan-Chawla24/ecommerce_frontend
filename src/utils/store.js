import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice.js";
import cartSlice from "./cartSlice.js";

const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: cartSlice,
  },
});

export default store;
