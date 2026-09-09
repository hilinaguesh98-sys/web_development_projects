import { useState } from "react";
import PropTypes from "prop-types";

import { useCartStore } from "./cart/cartStore";

function OrderForm({ onClose }) {
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const clear = useCartStore((state) => state.clear);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const phoneIsValid = /^(09\d{8}|\+2519\d{8})$/.test(
    formData.phone
  );

  const formIsValid =
    formData.name.trim() !== "" &&
    phoneIsValid &&
    formData.area.trim() !== "";

  function handleSubmit(event) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    alert(
      `Order placed successfully!

Name: ${formData.name}
Phone: ${formData.phone}
Area: ${formData.area}
Total: ${total} ETB`
    );

    clear();
    onClose();
  }

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2>Delivery Information</h2>


        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">TeleBirr Number</label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0953158498"
            />

            {formData.phone !== "" && !phoneIsValid && (
              <p className="error-message">
                Enter a valid TeleBirr number.
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="area">Delivery Area</label>

            <input
              id="area"
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Enter your area"
            />
          </div>

          <div className="checkout-total">
            <span>Order Total</span>
            <strong>{total} ETB</strong>
          </div>

          <button
            type="submit"
            className="order-button"
            disabled={!formIsValid}
          >
            Order with TeleBirr
          </button>
        </form>
      </div>
    </div>
  );
}

OrderForm.propTypes = {
  onClose: PropTypes.func,
};

OrderForm.defaultProps = {
  onClose: () => {},
};

export default OrderForm;