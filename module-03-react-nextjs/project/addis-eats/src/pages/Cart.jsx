import { Link } from 'react-router-dom';
import { useCart } from '../cart/useCart';

export default function CartPage() {
  const { cart, subtotal, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const deliveryFee = cart.length > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="container page-section center-content">
        <div className="empty-state">
          <h3>Your Cart Is Empty</h3>
          <Link to="/menu" className="primary-button">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page-section cart-page">
      <div className="cart-items-wrap">
        {cart.map((item) => (
          <div key={item.id} className="cart-item-card">
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-main">
              <h3>{item.name}</h3>
              <p>{item.price} ETB</p>

              <div className="quantity-control">
                <button type="button" onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
            </div>

            <div className="cart-item-side">
              <div className="item-subtotal">{item.price * item.quantity} ETB</div>
              <button type="button" className="text-button danger-link" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="summary-box">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{subtotal} ETB</strong>
        </div>

        <div className="summary-row">
          <span>Delivery</span>
          <strong>{deliveryFee} ETB</strong>
        </div>

        <div className="summary-row total-row">
          <span>Total</span>
          <strong>{total} ETB</strong>
        </div>

        <Link to="/checkout" className="primary-button full-width">
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  );
}
