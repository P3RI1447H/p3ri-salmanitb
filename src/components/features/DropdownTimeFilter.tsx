"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function DropdownTimeFilter() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Rentang Waktu");

  const times = ["Pekan 1", "Pekan 2", "Pekan 3", "Pekan 4"];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Tombol Dropdown */}
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="font-montserrat inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all bg-white text-primary hover:bg-primary/10 cursor-pointer"
      >
        {selectedTime}
        {dropdownOpen ? (
          <ChevronUp className="h-4 w-4 transition-transform duration-200" />
        ) : (
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        )}
      </button>

      {/* Menu Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className="block px-4 py-2 text-sm font-montserrat text-gray-700 hover:bg-primary/10 hover:text-primary w-full text-left transition-all cursor-pointer"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}