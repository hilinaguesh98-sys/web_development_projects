import { NextResponse } from "next/server";
import { createOrder, getOrders } from "../../../lib/orders";
import { getDish } from "../../../lib/data";
import { orderSchema } from "../../../lib/orderSchema";

export async function GET() {
  return NextResponse.json({ orders: getOrders() });
}

export async function POST(request) {
  try {
    const body = await request.json();

    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const items = result.data.items;

    for (const item of items) {
      if (!getDish(item.id)) {
        return NextResponse.json(
          { error: "Invalid item" },
          { status: 400 }
        );
      }
    }

    const order = createOrder({
      ...result.data,
      items
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}