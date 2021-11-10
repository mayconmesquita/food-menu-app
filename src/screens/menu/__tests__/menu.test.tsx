import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureStore from '../../../store/configureStore';
import { mockProduct, mockProducts } from '../../../helpers/mock-product';
import { productAdded, productBatchAdded } from '../../../store/products';
import { cartItemAdded } from '../../../store/cart';
import MenuScreen from '..';

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
};

let store: Store;

beforeEach(() => {
  store = configureStore();
});

describe('Screens -> Menu', () => {
  it('should render menu items correctly', async () => {
    const products = mockProducts(3);
    await store.dispatch(productBatchAdded(products));

    const { getByText } = render(
      <Provider store={store}>
        <MenuScreen {...props} />
      </Provider>,
    );

    expect(getByText(products[0].name)).toBeTruthy();
    expect(getByText(products[1].name)).toBeTruthy();
    expect(getByText(products[2].name)).toBeTruthy();
  });

  it('should add product to cart when the add button be pressed', async () => {
    const product = mockProduct();
    await store.dispatch(productAdded(product));

    const { getAllByText } = render(
      <Provider store={store}>
        <MenuScreen {...props} />
      </Provider>,
    );

    fireEvent.press(getAllByText('ADD')[0]);

    expect(store.getState().cart.products).toHaveProperty(product.id);
  });

  it('should remove product from cart when the remove button be pressed', async () => {
    const product = mockProduct();
    const { getAllByText, getAllByTestId } = render(
      <Provider store={store}>
        <MenuScreen {...props} />
      </Provider>,
    );

    fireEvent.press(getAllByText('ADD')[0]);
    fireEvent.press(getAllByTestId('remove')[0]);

    expect(store.getState().cart.products).not.toHaveProperty(product.id);
  });

  it('should call navigate handler when cart button be called', async () => {
    const product = mockProduct();
    await store.dispatch(productAdded(product));
    await store.dispatch(cartItemAdded(product));
    const { getByTestId } = render(
      <Provider store={store}>
        <MenuScreen {...props} />
      </Provider>,
    );

    fireEvent.press(getByTestId('bottomBarButton'));

    expect(props.navigation.navigate).toBeCalled();
  });
});
