import { Route, Routes } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import PageNotFound from './pages/PageNotFound';
import ProductsProvider from './Context/ProductContext';
import MainPage from './pages/MainPage';
import ThemeProvider from './Context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ProductsProvider>
    </ThemeProvider>
  );
}

export default App;
