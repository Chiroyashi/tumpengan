import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TumpengScene from './components/TumpengScene';
import GreetingCard from './components/GreetingCard';
import CatchGame from './components/CatchGame'; // Pastikan file ini sudah dibuat
import Confetti from 'react-confetti';

function App() {
  // State untuk alur halaman: 'tumpeng' | 'game' | 'greeting'
  const [step, setStep] = useState('tumpeng');
  const [sudahDipotong, setSudahDipotong] = useState(false);
  
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePotong = () => {
    setSudahDipotong(true);
    
    // Mulai musik saat interaksi pertama
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }

    // Pindah ke Game setelah animasi potong tumpeng selesai (1.5 detik)
    setTimeout(() => {
      setStep('game');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] font-sans selection:bg-yellow-200 flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      {/* 1. AUDIO (Non-stop dari awal klik sampai akhir) */}
      <audio ref={audioRef} loop>
        <source src="/musik-ultah.mp3" type="audio/mpeg" />
      </audio>

      {/* 2. CONFETTI (Hanya muncul di halaman terakhir/Greeting) */}
      {step === 'greeting' && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          colors={['#facc15', '#fbbf24', '#b91c1c', '#15803d']} 
          numberOfPieces={300}
          gravity={0.15}
          recycle={true}
        />
      )}

      {/* 3. BACKGROUND ORNAMEN */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-thin.png')]"></div>

      {/* 4. LOGIKA ROUTING HALAMAN */}
      <AnimatePresence mode="wait">
        
        {/* STEP: TUMPENG */}
        {step === 'tumpeng' && (
          <motion.div 
            key="tumpeng-step"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="z-10 text-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="bg-green-100 text-green-800 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-sm">
                Tradisi Digital Untuk
              </span>
              <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-900 via-green-700 to-green-500 mt-4 tracking-tighter">
                SINDY.
              </h1>
            </motion.div>

            <TumpengScene sudahDipotong={sudahDipotong} onPotong={handlePotong} />
          </motion.div>
        )}

        {/* STEP: MINI GAME */}
        {step === 'game' && (
          <motion.div 
            key="game-step"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="z-10 w-full max-w-2xl text-center"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-black text-orange-800 uppercase italic">
                Waduh lauknya berhamburan! 😱
              </h2>
              <p className="text-gray-600 font-medium">Tangkap 10 lauk buat dapetin ucapan rahasia!</p>
            </div>
            
            <CatchGame onWin={() => setStep('greeting')} />
          </motion.div>
        )}

        {/* STEP: GREETING CARD */}
        {step === 'greeting' && (
          <motion.div 
            key="greeting-step"
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            className="z-10 w-full flex justify-center"
          >
            <GreetingCard />
          </motion.div>
        )}

      </AnimatePresence>

      {/* 5. FOOTER STATIC */}
      <footer className="fixed bottom-6 text-gray-400 text-[10px] uppercase tracking-[0.4em] font-bold z-0">
        IT PROJECT // EST. HIGH SCHOOL — 2024
      </footer>
    </div>
  );
}

export default App;