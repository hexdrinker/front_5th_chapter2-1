import {
  BULK_DISCOUNT_RATE,
  PRODUCTS,
  RECOMMEND_DISCOUNT_RATE,
  TUESDAY_DISCOUNT_RATE,
  BULK_DISCOUNT_THRESHOLD,
  POINTS_RATIO,
  LOW_STOCK_THRESHOLD,
  QUANTITY_DISCOUNT_RATE,
  CSS_CLASSES,
  CSS_IDS,
  FLASH_SALE_DISCOUNT_RATE,
} from "./constants";

const ShoppingCart = (() => {
  let products,
    productSelector,
    addButton,
    cartItemsWrapper,
    cartTotal,
    stockInfo;
  let lastSel = null;
  let bonusPoints = 0;
  let totalAmount = 0;
  let itemCount = 0;

  // initializers
  function init() {
    initializeProducts();
    initializeUI();
    initEventListeners();
    initPromotions();
    updateSelOpts();
    calcCart();
  }

  function initializeProducts() {
    products = PRODUCTS;
  }

  function initializeUI() {
    const root = document.getElementById("app");
    let container = document.createElement("div");
    let wrapper = document.createElement("div");
    let title = document.createElement("h1");
    cartItemsWrapper = document.createElement("div");
    cartTotal = document.createElement("div");
    productSelector = document.createElement("select");
    addButton = document.createElement("button");
    stockInfo = document.createElement("div");

    cartItemsWrapper.id = CSS_IDS.CART_ITEMS;
    cartTotal.id = CSS_IDS.CART_TOTAL;
    productSelector.id = CSS_IDS.PRODUCT_SELECT;
    addButton.id = CSS_IDS.ADD_BUTTON;
    stockInfo.id = CSS_IDS.STOCK_INFO;

    container.className = CSS_CLASSES.CONTAINER;
    wrapper.className = CSS_CLASSES.WRAPPER;
    title.className = CSS_CLASSES.HEADING;
    cartTotal.className = CSS_CLASSES.TOTAL;
    productSelector.className = CSS_CLASSES.SELECT;
    addButton.className = CSS_CLASSES.BUTTON;
    stockInfo.className = CSS_CLASSES.STOCK_INFO;

    title.textContent = "장바구니";
    addButton.textContent = "추가";

    wrapper.appendChild(title);
    wrapper.appendChild(cartItemsWrapper);
    wrapper.appendChild(cartTotal);
    wrapper.appendChild(productSelector);
    wrapper.appendChild(addButton);
    wrapper.appendChild(stockInfo);
    container.appendChild(wrapper);
    root.appendChild(container);
  }

  function initPromotions() {
    initFlashSalePromotion();
    initRecommendationPromotion();
  }

  function initFlashSalePromotion() {
    setTimeout(() => {
      setInterval(() => {
        let luckyItem = products[Math.floor(Math.random() * products.length)];
        if (Math.random() < 0.3 && luckyItem.quantity > 0) {
          luckyItem.price = Math.round(
            luckyItem.price * FLASH_SALE_DISCOUNT_RATE
          );
          alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
          updateSelOpts();
        }
      }, 30000);
    }, Math.random() * 10000);
  }

  function initRecommendationPromotion() {
    setTimeout(() => {
      setInterval(() => {
        if (lastSel) {
          let suggest = products.find(item => {
            return item.id !== lastSel && item.quantity > 0;
          });
          if (suggest) {
            alert(
              suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!"
            );
            suggest.price = Math.round(suggest.price * RECOMMEND_DISCOUNT_RATE);
            updateSelOpts();
          }
        }
      }, 60000);
    }, Math.random() * 20000);
  }

  // logic

  function updateSelOpts() {
    productSelector.innerHTML = "";

    products.forEach(item => {
      let opt = document.createElement("option");
      opt.value = item.id;
      opt.textContent = item.name + " - " + item.price + "원";
      if (item.quantity === 0) opt.disabled = true;
      productSelector.appendChild(opt);
    });
  }

  function getCartInfo() {
    let totalAmount = 0;
    let itemCount = 0;
    let subTot = 0;
    const cartItems = cartItemsWrapper.children;

    for (let i = 0; i < cartItems.length; i++) {
      const currentItem = getProductById(cartItems[i].id);
      const quantity = getQuantityFromElement(cartItems[i]);
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
      discRate: discRate,
    };
  }

  function calcCart() {
    const cartInfo = getCartInfo();
    totalAmount = cartInfo.totalAmount;
    itemCount = cartInfo.itemCount;
    renderCart(cartInfo);
  }

  function updateStockInfo() {
    let infoMsg = "";
    products.forEach(item => {
      if (item.quantity < LOW_STOCK_THRESHOLD) {
        infoMsg +=
          item.name +
          ": " +
          (item.quantity > 0
            ? "재고 부족 (" + item.quantity + "개 남음)"
            : "품절") +
          "\n";
      }
    });
    stockInfo.textContent = infoMsg;
  }

  // event listeners

  function initEventListeners() {
    addButton.addEventListener("click", handleClickAddButton);
    cartItemsWrapper.addEventListener("click", handleClickCartItemsWrapper);
  }

  function handleClickAddButton() {
    const productId = productSelector.value;
    const product = getProductById(productId);

    if (product && product.quantity > 0) {
      const existingItem = document.getElementById(product.id);
      if (existingItem) {
        incrementCartItemQuantity(existingItem, product);
      } else {
        addNewCartItem(product);
      }

      calcCart();
      lastSel = productId;
    }
  }

  function incrementCartItemQuantity(productElement, product) {
    const newQuantity = getQuantityFromElement(productElement) + 1;
    if (newQuantity <= product.quantity) {
      updateCartItemQuantity(productElement, product, newQuantity);
      product.quantity--;
    } else {
      alert("재고가 부족합니다.");
    }
  }

  function addNewCartItem(product) {
    const newItem = createCartItemElement(product);
    cartItemsWrapper.appendChild(newItem);
    product.quantity--;
  }

  function handleClickCartItemsWrapper(event) {
    const { target } = event;

    if (
      !target.classList.contains("quantity-change") &&
      !target.classList.contains("remove-item")
    )
      return;

    const productId = target.dataset.productId;
    const productElement = document.getElementById(productId);
    const product = getProductById(productId);

    if (target.classList.contains("quantity-change")) {
      handleChangeQuantity(target, productElement, product);
    } else if (target.classList.contains("remove-item")) {
      handleRemoveItem(productElement, product);
    }

    calcCart();
  }

  function handleChangeQuantity(button, productElement, product) {
    const change = parseInt(button.dataset.change);
    const currentQuantity = getQuantityFromElement(productElement);
    const newQuantity = currentQuantity + change;

    if (newQuantity > 0 && hasEnoughStock(product, change, currentQuantity)) {
      updateCartItemQuantity(productElement, product, newQuantity);
      product.quantity -= change;
    } else if (newQuantity <= 0) {
      productElement.remove();
      product.quantity -= change;
    } else {
      alert("재고가 부족합니다.");
    }
  }

  function handleRemoveItem(productElement, product) {
    const quantity = getQuantityFromElement(productElement);
    product.quantity += quantity;
    productElement.remove();
  }

  function createCartItemElement(product) {
    const newItem = document.createElement("div");
    newItem.id = product.id;
    newItem.className = CSS_CLASSES.CART_ITEM;

    newItem.innerHTML =
      "<span>" +
      product.name +
      " - " +
      product.price +
      "원 x 1</span><div>" +
      '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
      product.id +
      '" data-change="-1">-</button>' +
      '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
      product.id +
      '" data-change="1">+</button>' +
      '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
      product.id +
      '">삭제</button></div>';

    return newItem;
  }

  // utils

  function getProductById(id) {
    return products.find(product => product.id === id);
  }

  function hasEnoughStock(product, change, currentQuantity) {
    return (
      change < 0 ||
      currentQuantity + change <= product.quantity + currentQuantity
    );
  }

  function getQuantityFromElement(element) {
    return parseInt(element.querySelector("span").textContent.split("x ")[1]);
  }

  // render functions
  function renderBonusPoints() {
    bonusPoints = Math.floor(totalAmount / POINTS_RATIO);
    let pointElement = document.getElementById(CSS_IDS.LOYALTY_POINTS);

    if (!pointElement) {
      pointElement = document.createElement("span");
      pointElement.id = CSS_IDS.LOYALTY_POINTS;
      pointElement.className = CSS_CLASSES.POINTS_SPAN;
      cartTotal.appendChild(pointElement);
    }
    pointElement.textContent = "(포인트: " + bonusPoints + ")";
  }

  function renderCart(cartInfo) {
    renderCartTotal(cartInfo);
    updateStockInfo();
    renderBonusPoints();
  }

  function renderCartTotal(cartInfo) {
    cartTotal.textContent = `총액: ${cartInfo.totalAmount}원`;

    if (cartInfo.discRate > 0) {
      const discountSpan = document.createElement("span");
      discountSpan.className = CSS_CLASSES.DISCOUNT_SPAN;
      discountSpan.textContent = `(${(cartInfo.discRate * 100).toFixed(1)}% 할인 적용)`;
      cartTotal.appendChild(discountSpan);
    }
  }

  function updateCartItemQuantity(productElement, product, newQuantity) {
    productElement.querySelector("span").textContent =
      `${product.name} - ${product.price}원 x ${newQuantity}`;
  }

  return {
    init,
  };
})();

ShoppingCart.init();
