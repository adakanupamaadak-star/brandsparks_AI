'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

export function BlogGenerator() {
  const { register, handleSubmit, watch } = useForm();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/generate/blog', data);
      setResult(response.data);
      toast.success('Blog post generated!');
    } catch (error) {
      toast.error('Failed to generate blog post');
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
              placeholder="e.g., How to Start a Successful Blog"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
            <input
              {...register('targetAudience')}
              type="text"
              placeholder="e.g., Aspiring entrepreneurs"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
            <select
              {...register('tone')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="academic">Academic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
            <select
              {...register('length')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="short">Short (500 words)</option>
              <option value="medium">Medium (1500 words)</option>
              <option value="long">Long (3000 words)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma-separated)</label>
            <input
              {...register('keywords')}
              type="text"
              placeholder="e.g., blogging, SEO, content"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            <Sparkles className="w-5 h-5" />
            {loading ? 'Generating...' : 'Generate Blog Post'}
          </button>
        </form>

        {result && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Blog Post</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{result.title}</h4>
                <p className="text-gray-600 text-sm whitespace-pre-wrap">{result.content}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                <span className="text-sm text-gray-600">SEO Score</span>
                <span className="text-lg font-semibold text-indigo-600">{result.seoScore}/100</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
