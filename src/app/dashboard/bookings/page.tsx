import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listUpcomingBookings } from "@/lib/services/booking-service";

export default async function DashboardBookingsPage() {
  const bookings = await listUpcomingBookings();

  return (
    <DashboardShell activePath="/dashboard/bookings">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming bookings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col gap-2 rounded-3xl border border-border/80 bg-background/80 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold">{booking.clientName}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.serviceName} with {booking.staffName}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {booking.startsAtLabel} · {booking.status}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
