import { mockProduct, mockProducts } from '../mock-product';

describe('Helpers -> Mock Product', () => {
  it('should mock product with some given params', () => {
    const product = mockProduct({ name: 'computer', price: 10 });

    expect(product.name).toBe('computer');
    expect(product.price).toBe(10);
    expect(product).toHaveProperty('id');
  });

  it('should mock a product with random data', () => {
    const product = mockProduct();

    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('price');
  });

  it('should mock a product list', () => {
    const products = mockProducts(10);

    expect(products).toHaveLength(10);
  });
});
