import Link from "next/link";
import { Clock3, MapPin, Star } from "lucide-react";

import type { BusinessSummary } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BusinessCard({ business }: { business: BusinessSummary }) {
  return (
    <Link href={`/business/${business.slug}`}>
      <Card className="h-full transition-transform duration-300 hover:-translate-y-1">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant="secondary">{business.category}</Badge>
              <CardTitle className="mt-3 text-xl">{business.name}</CardTitle>
            </div>
            <div className="rounded-2xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
              {business.priceRange}
            </div>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            {business.tagline}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {business.highlights.map((highlight) => (
              <Badge key={highlight} variant="outline">
                {highlight}
              </Badge>
            ))}
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {business.city}
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-current text-accent" />
              {business.rating.toFixed(1)} rating
            </div>
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              Next slot: {business.nextAvailableLabel}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
