"use client";

import { useState } from "react";

interface ToggleProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  variant?: "orange" | "blue";
}

export default function Toggle({ 
  label, 
  defaultChecked = false, 
  onChange,
  variant = "orange"
}: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "orange":
        return "peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:bg-orange-400 dark:peer-checked:bg-orange-400";
      case "blue":
        return "peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600";
      default:
        return "peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:bg-orange-400 dark:peer-checked:bg-orange-400";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-800 font-medium">{label}</span>
      <label className="inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={handleChange}
          className="sr-only peer" 
        />
        <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ${getVariantClasses()}`}>
        </div>
      </label>
    </div>
  );
}