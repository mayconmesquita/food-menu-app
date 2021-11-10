import 'react-native';
import React from 'react';
import App from '../App';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

interface RendererTree {
  children: ReactTestRendererJSON[];
}

beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());

describe('App', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<App />).toJSON() as RendererTree;
    expect(tree?.children.length).toBe(1);
  });
});
