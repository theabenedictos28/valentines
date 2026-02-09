import { motion } from "framer-motion";

const Background = () => {
  const symbols = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fff1f2] touch-none">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-pink-300/40 blur-[130px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-rose-300/40 blur-[130px] rounded-full"
      />

      {symbols.map((_, i) => {
        const size = Math.random() * 40 + 20;
        const duration = Math.random() * 6 + 4; 

        return (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: "110vh",
              x: `${Math.random() * 100}vw`,
              rotate: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: "-20vh",
              rotate: Math.random() > 0.5 ? 360 : -360,
              scale: [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
            className="absolute select-none pointer-events-none"
            style={{ fontSize: `${size}px` }}
          >
            {["❤️", "💖", "💝", "✨", "🌹"][Math.floor(Math.random() * 5)]}
          </motion.div>
        );
      })}

      {[...Array(10)].map((_, i) => (
        <div
          key={`static-${i}`}
          className="absolute opacity-[0.1] blur-[2px]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: "40px",
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default Background;
