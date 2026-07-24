import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiGet } from '../services/config';
import { toast } from 'sonner';

export const ProductContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);

        const [productsResponse, cartsResponse] = await Promise.all([
          apiGet('/products', { showErrorToast: false }),
          apiGet('/carts', { showErrorToast: false }),
        ]);

        // DummyJSON => { products: [...] }
        setProducts(productsResponse.products || []);

        // DummyJSON => { carts: [...] }
        setCarts(cartsResponse.carts || []);
      } catch (error) {
        console.error('Error fetching store data:', error);
        toast.error(error?.message || 'Error while loading store data');
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        carts,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
const useProducts = () => {
  const products = useContext(ProductContext);
  return products;
};

export default ProductsProvider;
export { useProducts };
