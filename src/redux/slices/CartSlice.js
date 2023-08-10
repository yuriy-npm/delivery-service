import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  // Declare the type your function argument here:
  async (obj) => {
    const findItem = await axios.get(
      `https://649d91ab9bac4a8e669df4c0.mockapi.io/cart?${
        obj.superId ? "superId=" + obj.superId : "index=" + obj.index
      }`
    );

    if (findItem.data.length === 0) {
      const newObj = { ...obj, count: 1 };
      await axios.post(
        "https://649d91ab9bac4a8e669df4c0.mockapi.io/cart",
        newObj
      );
    } else {
      const [oldObj] = findItem.data;
      const oldCount = oldObj.count;
      const newCount = oldCount + 1;
      await axios.put(
        `https://649d91ab9bac4a8e669df4c0.mockapi.io/cart/${oldObj.id}`,
        { count: newCount }
      );
      const { data } = await axios.get(
        `https://649d91ab9bac4a8e669df4c0.mockapi.io/cart?sortBy=category&order=desc`
      );
      return data;
    }
  }
);
export const deleteObjectFromCart = createAsyncThunk(
  "cart/deleteObjectFromCart",
  // Declare the type your function argument here:
  async (obj) => {
    const findData = await axios.get(
      `https://649d91ab9bac4a8e669df4c0.mockapi.io/cart?${
        obj.superId ? "superId=" + obj.superId : "index=" + obj.index
      }`
      );
      const [findObj] = findData.data
    if (findObj) {
      await axios.delete(
        `https://649d91ab9bac4a8e669df4c0.mockapi.io/cart/${findObj.id}`
      );
      return findObj
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  // Declare the type your function argument here:
  async (obj) => {
    const findItem = await axios.get(
      `https://649d91ab9bac4a8e669df4c0.mockapi.io/cart?superId=${obj.superId}`
    );
    if (findItem.data.length > 0) {
      const [oldObj] = findItem.data;
      if (oldObj.count > 1) {
        const oldCount = oldObj.count;
        const newCount = oldCount - 1;
        await axios.put(
          `https://649d91ab9bac4a8e669df4c0.mockapi.io/cart/${oldObj.id}`,
          { count: newCount }
        );
      } else {
        await axios.delete(
          `https://649d91ab9bac4a8e669df4c0.mockapi.io/cart/${oldObj.id}`
        );
      }
    }
    // if (findItem.data.length > 0) {
    //   await axios.delete(
    //     `https://649d91ab9bac4a8e669df4c0.mockapi.io/cart/${findItem.id}`
    //   )
    //   return obj.superId
    // }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  // Declare the type your function argument here:
  async () => {
    // const { search, currentPage, productPerPage, activeCategory, sortMethod } = params;
    // const {activeCategory, productPerPage, currentPage, sortMethod} = params;
    const { data } = await axios.get(
      `https://649d91ab9bac4a8e669df4c0.mockapi.io/cart?sortBy=category&order=desc`
    );

    return data;
  }
);

const initialState = {
  cartItems: [],
  totalSum: 0,
  categoryQty: 2,
  pending: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemtoState: (state, action) => {
      const findItem = state.cartItems.find((item) => {
        return action.payload.superId
          ? item.superId === action.payload.superId
          : parseInt(item.index) === parseInt(action.payload.index);
      });
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
          superId:
            action.payload.id + action.payload.type + action.payload.size,
        });
        state.totalSum = state.cartItems.reduce((totalSum, obj) => {
          return totalSum + obj.price * obj.count;
        }, 0);
      }
    },

    plusItem: (state, action) => {
      const findItem = state.cartItems.find((obj) =>
        obj.superId
          ? obj.superId === action.payload.superId
          : obj.index === action.payload.index
      );
      if (findItem) {
        findItem.count++;
        state.totalSum = state.cartItems.reduce((totalSum, obj) => {
          return totalSum + obj.price * obj.count;
        }, 0);
      }
    },

    minusItem: (state, action) => {
      const findItem = state.cartItems.find((obj) =>
        obj.superId
          ? obj.superId === action.payload.superId
          : parseInt(obj.index) === parseInt(action.payload.index)
      );
      if (findItem) {
        console.log("findItem = ", findItem);
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.cartItems = state.cartItems.filter((obj) =>
            obj.superId
              ? obj.superId !== action.payload.superId
              : parseInt(obj.index) !== parseInt(action.payload.index)
          );
        }
      }
      state.totalSum = state.cartItems.reduce((totalSum, obj) => {
        return totalSum + obj.price * obj.count;
      }, 0);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (obj) => obj.superId !== action.payload
      );
      state.totalSum = state.cartItems.reduce((totalSum, obj) => {
        return totalSum + obj.price * obj.count;
      }, 0);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalSum = 0;
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {},
    [addToCart.fulfilled]: (state, action) => {},
    [addToCart.rejected]: (state) => {},

    [deleteFromCart.pending]: (state) => {},
    [deleteFromCart.fulfilled]: (state, action) => {},
    [deleteFromCart.rejected]: (state) => {},

    [fetchCartItems.pending]: (state) => {
      state.cartItems = [];
      state.pending = 1;
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      state.cartItems = action.payload;
      state.totalSum = state.cartItems.reduce((totalSum, obj) => {
        return totalSum + obj.price * obj.count;
      }, 0);
      state.pending = 0;
    },
    [fetchCartItems.rejected]: (state) => {
      window.alert("Sorry! Server error, try again later");
    },
    [deleteObjectFromCart.pending]: (state) => {

    },
    [deleteObjectFromCart.fulfilled]: (state, action) => {
      state.cartItems = state.cartItems.filter(item => action.payload.superId? item.superId !== action.payload.superId : parseInt(item.index) !== parseInt(action.payload.index))
      state.totalSum = state.cartItems.reduce((totalSum, obj) => {
        return totalSum + obj.price * obj.count;
      }, 0);
      state.pending = 0;
    },
    [deleteObjectFromCart.rejected]: (state) => {
      window.alert("Sorry! Server error, try again later");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemtoState, removeItem, clearCart, minusItem, plusItem } =
  CartSlice.actions;

export default CartSlice.reducer;
