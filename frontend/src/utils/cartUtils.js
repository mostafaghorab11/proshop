const SHIPPING_RATE = 5.99; // Base shipping rate
const TAX_RATE = 0.15; // 15% tax rate

export const addDecimals = (num) => {
  const result = (Math.round(num * 100) / 100).toFixed(2);
  return result;
};

export const calculatePricing = (items) => {
  const subtotal = addDecimals(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const shipping = addDecimals(subtotal < 100 ? SHIPPING_RATE : 0);
  const tax = addDecimals(subtotal * TAX_RATE);
  const total = addDecimals(Number(subtotal) + Number(shipping) + Number(tax));

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
};
