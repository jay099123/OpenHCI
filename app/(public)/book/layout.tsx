"use client";

import { useState, useEffect } from "react";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col rounded-3xl overflow-hidden">
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}