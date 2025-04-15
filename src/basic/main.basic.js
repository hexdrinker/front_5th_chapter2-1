import {
  BULK_DISCOUNT_RATE,
  PRODUCTS,
  RECOMMEND_DISCOUNT_RATE,
  TUESDAY_DISCOUNT_RATE,
  BULK_THRESHOLD,
  POINTS_RATIO,
  LOW_STOCK_THRESHOLD,
  QUANTITY_DISCOUNT_RATE,
  CSS_CLASSES,
  CSS_IDS,
} from "./constants";

const ShoppingCart = (function () {
  let products, sel, addButton, cartDisp, sum, stockInfo;
  let lastSel = null;
  let bonusPoints = 0;
  let totalAmount = 0;
  let itemCount = 0;

  function main() {
    products = PRODUCTS;

    const root = document.getElementById("app");
    let cont = document.createElement("div");
    var wrap = document.createElement("div");
    let hTxt = document.createElement("h1");
    cartDisp = document.createElement("div");
    sum = document.createElement("div");
    sel = document.createElement("select");
    addButton = document.createElement("button");
    stockInfo = document.createElement("div");

    cartDisp.id = CSS_IDS.CART_ITEMS;
    sum.id = CSS_IDS.CART_TOTAL;
    sel.id = CSS_IDS.PRODUCT_SELECT;
    addButton.id = CSS_IDS.ADD_BUTTON;
    stockInfo.id = CSS_IDS.STOCK_INFO;

    cont.className = CSS_CLASSES.CONTAINER;
    wrap.className = CSS_CLASSES.WRAPPER;
    hTxt.className = CSS_CLASSES.HEADING;
    sum.className = CSS_CLASSES.TOTAL;
    sel.className = CSS_CLASSES.SELECT;
    addButton.className = CSS_CLASSES.BUTTON;
    stockInfo.className = CSS_CLASSES.STOCK_INFO;

    hTxt.textContent = "장바구니";
    addButton.textContent = "추가";

    updateSelOpts();

    wrap.appendChild(hTxt);
    wrap.appendChild(cartDisp);
    wrap.appendChild(sum);
    wrap.appendChild(sel);
    wrap.appendChild(addButton);
    wrap.appendChild(stockInfo);
    cont.appendChild(wrap);
    root.appendChild(cont);

    calcCart();

    setTimeout(function () {
      setInterval(function () {
        var luckyItem = products[Math.floor(Math.random() * products.length)];
        if (Math.random() < 0.3 && luckyItem.quantity > 0) {
          luckyItem.price = Math.round(luckyItem.price * SALE_DISCOUNTS.FLASH);
          alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
          updateSelOpts();
        }
      }, 30000);
    }, Math.random() * 10000);

    setTimeout(function () {
      setInterval(function () {
        if (lastSel) {
          var suggest = products.find(function (item) {
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
    sel.innerHTML = "";
    products.forEach(function (item) {
      var opt = document.createElement("option");
      opt.value = item.id;
      opt.textContent = item.name + " - " + item.price + "원";
      if (item.quantity === 0) opt.disabled = true;
      sel.appendChild(opt);
    });
  }

  function calcCart() {
    totalAmount = 0;
    itemCount = 0;
    var cartItems = cartDisp.children;
    var subTot = 0;

    for (var i = 0; i < cartItems.length; i++) {
      (function () {
        var curItem;
        for (var j = 0; j < products.length; j++) {
          if (products[j].id === cartItems[i].id) {
            curItem = products[j];
            break;
          }
        }

        var q = parseInt(
          cartItems[i].querySelector("span").textContent.split("x ")[1]
        );
        var itemTot = curItem.price * q;
        var disc = 0;
        itemCount += q;
        subTot += itemTot;

        if (q >= 10) {
          disc = QUANTITY_DISCOUNT_RATE[curItem.id];
        }

        totalAmount += itemTot * (1 - disc);
      })();
    }

    let discRate = 0;
    if (itemCount >= BULK_THRESHOLD) {
      var bulkDisc = totalAmount * BULK_DISCOUNT_RATE;
      var itemDisc = subTot - totalAmount;

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

    sum.textContent = "총액: " + Math.round(totalAmount) + "원";
    if (discRate > 0) {
      var span = document.createElement("span");
      span.className = CSS_CLASSES.DISCOUNT_SPAN;
      span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
      sum.appendChild(span);
    }

    updateStockInfo();
    renderBonusPts();
  }

  const renderBonusPts = () => {
    bonusPoints = Math.floor(totalAmount / POINTS_RATIO);
    var ptsTag = document.getElementById(CSS_IDS.LOYALTY_POINTS);
    if (!ptsTag) {
      ptsTag = document.createElement("span");
      ptsTag.id = CSS_IDS.LOYALTY_POINTS;
      ptsTag.className = CSS_CLASSES.POINTS_SPAN;
      sum.appendChild(ptsTag);
    }
    ptsTag.textContent = "(포인트: " + bonusPoints + ")";
  };

  function updateStockInfo() {
    var infoMsg = "";
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

  function handleAddButtonClick() {
    var selItem = sel.value;
    var itemToAdd = products.find(function (p) {
      return p.id === selItem;
    });

    if (itemToAdd && itemToAdd.quantity > 0) {
      var item = document.getElementById(itemToAdd.id);
      if (item) {
        var newQty =
          parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
        if (newQty <= itemToAdd.quantity) {
          item.querySelector("span").textContent =
            itemToAdd.name + " - " + itemToAdd.price + "원 x " + newQty;
          itemToAdd.quantity--;
        } else {
          alert("재고가 부족합니다.");
        }
      } else {
        var newItem = document.createElement("div");
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
        cartDisp.appendChild(newItem);
        itemToAdd.quantity--;
      }
      calcCart();
      lastSel = selItem;
    }
  }

  function handleCartItemAction(event) {
    var tgt = event.target;
    if (
      tgt.classList.contains("quantity-change") ||
      tgt.classList.contains("remove-item")
    ) {
      var prodId = tgt.dataset.productId;
      var itemElem = document.getElementById(prodId);
      var prod = products.find(function (p) {
        return p.id === prodId;
      });

      if (tgt.classList.contains("quantity-change")) {
        var qtyChange = parseInt(tgt.dataset.change);
        var newQty =
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
        var remQty = parseInt(
          itemElem.querySelector("span").textContent.split("x ")[1]
        );
        prod.quantity += remQty;
        itemElem.remove();
      }

      calcCart();
    }
  }

  return {
    init: function () {
      main();
      addButton.addEventListener("click", handleAddButtonClick);
      cartDisp.addEventListener("click", handleCartItemAction);
    },
  };
})();

ShoppingCart.init();
