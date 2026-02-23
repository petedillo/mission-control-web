export interface ArgoCDStatusData {
  connected: boolean;
  timestamp: string;
}

export interface ArgoAppStatus {
  name: string;
  namespace: string;
  syncStatus: 'Synced' | 'OutOfSync' | 'Unknown';
  healthStatus: 'Healthy' | 'Progressing' | 'Degraded' | 'Suspended' | 'Missing' | 'Unknown';
  revision?: string;
  message?: string;
}
