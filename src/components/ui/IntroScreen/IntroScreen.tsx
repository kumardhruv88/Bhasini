import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(0);
  const [counterStarted, setCounterStarted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Phase timer
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setPhase(3), 3400);
    const t4 = setTimeout(() => setPhase(4), 4800);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Ambient particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let tick = 0;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const colors = ['#FF6B35', '#FF9A3C', '#FFC53D', '#FFB347', '#E8956D'];
    
    const particles = Array.from({ length: 28 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 1.5,
      speedX: (Math.random() - 0.5) * 0.36,
      speedY: (Math.random() - 0.5) * 0.44,
      opacity: Math.random() * 0.4 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulseSpeed: Math.random() * 0.008 + 0.004,
      pulseOffset: Math.random() * Math.PI * 2
    }));
    
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
    };
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        const currentOpacity = Math.max(0, Math.min(1, p.opacity + Math.sin(tick * p.pulseSpeed + p.pulseOffset) * 0.12));
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${currentOpacity})`;
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      
      tick++;
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Counter logic
  useEffect(() => {
    if (phase >= 4) {
      setCounterStarted(true);
    }
  }, [phase]);
  
  useEffect(() => {
    if (!counterStarted) return;
    
    const duration = 2400;
    const startTime = performance.now();
    let animationFrameId: number;
    
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easedProgress * 100);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          setExiting(true);
        }, 600);
      }
    };
    
    animationFrameId = requestAnimationFrame(tick);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [counterStarted]);

  const handleExitComplete = () => {
    if (exiting) {
      onComplete();
    }
  };

  const languageChips = ['हि', 'EN', 'தமி', 'తెలు', 'मरा', 'ਪੰਜ', 'HG'];

  return (
    <motion.div 
      initial={false}
      animate={exiting ? { opacity: 0, scale: 1.04, filter: 'blur(12px)' } : {}}
      transition={{ duration: 0.8, ease: [0.4, 0, 1, 1] }}
      onAnimationComplete={handleExitComplete}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#F7F5F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'all'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
      
      {/* Central radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, rgba(255,154,60,0.07) 35%, rgba(255,197,61,0.04) 60%, transparent 80%)',
        filter: 'blur(20px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Rings */}
      <motion.div
        initial={{ x: "-50%", y: "-50%" }}
        animate={{ rotate: [0, 360], x: "-50%", y: "-50%" }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'clamp(154px, 35vw, 280px)',
          height: 'clamp(44px, 10vw, 80px)',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 107, 53, 0.35)',
          boxShadow: '0 0 20px rgba(255, 107, 53, 0.15), 0 0 60px rgba(255, 107, 53, 0.08), inset 0 0 20px rgba(255, 107, 53, 0.05)',
          zIndex: 2,
        }}
      />
      
      <motion.div
        initial={{ x: "-50%", y: "-50%" }}
        animate={{ rotate: [360, 0], x: "-50%", y: "-50%" }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'clamp(231px, 50vw, 420px)',
          height: 'clamp(66px, 15vw, 120px)',
          borderRadius: '50%',
          border: '1px solid rgba(255, 154, 60, 0.25)',
          boxShadow: '0 0 30px rgba(255, 154, 60, 0.10), 0 0 80px rgba(255, 154, 60, 0.05)',
          zIndex: 2,
        }}
      />
      
      <motion.div
        initial={{ x: "-50%", y: "-50%" }}
        animate={{ rotate: [0, 360], x: "-50%", y: "-50%" }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'clamp(319px, 70vw, 580px)',
          height: 'clamp(93px, 20vw, 170px)',
          borderRadius: '50%',
          border: '1px solid rgba(255, 197, 61, 0.18)',
          boxShadow: '0 0 40px rgba(255, 197, 61, 0.08), 0 0 100px rgba(255, 197, 61, 0.04)',
          zIndex: 2,
        }}
      />
      
      <motion.div
        initial={{ x: "-50%", y: "-50%" }}
        animate={{ rotate: [360, 0], x: "-50%", y: "-50%" }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'clamp(429px, 95vw, 780px)',
          height: 'clamp(126px, 28vw, 230px)',
          borderRadius: '50%',
          border: '0.5px solid rgba(255, 107, 53, 0.10)',
          boxShadow: '0 0 60px rgba(255, 107, 53, 0.05)',
          zIndex: 2,
        }}
      />

      {/* Main Text Container */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="hindi"
              initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, scale: 1.06, filter: 'blur(8px)', transition: { duration: 0.6, ease: [0.4, 0, 1, 1] } }}
              style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: 'clamp(56px, 8vw, 96px)',
                fontWeight: 300,
                color: '#0D0D0D',
                letterSpacing: '0.06em',
                lineHeight: 1,
                textAlign: 'center'
              }}
            >
              भाषिणी
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div
              key="english"
              initial={{ opacity: 0, y: 24, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: -16, filter: 'blur(8px)', transition: { duration: 0.5 } }}
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(64px, 9vw, 108px)',
                color: '#0D0D0D',
                letterSpacing: '-0.03em'
              }}>Bhasi</span>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(64px, 9vw, 108px)',
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF3CAC 50%, #FF9A3C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.03em'
              }}>ni</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 4 && (
            <motion.p
              key="tagline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(13px, 1.8vw, 16px)',
                fontWeight: 400,
                color: '#6B6B6B',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginTop: '24px'
              }}
            >
              Voice Intelligence. In Every Indian Language.
            </motion.p>
          )}
        </AnimatePresence>

        {phase >= 4 && (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
            {languageChips.map((chip, index) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, delay: 0.4 + index * 0.06, ease: [0.16, 1, 0.3, 1] } }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#6B6B6B',
                  padding: '4px 10px',
                  background: 'rgba(255, 107, 53, 0.06)',
                  border: '1px solid rgba(255, 107, 53, 0.20)',
                  borderRadius: '9999px',
                  letterSpacing: '0.04em',
                  userSelect: 'none'
                }}
              >
                {chip}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Loading Counter */}
      {phase >= 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6 } }}
          style={{
            position: 'absolute',
            bottom: 'clamp(40px, 6vh, 72px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{
            width: '120px',
            height: '1px',
            background: 'rgba(224,222,217,0.8)',
            borderRadius: '1px',
            position: 'relative',
            marginBottom: '16px',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: `${count}%`,
              background: 'linear-gradient(90deg, #FF6B35, #FF9A3C)',
              borderRadius: '1px',
              transition: 'width 50ms linear'
            }} />
          </div>
          
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            fontWeight: 500,
            color: '#FF6B35',
            letterSpacing: '0.16em',
            textAlign: 'center'
          }}>
            {count.toString().padStart(3, '0')}
          </div>
          
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '9px',
            fontWeight: 600,
            color: '#9E9E9E',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            marginTop: '6px',
            textAlign: 'center'
          }}>
            LOADING
          </div>
        </motion.div>
      )}

      {/* Corner Brackets */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, delay: 0.3, ease: [0.16,1,0.3,1] } }}
        style={{
          width: '28px', height: '28px',
          borderTop: '1px solid rgba(255,107,53,0.30)',
          borderLeft: '1px solid rgba(255,107,53,0.30)',
          position: 'absolute', top: '20px', left: '20px'
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, delay: 0.3, ease: [0.16,1,0.3,1] } }}
        style={{
          width: '28px', height: '28px',
          borderTop: '1px solid rgba(255,107,53,0.30)',
          borderRight: '1px solid rgba(255,107,53,0.30)',
          position: 'absolute', top: '20px', right: '20px'
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, delay: 0.3, ease: [0.16,1,0.3,1] } }}
        style={{
          width: '28px', height: '28px',
          borderBottom: '1px solid rgba(255,107,53,0.30)',
          borderLeft: '1px solid rgba(255,107,53,0.30)',
          position: 'absolute', bottom: '20px', left: '20px'
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, delay: 0.3, ease: [0.16,1,0.3,1] } }}
        style={{
          width: '28px', height: '28px',
          borderBottom: '1px solid rgba(255,107,53,0.30)',
          borderRight: '1px solid rgba(255,107,53,0.30)',
          position: 'absolute', bottom: '20px', right: '20px'
        }}
      />
    </motion.div>
  );
}
