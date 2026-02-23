import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Server, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useProxmoxStatus, useProxmoxNodes } from '@/lib/hooks/useProxmox';

export function ProxmoxStatus() {
  const { data: statusData, isLoading: statusLoading, error: statusError } = useProxmoxStatus();
  const { data: nodesData, isLoading: nodesLoading, error: nodesError } = useProxmoxNodes();

  const isLoading = statusLoading || nodesLoading;
  const error = statusError || nodesError;

  if (error) {
    return (
      <Card className="border-destructive/50 hover:border-destructive/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <Server className="h-5 w-5 text-destructive" />
            </div>
            <CardTitle className="text-sm font-medium">Proxmox</CardTitle>
          </div>
          <AlertCircle className="h-5 w-5 text-destructive/60" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">Error</div>
          <p className="text-xs text-muted-foreground mt-1">Failed to load Proxmox status</p>
        </CardContent>
      </Card>
    );
  }

  const connected = statusData?.data?.connected ?? false;
  const nodeCount = nodesData?.data?.length ?? 0;

  return (
    <Card className="hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${connected ? 'bg-green-500/10' : 'bg-gray-700/20'}`}>
            <Server className={`h-5 w-5 transition-colors ${connected ? 'text-green-400' : 'text-gray-500'}`} />
          </div>
          <CardTitle className="text-sm font-medium">Proxmox</CardTitle>
        </div>
        {connected && <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-10 w-16 mb-2" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-2">
              {connected ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <Badge className="bg-green-500/20 text-green-300 shadow-sm shadow-green-500/20 border-green-500/30 font-medium text-xs">
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
            <div className="space-y-2">
              <div>
                <div className="text-3xl font-bold text-white">{nodeCount}</div>
                <p className="text-xs text-gray-400 mt-1">Proxmox nodes</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
