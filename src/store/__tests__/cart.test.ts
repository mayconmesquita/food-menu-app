import { Store } from 'redux';
import configureStore from '../configureStore';
import { mockProduct } from '../../helpers/mock-product';
import { productAdded, ProductState } from '../products';
import {
  cartItemAdded,
  cartItemRemoved,
  CartState,
  getCartProducts,
  getCartSubtotal,
  getCartItemsCount,
} from '../cart';

let store: Store;

beforeEach(() => {
  store = configureStore();
});

const cartState = (): CartState => store.getState().cart;

const createState = () => ({
  products: {
    isLoading: false,
    page: 0,
    data: [],
  } as ProductState,
  cart: {
    products: {},
  } as CartState,
});

describe('Store -> Cart', () => {
  it('should add a product in the cart', async () => {
    const product = mockProduct();

    await store.dispatch(productAdded(product));
    await store.dispatch(cartItemAdded(product));

    expect(cartState().products).toHaveProperty(product.id);
    expect(cartState().products[product.id].quantity).toBe(1);
  });

  it('should add multiple units of the same product', async () => {
    const product = mockProduct();

    await store.dispatch(productAdded(product));
    await store.dispatch(cartItemAdded(product));
    await store.dispatch(cartItemAdded(product));
    await store.dispatch(cartItemAdded(product));

    expect(cartState().products).toHaveProperty(product.id);
    expect(cartState().products[product.id].quantity).toBe(3);
  });

  it('should remove a product when the quantity reaches zero', async () => {
    const product = mockProduct();

    await store.dispatch(productAdded(product));
    await store.dispatch(cartItemAdded(product));
    await store.dispatch(cartItemRemoved(product));

    expect(cartState().products).not.toHaveProperty(product.id);
    expect(cartState().products[product.id]).not.toBeTruthy();
  });

  it('should decrease the product quantity when the quantity is positive', async () => {
    const product = mockProduct();

    await store.dispatch(productAdded(product));
    await store.dispatch(cartItemAdded(product));
    await store.dispatch(cartItemAdded(product));
    await store.dispatch(cartItemAdded(product));
    await store.dispatch(cartItemRemoved(product));

    expect(cartState().products).toHaveProperty(product.id);
    expect(cartState().products[product.id].quantity).toBe(2);
  });

  describe('Store -> Cart -> Selectors', () => {
    it('getCartItemsCount', () => {
      const state = createState();
      const product1 = mockProduct();
      const product2 = mockProduct();
      state.cart.products = {
        [product1.id]: { quantity: 1, subtotal: 100 },
        [product2.id]: { quantity: 3, subtotal: 100 },
      };

      const count = getCartItemsCount(state);

      expect(count).toBe(4);
    });

    it('getCartProducts', () => {
      const state = createState();
      const product1 = mockProduct();
      const product2 = mockProduct();
      state.products.data = [product1, product2];
      state.cart.products = {
        [product1.id]: { quantity: 1, subtotal: 50 },
        [product2.id]: { quantity: 1, subtotal: 50 },
      };

      const products = getCartProducts(state);

      expect(products).toContainEqual(product1);
      expect(products).toContainEqual(product2);
      expect(products).toHaveLength(2);
    });

    it('getCartSubtotal', () => {
      const state = createState();
      const product1 = mockProduct();
      const product2 = mockProduct();
      state.cart.products = {
        [product1.id]: { quantity: 1, subtotal: 200 },
        [product2.id]: { quantity: 2, subtotal: 300 },
      };

      const subtotal = getCartSubtotal(state);

      expect(subtotal).toBe(500);
    });
  });
});
