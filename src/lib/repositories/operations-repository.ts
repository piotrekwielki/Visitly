import {
  demoBusinesses,
  demoClients,
  demoDashboardSnapshot,
  demoUpcomingBookings
} from "@/lib/mocks/demo-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getBusinessDashboardSnapshot() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return demoDashboardSnapshot;
  }

  // TODO: replace with tenant-aware aggregation query.
  return demoDashboardSnapshot;
}

export async function getBusinessServices() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return demoBusinesses[0]?.services ?? [];
  }

  // TODO: replace with tenant-aware services query.
  return demoBusinesses[0]?.services ?? [];
}

export async function getBusinessClients() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return demoClients;
  }

  // TODO: replace with tenant-aware CRM query.
  return demoClients;
}

export async function getUpcomingBusinessBookings() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return demoUpcomingBookings;
  }

  // TODO: replace with tenant-aware booking timeline query.
  return demoUpcomingBookings;
}
