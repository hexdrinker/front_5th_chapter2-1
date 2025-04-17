const AddButton = {
  init: (productService, cartService) => {
    const select = document.querySelector('#product-select');
    const button = document.querySelector('#add-to-cart');

    const { getProductById, updateLastSelectedProductId } = productService;
    const { incrementCartItemQuantity, addNewCartItem, getCartItemById, updateCartInfo } =
      cartService;

    button.addEventListener('click', () => {
      const productId = select.value;
      const product = getProductById(productId);

      if (product && product.quantity > 0) {
        const existingItem = getCartItemById(productId);
        if (existingItem) {
          incrementCartItemQuantity(productId);
        } else {
          addNewCartItem(productId);
        }
      }

      updateCartInfo();
      updateLastSelectedProductId(productId);
    });
  },

  render: () => {
    return `
      <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">
        추가
      </button>
    `;
  },
};

export default AddButton;
