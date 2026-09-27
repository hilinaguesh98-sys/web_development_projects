"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function CartContent() {
  const {
    cart,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <section className="simple-page">
      <span className="eyebrow">YOUR ORDER</span>

      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div>🛒</div>

          <h2>Your cart is empty</h2>

          <p>
            Add something delicious from the menu.
          </p>

          <Link href="/menu" className="primary-button">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="cart-card">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-food">
                {item.emoji}
              </div>

              <div>
                <h2>{item.name}</h2>

                <p>
                  {item.quantity} × {item.price} ETB
                </p>
              </div>

              <strong>
                {item.quantity * item.price} ETB
              </strong>

              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-total">
            <span>Total ({totalItems} items)</span>
            <strong>{totalPrice} ETB</strong>
          </div>

          <Link
            href="/checkout"
            className="primary-button full-button"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}

      <Link href="/menu" className="back-link">
        ← Continue Shopping
      </Link>
    </section>
  );
}