'use client';

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
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Card>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 p-6">
          <p className="text-red-500">Failed to load workload details</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-slate-200 rounded hover:bg-slate-300"
          >
            Close
          </button>
        </Card>
      </div>
    );
  }

  const workload = data.data as Workload;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'terminating':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health.toLowerCase()) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'unhealthy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-96 overflow-y-auto">
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
              className="text-xl font-bold text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-600">Type</p>
              <p className="text-lg">{workload.type}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Namespace</p>
              <p className="text-lg font-mono">{workload.namespace}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Replicas</p>
              <p className="text-lg">{workload.replicas ?? 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Ready Replicas</p>
              <p className="text-lg">{workload.ready_replicas ?? 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Containers</p>
              <p className="text-lg">{workload.containers?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Image</p>
              <p className="text-sm font-mono truncate">{workload.image || 'N/A'}</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Created:</span> {new Date(workload.created_at).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Updated:</span> {new Date(workload.updated_at).toLocaleString()}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-slate-200 rounded hover:bg-slate-300 font-medium"
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
}
