'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

export function SocialMediaGenerator() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/generate/social', data);
      setResult(response.data);
      toast.success('Social post generated!');
    } catch (error) {
      toast.error('Failed to generate social post');
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
            <input
              {...register('topic', { required: true })}
              type="text"
              placeholder="What do you want to post about?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
            <select
              {...register('platform', { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="twitter">Twitter/X</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="tiktok">TikTok</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags (comma-separated)</label>
            <input
              {...register('hashtags')}
              type="text"
              placeholder="#marketing #content #ai"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            <Sparkles className="w-5 h-5" />
            {loading ? 'Generating...' : 'Generate Social Post'}
          </button>
        </form>

        {result && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Post</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border border-gray-200">
                <p className="text-gray-600 text-sm whitespace-pre-wrap">{result.post}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.hashtags?.map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
