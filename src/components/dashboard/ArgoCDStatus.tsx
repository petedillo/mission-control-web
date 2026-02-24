import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { GitBranch, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useArgoCDStatus, useArgoCDApplications } from '@/lib/hooks/useArgocd';

function SyncBadge({ status }: { status: string }) {
  if (status === 'Synced') {
    return (
      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">{status}</Badge>
    );
  }
  if (status === 'OutOfSync') {
    return (
      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">{status}</Badge>
    );
  }
  return (
    <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">{status}</Badge>
  );
}

function HealthBadge({ status }: { status: string }) {
  if (status === 'Healthy') {
    return (
      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">{status}</Badge>
    );
  }
  if (status === 'Progressing') {
    return (
      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">{status}</Badge>
    );
  }
  if (status === 'Degraded') {
    return (
      <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">{status}</Badge>
    );
  }
  return (
    <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">{status}</Badge>
  );
}

export function ArgoCDStatus() {
  const { data: statusData, isLoading: statusLoading, error: statusError } = useArgoCDStatus();
  const { data: appsData, isLoading: appsLoading, error: appsError } = useArgoCDApplications();

  const isLoading = statusLoading || appsLoading;
  const error = statusError || appsError;

  if (error) {
    return (
      <Card className="border-destructive/50 hover:border-destructive/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <GitBranch className="h-5 w-5 text-destructive" />
            </div>
            <CardTitle className="text-sm font-medium">ArgoCD</CardTitle>
          </div>
          <AlertCircle className="h-5 w-5 text-destructive/60" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">Error</div>
          <p className="text-xs text-muted-foreground mt-1">Failed to load ArgoCD status</p>
        </CardContent>
      </Card>
    );
  }

  const connected = statusData?.data?.connected ?? false;
  const apps = appsData?.data ?? [];
  const { syncedCount, healthyCount } = apps.reduce(
    (acc, app) => ({
      syncedCount: acc.syncedCount + (app.syncStatus === 'Synced' ? 1 : 0),
      healthyCount: acc.healthyCount + (app.healthStatus === 'Healthy' ? 1 : 0),
    }),
    { syncedCount: 0, healthyCount: 0 }
  );

  return (
    <Card className="hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${connected ? 'bg-amber-500/10' : 'bg-gray-700/20'}`}>
            <GitBranch className={`h-5 w-5 transition-colors ${connected ? 'text-amber-400' : 'text-gray-500'}`} />
          </div>
          <CardTitle className="text-sm font-medium">ArgoCD</CardTitle>
        </div>
        {connected && <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Connection status */}
            <div className="flex items-center gap-2">
              {connected ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-amber-400" />
                  <Badge className="bg-amber-500/20 text-amber-300 shadow-sm shadow-amber-500/20 border-amber-500/30 font-medium text-xs">
                    Connected
                  </Badge>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <Badge className="bg-red-500/20 text-red-300 shadow-sm shadow-red-500/20 border-red-500/30 font-medium text-xs">
                    Disconnected
                  </Badge>
                </>
              )}
            </div>

            {/* Quick stats */}
            {apps.length > 0 && (
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-lg font-bold text-white">{apps.length}</div>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-lg font-bold text-green-400">{syncedCount}</div>
                  <p className="text-xs text-gray-500">Synced</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-lg font-bold text-blue-400">{healthyCount}</div>
                  <p className="text-xs text-gray-500">Healthy</p>
                </div>
              </div>
            )}

            {/* Applications list */}
            {apps.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Applications
                </p>
                <div className="space-y-2">
                  {apps.map((app) => (
                    <div
                      key={app.name}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">{app.name}</p>
                          <p className="font-mono text-xs text-gray-500">{app.namespace}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <SyncBadge status={app.syncStatus} />
                          <HealthBadge status={app.healthStatus} />
                        </div>
                      </div>
                      {app.revision && (
                        <p className="font-mono text-xs text-gray-600 mt-1">
                          {app.revision.slice(0, 7)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-3xl font-bold text-white">—</div>
                <p className="text-xs text-gray-400 mt-1">No applications found</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
