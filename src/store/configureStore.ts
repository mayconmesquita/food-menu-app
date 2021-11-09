import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './products';
import cartReducer from './cart';
import logger from './middleware/logger';

const reducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger({ enabled: false })),
});

export default () => store;
export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
