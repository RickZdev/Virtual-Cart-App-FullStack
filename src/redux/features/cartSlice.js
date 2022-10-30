import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartList: [],
  },

  reducers: {
    setCart: (state, action) => {
      state.cartList = [...action.payload];
    },
    addItemToCart: (state, action) => {
      state.cartList = [...state.cartList, action.payload];
    },
    removeItemToCart: (state, action) => {
      const itemId = action.payload;
      state.cartList = state.cartList.filter(item => {
        if(item.virtualCartUid !== itemId) {
          return item;
        }
      });
    },
    addItemQuantity: (state, action) => {
      const id = action.payload;
      const index = state.cartList.findIndex((item) => item.virtualCartUid === id);
      const tempArr = [...state.cartList];
      tempArr[index].quantity += 1

      tempArr[index].total = tempArr[index].quantity * tempArr[index].price;
      state.cartList = [...tempArr];
    },
    removeItemQuantity: (state, action) => {
      const id = action.payload;
      const index = state.cartList.findIndex((item) => item.virtualCartUid === id);
      const tempArr = [...state.cartList];
      tempArr[index].quantity -= 1

      tempArr[index].total = tempArr[index].quantity * tempArr[index].price;
      state.cartList = [...tempArr];
    }
  }
})

const cartListAction = cartSlice.actions;
const cartListReducer = cartSlice.reducer;

export default cartListReducer;
export { cartListAction };