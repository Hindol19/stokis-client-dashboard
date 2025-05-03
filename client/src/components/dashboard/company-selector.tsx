import React from 'react';
import { motion } from 'framer-motion';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Stock, stockList } from '@/data/stocks';

interface CompanySelectorProps {
  selectedTicker: string;
  onSelectTicker: (ticker: string) => void;
  onAnalyze: () => void;
}

export default function CompanySelector({ 
  selectedTicker, 
  onSelectTicker, 
  onAnalyze 
}: CompanySelectorProps) {
  return (
    <motion.div 
      className="mb-4 space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor="company-select" className="block text-sm font-medium text-gray-300">
        Select Company
      </label>
      <div className="flex space-x-2">
        <div className="relative flex-grow">
          <Select
            value={selectedTicker}
            onValueChange={onSelectTicker}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              {stockList.map((stock: Stock) => (
                <SelectItem key={stock.ticker} value={stock.ticker}>
                  {stock.companyName} ({stock.ticker})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={onAnalyze}
          className="bg-primary hover:bg-primary/90 transition-colors duration-200"
        >
          Analyze
        </Button>
      </div>
    </motion.div>
  );
}
