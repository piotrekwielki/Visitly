import {
  findBusinessBySlug,
  findBusinesses
} from "@/lib/repositories/business-repository";

export async function listBusinesses() {
  return findBusinesses();
}

export async function listFeaturedBusinesses() {
  const businesses = await findBusinesses();

  return businesses.slice(0, 3);
}

export async function getBusinessBySlug(slug: string) {
  return findBusinessBySlug(slug);
}
