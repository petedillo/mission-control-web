'use client';

import { useFullHealth, useLiveness } from '@/lib/hooks/useInventory';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export function HealthStatus() {
  const { data: fullHealth, isLoading: healthLoading } = useFullHealth();
  const { isLoading: livenessLoading } = useLiveness();

  if (healthLoading || livenessLoading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Card>
    );
  }

  const statusColor = fullHealth?.status === 'ok' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  const dbConnected = fullHealth?.database.connected;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">System Health</h3>
        <Badge className={statusColor}>{fullHealth?.status || 'unknown'}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Status</p>
          <p className="font-semibold capitalize">{fullHealth?.status}</p>
        </div>
        <div>
          <p className="text-gray-600">Uptime</p>
          <p className="font-semibold">{Math.round((fullHealth?.uptime || 0) / 60)}s</p>
        </div>
        <div>
          <p className="text-gray-600">Database</p>
          <Badge className={dbConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {dbConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>
        <div>
          <p className="text-gray-600">Liveness</p>
          <Badge className="bg-green-100 text-green-800">Alive</Badge>
        </div>
      </div>

      {fullHealth?.database.pool && (
        <div className="border-t pt-4">
          <p className="text-sm font-semibold mb-2">Database Pool</p>
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              Connections:{' '}
              <span className="font-mono font-semibold text-gray-900">
                {JSON.stringify(fullHealth.database.pool).substring(0, 100)}...
              </span>
            </p>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 border-t pt-2">
        Updated: {new Date(fullHealth?.timestamp || Date.now()).toLocaleTimeString()}
      </div>
    </Card>
  );
}
