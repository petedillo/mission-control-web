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
  };
}

export interface InventoryResponse {
  hosts: import('./models').Host[];
  workloads: import('./models').Workload[];
}
