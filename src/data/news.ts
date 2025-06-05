export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  impact: 'positive' | 'negative' | 'neutral';
  ticker: string;
  companyName: string;
}

export interface NewsImpact {
  company: string;
  positiveImpact: number;
  negativeImpact: number;
}

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Apple Announces Record-Breaking Q4 Results',
    content: 'Apple Inc. reported record-breaking revenue for Q4 2022, exceeding analyst expectations. The company saw increased sales across all product categories, with particularly strong growth in services.',
    date: '2 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    impact: 'positive',
    ticker: 'AAPL',
    companyName: 'Apple Inc.'
  },
  {
    id: '2',
    title: 'Meta Faces New Regulatory Challenges in EU',
    content: 'Meta Platforms is facing new data privacy regulations in the European Union that could impact its advertising business. Analysts predict potential revenue impacts in the coming quarters.',
    date: '5 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    impact: 'negative',
    ticker: 'META',
    companyName: 'Meta Platforms Inc.'
  },
  {
    id: '3',
    title: 'Microsoft Reorganizes Cloud Computing Division',
    content: 'Microsoft announced a restructuring of its cloud computing division. The move is aimed at streamlining operations but is not expected to significantly impact near-term financial results.',
    date: '1 day ago',
    imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    impact: 'neutral',
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation'
  },
  {
    id: '4',
    title: 'Tesla Exceeds Production Targets in China Factory',
    content: 'Tesla\'s Shanghai Gigafactory exceeded production targets for the quarter, signaling strong demand in the Chinese market despite economic concerns. Analysts have raised price targets.',
    date: '3 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    impact: 'positive',
    ticker: 'TSLA',
    companyName: 'Tesla Inc.'
  },
  {
    id: '5',
    title: 'Amazon Faces Warehouse Worker Strike in Key Markets',
    content: 'Amazon warehouse workers in several key markets have announced plans to strike during the upcoming holiday season, potentially disrupting shipping operations during peak season.',
    date: '1 week ago',
    imageUrl: 'https://images.unsplash.com/photo-1468254095679-bbcba94a7066?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    impact: 'negative',
    ticker: 'AMZN',
    companyName: 'Amazon.com Inc.'
  },
  {
    id: '6',
    title: 'NVIDIA Announces Next-Generation GPU Architecture',
    content: 'NVIDIA revealed its next-generation GPU architecture that promises significant performance improvements for AI applications. Industry experts believe this could accelerate NVIDIA\'s market dominance.',
    date: '2 weeks ago',
    imageUrl: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=500&q=80',
    impact: 'positive',
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation'
  }
];

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
  search: string = '',
  company: string = '',
  impact: string = ''
): NewsItem[] {
  return newsItems.filter(item => {
    const matchesSearch = search === '' || 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      item.content.toLowerCase().includes(search.toLowerCase());
    
    const matchesCompany = company === '' || company === 'all_companies' || item.ticker === company;
    
    const matchesImpact = impact === '' || impact === 'all_impacts' || 
      (impact === 'positive' && item.impact === 'positive') ||
      (impact === 'negative' && item.impact === 'negative') ||
      (impact === 'neutral' && item.impact === 'neutral');
    
    return matchesSearch && matchesCompany && matchesImpact;
  });
}
