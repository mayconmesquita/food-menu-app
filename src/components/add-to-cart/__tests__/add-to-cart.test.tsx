import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddToCart from '../';

describe('Components -> Add to cart', () => {
  it('should render correctly', () => {
    const { getByText } = render(<AddToCart counter={7} />);

    expect(getByText('7')).toBeTruthy();
  });

  it('should call onAdd callback when add button be pressed', () => {
    const onAdd = jest.fn();

    const { getByTestId } = render(<AddToCart counter={1} onAdd={onAdd} />);

    fireEvent.press(getByTestId('add'));
    expect(onAdd).toBeCalled();
  });

  it('should call onRemove callback when remove button be pressed', () => {
    const onRemove = jest.fn();

    const { getByTestId } = render(
      <AddToCart counter={1} onRemove={onRemove} />,
    );

    fireEvent.press(getByTestId('remove'));
    expect(onRemove).toBeCalled();
  });

  it('should hide add and remove icons when the counter is zero', () => {
    const { getByText, queryByTestId } = render(<AddToCart counter={0} />);

    expect(getByText('ADD')).toBeTruthy();
    expect(queryByTestId('add')).not.toBeTruthy();
    expect(queryByTestId('remove')).not.toBeTruthy();
  });
});
