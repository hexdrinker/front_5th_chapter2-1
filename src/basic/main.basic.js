import CartItem from './components/CartItem';
import CartItemList from './components/CartItemList';
import CartTotal from './components/CartTotal';
import ProductSelector from './components/ProductSelector';
import AddButton from './components/AddButton';
import StockInfo from './components/StockInfo';

import { createStore } from './lib';
import { createProductService } from './lib';
import { createCartService } from './lib';
import { createPromotionService } from './lib';

function main() {
  const store = createStore();
  const productService = createProductService(store);
  const cartService = createCartService(store, productService);
  const promotionService = createPromotionService(store, productService);

  render(store);
  initialize(store, productService, cartService);
  promotionService.initPromotions();
}

function initialize(store, productService, cartService) {
  AddButton.init(productService, cartService);
  StockInfo.init(store);
  CartItem.init(productService, cartService);
  CartTotal.init(store);
}

function render({ products }) {
  const root = document.getElementById('app');

  const cartItems = CartItemList.render();
  const cartTotal = CartTotal.render();
  const productSelector = ProductSelector.render({ products });
  const addButton = AddButton.render();
  const stockInfo = StockInfo.render();

  root.innerHTML = `
      <div class="bg-gray-100 p-8">
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <h1 class="text-2xl font-bold mb-4">장바구니</h1>
          ${cartItems}
          ${cartTotal}
          ${productSelector}
          ${addButton}
          ${stockInfo}
        </div>
      </div>
    `;
}

main();
