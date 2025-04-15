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

const ShoppingCart = (function () {
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
    setTimeout(function () {
      setInterval(function () {
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
    setTimeout(function () {
      setInterval(function () {
        if (lastSel) {
          let suggest = products.find(function (item) {
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

  function updateSelOpts() {
    productSelector.innerHTML = "";
    products.forEach(function (item) {
      let opt = document.createElement("option");
      opt.value = item.id;
      opt.textContent = item.name + " - " + item.price + "원";
      if (item.quantity === 0) opt.disabled = true;
      productSelector.appendChild(opt);
    });
  }

  function calcCart() {
    totalAmount = 0;
    itemCount = 0;
    let cartItems = cartItemsWrapper.children;
    let subTot = 0;

    for (let i = 0; i < cartItems.length; i++) {
      (function () {
        let curItem;
        for (let j = 0; j < products.length; j++) {
          if (products[j].id === cartItems[i].id) {
            curItem = products[j];
            break;
          }
        }

        let q = parseInt(
          cartItems[i].querySelector("span").textContent.split("x ")[1]
        );
        let itemTot = curItem.price * q;
        let disc = 0;
        itemCount += q;
        subTot += itemTot;

        if (q >= 10) {
          disc = QUANTITY_DISCOUNT_RATE[curItem.id];
        }

        totalAmount += itemTot * (1 - disc);
      })();
    }

    let discRate = 0;
    if (itemCount >= BULK_DISCOUNT_THRESHOLD) {
      let bulkDisc = totalAmount * BULK_DISCOUNT_RATE;
      let itemDisc = subTot - totalAmount;

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

    cartTotal.textContent = "총액: " + Math.round(totalAmount) + "원";
    if (discRate > 0) {
      let span = document.createElement("span");
      span.className = CSS_CLASSES.DISCOUNT_SPAN;
      span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
      cartTotal.appendChild(span);
    }

    updateStockInfo();
    renderBonusPts();
  }

  const renderBonusPts = () => {
    bonusPoints = Math.floor(totalAmount / POINTS_RATIO);
    let ptsTag = document.getElementById(CSS_IDS.LOYALTY_POINTS);
    if (!ptsTag) {
      ptsTag = document.createElement("span");
      ptsTag.id = CSS_IDS.LOYALTY_POINTS;
      ptsTag.className = CSS_CLASSES.POINTS_SPAN;
      cartTotal.appendChild(ptsTag);
    }
    ptsTag.textContent = "(포인트: " + bonusPoints + ")";
  };

  function updateStockInfo() {
    let infoMsg = "";
    products.forEach(function (item) {
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

  function initEventListeners() {
    addButton.addEventListener("click", handleAddButtonClick);
    cartItemsWrapper.addEventListener("click", handleCartItemAction);
  }

  function handleAddButtonClick() {
    let selItem = productSelector.value;
    let itemToAdd = products.find(function (p) {
      return p.id === selItem;
    });

    if (itemToAdd && itemToAdd.quantity > 0) {
      let item = document.getElementById(itemToAdd.id);
      if (item) {
        let newQty =
          parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
        if (newQty <= itemToAdd.quantity) {
          item.querySelector("span").textContent =
            itemToAdd.name + " - " + itemToAdd.price + "원 x " + newQty;
          itemToAdd.quantity--;
        } else {
          alert("재고가 부족합니다.");
        }
      } else {
        let newItem = document.createElement("div");
        newItem.id = itemToAdd.id;
        newItem.className = CSS_CLASSES.CART_ITEM;
        newItem.innerHTML =
          "<span>" +
          itemToAdd.name +
          " - " +
          itemToAdd.price +
          "원 x 1</span><div>" +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          itemToAdd.id +
          '" data-change="-1">-</button>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          itemToAdd.id +
          '" data-change="1">+</button>' +
          '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
          itemToAdd.id +
          '">삭제</button></div>';
        cartItemsWrapper.appendChild(newItem);
        itemToAdd.quantity--;
      }
      calcCart();
      lastSel = selItem;
    }
  }

  function handleCartItemAction(event) {
    let tgt = event.target;
    if (
      tgt.classList.contains("quantity-change") ||
      tgt.classList.contains("remove-item")
    ) {
      let prodId = tgt.dataset.productId;
      let itemElem = document.getElementById(prodId);
      let prod = products.find(function (p) {
        return p.id === prodId;
      });

      if (tgt.classList.contains("quantity-change")) {
        let qtyChange = parseInt(tgt.dataset.change);
        let newQty =
          parseInt(itemElem.querySelector("span").textContent.split("x ")[1]) +
          qtyChange;

        if (
          newQty > 0 &&
          newQty <=
            prod.quantity +
              parseInt(
                itemElem.querySelector("span").textContent.split("x ")[1]
              )
        ) {
          itemElem.querySelector("span").textContent =
            itemElem.querySelector("span").textContent.split("x ")[0] +
            "x " +
            newQty;
          prod.quantity -= qtyChange;
        } else if (newQty <= 0) {
          itemElem.remove();
          prod.quantity -= qtyChange;
        } else {
          alert("재고가 부족합니다.");
        }
      } else if (tgt.classList.contains("remove-item")) {
        let remQty = parseInt(
          itemElem.querySelector("span").textContent.split("x ")[1]
        );
        prod.quantity += remQty;
        itemElem.remove();
      }

      calcCart();
    }
  }

  return {
    init,
  };
})();

ShoppingCart.init();
