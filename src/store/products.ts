import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../interfaces/product';

// Interface
interface ProductState {
  isLoading: boolean;
  data: Product[];
}

// Initial state
const initialProductState: ProductState = {
  isLoading: false,
  data: [],
};

// Action types
const PRODUCT_ADDED = 'productAdded';
const PRODUCT_BATCH_ADDED = 'productBatchAdded';

// Actions creators
export const productAdded = createAction<Product>(PRODUCT_ADDED);
export const productBatchAdded = createAction<Product[]>(PRODUCT_BATCH_ADDED);

// Reducer
export default createReducer(initialProductState, {
  [productAdded.type]: (
    state: ProductState,
    action: PayloadAction<Product>,
  ) => {
    if (state.data.find(item => item.id === action.payload.id)) {
      return;
    }

    state.data.push({
      id: action.payload.id,
      name: action.payload.name,
      price: action.payload.price,
    });
  },
  [productBatchAdded.type]: (
    state: ProductState,
    action: PayloadAction<Product[]>,
  ) => {
    const products = action.payload;
    products.forEach(product => {
      if (state.data.find(item => item.id === product.id)) {
        return;
      }

      state.data.push({
        id: product.id,
        name: product.name,
        price: product.price,
      });
    });
  },
});
