import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useInventory } from '@/lib/hooks/useInventory';
import { Server, Package, AlertCircle } from 'lucide-react';

export function InventorySummary() {
  const { data, isLoading, error } = useInventory();

  if (error) {
    return (
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-destructive/50 hover:border-destructive/70 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Server className="h-5 w-5 text-destructive" />
              </div>
              <CardTitle className="text-sm font-medium">Hosts</CardTitle>
            </div>
            <AlertCircle className="h-5 w-5 text-destructive/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">Error</div>
            <p className="text-xs text-muted-foreground mt-1">Failed to load hosts</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/50 hover:border-destructive/70 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Package className="h-5 w-5 text-destructive" />
              </div>
              <CardTitle className="text-sm font-medium">Workloads</CardTitle>
            </div>
            <AlertCircle className="h-5 w-5 text-destructive/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">Error</div>
            <p className="text-xs text-muted-foreground mt-1">Failed to load workloads</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Card className="hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Server className="h-5 w-5 text-blue-400" />
            </div>
            <CardTitle className="text-sm font-medium">Hosts</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-16 mb-2" />
              <Skeleton className="h-4 w-40" />
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-white">{data?.data?.hosts?.length ?? 0}</div>
              <p className="text-xs text-gray-400 mt-1">Kubernetes nodes & resources</p>
            </>
          )}
        </CardContent>
      </Card>
      <Card className="hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Package className="h-5 w-5 text-purple-400" />
            </div>
            <CardTitle className="text-sm font-medium">Workloads</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-16 mb-2" />
              <Skeleton className="h-4 w-40" />
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-white">{data?.data?.workloads?.length ?? 0}</div>
              <p className="text-xs text-gray-400 mt-1">Deployments, pods & statefulsets</p>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
