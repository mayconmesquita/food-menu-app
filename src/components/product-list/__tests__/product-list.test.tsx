import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductList from '../';
import { mockProduct } from '../../../helpers/mock-product';
import { CartItems } from '../../../interfaces/cart';

describe('Components -> Product List', () => {
  it('should render correctly', () => {
    const product = mockProduct();

    const { getByText } = render(
      <ProductList variant="menu" products={[product]} />,
    );

    expect(getByText(product.name)).toBeTruthy();
  });

  it('should render multiple items correctly', () => {
    const product1 = mockProduct();
    const product2 = mockProduct();

    const cartItems: CartItems = {
      [product1.id]: { quantity: 1, subtotal: 100 },
      [product2.id]: { quantity: 3, subtotal: 200 },
    };

    const { getByText } = render(
      <ProductList
        variant="cart"
        products={[product1, product2]}
        cartItems={cartItems}
      />,
    );

    expect(getByText(product1.name)).toBeTruthy();
    expect(getByText(product2.name)).toBeTruthy();
  });

  it('should call onAdd callback when add button be pressed', () => {
    const onAdd = jest.fn();
    const product = mockProduct();

    const cartItems: CartItems = {
      [product.id]: { quantity: 1, subtotal: 100 },
    };

    const { getByTestId } = render(
      <ProductList
        variant="cart"
        products={[product]}
        cartItems={cartItems}
        onAdd={onAdd}
      />,
    );

    fireEvent.press(getByTestId('add'));
    expect(onAdd).toBeCalledWith(product);
  });

  it('should call onRemove callback when remove button be pressed', () => {
    const onRemove = jest.fn();
    const product = mockProduct();

    const cartItems: CartItems = {
      [product.id]: { quantity: 1, subtotal: 100 },
    };

    const { getByTestId } = render(
      <ProductList
        variant="cart"
        products={[product]}
        cartItems={cartItems}
        onRemove={onRemove}
      />,
    );

    fireEvent.press(getByTestId('remove'));
    expect(onRemove).toBeCalledWith(product);
  });
});
