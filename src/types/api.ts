import type { Host, Workload } from './models';

export interface APIResponse<T> {
  data: T;
  error?: string;
}

export interface HealthResponse {
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

export interface LivenessResponse {
  alive: boolean;
  timestamp: string;
}

export interface InventoryResponse {
  hosts: Host[];
  workloads: Workload[];
}

export interface SyncResponse {
  synced: boolean;
  hosts_count: number;
  workloads_count: number;
  timestamp: string;
}
