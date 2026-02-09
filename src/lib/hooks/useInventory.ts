import useSWR, { BareFetcher } from 'swr';
import { apiClient } from '@/lib/api/client';
import type { Host, Workload } from '@/types/models';

interface APIResponse<T> {
  data: T;
}

interface InventoryData {
  hosts: Host[];
  workloads: Workload[];
}

export function useHealth() {
  const fetcher: BareFetcher<unknown> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR('/health/ready', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

export function useInventory() {
  const fetcher: BareFetcher<APIResponse<InventoryData> | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<APIResponse<InventoryData> | undefined>('/api/v1/inventory', fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

export function useHosts() {
  const fetcher: BareFetcher<APIResponse<Host[]> | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<APIResponse<Host[]> | undefined>('/api/v1/inventory/hosts', fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

export function useWorkloads() {
  const fetcher: BareFetcher<APIResponse<Workload[]> | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<APIResponse<Workload[]> | undefined>('/api/v1/inventory/workloads', fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

export function useHostById(id: string | null) {
  const fetcher: BareFetcher<APIResponse<Host> | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<APIResponse<Host> | undefined>(id ? `/api/v1/inventory/hosts/${id}` : null, fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

export function useWorkloadById(id: string | null) {
  const fetcher: BareFetcher<APIResponse<Workload> | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<APIResponse<Workload> | undefined>(id ? `/api/v1/inventory/workloads/${id}` : null, fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  database: {
    connected: boolean;
    pool: Record<string, unknown>;
  };
}

export function useFullHealth() {
  const fetcher: BareFetcher<HealthStatus | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<HealthStatus | undefined>('/health', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

export function useLiveness() {
  const fetcher: BareFetcher<{ alive: boolean; timestamp: string } | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<{ alive: boolean; timestamp: string } | undefined>('/health/live', fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

export async function triggerInventorySync() {
  try {
    const response = await apiClient.post<{ data: { synced: boolean; hosts_count: number; workloads_count: number; timestamp: string } }>('/api/v1/inventory/refresh', {
      forceSync: true,
    });
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to sync inventory');
  }
}
