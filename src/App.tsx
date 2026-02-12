import { Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import DashboardPage from '@/pages/Dashboard';
import InventoryPage from '@/pages/Inventory';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
