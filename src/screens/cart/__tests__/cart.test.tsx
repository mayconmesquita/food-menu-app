import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureStore from '../../../store/configureStore';
import { mockProduct } from '../../../helpers/mock-product';
import { productAdded } from '../../../store/products';
import { cartItemAdded } from '../../../store/cart';
import CartScreen from '../';

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
};

let store: Store;

beforeEach(() => {
  store = configureStore();
});

describe('Screens -> Cart', () => {
  it('should render cart items correctly', async () => {
    const product = mockProduct();
    await store.dispatch(productAdded(product));
    await store.dispatch(cartItemAdded(product));

    const { getByText } = render(
      <Provider store={store}>
        <CartScreen {...props} />
      </Provider>,
    );

    expect(getByText(product.name)).toBeTruthy();
  });

  it('should increment product quantity when the add button be pressed', async () => {
    const product = mockProduct();
    await store.dispatch(productAdded(product));
    await store.dispatch(cartItemAdded(product));

    const { getByTestId } = render(
      <Provider store={store}>
        <CartScreen {...props} />
      </Provider>,
    );

    fireEvent.press(getByTestId('add'));

    expect(store.getState().cart.products[product.id].quantity).toBe(2);
  });

  it('should remove product from cart when the remove button be pressed', async () => {
    const product = mockProduct();
    await store.dispatch(productAdded(product));
    await store.dispatch(cartItemAdded(product));

    const { getByTestId } = render(
      <Provider store={store}>
        <CartScreen {...props} />
      </Provider>,
    );

    fireEvent.press(getByTestId('remove'));

    expect(store.getState().cart.products).not.toHaveProperty(product.id);
  });
});
