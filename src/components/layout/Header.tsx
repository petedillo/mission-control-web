import { ConnectionStatus } from './ConnectionStatus';

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full glass-panel border-b border-white/[0.08]">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/30" />
          <h1 className="text-lg font-bold tracking-tight text-white">Mission Control</h1>
        </div>
        <ConnectionStatus />
      </div>
    </header>
  );
}
