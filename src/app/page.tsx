export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">Mission Control</h1>
        <p className="text-xl mb-8">Homelab Infrastructure Management</p>
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">✅ Web UI Deployed</h2>
            <p>Frontend is running and ready for development</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">🔗 Backend Connected</h2>
            <p>API: {process.env.NEXT_PUBLIC_API_URL || 'Not configured'}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
