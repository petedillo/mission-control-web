'use client';

import { useEffect, useState } from 'react';
import { useHealth } from '@/lib/hooks/useInventory';

export function ConnectionStatus() {
  const { data, isLoading, error } = useHealth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="h-2 w-2 rounded-full bg-yellow-500" />
        <span>Connecting...</span>
      </div>
    );
  }

  if (error || isLoading) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="h-2 w-2 rounded-full bg-red-500" />
        <span>Disconnected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <div className="h-2 w-2 rounded-full bg-green-500" />
      <span>Connected</span>
    </div>
  );
}
