'use client';

import { useHostById } from '@/lib/hooks/useInventory';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Host } from '@/types/models';

interface HostDetailModalProps {
  hostId: string | null;
  onClose: () => void;
}

export function HostDetailModal({ hostId, onClose }: HostDetailModalProps) {
  const { data, isLoading, error } = useHostById(hostId);

  if (!hostId) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div className="flex min-h-full w-full items-center justify-center p-4">
          <Card className="w-full max-w-2xl p-6 glass-modal" onClick={(event) => event.stopPropagation()}>
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div className="flex min-h-full w-full items-center justify-center p-4">
          <Card className="w-full max-w-2xl p-6 glass-modal" onClick={(event) => event.stopPropagation()}>
            <p className="text-destructive">Failed to load host details</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-white/[0.1] hover:bg-white/[0.15] rounded-lg transition-colors"
            >
              Close
            </button>
          </Card>
        </div>
      </div>
    );
  }

  const host = data.data as Host;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready':
      case 'running':
        return 'bg-green-500/20 text-green-300';
      case 'notready':
      case 'stopped':
        return 'bg-red-500/20 text-red-300';
      case 'unknown':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const metadata = host.metadata ?? {};
  const readNumber = (value: unknown) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string' && value.trim() !== '') {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }
    return undefined;
  };
  const resolvedIpAddress =
    host.ip_address ||
    host.addresses?.lan ||
    host.addresses?.tailscale ||
    host.addresses?.public ||
    (typeof metadata.ip_address === 'string' ? metadata.ip_address : undefined) ||
    (typeof metadata.ip === 'string' ? metadata.ip : undefined);
  const resolvedCpuCores = host.cpu_cores ?? readNumber(metadata.cpu_cores) ?? readNumber(metadata.cores) ?? readNumber(metadata.cpu);
  const resolvedMemoryGb = host.memory_gb ?? readNumber(metadata.memory_gb) ?? readNumber(metadata.memory) ?? readNumber(metadata.ram_gb) ?? readNumber(metadata.ram);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full w-full items-center justify-center p-4">
        <Card
          className="w-full max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-auto glass-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{host.name}</h2>
              <Badge className={getStatusColor(host.status)}>{host.status}</Badge>
            </div>
            <button
              onClick={onClose}
              className="text-xl font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Type</p>
              <p className="text-lg">{host.type}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">IP Address</p>
              <p className="text-lg font-mono">{resolvedIpAddress || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">CPU Cores</p>
              <p className="text-lg">{resolvedCpuCores ?? 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Memory (GB)</p>
              <p className="text-lg">{resolvedMemoryGb ?? 'N/A'}</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="border-t border-white/[0.06] pt-4 space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Created:</span> {new Date(host.created_at).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-foreground">Updated:</span> {new Date(host.updated_at).toLocaleString()}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-white/[0.1] hover:bg-white/[0.15] rounded-lg font-medium transition-colors"
          >
            Close
          </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
