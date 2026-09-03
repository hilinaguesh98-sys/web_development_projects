import { useState } from "react";
import PropTypes from "prop-types";

function OrderForm({ total, onClose }) {
  const [formData, setFormData] = useState({ name: "", phone: "", area: "" });
  const phoneIsValid = /^(09\d{8}|\+2519\d{8})$/.test(formData.phone);
  const formIsValid = formData.name.trim() && phoneIsValid && formData.area.trim();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formIsValid) onClose();
  }

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <button className="close-button" type="button" onClick={onClose} aria-label="Close checkout">x</button>
        <h2>Delivery Information</h2>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">TeleBirr Number</label>
            <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="0953158498" />
            {formData.phone && !phoneIsValid && <p className="error-message">Enter a valid TeleBirr number.</p>}
          </div>
          <div className="form-group">
            <label htmlFor="area">Delivery Area</label>
            <input id="area" name="area" value={formData.area} onChange={handleChange} placeholder="Enter your area" />
          </div>
          <div className="checkout-total"><span>Order Total</span><strong>{total} ETB</strong></div>
          <button className="order-button" type="submit" disabled={!formIsValid}>Place Order with TeleBirr</button>
        </form>
      </div>
    </div>
  );
}

OrderForm.propTypes = {
  total: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderForm;
