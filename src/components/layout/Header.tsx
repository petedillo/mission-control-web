'use client';

import { ConnectionStatus } from './ConnectionStatus';

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <h1 className="text-lg font-semibold">Mission Control</h1>
        </div>
        <ConnectionStatus />
      </div>
    </header>
  );
}
