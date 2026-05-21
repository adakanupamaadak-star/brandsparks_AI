'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Volume2 } from 'lucide-react';

export function BrandVoicePanel() {
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrand();
  }, []);

  const fetchBrand = async () => {
    try {
      const response = await api.get('/brand');
      setBrand(response.data);
    } catch (error) {
      console.error('Failed to fetch brand', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Brand Voice</h3>
      </div>

      {brand ? (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Brand Name</p>
            <p className="text-gray-900">{brand.name || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Tone</p>
            <p className="text-gray-900">{brand.voiceProfile?.tone || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Industry</p>
            <p className="text-gray-900">{brand.industry || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Keywords</p>
            <div className="flex flex-wrap gap-2">
              {brand.keywords?.length ? (
                brand.keywords.map((kw: string) => (
                  <span key={kw} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                    {kw}
                  </span>
                ))
              ) : (
                <p className="text-gray-600 text-sm">Not set</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No brand profile set. Create one to maintain voice consistency.</p>
      )}
    </div>
  );
}
