import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const SuccessPage = () => {
  const today = new Date();
  const valentine = new Date(today.getFullYear(), 1, 14);
  const diff = valentine - today;
  const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [showLoveNote, setShowLoveNote] = useState(false);
  const [currentLoveNote, setCurrentLoveNote] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [kisses, setKisses] = useState(0);
  const [showKissAnimation, setShowKissAnimation] = useState(false);
  const [showHugAnimation, setShowHugAnimation] = useState(false);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [showMemory, setShowMemory] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(0);

  // 🎵 Your Romantic Playlist!
  const playlist = [
    {
      title: "Libu-libong buwan",
      artist: "Kyle Raphael",
      videoId: "tVRfUqyDJyM",
      quote: "Every time I hear this, I think of us."
    },
    {
      title: "Hindi Ako Mawawala",
      artist: "El Manu",
      videoId: "3zp0BPaqsS8",
      quote: "I can't imagine life without you."
    },
    {
      title: "Nahanap Kita",
      artist: "Amiel Sol",
      videoId: "FPz9GSC5QlM",
      quote: "I like you a lot… like, a lot a lot."
    },
    {
      title: "Palayo Sa Mundo",
      artist: "Jolianne, Arthur Nery",
      videoId: "mVRAGW3TggU",
      quote: "Life's better with you in it..."
    },
    {
      title: "Tahanan",
      artist: "El Manu",
      videoId: "PLrd-rILKtc",
      quote: "Being with you feels like home..."
    }
  ];

  // 💌 Love Notes
  const loveNotes = [
    "You make every day brighter just by existing 🌟",
    "I smile every time I think of you (which is basically all the time) 😊",
    "You're my favorite notification 💬",
    "Can't wait to make more memories with you 📸",
    "Life is sweeter with you 🍬",
    "You make me feel butterflies daily 🦋",
    "You're not just my Valentine, you're my always 💕",
    "Thanks for being the best part of my day, every day 🌈"
  ];

  // 📸 Our Memories
  const memories = [
    { emoji: "🌟", text: "The first time we talked", color: "from-yellow-400 to-orange-400" },
    { emoji: "😊", text: "When you made me laugh so hard", color: "from-blue-400 to-cyan-400" },
    { emoji: "💭", text: "Our late night conversations", color: "from-purple-400 to-pink-400" },
    { emoji: "🎵", text: "Sharing our favorite songs", color: "from-green-400 to-teal-400" },
    { emoji: "🌈", text: "Every moment we've shared", color: "from-rose-400 to-pink-400" }
  ];

  // Cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setCursorTrail((prev) => [...prev.slice(-8), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Remove old trail items
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail((prev) => prev.slice(-5));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('youtube-iframe-api')) {
      return;
    }

    const tag = document.createElement('script');
    tag.id = 'youtube-iframe-api';
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player('youtube-player', {
        videoId: "tVRfUqyDJyM", // First song videoId
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            }
          }
        }
      });
    };

    // If YT is already loaded, initialize player
    if (window.YT && window.YT.Player) {
      const newPlayer = new window.YT.Player('youtube-player', {
        videoId: "tVRfUqyDJyM",
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            }
          }
        }
      });
    }
  }, []);

  const toggleMusic = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const playSong = (index) => {
    if (player) {
      player.loadVideoById(playlist[index].videoId);
      player.playVideo();
      setCurrentSong(index);
    }
  };

  const nextSong = () => {
    const nextIndex = (currentSong + 1) % playlist.length;
    playSong(nextIndex);
  };

  const prevSong = () => {
    const prevIndex = (currentSong - 1 + playlist.length) % playlist.length;
    playSong(prevIndex);
  };

  const showRandomLoveNote = () => {
    const randomIndex = Math.floor(Math.random() * loveNotes.length);
    setCurrentLoveNote(randomIndex);
    setShowLoveNote(true);
    setTimeout(() => setShowLoveNote(false), 4000);
  };

  const sendKiss = () => {
    setKisses(prev => prev + 1);
    setShowKissAnimation(true);
    setTimeout(() => setShowKissAnimation(false), 2000);
  };

  const sendHug = () => {
    setShowHugAnimation(true);
    setTimeout(() => setShowHugAnimation(false), 3000);
  };

  const showRandomMemory = () => {
    const randomIndex = Math.floor(Math.random() * memories.length);
    setCurrentMemory(randomIndex);
    setShowMemory(true);
  };

  const closeAllModals = () => {
    setShowLoveNote(false);
    setShowMemory(false);
    setShowKissAnimation(false);
    setShowHugAnimation(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const FloatingHeart = ({ delay, duration, startX }) => (
    <motion.div
      initial={{ y: "100vh", x: startX, opacity: 0 }}
      animate={{ 
        y: "-20vh", 
        opacity: [0, 1, 1, 0],
        x: startX + Math.sin(delay) * 30
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute text-2xl pointer-events-none"
      style={{ left: `${startX}%` }}
    >
      💕
    </motion.div>
  );



  return (
    <>
      {/* Cursor Trail */}
      {cursorTrail.map((trail, index) => (
        <motion.div
          key={trail.id}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed pointer-events-none z-40"
          style={{
            left: trail.x - 10,
            top: trail.y - 10,
          }}
        >
          <span className="text-xl">
            {['💕', '💖', '✨', '💝'][index % 4]}
          </span>
        </motion.div>
      ))}

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <FloatingHeart 
            key={i}
            delay={i * 2}
            duration={8 + Math.random() * 4}
            startX={10 + i * 12}
          />
        ))}
      </div>

      {/* Confetti Effect */}
      {showConfetti && <Confetti />}

      {/* Kiss Animation */}
      {showKissAnimation && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAllModals}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          />
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1
                }}
                animate={{ 
                  x: Math.cos((i / 12) * Math.PI * 2) * 300,
                  y: Math.sin((i / 12) * Math.PI * 2) * 300,
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut"
                }}
                className="absolute text-4xl"
              >
                💋
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Hug Animation */}
      {showHugAnimation && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAllModals}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1,
                repeat: 2
              }}
              className="text-9xl"
            >
              🤗
            </motion.div>
          </motion.div>
        </>
      )}

      {/* Love Note Popup */}
      {showLoveNote && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-4 rounded-full shadow-2xl max-w-md mx-4"
        >
          <p className="text-center font-medium text-sm md:text-base">
            {loveNotes[currentLoveNote]}
          </p>
        </motion.div>
      )}

      {/* Memory Popup */}
      {showMemory && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAllModals}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-br ${memories[currentMemory].color} text-white px-8 py-6 rounded-3xl shadow-2xl max-w-sm mx-4 border-4 border-white`}
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-6xl mb-3"
              >
                {memories[currentMemory].emoji}
              </motion.div>
              <p className="font-bold text-xl mb-2">Remember...</p>
              <p className="text-lg">{memories[currentMemory].text}</p>
            </div>
          </motion.div>
        </>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[95%] md:max-w-[800px] relative z-10"
        >
          {/* Decorative elements */}
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-6 left-8 text-2xl opacity-40"
          >
            🌸
          </motion.span>
          <motion.span
            animate={{ y: [0, 5, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-6 right-8 text-2xl opacity-40"
          >
            ✨
          </motion.span>

          {/* Main Success Message */}
          <motion.div variants={itemVariants} className="mb-8 text-center">
          <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-7xl md:text-8xl inline-block mb-4 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              💖
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-serif italic font-bold text-gray-800 tracking-tight leading-tight">
              I knew you'd say <br />
              <span className="text-rose-500 not-italic font-black tracking-tighter uppercase text-5xl md:text-6xl">
                Yes!
              </span>
            </h1>
          </motion.div>

          {/* Celebration GIF */}
          <motion.div
            variants={itemVariants}
            className="mb-8 rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl mx-auto w-full max-w-[280px] relative"
            whileHover={{ rotate: 0, scale: 1.05 }}
            style={{ rotate: -2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none z-10"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTA2am5qem9vYW54OG93dDh4MXQ5eGo1Yzd5dHIwajB4MDl0OGhseCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ytu2GUYbvhz7zShGwS/giphy.gif"
              alt="Success"
              className="w-full h-auto object-cover max-h-[240px]"
            />
          </motion.div>

          {/* Love Note Button */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex justify-center"
          >
            <motion.button
              onClick={showRandomLoveNote}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2"
            >
              <span>💌</span>
              <span>Get a Love Note</span>
              <span>💌</span>
            </motion.button>
          </motion.div>

          {/* Interactive Buttons Row */}
          <motion.div
            variants={itemVariants}
            className="mb-6 flex flex-wrap justify-center gap-3"
          >
            <motion.button
              onClick={sendKiss}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-5 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2"
            >
              <span>💋</span>
              <span>Send a Kiss</span>
              {kisses > 0 && <span className="bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black">{kisses}</span>}
            </motion.button>

            <motion.button
              onClick={sendHug}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-5 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2"
            >
              <span>🤗</span>
              <span>Virtual Hug</span>
            </motion.button>

            <motion.button
              onClick={showRandomMemory}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white px-5 py-3 rounded-full shadow-lg font-semibold flex items-center gap-2"
            >
              <span>📸</span>
              <span>Memory Lane</span>
            </motion.button>
          </motion.div>

          {/* Countdown Box */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="mb-8 relative p-6 md:p-8 rounded-3xl bg-rose-50/50 border border-white flex flex-row items-center justify-between gap-6 backdrop-blur-sm"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <div className="text-left relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-rose-400 mb-2">
                Our Date In
              </p>
              <motion.p 
                className="text-4xl md:text-5xl font-black text-rose-500 leading-none"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {daysLeft} <span className="text-2xl font-bold">Days</span>
              </motion.p>
            </div>
            <div className="text-right relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-2">
                Save the Date
              </p>
              <p className="text-lg md:text-xl font-bold text-gray-700">Feb 14, 2026</p>
            </div>
          </motion.div>

          {/* Reasons Why I Like You */}
          <motion.div
            variants={itemVariants}
            className="mb-8 bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg border border-white/50"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-2xl">💝</span>
              <h2 className="text-rose-500 font-black text-base md:text-lg tracking-[0.2em] uppercase">
                Why You're Amazing
              </h2>
              <span className="text-2xl">💝</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { emoji: "😊", text: "You make my world brighter just by being in it" },
                { emoji: "💭", text: "You get my weird jokes" },
                { emoji: "🌟", text: "You make ordinary moments unforgettable" },
                { emoji: "❤️", text: "You make life better just by being yourself" }
              ].map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 flex items-center gap-3 border border-rose-100"
                >
                  <span className="text-3xl">{reason.emoji}</span>
                  <p className="text-gray-700 font-medium text-sm md:text-base">{reason.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SOUNDTRACK SECTION */}
          <motion.div
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg border border-white/50"
          >
            {/* Section Header */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-rose-400 text-2xl"
              >
                🎵
              </motion.span>
              <h2 className="text-rose-500 font-black text-base md:text-lg tracking-[0.2em] uppercase">
                Soundtrack For You
              </h2>
              <motion.span
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-rose-400 text-2xl"
              >
                🎵
              </motion.span>
            </div>

            {/* Now Playing - YouTube Video Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 md:p-6 mb-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-2xl flex-shrink-0"
                >
                  🎵
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-base md:text-lg truncate">
                    {playlist[currentSong].title}
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    {playlist[currentSong].artist}
                  </p>
                </div>
                <motion.button
                  onClick={toggleMusic}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-md flex items-center justify-center text-xl md:text-2xl"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </motion.button>
              </div>

              {/* YouTube Video Player */}
              <div className="relative rounded-xl overflow-hidden mb-4 aspect-video shadow-lg">
                <div id="youtube-player" className="w-full h-full"></div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-5 mb-4">
                <motion.button
                  onClick={prevSong}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-xl"
                >
                  ⏮️
                </motion.button>
                <motion.button
                  onClick={toggleMusic}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white shadow-lg text-2xl md:text-3xl"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </motion.button>
                <motion.button
                  onClick={nextSong}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-xl"
                >
                  ⏭️
                </motion.button>
              </div>

              {/* Quote */}
              <p className="text-sm md:text-base italic text-rose-600 text-center">
                "{playlist[currentSong].quote}"
              </p>
            </motion.div>

            {/* ALL SONGS - Grid with Thumbnails */}
            <div className="space-y-3">
              {playlist.map((song, index) => (
                <motion.button
                  key={index}
                  onClick={() => playSong(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    currentSong === index
                      ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-rose-50'
                  }`}
                >
                  {/* YouTube Thumbnail */}
                  <div className="relative w-28 md:w-36 h-20 md:h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={`https://img.youtube.com/vi/${song.videoId}/mqdefault.jpg`}
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                    {currentSong === index && isPlaying && (
                      <motion.div
                        className="absolute inset-0 bg-black/40 flex items-center justify-center"
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="text-3xl">▶️</span>
                      </motion.div>
                    )}
                    {currentSong === index && !isPlaying && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="text-3xl">⏸️</span>
                      </div>
                    )}
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-bold text-base md:text-lg truncate">
                      {song.title}
                    </p>
                    <p className={`text-sm md:text-base truncate ${
                      currentSong === index ? 'opacity-90' : 'opacity-70'
                    }`}>
                      {song.artist}
                    </p>
                  </div>

                  {/* Playing Indicator */}
                  {currentSong === index && (
                    <motion.div
                      animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="flex-shrink-0 text-2xl md:text-3xl"
                    >
                      🎵
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Bottom Message */}
          <motion.p
            variants={itemVariants}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-8 text-red-500 font-serif italic text-base md:text-lg tracking-widest text-center"
          >
            I can't wait to see you... ✨
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-5 flex items-center justify-center gap-3"
          >
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              💝
            </motion.span>
            <span className="text-sm md:text-base text-gray-400 font-medium">
              You make my heart skip a beat
            </span>
            <motion.span
              animate={{ rotate: [0, -20, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="text-2xl"
            >
              💝
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default SuccessPage;