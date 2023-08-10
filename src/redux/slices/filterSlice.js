import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProductQty = createAsyncThunk(
  "filter/fetchProductQty",
  // Declare the type your function argument here:
  async (params) => {
    const {activeCategory} = params;
    const { data } = await axios.get(
      `https://649d91ab9bac4a8e669df4c0.mockapi.io/cards?${activeCategory > 0 ? `&category=${activeCategory}` : ""}`
    )
    return data;
  }
);

const initialState = {
  activeCategory: 0,
  subType: 0,
  isCategoryMenuActive: false,
  searchValue: '',
  sortType: 'rating',
  sortMethod: {
    sortBy: 'rating',
    sortOrder: 'desc'
  },
  isSortPopupActive: false,
  productPerPage: 8,
  currentPage: 1,
  totalPageCount: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    setActiveCategory: (state, action) => {
        state.activeCategory = action.payload
        
        

    },
    setSubType: (state, action) => {
        state.subType = action.payload
        
        

    },
    setSearchValue: (state, action) => {
        state.searchValue = action.payload

    },
    setSortType: (state, action) => {
      state.sortType = action.payload.sortType
      state.sortMethod.sortBy = action.payload.sortType
      state.sortMethod.sortOrder = action.payload.sortOrder
    },
    setIsSortPopupActive: (state, action) => {
      state.isSortPopupActive = action.payload

  },
  setCurrentPage: (state, action) => {
    state.currentPage = action.payload
    // console.log(action.payload);
    // if (action.payload.type === 'pizza') {
    //   state.currentPagePizzas = action.payload.index + 1
    // }
    // if (action.payload.type === 'burgers') {
    //   state.currentPageBurgers = action.payload.index + 1
    // }
  },
  setProductPerPage: (state, action) => {
    state.productPerPage = action.payload 
  },
  setIsCategoryMenuActive: (state, action) => {
    console.log(action.payload);
    state.isCategoryMenuActive = action.payload 
  },

},
extraReducers: {
  [fetchProductQty.pending]: (state) => {

  },
  [fetchProductQty.fulfilled]: (state, action) => {
      state.totalPageCount = Math.ceil(action.payload.length / state.productPerPage)
  },
  [fetchProductQty.rejected]: (state) => {
      state.status = 'error'
      console.log('error');
  },
}
})

// Action creators are generated for each case reducer function
export const { setActiveCategory, setSubType, setIsCategoryMenuActive, setSortType, isSortPopupActive, setIsSortPopupActive, setCurrentPage, setSearchValue, setProductPerPage } = filterSlice.actions

export default filterSlice.reducer