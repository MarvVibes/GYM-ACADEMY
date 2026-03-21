import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Booking } from './components/Booking';
import { Contact } from './components/Contact';
import { Success } from './components/Success';
import { Trainers } from './components/Trainers';
import { Membership } from './components/Membership';
import { Schedule } from './components/Schedule';
import { About } from './components/About';
import { UserBookings } from './components/UserBookings';
import { AdminDashboard } from './components/AdminDashboard';
import { CustomCursor } from './components/CustomCursor';
import { Screen, UserProfile } from './types';
import { auth, db, onAuthStateChanged, doc, getDoc, setDoc } from './firebase';
import Lenis from 'lenis';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            setUser(userDoc.data() as UserProfile);
          } else {
            // Create initial profile
            const normalizedEmail = (firebaseUser.email || '').toLowerCase();
            const isAdminEmail = normalizedEmail === 'marvglobalofficial@gmail.com' || normalizedEmail === 'admin@gymacademy.com';
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || (isAdminEmail ? 'Academy Staff' : 'Athlete'),
              photoURL: firebaseUser.photoURL || null,
              role: isAdminEmail ? 'admin' : 'user',
              createdAt: Date.now(),
              membershipStatus: 'inactive'
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
            setUser(newProfile);
          }
        } catch (error: any) {
          console.error("Auth state error:", error);
          // If it's a permission error, we still want to set the user state locally if we know they are an admin
          const normalizedEmail = (firebaseUser.email || '').toLowerCase();
          const isAdminEmail = normalizedEmail === 'marvglobalofficial@gmail.com' || normalizedEmail === 'admin@gymacademy.com';
          if (isAdminEmail) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'Academy Staff',
              photoURL: firebaseUser.photoURL || null,
              role: 'admin',
              createdAt: Date.now(),
              membershipStatus: 'inactive'
            });
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Smooth Scroll Initialization
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    } catch (error) {
      console.error("Lenis initialization error:", error);
    }

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary-container border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'booking':
        return <Booking onNavigate={setCurrentScreen} user={user} />;
      case 'contact':
        return <Contact />;
      case 'success':
        return <Success onNavigate={setCurrentScreen} />;
      case 'trainers':
        return <Trainers />;
      case 'membership':
        return <Membership user={user} onNavigate={setCurrentScreen} />;
      case 'schedule':
        return <Schedule />;
      case 'about':
        return <About />;
      case 'bookings':
        return <UserBookings user={user} />;
      case 'admin':
        return user?.role === 'admin' ? <AdminDashboard currentUser={user} /> : <Home onNavigate={setCurrentScreen} />;
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
      <CustomCursor />
      <Navbar currentScreen={currentScreen} onNavigate={setCurrentScreen} user={user} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      <section className="bg-surface-container-lowest py-24 px-6 md:px-16 lg:px-32 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-container font-label text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">The Academy Insider</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">Elite Performance<br/>In Your Inbox.</h2>
            <p className="text-on-surface-variant font-body text-lg max-w-md">
              Receive bespoke training protocols, nutritional science, and academy updates. No fluff, just performance.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL PROTOCOL" 
                className="flex-grow bg-surface-container-low border border-outline-variant/20 rounded-xl px-6 py-4 text-sm font-label focus:ring-1 focus:ring-primary-container/50 transition-all outline-none"
              />
              <button className="kinetic-gradient text-on-primary-container px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl shadow-primary-container/20">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-[10px] text-on-surface-variant/50 font-label uppercase tracking-widest">
              By subscribing, you agree to our privacy protocol.
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="bg-surface-container-lowest py-20 px-6 md:px-16 lg:px-32 border-t border-outline-variant/10">
        <div className="max-w-[1920px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="font-headline text-3xl font-black tracking-tighter mb-6">GYM ACADEMY</h2>
            <p className="text-on-surface-variant font-body text-sm md:text-lg max-w-md mb-8">
              Engineered for the disciplined few. Our academy provides the environment, the technology, and the expertise to push human performance beyond perceived limits.
            </p>
            <div className="flex gap-6">
              {['YouTube', 'TikTok', 'Instagram'].map((social) => (
                <a key={social} href="#" className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary-container transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <h4 className="font-headline font-bold uppercase tracking-widest text-xs md:text-sm mb-6">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: 'Academy Floors', screen: 'home' },
                { name: 'Elite Faculty', screen: 'trainers' },
                { name: 'Kinetic Schedule', screen: 'schedule' },
                { name: 'Membership Tiers', screen: 'membership' },
                { name: 'About Us', screen: 'about' }
              ].map((item) => (
                <li key={item.name}>
                  <button 
                    onClick={() => setCurrentScreen(item.screen as Screen)}
                    className="text-on-surface-variant hover:text-on-surface transition-colors font-body text-xs md:text-base text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="font-headline font-bold uppercase tracking-widest text-xs md:text-sm mb-6">Academy HQ</h4>
            <p className="text-on-surface-variant font-body text-xs md:text-base mb-4">
              128 Kinetic Way,<br/>
              New York, NY 10013
            </p>
            <p className="text-on-surface-variant font-body text-xs md:text-base">
              +1 (212) 555-0198<br/>
              hq@gymacademy.fit
            </p>
          </div>
        </div>
        <div className="max-w-[1920px] mx-auto mt-20 pt-8 border-t border-outline-variant/5 flex flex-col md:flex-row justify-between items-center md:items-center gap-6 text-center md:text-left">
          <p className="text-[10px] md:text-xs text-on-surface-variant font-body uppercase tracking-widest">Built by Marvelous Ndukwe @2026, all rights reserved</p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface">Privacy Policy</a>
            <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
