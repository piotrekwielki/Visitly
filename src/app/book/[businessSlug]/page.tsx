import { notFound } from "next/navigation";

import { BookingForm } from "@/components/booking/booking-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessBySlug } from "@/lib/services/discovery-service";

export default async function BookingPage({
  params
}: {
  params: Promise<{ businessSlug: string }>;
}) {
  const { businessSlug } = await params;
  const business = await getBusinessBySlug(businessSlug);

  if (!business) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Book with {business.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingForm business={business} />
        </CardContent>
      </Card>
    </main>
  );
}
