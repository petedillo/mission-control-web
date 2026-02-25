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

export interface ProxmoxResource {
  vmid: number;
  name: string;
  node: string;
  status: string;
  cpu?: number;
  maxcpu?: number;
  mem?: number;
  maxmem?: number;
}

export type ProxmoxResourcesData = ProxmoxResource[];
