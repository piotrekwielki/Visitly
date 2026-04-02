import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-14 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The requested resource does not exist yet or the slug is invalid.
          </p>
          <Link
            className={cn(buttonVariants({ variant: "default", size: "default" }))}
            href="/"
          >
            Go back home
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
