import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    message: "Signed in as student-1",
  });

  response.cookies.set("userId", "student-1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}