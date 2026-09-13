import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useauth';
import { useCart } from '../cart/useCart';

const deliveryFees = {
  Bole: 150,
  Piassa: 250,
  Megenagna: 100,
  Kazanchis: 250,
  Mexico: 200,
};

export default function Checkout() {
  const { user, signIn } = useAuth();
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ name: '', phone: '' });
  const [loginErrors, setLoginErrors] = useState({});
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    area: '',
    instructions: '',
  });
  const [errors, setErrors] = useState({});

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const deliveryFee = useMemo(() => {
    return deliveryFees[form.area] || 0;
  }, [form.area]);

  const total = subtotal + deliveryFee;

  const validatePhone = (phone) => /^09\d{8}$/.test(phone.trim());

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!loginForm.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!validatePhone(loginForm.phone)) {
      nextErrors.phone = 'Enter a valid Ethiopian phone number.';
    }

    setLoginErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      signIn(loginForm.name, loginForm.phone);
      setForm({
        name: loginForm.name,
        phone: loginForm.phone,
        area: '',
        instructions: '',
      });
    }
  };

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Full name is required.';
    }

    if (!validatePhone(form.phone)) {
      nextErrors.phone = 'Enter a valid Ethiopian phone number.';
    }

    if (!form.area) {
      nextErrors.area = 'Please select a delivery area.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem('addisEatsOrders') || '[]');

    const newOrder = {
      id: Date.now(),
      customerName: form.name.trim(),
      phone: form.phone.trim(),
      area: form.area,
      instructions: form.instructions.trim(),
      items: cart,
      subtotal,
      deliveryFee,
      total,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('addisEatsOrders', JSON.stringify([...savedOrders, newOrder]));
    clearCart();
    navigate('/order-confirmation', { state: { order: newOrder } });
  };

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Sign in to continue</h2>
          <p className="subtle-text">Please enter your name and phone number to checkout.</p>

          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="field-group">
              <label htmlFor="loginName">Name</label>
              <input
                id="loginName"
                type="text"
                value={loginForm.name}
                onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                placeholder="Your name"
              />
              {loginErrors.name && <span className="error-message">{loginErrors.name}</span>}
            </div>

            <div className="field-group">
              <label htmlFor="loginPhone">Phone Number</label>
              <input
                id="loginPhone"
                type="tel"
                value={loginForm.phone}
                onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                placeholder="0912345678"
              />
              {loginErrors.phone && <span className="error-message">{loginErrors.phone}</span>}
            </div>

            <button type="submit" className="primary-button full-width">
              Continue to Checkout
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-grid">
        <div className="checkout-card">
          <h2>Checkout</h2>

          <form onSubmit={handleCheckoutSubmit} className="checkout-form">
            <div className="field-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="field-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="field-group">
              <label htmlFor="deliveryArea">Delivery Area</label>
              <select
                id="deliveryArea"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
              >
                <option value="">Select area</option>
                {Object.keys(deliveryFees).map((area) => (
                  <option key={area} value={area}>
                    {area} ({deliveryFees[area]} ETB)
                  </option>
                ))}
              </select>
              {errors.area && <span className="error-message">{errors.area}</span>}
            </div>

            <div className="field-group">
              <label htmlFor="instructions">Special Instructions</label>
              <textarea
                id="instructions"
                rows="4"
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                placeholder="e.g., gate code or delivery note"
              />
            </div>

            <button type="submit" className="primary-button full-width">
              Place Order
            </button>
          </form>
        </div>

        <aside className="order-summary-card">
          <h3>Order Summary</h3>

          {cart.length === 0 ? (
            <p className="empty-cart-text">Your cart is empty.</p>
          ) : (
            <>
              <div className="summary-lines">
                <div className="summary-row">
                  <span>Items</span>
                  <strong>{totalItems}</strong>
                </div>
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
              </div>

              <div className="mini-cart-list">
                {cart.map((item) => (
                  <div key={item.id} className="mini-cart-item">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <strong>{item.price * item.quantity} ETB</strong>
                  </div>
                ))}
              </div>
            </>
          )}

          <Link to="/cart" className="secondary-button full-width">
            Edit Cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
