import { NextResponse } from "next/server";
import { orderSchema } from "../../../lib/schema";
import { dishes, orders } from "../../../lib/data";
import { getSession } from "../../../lib/auth";

export async function POST(request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      {
        error: {
          code: "UNAUTHORIZED",
          message: "You must be signed in to place an order",
        },
      },
      { status: 401 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "INVALID_JSON",
          message: "Request body must contain valid JSON",
        },
      },
      { status: 400 }
    );
  }

  const result = orderSchema.safeParse(body);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Please correct the form errors",
          fieldErrors,
        },
      },
      { status: 422 }
    );
  }

  const dish = dishes.find(
    (item) => item.id === result.data.dishId
  );

  if (!dish) {
    return NextResponse.json(
      {
        error: {
          code: "DISH_NOT_FOUND",
          message: "The selected dish does not exist",
        },
      },
      { status: 404 }
    );
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

  return NextResponse.json(
    {
      order,
    },
    { status: 201 }
  );
}