import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SCHEDULE } from '../constants';
import { Clock, Filter } from 'lucide-react';

export const Schedule: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [intensityFilter, setIntensityFilter] = useState('All');

  const filteredSchedule = SCHEDULE.filter(session => {
    const typeMatch = typeFilter === 'All' || session.type === typeFilter;
    const intensityMatch = intensityFilter === 'All' || session.intensity === intensityFilter;
    return typeMatch && intensityMatch;
  });

  const types = ['All', 'HIIT', 'Strength', 'Yoga', 'Boxing'];
  const intensities = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <main className="pt-32 pb-20 overflow-x-hidden">
      <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 md:px-16 lg:px-32 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-headline font-black text-5xl md:text-7xl tracking-tighter uppercase mb-6">
            The Kinetic<br/><span className="text-primary-container">Schedule</span>
          </h1>
          <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed">
            Precision-engineered workouts led by elite coaches. Find your slot and push the boundaries of your performance in our state-of-the-art training ground.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop" 
            alt="Training Ground" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
        </motion.div>
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 space-y-8 bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 mx-6 md:mx-16 lg:mx-32 max-w-[1920px] lg:mx-auto"
      >
        <div className="flex items-center gap-3 mb-2">
          <Filter className="w-5 h-5 text-primary-container" />
          <h2 className="font-headline font-bold uppercase tracking-widest text-sm">Refine Your Search</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Filter by Discipline</span>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button 
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                    typeFilter === type 
                      ? 'bg-primary-container text-on-primary-container shadow-lg shadow-primary-container/20' 
                      : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Intensity Level</span>
            <div className="flex flex-wrap gap-2">
              {intensities.map(intensity => (
                <button 
                  key={intensity}
                  onClick={() => setIntensityFilter(intensity)}
                  className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                    intensityFilter === intensity 
                      ? 'bg-primary-container text-on-primary-container shadow-lg shadow-primary-container/20' 
                      : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright'
                  }`}
                >
                  {intensity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/10 mx-6 md:mx-16 lg:mx-32 max-w-[1920px] lg:mx-auto mb-20"
      >
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 bg-surface-container-high text-on-surface font-black uppercase tracking-[0.2em] text-[10px] border-b border-outline-variant/10">
          <div className="col-span-4">Session Details</div>
          <div className="col-span-2 text-center">Intensity</div>
          <div className="col-span-2 text-center">Schedule</div>
          <div className="col-span-2">Instructor</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        <div className="divide-y divide-outline-variant/10">
          <AnimatePresence mode="popLayout">
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((session, i) => (
                <motion.div 
                  layout
                  key={session.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-2 lg:gap-4 px-8 py-8 md:py-6 hover:bg-surface-bright/5 transition-colors group"
                >
                  <div className="md:col-span-4 flex items-center gap-5">
                    <div className="w-20 h-20 rounded-xl bg-surface-container-highest overflow-hidden flex-shrink-0 shadow-lg relative">
                      <img 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                        src={session.image} 
                        alt={session.title}
                        referrerPolicy="no-referrer"
                      />
                      {i === 0 && (
                        <div className="absolute top-2 left-2 bg-primary-container text-on-primary-container px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1 animate-pulse">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          Live
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-on-surface font-headline font-black text-xl uppercase tracking-tight group-hover:text-primary-container transition-colors">{session.title}</h3>
                      <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mt-1">{session.type} • {session.kcal}</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 flex md:justify-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border whitespace-nowrap ${
                      session.intensity === 'Advanced' ? 'border-primary-container text-primary-container bg-primary-container/5' :
                      session.intensity === 'Intermediate' ? 'border-amber-500/50 text-amber-500 bg-amber-500/5' :
                      'border-emerald-500/50 text-emerald-500 bg-emerald-500/5'
                    }`}>
                      {session.intensity}
                    </span>
                  </div>

                  <div className="md:col-span-2 flex md:justify-center">
                    <div className="inline-flex items-center gap-2 bg-surface-container-highest px-3 py-1.5 rounded-lg whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5 text-primary-container" />
                      <span className="text-on-surface font-bold text-xs">{session.time}</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
                      <img 
                        className="w-full h-full object-cover" 
                        src={session.trainerImage} 
                        alt={session.trainer}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-on-surface font-bold text-sm whitespace-nowrap">{session.trainer}</span>
                  </div>

                  <div className="md:col-span-2 text-right">
                    <button className="w-full md:w-auto kinetic-gradient text-on-primary-container px-6 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary-container/10">Book Slot</button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-on-surface-variant font-body italic">No sessions match your current filters.</p>
                <button 
                  onClick={() => { setTypeFilter('All'); setIntensityFilter('All'); }}
                  className="mt-4 text-primary-container font-bold uppercase tracking-widest text-xs hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
        </motion.div>
    </main>
  );
};
