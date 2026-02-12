'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useInventory } from '@/lib/hooks/useInventory';
import { Server, Package } from 'lucide-react';

export function InventorySummary() {
  const { data, isLoading, error } = useInventory();

  if (error) {
    return (
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-destructive/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hosts</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">Error</div>
            <p className="text-xs text-muted-foreground">Failed to load</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workloads</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">Error</div>
            <p className="text-xs text-muted-foreground">Failed to load</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hosts</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-12" />
          ) : (
            <>
              <div className="text-2xl font-bold">{data?.data?.hosts?.length ?? 0}</div>
              <p className="text-xs text-muted-foreground">Kubernetes nodes & resources</p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Workloads</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-12" />
          ) : (
            <>
              <div className="text-2xl font-bold">{data?.data?.workloads?.length ?? 0}</div>
              <p className="text-xs text-muted-foreground">Deployments, pods & statefulsets</p>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
