import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Orb } from '../../components/ui/Orb';
import { pageVariants, staggerContainer, fadeUpItem } from '../../design-system/motion';
import { Card } from '../../components/ui/Card';
import { Mic, Globe, Zap, Heart } from 'lucide-react';

export function LandingPage() {
  return (
    <motion.div 
      className="flex-1 w-full"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6 text-center z-10 relative">
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-4xl mx-auto flex flex-col items-center">
            
            <motion.div variants={fadeUpItem} className="mb-8 relative">
              <Orb size={180} state="idle" />
            </motion.div>

            <motion.h1 variants={fadeUpItem} className="text-display md:text-hero font-display text-text mb-6">
              Voice Intelligence.<br />
              <span className="text-accent">In Every Indian Language.</span>
            </motion.h1>
            
            <motion.p variants={fadeUpItem} className="text-lead text-muted mb-10 max-w-2xl mx-auto">
              Deploy production-grade voice agents in Hindi, English, Hinglish, Tamil, Telugu, Marathi, Punjabi, and Haryanvi.
            </motion.p>
            
            <motion.div variants={fadeUpItem} className="flex items-center justify-center gap-4">
              <Link to="/agents">
                <Button size="xl" variant="primary">Explore Agents</Button>
              </Link>
              <Link to="/login">
                <Button size="xl" variant="ghost">Start Building</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      </section>

      {/* Trusted By Marquee */}
      <section className="py-12 border-y border-border bg-card/50 overflow-hidden">
        <div className="container mx-auto px-6 mb-6">
          <p className="text-center text-sm font-semibold text-subtle uppercase tracking-widest">Trusted by innovative teams across India</p>
        </div>
        <div className="flex w-[200%] animate-[marquee_30s_linear_infinite]">
          {/* Duplicate logos to create a seamless loop */}
          <div className="flex w-1/2 justify-around items-center opacity-40 grayscale">
            {['TATA', 'RELIANCE', 'ZOMATO', 'SWIGGY', 'FLIPKART', 'HDFC'].map((company, i) => (
              <span key={i} className="text-2xl font-display font-bold px-8">{company}</span>
            ))}
          </div>
          <div className="flex w-1/2 justify-around items-center opacity-40 grayscale">
            {['TATA', 'RELIANCE', 'ZOMATO', 'SWIGGY', 'FLIPKART', 'HDFC'].map((company, i) => (
              <span key={`dup-${i}`} className="text-2xl font-display font-bold px-8">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32 bg-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-heading font-display mb-4">A complete voice ecosystem</h2>
            <p className="text-lead text-muted">Everything you need to build magical conversational experiences.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card hoverable className="p-8">
              <Mic className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-xl font-bold mb-3 font-display">Hyper-realistic Voices</h3>
              <p className="text-muted text-sm leading-relaxed">Access 100+ native Indian voices with perfect pronunciation and emotional range.</p>
            </Card>
            <Card hoverable className="p-8">
              <Globe className="w-10 h-10 text-blue mb-6" />
              <h3 className="text-xl font-bold mb-3 font-display">Code-switching</h3>
              <p className="text-muted text-sm leading-relaxed">Seamlessly transition between English, Hindi, and regional languages in the same sentence.</p>
            </Card>
            <Card hoverable className="p-8">
              <Zap className="w-10 h-10 text-warning mb-6" />
              <h3 className="text-xl font-bold mb-3 font-display">Ultra-low Latency</h3>
              <p className="text-muted text-sm leading-relaxed">Sub-500ms response times for fluid, natural back-and-forth conversations.</p>
            </Card>
            <Card hoverable className="p-8">
              <Heart className="w-10 h-10 text-success mb-6" />
              <h3 className="text-xl font-bold mb-3 font-display">Emotion Aware</h3>
              <p className="text-muted text-sm leading-relaxed">Agents that detect user sentiment and adjust their tone, pacing, and vocabulary.</p>
            </Card>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
