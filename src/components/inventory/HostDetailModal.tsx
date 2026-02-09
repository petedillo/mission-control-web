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
          <p className="text-red-500">Failed to load host details</p>
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

  const host = data.data as Host;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready':
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'notready':
      case 'stopped':
        return 'bg-red-100 text-red-800';
      case 'unknown':
        return 'bg-yellow-100 text-yellow-800';
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
              <h2 className="text-2xl font-bold">{host.name}</h2>
              <Badge className={getStatusColor(host.status)}>{host.status}</Badge>
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
              <p className="text-lg">{host.type}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">IP Address</p>
              <p className="text-lg font-mono">{host.ip_address || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">CPU Cores</p>
              <p className="text-lg">{host.cpu_cores || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Memory (GB)</p>
              <p className="text-lg">{host.memory_gb || 'N/A'}</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Created:</span> {new Date(host.created_at).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Updated:</span> {new Date(host.updated_at).toLocaleString()}
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
