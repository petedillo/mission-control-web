'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { ResourceBadge } from './ResourceBadge';
import { useWorkloads } from '@/lib/hooks/useInventory';
import { formatDistanceToNow } from 'date-fns';
import type { Workload } from '@/types/models';

export function WorkloadsTable({ search, onWorkloadSelect }: { search: string; onWorkloadSelect?: (id: string) => void }) {
  const { data, isLoading, error } = useWorkloads();

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">Failed to load workloads</p>
      </div>
    );
  }

  const workloads = data?.data || [];
  const filtered = workloads.filter((w: Workload) => w.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Namespace</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Health</TableHead>
            <TableHead className="text-right">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                </TableRow>
              ))
          ) : filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-12 text-center text-muted-foreground">
                No workloads found
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((workload: Workload) => (
              <TableRow
                key={workload.id}
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => onWorkloadSelect?.(workload.id)}
              >
                <TableCell className="font-medium">{workload.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {workload.type.replace('k8s-', '')}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {workload.namespace || '—'}
                </TableCell>
                <TableCell>
                  <ResourceBadge status={workload.status} />
                </TableCell>
                <TableCell>
                  <ResourceBadge status={workload.health_status} />
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {workload.updated_at
                    ? formatDistanceToNow(new Date(workload.updated_at), { addSuffix: true })
                    : '—'}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
