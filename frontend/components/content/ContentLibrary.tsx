'use client';

import { useState } from 'react';
import { Edit2, Trash2, Copy, Download } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContentLibraryProps {
  contents: any[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export function ContentLibrary({ contents, loading, onDelete }: ContentLibraryProps) {
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (contents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-600 text-lg">No content found. Start generating!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {contents.map((content) => (
        <div key={content.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
          <div className="flex items-start justify-between mb-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              {content.type}
            </span>
            <div className="flex gap-2">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(content.id)} className="p-1 text-gray-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{content.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">{content.content}</p>
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => handleCopy(content.content)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
