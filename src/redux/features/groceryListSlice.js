import { createSlice } from "@reduxjs/toolkit";

const groceryListSlice = createSlice({
  name: 'grocery',
  initialState: {
    groceryList: [],
  },

  reducers: {
    setGrocery: (state, action) => {
      state.groceryList = [...action.payload];
    },
    addGrocery: (state, action) => {
      state.groceryList = [...state.groceryList, action.payload];
    },
    removeGrocery: (state, action) => {
      const itemId = action.payload;
      console.log(itemId)
      state.groceryList = state.groceryList.filter(item => {
        if(item.id !== itemId) {
          return item;
        }
      });
    },
    editGrocery: (state, action) => {
      const { id, text } = action.payload;
      const index = state.groceryList.findIndex((item) => item.id === id);
      const tempArr = [...state.groceryList];
      tempArr[index].item = text

      state.groceryList = [...tempArr];
    }
  }
})

const groceryListAction = groceryListSlice.actions;
const groceryListReducer = groceryListSlice.reducer;

export default groceryListReducer;
export { groceryListAction };