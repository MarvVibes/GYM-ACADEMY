import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRICING } from '../constants';
import { CheckCircle2, MinusCircle, Loader2 } from 'lucide-react';
import { Screen, UserProfile, Membership as MembershipType } from '../types';
import { db, collection, addDoc, doc, updateDoc, loginWithGoogle, handleFirestoreError, OperationType } from '../firebase';

interface MembershipProps {
  user: UserProfile | null;
  onNavigate: (screen: Screen) => void;
}

export const Membership: React.FC<MembershipProps> = ({ user, onNavigate }) => {
  const [joiningTier, setJoiningTier] = useState<string | null>(null);

  const handleJoin = async (tier: typeof PRICING[0]) => {
    if (!user) {
      try {
        await loginWithGoogle();
      } catch (error) {
        // Error already logged in firebase.ts
      }
      return;
    }

    setJoiningTier(tier.id);
    try {
      const membershipData: Omit<MembershipType, 'id'> = {
        userId: user.uid,
        tierId: tier.id,
        tierName: tier.name,
        price: tier.price,
        status: 'active',
        startDate: Date.now(),
        nextBillingDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days later
        createdAt: Date.now()
      };

      // Save membership record
      await addDoc(collection(db, 'memberships'), membershipData);

      // Update user profile with membership status
      await updateDoc(doc(db, 'users', user.uid), {
        membership: tier.name,
        updatedAt: Date.now()
      });

      onNavigate('success');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'memberships');
    } finally {
      setJoiningTier(null);
    }
  };

  return (
    <main className="pt-32 pb-24 overflow-x-hidden">
      <section className="mb-20 px-6 md:px-16 lg:px-32 max-w-[1920px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end"
        >
          <div className="lg:col-span-7">
            <span className="text-primary-container font-label uppercase tracking-[0.3em] text-sm font-bold mb-4 block">Engineered for Performance</span>
            <h1 className="font-headline text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic">
              Select Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-inverse-primary">Academy Tier</span>
            </h1>
          </div>
          <div className="lg:col-span-5 pb-4">
            <p className="text-on-surface-variant font-body text-lg leading-relaxed max-w-md">
              Precision-engineered training environments. Tiered access designed to push human limits. Choose your discipline.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 lg:px-32 max-w-[1920px] mx-auto">
        {PRICING.map((tier, i) => (
          <motion.div 
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-10 rounded-2xl flex flex-col transition-all duration-700 border border-outline-variant/5 ${
              tier.popular 
                ? 'relative bg-surface-container-high ring-2 ring-primary-container shadow-2xl scale-105 z-10 overflow-hidden' 
                : 'bg-surface-container-low hover:bg-surface-container hover:border-primary-container/20'
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container px-6 py-2 font-label text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-xl">
                Most Popular
              </div>
            )}
            
            <div className="mb-12">
              <span className="text-primary-container font-label text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Academy Tier</span>
              <h3 className={`font-headline text-3xl font-black uppercase mb-4 tracking-tight ${tier.popular ? 'text-primary-container' : ''}`}>
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-5xl font-black tracking-tighter">${tier.price}</span>
                <span className="text-on-surface-variant font-body font-medium opacity-60">/mo</span>
              </div>
            </div>

            <div className="flex-grow space-y-6 mb-12">
              {tier.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 group/feature">
                  <div className="w-5 h-5 rounded-full bg-primary-container/10 flex items-center justify-center shrink-0 group-hover/feature:bg-primary-container transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-primary-container group-hover/feature:text-on-primary-container transition-colors" />
                  </div>
                  <p className="text-on-surface font-body font-medium text-sm leading-tight">{feature}</p>
                </div>
              ))}
              {tier.notIncluded?.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 opacity-30">
                  <div className="w-5 h-5 rounded-full bg-on-surface/5 flex items-center justify-center shrink-0">
                    <MinusCircle className="w-3 h-3" />
                  </div>
                  <p className="text-on-surface font-body font-medium text-sm line-through">{feature}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleJoin(tier)}
              disabled={joiningTier !== null}
              className={`w-full py-5 rounded-xl font-label uppercase tracking-[0.2em] text-xs font-black transition-all duration-500 flex items-center justify-center gap-2 ${
                tier.popular 
                  ? 'kinetic-gradient text-white shadow-xl shadow-primary-container/20 hover:scale-[1.02] hover:shadow-primary-container/40' 
                  : 'bg-surface-container-highest text-on-surface hover:bg-primary-container hover:text-on-primary-container'
              }`}
            >
              {joiningTier === tier.id ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                tier.popular ? 'Claim Elite Access' : 'Begin Protocol'
              )}
            </button>
          </motion.div>
        ))}
      </section>

      <section className="mt-32 px-6 md:px-16 lg:px-32 max-w-[1920px] mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] overflow-hidden rounded-2xl group"
          >
            <img 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" 
              alt="Elite Atmosphere"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h4 className="font-headline text-3xl font-black uppercase tracking-tighter italic mb-2">Elite Atmosphere</h4>
              <p className="font-body text-sm text-on-surface-variant">Where champions are forged in solitude and focused energy.</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12 pl-0 md:pl-12"
          >
            <div>
              <h3 className="font-headline text-4xl font-black uppercase tracking-tighter mb-6">Built Different</h3>
              <p className="text-on-surface-variant leading-relaxed text-lg mb-8">
                We don't do generic. Our academies are equipped with professional-grade biomechanical machines, olympic-spec platforms, and recovery tech usually reserved for pro-league facilities.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Operation', val: '24/7' },
                { label: 'Pro Coaches', val: '50+' },
                { label: 'Prime Locations', val: '12' },
                { label: 'Excuses', val: '0' }
              ].map((stat, i) => (
                <div key={i}>
                  <span className="block font-headline text-4xl font-black text-primary-container mb-1">{stat.val}</span>
                  <span className="block font-label text-xs uppercase tracking-widest font-bold">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};
