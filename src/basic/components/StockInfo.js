import { updateStockInfo } from '../utils/functions.js';

const StockInfo = {
  init: store => {
    updateStockInfo(store.products);
  },
  render: () => {
    return `<div id="stock-status" class="text-sm text-gray-500 mt-2"></div>`;
  },
};

export default StockInfo;
