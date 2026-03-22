import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Target, Zap, Trophy, Users, Shield, HeartPulse } from 'lucide-react';

const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

interface AboutProps {
  onNavigate?: (screen: any) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <main className="pt-32 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden mb-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop" 
            alt="Academy Heritage" 
            className="w-full h-full object-cover grayscale opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-6 md:px-16 lg:px-32 max-w-[1920px] w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-label text-[10px] font-bold tracking-[0.4em] text-primary-container uppercase mb-4 block">Our Heritage</span>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6">
              The <span className="text-primary-container">Kinetic</span><br/>Legacy
            </h1>
            <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed font-body">
              Founded on the principles of relentless discipline and scientific precision, Gym Academy is the sanctuary for those who refuse to accept mediocrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are & How We Started */}
      <section className="px-6 md:px-16 lg:px-32 mb-32">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-headline text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight mb-6">Who We Are &<br/>How We Started</h2>
              <p className="text-on-surface-variant font-body text-lg leading-relaxed">
                Gym Academy was established in 2014 by a group of sports scientists and professional athletes who were dissatisfied with the commercial gym landscape. We saw a gap between high-level athletic performance labs and the general public.
              </p>
            </div>
            <p className="text-on-surface-variant/80 font-body leading-relaxed">
              Our journey began in a small industrial warehouse with nothing but raw iron and a commitment to data-driven results. Today, we have evolved into a premier performance academy, but our core philosophy remains unchanged: discipline is the only path to greatness.
            </p>
            <div className="flex gap-12 pt-4">
              <div className="text-center">
                <h4 className="font-headline text-4xl font-black text-primary-container mb-1">2014</h4>
                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Founded</p>
              </div>
              <div className="text-center">
                <h4 className="font-headline text-4xl font-black text-primary-container mb-1">12+</h4>
                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Global Hubs</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square lg:aspect-video"
          >
            <img 
              src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1000&auto=format&fit=crop" 
              alt="The Original Warehouse" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-surface-container-low py-32 px-6 md:px-16 lg:px-32 mb-32">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-20">
            <span className="font-label text-[10px] font-bold text-primary-container tracking-[0.3em] uppercase mb-3 block">The Methodology</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight">Our Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                step: '01', 
                title: 'Biometric Analysis', 
                desc: 'We begin with a comprehensive physiological assessment, including body composition, metabolic rate, and movement screening.',
                icon: <Target className="w-8 h-8" />
              },
              { 
                step: '02', 
                title: 'Precision Programming', 
                desc: 'Our coaches design a bespoke training and nutrition protocol based on your unique biometric data and performance goals.',
                icon: <Zap className="w-8 h-8" />
              },
              { 
                step: '03', 
                title: 'Relentless Execution', 
                desc: 'Under the guidance of our master trainers, you execute your protocol with absolute focus in an environment built for intensity.',
                icon: <Shield className="w-8 h-8" />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative p-10 bg-surface-container-highest rounded-2xl border border-outline-variant/5 group hover:border-primary-container/30 transition-all"
              >
                <span className="absolute top-6 right-8 font-headline text-6xl font-black text-on-surface/5 group-hover:text-primary-container/10 transition-colors">{item.step}</span>
                <div className="text-primary-container mb-6 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                <h3 className="font-headline text-xl font-bold mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-6 md:px-16 lg:px-32 mb-32">
        <div className="max-w-[1920px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Elite Athletes', value: 500, suffix: '+' },
            { label: 'Master Coaches', value: 25, suffix: '' },
            { label: 'Global Locations', value: 12, suffix: '' },
            { label: 'Success Rate', value: 98, suffix: '%' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 bg-surface-container-low rounded-2xl border border-outline-variant/5"
            >
              <div className="font-headline text-4xl md:text-5xl font-black text-primary-container mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="px-6 md:px-16 lg:px-32 mb-32">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-2xl aspect-square lg:aspect-video"
            >
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop" 
                alt="Academy Achievements" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-8"
            >
              <div>
                <span className="font-label text-[10px] font-bold text-primary-container tracking-[0.3em] uppercase mb-3 block">Milestones</span>
                <h2 className="font-headline text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight mb-6">Achievements</h2>
                <p className="text-on-surface-variant font-body text-lg leading-relaxed">
                  Over the past decade, Gym Academy has become the training ground for champions. Our results speak for themselves.
                </p>
              </div>
              
              <ul className="space-y-6">
                {[
                  { icon: <Trophy className="w-5 h-5" />, text: 'Voted "Best Performance Academy" 3 years in a row.' },
                  { icon: <Users className="w-5 h-5" />, text: 'Successfully transformed over 10,000+ lives globally.' },
                  { icon: <HeartPulse className="w-5 h-5" />, text: 'Pioneered the integration of biometric tracking in commercial fitness.' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
                      {item.icon}
                    </div>
                    <span className="text-on-surface-variant font-body font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto bg-surface-container-high p-12 md:p-20 rounded-3xl text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-8 tracking-tighter">Ready to join the<br/>Academy?</h2>
            <button 
              onClick={() => onNavigate?.('membership')}
              className="kinetic-gradient text-on-primary-container px-12 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-primary-container/20"
            >
              Start Your Journey
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <span className="font-headline text-[300px] font-black leading-none select-none">GA</span>
          </div>
        </div>
      </section>
    </main>
  );
};
