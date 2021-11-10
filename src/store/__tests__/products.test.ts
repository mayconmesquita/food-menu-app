import { Store } from 'redux';
import configureStore from '../configureStore';
import { mockProduct, mockProducts } from '../../helpers/mock-product';
import { productAdded, productBatchAdded, ProductState } from '../products';

let store: Store;

beforeEach(() => {
  store = configureStore();
});

const productState = (): ProductState => store.getState().products;

describe('Store -> Products', () => {
  it('should add a product in the store', async () => {
    const product = mockProduct();

    await store.dispatch(productAdded(product));

    expect(productState().data).toContainEqual(product);
  });

  it('should not add two products with the same ID', async () => {
    const product = mockProduct();

    await store.dispatch(productAdded(product));
    await store.dispatch(productAdded(product));

    expect(productState().data).toHaveLength(1);
  });

  it('should add a product batch in the store', async () => {
    const productBatch = mockProducts(10);

    await store.dispatch(productBatchAdded(productBatch));

    expect(productState().data).toHaveLength(10);
  });

  it('should add items that has different IDs', async () => {
    const productBatch1 = mockProducts(10);
    const productBatch2 = mockProducts(10);

    await store.dispatch(productBatchAdded(productBatch1));
    await store.dispatch(productBatchAdded(productBatch2));

    expect(productState().data).toHaveLength(20);
  });

  it('should not add items that has the same IDs', async () => {
    const productBatch = mockProducts(10);

    await store.dispatch(productBatchAdded(productBatch));
    await store.dispatch(productBatchAdded(productBatch));

    expect(productState().data).toHaveLength(10);
  });
});
