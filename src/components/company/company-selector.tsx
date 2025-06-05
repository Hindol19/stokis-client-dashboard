import React from 'react';
import { motion } from 'framer-motion';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Stock, stockList } from '@/data/stocks';

interface CompanySelectorProps {
  selectedTicker: string;
  onSelectTicker: (ticker: string) => void;
}

export default function CompanySelector({ 
  selectedTicker, 
  onSelectTicker 
}: CompanySelectorProps) {
  return (
    <motion.div 
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Label htmlFor="company-performance-select" className="block text-sm font-medium text-gray-300 mb-2">
        Select Company
      </Label>
      <div className="relative">
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
    </motion.div>
  );
}
