import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';

const generators = [
  { label: 'Blog Post', type: 'blog' },
  { label: 'Ad Copy', type: 'ad-copy' },
  { label: 'Social Post', type: 'social' },
  { label: 'Email', type: 'email' },
  { label: 'SEO Content', type: 'seo' },
];

export function QuickGenerators() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Quick Generate</h2>
      </div>
      <div className="space-y-2 p-6">
        {generators.map((gen) => (
          <Link
            key={gen.type}
            href={`/generator?type=${gen.type}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-indigo-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full" />
              <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                {gen.label}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        ))}
      </div>
      <div className="px-6 pb-6">
        <Link
          href="/generator"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          All Generators
        </Link>
      </div>
    </div>
  );
}
