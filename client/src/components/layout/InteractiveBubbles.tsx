import React, { useState, useEffect, useCallback } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const Bubble = ({ id, size, initialX, initialY, onBurst }: { id: number, size: number, initialX: string, initialY: string, onBurst: (id: number) => void }) => {
  const [isBursting, setIsBursting] = useState(false);

  // Smooth mouse interaction
  const springConfig = { damping: 40, stiffness: 100 };
  const translateX = useSpring(0, springConfig);
  const translateY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const bubble = document.getElementById(`bubble-${id}`);
      if (!bubble) return;
      
      const rect = bubble.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      
      // Move after touching cursur (Float around or follow)
      if (dist < 400) {
        // Move towards mouse but maintain some distance/float
        const targetX = (e.clientX - centerX) * 0.5;
        const targetY = (e.clientY - centerY) * 0.5;
        translateX.set(targetX);
        translateY.set(targetY);
      } else {
        translateX.set(0);
        translateY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [id, translateX, translateY]);

  const handleBurst = () => {
    setIsBursting(true);
    setTimeout(() => onBurst(id), 500);
  };

  return (
    <AnimatePresence>
      {!isBursting && (
        <motion.div
          id={`bubble-${id}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 0.5,
            x: [0, 20, -20, 0],
            y: [0, -30, 30, 0],
          }}
          exit={{ 
            scale: 3, 
            opacity: 0,
            transition: { duration: 0.4, ease: "easeOut" }
          }}
          transition={{
            scale: { duration: 0.6 },
            opacity: { duration: 0.8 },
            x: { duration: 20 + Math.random() * 10, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 15 + Math.random() * 8, repeat: Infinity, ease: "easeInOut" },
          }}
          onDoubleClick={handleBurst}
          // Support for touch devices (double tap)
          onTouchStart={(e) => {
            if (e.touches.length === 2) handleBurst();
          }}
          style={{ 
            position: 'fixed', // Fixed to cover whole website
            left: initialX,
            top: initialY,
            width: size,
            height: size,
            x: translateX,
            y: translateY,
            cursor: 'pointer',
            pointerEvents: 'auto',
            zIndex: 1 // Stay above background but below content if needed
          }}
          className="group"
        >
          {/* Soap Bubble Aesthetic */}
          <div className="absolute inset-0 rounded-full border border-white/5 shadow-[inset_0_0_30px_rgba(255,255,255,0.03)] backdrop-blur-[8px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-300/5 via-purple-300/5 to-emerald-300/5 opacity-10 mix-blend-screen" />
            <div className="absolute top-[20%] left-[20%] w-[15%] h-[15%] rounded-full bg-white/10 blur-[5px]" />
            
            <style>{`
              #bubble-${id} {
                animation: wobble ${8 + Math.random() * 4}s ease-in-out infinite;
              }
              @keyframes wobble {
                0%, 100% { border-radius: 50%; }
                25% { border-radius: 48% 52% 45% 55% / 55% 45% 55% 45%; }
                50% { border-radius: 52% 48% 55% 45% / 45% 55% 45% 55%; }
                75% { border-radius: 45% 55% 50% 50% / 50% 50% 55% 45%; }
              }
            `}</style>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const InteractiveBubbles = () => {
  const [bubbles, setBubbles] = useState(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: 150 + Math.random() * 200,
      x: `${Math.random() * 90}%`,
      y: `${Math.random() * 90}%`,
    }))
  );

  const burstBubble = useCallback((id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setTimeout(() => {
      const newBubble = {
        id: Date.now(),
        size: 150 + Math.random() * 200,
        x: `${Math.random() * 90}%`,
        y: `${Math.random() * 90}%`,
      };
      setBubbles(prev => [...prev, newBubble]);
    }, 4000);
  }, []);

  return (
    <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none select-none">
      {bubbles.map(b => (
        <Bubble 
          key={b.id} 
          id={b.id} 
          size={b.size} 
          initialX={b.x} 
          initialY={b.y} 
          onBurst={burstBubble} 
        />
      ))}
    </div>
  );
};
