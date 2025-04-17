import {
  getCartItemElementById,
  getCartItemQuantityFromElement,
  addNewCartItemElement,
  updateCartItemElement,
  updateCartTotalElement,
  updateStockStatusElement,
} from '../utils';
import {
  QUANTITY_DISCOUNT_RATE,
  BULK_DISCOUNT_RATE,
  BULK_DISCOUNT_THRESHOLD,
  TUESDAY_DISCOUNT_RATE,
  CART_ITEMS_ID,
} from '../constants';

export const createCartService = (store, productService) => {
  const getCartItemById = productId => {
    return store.cart.find(item => item.productId === productId);
  };

  const incrementCartItemQuantity = productId => {
    const product = productService.getProductById(productId);
    const cartItem = getCartItemById(productId);
    const cartItemElement = getCartItemElementById(productId);
    const newQuantity = cartItem.quantity + 1;

    if (!product || product.quantity <= newQuantity) {
      alert('재고가 부족합니다.');
      return false;
    }

    updateCartItemElement(cartItemElement, product, newQuantity);

    cartItem.quantity += 1;
    product.quantity -= 1;
    return true;
  };

  const addNewCartItem = productId => {
    const product = productService.getProductById(productId);

    addNewCartItemElement(product);
    store.cart.push({ productId, quantity: 1 });
    product.quantity -= 1;

    return true;
  };

  const addCartItem = productId => {
    const cartItem = getCartItemById(productId);

    if (!cartItem) {
      addNewCartItem(productId);
    } else {
      incrementCartItemQuantity(productId);
    }

    updateCartInfo();
  };

  const hasEnoughStock = (productQuantity, change) => {
    if (change < 0) {
      return true;
    }

    return change <= productQuantity;
  };

  const updateCartItem = (change, productId) => {
    const product = productService.getProductById(productId);
    const cartItem = getCartItemById(productId);
    const cartItemElement = getCartItemElementById(productId);
    const quantity = cartItem.quantity;
    const newQuantity = quantity + change;

    if (!hasEnoughStock(product.quantity, change)) {
      alert('재고가 부족합니다.');
      return;
    }

    if (newQuantity <= 0) {
      store.cart = store.cart.filter(item => item.productId !== productId);
      product.quantity -= change;
      cartItemElement.remove();
    } else {
      updateCartItemElement(cartItemElement, product, newQuantity);
      product.quantity -= change;
      cartItem.quantity += change;
    }

    updateCartInfo();
  };

  const removeCartItem = productId => {
    const product = productService.getProductById(productId);
    const cartItem = getCartItemById(productId);
    const cartItemElement = getCartItemElementById(productId);
    const quantity = cartItem.quantity;

    store.cart = store.cart.filter(item => item.productId !== productId);
    product.quantity += quantity;

    cartItemElement.remove();
    updateCartInfo();
  };

  const updateCartInfo = () => {
    const cartInfo = getCartInfo();
    store.totalAmount = cartInfo.totalAmount;
    store.itemCount = cartInfo.itemCount;
    store.discountRate = cartInfo.discountRate;

    updateCartTotal(store.totalAmount, store.discountRate);

    updateStockStatusElement(store.products);
  };

  const getCartInfo = () => {
    let totalAmount = 0;
    let itemCount = 0;
    let subTot = 0;

    const cartItemsElement = document.querySelector(`#${CART_ITEMS_ID}`);
    const cartItems = cartItemsElement.children;

    for (let i = 0; i < cartItems.length; i++) {
      const currentItem = productService.getProductById(cartItems[i].id);
      const quantity = getCartItemQuantityFromElement(cartItems[i]);
      const currentItemTotal = currentItem.price * quantity;
      let disc = 0;
      itemCount += quantity;
      subTot += currentItemTotal;

      if (quantity >= 10) {
        disc = QUANTITY_DISCOUNT_RATE[currentItem.id] || 0;
      }

      totalAmount += currentItemTotal * (1 - disc);
    }

    let discRate = 0;
    if (itemCount >= BULK_DISCOUNT_THRESHOLD) {
      const bulkDisc = totalAmount * BULK_DISCOUNT_RATE;
      const itemDisc = subTot - totalAmount;

      if (bulkDisc > itemDisc) {
        totalAmount = subTot * (1 - BULK_DISCOUNT_RATE);
        discRate = BULK_DISCOUNT_RATE;
      } else {
        discRate = (subTot - totalAmount) / subTot;
      }
    } else {
      discRate = (subTot - totalAmount) / subTot;
    }

    if (new Date().getDay() === 2) {
      totalAmount *= 1 - TUESDAY_DISCOUNT_RATE;
      discRate = Math.max(discRate, TUESDAY_DISCOUNT_RATE);
    }

    return {
      totalAmount: Math.round(totalAmount),
      itemCount: itemCount,
      discountRate: discRate,
    };
  };

  const updateCartTotal = (totalAmount, discountRate) => {
    updateCartTotalElement(totalAmount, discountRate);
  };

  return {
    getCartItemById,
    addCartItem,
    updateCartItem,
    removeCartItem,
  };
};
