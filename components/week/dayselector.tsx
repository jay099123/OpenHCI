"use client";

import { useState } from "react";

interface DaySelectorProps {
  defaultSelectedDays?: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  onChange?: (selectedDays: any) => void;
}

export default function DaySelector({ 
  defaultSelectedDays = {
    monday: false,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: true
  },
  onChange
}: DaySelectorProps) {
  const [selectedDays, setSelectedDays] = useState(defaultSelectedDays);

  const toggleDay = (day: keyof typeof selectedDays) => {
    const newSelectedDays = {
      ...selectedDays,
      [day]: !selectedDays[day]
    };
    setSelectedDays(newSelectedDays);
    onChange?.(newSelectedDays);
  };

  const dayButtons = [
    { key: 'monday', label: '一' },
    { key: 'tuesday', label: '二' },
    { key: 'wednesday', label: '三' },
    { key: 'thursday', label: '四' },
    { key: 'friday', label: '五' },
    { key: 'saturday', label: '六' },
    { key: 'sunday', label: '日' }
  ];

  return (
    <div className="flex space-x-2">
      {dayButtons.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => toggleDay(key as keyof typeof selectedDays)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
            selectedDays[key as keyof typeof selectedDays]
              ? 'bg-orange-400 hover:bg-orange-500'
              : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          <span className="text-xs text-white font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}