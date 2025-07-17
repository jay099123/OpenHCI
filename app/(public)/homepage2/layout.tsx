"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false // Use 24-hour format like "9:41"
      });
      setCurrentTime(timeString);
    };

    // Update time immediately
    updateTime();

    // Update time every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-orange-100 flex flex-col rounded-3xl overflow-hidden">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-black text-sm font-medium">
        <div className="flex items-center space-x-1">
          <span className="ml-4 font-bold">{currentTime || "9:41"}</span>
        </div>
        <div className="flex items-center space-x-1">
          {/* Signal bars - More realistic iPhone style */}
          <div className="flex items-end space-x-0.5">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-2 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-4 bg-black rounded-full"></div>
            {/* <div className="w-1 h-5 bg-black rounded-full"></div> */}
          </div>
          {/* WiFi icon */}
          <Image
            src="/ioswifi.png"
            alt="WiFi"
            width={20}
            height={20}
            className="object-contain"
          />
          {/* Battery icon */}
          <Image
            src="/battery.png"
            alt="Battery"
            width={24}
            height={12}
            className="object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Bottom Navigation with Add Button Outside */}
      <div className="relative">
        {/* Add button - outside navigation bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 z-10">
          <div className="bg-gray-800 rounded-full p-3">
            <button className="bg-white rounded-full p-4 text-gray-800 shadow-lg transform hover:scale-105 transition-transform">
              <Image
                src="/add.png"
                alt="Add"
                width={32}
                height={32}
                className="object-contain"
              />
            </button>
          </div>
        </div>
        
        {/* Bottom Navigation Bar */}
        <div className="bg-gray-800 mx-4 mb-4 rounded-full px-8 py-4">
          <div className="flex items-center justify-between">
            {/* History button */}
            <button className="text-white flex flex-col items-center space-y-1">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/history.png"
                  alt="History"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] font-medium">紀錄</span>
            </button>
            
            {/* Empty space for center button */}
            <div className="w-12"></div>
            
            {/* Bookmenu Button */}
            <button className="text-white flex flex-col items-center space-y-1">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/bookmenu.png"
                  alt="Books"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] font-medium">書櫃</span>
            </button>
          </div>
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  )
}