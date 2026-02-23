import { useFullHealth, useLiveness } from '@/lib/hooks/useInventory';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, Database, Heart, Clock, Server } from 'lucide-react';

function formatUptime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours < 24) return `${hours}h ${minutes}m`;
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h`;
}

function StatusDot({ status }: { status: 'ok' | 'degraded' | 'down' | string }) {
  const colors = {
    ok: 'bg-green-500 shadow-green-500/50',
    degraded: 'bg-yellow-500 shadow-yellow-500/50',
    down: 'bg-red-500 shadow-red-500/50',
  };
  const color = colors[status as keyof typeof colors] || 'bg-gray-500 shadow-gray-500/50';

  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${color}`} />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full shadow-lg ${color}`} />
    </span>
  );
}

function HealthMetric({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 transition-colors hover:bg-white/[0.06]">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.06]">
        <Icon className="h-3.5 w-3.5 text-gray-400" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <div className="text-sm font-medium text-white leading-tight">{children}</div>
      </div>
    </div>
  );
}

function HealthStatusSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl bg-white/[0.04] p-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Skeleton className="h-3 w-32" />
      </CardFooter>
    </Card>
  );
}

export function HealthStatus() {
  const { data: fullHealth, isLoading: healthLoading } = useFullHealth();
  const { data: liveness, isLoading: livenessLoading } = useLiveness();

  if (healthLoading || livenessLoading) {
    return <HealthStatusSkeleton />;
  }

  const status = fullHealth?.status || 'unknown';
  const dbConnected = fullHealth?.database.connected;

  const statusBadge: Record<string, string> = {
    ok: 'bg-green-500/20 text-green-300 shadow-sm shadow-green-500/20',
    degraded: 'bg-yellow-500/20 text-yellow-300 shadow-sm shadow-yellow-500/20',
    down: 'bg-red-500/20 text-red-300 shadow-sm shadow-red-500/20',
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2.5">
          <StatusDot status={status} />
          <CardTitle className="text-sm font-medium">System Health</CardTitle>
        </div>
        <Badge className={statusBadge[status] || 'bg-gray-500/20 text-gray-400'}>
          {status === 'ok' ? 'Healthy' : status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-2">
        <HealthMetric icon={Activity} label="Status">
          <span className="capitalize">{status}</span>
          {fullHealth?.version && (
            <span className="ml-1 text-xs text-gray-400">v{fullHealth.version}</span>
          )}
        </HealthMetric>

        <HealthMetric icon={Clock} label="Uptime">
          {formatUptime(fullHealth?.uptime || 0)}
        </HealthMetric>

        <HealthMetric icon={Database} label="Database">
          <Badge className={
            dbConnected
              ? 'bg-green-500/20 text-green-300 shadow-sm shadow-green-500/20'
              : 'bg-red-500/20 text-red-300 shadow-sm shadow-red-500/20'
          }>
            {dbConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </HealthMetric>

        <HealthMetric icon={Heart} label="Liveness">
          <Badge className={
            liveness?.alive
              ? 'bg-green-500/20 text-green-300 shadow-sm shadow-green-500/20'
              : 'bg-red-500/20 text-red-300 shadow-sm shadow-red-500/20'
          }>
            {liveness?.alive ? 'Alive' : 'Unreachable'}
          </Badge>
        </HealthMetric>

        {fullHealth?.database.pool && (
          <HealthMetric icon={Server} label="Connection Pool">
            <span className="text-xs text-gray-300">
              {Object.entries(fullHealth.database.pool).map(([key, value], idx) => (
                <span key={key}>
                  {idx > 0 && ' · '}<span className="text-gray-400">{key}:</span> <span className="font-mono text-white">{String(value)}</span>
                </span>
              ))}
            </span>
          </HealthMetric>
        )}
      </CardContent>

      <CardFooter className="border-t border-white/[0.06] pt-2 text-xs text-gray-500">
        <Clock className="mr-1 h-3 w-3 flex-shrink-0" />
        <span className="truncate">Updated {new Date(fullHealth?.timestamp || Date.now()).toLocaleTimeString()}</span>
      </CardFooter>
    </Card>
  );
}
