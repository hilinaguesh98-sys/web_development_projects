"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "../lib/schema";
import { dishes, orders } from "../lib/data";
import { getSession } from "../lib/auth";

export async function placeOrder(previousState, formData) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You must be signed in to place an order.",
      fieldErrors: {},
    };
  }

  const rawData = {
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    dishId: formData.get("dishId"),
    quantity: Number(formData.get("quantity")),
  };

  const result = orderSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const dish = dishes.find(
    (item) => item.id === result.data.dishId
  );

  if (!dish) {
    return {
      success: false,
      message: "The selected dish does not exist.",
      fieldErrors: {},
    };
  }

  const order = {
    id: `order-${Date.now()}`,
    userId: session.userId,
    customerName: result.data.customerName,
    phone: result.data.phone,
    address: result.data.address,
    dishId: dish.id,
    dishName: dish.name,
    quantity: result.data.quantity,
    total: dish.price * result.data.quantity,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  revalidatePath("/cart");
  revalidatePath("/checkout");

  return {
    success: true,
    message: "Your order was placed successfully.",
    order,
    fieldErrors: {},
  };
}

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You must be signed in.",
    };
  }

  const order = orders.find(
    (item) => item.id === orderId
  );

  if (!order) {
    return {
      success: false,
      message: "Order not found.",
    };
  }

  if (order.userId !== session.userId) {
    return {
      success: false,
      message: "You are not allowed to cancel this order.",
    };
  }

  if (order.status !== "pending") {
    return {
      success: false,
      message: "Only pending orders can be cancelled.",
    };
  }

  order.status = "cancelled";

  revalidatePath("/cart");
  revalidatePath("/checkout");

  return {
    success: true,
    message: "Order cancelled successfully.",
  };
}