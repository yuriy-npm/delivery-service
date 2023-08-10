import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchProduct = createAsyncThunk(
  
  "product/fetchProduct",
  // Declare the type your function argument here:
  async (params) => {
    // const { search, currentPage, productPerPage, activeCategory, sortMethod } = params;
    const {activeCategory, subType, productPerPage, currentPage, sortMethod, searchValue} = params;
    const { data } = await axios.get(
      `https://649d91ab9bac4a8e669df4c0.mockapi.io/cards?${subType > 0 ? `subType=${subType}` : (activeCategory > 0 ? `&category=${activeCategory}` : "")}${searchValue ? `&search=${searchValue}` : ""}&page=${currentPage}&limit=${productPerPage}&sortBy=${sortMethod.sortBy}&order=${sortMethod.sortOrder}`
      )
    // const { data } = await axios.get(
    //   `https://649d91ab9bac4a8e669df4c0.mockapi.io/cards?${activeCategory > 0 ? `&category=${activeCategory}` : ""}${subType > 0 ? `&subType=${subType}` : ""}&page=${currentPage}&limit=${productPerPage}&sortBy=${sortMethod.sortBy}&order=${sortMethod.sortOrder}`
    //   )
    return data;
  }
);
export const fetchProductFullInfo = createAsyncThunk(
  
  "product/fetchProductFullInfo",
  // Declare the type your function argument here:
  async (id) => {
    // const { search, currentPage, productPerPage, activeCategory, sortMethod } = params;
    const { data } = await axios.get(
      `https://649d91ab9bac4a8e669df4c0.mockapi.io/cards/${id}`)
    return data;
  }
);

const initialState = {
  items: [],
  productInfoItem: [],
  isFetching: 'fetching',
};

export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    // setItems: (state, action) => {
    //   state.items = action.payload;
    // },
  },
  extraReducers: {
    [fetchProduct.pending]: (state) => {
        state.isFetching = 'fetching'
        state.items = []
    },
    [fetchProduct.fulfilled]: (state, action) => {
        state.items = action.payload
        state.isFetching = 'success'
    },
    [fetchProduct.rejected]: (state) => {
        state.isFetching = 'error'
        window.alert('error') 
    },
    [fetchProductFullInfo.pending]: (state) => {
        state.isFetching = 'fetching'
        state.productInfoItem = []
    },
    [fetchProductFullInfo.fulfilled]: (state, action) => {
      
        state.productInfoItem = action.payload
        state.isFetching = 'success'
        
    },
    [fetchProductFullInfo.rejected]: (state) => {
        state.isFetching = 'error'
        window.alert('error') 
    },
  }
});

// Action creators are generated for each case reducer function
export const { setItems } = ProductSlice.actions;

export default ProductSlice.reducer;
