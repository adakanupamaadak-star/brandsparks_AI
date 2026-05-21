'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';

interface BrandSetupFormProps {
  initialData: any;
  onSave: (data: any) => Promise<void>;
  saving: boolean;
}

export function BrandSetupForm({ initialData, onSave, saving }: BrandSetupFormProps) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSave)} className="bg-white rounded-lg shadow p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Brand Setup</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
        <input
          {...register('name')}
          type="text"
          placeholder="Your brand name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          {...register('description')}
          placeholder="What does your brand do?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent h-24"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
        <input
          {...register('industry')}
          type="text"
          placeholder="e.g., Technology, E-commerce, SaaS"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
        <textarea
          {...register('targetAudience')}
          placeholder="Describe your target audience..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent h-20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Tone</label>
        <select
          {...register('voiceProfile.tone')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual & Friendly</option>
          <option value="creative">Creative & Unique</option>
          <option value="academic">Academic & Detailed</option>
          <option value="sales">Persuasive & Sales-Oriented</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Guidelines</label>
        <textarea
          {...register('guidelines')}
          placeholder="Document your brand guidelines, values, and messaging rules..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent h-24"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Key Brand Keywords</label>
        <input
          {...register('keywords')}
          type="text"
          placeholder="Comma-separated keywords (e.g., innovation, quality, trust)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors font-medium"
      >
        {saving ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Saving...
          </>
        ) : (
          'Save Brand Profile'
        )}
      </button>
    </form>
  );
}
