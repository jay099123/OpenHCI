"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Toggle from "@/components/toggle/switch";
import DaySelector from "@/components/week/dayselector";
import Select from "@/components/drag/daylist";
import { languages } from "@/components/translations";

export default function TestPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState("準備好探索星球了嗎？");

  const dialogs = [
    "準備好探索星球了嗎？",
    "今天想去哪個星球冒險呢？",
    "讓我們一起遨遊宇宙吧！",
    "準備好開始星際旅行了嗎？",
    "來一場太空探險吧！"
  ];

  // Data retention options
  const dataRetentionOptions = [
    { value: "7days", label: "7天" },
    { value: "1month", label: "1個月" },
    { value: "3months", label: "3個月" },
    { value: "6months", label: "6個月" },
    { value: "1year", label: "1年" },
    { value: "forever", label: "永久" }
  ];

  // Language options - converted from translations.ts
  const languageOptions = languages.map(lang => ({
    value: lang.code,
    label: lang.label
  }));

  const handlePlanetClick = () => {
    const currentIndex = dialogs.indexOf(currentDialog);
    const nextIndex = (currentIndex + 1) % dialogs.length;
    setCurrentDialog(dialogs[nextIndex]);
  };

  return (
    <div className="flex flex-col h-full px-6 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-black text-white">PLANET EXPLORER</h1>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors shadow-sm"
        >
          <Image
            src="/setting.png"
            alt="Settings"
            width={24}
            height={24}
            className="object-contain"
          />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center mt-15">
        {/* 2D Planet with CSS */}
        <motion.div
          className="cursor-pointer relative"
          onClick={handlePlanetClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{
            scale: 1.1,
            transition: { duration: 0.1 }
          }}
        >
          {/* Planet Container */}
          <div className="relative w-80 h-80">
            {/* Planetary Ring System - Behind Planet */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Ring System */}
              <div className="relative w-96 h-20">
                {/* Outer Ring */}
                <div 
                  className="absolute inset-0 rounded-full border-8 border-gray-300/60"
                  style={{
                    background: `linear-gradient(to right, transparent 35%, rgba(229, 231, 235, 0.4) 35%, rgba(229, 231, 235, 0.4) 65%, transparent 65%)`,
                    transform: "scaleY(0.15)"
                  }}
                ></div>
                
                {/* Middle Ring */}
                <div 
                  className="absolute inset-2 rounded-full border-6 border-yellow-400/50"
                  style={{
                    background: `linear-gradient(to right, transparent 40%, rgba(251, 191, 36, 0.3) 40%, rgba(251, 191, 36, 0.3) 60%, transparent 60%)`,
                    transform: "scaleY(0.12)"
                  }}
                ></div>
                
                {/* Inner Ring */}
                <div 
                  className="absolute inset-4 rounded-full border-4 border-purple-400/40"
                  style={{
                    background: `linear-gradient(to right, transparent 45%, rgba(167, 139, 250, 0.2) 45%, rgba(167, 139, 250, 0.2) 55%, transparent 55%)`,
                    transform: "scaleY(0.1)"
                  }}
                ></div>
              </div>
            </motion.div>

            {/* Planet Base - Above Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 rounded-full shadow-2xl z-10"
              style={{
                background: `radial-gradient(circle at 30% 30%, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #92400e 75%, #451a03 100%)`,
                boxShadow: `
                  inset -20px -20px 60px rgba(0, 0, 0, 0.4),
                  inset 20px 20px 60px rgba(255, 255, 255, 0.1),
                  0 0 40px rgba(251, 191, 36, 0.3)
                `
              }}
            >
              {/* Gas Giant Bands */}
              <div className="absolute top-16 left-0 right-0 h-8 bg-amber-600/30 blur-sm"></div>
              <div className="absolute top-28 left-0 right-0 h-6 bg-orange-600/40 blur-sm"></div>
              <div className="absolute top-36 left-0 right-0 h-10 bg-yellow-600/20 blur-sm"></div>
              <div className="absolute bottom-20 left-0 right-0 h-8 bg-amber-700/30 blur-sm"></div>
              <div className="absolute bottom-12 left-0 right-0 h-6 bg-orange-700/40 blur-sm"></div>
              
              {/* Storm spot */}
              <div className="absolute top-24 right-16 w-16 h-10 bg-red-600/40 rounded-full blur-sm"></div>
            </motion.div>

            {/* Planetary Ring System - In Front of Planet */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              {/* Ring System - Front Part */}
              <div className="relative w-96 h-20">
                {/* Outer Ring Front */}
                <div 
                  className="absolute inset-0 rounded-full border-t-8 border-gray-300/40"
                  style={{
                    background: `linear-gradient(to right, transparent 35%, rgba(229, 231, 235, 0.2) 35%, rgba(229, 231, 235, 0.2) 65%, transparent 65%)`,
                    transform: "scaleY(0.15)"
                  }}
                ></div>
                
                {/* Middle Ring Front */}
                <div 
                  className="absolute inset-2 rounded-full border-t-6 border-yellow-400/30"
                  style={{
                    background: `linear-gradient(to right, transparent 40%, rgba(251, 191, 36, 0.15) 40%, rgba(251, 191, 36, 0.15) 60%, transparent 60%)`,
                    transform: "scaleY(0.12)"
                  }}
                ></div>
                
                {/* Inner Ring Front */}
                <div 
                  className="absolute inset-4 rounded-full border-t-4 border-purple-400/20"
                  style={{
                    background: `linear-gradient(to right, transparent 45%, rgba(167, 139, 250, 0.1) 45%, rgba(167, 139, 250, 0.1) 55%, transparent 55%)`,
                    transform: "scaleY(0.1)"
                  }}
                ></div>
              </div>
            </motion.div>

            {/* Glow Effect */}
            <div 
              className="absolute inset-0 rounded-full opacity-20 blur-xl z-0"
              style={{
                background: `radial-gradient(circle, #fbbf24 0%, transparent 70%)`,
                transform: "scale(1.3)"
              }}
            ></div>
          </div>
        </motion.div>

        {/* Dialog Bubble with Framer Motion */}
        <motion.div
          className="rounded-3xl p-4 min-w-[280px] max-w-[320px] relative mt-8 bg-white/10 backdrop-blur-sm border border-white/20"
          key={currentDialog}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute -top-3 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-white/10"></div>

          <motion.p
            className="text-white text-center text-base font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {currentDialog}
          </motion.p>
        </motion.div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            className="fixed top-10 left-4 right-4 bottom-4 
            bg-orange-50 rounded-3xl z-50 flex flex-col shadow-2xl"
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
            {/* Settings Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-orange-200">
              <h2 className="text-2xl font-bold text-gray-800">設定</h2>
              <motion.button
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-2xl text-gray-800">×</span>
              </motion.button>
            </div>

            {/* Settings Content */}
            <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
              {/* Notification Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-4">通知提醒</h3>

                {/* Time Setting */}
                <div className="bg-orange-100 rounded-2xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-800">20:30</span>
                      <div className="w-6 h-6 bg-gray-400 rounded"></div>
                    </div>
                    <Toggle 
                      label="" 
                      defaultChecked={true}
                      variant="orange"
                      onChange={(checked) => console.log('Time reminder:', checked)}
                    />
                  </div>

                  {/* Day selector - Now a reusable component */}
                  <DaySelector 
                    onChange={(selectedDays) => console.log('Selected days:', selectedDays)}
                  />
                </div>

                {/* Notification Options */}
                <div className="bg-orange-100 rounded-2xl p-4 space-y-4">
                  <Toggle 
                    label="探索通知"
                    defaultChecked={true}
                    variant="orange"
                    onChange={(checked) => console.log('Explorer notification:', checked)}
                  />
                  <Toggle 
                    label="APP 通知"
                    defaultChecked={true}
                    variant="orange"
                    onChange={(checked) => console.log('APP notification:', checked)}
                  />
                </div>
              </motion.div>

              {/* Language Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-4">語言設定</h3>
                <div className="bg-orange-100 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium">語言</span>
                    <div className="min-w-[120px]">
                      <Select
                        options={languageOptions}
                        defaultValue="中文"
                        onChange={(value) => console.log('Language changed:', value)}
                        placeholder="選擇語言"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Usage Data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-4">使用數據</h3>
                <div className="bg-orange-100 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium">數據保存時間</span>
                    <div className="min-w-[100px]">
                      <Select
                        options={dataRetentionOptions}
                        defaultValue="forever"
                        onChange={(value) => console.log('Data retention changed:', value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}