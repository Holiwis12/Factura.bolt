import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';

export function MainLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-950 to-blue-900 text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto p-6 bg-blue-950/20 backdrop-blur-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
