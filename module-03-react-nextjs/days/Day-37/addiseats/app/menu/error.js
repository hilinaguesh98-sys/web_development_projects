"use client";

export default function Error({ reset }) {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>

      <h1>Something went wrong</h1>

      <p>
        We could not load the Addis Eats menu.
      </p>

      <button
        onClick={() => reset()}
        className="primary-button"
      >
        Try Again
      </button>
    </div>
  );
}