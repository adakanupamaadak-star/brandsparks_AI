'use client';

import { useState, useEffect } from 'react';
import { BrandSetupForm } from '@/components/brand/BrandSetupForm';
import { BrandPreview } from '@/components/brand/BrandPreview';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function BrandPage() {
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleSaveBrand = async (data: any) => {
    setSaving(true);
    try {
      const response = await api.post('/brand', data);
      setBrand(response.data);
      toast.success('Brand profile saved successfully!');
    } catch (error) {
      toast.error('Failed to save brand profile');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Profile</h1>
        <p className="text-gray-600">Define your brand voice and guidelines for consistent content generation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BrandSetupForm initialData={brand} onSave={handleSaveBrand} saving={saving} />
        </div>
        <div className="lg:col-span-1">
          <BrandPreview brand={brand} />
        </div>
      </div>
    </div>
  );
}
