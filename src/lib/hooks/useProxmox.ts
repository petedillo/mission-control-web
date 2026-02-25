import useSWR, { BareFetcher } from 'swr';
import { apiClient } from '@/lib/api/client';
import type { APIResponse } from '@/types/api';
import type { ProxmoxStatusData, ProxmoxNode, ProxmoxResourcesData } from '@/types/proxmox';

export function useProxmoxStatus() {
  const fetcher: BareFetcher<APIResponse<ProxmoxStatusData> | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<APIResponse<ProxmoxStatusData> | undefined>('/api/v1/proxmox/status', fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

export function useProxmoxNodes() {
  const fetcher: BareFetcher<APIResponse<ProxmoxNode[]> | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<APIResponse<ProxmoxNode[]> | undefined>('/api/v1/proxmox/nodes', fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

export function useProxmoxResources(type: string = 'lxc') {
  const fetcher: BareFetcher<APIResponse<ProxmoxResourcesData> | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<APIResponse<ProxmoxResourcesData> | undefined>(
    `/api/v1/proxmox/resources?type=${type}`,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );
}
