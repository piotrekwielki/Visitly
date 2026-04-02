import type { PaymentIntentRecord } from "@/lib/payments/types";

export async function createPlaceholderPaymentIntent(input: {
  bookingId: string;
  amountMinor: number;
  currency: string;
}): Promise<PaymentIntentRecord> {
  return {
    id: "placeholder-intent",
    bookingId: input.bookingId,
    provider: "placeholder",
    status: "pending",
    amountMinor: input.amountMinor,
    currency: input.currency
  };
}
