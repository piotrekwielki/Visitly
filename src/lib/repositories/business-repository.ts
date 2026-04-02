import { demoBusinesses, demoBusinessSummaries } from "@/lib/mocks/demo-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function findBusinesses() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return demoBusinessSummaries;
  }

  const { data } = await supabase
    .from("businesses")
    .select("id,slug,name,category,city,price_range,tagline,rating,next_available_label")
    .eq("status", "active")
    .order("name");

  if (!data) {
    return demoBusinessSummaries;
  }

  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    city: row.city,
    priceRange: row.price_range,
    tagline: row.tagline,
    highlights: ["Supabase", "Public profile", "Live data"],
    rating: row.rating ?? 0,
    nextAvailableLabel: row.next_available_label ?? "Soon"
  }));
}

export async function findBusinessBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const demoBusiness = demoBusinesses.find((business) => business.slug === slug) ?? null;

  if (!supabase) {
    return demoBusiness;
  }

  const { data } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) {
    return demoBusiness;
  }

  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    category: data.category,
    city: data.city,
    priceRange: data.price_range,
    tagline: data.tagline,
    highlights: ["Supabase", "Public profile", "Live data"],
    rating: data.rating ?? 0,
    nextAvailableLabel: data.next_available_label ?? "Soon",
    description: data.description ?? "",
    services: demoBusiness?.services ?? [],
    staff: demoBusiness?.staff ?? []
  };
}
