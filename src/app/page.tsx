import Link from "next/link";
import { ArrowRight, CalendarClock, ShieldCheck, UsersRound } from "lucide-react";

import { HeroSearch } from "@/components/marketplace/hero-search";
import { BusinessCard } from "@/components/marketplace/business-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listFeaturedBusinesses } from "@/lib/services/discovery-service";

const capabilityCards = [
  {
    title: "Marketplace discovery",
    icon: UsersRound,
    text: "Browse businesses, filter categories, and convert discovery into bookings."
  },
  {
    title: "Operational calendar",
    icon: CalendarClock,
    text: "Run staff schedules, booking rules, and appointment states from one dashboard."
  },
  {
    title: "Tenant-safe foundation",
    icon: ShieldCheck,
    text: "Supabase multi-tenancy and RLS keep data partitioned from day one."
  }
];

export default async function HomePage() {
  const businesses = await listFeaturedBusinesses();

  return (
    <main className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <HeroSearch />

      <section className="grid gap-5 lg:grid-cols-3">
        {capabilityCards.map(({ title, icon: Icon, text }) => (
          <Card key={title}>
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              {text}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Badge>Featured businesses</Badge>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Marketplace cards ready for real Supabase data
            </h2>
          </div>
          <Link
            className={cn(buttonVariants({ variant: "outline", size: "default" }))}
            href="/discover"
          >
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </section>
    </main>
  );
}
