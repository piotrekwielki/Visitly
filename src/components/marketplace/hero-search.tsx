import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSearch() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/85 p-8 shadow-[0_30px_80px_-40px_rgba(15,118,110,0.45)] sm:p-10 lg:p-14">
      <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-44 w-44 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Marketplace + operations
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Book services fast, then run the whole business from one place.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A Booksy-inspired foundation for discovery, booking, staff scheduling,
              customer CRM, and payment-ready appointment flows.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              className={cn(buttonVariants({ variant: "default", size: "default" }))}
              href="/discover"
            >
              Explore businesses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              className={cn(buttonVariants({ variant: "outline", size: "default" }))}
              href="/dashboard"
            >
              Open business dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-border/80 bg-background/90 p-5 backdrop-blur">
          <p className="mb-4 text-sm font-semibold">Find your next appointment</p>
          <div className="space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Barber, brows, massage..." />
            </div>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Warsaw, Krakow, remote..." />
            </div>
            <Button className="w-full" variant="accent">
              Search availability
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-secondary p-4">
              <p className="text-2xl font-black">24/7</p>
              <p className="text-muted-foreground">Customer booking</p>
            </div>
            <div className="rounded-2xl bg-secondary p-4">
              <p className="text-2xl font-black">RLS</p>
              <p className="text-muted-foreground">Multi-tenant ready</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
