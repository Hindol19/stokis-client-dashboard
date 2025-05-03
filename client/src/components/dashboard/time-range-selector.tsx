import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface TimeRangeSelectorProps {
  selectedRange: string;
  onSelectRange: (range: string) => void;
}

export default function TimeRangeSelector({ 
  selectedRange, 
  onSelectRange 
}: TimeRangeSelectorProps) {
  const timeRanges = [
    { label: '1D', value: '1d' },
    { label: '1W', value: '1w' },
    { label: '1M', value: '1m' },
    { label: '3M', value: '3m' },
    { label: '6M', value: '6m' },
    { label: '1Y', value: '1y' },
    { label: '5Y', value: '5y' }
  ];

  return (
    <motion.div 
      className="flex space-x-2 mb-4 overflow-x-auto no-scrollbar"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {timeRanges.map((range) => (
        <Button
          key={range.value}
          onClick={() => onSelectRange(range.value)}
          className={selectedRange === range.value 
            ? 'bg-primary hover:bg-primary/90' 
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}
          size="sm"
        >
          {range.label}
        </Button>
      ))}
    </motion.div>
  );
}
