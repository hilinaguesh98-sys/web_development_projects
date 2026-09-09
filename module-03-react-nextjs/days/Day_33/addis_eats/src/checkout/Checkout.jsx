import { useRef, useState } from "react";
import PropTypes from "prop-types";

import { placeOrder } from "../api/orders.js";
import { useCartStore } from "../cart/cartStore";
import Field from "./Field.jsx";
import { validate } from "./validate.js";

const initialForm = {
  name: "",
  phone: "",
  area: "",
  notes: "",
};

function Checkout({ onClose }) {
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const clear = useCartStore((state) => state.clear);
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [serverErrors, setServerErrors] = useState({});
  const fieldRefs = useRef({});
  const errors = validate(form);
  const visibleErrors = { ...errors, ...serverErrors };

  function focusField(field) {
    fieldRefs.current[field]?.focus();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setServerErrors((current) => ({ ...current, [name]: undefined }));
    setRequestError("");
  }

  function handleBlur(event) {
    setTouched((current) => ({ ...current, [event.target.name]: true }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setRequestError("");
    setServerErrors({});

    const fields = Object.keys(initialForm);
    setTouched((current) => ({
      ...current,
      ...Object.fromEntries(fields.map((field) => [field, true])),
    }));

    const firstInvalidField = fields.find((field) => errors[field]);
    if (firstInvalidField) {
      focusField(firstInvalidField);
      return;
    }

    setSubmitting(true);
    try {
      await placeOrder(form);
      clear();
      onClose();
    } catch (error) {
      const fieldErrors = error.fieldErrors || {};
      setServerErrors(fieldErrors);
      setRequestError(error.message || "We could not place your order.");
      const firstBadField = fields.find((field) => fieldErrors[field]);
      if (firstBadField) {
        focusField(firstBadField);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <button type="button" className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Delivery Information</h2>
        <p className="checkout-subtitle">Complete your Addis Eats order.</p>

        <form className="order-form" onSubmit={handleSubmit} noValidate>
          {requestError && (
            <p className="error-message" role="alert">
              {requestError}
            </p>
          )}
          <Field
            id="name"
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name ? visibleErrors.name : ""}
            placeholder="Enter your name"
            ref={(element) => { fieldRefs.current.name = element; }}
          />
          <Field
            id="phone"
            name="phone"
            type="tel"
            label="TeleBirr Phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone ? visibleErrors.phone : ""}
            placeholder="0912345678"
            ref={(element) => { fieldRefs.current.phone = element; }}
          />
          <Field
            id="area"
            name="area"
            label="Delivery Area"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.area ? visibleErrors.area : ""}
            placeholder="Enter your area"
            ref={(element) => { fieldRefs.current.area = element; }}
          />
          <Field
            as="textarea"
            id="notes"
            name="notes"
            label="Notes (optional)"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.notes ? visibleErrors.notes : ""}
            placeholder="Apartment, landmark, or delivery notes"
            rows="3"
            ref={(element) => { fieldRefs.current.notes = element; }}
          />

          <div className="checkout-total">
            <span>Order Total</span>
            <strong>{total} ETB</strong>
          </div>
          <button type="submit" className="order-button" disabled={submitting}>
            {submitting ? "Placing order..." : `Order with TeleBirr · ${total} ETB`}
          </button>
        </form>
      </div>
    </div>
  );
}

Checkout.propTypes = {
  onClose: PropTypes.func,
};

Checkout.defaultProps = {
  onClose: () => {},
};

export default Checkout;