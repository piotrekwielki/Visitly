import { NextResponse } from "next/server";
import { z } from "zod";

import { createPlaceholderPaymentIntent } from "@/lib/payments/payment-service";

const paymentSchema = z.object({
  bookingId: z.string().min(1),
  amountMinor: z.number().int().positive(),
  currency: z.string().length(3)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = paymentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payment payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const paymentIntent = await createPlaceholderPaymentIntent(parsed.data);

  return NextResponse.json({ paymentIntent }, { status: 201 });
}
