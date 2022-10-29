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
      console.log(itemId)
      state.cartList = state.cartList.filter(item => {
        if(item.virtualCartUid !== itemId) {
          return item;
        }
      });


      console.log(state.cartList)
    },
    editGrocery: (state, action) => {
      const { id, text } = action.payload;
      const index = state.groceryList.findIndex((item) => item.id === id);
      const tempArr = [...state.groceryList];
      tempArr[index].item = text

      state.groceryList = [...tempArr];

      console.log(state.groceryList)
      
    }
  }
})

const cartListAction = cartSlice.actions;
const cartListReducer = cartSlice.reducer;

export default cartListReducer;
export { cartListAction };