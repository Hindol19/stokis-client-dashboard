import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CompanySelector from '@/components/dashboard/company-selector';
import StockInfoSummary from '@/components/dashboard/stock-info-summary';
import TimeRangeSelector from '@/components/dashboard/time-range-selector';
import StockChart from '@/components/dashboard/stock-chart';
import TopGainersLosers from '@/components/dashboard/top-gainers-losers';
import RecentPredictions from '@/components/dashboard/recent-predictions';
import { getStockByTicker } from '@/data/stocks';
import { HashLoader } from 'react-spinners';
import { getStockData } from '@/lib/utilityFunctions';
import { Stock } from '@/data/stocks';
import { useStockDataCache } from '@/hooks/useStockDataCache';

export default function Dashboard() {
  const { getStockData, isLoading, cacheReady } = useStockDataCache();
  const [selectedTicker, setSelectedTicker] = useState('TATAMOTORS.NS');
  const [timeRange, setTimeRange] = useState('1w');
  const [showPrediction, setShowPrediction] = useState(true);
  const [stockData, setStockData] = useState<any>(null);
  const [filteredStockData, setFilteredStockData] = useState<any>(null);
  const [calculatedStockInfo, setCalculatedStockInfo] = useState<Stock | null>(null);

  useEffect(() => {
    if (!cacheReady) return;
    const fetchStockData = async () => {
      try {
        const data = await getStockData(selectedTicker);
        if (data) {
          setStockData(data);
        } else {
          console.error("Failed to fetch stock data");
        }
      } catch (error) {
        console.error("Error in fetchStockData:", error);
      }
    };
    fetchStockData();
  }, [selectedTicker, getStockData, cacheReady]);

  // Calculate stock info metrics from API data
  useEffect(() => {
    if (!stockData?.actualData?.length) return;
    
    const actualData = stockData.actualData;
    console.log('Calculating stock metrics from API data');
    
    // Sort data by date to ensure correct calculations
    const sortedData = [...actualData].sort((a, b) => 
      new Date(a.Date).getTime() - new Date(b.Date).getTime()
    );
    
    // Get current price (latest close price)
    const currentPrice = sortedData[sortedData.length - 1].Close;
    
    // Calculate previous close for change calculation
    const previousClose = sortedData.length > 1 ? sortedData[sortedData.length - 2].Close : currentPrice;
    
    // Calculate price change
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;
    
    // Calculate 52-week high and low
    // Get data from the past year
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const yearData = sortedData.filter(item => new Date(item.Date) >= oneYearAgo);
    
    let high52Week = -Infinity;
    let low52Week = Infinity;
    
    if (yearData.length > 0) {
      yearData.forEach(item => {
        high52Week = Math.max(high52Week, item.Close);
        low52Week = Math.min(low52Week, item.Close);
      });
    } else {
      // If no full year of data, use all available data
      sortedData.forEach(item => {
        high52Week = Math.max(high52Week, item.Close);
        low52Week = Math.min(low52Week, item.Close);
      });
    }
    
    // Create calculated stock info
    const apiStockInfo: Stock = {
      ticker: selectedTicker,
      companyName: selectedTicker || "",
      currentPrice: currentPrice,
      change: change,
      changePercent: parseFloat(changePercent.toFixed(2)),
      // marketCap: stock?.marketCap || 0, // Using static data for marketCap
      high52Week: high52Week,
      low52Week: low52Week,
      // volume: stock?.volume || 0,  // Using static data for volume
      // avgVolume: stock?.avgVolume || 0  // Using static data for avgVolume
    };
    
    console.log('Calculated stock info:', apiStockInfo);
    setCalculatedStockInfo(apiStockInfo);
    
  }, [stockData, selectedTicker]);

  // Filter stock data based on selected time range
  useEffect(() => {
    if (!stockData) return;
    
    console.log('Starting filtering process with timeRange:', timeRange, 'and stockData:', stockData);
    console.log('Original data:', {
      actualDataPoints: stockData?.actualData?.length || 0,
      predictedDataPoints: stockData.predictedData?.length || 0
    });
    
    const filterDataByTimeRange = (data: any, range: string) => {
      // Sort data by date (newest to oldest) to ensure we get the most recent entries
      const sortedActual = [...data.actualData].sort((a, b) => 
        new Date(b.Date).getTime() - new Date(a.Date).getTime()
      );
      
      const sortedPredicted = [...data.predictedData].sort((a, b) => 
        new Date(b.Date).getTime() - new Date(a.Date).getTime()
      );
      console.log('Sorted actual data:', sortedActual);
      
      let entriesCount = 0;
      
      // Determine how many entries to show based on the time range
      switch (range) {
        case '1d':
          entriesCount = 1; // Just the latest entry
          break;
        case '1w':
          entriesCount = 7; // Last 7 entries
          break;
        case '1m':
          entriesCount = 30; // Last 30 entries
          break;
        case '3m':
          entriesCount = 90; // Last 90 entries
          break;
        case '6m':
          entriesCount = 180; // Last 180 entries
          break;
        case '1y':
          entriesCount = 365; // Last 365 entries
          break;
        case '5y':
          entriesCount = 365 * 5; // Last 5 years of entries
          break;
        case 'all':
        default:
          entriesCount = sortedActual.length; // All available entries
      }
      
      console.log(`Showing the latest ${entriesCount} entries for ${range} time range`);
      
      // Take the specified number of entries and then reverse to maintain chronological order
      const filteredActual = sortedActual.slice(0, entriesCount).reverse();
      const filteredPredicted = sortedPredicted.slice(0, entriesCount).reverse();
      
      console.log('Filtered results:', {
        originalActualCount: data.actualData.length,
        filteredActualCount: filteredActual.length,
        originalPredictedCount: data.predictedData.length,
        filteredPredictedCount: filteredPredicted.length
      });
      
      if (filteredActual.length > 0) {
        console.log('First filtered actual date:', filteredActual[0].Date);
        console.log('Last filtered actual date:', filteredActual[filteredActual.length - 1].Date);
      }
      
      return {
        actualData: filteredActual,
        predictedData: filteredPredicted,
      };
    };
    
    const filtered = filterDataByTimeRange(stockData, timeRange);
    setFilteredStockData(filtered);
    console.log('Filtering complete. Updated filteredStockData.', filtered);
  }, [stockData, timeRange]);
  
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
        
        {calculatedStockInfo && !isLoading && <StockInfoSummary stock={calculatedStockInfo} />}
        
        <TimeRangeSelector 
          selectedRange={timeRange}
          onSelectRange={setTimeRange}
        />
        
        {isLoading ? (
          <div className="h-[350px] w-full flex items-center justify-center">
            <HashLoader color="#c9c9c9" size={50} />
          </div>
        ) : (
          <StockChart 
            stockData={filteredStockData || stockData}
            isStockDataLoading={isLoading}
            showPrediction={showPrediction}
            onTogglePrediction={setShowPrediction}
          />
        )}
      </div>
      
      {/* Gainers and Losers */}
      <TopGainersLosers />
      
      {/* Recent Predictions */}
      <RecentPredictions />
    </div>
  );
}
