export interface Host {
  id: string;
  name: string;
  type: 'proxmox-node' | 'vm' | 'k8s-node' | 'docker-host' | 'lxc-container';
  cluster: string | null;
  addresses: {
    lan?: string;
    tailscale?: string;
    public?: string;
  };
  status: 'online' | 'offline' | 'degraded' | 'unknown';
  last_seen_at: string | null;
  tags: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Workload {
  id: string;
  name: string;
  type: 'k8s-deployment' | 'k8s-statefulset' | 'k8s-pod' | 'k8s-daemonset' | 'proxmox-vm' | 'proxmox-lxc' | 'docker-container' | 'compose-stack';
  host_id: string | null;
  status: 'running' | 'stopped' | 'pending' | 'failed' | 'unknown';
  namespace: string | null;
  spec: Record<string, unknown>;
  health_status: 'healthy' | 'unhealthy' | 'unknown';
  last_updated_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  prompt: string;
  provider: 'ollama' | 'gemini' | 'claude';
  model: string;
  status: 'queued' | 'planning' | 'executing' | 'succeeded' | 'failed' | 'cancelled';
  created_at: string;
  completed_at?: string;
}

export interface TaskRun {
  id: string;
  task_id: string;
  status: 'queued' | 'planning' | 'executing' | 'succeeded' | 'failed' | 'cancelled';
  started_at: string;
  completed_at?: string;
  error_message?: string;
}

export interface TokenUsage {
  id: string;
  provider: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
  cost: number;
  created_at: string;
}
