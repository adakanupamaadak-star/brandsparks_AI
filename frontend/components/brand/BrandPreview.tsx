export function BrandPreview({ brand }: { brand: any }) {
  if (!brand) {
    return (
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Brand Preview</h3>
        <p className="text-indigo-100">Fill in the form to see your brand preview here</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow p-8 text-white space-y-6">
      <div>
        <h3 className="text-3xl font-bold">{brand.name || 'Your Brand'}</h3>
        <p className="text-indigo-100 mt-2">{brand.description || 'Brand description'}</p>
      </div>

      <div>
        <p className="text-indigo-100 text-sm font-medium mb-1">TONE & VOICE</p>
        <p className="text-lg font-semibold">{{tone: brand.voiceProfile?.tone}}</p>
      </div>

      <div>
        <p className="text-indigo-100 text-sm font-medium mb-2">KEY WORDS</p>
        <div className="flex flex-wrap gap-2">
          {brand.keywords?.length ? (
            brand.keywords.map((kw: string) => (
              <span key={kw} className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                {kw}
              </span>
            ))
          ) : (
            <p className="text-indigo-200 text-sm">No keywords set</p>
          )}
        </div>
      </div>
    </div>
  );
}
