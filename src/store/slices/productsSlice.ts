import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINT} from '../../config';

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  isAvailable: boolean;
}

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/products`);
      return response.data;
    } catch (err) {
      let errorMessage = 'An unknown error occurred';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
