import { z } from "zod";

export const orderSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  phone: z
    .string()
    .trim()
    .regex(/^09\d{8}$/, "Enter a valid Ethiopian phone number"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters"),

  dishId: z
    .string()
    .min(1, "Dish is required"),

  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1")
    .max(20, "Quantity cannot exceed 20"),
});