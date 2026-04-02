import {
  getBusinessClients,
  getBusinessDashboardSnapshot,
  getBusinessServices
} from "@/lib/repositories/operations-repository";

export async function getDashboardSnapshot() {
  return getBusinessDashboardSnapshot();
}

export async function listBusinessServices() {
  return getBusinessServices();
}

export async function listBusinessClients() {
  return getBusinessClients();
}
