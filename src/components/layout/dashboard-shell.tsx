import Link from "next/link";
import { Building2, CalendarDays, LayoutDashboard, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/dashboard/services", label: "Services", icon: Building2 },
  { href: "/dashboard/clients", label: "Clients", icon: Users }
];

export function DashboardShell({
  children,
  activePath
}: {
  children: React.ReactNode;
  activePath: string;
}) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
      <aside className="rounded-[1.75rem] border border-border/80 bg-card/90 p-4 shadow-sm">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Business panel
        </p>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  activePath === link.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
                href={link.href}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="space-y-6">{children}</main>
    </div>
  );
}
