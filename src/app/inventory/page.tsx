'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilterBar } from '@/components/inventory/FilterBar';
import { HostsTable } from '@/components/inventory/HostsTable';
import { WorkloadsTable } from '@/components/inventory/WorkloadsTable';

export default function InventoryPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="mt-2 text-muted-foreground">Manage and monitor all hosts and workloads.</p>
      </div>

      <FilterBar search={search} onSearchChange={setSearch} />

      <Tabs defaultValue="hosts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hosts">Hosts</TabsTrigger>
          <TabsTrigger value="workloads">Workloads</TabsTrigger>
        </TabsList>
        <TabsContent value="hosts">
          <HostsTable search={search} />
        </TabsContent>
        <TabsContent value="workloads">
          <WorkloadsTable search={search} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
