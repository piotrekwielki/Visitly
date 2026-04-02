export type PaymentIntentStatus =
  | "requires_deposit"
  | "pending"
  | "authorized"
  | "captured"
  | "failed"
  | "canceled";

export type PaymentIntentRecord = {
  id: string;
  bookingId: string;
  provider: "placeholder";
  status: PaymentIntentStatus;
  amountMinor: number;
  currency: string;
};
