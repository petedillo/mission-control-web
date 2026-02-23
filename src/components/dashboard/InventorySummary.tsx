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
    <Card className="hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Server className="h-5 w-5 text-blue-400" />
          </div>
          <CardTitle className="text-sm font-medium">Kubernetes Inventory</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-16 mb-3" />
            <Skeleton className="h-4 w-40 mb-4" />
            <Skeleton className="h-10 w-16 mb-2" />
            <Skeleton className="h-4 w-40" />
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <p className="text-xs text-gray-400 mb-1">Hosts</p>
                <div className="text-2xl font-bold text-white">{data?.data?.hosts?.length ?? 0}</div>
                <p className="text-xs text-gray-500 mt-0.5">Kubernetes nodes & resources</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Workloads</p>
              <div className="text-2xl font-bold text-white">{data?.data?.workloads?.length ?? 0}</div>
              <p className="text-xs text-gray-500 mt-0.5">Deployments, pods & statefulsets</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
