import type {
  BusinessProfile,
  BusinessSummary,
  DashboardBooking,
  DashboardClient,
  DashboardSnapshot
} from "@/lib/types";

export const demoBusinesses: BusinessProfile[] = [
  {
    id: "biz-1",
    slug: "amber-and-oak-barber-lab",
    name: "Amber & Oak Barber Lab",
    category: "Barber",
    city: "Warsaw",
    priceRange: "80-220 PLN",
    tagline: "Sharp fades, warm ritual, frictionless booking.",
    highlights: ["Walk-ins disabled", "Deposit ready", "Top rated"],
    rating: 4.9,
    nextAvailableLabel: "Today at 18:15",
    description:
      "A premium barber concept blending fast booking, polished grooming rituals, and high-retention repeat clients.",
    services: [
      {
        id: "svc-1",
        name: "Skin fade + beard",
        durationMinutes: 75,
        priceLabel: "170 PLN",
        depositLabel: "20 PLN deposit"
      },
      {
        id: "svc-2",
        name: "Classic haircut",
        durationMinutes: 45,
        priceLabel: "110 PLN",
        depositLabel: "No deposit"
      }
    ],
    staff: [
      { id: "stf-1", name: "Mikolaj", specialty: "Fades and precision beards" },
      { id: "stf-2", name: "Adrian", specialty: "Classic cuts and texture" }
    ]
  },
  {
    id: "biz-2",
    slug: "studio-cerise-brows-skin",
    name: "Studio Cerise Brows & Skin",
    category: "Brows",
    city: "Krakow",
    priceRange: "90-360 PLN",
    tagline: "Calm aesthetic space for brows, tint, and skin touch-ups.",
    highlights: ["Women-led team", "Membership ready", "Strong repeat rate"],
    rating: 4.8,
    nextAvailableLabel: "Tomorrow at 09:30",
    description:
      "Boutique beauty studio optimized for repeat services, pre-visit reminders, and before-after portfolio conversion.",
    services: [
      {
        id: "svc-3",
        name: "Signature brow shaping",
        durationMinutes: 50,
        priceLabel: "140 PLN",
        depositLabel: "15 PLN deposit"
      },
      {
        id: "svc-4",
        name: "Lamination + tint",
        durationMinutes: 80,
        priceLabel: "220 PLN",
        depositLabel: "30 PLN deposit"
      }
    ],
    staff: [
      { id: "stf-3", name: "Karina", specialty: "Brows and tint design" },
      { id: "stf-4", name: "Lena", specialty: "Skin prep and lamination" }
    ]
  },
  {
    id: "biz-3",
    slug: "northline-recovery-massage",
    name: "Northline Recovery Massage",
    category: "Massage",
    city: "Gdansk",
    priceRange: "150-420 PLN",
    tagline: "Sports recovery and bodywork with structured treatment plans.",
    highlights: ["Athlete focused", "Packages ready", "Extended sessions"],
    rating: 4.9,
    nextAvailableLabel: "Friday at 13:45",
    description:
      "Treatment-led massage studio designed around consultation notes, loyalty flows, and recurring recovery plans.",
    services: [
      {
        id: "svc-5",
        name: "Deep tissue reset",
        durationMinutes: 60,
        priceLabel: "190 PLN",
        depositLabel: "25 PLN deposit"
      },
      {
        id: "svc-6",
        name: "90-min athlete recovery",
        durationMinutes: 90,
        priceLabel: "290 PLN",
        depositLabel: "40 PLN deposit"
      }
    ],
    staff: [
      { id: "stf-5", name: "Tomasz", specialty: "Deep tissue and rehab support" },
      { id: "stf-6", name: "Marta", specialty: "Sports recovery plans" }
    ]
  }
];

export const demoDashboardSnapshot: DashboardSnapshot = {
  todayBookings: 18,
  newClients: 6,
  pendingDeposits: 4
};

export const demoUpcomingBookings: DashboardBooking[] = [
  {
    id: "book-1",
    clientName: "Anna Kowalska",
    staffName: "Mikolaj",
    serviceName: "Skin fade + beard",
    startsAtLabel: "Today, 16:30",
    status: "confirmed"
  },
  {
    id: "book-2",
    clientName: "Piotr Malinowski",
    staffName: "Karina",
    serviceName: "Signature brow shaping",
    startsAtLabel: "Today, 17:15",
    status: "pending"
  },
  {
    id: "book-3",
    clientName: "Natalia Wrona",
    staffName: "Tomasz",
    serviceName: "90-min athlete recovery",
    startsAtLabel: "Tomorrow, 08:00",
    status: "confirmed"
  }
];

export const demoClients: DashboardClient[] = [
  { id: "client-1", name: "Anna Kowalska", email: "anna@example.com", totalVisits: 4 },
  { id: "client-2", name: "Piotr Malinowski", email: "piotr@example.com", totalVisits: 2 },
  { id: "client-3", name: "Natalia Wrona", email: "natalia@example.com", totalVisits: 7 }
];

export const demoBusinessSummaries: BusinessSummary[] = demoBusinesses.map(
  ({
    id,
    slug,
    name,
    category,
    city,
    priceRange,
    tagline,
    highlights,
    rating,
    nextAvailableLabel
  }) => ({
    id,
    slug,
    name,
    category,
    city,
    priceRange,
    tagline,
    highlights,
    rating,
    nextAvailableLabel
  })
);
