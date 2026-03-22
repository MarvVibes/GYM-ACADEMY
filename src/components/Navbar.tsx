import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, UserProfile } from '../types';
import { Menu, X, LogIn, LogOut, User as UserIcon, Calendar, ShieldCheck } from 'lucide-react';
import { MusicPlayer } from './MusicPlayer';
import { supabase, isSupabaseConfigured } from '../supabase';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  user: UserProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  };

  const handleSignIn = async () => {
    if (!isSupabaseConfigured) {
      alert('Supabase is not configured. Please set your environment variables.');
      return;
    }
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const navItems: { label: string; screen: Screen }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Classes', screen: 'schedule' },
    { label: 'Trainers', screen: 'trainers' },
    { label: 'Membership', screen: 'membership' },
    { label: 'Contact', screen: 'contact' },
  ];

  const handleNavigate = (screen: Screen) => {
    onNavigate(screen);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="fixed top-0 w-full flex justify-between items-center px-6 md:px-16 lg:px-32 py-4 max-w-[1920px] mx-auto glass-header z-50">
      <div 
        className="text-xl md:text-2xl font-black tracking-tighter text-on-background cursor-pointer font-headline"
        onClick={() => handleNavigate('home')}
      >
        GYM ACADEMY
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => handleNavigate(item.screen)}
            className={`font-label text-xs font-semibold uppercase tracking-widest transition-colors relative pb-1 ${
              currentScreen === item.screen 
                ? 'text-primary-container' 
                : 'text-on-background/70 hover:text-on-background'
            }`}
          >
            {item.label}
            {currentScreen === item.screen && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-container"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <MusicPlayer />
        
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container/20 hover:border-primary-container transition-all"
            >
              <img 
                src={user.photoURL || 'https://picsum.photos/seed/user/100/100'} 
                alt={user.displayName} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-64 bg-surface-container-high rounded-2xl shadow-2xl border border-outline-variant/10 p-4 overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-outline-variant/10">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={user.photoURL || 'https://picsum.photos/seed/user/100/100'} 
                        alt={user.displayName} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight">{user.displayName}</p>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{user.membership ? `${user.membership} Member` : 'Guest Athlete'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {user.role === 'admin' && (
                      <button 
                        onClick={() => handleNavigate('admin')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-bright transition-colors text-xs font-bold uppercase tracking-widest text-primary-container"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Admin Dashboard
                      </button>
                    )}
                    <button 
                      onClick={() => handleNavigate('bookings')}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-bright transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                      <Calendar className="w-4 h-4 text-primary-container" />
                      My Bookings
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-error/10 text-error transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavigate('booking')}
              className="hidden sm:flex items-center gap-2 kinetic-gradient px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest text-on-primary-container hover:scale-105 active:scale-95 transition-transform"
            >
              <Calendar className="w-4 h-4" />
              Book Session
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-on-background"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface-container-low border-t border-outline-variant/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {navItems.map((item) => (
              <button
                key={item.screen}
                onClick={() => handleNavigate(item.screen)}
                className={`font-label text-sm font-bold uppercase tracking-widest text-left ${
                  currentScreen === item.screen ? 'text-primary-container' : 'text-on-background/70'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user && (
              <>
                <div className="h-[1px] bg-outline-variant/10 w-full" />
                <div className="px-0 py-2">
                  <p className="text-[10px] text-primary-container font-black uppercase tracking-widest mb-1">{user.membership ? `${user.membership} Member` : 'Guest Athlete'}</p>
                  <p className="text-sm font-black uppercase tracking-tight">{user.displayName}</p>
                </div>
                {user.role === 'admin' && (
                  <button 
                    onClick={() => handleNavigate('admin')}
                    className="font-label text-sm font-bold uppercase tracking-widest text-left text-primary-container"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button 
                  onClick={() => handleNavigate('bookings')}
                  className="font-label text-sm font-bold uppercase tracking-widest text-left text-on-background/70"
                >
                  My Bookings
                </button>
                <button 
                  onClick={handleSignOut}
                  className="font-label text-sm font-bold uppercase tracking-widest text-left text-error"
                >
                  Sign Out
                </button>
              </>
            )}
            {!user && (
              <>
                <button 
                  onClick={() => handleNavigate('booking')}
                  className="kinetic-gradient w-full py-4 rounded-lg text-sm font-bold uppercase tracking-widest text-on-primary-container"
                >
                  Book Session
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
