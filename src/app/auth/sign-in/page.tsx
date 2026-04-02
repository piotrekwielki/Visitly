import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <Card>
        <CardHeader className="space-y-3">
          <Badge>Supabase Auth</Badge>
          <CardTitle className="text-2xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button className="w-full">Continue</Button>
          <p className="text-sm text-muted-foreground">
            TODO: connect with Supabase Auth email or magic-link flows.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
