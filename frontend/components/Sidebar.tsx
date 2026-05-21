'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  FileText,
  Settings,
  BarChart3,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/generator', label: 'Generate', icon: Sparkles },
  { href: '/content', label: 'Content', icon: FileText },
  { href: '/brand', label: 'Brand', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white flex flex-col h-screen">
      <div className="p-6 border-b border-indigo-500">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-8 h-8" />
          Studio
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-500 text-white'
                  : 'text-indigo-100 hover:bg-indigo-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-indigo-500">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-600 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
