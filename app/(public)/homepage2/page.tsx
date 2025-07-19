"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * Direction union type for animation variants.
 */
type Direction = "up" | "down";

/**
 * Planet shape used in the planets array.
 */
interface Planet {
  name: string;
  image: string;
  color: string;
  title: string;
  diaryContent: {
    date: string;
    title: string;
    story: string;
    story2: string; // Optional second story
    story3: string; // Optional third story
    story4: string; // Optional fourth story
    story5?: string; // Optional fifth story
    illustration: string;
    illustration2: string; // Optional second illustration
    illustration3: string; // Optional third illustration
    illustration4: string; // Optional fourth illustration
    illustration5: string; // Optional fifth illustration
    dialog: string; // New: dialog text for the diary
    dialog2: string; // New: second dialog text
    dialog3?: string; // Optional third dialog text
    dialog4?: string; // Optional fourth dialog text
    colorImage: string;      // New: image for color indicator
    titleImage: string;      // New: image for title block
  };
}

export default function Homepage2() {
  // ------------------------- state -------------------------
  const [isPressed, setIsPressed] = useState(false);
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<Direction>("down");
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);
  
  // Add touch state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // ------------------------- touch handlers -------------------------
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      // Swipe up - go to previous planet
      setExitDirection("up");
      setTimeout(() => {
        setCurrentPlanetIndex((prev) => (prev === 0 ? planets.length - 1 : prev - 1));
      }, 50);
    }
    
    if (isDownSwipe) {
      // Swipe down - go to next planet
      setExitDirection("down");
      setTimeout(() => {
        setCurrentPlanetIndex((prev) => (prev === planets.length - 1 ? 0 : prev + 1));
      }, 50);
    }
  };

  // ------------------------- data -------------------------
  const planets: readonly Planet[] = [
    {
      name: "Red Planet",
      image: "/b4-06.png",
      color: "#ef4444",
      title: "Mars Explorer",
      diaryContent: {
        date: "2025/07/20",
        title: "小雞檢硬幣",
        story: "有一天，小雞在草地上覓食，忽然發現一枚閃亮的硬幣！",
        story2: "小雞眼睛一亮，心想：『哇～這麼多錢，我可以買好多好吃的蟲蟲耶！』",
        story3: "這時，小雞看到媽媽在找東西，好像在呼喚牠……",
        story4: "小雞看著硬幣，想：『剛剛好像有看到媽媽在找東西？這是媽媽掉的嗎？』",
        story5: "小雞跑去問媽媽，媽媽點點頭：『對呀，我在找這枚硬幣。』小雞把錢還給媽媽，媽媽笑著說：『謝謝你！』",
        illustration: "/page1SS.png",
        illustration2: "/p2.png", // Optional second illustration
        illustration3: "/p3.png", // Optional third illustration
        illustration4: "/p4.png", // Optional fourth illustration
        illustration5: "/p5.png", // Optional fifth illustration
        dialog: "小朋友～你覺得，小雞現在應該怎麼辦呢？",
        dialog2: "我會問媽媽是不是她的",
        dialog3: "是什麼硬幣！",
        dialog4: "DearPlanet：是一枚有小雞圖案的硬幣喔",
        colorImage: "/b4-06.png",     
        titleImage: "/draw-09.png"     
      }
    },
    {
      name: "Crystal Planet",
      image: "/cplan.png",
      color: "#06b6d4",
      title: "Crystal World",
      diaryContent: {
        date: "2025/07/19",
        title: "小雞檢硬幣",
        story: "有一天，小雞在草地上覓食，忽然發現一枚閃亮的硬幣！",
        story2: "小雞眼睛一亮，心想：『哇～這麼多錢，我可以買好多好吃的蟲蟲耶！』",
        story3: "這時，小雞看到媽媽在找東西，好像在呼喚牠……",
        story4: "小雞看著硬幣，想：『剛剛好像有看到媽媽在找東西？這是媽媽掉的嗎？』",
        story5: "小雞跑去問媽媽，媽媽點點頭：『對呀，我在找這枚硬幣。』小雞把錢還給媽媽，媽媽笑著說：『謝謝你！』",
        illustration: "/page1SS.png",
        illustration2: "/p2.png", // Optional second illustration
        illustration3: "/p3.png", // Optional third illustration
        illustration4: "/p4.png", // Optional fourth illustration
        illustration5: "/p5.png", // Optional fifth illustration
        dialog: "小朋友～你覺得，小雞現在應該怎麼辦呢？",
        dialog2: "我會問媽媽是不是她的",
        dialog3: "是什麼硬幣！",
        dialog4: "DearPlanet：是一枚有小雞圖案的硬幣喔",
        colorImage: "/cplan.png",    
        titleImage: "/draw-09.png"  
      }
    },
    {
      name: "Yellow Planet",
      image: "/yplan.png",
      color: "#f59e0b",
      title: "Golden Horizon",
      diaryContent: {
        date: "2025/07/18",
        title: "小雞檢硬幣",
        story: "有一天，小雞在草地上覓食，忽然發現一枚閃亮的硬幣！",
        story2: "小雞眼睛一亮，心想：『哇～這麼多錢，我可以買好多好吃的蟲蟲耶！』",
        story3: "這時，小雞看到媽媽在找東西，好像在呼喚牠……",
        story4: "小雞看著硬幣，想：『剛剛好像有看到媽媽在找東西？這是媽媽掉的嗎？』",
        story5: "小雞跑去問媽媽，媽媽點點頭：『對呀，我在找這枚硬幣。』小雞把錢還給媽媽，媽媽笑著說：『謝謝你！』",
        illustration: "/page1SS.png",
        illustration2: "/p2.png", // Optional second illustration
        illustration3: "/p3.png", // Optional third illustration
        illustration4: "/p4.png", // Optional fourth illustration
        illustration5: "/p5.png", // Optional fifth illustration
        dialog: "小朋友～你覺得，小雞現在應該怎麼辦呢？",
        dialog2: "我會問媽媽是不是她的",
        dialog3: "是什麼硬幣！",
        dialog4: "是一枚有小雞圖案的硬幣喔",
        colorImage: "/yplan.png",   
        titleImage: "/draw-09.png"  
      }
    },
  ] as const;

  const currentPlanet = planets[currentPlanetIndex];

  // ------------------------- keyboard navigation -------------------------
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setExitDirection("up");
        setTimeout(() => {
          setCurrentPlanetIndex((prev) => (prev === 0 ? planets.length - 1 : prev - 1));
        }, 50);
      } else if (event.key === "ArrowDown") {
        setExitDirection("down");
        setTimeout(() => {
          setCurrentPlanetIndex((prev) => (prev === planets.length - 1 ? 0 : prev + 1));
        }, 50);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // ------------------------- semicircle animation variants -------------------------
  const exitVariants: Record<Direction, any> = {
    up: {
      x: [0,  120, 220, 280, 320],
      y: [0, -80, -160, -220, -280],
      opacity: [1, 0.9, 0.7, 0.3, 0],
      scale: [1, 0.9, 0.7, 0.4, 0.1],
      rotate: [0, 15, 30, 50, 70],
      transition: {
        duration: 0.9,
        // ease: [0.25, 0.46, 0.45, 0.94],
        // ease: "easeInOut", // Changed to easeInOut for smoother transition
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
        // ease: [0.25, 0.46, 0.45, 0.94],
        ease: "linear", 
        times: [0, 0.3, 0.6, 0.8, 1],
      },
    },
  };

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

  // Handle planet click to open diary
  const handlePlanetClick = () => {
    setIsDiaryOpen(true);
  };

  // ------------------------- render -------------------------
  return (
    <div 
      className="flex flex-col h-full px-6 py-4 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <div className="flex justify-center items-center mb-4 mt-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentPlanet.title}
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {currentPlanet.title}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center pt-26">
        <div className="relative w-80 h-80 flex items-center justify-center">
          <motion.div
            className="cursor-pointer relative"
            onTapStart={() => setIsPressed(true)}
            onTap={() => {
              setIsPressed(false);
              handlePlanetClick(); // Open diary on tap
            }}
            onTapCancel={() => setIsPressed(false)}
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
                initial={enterVariants[exitDirection]}
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
                exit={exitVariants[exitDirection]}
              >
                {/* Planet - Enhanced with 3D Lighting */}
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
                      -5px 0px 10px -4px ${currentPlanet.color}, 
                      0px 0px 40px ${currentPlanet.color}66
                    `,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      height: "100%",
                      width: "100%",
                      zIndex: 1,
                      backgroundImage: `url('${currentPlanet.image}')`,
                      backgroundSize: "200% 100%",
                      backgroundRepeat: "repeat-x",
                      transform: "rotate(15deg) scale(1.2)",
                      opacity: 0.8,
                    }}
                    animate={{ backgroundPosition: ["0% center", "-200% center"] }}
                    transition={{ 
                      duration: isPressed ? 5 : 12, 
                      repeat: Infinity, 
                      ease: "linear",
                    }}
                  />

                  {/* Main highlight - top left */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 2,
                      background: `
                        radial-gradient(ellipse 100px 70px at 25% 20%, 
                        rgba(255, 255, 255, 0.4) 0%, 
                        rgba(255, 255, 255, 0.3) 30%, 
                        rgba(255, 255, 255, 0.1) 60%, 
                        rgba(255, 255, 255, 0) 100%)
                      `,
                    }}
                  />

                  {/* Secondary highlight - smaller and brighter */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 3,
                      background: `
                        radial-gradient(
                        ellipse 50px 30px at 30% 15%, 
                        rgba(255, 255, 255, 0.6) 0%, 
                        rgba(255, 255, 255, 0.4) 40%, 
                        rgba(255, 255, 255, 0) 80%)
                      `,
                    }}
                  />

                  {/* Shadow area - bottom right */}
                  <div
                    className="absolute mix-blend-darken bg-blend-darken inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 4,
                      background: `
                        radial-gradient(
                        ellipse 200px 200px at 75% 80%, 
                        rgba(0, 0, 0, 0.4) 0%, 
                        rgba(0, 0, 0, 0.3) 40%, 
                        rgba(0, 0, 0, 0.1) 70%, 
                        rgba(0, 0, 0, 0) 100%
                        )
                      `,
                    }}
                  />

                  {/* Rim light - subtle edge lighting */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 5,
                      background: `
                        radial-gradient(circle at center, transparent 85%, rgba(255, 255, 255, 0.2) 90%, rgba(255, 255, 255, 0.1) 95%, transparent 100%)
                      `,
                    }}
                  />
                </motion.div>

                {/* Enhanced Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    transform: "scale(1.2)",
                    background: `radial-gradient(circle, ${currentPlanet.color}4D 0%, transparent 70%)`,
                    filter: "blur(20px)",
                    zIndex: 0,
                  }}
                  animate={{
                    opacity: isPressed ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4],
                    scale: isPressed ? [1.2, 1.4, 1.2] : [1.2, 1.3, 1.2],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Rings - Made Permanently Visible */}
            <motion.div
              className="absolute inset-0 rounded-full border pointer-events-none"
              style={{ 
                transform: "scale(1.4)", 
                zIndex: -1, 
                borderColor: `${currentPlanet.color}60` // Made more visible
              }}
              animate={{ 
                opacity: [0.6, 0.9, 0.6], // Always visible, just pulsing brightness
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
                borderColor: `${currentPlanet.color}40`, // Made more visible
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4], // Always visible, just pulsing brightness
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

      {/* Enhanced Navigation Instructions */}
      <motion.div 
        className="text-center text-white/60 text-sm pb-4 pt-10"
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
          swipe up or down to explore planets
        </motion.p>
        <div className="flex justify-center mt-4 space-x-3">
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
            className="fixed top-16 left-4 right-4 bottom-4 
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
          >
            {/* Diary Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">星球日誌</h2>
              <motion.button  
                onClick={() => setIsDiaryOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-2xl text-black-800">×</span>
              </motion.button>
            </div>

            {/* Diary Content */}
            <div className="flex-1 px-6 py-4 overflow-y-auto">
              {/* Date and Planet Indicator */}
              <motion.div
                className="flex justify-between items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-lg font-bold text-gray-700">
                  {currentPlanet.diaryContent.date}
                </span>
                {/* Replace color dot with image */}
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={currentPlanet.diaryContent.colorImage}
                    alt={`${currentPlanet.name} indicator`}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <span className="text-lg font-bold text-gray-700">
                孩童的畫作：
              </span>

              {/* Story Title */}
              <motion.div
                className="rounded-2xl mb-6 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Image
                  src={currentPlanet.diaryContent.titleImage}
                  alt={currentPlanet.diaryContent.title}
                  width={400}
                  height={120}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </motion.div>

              <span className="text-lg font-bold text-gray-700">
                今日觀察：
              </span>

              <motion.div
                className="bg-red-100 rounded-2xl p-6 shadow-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-gray-800 leading-relaxed text-base font-bold">
                  今日故事提及拾金不昧概念，鼓勵小朋友誠實守信。
                  孩童也在故事間選擇了正確的行為，展現了誠實的美德。
                  往後也可深化關於誠實、、守信的問題討論。
                </p>
              </motion.div>

              <span className="text-lg font-bold text-gray-700">
                故事回顧：
              </span>


              {/* Story Illustration */}
              <motion.div
                className="rounded-2xl mb-6 min-h-[200px] flex items-center 
                justify-center overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={currentPlanet.diaryContent.illustration}
                  alt={currentPlanet.diaryContent.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>

              {/* Story Text */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-gray-800 leading-relaxed text-base font-bold">
                  {currentPlanet.diaryContent.story}
                </p>
              </motion.div>

              {/* Speech Bubbles */}
              <motion.div
                className="space-y-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
        
              {/* Answer Speech Bubble */}
              <div className="flex justify-end">
                <div className="relative bg-orange-200 rounded-3xl px-6 py-4 max-w-[80%] shadow-sm">
                  <p className="text-gray-800 leading-relaxed text-base font-bold">
                    {currentPlanet.diaryContent.dialog3}
                  </p>
                  {/* Speech bubble tail pointing right */}
                  <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-orange-200"></div>
                  </div>
                </div>
              </div>

              <span className="text-sm font-bold text-gray-700 ">
                DearPlanet
              </span>

              {/* Question Speech Bubble */}
              <div className="flex justify-start">
                <div className="relative bg-orange-100 rounded-3xl px-6 py-4 max-w-[80%] shadow-sm">
                  <p className="text-gray-800 leading-relaxed text-base font-bold">
                    {currentPlanet.diaryContent.dialog4}
                  </p>
                  {/* Speech bubble tail pointing left */}
                  <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-orange-100"></div>
                  </div>
                </div>
              </div>
              </motion.div>

              {/* Story Illustration2 */}
              <motion.div
                className="rounded-2xl mb-6 min-h-[200px] flex items-center 
                justify-center overflow-hidde"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={currentPlanet.diaryContent.illustration2}
                  alt={currentPlanet.diaryContent.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>

              {/* Story Text2 */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-gray-800 leading-relaxed text-base font-bold">
                  {currentPlanet.diaryContent.story2}
                </p>
              </motion.div>

              {/* Story Illustration3 */}
              <motion.div
                className="rounded-2xl mb-6 min-h-[200px] flex items-center 
                justify-center overflow-hidde"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={currentPlanet.diaryContent.illustration3}
                  alt={currentPlanet.diaryContent.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>

              {/* Story Text2 */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-gray-800 leading-relaxed text-base font-bold">
                  {currentPlanet.diaryContent.story3}
                </p>
              </motion.div>

              {/* Story Text with Speech Bubbles */}
              <motion.div
                className="space-y-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >

              <span className="text-sm font-bold text-gray-700 ">
                DearPlanet
              </span>

              {/* Question Speech Bubble */}
              <div className="flex justify-start">
                <div className="relative bg-orange-100 rounded-3xl px-6 py-4 max-w-[80%] shadow-sm">
                  <p className="text-gray-800 leading-relaxed text-base font-bold">
                    {currentPlanet.diaryContent.dialog}
                  </p>
                  {/* Speech bubble tail pointing left */}
                  <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-orange-100"></div>
                  </div>
                </div>
              </div>

              {/* Answer Speech Bubble */}
              <div className="flex justify-end">
                <div className="relative bg-orange-200 rounded-3xl px-6 py-4 max-w-[80%] shadow-sm">
                  <p className="text-gray-800 leading-relaxed text-base font-bold">
                    {currentPlanet.diaryContent.dialog2}
                  </p>
                  {/* Speech bubble tail pointing right */}
                  <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-orange-200"></div>
                  </div>
                </div>
              </div>
              </motion.div>

              {/* Story Illustration4 */}
              <motion.div
                className="rounded-2xl mb-6 min-h-[200px] flex items-center 
                justify-center overflow-hidde"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={currentPlanet.diaryContent.illustration4}
                  alt={currentPlanet.diaryContent.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>

              {/* Story Text3 */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-gray-800 leading-relaxed text-base font-bold">
                  {currentPlanet.diaryContent.story4}
                </p>
              </motion.div>

              {/* Story Illustration5 */}
              <motion.div
                className="rounded-2xl mb-6 min-h-[200px] flex items-center 
                justify-center overflow-hidde"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={currentPlanet.diaryContent.illustration5}
                  alt={currentPlanet.diaryContent.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </motion.div>

              {/* Story Text2 */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-gray-800 leading-relaxed text-base font-bold">
                  {currentPlanet.diaryContent.story5}
                </p>
              </motion.div>

              <p className="text-gray-800 leading-relaxed text-base font-bold">
                ----------------故事結束----------------
              </p>


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
