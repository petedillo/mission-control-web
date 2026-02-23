import { InventorySummary } from '@/components/dashboard/InventorySummary';
import { ProxmoxStatus } from '@/components/dashboard/ProxmoxStatus';
import { ArgoCDStatus } from '@/components/dashboard/ArgoCDStatus';
import { HealthStatus } from '@/components/layout/HealthStatus';

export default function DashboardPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="mt-2 text-gray-300">Welcome to Mission Control. Your homelab at a glance.</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InventorySummary />
        </div>
        <aside>
          <HealthStatus />
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ProxmoxStatus />
        <ArgoCDStatus />
      </section>
    </article>
  );
}
