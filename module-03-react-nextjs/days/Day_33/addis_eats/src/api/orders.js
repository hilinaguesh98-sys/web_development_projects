export async function placeOrder(order) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || "We could not place your order.");
    error.fieldErrors = payload.fieldErrors || payload.errors || {};
    throw error;
  }

  return payload;
}