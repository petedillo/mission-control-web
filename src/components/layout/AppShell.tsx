'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="ml-64 flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
