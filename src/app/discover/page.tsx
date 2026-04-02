import { Search } from "lucide-react";

import { BusinessCard } from "@/components/marketplace/business-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { listBusinesses } from "@/lib/services/discovery-service";

export default async function DiscoverPage() {
  const businesses = await listBusinesses();

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-4">
        <Badge variant="accent">Discovery</Badge>
        <h1 className="text-4xl font-black tracking-tight">Find the right business</h1>
        <p className="max-w-3xl text-muted-foreground">
          This route is designed to swap from demo data to Supabase-backed search
          without changing the page contract.
        </p>
      </section>

      <section className="grid gap-4 rounded-[1.75rem] border border-border/70 bg-card/80 p-5 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search by business or service" />
        </div>
        <Input placeholder="Category" />
        <Input placeholder="Location" />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </section>
    </main>
  );
}
