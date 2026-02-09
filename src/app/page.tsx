'use client';

import { InventorySummary } from '@/components/dashboard/InventorySummary';
import { HealthStatus } from '@/components/layout/HealthStatus';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Welcome to Mission Control. Your homelab at a glance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InventorySummary />
        </div>
        <div>
          <HealthStatus />
        </div>
      </div>
    </div>
  );
}
