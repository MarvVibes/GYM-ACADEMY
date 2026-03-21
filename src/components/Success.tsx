import React from 'react';
import { motion } from 'motion/react';
import { Screen } from '../types';
import { CheckCircle, Calendar, MapPin, Share2 } from 'lucide-react';

interface SuccessProps {
  onNavigate: (screen: Screen) => void;
}

export const Success: React.FC<SuccessProps> = ({ onNavigate }) => {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-32 pt-32 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-2xl w-full bg-surface-container-low p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 kinetic-gradient"></div>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, delay: 0.2 }}
          className="w-24 h-24 bg-primary-container/10 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-primary-container" />
        </motion.div>

        <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">Session Secured.</h1>
        <p className="text-on-surface-variant font-body text-lg mb-12 max-w-md mx-auto">
          Your placement in the Academy has been registered. Prepare for peak performance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left">
          <div className="bg-surface-container-high p-6 rounded-2xl flex items-start gap-4">
            <Calendar className="w-6 h-6 text-primary-container shrink-0" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Date & Time</span>
              <p className="font-headline font-bold text-sm">Mon, Mar 23 • 09:30 AM</p>
            </div>
          </div>
          <div className="bg-surface-container-high p-6 rounded-2xl flex items-start gap-4">
            <MapPin className="w-6 h-6 text-primary-container shrink-0" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Location</span>
              <p className="font-headline font-bold text-sm">Main Academy Floor</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-on-background text-background px-10 py-4 rounded-xl font-label font-bold uppercase tracking-widest text-sm hover:bg-primary-container hover:text-on-primary-container transition-all"
          >
            Return to Dashboard
          </button>
          <button className="border border-outline-variant px-10 py-4 rounded-xl font-label font-bold uppercase tracking-widest text-sm hover:border-on-background transition-all flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            Add to Calendar
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-outline-variant/10">
          <p className="text-xs text-on-surface-variant font-body italic">
            "The only limit is the one you set for yourself."
          </p>
        </div>
      </motion.div>
    </main>
  );
};
