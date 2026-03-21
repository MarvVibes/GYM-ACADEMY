import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRAINERS } from '../constants';
import { Screen, UserProfile, Booking as BookingType } from '../types';
import { Calendar, Clock, User, ChevronRight, CheckCircle2, LogIn, Loader2 } from 'lucide-react';
import { db, collection, addDoc, loginWithGoogle, handleFirestoreError, OperationType } from '../firebase';

interface BookingProps {
  onNavigate: (screen: Screen) => void;
  user: UserProfile | null;
}

export const Booking: React.FC<BookingProps> = ({ onNavigate, user }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    discipline: '',
    instructor: '',
    date: '',
    time: '',
    name: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const disciplines = ['Personal Training', 'HIIT Session', 'Strength & Conditioning', 'Combat Sports', 'Yoga & Mobility'];
  const times = ['08:00 AM', '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '05:30 PM', '07:00 PM'];
  const dates = ['Mon, Mar 23', 'Tue, Mar 24', 'Wed, Mar 25', 'Thu, Mar 26', 'Fri, Mar 27'];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      await loginWithGoogle();
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData: Omit<BookingType, 'id'> = {
        userId: user.uid,
        userName: formData.name,
        userEmail: formData.email,
        discipline: formData.discipline,
        instructor: formData.instructor,
        date: formData.date,
        time: formData.time,
        status: 'confirmed',
        createdAt: Date.now()
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      onNavigate('success');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-32 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Left Sidebar - Progress */}
        <div className="md:w-1/3 bg-surface-container-high p-8 md:p-12 flex flex-col justify-between border-r border-outline-variant/20">
          <div>
            <h2 className="font-headline text-3xl font-black uppercase tracking-tighter mb-8 italic">Book Your<br/>Session</h2>
            <div className="space-y-6">
              {[
                { n: 1, label: 'Discipline' },
                { n: 2, label: 'Instructor' },
                { n: 3, label: 'Schedule' },
                { n: 4, label: 'Identity' }
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    step >= s.n ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface-variant'
                  }`}>
                    {step > s.n ? <CheckCircle2 className="w-4 h-4" /> : s.n}
                  </div>
                  <span className={`font-label text-xs uppercase tracking-widest font-bold ${
                    step >= s.n ? 'text-on-surface' : 'text-on-surface-variant'
                  }`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-on-surface-variant font-body leading-relaxed">
              Precision scheduling for the elite. Ensure your placement in the Academy's next intake.
            </p>
          </div>
        </div>

        {/* Right Content - Form Steps */}
        <div className="md:w-2/3 p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="font-headline text-xl font-bold uppercase tracking-tight mb-4">Select Discipline</h3>
                <div className="grid grid-cols-1 gap-3">
                  {disciplines.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setFormData({ ...formData, discipline: d }); handleNext(); }}
                      className={`w-full text-left px-6 py-4 rounded-xl border transition-all flex justify-between items-center ${
                        formData.discipline === d ? 'border-primary-container bg-primary-container/5' : 'border-outline-variant/30 hover:border-primary-container/50'
                      }`}
                    >
                      <span className="font-body font-bold">{d}</span>
                      <ChevronRight className="w-4 h-4 text-primary-container" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="font-headline text-xl font-bold uppercase tracking-tight mb-4">Choose Instructor</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TRAINERS.slice(0, 4).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setFormData({ ...formData, instructor: t.name }); handleNext(); }}
                      className={`text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                        formData.instructor === t.name ? 'border-primary-container bg-primary-container/5' : 'border-outline-variant/30 hover:border-primary-container/50'
                      }`}
                    >
                      <img className="w-12 h-12 rounded-full object-cover grayscale" src={t.image} alt={t.name} referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-bold text-sm">{t.name}</p>
                        <p className="text-[10px] uppercase tracking-widest text-primary-container font-bold">{t.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={handleBack} className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Back</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-headline text-xl font-bold uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary-container" /> Select Date
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dates.map((d) => (
                      <button
                        key={d}
                        onClick={() => setFormData({ ...formData, date: d })}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                          formData.date === d ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-headline text-xl font-bold uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary-container" /> Select Time
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        onClick={() => setFormData({ ...formData, time: t })}
                        className={`px-4 py-3 rounded-lg text-xs font-bold transition-all ${
                          formData.time === t ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface-variant hover:bg-surface-bright'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button onClick={handleBack} className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Back</button>
                  <button 
                    disabled={!formData.date || !formData.time}
                    onClick={handleNext} 
                    className="kinetic-gradient px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-sm text-on-primary-container disabled:opacity-50"
                  >
                    Next Step
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="font-headline text-xl font-bold uppercase tracking-tight mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary-container" /> Athlete Identity
                </h3>
                
                {!user ? (
                  <div className="bg-surface-container-highest p-8 rounded-2xl text-center space-y-6">
                    <p className="text-sm font-body text-on-surface-variant">To secure your placement and join the Academy, please register your athlete profile.</p>
                    <button 
                      onClick={async () => {
                        try {
                          await loginWithGoogle();
                        } catch (error) {
                          // Error already logged in firebase.ts
                        }
                      }}
                      className="w-full flex items-center justify-center gap-3 kinetic-gradient px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-on-primary-container hover:scale-[1.02] transition-transform shadow-xl shadow-primary-container/20"
                    >
                      <LogIn className="w-5 h-5" />
                      Register with Google
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Full Name</label>
                      <input 
                        required
                        className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary-container/40 transition-all" 
                        placeholder="e.g. MARCUS VANE"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Email Address</label>
                      <input 
                        required
                        type="email"
                        className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary-container/40 transition-all" 
                        placeholder="e.g. MARCUS@PERFORMANCE.COM"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="pt-6 flex justify-between items-center">
                      <button type="button" onClick={handleBack} className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Back</button>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="kinetic-gradient px-12 py-4 rounded-lg font-bold uppercase tracking-widest text-sm text-on-primary-container shadow-xl shadow-primary-container/20 flex items-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  );
};
