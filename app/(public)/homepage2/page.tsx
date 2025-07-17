"use client";

import { useState } from "react";
import Image from "next/image";

export default function Homepage2() {
  const [selectedStory, setSelectedStory] = useState(null);

  const stories = [
    {
      id: 1,
      title: "The Magic Forest",
      image: "/story1.png",
      description: "A young girl discovers a magical forest full of talking animals",
      duration: "5 min read"
    },
    {
      id: 2,
      title: "Space Adventure",
      image: "/story2.png",
      description: "Join Captain Sam on an exciting journey through the stars",
      duration: "8 min read"
    },
    {
      id: 3,
      title: "Ocean Dreams",
      image: "/story3.png",
      description: "Dive deep into the ocean and meet friendly sea creatures",
      duration: "6 min read"
    },
    {
      id: 4,
      title: "Castle Quest",
      image: "/story4.png",
      description: "A brave knight searches for a hidden treasure in an ancient castle",
      duration: "7 min read"
    }
  ];

  return (
    <div className="flex flex-col h-full px-6 py-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-gray-800">STORY TIME</h1>
        <button className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm">
          <Image
            src="/search.png"
            alt="Search"
            width={24}
            height={24}
            className="object-contain"
          />
        </button>
      </div>

      {/* Featured Story */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Featured Story</h2>
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Dragon's Tale</h3>
              <p className="text-purple-100 mb-4">A friendly dragon learns about friendship</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Read Now
              </button>
            </div>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Image
                src="/dragon.png"
                alt="Dragon"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Story Grid */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Choose Your Adventure</h2>
        <div className="grid grid-cols-2 gap-4">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-full h-24 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <Image
                  src={story.image}
                  alt={story.title}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{story.title}</h3>
              <p className="text-gray-600 text-xs mb-2 line-clamp-2">{story.description}</p>
              <span className="text-purple-600 text-xs font-medium">{story.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex justify-center space-x-4">
        <button className="bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 transition-colors">
          Random Story
        </button>
        <button className="bg-green-400 text-green-900 px-6 py-3 rounded-full font-medium hover:bg-green-500 transition-colors">
          My Favorites
        </button>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSelectedStory(null)}
          ></div>
          <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-white rounded-2xl p-6 z-30">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedStory.title}</h3>
              <button 
                onClick={() => setSelectedStory(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Image
                  src="/close.png"
                  alt="Close"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </button>
            </div>
            <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <Image
                src={selectedStory.image}
                alt={selectedStory.title}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <p className="text-gray-600 mb-4">{selectedStory.description}</p>
            <div className="flex space-x-3">
              <button className="flex-1 bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition-colors">
                Start Reading
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-300 transition-colors">
                Save for Later
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}