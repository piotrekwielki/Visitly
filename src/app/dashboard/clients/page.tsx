import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listBusinessClients } from "@/lib/services/operations-service";

export default async function DashboardClientsPage() {
  const clients = await listBusinessClients();

  return (
    <DashboardShell activePath="/dashboard/clients">
      <Card>
        <CardHeader>
          <CardTitle>Client CRM</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between rounded-3xl border border-border/80 bg-background/80 p-4"
            >
              <div>
                <p className="font-semibold">{client.name}</p>
                <p className="text-sm text-muted-foreground">{client.email}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                {client.totalVisits} visits
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
