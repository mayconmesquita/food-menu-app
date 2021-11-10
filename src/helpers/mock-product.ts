import faker from 'faker';
import { Product } from '../interfaces/product';

export const mockProduct = (props?: Partial<Product>): Product => {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    ...props,
  };
};

export const mockProducts = (length: number): Product[] => {
  return new Array(length).fill(null).map(mockProduct);
};
