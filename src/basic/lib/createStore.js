import { PRODUCTS } from '../constants.js';

export const createStore = () => {
  const state = {
    products: [...PRODUCTS],
    cart: [],
    lastSelected: null,
    totalAmount: 0,
    bonusPoints: 0,
    discountRate: 0,
    itemCount: 0,
    lastSelectedProductId: 0,
  };

  return state;
};
