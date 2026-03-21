import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, collection, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile, Booking, Membership } from '../types';
import { Users, Calendar, CreditCard, CheckCircle, XCircle, Trash2, Search, Filter, ChevronRight, ShieldCheck } from 'lucide-react';

interface AdminDashboardProps {
  currentUser: UserProfile;
}

type AdminTab = 'athletes' | 'bookings' | 'memberships';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('athletes');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (currentUser.role !== 'admin') return;

    setLoading(true);

    // Real-time listeners for all collections
    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs.map(doc => doc.data() as UserProfile);
      setUsers(usersData.sort((a, b) => b.createdAt - a.createdAt));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'users'));

    const unsubBookings = onSnapshot(query(collection(db, 'bookings'), orderBy('createdAt', 'desc')), (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Booking));
      setBookings(bookingsData);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'bookings'));

    const unsubMemberships = onSnapshot(query(collection(db, 'memberships'), orderBy('createdAt', 'desc')), (snapshot) => {
      const membershipsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Membership));
      setMemberships(membershipsData);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'memberships'));

    return () => {
      unsubUsers();
      unsubBookings();
      unsubMemberships();
    };
  }, [currentUser]);

  const handleUpdateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${bookingId}`);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to delete this booking record?')) return;
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `bookings/${bookingId}`);
    }
  };

  if (currentUser.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-10 h-10 text-primary-container" />
        </div>
        <h2 className="font-headline text-2xl font-black uppercase tracking-tight mb-2">Access Restricted</h2>
        <p className="text-on-surface-variant max-w-md">This sector is reserved for Academy Administrators only. Your credentials do not grant access to this terminal.</p>
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    u.displayName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBookings = bookings.filter(b => 
    b.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.discipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMemberships = memberships.filter(m => 
    m.tierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-32 max-w-[1920px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-primary-container"></span>
            <span className="font-label text-[10px] font-bold tracking-[0.4em] text-primary-container uppercase">Command Center</span>
          </div>
          <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-4 bg-surface-container-high p-1 rounded-xl border border-outline-variant/10">
          {(['athletes', 'bookings', 'memberships'] as AdminTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-primary-container text-on-primary-container shadow-lg shadow-primary-container/20' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Overview */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-5 h-5 text-primary-container" />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total Athletes</span>
            </div>
            <p className="text-4xl font-black font-headline">{users.length}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-5 h-5 text-primary-container" />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Active Bookings</span>
            </div>
            <p className="text-4xl font-black font-headline">{bookings.filter(b => b.status === 'confirmed').length}</p>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-5 h-5 text-primary-container" />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Memberships</span>
            </div>
            <p className="text-4xl font-black font-headline">{memberships.length}</p>
          </div>

          <div className="pt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/10 rounded-xl py-3 pl-12 pr-4 text-sm font-body focus:outline-none focus:border-primary-container/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-64"
              >
                <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {activeTab === 'athletes' && (
                  <div className="bg-surface-container-low rounded-2xl border border-outline-variant/5 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-surface-container-high/50 border-b border-outline-variant/10">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Athlete</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Role</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Membership</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Joined</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/5">
                          {filteredUsers.map((user) => (
                            <tr key={user.uid} className="hover:bg-surface-container-high/30 transition-colors group">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                                  <div>
                                    <p className="text-sm font-bold uppercase tracking-tight">{user.displayName}</p>
                                    <p className="text-[10px] text-on-surface-variant">{user.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                                  user.role === 'admin' ? 'bg-primary-container/10 text-primary-container' : 'bg-surface-container-highest text-on-surface-variant'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <p className="text-xs font-bold uppercase tracking-tight text-primary-container">
                                  {user.membership || 'Guest'}
                                </p>
                              </td>
                              <td className="px-6 py-4 text-xs text-on-surface-variant">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <div key={booking.id} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            booking.status === 'confirmed' ? 'bg-primary-container/10 text-primary-container' : 
                            booking.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 
                            'bg-surface-container-highest text-on-surface-variant'
                          }`}>
                            <Calendar className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-headline font-bold uppercase tracking-tight">{booking.discipline}</h4>
                              <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded ${
                                booking.status === 'confirmed' ? 'bg-primary-container text-on-primary-container' : 
                                booking.status === 'completed' ? 'bg-emerald-500 text-white' : 
                                'bg-surface-container-highest text-on-surface-variant'
                              }`}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="text-xs text-on-surface-variant mb-2">with {booking.instructor} • {booking.date} at {booking.time}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Athlete:</p>
                              <p className="text-[10px] font-black uppercase tracking-widest text-primary-container">{booking.userName}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {booking.status === 'confirmed' && (
                            <button 
                              onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                              title="Mark as Completed"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <button 
                              onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}
                              className="p-2 rounded-lg bg-primary-container/10 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all"
                              title="Cancel Booking"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="p-2 rounded-lg bg-surface-container-highest text-on-surface-variant hover:bg-on-surface hover:text-surface transition-all"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {filteredBookings.length === 0 && (
                      <div className="text-center py-12 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/20">
                        <p className="text-on-surface-variant text-sm">No booking records found.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'memberships' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredMemberships.map((membership) => (
                      <div key={membership.id} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                          <ShieldCheck className="w-5 h-5 text-primary-container/20 group-hover:text-primary-container transition-colors" />
                        </div>
                        <div className="mb-4">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary-container mb-1 block">Active Subscription</span>
                          <h4 className="font-headline text-xl font-black uppercase tracking-tight">{membership.tierName}</h4>
                        </div>
                        <div className="space-y-2 mb-6">
                          <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                            <span className="text-on-surface-variant">Price</span>
                            <span>{membership.price}</span>
                          </div>
                          <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                            <span className="text-on-surface-variant">Started</span>
                            <span>{new Date(membership.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                            <span className="text-on-surface-variant">Athlete ID</span>
                            <span className="text-primary-container">{membership.userId.slice(0, 8)}...</span>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-outline-variant/5">
                          <p className="text-[9px] text-on-surface-variant uppercase tracking-widest">Status: <span className="text-emerald-500 font-black">{membership.status}</span></p>
                        </div>
                      </div>
                    ))}
                    {filteredMemberships.length === 0 && (
                      <div className="col-span-full text-center py-12 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/20">
                        <p className="text-on-surface-variant text-sm">No membership records found.</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
