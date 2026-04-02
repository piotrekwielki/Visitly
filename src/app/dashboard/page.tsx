import { CalendarCheck2, CircleDollarSign, Users } from "lucide-react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSnapshot } from "@/lib/services/operations-service";

const cards = [
  { key: "todayBookings", label: "Bookings today", icon: CalendarCheck2 },
  { key: "newClients", label: "New clients", icon: Users },
  { key: "pendingDeposits", label: "Pending deposits", icon: CircleDollarSign }
] as const;

export default async function DashboardOverviewPage() {
  const snapshot = await getDashboardSnapshot();

  return (
    <DashboardShell activePath="/dashboard">
      <section className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight">Business overview</h1>
        <p className="text-muted-foreground">
          Placeholder metrics are wired for a Supabase-backed dashboard snapshot.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {cards.map(({ key, label, icon: Icon }) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">{label}</CardTitle>
              <Icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black">
                {snapshot[key as keyof typeof snapshot]}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </DashboardShell>
  );
}
