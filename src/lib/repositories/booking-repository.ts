import { createSupabaseServerClient } from "@/lib/supabase/server";

type CreateBookingInput = {
  businessId: string;
  serviceId: string;
  clientName: string;
  clientEmail: string;
  notes?: string;
};

export async function createBooking(input: CreateBookingInput) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      id: "demo-booking",
      status: "pending",
      mode: "demo",
      ...input
    };
  }

  // TODO: connect customer identity, slot selection, and tenant-aware rules.
  return {
    id: "todo",
    status: "pending",
    mode: "supabase",
    ...input
  };
}
