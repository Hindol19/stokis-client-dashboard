export interface NewsItem {
  id: string;
  _id?: string;
  company: string;
  content: string;
  published_date: string;
  scrapped_at: string;
  sentiment: string;
  source: string;
  thumbnail: string | null;
  title: string;
  url: string;
}

export interface NewsImpact {
  company: string;
  positiveImpact: number;
  negativeImpact: number;
}

// The static newsItems array is now outdated and does not match the new NewsItem interface.
// It is commented out to resolve linter errors. Use fetched news data instead.
// export const newsItems: NewsItem[] = [ ... ];

export const newsImpactData: NewsImpact[] = [
  { company: 'AAPL', positiveImpact: 4.2, negativeImpact: -0.8 },
  { company: 'MSFT', positiveImpact: 2.1, negativeImpact: -0.5 },
  { company: 'GOOGL', positiveImpact: 1.8, negativeImpact: -1.2 },
  { company: 'AMZN', positiveImpact: 1.5, negativeImpact: -3.8 },
  { company: 'META', positiveImpact: 0.9, negativeImpact: -3.2 },
  { company: 'TSLA', positiveImpact: 3.6, negativeImpact: -1.4 }
];

export const newsImpactSummary = {
  positive: 42,
  negative: 28,
  neutral: 30
};

export const mostInfluentialNews = [
  { title: 'Apple Announces Record-Breaking Q4 Results', impact: 4.2 },
  { title: 'Meta Faces New Regulatory Challenges in EU', impact: -3.8 },
  { title: 'NVIDIA Announces Next-Generation GPU Architecture', impact: 2.7 }
];

export function getFilteredNews(
  news: NewsItem[],
  search: string = '',
  company: string = '',
  impact: string = ''
): NewsItem[] {
  return news.filter(item => {
    const matchesSearch = search === '' || 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      item.content.toLowerCase().includes(search.toLowerCase());
    const matchesCompany = company === '' || company === 'all_companies' || item.company === company;
    const matchesImpact = impact === '' || impact === 'all_impacts' || 
      (impact === 'positive' && item.sentiment === 'positive') ||
      (impact === 'negative' && item.sentiment === 'negative') ||
      (impact === 'neutral' && item.sentiment === 'neutral');
    return matchesSearch && matchesCompany && matchesImpact;
  });
}
