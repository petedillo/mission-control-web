export interface Host {
  id: string;
  name: string;
  type: 'kubernetes' | 'proxmox' | 'vm' | 'lxc';
  status: 'online' | 'offline' | 'degraded';
  address: string;
  cpu_usage?: number;
  memory_usage?: number;
  created_at: string;
  updated_at: string;
}

export interface Workload {
  id: string;
  name: string;
  type: 'deployment' | 'statefulset' | 'daemonset' | 'pod';
  namespace: string;
  status: 'running' | 'pending' | 'failed' | 'succeeded';
  replicas?: number;
  ready_replicas?: number;
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
