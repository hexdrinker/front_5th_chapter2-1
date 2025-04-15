const PRODUCTS = [
  { id: "p1", name: "상품1", price: 10000, quantity: 50 },
  { id: "p2", name: "상품2", price: 20000, quantity: 30 },
  { id: "p3", name: "상품3", price: 30000, quantity: 20 },
  { id: "p4", name: "상품4", price: 15000, quantity: 0 },
  { id: "p5", name: "상품5", price: 25000, quantity: 10 },
];

const QUANTITY_DISCOUNT_RATE = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

const BULK_DISCOUNT_RATE = 0.25;
const TUESDAY_DISCOUNT_RATE = 0.1;

const BULK_DISCOUNT_THRESHOLD = 30;
const POINTS_RATIO = 1000;
const LOW_STOCK_THRESHOLD = 5;
const FLASH_SALE_DISCOUNT_RATE = 0.8;
const RECOMMEND_DISCOUNT_RATE = 0.95;

const CSS_CLASSES = {
  CONTAINER: "bg-gray-100 p-8",
  WRAPPER:
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8",
  HEADING: "text-2xl font-bold mb-4",
  TOTAL: "text-xl font-bold my-4",
  SELECT: "border rounded p-2 mr-2",
  BUTTON: "bg-blue-500 text-white px-4 py-2 rounded",
  STOCK_INFO: "text-sm text-gray-500 mt-2",
  DISCOUNT_SPAN: "text-green-500 ml-2",
  POINTS_SPAN: "text-blue-500 ml-2",
  CART_ITEM: "flex justify-between items-center mb-2",
};

const CSS_IDS = {
  CART_ITEMS: "cart-items",
  CART_TOTAL: "cart-total",
  PRODUCT_SELECT: "product-select",
  ADD_BUTTON: "add-to-cart",
  STOCK_INFO: "stock-status",
  LOYALTY_POINTS: "loyalty-points",
};

export {
  PRODUCTS,
  QUANTITY_DISCOUNT_RATE,
  TUESDAY_DISCOUNT_RATE,
  BULK_DISCOUNT_RATE,
  BULK_DISCOUNT_THRESHOLD,
  POINTS_RATIO,
  LOW_STOCK_THRESHOLD,
  FLASH_SALE_DISCOUNT_RATE,
  RECOMMEND_DISCOUNT_RATE,
  CSS_CLASSES,
  CSS_IDS,
};
