import { Badge } from '@/components/ui/badge';
import { Cpu, HardDrive } from 'lucide-react';

interface ResourceCardProps {
  name: string;
  id: number;
  status: string;
  node?: string;
  cpu?: number;
  maxcpu?: number;
  mem?: number;
  maxmem?: number;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)}G`;
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(0)}M`;
  return `${bytes}B`;
}

export function ResourceCard({ name, id, status, node, cpu, maxcpu, mem, maxmem }: ResourceCardProps) {
  const isRunning = status === 'running';
  const cpuPct = maxcpu && cpu !== undefined ? Math.round((cpu / maxcpu) * 100) : null;
  const memPct = maxmem && mem !== undefined ? Math.round((mem / maxmem) * 100) : null;

  return (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{name}</p>
          <p className="font-mono text-xs text-gray-500">
            ID: {id}{node ? ` · ${node}` : ''}
          </p>
        </div>
        <Badge
          className={
            isRunning
              ? 'bg-green-500/20 text-green-300 border-green-500/30 shrink-0'
              : 'bg-gray-500/20 text-gray-400 border-gray-500/30 shrink-0'
          }
        >
          {status}
        </Badge>
      </div>

      {(cpuPct !== null || memPct !== null) && (
        <div className="space-y-1.5">
          {cpuPct !== null && (
            <div className="flex items-center gap-2">
              <Cpu className="h-3 w-3 text-gray-500 shrink-0" />
              <div className="flex-1 h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                  style={{ width: `${cpuPct}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">{cpuPct}%</span>
            </div>
          )}
          {memPct !== null && mem !== undefined && maxmem !== undefined && (
            <div className="flex items-center gap-2">
              <HardDrive className="h-3 w-3 text-gray-500 shrink-0" />
              <div className="flex-1 h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500"
                  style={{ width: `${memPct}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-16 text-right">
                {formatBytes(mem)}/{formatBytes(maxmem)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
