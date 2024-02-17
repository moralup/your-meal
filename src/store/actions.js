export const addToBasket = payload => ({ type: 'ADD_TO_BASKET', payload });
export const incrementProduct = payload => ({
  type: 'INCREMENT_PRODUCT',
  payload,
});
export const decrementProduct = payload => ({
  type: 'DECREMENT_PRODUCT',
  payload,
});
