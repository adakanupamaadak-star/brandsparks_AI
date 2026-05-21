'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { Sparkles } from 'lucide-react';

export function EmailGenerator() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/generate/email', data);
      setResult(response.data);
      toast.success('Email generated!');
    } catch (error) {
      toast.error('Failed to generate email');
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
            <input
              {...register('subject', { required: true })}
              type="text"
              placeholder="E.g., Limited Time: 50% Off Your First Purchase"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Purpose</label>
            <select
              {...register('purpose', { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            >
              <option value="promotional">Promotional</option>
              <option value="newsletter">Newsletter</option>
              <option value="nurture">Nurture</option>
              <option value="transactional">Transactional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Call-to-Action</label>
            <input
              {...register('cta', { required: true })}
              type="text"
              placeholder="E.g., Shop Now, Learn More, Get Started"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            <Sparkles className="w-5 h-5" />
            {loading ? 'Generating...' : 'Generate Email'}
          </button>
        </form>

        {result && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Email</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">SUBJECT</p>
                <p className="font-semibold text-gray-900">{result.subject}</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-xs font-medium text-gray-500 mb-2">EMAIL BODY</p>
                <p className="text-gray-600 text-sm whitespace-pre-wrap">{result.body}</p>
              </div>
              <div className="border-t pt-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700">
                  {result.ctaText}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
