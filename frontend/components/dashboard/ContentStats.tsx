import { BarChart3, FileText, Sparkles, TrendingUp } from 'lucide-react';

interface ContentStatsProps {
  analytics: any;
}

export function ContentStats({ analytics }: ContentStatsProps) {
  const stats = [
    {
      label: 'Total Content',
      value: analytics?.totalContent || 0,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      label: 'This Month',
      value: analytics?.thisMonth || 0,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      label: 'Blog Posts',
      value: analytics?.typeBreakdown?.BLOG || 0,
      icon: Sparkles,
      color: 'bg-purple-500',
    },
    {
      label: 'Social Posts',
      value: analytics?.typeBreakdown?.SOCIAL_MEDIA || 0,
      icon: BarChart3,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
