'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

export function SEOGenerator() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/generate/seo', data);
      setResult(response.data);
      toast.success('SEO content generated!');
    } catch (error) {
      toast.error('Failed to generate SEO content');
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Keyword</label>
            <input
              {...register('keyword', { required: true })}
              type="text"
              placeholder="e.g., best coffee makers 2024"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
            <input
              {...register('targetAudience')}
              type="text"
              placeholder="e.g., Coffee enthusiasts, Home brewers"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Length</label>
            <select
              {...register('length')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="short">Short (500 words)</option>
              <option value="medium">Medium (1200 words)</option>
              <option value="long">Long (2000 words)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            <Sparkles className="w-5 h-5" />
            {loading ? 'Generating...' : 'Generate SEO Content'}
          </button>
        </form>

        {result && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Content</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">TITLE</p>
                <h4 className="font-semibold text-gray-900">{result.title}</h4>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">META DESCRIPTION</p>
                <p className="text-sm text-gray-600">{result.metaDescription}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">CONTENT PREVIEW</p>
                <p className="text-sm text-gray-600 line-clamp-3">{result.content}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                <span className="text-sm font-medium text-gray-700">SEO Score</span>
                <span className={`text-lg font-semibold ${
                  result.seoScore >= 80 ? 'text-green-600' :
                  result.seoScore >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>{result.seoScore}/100</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
