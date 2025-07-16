"use client";

import { useState } from "react";

export default function Homepage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="flex flex-col h-full px-6 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-800">LOGO</h1>
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-64 h-64 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
          {/* You can add content inside the circle here */}
          <div className="text-white text-center">
            <div className="text-4xl mb-2">📚</div>
            <p className="text-sm">StoryTeller</p>
          </div>
        </div>
      </div>

      {/* Settings Panel (optional) */}
      {isSettingsOpen && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-4 z-10">
          <div className="space-y-3">
            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
              Profile
            </button>
            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
              Settings
            </button>
            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
              Help
            </button>
            <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}