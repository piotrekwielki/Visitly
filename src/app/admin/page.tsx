import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-3">
        <Badge variant="accent">Platform admin</Badge>
        <h1 className="text-4xl font-black tracking-tight">Admin control room</h1>
        <p className="max-w-2xl text-muted-foreground">
          This shell is intended for platform-wide business oversight, moderation,
          and support tooling.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {["Businesses", "Users", "Flags"].map((title) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              TODO: implement secured admin queries and moderation actions.
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
