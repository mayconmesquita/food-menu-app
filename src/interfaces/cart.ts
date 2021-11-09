import { Product } from './product';

export interface CartItems {
  [id: Product['id']]: {
    quantity: number;
    subtotal: number;
  };
}
