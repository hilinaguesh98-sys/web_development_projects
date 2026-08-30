import { useState } from "react";

function OrderForm({ orderTotal, orderItems }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    teleBirr: "",
  });

  const [errors, setErrors] = useState({});

  const validateTeleBirr = (value) => {
    // TeleBirr number validation: should be 10 digits starting with 9
    const teleBirrRegex = /^9\d{9}$/;
    return teleBirrRegex.test(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Delivery area is required";
    }

    if (!formData.teleBirr.trim()) {
      newErrors.teleBirr = "TeleBirr number is required";
    } else if (!validateTeleBirr(formData.teleBirr)) {
      newErrors.teleBirr = "TeleBirr must be 10 digits starting with 9";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Order submitted:", {
      ...formData,
      total: orderTotal,
      items: orderItems,
    });

    alert(`Order placed! Total: ETB ${orderTotal}\nThanks ${formData.name}!`);
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      area: "",
      teleBirr: "",
    });
  };

  const isFormValid =
    formData.name.trim() &&
    formData.phone.trim() &&
    formData.area.trim() &&
    validateTeleBirr(formData.teleBirr);

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>Delivery Form</h3>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className={errors.name ? "error" : ""}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="09xx xxx xxx"
          className={errors.phone ? "error" : ""}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="area">Delivery Area</label>
        <input
          type="text"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="e.g., Bole, Nifas Silk"
          className={errors.area ? "error" : ""}
        />
        {errors.area && <span className="error-message">{errors.area}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="teleBirr">TeleBirr Number</label>
        <input
          type="text"
          id="teleBirr"
          name="teleBirr"
          value={formData.teleBirr}
          onChange={handleChange}
          placeholder="9xxxxxxxxx"
          maxLength="10"
          inputMode="numeric"
          className={errors.teleBirr ? "error" : ""}
        />
        {errors.teleBirr && (
          <span className="error-message">{errors.teleBirr}</span>
        )}
      </div>

      <button
        type="submit"
        className="btn-submit"
        disabled={!isFormValid}
      >
        Place Order - ETB {orderTotal}
      </button>
    </form>
  );
}

export default OrderForm;
