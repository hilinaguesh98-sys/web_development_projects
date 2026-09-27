import { NextResponse } from "next/server";
import { dishes } from "../../../../lib/data";

export async function GET(request, { params }) {
  const { id } = await params;

  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    return NextResponse.json(
      {
        error: {
          code: "DISH_NOT_FOUND",
          message: "Dish not found",
        },
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    dish,
  });
}