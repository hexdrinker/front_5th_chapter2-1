import { STOCK_STATUS_ID } from '../constants';
import { updateStockStatusElement } from '../utils';

const StockInfo = {
  init: store => {
    updateStockStatusElement(store.products);
  },
  render: () => {
    return `<div id="${STOCK_STATUS_ID}" class="text-sm text-gray-500 mt-2"></div>`;
  },
};

export default StockInfo;
