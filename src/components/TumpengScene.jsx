import { motion, AnimatePresence } from 'framer-motion';
import tumpengAtas from '../assets/tumpeng-atas.png'; 
import tumpengBawah from '../assets/tumpeng-bawah.png';

const TumpengScene = ({ sudahDipotong, onPotong }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 relative">
      
      {/* Container utama harus memiliki ukuran tetap (Square) */}
      <div className="relative h-[350px] w-[350px] md:h-[500px] md:w-[500px] flex items-center justify-center">
        
        {/* Layer Bawah (Lauk & Nampan) - Diam sebagai jangkar */}
        <img 
          src={tumpengBawah}
          alt="Base Tumpeng"
          className="absolute inset-0 z-10 w-full h-full object-contain pointer-events-none"
        />

        {/* Layer Atas (Puncak Nasi) - Yang bergerak */}
        <motion.img 
          src={tumpengAtas}
          alt="Puncak Tumpeng"
          className="absolute inset-0 z-20 w-full h-full object-contain pointer-events-none"
          initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
          animate={sudahDipotong ? { 
            y: -180, // Sesuaikan jarak terbangnya ke atas
            x: 120,  // Sesuaikan jarak terbangnya ke kanan
            rotate: 35, 
            opacity: 0,
            scale: 0.7
          } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            ease: [0.22, 1, 0.36, 1], // Efek gerakan "Snap" yang halus
          }}
        />

        {/* Shadow/Bayangan Tambahan di bawah (Opsional) */}
        {!sudahDipotong && (
           <div className="absolute bottom-10 w-40 h-6 bg-black/10 blur-xl rounded-full z-0"></div>
        )}
      </div>

      {/* Area Tombol */}
      <div className="mt-8 h-20">
        <AnimatePresence>
          {!sudahDipotong && (
            <motion.button 
              onClick={onPotong}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-10 rounded-2xl text-xl shadow-xl transition-all"
            >
              POTONG TUMPENGNYA 🔪
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TumpengScene;