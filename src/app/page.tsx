'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api/client';

interface BackendInfo {
  name: string;
  version: string;
  status: string;
  timestamp: string;
}

interface HealthStatus {
  alive?: boolean;
  ready?: boolean;
  timestamp?: string;
}

export default function Home() {
  const [backendInfo, setBackendInfo] = useState<BackendInfo | null>(null);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        // Test backend root endpoint
        const info = await apiClient.get<BackendInfo>('/');
        setBackendInfo(info);

        // Test health endpoint
        const healthData = await apiClient.get<HealthStatus>('/health/live');
        setHealth(healthData);

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to backend');
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  const apiUrl = apiClient.getBaseUrl();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-sm">
        <h1 className="text-4xl font-bold mb-4">Mission Control</h1>
        <p className="text-xl mb-8">Homelab Infrastructure Management</p>
        
        <div className="grid gap-4">
          <div className="glass-card p-4">
            <h2 className="text-xl font-semibold mb-2">✅ Web UI Deployed</h2>
            <p>Frontend is running and ready for development</p>
          </div>

          <div className="glass-card p-4">
            <h2 className="text-xl font-semibold mb-2">
              {loading ? '⏳' : error ? '❌' : '✅'} Backend Connection
            </h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">API URL:</span> {apiUrl}</p>
              
              {loading && <p className="text-gray-500">Checking connection...</p>}
              
              {error && (
                <div className="text-red-500">
                  <p className="font-semibold">Connection Failed</p>
                  <p>{error}</p>
                </div>
              )}
              
              {backendInfo && (
                <div className="text-green-600">
                  <p><span className="font-semibold">Status:</span> Connected ✓</p>
                  <p><span className="font-semibold">Name:</span> {backendInfo.name}</p>
                  <p><span className="font-semibold">Version:</span> {backendInfo.version}</p>
                  <p><span className="font-semibold">Health:</span> {health?.alive ? 'Alive' : 'Unknown'}</p>
                </div>
              )}
            </div>
          </div>

          {backendInfo && (
            <div className="glass-card p-4 bg-green-50/40 dark:bg-green-900/20">
              <h2 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">
                🎉 Phase 1 Complete!
              </h2>
              <p className="text-sm">Backend and Frontend are deployed and communicating successfully.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
