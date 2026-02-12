'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilterBar } from '@/components/inventory/FilterBar';
import { HostsTable } from '@/components/inventory/HostsTable';
import { WorkloadsTable } from '@/components/inventory/WorkloadsTable';
import { HostDetailModal } from '@/components/inventory/HostDetailModal';
import { WorkloadDetailModal } from '@/components/inventory/WorkloadDetailModal';
import { triggerInventorySync } from '@/lib/hooks/useInventory';
import { Button } from '@/components/ui/button';

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const [selectedHostId, setSelectedHostId] = useState<string | null>(null);
  const [selectedWorkloadId, setSelectedWorkloadId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleRefresh = async () => {
    setIsSyncing(true);
    try {
      const result = await triggerInventorySync();
      setSyncMessage({
        type: 'success',
        text: `Synced: ${result.data.hosts_count} hosts, ${result.data.workloads_count} workloads`,
      });
      setTimeout(() => setSyncMessage(null), 3000);
    } catch (error) {
      setSyncMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to sync inventory',
      });
      setTimeout(() => setSyncMessage(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <article className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="mt-2 text-muted-foreground">Manage and monitor all hosts and workloads.</p>
        </div>
        <Button onClick={handleRefresh} disabled={isSyncing} variant="outline">
          {isSyncing ? 'Syncing...' : 'Refresh Now'}
        </Button>
      </header>

      {syncMessage && (
        <aside
          role="status"
          aria-live="polite"
          className={`p-4 rounded-lg ${
            syncMessage.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {syncMessage.text}
        </aside>
      )}

      <FilterBar search={search} onSearchChange={setSearch} />

      <Tabs defaultValue="hosts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hosts">Hosts</TabsTrigger>
          <TabsTrigger value="workloads">Workloads</TabsTrigger>
        </TabsList>
        <TabsContent value="hosts">
          <HostsTable search={search} onHostSelect={setSelectedHostId} />
        </TabsContent>
        <TabsContent value="workloads">
          <WorkloadsTable search={search} onWorkloadSelect={setSelectedWorkloadId} />
        </TabsContent>
      </Tabs>

      <HostDetailModal hostId={selectedHostId} onClose={() => setSelectedHostId(null)} />
      <WorkloadDetailModal workloadId={selectedWorkloadId} onClose={() => setSelectedWorkloadId(null)} />
    </article>
  );
}
