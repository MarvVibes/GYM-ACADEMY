import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // High-energy instrumental gym track (Royalty-free placeholder)
  const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Placeholder high-energy track

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error('Audio playback failed:', err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Show tooltip initially to encourage interaction
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 6000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="relative flex items-center gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-4 px-3 py-1.5 bg-surface-container-highest rounded-lg border border-outline-variant/20 whitespace-nowrap hidden md:block"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-container">
              {isPlaying ? 'Mute Atmosphere' : 'Activate Atmosphere'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleMusic}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
          isPlaying 
            ? 'bg-primary-container/10 border-primary-container text-primary-container shadow-lg shadow-primary-container/20' 
            : 'bg-surface-container-highest border-outline-variant/20 text-on-surface-variant hover:border-primary-container/50'
        }`}
      >
        {isPlaying ? (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Volume2 className="w-4 h-4" />
          </motion.div>
        ) : (
          <VolumeX className="w-4 h-4" />
        )}

        {/* Visualizer bars when playing */}
        {isPlaying && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 h-3 items-end">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 12, 4] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.5 + (i * 0.1),
                  ease: 'easeInOut'
                }}
                className="w-0.5 bg-primary-container rounded-full"
              />
            ))}
          </div>
        )}
      </button>

      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
      />
    </div>
  );
};
