export async function placeOrder(order) {
  const endpoint = import.meta.env.VITE_ORDERS_API_URL;

  if (!endpoint) {
    return { ok: true, order };
  }

  const response = await fetch(endpoint, {
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