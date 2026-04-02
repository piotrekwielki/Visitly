import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, MapPin, Star, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessBySlug } from "@/lib/services/discovery-service";

export default async function BusinessPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.8fr]">
        <Card className="overflow-hidden">
          <div className="h-56 bg-[linear-gradient(135deg,rgba(15,118,110,0.18),rgba(213,122,61,0.28))]" />
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">{business.category}</Badge>
              <Badge variant="outline">{business.city}</Badge>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl">{business.name}</CardTitle>
              <p className="text-muted-foreground">{business.description}</p>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-current text-accent" />
                {business.rating.toFixed(1)} rating
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {business.city}
              </div>
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                Next slot {business.nextAvailableLabel}
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Book this business</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              The MVP flow supports booking creation, cancellation windows, and
              payment-ready placeholders.
            </p>
            <Link
              className={cn(buttonVariants({ variant: "default", size: "default" }))}
              href={`/book/${business.slug}`}
            >
              Continue to booking
            </Link>
            <Button variant="outline">Contact business</Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {business.services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between rounded-3xl border border-border/80 bg-background/70 px-4 py-4"
              >
                <div>
                  <p className="font-semibold">{service.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {service.durationMinutes} min
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{service.priceLabel}</p>
                  <p className="text-sm text-muted-foreground">{service.depositLabel}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {business.staff.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 rounded-3xl border border-border/80 bg-background/70 px-4 py-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.specialty}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
