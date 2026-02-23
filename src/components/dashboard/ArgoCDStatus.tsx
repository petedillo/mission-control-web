import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { GitBranch, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useArgoCDStatus, useArgoCDApplications } from '@/lib/hooks/useArgocd';

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
  const syncedCount = apps.filter((app) => app.syncStatus === 'Synced').length;
  const healthyCount = apps.filter((app) => app.healthStatus === 'Healthy').length;
  const syncPercentage = apps.length > 0 ? Math.round((syncedCount / apps.length) * 100) : 0;
  const healthPercentage = apps.length > 0 ? Math.round((healthyCount / apps.length) * 100) : 0;

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
          <>
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-10 w-16 mb-2" />
            <Skeleton className="h-4 w-48" />
          </>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-2">
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
            <div className="space-y-3">
              <div>
                <div className="text-3xl font-bold text-white">{apps.length}</div>
                <p className="text-xs text-gray-400 mt-1">Applications</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-300">Synced</span>
                    <span className="text-xs font-bold text-green-400">{syncPercentage}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                      style={{ width: `${syncPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{syncedCount}/{apps.length}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-300">Healthy</span>
                    <span className="text-xs font-bold text-blue-400">{healthPercentage}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                      style={{ width: `${healthPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{healthyCount}/{apps.length}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
