import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import productDetailsReducer from './slices/productDetailsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    productDetails: productDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
