"use client";

export default function Error({ reset }) {
  return (
    <main className="error-page">
      <div className="error-icon">!</div>

      <h1>Something went wrong</h1>

      <p>
        We couldn't load the menu right now. Please try again.
      </p>

      <button onClick={() => reset()} className="primary-button">
        Try Again
      </button>
    </main>
  );
}