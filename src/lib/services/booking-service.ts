import { createBooking } from "@/lib/repositories/booking-repository";
import { getUpcomingBusinessBookings } from "@/lib/repositories/operations-repository";

export async function listUpcomingBookings() {
  return getUpcomingBusinessBookings();
}

export async function createBookingRequest(input: {
  businessId: string;
  serviceId: string;
  clientName: string;
  clientEmail: string;
  notes?: string;
}) {
  return createBooking(input);
}
