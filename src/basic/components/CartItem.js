const CartItem = {
  init: (productService, cartService) => {
    const cartItemsElement = document.querySelector('#cart-items');

    const { getProductById } = productService;
    const { updateCartInfo, handleChangeQuantity, handleRemoveItem } = cartService;

    cartItemsElement.addEventListener('click', event => {
      const { target } = event;

      const productId = target.dataset.productId;
      const productElement = document.querySelector(`#${productId}`);
      const product = getProductById(productId);

      if (target.classList.contains('quantity-change')) {
        handleChangeQuantity(target, productElement, productId);
      } else if (target.classList.contains('remove-item')) {
        handleRemoveItem(productId, productElement);
      }

      updateCartInfo();
    });
  },
  render: () => {},
};

export default CartItem;
