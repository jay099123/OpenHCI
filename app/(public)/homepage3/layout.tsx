"use client";

import { useState, useEffect } from "react";
// import Image from "next/image";
// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import HistoryIcon from '@mui/icons-material/History';
// import AddIcon from '@mui/icons-material/Add';
import WifiIcon from '@mui/icons-material/Wifi';
import Battery90Icon from '@mui/icons-material/BatteryFull';

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
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-violet-950 to-purple-950 flex flex-col rounded-3xl overflow-hidden">
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>


    </div>
  )
}