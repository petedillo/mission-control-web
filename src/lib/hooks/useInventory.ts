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
