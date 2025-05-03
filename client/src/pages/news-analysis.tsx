import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NewsFilter from '@/components/news/news-filter';
import NewsCard from '@/components/news/news-card';
import NewsImpactAnalysis from '@/components/news/news-impact-analysis';
import { getFilteredNews, NewsItem } from '@/data/news';

export default function NewsAnalysis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [impactFilter, setImpactFilter] = useState('');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  
  useEffect(() => {
    const filteredNews = getFilteredNews(searchTerm, companyFilter, impactFilter);
    setNewsItems(filteredNews);
  }, [searchTerm, companyFilter, impactFilter]);

  return (
    <div className="py-2">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">News Analysis</h1>
        <p className="text-muted-foreground">Stock market news and their impact on company performance</p>
      </motion.div>
      
      {/* News Filter */}
      <NewsFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        companyFilter={companyFilter}
        onCompanyFilterChange={setCompanyFilter}
        impactFilter={impactFilter}
        onImpactFilterChange={setImpactFilter}
      />
      
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {newsItems.map((news, index) => (
          <NewsCard key={news.id} news={news} index={index} />
        ))}
      </div>
      
      {/* Impact Analysis */}
      <NewsImpactAnalysis />
    </div>
  );
}
