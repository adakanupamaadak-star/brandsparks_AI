'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

export function AdCopyGenerator() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/generate/ad-copy', data);
      setResult(response.data);
      toast.success('Ad copy generated!');
    } catch (error) {
      toast.error('Failed to generate ad copy');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              {...register('productName', { required: true })}
              type="text"
              placeholder="e.g., Pro Analytics Dashboard"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
            <textarea
              {...register('productDescription', { required: true })}
              placeholder="Describe your product..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              {...register('platform', { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="google">Google Ads</option>
              <option value="facebook">Facebook/Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
            <input
              {...register('targetAudience')}
              type="text"
              placeholder="e.g., Business owners, Marketers"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            <Sparkles className="w-5 h-5" />
            {loading ? 'Generating...' : 'Generate Ad Copy'}
          </button>
        </form>

        {result && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ad Copy Variations</h3>
            <div className="space-y-4">
              {result.variants?.map((variant: string, i: number) => (
                <div key={i} className="bg-white p-4 rounded border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Variation {i + 1}</p>
                  <p className="text-gray-600">{variant}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
