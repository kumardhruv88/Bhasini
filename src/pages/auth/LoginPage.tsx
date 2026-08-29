import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({
      id: 'user-1',
      name: 'Dhruv',
      email: 'dhruv@example.com',
    });
    navigate('/app/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4 font-body">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-display font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-muted mb-8">Sign in to manage your Bhasini agents</p>
        
        <Button 
          variant="primary" 
          className="w-full h-12 text-lg" 
          onClick={handleLogin}
        >
          Mock Login
        </Button>
      </div>
    </div>
  );
}
