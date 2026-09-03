import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Menu from "./Menu.jsx";
import { CartProvider } from "./cart/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <Menu />
    </CartProvider>
  </StrictMode>
);