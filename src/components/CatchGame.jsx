import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LAUK_LIST = ['🍗', '🥚', '🌶️', '🥒', '🍤', '🥦'];

const CatchGame = ({ onWin }) => {
  const [items, setItems] = useState([]);
  const [particles, setParticles] = useState([]);
  const [score, setScore] = useState(0);
  const [basketPos, setBasketPos] = useState(0); 
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
      setBasketPos(width / 2);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerWidth === 0) return;
      
      const newItem = {
        id: Math.random(),
        x: Math.random() * (containerWidth - 60) + 30, 
        emoji: LAUK_LIST[Math.floor(Math.random() * LAUK_LIST.length)],
        isCaught: false, // Tambahkan flag penanda
      };
      setItems((prev) => [...prev, newItem]);
    }, 500); 
    return () => clearInterval(interval);
  }, [containerWidth]);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const newX = clientX - rect.left;
    
    if (newX > 0 && newX < containerWidth) {
      setBasketPos(newX);
    }
  };

  const triggerExplosion = (x) => {
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Math.random(),
      x: x,
      moveX: (Math.random() - 0.5) * 150,
      moveY: (Math.random() - 0.8) * 150,
    }));
    
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.slice(8));
    }, 600);
  };

  // FUNGSI TANGKAP YANG DIPERBAIKI
  const checkCollision = (id, currentY, itemX) => {
    // Toleransi jarak nampan (basketPos) dengan itemX
    const distance = Math.abs(itemX - basketPos);
    
    if (currentY > 360 && currentY < 400 && distance < 50) {
      setItems((prev) => {
        const itemExists = prev.find(i => i.id === id);
        // Jika item masih ada dan belum ditandai ditangkap
        if (itemExists && !itemExists.isCaught) {
          triggerExplosion(itemX);
          setScore(s => s + 1);
          return prev.filter(i => i.id !== id); // Hapus dari state
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    if (score >= 30) {
      setTimeout(onWin, 500);
    }
  }, [score, onWin]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[450px] bg-gradient-to-b from-yellow-50 to-orange-100 rounded-[32px] border-4 border-dashed border-orange-300 overflow-hidden cursor-none touch-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Score UI */}
      <div className="absolute top-6 w-full text-center z-50 pointer-events-none">
        <div className="inline-block bg-white px-8 py-2 rounded-2xl shadow-xl border-2 border-orange-200">
          <p className="font-black text-3xl text-orange-600">
            {score} <span className="text-sm text-gray-400">/ 30</span>
          </p>
        </div>
      </div>

      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: -50, x: item.x }}
            animate={{ y: 550 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.1 } }} 
            transition={{ duration: 2.5, ease: "linear" }}
            onUpdate={(latest) => {
              // Kirim ID dan koordinat terbaru ke fungsi pengecek
              checkCollision(item.id, latest.y, item.x);
            }}
            className="absolute text-5xl pointer-events-none select-none"
            style={{ left: 0 }} 
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: 380, scale: 1 }}
            animate={{ x: p.x + p.moveX, y: 380 + p.moveY, scale: 0, opacity: 0 }}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full z-40 shadow-[0_0_8px_#facc15]"
          />
        ))}
      </AnimatePresence>

      {/* Nampan */}
      <motion.div
        className="absolute bottom-10 w-28 h-10 z-30 pointer-events-none"
        style={{ left: basketPos, x: '-50%' }}
      >
        <div className="w-full h-full bg-green-700 rounded-full border-b-8 border-green-900 shadow-2xl flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,white_4px,white_5px)]"></div>
          <span className="absolute -top-6 text-3xl">🍃</span>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 h-2 bg-orange-200 w-full">
        <motion.div 
          className="h-full bg-orange-500"
          animate={{ width: `${(score / 30) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default CatchGame;