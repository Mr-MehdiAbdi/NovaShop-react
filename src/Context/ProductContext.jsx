import React, { createContext, useEffect, useState } from 'react';
import { apiGet } from '../services/config';
import { toast } from 'sonner';

export const ProductContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await apiGet('/products', { showErrorToast: false });

        // DummyJSON => { products: [...] }
        setProducts(response.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error(error?.message || 'Error while loading products');
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductsProvider;
