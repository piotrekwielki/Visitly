export type ServiceSummary = {
  id: string;
  name: string;
  durationMinutes: number;
  priceLabel: string;
  depositLabel: string;
};

export type StaffSummary = {
  id: string;
  name: string;
  specialty: string;
};

export type BusinessSummary = {
  id: string;
  slug: string;
  name: string;
  category: string;
  city: string;
  priceRange: string;
  tagline: string;
  highlights: string[];
  rating: number;
  nextAvailableLabel: string;
};

export type BusinessProfile = BusinessSummary & {
  description: string;
  services: ServiceSummary[];
  staff: StaffSummary[];
};

export type DashboardSnapshot = {
  todayBookings: number;
  newClients: number;
  pendingDeposits: number;
};

export type DashboardBooking = {
  id: string;
  clientName: string;
  staffName: string;
  serviceName: string;
  startsAtLabel: string;
  status: "confirmed" | "pending" | "completed";
};

export type DashboardClient = {
  id: string;
  name: string;
  email: string;
  totalVisits: number;
};
