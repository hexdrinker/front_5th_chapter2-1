const AddButton = {
  init: (productService, cartService, promotionService) => {
    const select = document.querySelector('#product-select');
    const button = document.querySelector('#add-to-cart');

    const { getProductById } = productService;
    const { addCartItem } = cartService;
    const { updateLastSelectedProductId } = promotionService;

    button.addEventListener('click', () => {
      const productId = select.value;
      const product = getProductById(productId);

      if (!product || product.quantity <= 0) {
        return;
      }

      addCartItem(productId);
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
