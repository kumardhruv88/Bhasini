import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, Users, Mic, BarChart2, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AppLayout() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/app/home' },
    { label: 'My Agents', icon: Users, path: '/app/agents' },
    { label: 'My Voices', icon: Mic, path: '/app/voices' },
    { label: 'Analytics', icon: BarChart2, path: '/app/analytics' },
    { label: 'Settings', icon: Settings, path: '/app/settings' },
  ];

  return (
    <div className="min-h-screen flex bg-bg font-body">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/app/home" className="text-xl font-display font-bold tracking-tight">
            Bhasini
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-accent/10 text-accent" 
                    : "text-text hover:bg-border/50"
                )}
              >
                <item.icon size={18} className={isActive ? "text-accent" : "text-muted"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center font-bold uppercase">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text truncate">{user?.name}</p>
              <p className="text-xs text-muted truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors w-full px-2"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-border bg-bg flex items-center justify-between px-8 flex-shrink-0">
          <h1 className="text-lg font-semibold font-display capitalize">
            {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
          </h1>
          {/* Add global actions or notifications here */}
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
