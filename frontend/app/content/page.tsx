'use client';

import { useState, useEffect } from 'react';
import { ContentLibrary } from '@/components/content/ContentLibrary';
import { ContentFilters } from '@/components/content/ContentFilters';
import { api } from '@/lib/api';

export default function ContentPage() {
  const [contents, setContents] = useState<any[]>([]);
  const [filteredContents, setFilteredContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    fetchContents();
  }, []);

  useEffect(() => {
    if (selectedType) {
      setFilteredContents(contents.filter((c) => c.type === selectedType));
    } else {
      setFilteredContents(contents);
    }
  }, [selectedType, contents]);

  const fetchContents = async () => {
    try {
      const response = await api.get('/content');
      setContents(response.data);
    } catch (error) {
      console.error('Failed to fetch content', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/content/${id}`);
      setContents(contents.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Failed to delete content', error);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Library</h1>
        <p className="text-gray-600">View, edit, and manage all your generated content</p>
      </div>

      <ContentFilters selectedType={selectedType} onTypeChange={setSelectedType} />
      <ContentLibrary contents={filteredContents} loading={loading} onDelete={handleDelete} />
    </div>
  );
}
