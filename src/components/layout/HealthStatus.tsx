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

  const statusColor = fullHealth?.status === 'ok' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300';
  const dbConnected = fullHealth?.database.connected;

  return (
    <Card className="p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">System Health</h3>
        <Badge className={statusColor}>{fullHealth?.status || 'unknown'}</Badge>
      </header>

      <section className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Status</p>
          <p className="font-semibold text-white capitalize">{fullHealth?.status}</p>
        </div>
        <div>
          <p className="text-gray-400">Uptime</p>
          <p className="font-semibold text-white">{Math.round((fullHealth?.uptime || 0) / 60)}s</p>
        </div>
        <div>
          <p className="text-gray-400">Database</p>
          <Badge className={dbConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
            {dbConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>
        <div>
          <p className="text-gray-400">Liveness</p>
          <Badge className="bg-green-500/20 text-green-300">Alive</Badge>
        </div>
      </section>

      {fullHealth?.database.pool && (
        <article className="border-t border-white/[0.06] pt-4">
          <h4 className="text-sm font-semibold mb-2 text-white">Database Pool</h4>
          <div className="text-xs text-gray-400 space-y-1">
            <p>
              Connections:{' '}
              <span className="font-mono font-semibold text-foreground">
                {JSON.stringify(fullHealth.database.pool).substring(0, 100)}...
              </span>
            </p>
          </div>
        </article>
      )}

      <footer className="text-xs text-muted-foreground border-t border-white/[0.06] pt-2">
        Updated: {new Date(fullHealth?.timestamp || Date.now()).toLocaleTimeString()}
      </footer>
    </Card>
  );
}
