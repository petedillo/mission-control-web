'use client';

import { InventorySummary } from '@/components/dashboard/InventorySummary';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Welcome to Mission Control. Your homelab at a glance.</p>
      </div>

      <InventorySummary />
    </div>
  );
}
