import { useCallback, useMemo, useState } from 'react';
import { ProductContext, ProductContextType } from './ProductContext';
import { PRODUCTS } from '../constants';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);

  const getProductById = useCallback(
    (productId: string) => products.find(product => product.id === productId),
    [products]
  );

  const value = useMemo<ProductContextType>(
    () => ({ products, setProducts, getProductById }),
    [products, getProductById]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
