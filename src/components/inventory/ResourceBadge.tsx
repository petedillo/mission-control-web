'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ResourceBadge({
  status,
}: {
  status: string;
}) {
  const variants: Record<string, { bg: string; text: string; label: string }> = {
    online: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Online' },
    offline: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Offline' },
    degraded: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'Degraded' },
    running: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Running' },
    stopped: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Stopped' },
    pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'Pending' },
    failed: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Failed' },
    healthy: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Healthy' },
    unhealthy: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Unhealthy' },
    unknown: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', label: 'Unknown' },
  };

  const variant = variants[status] || variants.unknown;

  return (
    <Badge className={cn(variant.bg, variant.text, 'border-0 font-normal')}>
      {variant.label}
    </Badge>
  );
}
