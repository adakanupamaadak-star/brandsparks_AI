'use client';

import { useState } from 'react';

export default function AIContentStudio() {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('Professional');
  const [contentType, setContentType] = useState('Blog');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [requirements, setRequirements] = useState('');
  const [generated, setGenerated] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          industry,
          audience,
          tone,
          contentType,
          topic,
          keywords,
          requirements,
        }),
      });
      const data = await response.json();
      setGenerated(data.content || 'Error generating content');
    } catch (error) {
      setGenerated('Failed to generate content. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            AI Creative Content Studio
          </h1>

          <p className="text-center text-gray-600 mb-8 text-lg">
            AI-Powered Content Generation System Using Prompt Engineering
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Brand Details</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Brand Name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full border rounded-xl p-3"
                />

                <input
                  type="text"
                  placeholder="Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full border rounded-xl p-3"
                />

                <input
                  type="text"
                  placeholder="Target Audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full border rounded-xl p-3"
                />

                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full border rounded-xl p-3"
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Luxury</option>
                  <option>Motivational</option>
                  <option>Conversational</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Content Settings</h2>

              <div className="space-y-4">
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full border rounded-xl p-3"
                >
                  <option>Blog</option>
                  <option>Instagram Caption</option>
                  <option>LinkedIn Post</option>
                  <option>Email Marketing</option>
                  <option>Ad Copy</option>
                </select>

                <input
                  type="text"
                  placeholder="Topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full border rounded-xl p-3"
                />

                <input
                  type="text"
                  placeholder="SEO Keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full border rounded-xl p-3"
                />

                <textarea
                  placeholder="Describe your content requirement"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full border rounded-xl p-3 h-28"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-black text-white px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate AI Content'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
          <h2 className="text-3xl font-bold mb-6">Generated Content</h2>

          <div className="bg-gray-50 rounded-2xl p-6 min-h-[250px] border">
            <p className="text-gray-700 leading-8 whitespace-pre-wrap">
              {generated || 'Your AI-generated content will appear here.'}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-3">Brand Voice</h3>
            <p className="text-gray-600">
              Maintains consistent tone and writing style across all platforms.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-3">SEO Optimization</h3>
            <p className="text-gray-600">
              Automatically optimizes content for better search engine ranking.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-3">Multi Platform</h3>
            <p className="text-gray-600">
              Generates blogs, ads, captions, and email campaigns instantly.
            </p>
          </div>
        </div>

        <div className="text-center mt-10 text-gray-500">
          <p>Created using Prompt Engineering & AI Automation</p>
        </div>
      </div>
    </div>
  );
}
