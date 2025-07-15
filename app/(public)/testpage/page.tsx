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
  // State for background selection
  const [showBackgroundOptions, setShowBackgroundOptions] = useState(false);
  // State for audio controls
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  // State for age group selection
  const [ageGroup, setAgeGroup] = useState("3-5");
  // State for story validation
  const [isStoryApproved, setIsStoryApproved] = useState(false);
  // State for file upload
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Available backgrounds
  const backgrounds = [
    { name: "Forest", src: "/story.png" },
    { name: "Castle", src: "/castle.png" },
    { name: "Ocean", src: "/ocean.png" },
    { name: "Space", src: "/space.png" },
    { name: "Farm", src: "/farm.png" }
  ];

  // Mock function to simulate story generation
  const generateStory = () => {
    // In a real implementation, this would call an AI API
    const themes = {
      "courage": "Once upon a time, there was a little mouse who was afraid of everything. One day, when her family was in danger, she found the courage within herself to help them...",
      "friendship": "In a magical garden, two unlikely friends - a butterfly and a caterpillar - discovered that friendship comes in many forms...",
      "collaboration": "The animals in the forest couldn't build the bridge alone, but when they worked together, they created something amazing..."
    };
    
    setGeneratedStory(
      themes[storyTheme.toLowerCase() as keyof typeof themes] || 
      `Once upon a time, there was a story about ${storyTheme}. This tale teaches us valuable lessons about life and growing up...`
    );
    setIsStoryApproved(false);
  };

  // Mock function to simulate getting AI suggestions
  const getSuggestions = () => {
    // In a real implementation, this would call an AI API based on story context
    setSuggestions([
      "Sometimes it's important to rest so we can be our best later",
      "The rabbit was tired and needed to save energy",
      "Everyone needs breaks, even fast rabbits!",
      "Rest helps us think better and make good decisions"
    ]);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // In a real implementation, you would read the file content
      const reader = new FileReader();
      reader.onload = (e) => {
        setStory(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  // Handle suggestion selection
  const selectSuggestion = (suggestion: string) => {
    // In a real implementation, this would be spoken or displayed prominently
    alert(`Selected answer: ${suggestion}`);
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
                  Upload Story File
                </label>
                <input
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Or Type/Paste Your Story
                </label>
                <textarea 
                  className="w-full h-32 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="Once upon a time..."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="audio"
                  checked={isAudioEnabled}
                  onChange={(e) => setIsAudioEnabled(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="audio" className="text-sm text-gray-700 dark:text-gray-300">
                  Enable sound effects
                </label>
              </div>
              
              <button 
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
                onClick={() => setIsTelling(!isTelling)}
                disabled={!story}
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
                  Age Group
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                >
                  <option value="3-5">3-5 years</option>
                  <option value="6-8">6-8 years</option>
                  <option value="9-12">9-12 years</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Story Theme or Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                  placeholder="Courage, Friendship, Collaboration, etc."
                  value={storyTheme}
                  onChange={(e) => setStoryTheme(e.target.value)}
                />
              </div>
              
              <button 
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
                onClick={generateStory}
                disabled={!storyTheme}
              >
                Generate Story
              </button>
              
              {generatedStory && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="approve"
                      checked={isStoryApproved}
                      onChange={(e) => setIsStoryApproved(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="approve" className="text-sm text-gray-700 dark:text-gray-300">
                      I approve this story for my child
                    </label>
                  </div>
                  
                  <button 
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                    onClick={() => setIsTelling(!isTelling)}
                    disabled={!isStoryApproved}
                  >
                    {isTelling ? "Stop Telling" : "Start Telling"}
                  </button>
                  
                  <button 
                    className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
                    onClick={generateStory}
                  >
                    Regenerate Story
                  </button>
                </div>
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
              <button 
                className="text-sm text-purple-600 dark:text-purple-400"
                onClick={() => setShowBackgroundOptions(!showBackgroundOptions)}
              >
                Change Background
              </button>
            </div>
            
            {showBackgroundOptions && (
              <div className="absolute bottom-16 right-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg z-10">
                <div className="grid grid-cols-2 gap-2">
                  {backgrounds.map((bg) => (
                    <button
                      key={bg.name}
                      className="relative h-16 w-20 rounded overflow-hidden border-2 border-transparent hover:border-purple-500"
                      onClick={() => {
                        setBackground(bg.src);
                        setShowBackgroundOptions(false);
                      }}
                    >
                      <Image
                        src={bg.src}
                        alt={bg.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                        {bg.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {isTelling && isAudioEnabled && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                🔊 Audio On
              </div>
            )}
          </div>
          
          {/* Story content */}
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-h-[300px] ${isTelling ? 'border-2 border-green-500' : ''}`}>
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
              {isTelling ? "📖 Storytelling Mode" : "Story Content"}
            </h3>
            <div className="prose dark:prose-invert max-w-none">
              {mode === "assist" ? (
                <p className="whitespace-pre-line text-lg leading-relaxed">
                  {story || "Your story will appear here..."}
                </p>
              ) : (
                <div>
                  <p className="whitespace-pre-line text-lg leading-relaxed">
                    {generatedStory || "Generated story will appear here..."}
                  </p>
                  {generatedStory && !isStoryApproved && (
                    <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-md">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ Please review and approve this story before telling it to your child.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
                💡 Suggested Answers for Kids' Questions
              </h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-purple-50 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-purple-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    <p className="text-gray-800 dark:text-gray-200">{suggestion}</p>
                    <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                      Click to use this answer
                    </div>
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