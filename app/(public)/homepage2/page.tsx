"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
}

export default function Homepage2() {
  // ------------------------- state -------------------------
  const [isPressed, setIsPressed] = useState(false);
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<Direction>("down");

  // ------------------------- data -------------------------
  const planets: readonly Planet[] = [
    {
      name: "Red Planet",
      image: "/rplan.png",
      color: "#ef4444",
      title: "火星探險",
    },
    {
      name: "Crystal Planet",
      image: "/cplan.png",
      color: "#06b6d4",
      title: "水晶世界",
    },
    {
      name: "Yellow Planet",
      image: "/yplan.png",
      color: "#f59e0b",
      title: "黃金星球",
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
        }, 100);
      } else if (event.key === "ArrowDown") {
        setExitDirection("down");
        setTimeout(() => {
          setCurrentPlanetIndex((prev) => (prev === planets.length - 1 ? 0 : prev + 1));
        }, 100);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []); // empty dep array: handler doesn't need re‑create on planets length changes

  // ------------------------- animation variants -------------------------
  const exitVariants: Record<Direction, any> = {
    up: {
      opacity: [1, 0.7, 0],
      scale: [1, 0.6, 0.2],
      x: [0, 200, 400],
      y: [0, -150, -300],
      rotate: [0, 30, 60],
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.6, 1],
      },
    },
    down: {
      opacity: [1, 0.7, 0],
      scale: [1, 0.6, 0.2],
      x: [0, 200, 400],
      y: [0, 150, 300],
      rotate: [0, -30, -60],
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.6, 1],
      },
    },
  };

  const enterVariants: Record<Direction, any> = {
    up: {
      opacity: [0, 0.3, 1],
      scale: [0.2, 0.6, 1],
      x: [-400, -200, 0],
      y: [300, 150, 0],
      rotate: [-60, -30, 0],
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.4, 1],
        delay: 0.2,
      },
    },
    down: {
      opacity: [0, 0.3, 1],
      scale: [0.2, 0.6, 1],
      x: [-400, -200, 0],
      y: [-300, -150, 0],
      rotate: [60, 30, 0],
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.4, 1],
        delay: 0.2,
      },
    },
  };

  // ------------------------- render -------------------------
  return (
    <div className="flex flex-col h-full px-6 py-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-center items-center mb-8 mt-4">
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
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-80 h-80 flex items-center justify-center">
          <motion.div
            className="cursor-pointer relative"
            onTapStart={() => setIsPressed(true)}
            onTap={() => setIsPressed(false)}
            onTapCancel={() => setIsPressed(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
                  transition: { duration: 1, ease: [0.4, 0, 0.2, 1] },
                }}
                exit={exitVariants[exitDirection]}
              >
                {/* Planet */}
                <div
                  className="relative overflow-hidden rounded-full"
                  style={{
                    height: "260px",
                    width: "260px",
                    background:
                      "radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 65%)",
                    boxShadow: `inset 10px 0px 12px -2px rgba(255, 255, 255, 0.2), inset -70px 0px 50px 0px black, -5px 0px 10px -4px ${currentPlanet.color}, 0px 0px 40px ${currentPlanet.color}66`,
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
                    }}
                    animate={{ backgroundPosition: ["0% center", "-200% center"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />

                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      zIndex: 2,
                      background:
                        "radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 65%)",
                    }}
                  />
                </div>

                {/* Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    transform: "scale(1.2)",
                    background: `radial-gradient(circle, ${currentPlanet.color}4D 0%, transparent 70%)`,
                    filter: "blur(20px)",
                    zIndex: 0,
                  }}
                  animate={{
                    opacity: isPressed ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
                    scale: isPressed ? [1.2, 1.3, 1.2] : [1.2, 1.25, 1.2],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border pointer-events-none"
              style={{ transform: "scale(1.4)", zIndex: -1, borderColor: `${currentPlanet.color}33` }}
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.4, 1.45, 1.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute inset-0 rounded-full border pointer-events-none"
              style={{
                transform: "scale(1.6)",
                zIndex: -2,
                borderColor: `${currentPlanet.color}1A`,
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1.6, 1.65, 1.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Navigation Instructions */}
      <motion.div
        className="text-center text-white/60 text-sm pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p>使用 ↑↓ 鍵切換星球</p>
        <div className="flex justify-center mt-2 space-x-2">
          {planets.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentPlanetIndex ? "bg-white" : "bg-white/30"
              }`}
              animate={{
                scale: index === currentPlanetIndex ? 1.25 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
