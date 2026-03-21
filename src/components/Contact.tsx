import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Car, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <main className="pt-32 min-h-screen overflow-x-hidden">
      <section className="px-6 md:px-16 lg:px-32 mb-16 max-w-[1920px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
        >
          <div className="md:col-span-8">
            <span className="text-primary-container font-headline font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Engineered for Performance</span>
            <h1 className="font-headline font-black text-6xl md:text-8xl tracking-tighter leading-[0.9] text-on-background uppercase">Get in<br/>Touch.</h1>
          </div>
          <div className="md:col-span-4 pb-2">
            <p className="text-on-surface-variant font-body text-lg max-w-sm border-l-2 border-primary-container pl-6">
              Whether you're looking for elite training or membership details, our team is ready to assist your journey to peak performance.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-16 lg:px-32 mb-20 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-surface-container-low p-8 md:p-12 lg:rounded-l-xl"
          >
            <div className="space-y-12 mb-16">
              <div className="flex flex-col gap-2">
                <span className="text-primary-container font-headline text-xs font-bold uppercase tracking-widest">Location</span>
                <h3 className="text-2xl font-headline font-bold">128 Kinetic Way,<br/>New York, NY 10013</h3>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-primary-container font-headline text-xs font-bold uppercase tracking-widest">Connect</span>
                <div className="space-y-1">
                  <p className="text-xl font-headline font-bold">+1 (212) 555-0198</p>
                  <p className="text-xl font-headline font-bold">hq@gymacademy.fit</p>
                </div>
              </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="group">
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Name</label>
                <input 
                  className="w-full bg-surface-container-highest border-none rounded-md px-4 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary-container/40 transition-all font-body" 
                  placeholder="ALEX MERCER" 
                  type="text"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Email</label>
                <input 
                  className="w-full bg-surface-container-highest border-none rounded-md px-4 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary-container/40 transition-all font-body" 
                  placeholder="ALEX@PERFORMANCE.COM" 
                  type="email"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Subject</label>
                <select className="w-full bg-surface-container-highest border-none rounded-md px-4 py-4 text-on-surface focus:ring-1 focus:ring-primary-container/40 transition-all font-body appearance-none">
                  <option>Membership Inquiry</option>
                  <option>Personal Training</option>
                  <option>Corporate Accounts</option>
                  <option>Press & Media</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Message</label>
                <textarea 
                  className="w-full bg-surface-container-highest border-none rounded-md px-4 py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary-container/40 transition-all font-body resize-none" 
                  placeholder="TELL US ABOUT YOUR GOALS..." 
                  rows={4}
                ></textarea>
              </div>
              <button className="w-full kinetic-gradient text-on-primary-container py-5 rounded-md font-label font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary-container/10 hover:shadow-primary-container/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative min-h-[500px] lg:h-auto lg:rounded-r-xl overflow-hidden grayscale contrast-125 brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
          >
            <img 
              alt="Location Map" 
              className="absolute inset-0 w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent hidden lg:block"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative group/pin cursor-pointer">
                <div className="absolute inset-0 bg-primary-container rounded-full blur-2xl opacity-50 animate-pulse group-hover/pin:opacity-100 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-primary-container rounded-full flex items-center justify-center border-4 border-background shadow-2xl group-hover/pin:scale-110 transition-transform">
                  <MapPin className="text-white w-8 h-8" />
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-surface-container-highest px-4 py-2 rounded-lg border border-outline-variant/30 whitespace-nowrap shadow-2xl">
                    <p className="font-headline font-bold text-xs uppercase tracking-widest">Open in Google Maps</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-surface-container-highest/90 backdrop-blur-md px-6 py-3 rounded-xl border border-outline-variant/30 text-center shadow-2xl">
                <span className="font-headline font-bold text-base tracking-tight block">GYM ACADEMY HQ</span>
                <p className="text-[10px] text-on-surface-variant font-label uppercase tracking-[0.2em] mt-1">Active 24/7 • Kinetic District</p>
                <button className="mt-4 text-[10px] font-black uppercase tracking-widest text-primary-container hover:underline flex items-center gap-2 mx-auto">
                  Get Directions <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 space-y-2 hidden md:block">
              <div className="bg-surface-container-lowest/80 backdrop-blur-md p-4 rounded-xl border border-outline-variant/20 flex gap-6">
                <div className="text-center">
                  <span className="block text-primary-container font-headline font-black text-xl">45k</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold opacity-60">Sq Ft Space</span>
                </div>
                <div className="w-px h-8 bg-outline-variant/30 self-center"></div>
                <div className="text-center">
                  <span className="block text-primary-container font-headline font-black text-xl">12</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold opacity-60">Elite Zones</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-32 pb-32 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { icon: <Car className="text-primary-container w-8 h-8" />, title: 'Parking & Access', desc: 'Complimentary valet parking available for Elite members. Dedicated secure bike storage located at the North entrance.' },
          { icon: <Clock className="text-primary-container w-8 h-8" />, title: 'Operating Hours', desc: 'Staffed Hours: Mon-Fri 05:00 - 23:00. Weekend 07:00 - 20:00. Digital key access available 24/7 for qualified tiers.' },
          { icon: <ShieldCheck className="text-primary-container w-8 h-8" />, title: 'Safety Protocol', desc: 'Our facility maintains hospital-grade air filtration and hourly sanitization cycles of all high-impact training surfaces.' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="space-y-4"
          >
            {item.icon}
            <h4 className="font-headline font-bold text-xl uppercase tracking-tight">{item.title}</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
};
