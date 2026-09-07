import { useEffect, useMemo, useReducer } from "react";

import { cartInitialState, cartReducer } from "./cartReducer";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(
    cartReducer,
    cartInitialState,
    () => JSON.parse(localStorage.getItem("addis-eats-cart") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("addis-eats-cart", JSON.stringify(items));
  }, [items]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      dispatch,
      total,
    }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

