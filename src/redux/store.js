import { configureStore } from "@reduxjs/toolkit";
import cartListReducer from "./features/cartSlice";
import groceryListReducer from "./features/groceryListSlice";

const store = configureStore({
  reducer: {
    groceryListReducer: groceryListReducer,
    cartListReducer: cartListReducer,
  }
})

export default store;