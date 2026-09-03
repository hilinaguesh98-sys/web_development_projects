import { useMemo, useReducer } from "react";

import { cartInitialState, cartReducer } from "./cartReducer";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, cartInitialState);

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

