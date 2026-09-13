import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { AuthProvider } from './auth/AuthContext';
import { CartProvider } from './cart/cartcontext';
import Checkout from './checkout/checkout';
import MenuPage from './menu/menu';
import CartPage from './pages/Cart';
import DishDetails from './pages/DishDetails';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/menu/:id" element={<DishDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

