import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import productsReducer from './products';
import cartReducer from './cart';

const reducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

function store() {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(logger({ enabled: false })),
  });
}

export default store;
export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ReturnType<typeof store>['dispatch'];
