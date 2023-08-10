import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBurgers = createAsyncThunk(
  "burger/fetchBurger",
  // Declare the type your function argument here:
  async (params) => {
    const { search, currentPage, productPerPage, sortMethod } = params;
    const { data } = await axios.get(
      `https://64ae9201c85640541d4d4d52.mockapi.io/burger-cards?${search}&page=${currentPage}&limit=${productPerPage}&sortBy=${sortMethod.sortBy}&order=${sortMethod.sortOrder}`
    )
    
    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading'
};

export const BurgerSlice = createSlice({
  name: "Burgers",
  initialState,
  reducers: {
    // setItems: (state, action) => {
    //   state.items = action.payload;
    // },
  },
  extraReducers: {
    [fetchBurgers.pending]: (state) => {
        state.status = 'loading'
        state.items = []
    },
    [fetchBurgers.fulfilled]: (state, action) => {
        state.items = action.payload
        state.status = 'success'
    },
    [fetchBurgers.rejected]: (state) => {
        state.status = 'error'
    }
  }
});

// Action creators are generated for each case reducer function
export const { setItems } = BurgerSlice.actions;

export default BurgerSlice.reducer;
