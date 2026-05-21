interface ContentFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const contentTypes = [
  { value: '', label: 'All Content' },
  { value: 'BLOG', label: 'Blog Posts' },
  { value: 'AD_COPY', label: 'Ad Copy' },
  { value: 'SOCIAL_MEDIA', label: 'Social Media' },
  { value: 'EMAIL', label: 'Emails' },
  { value: 'SEO_CONTENT', label: 'SEO Content' },
];

export function ContentFilters({ selectedType, onTypeChange }: ContentFiltersProps) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {contentTypes.map((type) => (
        <button
          key={type.value}
          onClick={() => onTypeChange(type.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedType === type.value
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-600'
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}
