import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NewsItem } from '@/data/news';

interface NewsCardProps {
  news: NewsItem;
  index: number;
}

export default function NewsCard({ news, index }: NewsCardProps) {
  const getBadgeVariant = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      case 'neutral':
      default:
        return 'warning';
    }
  };
  
  const getBadgeText = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'Positive Impact';
      case 'negative':
        return 'Negative Impact';
      case 'neutral':
      default:
        return 'Neutral Impact';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-border transition-transform duration-300 hover:transform hover:scale-[1.02] h-full flex flex-col">
        <div className="h-48 overflow-hidden">
          <img className="w-full h-full object-cover" src={news.thumbnail || 'https://epss.ucla.edu/static/images/default-news.png'} alt={news.title} />
        </div>
        <CardContent className="p-5 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <Badge variant={getBadgeVariant(news.sentiment)}>
              {getBadgeText(news.sentiment)}
            </Badge>
            <span className="text-xs text-muted-foreground">{news.published_date}</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{news.title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{news.content}</p>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <Badge variant="outline" className="text-xs">
                {news.company}
              </Badge>
            </div>
            <Button asChild variant="link" className="text-primary hover:text-primary-foreground text-sm font-medium p-0">
              <a href={news.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
