'use client';

import { useRouter } from 'next/navigation';
import { UserMenu } from './UserMenu';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Content Studio</h2>
      </div>
      <UserMenu />
    </nav>
  );
}
