"use client";

import { useCart } from "../../providers";

export default function AddToCart({ dish }) {
  const { addToCart } = useCart();

  return (
    <button
      className="primary-button"
      onClick={() => addToCart(dish)}
    >
      Add to Cart
    </button>
  );
}