import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRAINERS } from '../constants';
import { X, Trophy, Target, Zap, Shield, HeartPulse, ArrowRight } from 'lucide-react';
import { Trainer } from '../types';

export const Trainers: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  return (
    <main className="pt-32 pb-24 overflow-x-hidden">
      {/* Modal Backdrop */}
      <AnimatePresence>
        {selectedTrainer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-background/90 backdrop-blur-xl"
            onClick={() => setSelectedTrainer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface-container-low w-full max-w-5xl rounded-3xl overflow-hidden border border-outline-variant/10 shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedTrainer(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-outline-variant/20 hover:bg-primary-container hover:text-on-primary-container transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                <img 
                  src={selectedTrainer.image} 
                  alt={selectedTrainer.name} 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <span className="text-primary-container font-label font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Master Faculty</span>
                <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">{selectedTrainer.name}</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Strength', 'Biomechanics', 'Nutrition', 'Endurance'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-primary-container mb-3">Professional Bio</h4>
                    <p className="text-on-surface-variant font-body text-sm md:text-base leading-relaxed">
                      {selectedTrainer.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-primary-container mb-3">Specialization</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-xs font-medium"><Zap className="w-3 h-3 text-primary-container" /> Power Lifting</li>
                        <li className="flex items-center gap-2 text-xs font-medium"><Target className="w-3 h-3 text-primary-container" /> Body Recomp</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-xs uppercase tracking-widest text-primary-container mb-3">Experience</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-xs font-medium"><Trophy className="w-3 h-3 text-primary-container" /> 12+ Years</li>
                        <li className="flex items-center gap-2 text-xs font-medium"><Shield className="w-3 h-3 text-primary-container" /> IFBB Pro</li>
                      </ul>
                    </div>
                  </div>

                  <button className="w-full kinetic-gradient py-4 rounded-xl font-black uppercase tracking-widest text-xs text-on-primary-container hover:scale-[1.02] transition-transform shadow-xl shadow-primary-container/20">
                    Book Private Session
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 md:px-16 lg:px-32 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-headline font-black text-6xl md:text-8xl tracking-tighter uppercase leading-none mb-6">
            The <span className="text-primary-container">Elite</span><br/>Faculty
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Engineered for excellence. Our master trainers are architects of human performance, blending technical science with relentless discipline.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
            alt="Elite Trainer" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 md:px-16 lg:px-32 max-w-[1920px] mx-auto">
        {TRAINERS.map((trainer, i) => (
          <motion.div 
            key={trainer.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative flex flex-col bg-surface-container-low rounded-xl overflow-hidden hover:translate-y-[-8px] transition-all duration-500 border border-outline-variant/5 hover:border-primary-container/30 shadow-xl hover:shadow-primary-container/10"
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" 
                src={trainer.image} 
                alt={trainer.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-primary-container/90 to-transparent">
                <button 
                  onClick={() => setSelectedTrainer(trainer)}
                  className="bg-on-primary-container text-primary-container py-3 rounded-lg font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
                >
                  View Profile
                </button>
              </div>
            </div>
            <div className="p-6">
              <span className="text-primary-container font-label font-bold text-[10px] uppercase tracking-[0.2em] mb-2 block">{trainer.role}</span>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-3 group-hover:text-primary-container transition-colors">{trainer.name}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                {trainer.bio}
              </p>
            </div>
          </motion.div>
        ))}

        <div className="group relative flex flex-col bg-primary-container rounded-xl overflow-hidden p-8 justify-center lg:col-span-2">
          <div className="relative z-10">
            <h2 className="font-headline text-4xl font-black text-on-primary-container leading-none uppercase mb-6 tracking-tighter">
              Become the next<br/>Academy success
            </h2>
            <p className="font-body text-on-primary-container/80 mb-8 max-w-md">
              Our trainers are ready to engineer your transformation. Join the elite community and unlock your genetic potential.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-on-primary-container text-primary-container px-8 py-3 rounded-lg font-label font-bold uppercase tracking-wider hover:scale-105 transition-transform">
                Book Consultation
              </button>
              <button className="border-2 border-on-primary-container/30 text-on-primary-container px-8 py-3 rounded-lg font-label font-bold uppercase tracking-wider hover:bg-on-primary-container/10 transition-colors">
                View Schedule
              </button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
            <span className="font-headline text-[300px] leading-none">GA</span>
          </div>
        </div>
      </div>
    </main>
  );
};
