'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
          U
        </div>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-200">
            Profile
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-200">
            Settings
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
