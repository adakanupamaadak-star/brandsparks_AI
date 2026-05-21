'use client';

import { useState } from 'react';
import { BlogGenerator } from './generators/BlogGenerator';
import { AdCopyGenerator } from './generators/AdCopyGenerator';
import { SocialMediaGenerator } from './generators/SocialMediaGenerator';
import { EmailGenerator } from './generators/EmailGenerator';
import { SEOGenerator } from './generators/SEOGenerator';

const tabs = [
  { id: 'blog', label: 'Blog Post' },
  { id: 'ad-copy', label: 'Ad Copy' },
  { id: 'social', label: 'Social Media' },
  { id: 'email', label: 'Email' },
  { id: 'seo', label: 'SEO Content' },
];

interface ContentTabsProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function ContentTabs({ selectedType, onTypeChange }: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState(selectedType || 'blog');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTypeChange(tabId);
  };

  return (
    <div>
      <div className="bg-white border-b border-gray-200 rounded-t-lg">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-6 py-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow">
        {activeTab === 'blog' && <BlogGenerator />}
        {activeTab === 'ad-copy' && <AdCopyGenerator />}
        {activeTab === 'social' && <SocialMediaGenerator />}
        {activeTab === 'email' && <EmailGenerator />}
        {activeTab === 'seo' && <SEOGenerator />}
      </div>
    </div>
  );
}
