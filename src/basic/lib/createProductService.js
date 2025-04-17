export function createProductService(store) {
  const getProductById = productId => {
    return store.products.find(product => product.id === productId);
  };

  const getProductBySuggestion = excludedProductId => {
    return store.products.find(product => product.id !== excludedProductId && product.quantity > 0);
  };

  const getRandomProduct = () => {
    return store.products[Math.floor(Math.random() * store.products.length)];
  };

  const hasEnoughStock = (productId, quantity) => {
    const product = getProductById(productId);
    return !!product && product.quantity >= quantity;
  };

  // 프로모션 시 상품 가격 변경
  const updateProductPrice = (productId, newPrice) => {
    const productSelector = document.querySelector('#product-select');
    const productOptions = productSelector.querySelectorAll('option');
    const product = getProductById(productId);

    for (const option of productOptions) {
      if (option.value !== productId) {
        continue;
      }
      product.price = newPrice;
      option.textContent = `${product.name} - ${newPrice}원`;
    }
  };

  return {
    getProductById,
    getProductBySuggestion,
    getRandomProduct,
    hasEnoughStock,
    updateProductPrice,
  };
}
