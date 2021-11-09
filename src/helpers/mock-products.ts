import faker from 'faker';
import { Product } from '../interfaces/product';

export const mockProducts = (length: number): Product[] => {
  return new Array(length).fill(null).map((elm, index) => ({
    id: faker.datatype.number(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
  }));
};
