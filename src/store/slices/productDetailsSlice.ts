import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_ENDPOINT} from '../../config';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  isAvailable: boolean;
}

interface ProductDetailsState {
  product: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductDetailsState = {
  product: null,
  status: 'idle',
  error: null,
};

export const fetchProductDetails = createAsyncThunk(
  'productDetails/fetchProductDetails',
  async (productId: string, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/products/${productId}`);
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

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    resetProductDetails(state) {
      state.product = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {resetProductDetails} = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
