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
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import DishManager from './admin/DishManager';
import OrderManager from './admin/OrderManager';
import RequireAdmin from './admin/RequireAdmin';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<RequireAdmin />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dishes" element={<DishManager />} />
                <Route path="orders" element={<OrderManager />} />
              </Route>
            </Route>
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

