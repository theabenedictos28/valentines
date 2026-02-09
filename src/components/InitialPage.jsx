import { motion } from "framer-motion";

const InitialPage = ({ onOpen }) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 text-center min-h-[80vh]">
      {/* 1. LAYER: AMBIENT TEXT BACKGROUND */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-[0.03] pointer-events-none select-none">
        {[...Array(6)].map((_, i) => (
          <h1
            key={i}
            className="text-7xl md:text-9xl font-black text-rose-500 -rotate-12 whitespace-nowrap"
          >
            OPEN ME OPEN ME OPEN ME
          </h1>
        ))}
      </div>

      {/* 2. LAYER: THE FLOATING ENVELOPE */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpen}
          className="cursor-pointer relative group flex flex-col items-center"
        >
          {/* Pulsating Glow behind the envelope */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-rose-200 blur-3xl rounded-full -z-10"
          />

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-[140px] md:text-[180px] leading-none drop-shadow-2xl"
          >
            💌
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 3. LAYER: CALL TO ACTION */}
      <div className="mt-12 relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-black text-gray-800 tracking-tighter mb-8"
        >
          Hey! You have <br />
          <span className="text-rose-500">a secret message</span>
        </motion.h1>

        {/* NEW: A REAL BUTTON so users know exactly where to click */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_10px_20px_rgba(244,63,94,0.3)] flex items-center gap-2 group transition-all"
        >
          <span>Open Invitation</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </motion.button>

        <p className="mt-4 text-rose-400/60 font-bold uppercase text-[10px] tracking-[0.4em]">
          Tap the heart or the button
        </p>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-200/20 blur-[100px] -z-10 rounded-full" />
    </div>
  );
};

export default InitialPage;
