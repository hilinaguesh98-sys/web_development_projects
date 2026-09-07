import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Layout from "./Layout.jsx";
import Menu from "./Menu.jsx";
import DishDetail from "./DishDetail.jsx";
import OrderForm from "./OrderForm.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";

function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.from?.pathname || "/";

  return (
    <main className="status-state">
      <h2>Sign in to checkout</h2>
      <p>Use the button below to continue with your order.</p>
      <button type="button" onClick={() => { localStorage.setItem("addis-eats-auth", "true"); navigate(destination, { replace: true }); }}>
        Sign in
      </button>
    </main>
  );
}

function NotFound() {
  return (
    <main className="status-state">
      <h2>Page not found</h2>
      <a href="/">Return to the menu</a>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Menu />} />
        <Route path="menu/:id" element={<DishDetail />} />
        <Route path="signin" element={<SignIn />} />
        <Route
          path="checkout"
          element={
            <RequireAuth>
              <OrderForm />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;