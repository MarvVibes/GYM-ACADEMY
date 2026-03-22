import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../constants';
import { Screen } from '../types';
import { Play, Users, Dumbbell, Utensils, Target, Eye, Zap, Shield, HeartPulse, Trophy, ArrowRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1920&auto=format&fit=crop"
];

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale opacity-40 contrast-125 scale-105"
            poster={HERO_IMAGES[0]}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-punching-bag-in-a-gym-31244-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-6 md:px-16 lg:px-32 max-w-[1920px] w-full mx-auto pt-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="w-6 h-[2px] bg-primary-container"></span>
            <span className="font-label text-[10px] font-bold tracking-[0.4em] text-primary-container uppercase">The Kinetic Editorial</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-headline text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter mb-6 max-w-2xl text-shadow-hero uppercase"
          >
            Elite Training.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-on-background/30">Unstoppable</span><br/>
            Results.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/80 font-body text-sm md:text-base max-w-lg mb-10 leading-relaxed"
          >
            Precision-engineered performance for those who demand more from their physiology. Join the elite academy of discipline.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <button 
              onClick={() => onNavigate('membership')}
              className="group relative kinetic-gradient px-8 py-3.5 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(227,27,35,0.25)] w-full sm:w-auto"
            >
              <span className="relative z-10 font-label font-black text-xs uppercase tracking-widest text-on-primary-container">Claim Your Spot</span>
            </button>
            
            <button 
              onClick={() => onNavigate('booking')}
              className="border border-primary-container/50 px-8 py-3.5 rounded-lg font-label font-black text-xs uppercase tracking-widest text-on-background hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 w-full sm:w-auto"
            >
              Book Session
            </button>
            
            <div 
              onClick={() => onNavigate('about')}
              className="flex items-center gap-3 group cursor-pointer py-2"
            >
              <div className="w-9 h-9 rounded-full border border-on-background/10 flex items-center justify-center group-hover:bg-primary-container group-hover:border-primary-container transition-all">
                <Play className="w-3.5 h-3.5 text-on-background fill-current" />
              </div>
              <span className="font-label font-bold uppercase tracking-wider text-[10px]">Academy Tour</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 px-6 md:px-16 lg:px-32 bg-surface-container-lowest">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[350px] md:h-[600px]"
          >
            {/* Overlapping Images */}
            <div className="absolute left-0 top-0 w-full md:w-[70%] h-full md:h-[80%] z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest">
              <img 
                src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1000&auto=format&fit=crop" 
                alt="Gym interior" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute right-0 bottom-0 w-[70%] h-[80%] z-0 rounded-2xl overflow-hidden shadow-2xl hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop" 
                alt="Athlete training" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="font-label text-[10px] font-bold text-primary-container tracking-[0.3em] uppercase mb-3 block">Our Heritage</span>
              <h2 className="font-headline text-2xl md:text-4xl font-black tracking-tight uppercase leading-tight">THE ACADEMY OF<br/>DISCIPLINE</h2>
            </div>
            <p className="text-white/80 font-body text-sm md:text-base leading-relaxed">
              Founded in 2014, Gym Academy was born from a singular vision: to bridge the gap between professional athletic training and the dedicated individual. We don't just provide equipment; we provide an ecosystem of performance.
            </p>
            <p className="text-white/70 font-body text-sm leading-relaxed">
              Our facility is a sanctuary for those who understand that greatness is not given, but earned through consistent, calculated effort. Every corner of our academy is designed to facilitate focus, intensity, and progression.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="font-headline font-bold text-primary-container text-lg mb-1">500+</h4>
                <p className="text-[9px] uppercase tracking-widest font-bold text-on-surface-variant">Active Athletes</p>
              </div>
              <div>
                <h4 className="font-headline font-bold text-primary-container text-lg mb-1">25+</h4>
                <p className="text-[9px] uppercase tracking-widest font-bold text-on-surface-variant">Master Coaches</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('about')}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-container hover:gap-4 transition-all group"
            >
              Learn More About Our Story <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Goal & Vision Section */}
      <section className="py-24 px-6 md:px-16 lg:px-32 bg-surface">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/5 hover:border-primary-container/20 transition-all"
            >
              <div className="w-10 h-10 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-5 h-5 text-primary-container" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-4 uppercase tracking-tight">Our Mission</h3>
              <p className="text-white/80 font-body text-sm leading-relaxed">
                To empower our members with the tools, knowledge, and environment necessary to achieve their ultimate physical potential through scientifically-backed training methodologies.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/5 hover:border-primary-container/20 transition-all"
            >
              <div className="w-10 h-10 bg-primary-container/10 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-5 h-5 text-primary-container" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-4 uppercase tracking-tight">Our Vision</h3>
              <p className="text-white/80 font-body text-sm leading-relaxed">
                To become the global benchmark for elite performance training, fostering a community where discipline is celebrated and human limits are constantly redefined.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-16 lg:px-32 bg-surface-container-lowest">
        <div className="max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-label text-[10px] font-bold text-primary-container tracking-[0.3em] uppercase mb-3 block">Our Expertise</span>
            <h2 className="font-headline text-2xl md:text-4xl font-black uppercase tracking-tight">ELITE SERVICES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
            {[
              { title: 'Personal Training', icon: <Users />, desc: 'One-on-one sessions with master coaches tailored to your specific physiological goals.', bg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop', span: 'md:col-span-2 md:row-span-2' },
              { title: 'Strength & Conditioning', icon: <Dumbbell />, desc: 'Advanced programming designed to build explosive power and functional strength.', bg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop', span: 'md:col-span-2 md:row-span-1' },
              { title: 'Recovery Lab', icon: <HeartPulse />, desc: 'Cryotherapy, infrared saunas, and sports massage to optimize your downtime.', bg: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&auto=format&fit=crop', span: 'md:col-span-1 md:row-span-1' },
              { title: 'Performance Nutrition', icon: <Utensils />, desc: 'Data-driven meal planning and supplementation strategies for peak output.', bg: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop', span: 'md:col-span-1 md:row-span-1' },
              { title: 'HIIT & Metabolic', icon: <Zap />, desc: 'High-intensity intervals designed to maximize caloric burn and cardiovascular health.', bg: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop', span: 'md:col-span-2 md:row-span-1' },
              { title: 'Combat Sports', icon: <Shield />, desc: 'Technical training in boxing and MMA for functional agility and mental toughness.', bg: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop', span: 'md:col-span-1 md:row-span-1' },
              { title: 'Mobility & Yoga', icon: <Trophy />, desc: 'Enhancing range of motion and core stability to prevent injury and improve form.', bg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop', span: 'md:col-span-1 md:row-span-1' }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onNavigate('schedule')}
                className={`relative p-8 rounded-2xl bg-surface-container-low border border-outline-variant/5 hover:border-primary-container/30 transition-all group overflow-hidden flex flex-col justify-end cursor-pointer ${service.span}`}
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={service.bg} 
                    alt={service.title} 
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-8 h-8 text-primary-container mb-4 group-hover:scale-110 transition-transform">
                    {React.cloneElement(service.icon as React.ReactElement, { className: 'w-full h-full' })}
                  </div>
                  <h4 className="font-headline font-bold text-base md:text-xl mb-2 uppercase tracking-tight">{service.title}</h4>
                  <p className="text-white/70 font-body text-xs md:text-sm leading-relaxed max-w-xs">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 md:px-16 lg:px-32 bg-surface">
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div>
              <h2 className="font-headline text-2xl md:text-4xl font-black tracking-tight mb-4 uppercase">ENGINEERED FOR<br/>EXCELLENCE</h2>
              <p className="text-white/80 font-body text-sm md:text-base max-w-xl leading-relaxed">
                Our methodology combines data-driven insights with visceral performance training.
              </p>
            </div>
            <div className="md:text-right hidden md:block">
              <span className="font-headline text-5xl font-black text-primary-container/10">01 / 03</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Expert Coaching', icon: <Users className="w-7 h-7 text-primary-container" />, img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop', desc: 'Train with world-class athletes and sports scientists dedicated to your physiological peak.' },
              { title: 'Elite Equipment', icon: <Dumbbell className="w-7 h-7 text-primary-container" />, img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop', desc: 'Access biomechanically optimized machinery designed for maximum muscle recruitment.' },
              { title: 'Recovery Lab', icon: <HeartPulse className="w-7 h-7 text-primary-container" />, img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop', desc: 'Utilize advanced recovery protocols including cryotherapy and infrared technology.' }
            ].map((benefit, i) => {
              const [isTapped, setIsTapped] = useState(false);
              
              return (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  onClick={() => setIsTapped(!isTapped)}
                  className="group relative h-[350px] md:h-[450px] overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 cursor-pointer"
                >
                  <div className="absolute inset-0">
                    <img 
                      className={`w-full h-full object-cover opacity-40 transition-transform duration-700 ${isTapped ? 'scale-110' : 'group-hover:scale-110'}`} 
                      src={benefit.img} 
                      alt={benefit.title}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="mb-4">{benefit.icon}</div>
                    <h3 className="font-headline text-xl font-bold mb-3 uppercase">{benefit.title}</h3>
                    <p className={`text-white/70 font-body text-xs mb-6 transition-all duration-300 ${isTapped ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                      {benefit.desc}
                    </p>
                    <div className={`h-[2px] bg-primary-container transition-all duration-500 ${isTapped ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-16 lg:px-32 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-label text-[10px] font-bold text-primary-container tracking-[0.3em] uppercase mb-3 block">Knowledge Base</span>
            <h2 className="font-headline text-2xl md:text-4xl font-black uppercase tracking-tight">FREQUENTLY ASKED</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "What makes Gym Academy 'Elite'?", a: "We combine professional-grade biomechanical equipment with data-driven coaching protocols usually reserved for professional athletes. Our environment is engineered for focus, not just fitness." },
              { q: "Do you offer guest passes?", a: "We offer a single-day 'Protocol Trial' for qualified applicants. This includes a full biometric screening and access to all academy floors for 24 hours." },
              { q: "Can I freeze my membership?", a: "Elite and Kinetic tier members can freeze their accounts for up to 60 days per year for travel or recovery, with no additional fees." },
              { q: "Are personal trainers included?", a: "All memberships include a monthly consultation. Dedicated 1-on-1 coaching is included in our Kinetic tier or can be added as a bespoke service." }
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-surface-container-low rounded-2xl border border-outline-variant/5 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-headline font-bold text-sm md:text-base uppercase tracking-tight group-hover:text-primary-container transition-colors">
                    {faq.q}
                  </h3>
                  <div className="w-6 h-6 rounded-full border border-outline-variant/20 flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                    <ArrowRight className="w-3 h-3 rotate-90" />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-on-surface-variant font-body text-sm leading-relaxed border-t border-outline-variant/5 pt-4">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-surface-container-lowest relative overflow-hidden px-6 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="font-label text-[10px] font-black text-primary-container tracking-widest uppercase mb-3 block">Voices of the Elite</span>
            <h2 className="font-headline text-2xl md:text-4xl font-black uppercase tracking-tight">MEMBERSHIP IMPACT</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div 
                key={t.id}
                className={`bg-surface-container-high p-8 rounded-xl flex flex-col items-start gap-6 relative ${i === 1 ? 'border-t-4 border-primary-container lg:-translate-y-8' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <img 
                    className="w-12 h-12 rounded-full object-cover grayscale" 
                    src={t.image} 
                    alt={t.name}
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-headline text-sm font-bold">{t.name}</h4>
                    <span className="text-primary-container font-label text-[9px] uppercase tracking-widest font-bold">{t.role}</span>
                  </div>
                </div>
                <p className="text-white/80 font-body text-sm italic leading-relaxed">
                  "{t.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-container/5 blur-[100px] rounded-full -z-0"></div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-[#1A1A1A]">
            <img 
              className="w-full h-full object-cover opacity-20" 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop" 
              alt="Gym interior"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container/20 to-transparent"></div>
          </div>
          <div className="relative z-10 px-8 py-16 md:p-20 flex flex-col items-center text-center">
            <h2 className="font-headline text-2xl md:text-4xl font-black mb-6 tracking-tighter uppercase leading-tight">ARE YOU READY TO REWRITE<br/>YOUR LIMITS?</h2>
            <p className="text-white/80 text-sm md:text-base max-w-xl mb-10 font-body">
              Limited memberships available for the current intake. Secure your placement in the Academy today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => onNavigate('membership')}
                className="bg-on-background text-background px-10 py-3.5 rounded-lg font-label font-black text-xs uppercase tracking-widest hover:bg-primary-container hover:text-on-primary-container transition-all duration-300"
              >
                Claim Membership
              </button>
              <button 
                onClick={() => onNavigate('booking')}
                className="border border-on-background/20 backdrop-blur-md px-10 py-3.5 rounded-lg font-label font-black text-xs uppercase tracking-widest hover:border-primary-container hover:text-primary-container transition-all duration-300"
              >
                Book a Tour
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
