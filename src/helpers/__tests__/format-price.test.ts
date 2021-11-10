import { formatPrice } from '../format-price';

describe('Helpers -> Format Price', () => {
  it('should format integer price correctly', () => {
    const price = formatPrice('$', 10);

    expect(price).toBe('$10.00');
  });

  it('should format float price correctly', () => {
    const price = formatPrice('$', 40.32);

    expect(price).toBe('$40.32');
  });

  it('should format hundreds correctly', () => {
    const price = formatPrice('$', 100.86);
    const price2 = formatPrice('$', 250.86);

    expect(price).toBe('$100.86');
    expect(price2).toBe('$250.86');
  });

  it('should format thousands correctly', () => {
    const price = formatPrice('$', 2700.86);
    const price2 = formatPrice('$', 32000);

    expect(price).toBe('$2,700.86');
    expect(price2).toBe('$32,000.00');
  });
});
