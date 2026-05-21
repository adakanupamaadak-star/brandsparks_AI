interface SEOAnalysisInput {
  title: string;
  content: string;
  keywords: string[];
}

export const calculateSEOScore = (input: SEOAnalysisInput): { score: number; recommendations: string[] } => {
  let score = 0;
  const recommendations: string[] = [];

  const { title, content, keywords } = input;

  // Title optimization (max 20 points)
  if (title.length >= 30 && title.length <= 60) score += 10;
  if (keywords.some((k) => title.toLowerCase().includes(k.toLowerCase()))) score += 10;

  // Content length (max 15 points)
  const wordCount = content.split(/\s+/).length;
  if (wordCount >= 300) score += 15;
  else if (wordCount >= 200) score += 10;

  // Keyword usage (max 25 points)
  const keywordCount = keywords.filter((k) =>
    content.toLowerCase().includes(k.toLowerCase())
  ).length;

  if (keywordCount >= keywords.length) score += 25;
  else if (keywordCount >= keywords.length * 0.8) score += 20;
  else if (keywordCount > 0) score += 15;
  else recommendations.push('Include target keywords in content');

  // Headings (max 15 points)
  const headingCount = (content.match(/#+\s/g) || []).length;
  if (headingCount >= 3) score += 15;
  else if (headingCount >= 2) score += 10;
  else recommendations.push('Add more headings to structure content');

  // Meta description (max 15 points)
  if (content.length >= 150) score += 15;
  else recommendations.push('Ensure comprehensive content for meta description');

  // Readability (max 10 points)
  const paragraphs = content.split('\n').filter((p) => p.trim());
  if (paragraphs.length >= 5) score += 10;
  else recommendations.push('Break content into more paragraphs for readability');

  if (score < 50) recommendations.push('Consider expanding content and improving keyword optimization');

  return {
    score: Math.min(score, 100),
    recommendations,
  };
};
