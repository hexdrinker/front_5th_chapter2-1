const CartItem = {
  init: cartService => {
    const cartItemsElement = document.querySelector('#cart-items');

    const { updateCartItem, removeCartItem } = cartService;

    cartItemsElement.addEventListener('click', event => {
      const { target } = event;

      const productId = target.dataset.productId;
      const productElement = document.querySelector(`#${productId}`);

      if (target.classList.contains('quantity-change')) {
        const change = parseInt(target.dataset.change);
        updateCartItem(change, productElement, productId);
        return;
      }

      if (target.classList.contains('remove-item')) {
        removeCartItem(productId, productElement);
      }
    });
  },
  render: () => {},
};

export default CartItem;
