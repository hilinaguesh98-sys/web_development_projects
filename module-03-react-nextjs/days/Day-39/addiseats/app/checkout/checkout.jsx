"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";

const initialState = {
  success: false,
  message: "",
  fieldErrors: {},
};

export default function CheckoutForm({ dishId = "kitfo" }) {
  const [state, formAction, pending] = useActionState(
    placeOrder,
    initialState
  );

  return (
    <form action={formAction} className="checkout-card">
      <label htmlFor="customerName">
        Full Name
      </label>

      <input
        id="customerName"
        name="customerName"
        type="text"
        placeholder="Enter your full name"
      />

      {state.fieldErrors?.customerName?.map((error) => (
        <p className="form-error" key={error}>
          {error}
        </p>
      ))}

      <label htmlFor="phone">
        Phone Number
      </label>

      <input
        id="phone"
        name="phone"
        type="tel"
        placeholder="09XXXXXXXX"
      />

      {state.fieldErrors?.phone?.map((error) => (
        <p className="form-error" key={error}>
          {error}
        </p>
      ))}

      <label htmlFor="address">
        Delivery Address
      </label>

      <textarea
        id="address"
        name="address"
        placeholder="Enter your delivery address"
        rows="4"
      ></textarea>

      {state.fieldErrors?.address?.map((error) => (
        <p className="form-error" key={error}>
          {error}
        </p>
      ))}

      <label htmlFor="dishId">
        Dish
      </label>

      <select id="dishId" name="dishId" defaultValue={dishId}>
        <option value="kitfo">Kitfo - 300 ETB</option>
        <option value="doro-wot">
          Doro Wot - 350 ETB
        </option>
        <option value="pizza">
          Addis Special Pizza - 450 ETB
        </option>
        <option value="burger">
          Addis Burger - 280 ETB
        </option>
        <option value="shiro">Shiro - 220 ETB</option>
        <option value="spris">Spris - 120 ETB</option>
      </select>

      {state.fieldErrors?.dishId?.map((error) => (
        <p className="form-error" key={error}>
          {error}
        </p>
      ))}

      <label htmlFor="quantity">
        Quantity
      </label>

      <input
        id="quantity"
        name="quantity"
        type="number"
        min="1"
        max="20"
        defaultValue="1"
      />

      {state.fieldErrors?.quantity?.map((error) => (
        <p className="form-error" key={error}>
          {error}
        </p>
      ))}

      {state.message && (
        <div
          className={
            state.success
              ? "success-message"
              : "error-message"
          }
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        className="primary-button full-button"
        disabled={pending}
      >
        {pending ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}