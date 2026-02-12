import { useWorkloadById } from '@/lib/hooks/useInventory';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Workload } from '@/types/models';

interface WorkloadDetailModalProps {
  workloadId: string | null;
  onClose: () => void;
}

export function WorkloadDetailModal({ workloadId, onClose }: WorkloadDetailModalProps) {
  const { data, isLoading, error } = useWorkloadById(workloadId);

  if (!workloadId) return null;

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
            <p className="text-destructive">Failed to load workload details</p>
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

  const workload = data.data as Workload;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'running':
        return 'bg-green-500/20 text-green-300';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'failed':
      case 'terminating':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health.toLowerCase()) {
      case 'healthy':
        return 'bg-green-500/20 text-green-300';
      case 'degraded':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'unhealthy':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

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
              <h2 className="text-2xl font-bold">{workload.name}</h2>
              <div className="flex gap-2 mt-2">
                <Badge className={getStatusColor(workload.status)}>{workload.status}</Badge>
                <Badge className={getHealthColor(workload.health_status)}>{workload.health_status}</Badge>
              </div>
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
              <p className="text-lg">{workload.type}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Namespace</p>
              <p className="text-lg font-mono">{workload.namespace}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Replicas</p>
              <p className="text-lg">{workload.replicas ?? 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Ready Replicas</p>
              <p className="text-lg">{workload.ready_replicas ?? 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Containers</p>
              <p className="text-lg">{workload.containers?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Image</p>
              <p className="text-sm font-mono truncate">{workload.image || 'N/A'}</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="border-t border-white/[0.06] pt-4 space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Created:</span> {new Date(workload.created_at).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-foreground">Updated:</span> {new Date(workload.updated_at).toLocaleString()}
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
