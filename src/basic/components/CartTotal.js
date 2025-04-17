import { updateCartTotalElement } from '../utils/functions.js';

const CartTotal = {
  init: ({ totalAmount, discountRate }) => {
    updateCartTotalElement(totalAmount, discountRate);
  },
  render: () => {
    return `<div id="cart-total" class="text-xl font-bold my-4"></div>`;
  },
};

export default CartTotal;
