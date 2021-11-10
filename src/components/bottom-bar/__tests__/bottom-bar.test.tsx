import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BottomBar from '../';

describe('Components -> Bottom Bar', () => {
  it('should render correctly', () => {
    const { getByText } = render(<BottomBar title="title" />);

    expect(getByText('title')).toBeTruthy();
  });

  it('should render title and subtitle', () => {
    const { getByText } = render(
      <BottomBar title="title" subtitle="subtitle" />,
    );

    expect(getByText('title')).toBeTruthy();
    expect(getByText('subtitle')).toBeTruthy();
  });

  it('should call btnOnPress callback when button be pressed', () => {
    const btnOnPress = jest.fn();

    const { getByTestId } = render(
      <BottomBar
        title="title"
        btnEnabled={true}
        btnOnPress={btnOnPress}
        btnText="button"
        bgColor="#ff6600"
      />,
    );

    fireEvent.press(getByTestId('bottomBarButton'));
    expect(btnOnPress).toBeCalled();
  });
});
