import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listBusinessServices } from "@/lib/services/operations-service";

export default async function DashboardServicesPage() {
  const services = await listBusinessServices();

  return (
    <DashboardShell activePath="/dashboard/services">
      <Card>
        <CardHeader>
          <CardTitle>Services and pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between rounded-3xl border border-border/80 bg-background/80 p-4"
            >
              <div>
                <p className="font-semibold">{service.name}</p>
                <p className="text-sm text-muted-foreground">
                  {service.durationMinutes} minutes
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold">{service.priceLabel}</p>
                <p className="text-muted-foreground">{service.depositLabel}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
