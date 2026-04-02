import { NextResponse } from "next/server";
import { z } from "zod";

import { createBookingRequest } from "@/lib/services/booking-service";

const bookingSchema = z.object({
  businessId: z.string().min(1),
  serviceId: z.string().min(1),
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  notes: z.string().max(500).optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid booking payload", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const booking = await createBookingRequest(parsed.data);

  return NextResponse.json({ booking }, { status: 201 });
}
