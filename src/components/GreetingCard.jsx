import { motion } from 'framer-motion';

const GreetingCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-xl w-full bg-white/95 backdrop-blur-lg p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-b-8 border-r-8 border-green-700 relative overflow-hidden"
    >
      {/* Dekorasi Pojok (Vibes Kode) */}
      <div className="absolute top-4 right-6 font-mono text-[10px] text-green-500 opacity-40 select-none">
        &lt;sys.birthday_msg /&gt;
      </div>

      <h2 className="text-4xl font-black text-green-900 mb-6 leading-tight">
        HBD SINDY! 🥳
      </h2>
      
      <div className="space-y-5 text-gray-800 text-[1.05rem] leading-relaxed text-left">
        <p className="font-medium text-xl text-orange-700">
          Yo Sis!!
        </p>
        
        <p>
          Inget tumpeng kuningku yang gagal total dulu ga? wkwkwk. Kalo dulu bentuk fisiknya tidak terkirim dengan baik, yaudah lah ya... sekarang <span className="underline decoration-yellow-400 decoration-2 font-bold">versi digitalnya</span> aja yang muncul di layar HP-mu.
        </p>

        <p>
          Berhubung sekarang aku lagi belajar jadi anak IT, ya kado ultahmu kali ini lewat ketikan kode dulu ya SIS!! Masih sederhana banget sih web-nya, jangan dibandingin sama punya orang-orang yang udah jago. Tapi yang penting niatnya aja tulus 100% wkwkwk.
        </p>

        {/* Kotak Doa & Harapan */}
        <div className="bg-green-50 p-5 rounded-2xl border-l-4 border-green-600 shadow-sm space-y-3">
          <p className="text-green-900 font-medium leading-relaxed">
            Harapan buat Sindy di tahun yang baru ini: <br />
            Semoga panjang umur, sehat terus lahir batin, rezekinya ngalir lancar kayak air, dan semua urusanmu dipermudah.
          </p>
          <p className="font-bold text-green-700 text-xl italic leading-tight">
             "Wish u all the best for your life!! Semoga semua yang kamu semogakan segera jadi kenyataan!" 🥂✨
          </p>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-dashed border-gray-300 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Project: Tumpeng 2.0
          </p>
          <p className="text-xs text-green-700 font-semibold italic">
            Made by Akbar-Asep
          </p>
        </div>
        {/* Ikon kecil sebagai pemanis */}
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-4xl"
        >
          🚀
        </motion.div>
      </div>

      {/* Ornamen Nasi Kuning Kecil di Background */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl" />
    </motion.div>
  );
};

export default GreetingCard;