'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Clock, ExternalLink } from 'lucide-react';

export function RecentContent() {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecent();
  }, []);

  const fetchRecent = async () => {
    try {
      const response = await api.get('/generate/history');
      setContents(response.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch recent content', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Content</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : contents.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No content yet. Start creating!</div>
        ) : (
          contents.map((content) => (
            <div key={content.id} className="p-6 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{content.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {new Date(content.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-sm px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                      {content.type}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
