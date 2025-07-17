"use client";

import { useState } from "react";
import Image from "next/image";
import { translations, languages, getTranslation } from "@/components/translations";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "success" | "error">("idle");

  // Get current translations
  const t = getTranslation(selectedLanguage);

  const steps = [
    {
      title: t.languageSelection,
      subtitle: "Language Selection",
      content: "welcome"
    },
    {
      title: t.connectProduct,
      subtitle: "Connect Product",
      content: "connect1"
    },
    {
      title: t.connectProduct,
      subtitle: "Connect Product", 
      content: "connect2"
    },
    {
      title: t.connectProduct,
      subtitle: "Connect Product",
      content: "connect3"
    }
  ];

  const handleStart = () => {
    setCurrentStep(1);
    setConnectionStatus("connecting");
    
    setTimeout(() => {
      setConnectionStatus("success");
    }, 2000);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <div className="text-4xl">✨</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.welcome}</h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.languageSetting}
              </label>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  ▼
                </div>
              </div>
            </div>
            
            <button
              onClick={handleStart}
              className="w-full bg-white border-2 border-gray-800 text-gray-800 py-3 px-6 rounded-md font-bold hover:bg-gray-50 transition-colors"
            >
              {t.start}
            </button>
          </div>
        );

      case 1:
        return (
          <div className="bg-gray-100 rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white overflow-hidden">
                <Image
                  src="/sym_sleep.JPG"
                  alt="Sleep symbol"
                  width={120}
                  height={120}
                  className="object-cover rounded"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.connecting}</h3>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">{t.searching}</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="bg-pink-50 rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 border-2 border-pink-300 rounded-lg flex items-center justify-center bg-pink-100">
                <Image
                  src="/sym_panic.JPG"
                  alt="Panic symbol"
                  width={120}
                  height={120}
                  className="object-cover rounded"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.connecting}</h3>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">{t.almostThere}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-pink-600 h-2 rounded-full w-2/3 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 border-2 border-purple-300 rounded-lg flex items-center justify-center bg-purple-100">
                <Image
                  src="/sym_smile.JPG"
                  alt="Smile symbol"
                  width={120}
                  height={120}
                  className="object-cover rounded"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.connecting}</h3>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-green-600 font-semibold mb-2">{t.connectionComplete}</p>
              <div className="text-4xl mb-4">✅</div>
            </div>
            
            <button
              onClick={handleNext}
              className="w-full bg-gray-800 text-white py-3 px-6 rounded-md font-bold hover:bg-gray-700 transition-colors"
            >
              {t.next}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.onboardingFlow}</h1>
          <p className="text-gray-600">{t.welcomeSubtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-colors ${
                  index <= currentStep ? "bg-purple-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            {t.stepOf.replace('{current}', (currentStep + 1).toString()).replace('{total}', steps.length.toString())}
          </div>
        </div>

        {/* Step Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep].subtitle}</p>
        </div>

        {/* Step Content */}
        <div className="flex justify-center">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-8 space-x-4">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              {t.back}
            </button>
          )}
          
          {currentStep < steps.length - 1 && currentStep > 0 && connectionStatus === "success" && (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              {t.continue}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}