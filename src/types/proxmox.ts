export interface ProxmoxStatusData {
  connected: boolean;
  timestamp: string;
}

export interface ProxmoxNode {
  node: string;
  status?: string;
  maxcpu?: number;
  maxmem?: number;
  cpu?: number;
  mem?: number;
  uptime?: number;
}
