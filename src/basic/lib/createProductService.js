export function createProductService(store) {
  const getProductById = productId => {
    return store.products.find(product => product.id === productId);
  };

  const findAvailableExcept = excludeId => {
    return store.products.find(item => item.id !== excludeId && item.quantity > 0);
  };

  const getRandomProduct = () => {
    return store.products[Math.floor(Math.random() * store.products.length)];
  };

  const hasEnoughStock = (productId, quantity) => {
    const product = getProductById(productId);
    return product && product.quantity >= quantity;
  };

  const updatePrice = (productId, newPrice) => {
    const productSelector = document.querySelector('#product-select');
    const productSelectorOptions = productSelector.querySelectorAll('option');

    const product = getProductById(productId);

    productSelectorOptions.forEach(option => {
      if (option.value === productId) {
        product.price = newPrice;
        option.textContent = `${product.name} - ${newPrice}원`;
      }
    });
  };

  const updateLastSelectedProductId = productId => {
    store.lastSelectedProductId = productId;
  };

  return {
    getProductById,
    findAvailableExcept,
    getRandomProduct,
    hasEnoughStock,
    updatePrice,
    updateLastSelectedProductId,
  };
}
