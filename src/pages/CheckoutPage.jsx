import React from 'react';
import { useProducts } from '../Context/ProductContext';
import LoadingState from '../components/LoadingState';

function CheckoutPage() {
  const { loading } = useProducts() || {};

  if (loading) {
    return <LoadingState variant="products" message="Preparing checkout..." count={3} />;
  }

  return <div>CheckoutPage</div>;
}

export default CheckoutPage;
