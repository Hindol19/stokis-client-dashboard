import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NewsFilter from "@/components/news/news-filter";
import NewsCard from "@/components/news/news-card";
import NewsImpactAnalysis from "@/components/news/news-impact-analysis";
import { getFilteredNews, NewsItem } from "@/data/news";
import { getNews } from "@/lib/utilityFunctions";
import { HashLoader } from "react-spinners";

export default function NewsAnalysis() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all_companies");
  const [impactFilter, setImpactFilter] = useState("all_impacts");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const news = await getNews();
      setNews(news.data);
      setIsLoading(false);
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const filteredNews = getFilteredNews(
      news,
      searchTerm,
      companyFilter,
      impactFilter
    );
    console.log(searchTerm, companyFilter, impactFilter, filteredNews);
    setNewsItems(filteredNews);
  }, [news, searchTerm, companyFilter, impactFilter]);

  return (
    <div className="py-2">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          News Analysis
        </h1>
        <p className="text-muted-foreground">
          Stock market news and their impact on company performance
        </p>
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
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <HashLoader color="#fff" size={50} />
        </div>
      ) : (
        <>
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {newsItems.map((news, index) => (
              <NewsCard
                key={`${news.id}-${news.company}`}
                news={news}
                index={index}
              />
            ))}
          </div>
        </>
      )}
      {/* Impact Analysis */}
      {/* <NewsImpactAnalysis /> */}
    </div>
  );
}
