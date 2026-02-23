import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { GitBranch } from 'lucide-react';
import { useArgoCDStatus, useArgoCDApplications } from '@/lib/hooks/useArgocd';

export function ArgoCDStatus() {
  const { data: statusData, isLoading: statusLoading, error: statusError } = useArgoCDStatus();
  const { data: appsData, isLoading: appsLoading, error: appsError } = useArgoCDApplications();

  const isLoading = statusLoading || appsLoading;
  const error = statusError || appsError;

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ArgoCD</CardTitle>
          <GitBranch className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">Error</div>
          <p className="text-xs text-muted-foreground">Failed to load</p>
        </CardContent>
      </Card>
    );
  }

  const connected = statusData?.data?.connected ?? false;
  const apps = appsData?.data ?? [];
  const syncedCount = apps.filter((app) => app.syncStatus === 'Synced').length;
  const healthyCount = apps.filter((app) => app.healthStatus === 'Healthy').length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ArgoCD</CardTitle>
        <GitBranch className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-20 mb-2" />
            <Skeleton className="h-8 w-12" />
          </>
        ) : (
          <>
            <div className="mb-2">
              {connected ? (
                <Badge className="bg-green-500/20 text-green-300 shadow-sm shadow-green-500/20 border-0 font-medium">
                  Connected
                </Badge>
              ) : (
                <Badge className="bg-red-500/20 text-red-300 shadow-sm shadow-red-500/20 border-0 font-medium">
                  Disconnected
                </Badge>
              )}
            </div>
            <div className="text-2xl font-bold text-white">{apps.length}</div>
            <p className="text-xs text-gray-400">
              {syncedCount}/{apps.length} synced · {healthyCount}/{apps.length} healthy
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
