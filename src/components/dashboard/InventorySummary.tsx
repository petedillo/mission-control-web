import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useInventory } from '@/lib/hooks/useInventory';
import { Server, AlertCircle } from 'lucide-react';

export function InventorySummary() {
  const { data, isLoading, error } = useInventory();

  if (error) {
    return (
      <Card className="border-destructive/50 hover:border-destructive/70 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <Server className="h-5 w-5 text-destructive" />
            </div>
            <CardTitle className="text-sm font-medium">Kubernetes Inventory</CardTitle>
          </div>
          <AlertCircle className="h-5 w-5 text-destructive/60" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">Error</div>
          <p className="text-xs text-muted-foreground mt-1">Failed to load inventory</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 bg-gradient-to-br from-white/5 to-transparent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/15 rounded-lg ring-1 ring-blue-500/30">
            <Server className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold">Kubernetes Inventory</CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">Nodes & workloads</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-16 mb-3" />
            <Skeleton className="h-4 w-40 mb-4" />
            <Skeleton className="h-10 w-16 mb-2" />
            <Skeleton className="h-4 w-40" />
          </>
        ) : (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Hosts</p>
              <div className="text-3xl font-bold text-blue-400">{data?.data?.hosts?.length ?? 0}</div>
              <p className="text-xs text-gray-500 mt-1">Kubernetes nodes & resources</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Workloads</p>
              <div className="text-3xl font-bold text-blue-400">{data?.data?.workloads?.length ?? 0}</div>
              <p className="text-xs text-gray-500 mt-1">Deployments, pods & statefulsets</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
