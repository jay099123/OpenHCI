"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  // State for mode selection
  const [mode, setMode] = useState<"assist" | "generate">("assist");
  // State for the story content
  const [story, setStory] = useState("");
  // State for the current background
  const [background, setBackground] = useState("/story.png");
  // State for suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // State for story theme (generating mode)
  const [storyTheme, setStoryTheme] = useState("");
  // State for generated story
  const [generatedStory, setGeneratedStory] = useState("");
  // State to track if story is being told (presentation mode)
  const [isTelling, setIsTelling] = useState(false);

  // Mock function to simulate story generation
  const generateStory = () => {
    // In a real implementation, this would call an AI API
    setGeneratedStory(
      `Once upon a time, there was a little rabbit who lived in the forest. 
      The rabbit was known for being very fast, but one day, decided to take a rest instead of running...`
    );
  };

  // Mock function to simulate getting AI suggestions
  const getSuggestions = () => {
    // In a real implementation, this would call an AI API
    setSuggestions([
      "Sometimes it's important to rest so we can be our best later",
      "The rabbit was tired and needed to save energy",
      "Everyone needs breaks, even fast rabbits!"
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            StoryTeller AI
          </h1>
          <div className="flex space-x-4">
            <button 
              className={`px-4 py-2 rounded-full ${mode === "assist" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setMode("assist")}
            >
              Assist Mode
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${mode === "generate" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setMode("generate")}
            >
              Generate Mode
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel - Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {mode === "assist" ? "Story Assistant" : "Story Generator"}
          </h2>
          
          {mode === "assist" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Upload or Paste Your Story
                </label>
                <textarea 
                  className="w-full h-32 p-2 border border-gray-300 rounded-md"
                  placeholder="Once upon a time..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                />
              </div>
              
              <button 
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                onClick={() => setIsTelling(!isTelling)}
              >
                {isTelling ? "Stop Telling" : "Start Telling"}
              </button>
              
              <button 
                className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600"
                onClick={getSuggestions}
              >
                Get Answer Suggestions
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Story Theme or Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Courage, Friendship, etc."
                  value={storyTheme}
                  onChange={(e) => setStoryTheme(e.target.value)}
                />
              </div>
              
              <button 
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                onClick={generateStory}
              >
                Generate Story
              </button>
              
              {generatedStory && (
                <button 
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                  onClick={() => setIsTelling(!isTelling)}
                >
                  {isTelling ? "Stop Telling" : "Start Telling"}
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Middle panel - Story display and background */}
        <div className="lg:col-span-2 space-y-6">
          {/* Background preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 relative h-48 overflow-hidden">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">Background</h3>
            <Image
              src={background}
              alt="Story background"
              fill
              style={{ objectFit: "cover" }}
              className="rounded opacity-80"
            />
            <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-700 p-2 rounded-md shadow">
              <button className="text-sm text-purple-600 dark:text-purple-400">
                Change Background
              </button>
            </div>
          </div>
          
          {/* Story content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-h-[300px]">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
              {isTelling ? "Storytelling Mode" : "Story Content"}
            </h3>
            <div className="prose dark:prose-invert">
              {mode === "assist" ? (
                <p className="whitespace-pre-line">{story || "Your story will appear here..."}</p>
              ) : (
                <p className="whitespace-pre-line">{generatedStory || "Generated story will appear here..."}</p>
              )}
            </div>
          </div>
          
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
                Suggested Answers
              </h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-purple-50 dark:bg-gray-700 rounded-md">
                    <p className="text-gray-800 dark:text-gray-200">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-12 bg-white dark:bg-gray-800 shadow-inner p-4">
        <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>Human-AI Interaction Design for Autonomous Agents in Everyday Tasks</p>
        </div>
      </footer>
    </div>
  );
}