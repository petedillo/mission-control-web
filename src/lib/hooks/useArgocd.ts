import useSWR, { BareFetcher } from 'swr';
import { apiClient } from '@/lib/api/client';
import type { APIResponse } from '@/types/api';
import type { ArgoCDStatusData, ArgoAppStatus } from '@/types/argocd';

export function useArgoCDStatus() {
  const fetcher: BareFetcher<APIResponse<ArgoCDStatusData> | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<APIResponse<ArgoCDStatusData> | undefined>('/api/v1/argocd/status', fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}

export function useArgoCDApplications() {
  const fetcher: BareFetcher<APIResponse<ArgoAppStatus[]> | undefined> = async (path: string) => {
    return apiClient.get(path);
  };
  return useSWR<APIResponse<ArgoAppStatus[]> | undefined>('/api/v1/argocd/applications', fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });
}
