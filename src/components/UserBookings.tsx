import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../supabase';
import { UserProfile, Booking } from '../types';
import { Calendar, Clock, User, Trash2, Loader2, AlertCircle, ChevronRight } from 'lucide-react';

interface UserBookingsProps {
  user: UserProfile | null;
}

export const UserBookings: React.FC<UserBookingsProps> = ({ user }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.uid)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const bookingsData = data.map(b => ({
          id: b.id,
          userId: b.user_id,
          userName: b.user_name,
          userEmail: b.user_email,
          discipline: b.discipline,
          instructor: b.instructor,
          date: b.date,
          time: b.time,
          status: b.status,
          createdAt: new Date(b.created_at).getTime()
        })) as Booking[];
        
        setBookings(bookingsData);
      } catch (error) {
        console.error('Fetch bookings error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error('Delete booking error:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="pt-40 pb-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-container" />
      </div>
    );
  }

  return (
    <main className="pt-32 pb-24 px-6 md:px-16 lg:px-32 max-w-[1920px] mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="text-primary-container font-label uppercase tracking-[0.3em] text-sm font-bold mb-4 block">Your Schedule</span>
        <h1 className="font-headline text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic">
          Active <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-inverse-primary">Deployments</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="popLayout">
            {bookings.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-surface-container-low p-12 rounded-2xl text-center border border-outline-variant/10"
              >
                <AlertCircle className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-4" />
                <p className="text-on-surface-variant font-body">No active bookings found in your protocol.</p>
              </motion.div>
            ) : (
              bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant/10 hover:border-primary-container/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-primary-container/10 text-primary-container text-[10px] font-black uppercase tracking-widest rounded-full">
                          {booking.discipline}
                        </span>
                        <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                          ID: {booking.id?.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-primary-container" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Date</p>
                            <p className="font-body font-bold">{booking.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                            <Clock className="w-4 h-4 text-primary-container" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Time</p>
                            <p className="font-body font-bold">{booking.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                            <User className="w-4 h-4 text-primary-container" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Instructor</p>
                            <p className="font-body font-bold">{booking.instructor}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-end gap-3">
                      <button 
                        onClick={() => handleDelete(booking.id!)}
                        disabled={deletingId === booking.id}
                        className="p-4 rounded-xl bg-error-container/10 text-error hover:bg-error-container hover:text-on-error-container transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        {deletingId === booking.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4" />
                            <span className="md:hidden text-xs font-bold uppercase tracking-widest">Cancel</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-surface-container-high p-8 rounded-2xl border border-outline-variant/10 sticky top-32">
            <h3 className="font-headline text-xl font-bold uppercase tracking-tight mb-6 italic">Academy Status</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-bottom border-outline-variant/10">
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Membership</span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary-container">{user?.membership || 'Inactive'}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-bottom border-outline-variant/10">
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Total Sessions</span>
                <span className="text-xs font-bold uppercase tracking-widest">{bookings.length}</span>
              </div>
              <div className="pt-4">
                <p className="text-[10px] text-on-surface-variant font-body leading-relaxed uppercase tracking-wider">
                  All sessions are subject to the Academy's 24-hour cancellation protocol. Failure to attend may impact your performance rating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
