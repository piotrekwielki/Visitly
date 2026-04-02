import Link from "next/link";
import { CalendarRange, Search, Store } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <CalendarRange className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Marketplace OS
            </p>
            <p className="text-lg font-extrabold tracking-tight">VisitMe</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          <Link href="/discover">Discover</Link>
          <Link href="/dashboard">Business panel</Link>
          <Link href="/admin">Admin</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button size="sm" variant="outline">
            <Store className="mr-2 h-4 w-4" />
            List your business
          </Button>
        </div>
      </div>
    </header>
  );
}
