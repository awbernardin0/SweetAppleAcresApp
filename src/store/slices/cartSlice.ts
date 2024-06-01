import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINT} from '../../config';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (_, {getState, rejectWithValue}) => {
    const state = getState() as {cart: CartState};
    const items = state.cart.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    try {
      const response = await axios.post(`${API_ENDPOINT}/orders`, {
        name: 'Fluttershy',
        deliveryAddress:
          "Fluttershy's Cottage, The Edge of the Everfree Forest",
        items,
      });
      return response.data;
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        item => item.productId !== action.payload,
      );
    },
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(placeOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, state => {
        state.status = 'succeeded';
        state.items = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
