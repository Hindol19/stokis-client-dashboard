import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { stockList } from '@/data/stocks';

interface NewsFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  companyFilter: string;
  onCompanyFilterChange: (value: string) => void;
  impactFilter: string;
  onImpactFilterChange: (value: string) => void;
}

export default function NewsFilter({
  searchTerm,
  onSearchChange,
  companyFilter,
  onCompanyFilterChange,
  impactFilter,
  onImpactFilterChange
}: NewsFilterProps) {
  return (
    <motion.div 
      className="mb-6 flex flex-wrap items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex-grow max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        <Input
          type="search"
          id="news-search"
          className="pl-10"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex-shrink-0 w-40">
        <Select
          value={companyFilter}
          onValueChange={onCompanyFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Companies</SelectItem>
            {stockList.map((stock) => (
              <SelectItem key={stock.ticker} value={stock.ticker}>
                {stock.companyName} ({stock.ticker})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-shrink-0 w-40">
        <Select
          value={impactFilter}
          onValueChange={onImpactFilterChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by impact" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Impacts</SelectItem>
            <SelectItem value="positive">Positive Impact</SelectItem>
            <SelectItem value="negative">Negative Impact</SelectItem>
            <SelectItem value="neutral">Neutral Impact</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}
