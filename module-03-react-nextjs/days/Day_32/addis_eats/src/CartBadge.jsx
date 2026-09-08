import { useCartStore } from "./cart/cartStore";

function CartBadge() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null;
}

export default CartBadge;