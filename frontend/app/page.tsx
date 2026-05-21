'use client';

import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ContentStats } from '@/components/dashboard/ContentStats';
import { RecentContent } from '@/components/dashboard/RecentContent';
import { QuickGenerators } from '@/components/dashboard/QuickGenerators';
import { api } from '@/lib/api';

export default function Home() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/analytics/dashboard');
        setAnalytics(response.data);
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-8">
      <DashboardHeader />
      
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <ContentStats analytics={analytics} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <RecentContent />
            </div>
            <QuickGenerators />
          </div>
        </>
      )}
    </div>
  );
}
