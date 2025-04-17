import React from "react";
import { ICartItem } from "../types";

interface CartItemListProps {
  cartItems: ICartItem[];
  onChangeQuantity: (productId: string, change: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartItemList: React.FC<CartItemListProps> = ({
  cartItems,
  onChangeQuantity,
  onRemoveItem,
}) => {
  return (
    <div id="cart-items">
      {!cartItems.length
        ? "장바구니가 비어 있습니다."
        : cartItems.map(item => (
            <div
              key={item.id}
              id={item.id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.name} - {item.price.toLocaleString()}원 x {item.quantity}
              </span>
              <div>
                <button
                  className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                  data-product-id={item.id}
                  data-change="-1"
                  onClick={() => onChangeQuantity(item.id, -1)}
                >
                  -
                </button>
                <button
                  className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                  data-product-id={item.id}
                  data-change="1"
                  onClick={() => onChangeQuantity(item.id, 1)}
                >
                  +
                </button>
                <button
                  className="remove-item bg-red-500 text-white px-2 py-1 rounded"
                  data-product-id={item.id}
                  onClick={() => onRemoveItem(item.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};
