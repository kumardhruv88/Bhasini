import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './components/ui/IntroScreen';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AgentExplorerPage = lazy(() => import('./pages/AgentExplorerPage'));
const AgentConversationPage = lazy(() => import('./pages/AgentConversationPage'));
const VoicesPage = lazy(() => import('./pages/VoicesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const LoginPage = lazy(() => import('./pages/AuthPage/LoginPage'));
const SignupPage = lazy(() => import('./pages/AuthPage/SignupPage'));
const HomePage = lazy(() => import('./pages/app/HomePage'));
const ObservatoryPage = lazy(() => import('./pages/app/ObservatoryPage'));
const EvalPage = lazy(() => import('./pages/app/EvalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function LoadingScreen() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div 
        style={{ 
          width: '56px', 
          height: '56px', 
          background: 'linear-gradient(135deg, #FF6B35 0%, #FF3CAC 100%)', 
          borderRadius: '50%',
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
  const [introComplete, setIntroComplete] = useState(false);
  
  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <>
      <AnimatePresence>
        {!introComplete && (
          <IntroScreen key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait" initial={false}>
        {introComplete && (
          <Suspense fallback={<LoadingScreen />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/agents" element={<AgentExplorerPage />} />
              <Route path="/agents/:agentId/talk" element={<AgentConversationPage />} />
              <Route path="/voices" element={<VoicesPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/app/home" element={<HomePage />} />
              <Route path="/app/observatory" element={<ObservatoryPage />} />
              <Route path="/app/eval" element={<EvalPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}
