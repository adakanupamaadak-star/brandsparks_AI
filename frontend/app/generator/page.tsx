'use client';

import { useState } from 'react';
import { ContentTabs } from '@/components/generator/ContentTabs';
import { BrandVoicePanel } from '@/components/generator/BrandVoicePanel';

export default function GeneratorPage() {
  const [selectedType, setSelectedType] = useState<string>('blog');
  const [showBrandPanel, setShowBrandPanel] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Generator</h1>
        <p className="text-gray-600">Create high-quality, brand-consistent content in seconds</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <ContentTabs selectedType={selectedType} onTypeChange={setSelectedType} />
        </div>
        <div className="lg:col-span-1">
          <BrandVoicePanel />
        </div>
      </div>
    </div>
  );
}
