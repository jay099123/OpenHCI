"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { usePlanets, PlanetWithStory } from "@/hooks/usePlanets";

type Direction = "up" | "down";

/**
 * Planet shape used in the planets array.
 */

export default function Homepage2() {
  // ------------------------- state -------------------------
  const { planets, loading, error } = usePlanets();
  
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<Direction>("down");
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  // ✅ Handle early returns AFTER all hooks
  if (loading) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <motion.div
          className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-white mt-4">載入星球中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <p className="text-red-400 text-center px-6">
          載入失敗: {error}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
        >
          重新載入
        </button>
      </div>
    );
  }

  if (planets.length === 0) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <p className="text-white text-center px-6">
          目前沒有可用的星球故事
        </p>
      </div>
    );
  }

  // ✅ Safe to access planets now
  const currentPlanet = planets[currentPlanetIndex];

  // Fallback content
  const fallbackContent = {
    date: "2025/08/03",
    title: "Loading...",
    story: "故事加載中...",
    story2: "故事加載中...",
    story3: "故事加載中...",
    story4: "故事加載中...",
    story5: "故事加載中...",
    illustration: "/placeholder.png",
    illustration2: "/placeholder.png",
    illustration3: "/placeholder.png",
    illustration4: "/placeholder.png",
    illustration5: "/placeholder.png",
    colorImage: "/placeholder.png",
    titleImage: "/placeholder.png",
    planetColor: currentPlanet?.color || currentPlanet?.story?.colorPalette?.[0]?.hex || "#8b5cf6"
  };

  // Use safe content
  const diaryContent = currentPlanet?.diaryContent || fallbackContent;

  // Animation variants
  const enterVariants: Record<Direction, any> = {
    up: {
      x: [320, 280, 220, 120, 0],
      y: [280, 220, 160, 80, 0],
      opacity: [0, 0.3, 0.7, 0.9, 1],
      scale: [0.1, 0.4, 0.7, 0.9, 1],
      rotate: [-70, -50, -30, -15, 0],
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.3, 0.6, 0.8, 1],
      },
    },
    down: {
      x: [320, 280, 220, 120, 0],
      y: [-280, -220, -160, -80, 0],
      opacity: [0, 0.3, 0.7, 0.9, 1],
      scale: [0.1, 0.4, 0.7, 0.9, 1],
      rotate: [70, 50, 30, 15, 0],
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.3, 0.6, 0.8, 1],
      },
    },
  };

  // Update the exit variants to match the original:
  const exitVariants: Record<Direction, any> = {
    up: {
      x: [0, 120, 220, 280, 320],
      y: [0, -80, -160, -220, -280],
      opacity: [1, 0.9, 0.7, 0.3, 0],
      scale: [1, 0.9, 0.7, 0.4, 0.1],
      rotate: [0, 15, 30, 50, 70],
      transition: {
        duration: 0.9,
        ease: "linear",
        times: [0, 0.3, 0.6, 0.8, 1],
      },
    },
    down: {
      x: [0, 120, 220, 280, 320],
      y: [0, 80, 160, 220, 280],
      opacity: [1, 0.9, 0.7, 0.3, 0],
      scale: [1, 0.9, 0.7, 0.4, 0.1],
      rotate: [0, -15, -30, -50, -70],
      transition: {
        duration: 0.9,
        ease: "linear", 
        times: [0, 0.3, 0.6, 0.8, 1],
      },
    },
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (isDiaryOpen) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isDiaryOpen) return;
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (isDiaryOpen) return;
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      setExitDirection("up");
      setTimeout(() => {
        setCurrentPlanetIndex((prev) => (prev === 0 ? planets.length - 1 : prev - 1));
      }, 50);
    }
    
    if (isDownSwipe) {
      setExitDirection("down");
      setTimeout(() => {
        setCurrentPlanetIndex((prev) => (prev === planets.length - 1 ? 0 : prev + 1));
      }, 50);
    }
  };

  const handlePlanetClick = () => {
    setIsDiaryOpen(true);
  };

  // Add this helper function at the top of your component
  const getImageSrc = (url: string) => {
    // If it's a Firebase Storage URL, use it directly
    if (url.startsWith('https://firebasestorage.googleapis.com')) {
      return url;
    }
    // If it's a local path, use it as is
    if (url.startsWith('/')) {
      return url;
    }
    // Fallback to placeholder
    return '/placeholder.png';
  };

  return (
    <div 
      className="flex flex-col h-screen w-screen px-0 py-0 overflow-hidden fixed inset-0"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      // style={{ 
      //   touchAction: 'none',
      //   background: 'linear-gradient(to bottom, #261a2e, #16213e, #0f3460)'
      // }}
    >
      {/* Background Stars Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-center items-center mb-4 mt-4 flex-shrink-0 relative z-10">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentPlanet?.title || 'loading'}
            className="text-4xl font-bold text-white mt-10"
            style={{
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {currentPlanet?.title || 'Loading...'}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Planet with Enhanced Styling */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="relative w-80 h-80 flex items-center justify-center">
          <motion.div
            className="cursor-pointer relative"
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => {
              setIsPressed(false);
              handlePlanetClick();
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1, ease: "easeOut" }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPlanetIndex}
                className="relative"
                variants={enterVariants}
                initial={exitDirection}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  transition: { 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }
                }}
                exit={{
                  x: exitDirection === "up" ? 320 : 320,
                  y: exitDirection === "up" ? -280 : 280,
                  opacity: 0,
                  scale: 0.1,
                  rotate: exitDirection === "up" ? 70 : -70,
                }}
              >
                {/* Planet - Enhanced with Strong Dynamic Color Overlay */}
                <motion.div
                  className="relative overflow-hidden rounded-full"
                  style={{
                    height: "260px",
                    width: "260px",
                    background: `
                      radial-gradient(ellipse 80px 60px at 30% 25%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0) 80%),
                      radial-gradient(ellipse 120px 100px at 70% 75%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%),
                      radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 65%)
                    `,
                    boxShadow: `
                      inset 15px -15px 40px -10px rgba(0, 0, 0, 0.5),
                      inset -15px 15px 30px -5px rgba(255, 255, 255, 0.3),
                      inset 0 0 0 1px rgba(255, 255, 255, 0.1),
                      -5px 0px 10px -4px ${currentPlanet?.color}, 
                      0px 0px 40px ${currentPlanet?.color}66
                    `,
                  }}
                >
                  {/* Base Planet Image */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      height: "100%",
                      width: "100%",
                      zIndex: 1,
                      backgroundImage: `url('${currentPlanet?.image}')`,
                      backgroundSize: "200% 100%",
                      backgroundRepeat: "repeat-x",
                      transform: "rotate(15deg) scale(1.2)",
                      opacity: 0.6, // Reduced more to let color show through
                    }}
                    animate={{ backgroundPosition: ["0% center", "-200% center"] }}
                    transition={{ 
                      duration: isPressed ? 5 : 12, 
                      repeat: Infinity, 
                      ease: "linear",
                    }}
                  />

                  {/* Strong Color Tint Layer */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 1.5,
                      background: `
                        radial-gradient(
                          circle at center,
                          ${currentPlanet?.color}50 0%,
                          ${currentPlanet?.color}30 50%,
                          transparent 100%
                        )
                      `,
                      mixBlendMode: 'multiply',
                    }}
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      ease: "easeInOut" 
                    }}
                  />

                  {/* Enhanced Dynamic Color Overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 2,
                      background: `
                        radial-gradient(
                          circle at center,
                          ${currentPlanet?.color}60 0%,
                          ${currentPlanet?.color}80 20%,
                          ${currentPlanet?.color}40 50%,
                          ${currentPlanet?.color}20 80%,
                          transparent 100%
                        )
                      `,
                      mixBlendMode: 'overlay',
                    }}
                    animate={{
                      opacity: isPressed ? [0.9, 1, 0.9] : [0.7, 1, 0.7],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      ease: "easeInOut" 
                    }}
                  />

                  {/* Additional Strong Color Layer */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 3,
                      background: `
                        radial-gradient(
                          circle at 40% 30%,
                          ${currentPlanet?.color}90 0%,
                          ${currentPlanet?.color}70 30%,
                          ${currentPlanet?.color}30 60%,
                          transparent 80%
                        )
                      `,
                      mixBlendMode: 'overlay',
                    }}
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      ease: "easeInOut" 
                    }}
                  />

                  {/* Keep all the existing highlight and shadow layers... */}
                  {/* Main highlight - top left */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 4,
                      background: `
                        radial-gradient(ellipse 100px 70px at 25% 20%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 100%)
                      `,
                    }}
                  />

                  {/* Secondary highlight - smaller and brighter */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 5,
                      background: `
                        radial-gradient(
                        ellipse 50px 30px at 30% 15%, 
                        rgba(255, 255, 255, 0.8) 0%, 
                        rgba(255, 255, 255, 0.4) 40%, 
                        rgba(255, 255, 255, 0) 80%)
                      `,
                    }}
                  />

                  {/* Shadow area - bottom right */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 6,
                      background: `
                        radial-gradient(
                        ellipse 140px 120px at 75% 80%, 
                        rgba(0, 0, 0, 0.25) 0%, 
                        rgba(0, 0, 0, 0.15) 40%, 
                        rgba(0, 0, 0, 0.05) 70%, 
                        rgba(0, 0, 0, 0) 100%
                        )
                      `,
                    }}
                  />

                  {/* Rim light - subtle edge lighting */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 7,
                      background: `
                        radial-gradient(circle at center, transparent 85%, rgba(255, 255, 255, 0.2) 90%, rgba(255, 255, 255, 0.1) 95%, transparent 100%)
                      `,
                    }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Rings - Made Permanently Visible with Dynamic Colors */}
            <motion.div
              className="absolute inset-0 rounded-full border pointer-events-none"
              style={{ 
                transform: "scale(1.4)", 
                zIndex: -1, 
                borderColor: `${currentPlanet?.color}60`
              }}
              animate={{ 
                opacity: [0.6, 0.9, 0.6],
                scale: [1.4, 1.5, 1.4],
                rotate: [0, 360]
              }}
              transition={{ 
                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-full border pointer-events-none"
              style={{
                transform: "scale(1.7)",
                zIndex: -2,
                borderColor: `${currentPlanet?.color}40`,
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1.7, 1.8, 1.7],
                rotate: [360, 0]
              }}
              transition={{
                opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Navigation Instructions */}
      <motion.div 
        className="text-center text-white/60 text-sm flex-shrink-0 font-bold pb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          animate={{ 
            opacity: [0.6, 1, 0.6] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          上下滑探索星球！
        </motion.p>
      </motion.div>

      {/* Navigation Dots */}
      <motion.div 
        className="flex justify-center items-center mb-40 pt-4 flex-shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-center space-x-3">
          {planets.map((planet, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full border-2 cursor-pointer ${
                index === currentPlanetIndex 
                  ? 'bg-white border-white' 
                  : 'bg-transparent border-white/30'
              }`}
              onClick={() => {
                if (index !== currentPlanetIndex) {
                  setExitDirection(index > currentPlanetIndex ? "down" : "up");
                  setTimeout(() => {
                    setCurrentPlanetIndex(index);
                  }, 50);
                }
              }}
              animate={{
                scale: index === currentPlanetIndex ? 1.3 : 1,
                backgroundColor: index === currentPlanetIndex ? planet.color : 'transparent',
                borderColor: index === currentPlanetIndex ? planet.color : 'rgba(255,255,255,0.3)'
              }}
              transition={{ 
                duration: 0.1, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 }
              }}
              whileTap={{
                scale: 1.1,
                transition: { duration: 0.1 }
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Diary Popup Window */}
      <AnimatePresence>
        {isDiaryOpen && (
          <motion.div
            className="fixed top-4 left-4 right-4 bottom-4 
            bg-gray-50 rounded-3xl z-50 flex flex-col shadow-2xl"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.3
            }}
            style={{ touchAction: 'auto' }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {/* Diary Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-2xl font-bold text-gray-800">星球日誌</h2>
              <motion.button  
                onClick={() => setIsDiaryOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CloseIcon className="text-gray-800" fontSize="large" />
              </motion.button>
            </div>

            {/* Diary Content - This can scroll */}
            <div 
              className="flex-1 px-6 py-4 overflow-y-auto overscroll-contain"
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              {/* Date and Planet Indicator */}
              <motion.div
                className="flex justify-between items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-lg font-bold text-gray-700">
                  {diaryContent.date}
                </span>
                {/* Color dot using database color palette */}
            <div 
              className="w-8 h-8 rounded-full"
              style={{
                backgroundColor: currentPlanet?.story?.colorPalette?.[0]?.hex || currentPlanet?.color || '#8b5cf6',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: `0 2px 8px ${currentPlanet?.story?.colorPalette?.[0]?.hex || currentPlanet?.color || '#8b5cf6'}40`
              }}
            />
              </motion.div>

              {/* Story Title */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-gray-800 leading-relaxed text-xl font-bold text-center">
                  {diaryContent.title}
                </p>
              </motion.div>

              {/* Story Pages - Dynamic based on database */}
              {[1, 2, 3, 4, 5].map((pageNum) => {
                const storyKey = pageNum === 1 ? 'story' : `story${pageNum}`;
                const illustrationKey = pageNum === 1 ? 'illustration' : `illustration${pageNum}`;
                
                return (
                  <div key={pageNum}>
                    {/* Story Illustration */}
                    <motion.div
                      className="rounded-2xl mb-6 min-h-[200px] flex items-center 
                      justify-center overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (pageNum * 0.1) }}
                    >
                      <Image
                        src={getImageSrc(diaryContent[illustrationKey as keyof typeof diaryContent] as string)}
                        alt={diaryContent.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          console.warn('Image failed to load:', diaryContent[illustrationKey as keyof typeof diaryContent]);
                          (e.target as HTMLImageElement).src = '/placeholder.png';
                        }}
                      />
                    </motion.div>

                    {/* Story Text */}
                    <motion.div
                      className="bg-white rounded-2xl p-6 shadow-sm mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + (pageNum * 0.1) }}
                    >
                      <p className="text-gray-800 leading-relaxed text-base font-bold">
                        {diaryContent[storyKey as keyof typeof diaryContent] as string}
                      </p>
                    </motion.div>
                  </div>
                );
              })}

              <p className="text-gray-800 leading-relaxed text-base font-bold text-center">
                ----------------故事結束----------------
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
