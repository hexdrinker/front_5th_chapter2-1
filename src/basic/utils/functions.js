import { CSS_CLASSES, CSS_IDS, POINTS_RATIO, LOW_STOCK_THRESHOLD } from '../constants';

function getQuantityFromElement(element) {
  return parseInt(element.querySelector('span').textContent.split('x ')[1]);
}

function createCartItemElement(product) {
  const newItem = document.createElement('div');
  newItem.id = product.id;
  newItem.className = CSS_CLASSES.CART_ITEM;

  newItem.innerHTML = `
      <span>${product.name} - ${product.price}원 x 1</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
                data-product-id="${product.id}" 
                data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
                data-product-id="${product.id}" 
                data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" 
                data-product-id="${product.id}">삭제</button>
      </div>
    `;

  return newItem;
}

function updateCartItemQuantity(productElement, product, newQuantity) {
  productElement.querySelector('span').textContent =
    `${product.name} - ${product.price}원 x ${newQuantity}`;
}

function updateCartTotalElement(totalAmount, discountRate) {
  const bonusPoints = Math.floor(totalAmount / POINTS_RATIO);

  const cartTotalElement = document.querySelector('#cart-total');

  cartTotalElement.textContent = `총액: ${totalAmount}원`;

  if (discountRate > 0) {
    renderDiscountRate(cartTotalElement, discountRate);
  }
  renderBonusPoints(cartTotalElement, bonusPoints);
}

function renderBonusPoints(cartTotal, bonusPoints) {
  let pointElement = document.getElementById(CSS_IDS.LOYALTY_POINTS);

  if (!pointElement) {
    pointElement = document.createElement('span');
    pointElement.id = CSS_IDS.LOYALTY_POINTS;
    pointElement.className = CSS_CLASSES.POINTS_SPAN;
    cartTotal.appendChild(pointElement);
  }
  pointElement.textContent = `(포인트: ${bonusPoints})`;
}

function renderDiscountRate(cartTotal, discountRate) {
  const discountSpan = document.createElement('span');
  discountSpan.className = CSS_CLASSES.DISCOUNT_SPAN;
  discountSpan.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
  cartTotal.appendChild(discountSpan);
}

function updateStockInfo(products) {
  const wrapper = document.querySelector('#stock-status');
  let message = '';
  products.forEach(item => {
    if (item.quantity < LOW_STOCK_THRESHOLD) {
      message += `${item.name}: ${item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)\n` : '품절\n'}`;
    }
  });
  wrapper.innerHTML = message;
}

export {
  getQuantityFromElement,
  createCartItemElement,
  updateCartItemQuantity,
  updateCartTotalElement,
  updateStockInfo,
};
