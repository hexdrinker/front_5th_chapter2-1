import { createContext, useContext } from 'react';
import { IProduct } from '../types';

export interface ProductContextType {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  getProductById: (productId: string) => IProduct | undefined;
}

const defaultContext: ProductContextType = {
  products: [],
  setProducts: () => {},
  getProductById: () => undefined,
};

export const ProductContext = createContext<ProductContextType>(defaultContext);

export const useProductContext = () => useContext(ProductContext);
