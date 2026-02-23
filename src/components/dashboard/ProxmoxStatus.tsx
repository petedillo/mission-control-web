import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Server } from 'lucide-react';
import { useProxmoxStatus, useProxmoxNodes } from '@/lib/hooks/useProxmox';

export function ProxmoxStatus() {
  const { data: statusData, isLoading: statusLoading, error: statusError } = useProxmoxStatus();
  const { data: nodesData, isLoading: nodesLoading, error: nodesError } = useProxmoxNodes();

  const isLoading = statusLoading || nodesLoading;
  const error = statusError || nodesError;

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Proxmox</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">Error</div>
          <p className="text-xs text-muted-foreground">Failed to load</p>
        </CardContent>
      </Card>
    );
  }

  const connected = statusData?.data?.connected ?? false;
  const nodeCount = nodesData?.data?.length ?? 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Proxmox</CardTitle>
        <Server className="h-4 w-4 text-muted-foreground" />
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
            <div className="text-2xl font-bold text-white">{nodeCount}</div>
            <p className="text-xs text-gray-400">Proxmox nodes</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
