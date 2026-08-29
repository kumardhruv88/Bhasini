import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export function PublicLayout() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-body">
      {/* Navbar */}
      <header className="sticky top-0 z-sticky w-full border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-display font-bold tracking-tight">
              Bhasini
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
              <Link to="/agents" className="hover:text-text transition-colors">Agents</Link>
              <Link to="/voices" className="hover:text-text transition-colors">Voices</Link>
              <Link to="/pricing" className="hover:text-text transition-colors">Pricing</Link>
              <Link to="/docs" className="hover:text-text transition-colors">Docs</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/app/home">
                <Button variant="outline" size="sm">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-bg-dark text-bg py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-bold text-xl mb-4">Bhasini</h3>
            <p className="text-muted text-sm">Voice Intelligence. In Every Indian Language.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/agents" className="hover:text-white transition-colors">Agents</Link></li>
              <li><Link to="/voices" className="hover:text-white transition-colors">Voices</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
