export const formatPrice = (value: number, currency: string) => {
  return `${(value / 100).toFixed(2)} ${currency}`;
};
