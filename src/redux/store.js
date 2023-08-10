import { configureStore } from '@reduxjs/toolkit' 
import CartSliceReducer from './slices/CartSlice'
import FilterReducer from './slices/filterSlice'
import ProductReducer from './slices/ProductSlice'
import BurgerReducer from './slices/BurgerSlice'

export const store = configureStore({
  reducer: {
    filter: FilterReducer,
    cart: CartSliceReducer,
    product: ProductReducer,
    burgers: BurgerReducer
  },
})