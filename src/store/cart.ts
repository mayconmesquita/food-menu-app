import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { CartItems } from '../interfaces/cart';
import { Product } from '../interfaces/product';
import { RootState } from './configureStore';

// Interface
interface CartState {
  isLoading: boolean;
  products: CartItems;
  subtotal: number;
}

// Initial state
const initialCartState: CartState = {
  isLoading: false,
  products: {},
  subtotal: 0,
};

// Action types
const CART_ITEM_ADDED = 'cartItemAdded';
const CART_ITEM_REMOVED = 'cartItemRemoved';

// Actions creators
export const cartItemAdded = createAction<Product>(CART_ITEM_ADDED);
export const cartItemRemoved = createAction<Product>(CART_ITEM_REMOVED);

// Reducer
export default createReducer(initialCartState, {
  [cartItemAdded.type]: (state: CartState, action: PayloadAction<Product>) => {
    const product = action.payload;

    if (state.products[product.id]) {
      const quantity = ++state.products[product.id].quantity;

      state.products[product.id].quantity = quantity;
      state.products[product.id].subtotal = quantity * product.price;
    } else {
      state.products[product.id] = {
        quantity: 1,
        subtotal: action.payload.price,
      };
    }
  },
  [cartItemRemoved.type]: (
    state: CartState,
    action: PayloadAction<Product>,
  ) => {
    const product = action.payload;

    if (state.products[product.id]?.quantity > 1) {
      const quantity = --state.products[product.id].quantity;

      state.products[product.id].quantity = quantity;
      state.products[product.id].subtotal = quantity * product.price;
    } else {
      delete state.products[product.id];
    }
  },
});

export const getCartProducts = createSelector(
  (state: RootState) => state,
  ({ products, cart }) => {
    return products.data.filter(product => cart.products[product.id]);
  },
);

export const getCartSubtotal = createSelector(
  (state: RootState) => state.cart,
  ({ products }) => {
    return Object.values(products)
      .map(({ subtotal }) => subtotal)
      .reduce((a, b) => a + b, 0);
  },
);

export const getCartItemsCount = createSelector(
  (state: RootState) => state.cart,
  ({ products }) => {
    return Object.values(products)
      .map(({ quantity }) => quantity)
      .reduce((a, b) => a + b, 0);
  },
);
