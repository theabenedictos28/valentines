import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QuestionCard = ({ onAccept }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [showReminder, setShowReminder] = useState(false);

  const errorMessages = [
    "Invalid choice detected",
    "System prefers 'Yes'",
    "Seriously? Still clicking this?",
    "Permission denied",
    "JUST. CLICK. YES.",
    "LAST WARNING. CLICK YES.",
  ];

  const handleNoClick = (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);
    setShowReminder(false);

    setTimeout(() => {
      setIsProcessing(false);
      setNoCount((prev) => prev + 1);
      setShowReminder(true);
    }, 1800);
  };

  const emotionalEmojis = ["💖", "🤨", "🥺", "😭", "💔", "😁", "👻"];
  const currentEmoji =
    emotionalEmojis[Math.min(noCount, emotionalEmojis.length - 1)];

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden touch-none">
      {/* 1. LAYER: THE "BE MINE" AMBIENT BACKGROUND */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-[0.05] pointer-events-none select-none">
        {[...Array(8)].map((_, i) => (
          <h1
            key={i}
            className="text-7xl md:text-9xl font-black text-rose-500 -rotate-12 whitespace-nowrap"
          >
            BE MINE? BE MINE? BE MINE?
          </h1>
        ))}
      </div>

      {/* 2. LAYER: THE MAIN CARD */}
      <motion.div
        key={noCount}
        animate={
          showReminder
            ? {
                x: [-12, 12, -12, 12, 0],
                backgroundColor: ["#ffffff", "#fecaca", "#ffffff"],
              }
            : { x: 0 }
        }
        transition={{ duration: 0.4 }}
        className="bg-white/40 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-[0_32px_64px_rgba(244,63,94,0.2)] border border-white/60 text-center w-full max-w-[420px] relative z-10 overflow-hidden"
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEmoji}
              initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              className="text-7xl md:text-8xl mb-6 drop-shadow-sm"
            >
              {currentEmoji}
            </motion.div>
          </AnimatePresence>

          <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-[1.1] mb-2 tracking-tighter">
            Will you be my <br />
            <span className="text-rose-600 drop-shadow-sm">Valentine?</span>
          </h2>

          <div className="h-6 mb-10">
            <AnimatePresence>
              {showReminder ? (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-500 font-bold text-xs uppercase tracking-[0.2em]"
                >
                  ⚠️ Please select the correct option
                </motion.p>
              ) : (
                <p className="text-gray-400 text-sm font-medium">
                  Choose your answer wisely
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {/* YES BUTTON: The Centerpiece */}
          <motion.button
            onClick={onAccept}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="group relative overflow-hidden bg-rose-500 text-white py-5 rounded-[2rem] text-xl font-black shadow-[0_15px_30px_rgba(244,63,94,0.4)]"
          >
            <span className="relative z-10">YES, OF COURSE! ✨</span>
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
          </motion.button>

          {/* NO BUTTON: */}
          <button
            onClick={handleNoClick}
            disabled={isProcessing}
            className={`relative py-5 rounded-[2rem] font-bold border-2 transition-all duration-500 overflow-hidden ${
              isProcessing
                ? "bg-gray-100/50 text-gray-400 border-gray-100"
                : "bg-white/50 text-rose-300 border-rose-100/50 shadow-sm"
            }`}
          >
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm uppercase tracking-widest font-black">
                    {noCount < 1
                      ? "Verifying..."
                      : noCount < 2
                        ? "RUDE! WAIT..."
                        : "DON'T YOU DARE..."}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center leading-none px-2">
                  <span className="text-xl">No</span>
                  {noCount > 0 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      className="text-[16px] mt-1 italic font-medium max-w-[200px] truncate"
                    >
                      ({errorMessages[(noCount - 1) % errorMessages.length]})
                    </motion.span>
                  )}
                </div>
              )}
            </AnimatePresence>

            {isProcessing && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="absolute bottom-0 left-0 h-1 bg-rose-400"
              />
            )}
          </button>
        </div>
      </motion.div>

      <div className="absolute top-[-5%] left-[-5%] w-64 h-64 bg-rose-200/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-5%] right-[-5%] w-64 h-64 bg-pink-200/20 blur-[100px] rounded-full" />
    </div>
  );
};

export default QuestionCard;
