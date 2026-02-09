import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import InitialPage from "./components/InitialPage";
import QuestionCard from "./components/QuestionCard";
import SuccessPage from "./components/SuccessPage";
import Background from "./components/Background";

export default function App() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Come back! ❤️" : "For my Valentine";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const [phase, setPhase] = useState(0);

  const handleAccept = () => {
    setPhase(2);

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <Background />

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <InitialPage key="initial" onOpen={() => setPhase(1)} />
        )}

        {phase === 1 && <QuestionCard key="question" onAccept={handleAccept} />}

        {phase === 2 && <SuccessPage key="success" />}
      </AnimatePresence>
    </div>
  );
}
