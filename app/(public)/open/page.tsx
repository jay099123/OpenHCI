"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OpeningPage() {
  const router = useRouter();
  const [stars, setStars] = useState<Array<{ left: string; top: string; delay: number; duration: number }>>([]);
  const [isClient, setIsClient] = useState(false);

  // Generate stars only on client side
  useEffect(() => {
    setIsClient(true);
    const starArray = [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
    setStars(starArray);
  }, []);

//   Auto redirect after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/homepage3');
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [router]);

  // Don't render stars until client-side
  if (!isClient) {
    return (
      <div className="flex flex-col h-screen w-screen overflow-hidden fixed inset-0 bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900">
        {/* Main Content without stars during SSR */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
          {/* Logo/Title Image */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-80 h-24 mb-4">
              <Image
                src="/add.png" // Replace with your title image path
                alt="星球故事"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-2xl text-white/80 font-bold">
              Diving Into Kid's Imagination
            </h2>
          </motion.div>

          {/* Planet Image */}
          <motion.div
            className="relative w-32 h-32 mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut",
              delay: 0.5 
            }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              }}
            >
              <Image
                src="/add.png" // Replace with your planet image path
                alt="Planet"
                fill
                className="object-contain drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))"
                }}
              />
            </motion.div>
            
            {/* Planet Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              style={{ transform: "scale(1.3)" }}
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-white/20"
              style={{ transform: "scale(1.6)" }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Loading Animation */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.p
              className="text-white/70 text-lg mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              正在載入星球...
            </motion.p>
            
            {/* Loading Dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-8 left-8 right-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl">
      {/* Background Stars Effect - Only render on client */}
      <div className="absolute inset-0 rounded-3xl">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Logo/Title Image */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative w-80 h-24 mb-4">
            <Image
              src="/pic.png" // Replace with your title image path
              alt="星球故事"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl text-white/80 font-bold">
            Diving Into Kid's Imagination
          </h2>
        </motion.div>

        {/* Planet Image - No Animation */}
        <motion.div
          className="relative w-32 h-32 mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: 0.5 
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/app.png" // Replace with your planet image path
              alt="Planet"
              fill
              className="object-contain drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))"
              }}
            />
          </div>
          
          {/* Planet Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            style={{ transform: "scale(1.3)" }}
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            style={{ transform: "scale(1.6)" }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.p
            className="text-white/70 text-lg mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            正在載入星球...
          </motion.p>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-8 left-8 right-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}