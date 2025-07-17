"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Homepage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState("晚安！準備好今天的故事時間了嗎？");

  const dialogs = [
    "晚安！準備好今天的故事時間了嗎？",
    "今天想聽什麼故事呢？",
    "讓我們一起進入夢幻的故事世界吧！",
    "準備好開始今天的冒險了嗎？",
    "來聽一個溫馨的睡前故事吧！"
  ];

  const handleImageClick = () => {
    const currentIndex = dialogs.indexOf(currentDialog);
    const nextIndex = (currentIndex + 1) % dialogs.length;
    setCurrentDialog(dialogs[nextIndex]);
  };

  return (
    <div className="flex flex-col h-full px-6 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-black text-gray-800">GOO GOO TIME</h1>
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm"
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
        {/* Smile Image with Framer Motion */}
        <motion.div 
          className="cursor-pointer"
          onClick={handleImageClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ 
            scale: 1.1,
            rotate: 15,
            transition: { duration: 0.1 }
          }}
        >
          <Image
            src="/sym_smile.png"
            alt="Smile Symbol"
            width={300}
            height={300}
            className="object-contain"
          />
        </motion.div>
        
        {/* Dialog Bubble with Framer Motion */}
        <motion.div 
          className="rounded-3xl p-4 min-w-[280px] max-w-[320px] relative mt-8" 
          style={{backgroundColor: '#EE8aa5'}}
          key={currentDialog}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute -top-3 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px]" style={{borderBottomColor: '#EE8aa5'}}></div>
          
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

      {/* Settings Panel - Not full screen, with pop-out animation */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            {/* Backdrop - Only covers content area, not status bar */}
            {/* <motion.div 
              className="fixed top-10 left-0 right-0 bottom-0 bg-slate-100 bg-opacity-10 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
            /> */}
            
            {/* Settings Panel */}
            <motion.div 
              className="fixed top-10 left-4 right-4 bottom-4 bg-orange-50 rounded-3xl z-50 flex flex-col shadow-2xl"
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
                        <div className="w-6 h-6 bg-gray-400 rounded"></div> {/* Placeholder for edit icon */}
                      </div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    {/* Day selector */}
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">一</span>
                      </div>
                      <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">二</span>
                      </div>
                      <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">三</span>
                      </div>
                      <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">四</span>
                      </div>
                      <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">五</span>
                      </div>
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">六</span>
                      </div>
                      <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">日</span>
                      </div>
                    </div>
                  </div>

                  {/* Notification Options */}
                  <div className="bg-orange-100 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium">GooGoo Time 通知</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 font-medium">APP 通知</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
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
                      <span className="text-gray-800 font-medium">中文 (臺灣)</span>
                      <div className="w-6 h-6 bg-gray-400 rounded"></div> {/* Placeholder for edit icon */}
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
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">永久</span>
                        <div className="w-6 h-6 bg-gray-400 rounded"></div> {/* Placeholder for edit icon */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}