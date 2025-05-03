import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CompanySelector from '@/components/dashboard/company-selector';
import StockInfoSummary from '@/components/dashboard/stock-info-summary';
import TimeRangeSelector from '@/components/dashboard/time-range-selector';
import StockChart from '@/components/dashboard/stock-chart';
import TopGainersLosers from '@/components/dashboard/top-gainers-losers';
import RecentPredictions from '@/components/dashboard/recent-predictions';
import { getStockByTicker, getStockData } from '@/data/stocks';

export default function Dashboard() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const [timeRange, setTimeRange] = useState('1d');
  const [showPrediction, setShowPrediction] = useState(true);
  
  const stock = getStockByTicker(selectedTicker);
  const stockData = getStockData(selectedTicker);
  
  const handleAnalyze = () => {
    // In a real app, this would fetch new data based on the selected ticker
    console.log(`Analyzing ${selectedTicker}...`);
  };

  return (
    <div className="py-2">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Track and predict stock performance</p>
      </motion.div>
      
      {/* Company Selector and Chart */}
      <div className="bg-card rounded-lg shadow-lg p-5 mb-6 border border-border">
        <CompanySelector 
          selectedTicker={selectedTicker}
          onSelectTicker={setSelectedTicker}
          onAnalyze={handleAnalyze}
        />
        
        {stock && <StockInfoSummary stock={stock} />}
        
        <TimeRangeSelector 
          selectedRange={timeRange}
          onSelectRange={setTimeRange}
        />
        
        <StockChart 
          stockData={stockData}
          showPrediction={showPrediction}
          onTogglePrediction={setShowPrediction}
        />
      </div>
      
      {/* Gainers and Losers */}
      <TopGainersLosers />
      
      {/* Recent Predictions */}
      <RecentPredictions />
    </div>
  );
}
