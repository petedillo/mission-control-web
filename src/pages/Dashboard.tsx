import { InventorySummary } from '@/components/dashboard/InventorySummary';
import { ProxmoxStatus } from '@/components/dashboard/ProxmoxStatus';
import { ArgoCDStatus } from '@/components/dashboard/ArgoCDStatus';
import { HealthStatus } from '@/components/layout/HealthStatus';

export default function DashboardPage() {
  return (
    <article className="space-y-3">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-8">
          <InventorySummary />
        </div>
        <div className="lg:col-span-4">
          <HealthStatus />
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <ProxmoxStatus />
        <ArgoCDStatus />
      </section>
    </article>
  );
}
