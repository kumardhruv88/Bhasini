import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AgentExplorerPage = lazy(() => import('./pages/AgentExplorerPage'));
const AgentConversationPage = lazy(() => import('./pages/AgentConversationPage'));
const VoicesPage = lazy(() => import('./pages/VoicesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const LoginPage = lazy(() => import('./pages/AuthPage/LoginPage'));
const SignupPage = lazy(() => import('./pages/AuthPage/SignupPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function LoadingScreen() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div 
        style={{ 
          width: '56px', 
          height: '56px', 
          background: 'var(--orb-hero)', 
          borderRadius: '50%', 
          animation: 'orb-breathe 1.6s ease-in-out infinite' 
        }} 
      />
      <div 
        style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '14px', 
          color: 'var(--color-text-muted)', 
          marginTop: '20px', 
          letterSpacing: '0.08em' 
        }}
      >
        Bhasini
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<LoadingScreen />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/agents" element={<AgentExplorerPage />} />
          <Route path="/agents/:agentId/talk" element={<AgentConversationPage />} />
          <Route path="/voices" element={<VoicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/app/home" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
