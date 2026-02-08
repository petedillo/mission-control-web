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
import { useHosts } from '@/lib/hooks/useInventory';
import { formatDistanceToNow } from 'date-fns';
import type { Host } from '@/types/models';

export function HostsTable({ search }: { search: string }) {
  const { data, isLoading, error } = useHosts();

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">Failed to load hosts</p>
      </div>
    );
  }

  const hosts = data?.data || [];
  const filtered = hosts.filter((h: Host) => h.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Address</TableHead>
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
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                </TableRow>
              ))
          ) : filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-12 text-center text-muted-foreground">
                No hosts found
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((host: Host) => (
              <TableRow key={host.id}>
                <TableCell className="font-medium">{host.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {host.type.replace('k8s-', '')}
                </TableCell>
                <TableCell>
                  <ResourceBadge status={host.status} />
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {host.addresses?.lan || '—'}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {host.last_seen_at
                    ? formatDistanceToNow(new Date(host.last_seen_at), { addSuffix: true })
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
