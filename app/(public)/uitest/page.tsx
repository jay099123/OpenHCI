"use client";

import { useState } from "react";
import Image from "next/image";

export default function BurgerOrderPage() {
  const [spicyLevel, setSpicyLevel] = useState(50);
  const [portion, setPortion] = useState(1);

  const handleSpicyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpicyLevel(parseInt(e.target.value));
  };

  const increasePortion = () => {
    setPortion(portion + 1);
  };

  const decreasePortion = () => {
    if (portion > 1) {
      setPortion(portion - 1);
    }
  };

  const getSpicyLabel = () => {
    if (spicyLevel <= 25) return "Mild";
    if (spicyLevel <= 75) return "Medium";
    return "Hot";
  };

  const getSpicyColor = () => {
    if (spicyLevel <= 25) return "text-green-600";
    if (spicyLevel <= 75) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex-1 mx-4">
            <div className="bg-black rounded-full h-6 w-24 mx-auto"></div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Burger Image */}
        <div className="px-6 pt-8 pb-6">
          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="text-8xl">🍔</div>
            {/* Replace with actual image if you have one */}
            {/* <Image
              src="/burger-image.jpg"
              alt="Hamburger Veggie Burger"
              width={300}
              height={250}
              className="object-cover rounded-lg"
            /> */}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-6 pb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hamburger Veggie Burger
          </h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <span className="text-orange-400 mr-1">⭐</span>
              <span className="text-gray-600 text-sm">4.8</span>
            </div>
            <span className="text-gray-400 mx-2">—</span>
            <span className="text-gray-600 text-sm">14 mins</span>
          </div>
          
          <h3 className="text-gray-600 text-sm leading-relaxed mb-8">
            Enjoy
          </h3>
        </div>

        {/* Controls */}
        <div className="px-6 pb-6 space-y-8">
          {/* Spicy Level */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spicy</h3>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={spicyLevel}
                onChange={handleSpicyChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${spicyLevel}%, #e5e7eb ${spicyLevel}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-sm mt-2">
                <span className="text-green-600">Mild</span>
                <span className={`font-medium ${getSpicyColor()}`}>
                  {getSpicyLabel()}
                </span>
                <span className="text-red-600">Hot</span>
              </div>
            </div>
          </div>

          {/* Portion */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Portion</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={decreasePortion}
                className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                disabled={portion <= 1}
              >
                <span className="text-xl font-bold">−</span>
              </button>
              
              <span className="text-xl font-semibold text-gray-900 min-w-[2rem] text-center">
                {portion}
              </span>
              
              <button
                onClick={increasePortion}
                className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <span className="text-xl font-bold">+</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="px-6 pb-8 pt-4">
          <div className="flex items-center space-x-4">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg">
              <span className="text-xl font-bold">
                ${(9.99 * portion).toFixed(2)}
              </span>
            </div>
            
            <button className="flex-1 bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-900 transition-colors">
              <span className="text-lg font-semibold">ORDER NOW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}