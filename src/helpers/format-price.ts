export const formatPrice = (currency: string, value: number): string => {
  return `${currency}${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};
