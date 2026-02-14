import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ResourceBadge({
  status,
}: {
  status: string;
}) {
  const variants: Record<string, { bg: string; text: string; label: string; shadow: string }> = {
    online: { 
      bg: 'bg-green-500/20', 
      text: 'text-green-300', 
      label: 'Online',
      shadow: 'shadow-sm shadow-green-500/20'
    },
    offline: { 
      bg: 'bg-red-500/20', 
      text: 'text-red-300', 
      label: 'Offline',
      shadow: 'shadow-sm shadow-red-500/20'
    },
    degraded: { 
      bg: 'bg-yellow-500/20', 
      text: 'text-yellow-300', 
      label: 'Degraded',
      shadow: 'shadow-sm shadow-yellow-500/20'
    },
    running: { 
      bg: 'bg-green-500/20', 
      text: 'text-green-300', 
      label: 'Running',
      shadow: 'shadow-sm shadow-green-500/20'
    },
    stopped: { 
      bg: 'bg-red-500/20', 
      text: 'text-red-300', 
      label: 'Stopped',
      shadow: 'shadow-sm shadow-red-500/20'
    },
    pending: { 
      bg: 'bg-yellow-500/20', 
      text: 'text-yellow-300', 
      label: 'Pending',
      shadow: 'shadow-sm shadow-yellow-500/20'
    },
    failed: { 
      bg: 'bg-red-500/20', 
      text: 'text-red-300', 
      label: 'Failed',
      shadow: 'shadow-sm shadow-red-500/20'
    },
    healthy: { 
      bg: 'bg-green-500/20', 
      text: 'text-green-300', 
      label: 'Healthy',
      shadow: 'shadow-sm shadow-green-500/20'
    },
    unhealthy: { 
      bg: 'bg-red-500/20', 
      text: 'text-red-300', 
      label: 'Unhealthy',
      shadow: 'shadow-sm shadow-red-500/20'
    },
    unknown: { 
      bg: 'bg-gray-500/20', 
      text: 'text-gray-400', 
      label: 'Unknown',
      shadow: ''
    },
  };

  const variant = variants[status] || variants.unknown;

  return (
    <Badge className={cn(variant.bg, variant.text, variant.shadow, 'border-0 font-medium')}>
      {variant.label}
    </Badge>
  );
}
