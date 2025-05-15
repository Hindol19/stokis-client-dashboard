import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CompanySelector from '@/components/dashboard/company-selector';
import StockInfoSummary from '@/components/dashboard/stock-info-summary';
import TimeRangeSelector from '@/components/dashboard/time-range-selector';
import StockChart from '@/components/dashboard/stock-chart';
import TopGainersLosers from '@/components/dashboard/top-gainers-losers';
import RecentPredictions from '@/components/dashboard/recent-predictions';
import { getStockByTicker } from '@/data/stocks';
import { getStockData } from '@/lib/utilityFunctions';
import { Stock } from '@/data/stocks';

export default function Dashboard() {
  const [selectedTicker, setSelectedTicker] = useState('TATAMOTORS.NS');
  const [timeRange, setTimeRange] = useState('1m');
  const [showPrediction, setShowPrediction] = useState(true);
  const [stockData, setStockData] = useState<any>(null);
  const [filteredStockData, setFilteredStockData] = useState<any>(null);
  const [isStockDataLoading, setIsStockDataLoading] = useState(false);
  const [calculatedStockInfo, setCalculatedStockInfo] = useState<Stock | null>(null);
  // const stock = getStockByTicker(selectedTicker);
  
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setIsStockDataLoading(true);
        const data = await getStockData(selectedTicker, setIsStockDataLoading);
        if (data) {
          setStockData(data);
        } else {
          console.error("Failed to fetch stock data");
        }
      } catch (error) {
        console.error("Error in fetchStockData:", error);
      } finally {
        setIsStockDataLoading(false);
      }
    };
    fetchStockData();
  }, [selectedTicker]);

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
      const now = new Date();
      let filterDate = new Date();
      
      switch (range) {
        case '1d': 
          filterDate.setDate(now.getDate() - 1);
          break;
        case '1w':
          filterDate.setDate(now.getDate() - 7);
          break;
        case '1m':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case '3m':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case '6m':
          filterDate.setMonth(now.getMonth() - 6);
          break;
        case '1y':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        case '5y':
          filterDate.setFullYear(now.getFullYear() - 5);
          break;
        case 'all':
        default:
          filterDate = new Date(0); // Beginning of time
      }
      
      const filterTime = filterDate.getTime();
      console.log('Filter date:', filterDate.toISOString(), 'Filter timestamp:', filterTime);
      
      const filteredActual = data.actualData.filter((item: any) => {
        const itemDate = new Date(item.Date).getTime();
        return itemDate >= filterTime;
      });
      
      const filteredPredicted = data.predictedData.filter((item: any) => {
        const itemDate = new Date(item.Date).getTime();
        return itemDate >= filterTime;
      });
      
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
        
        {calculatedStockInfo && <StockInfoSummary stock={calculatedStockInfo} />}
        
        <TimeRangeSelector 
          selectedRange={timeRange}
          onSelectRange={setTimeRange}
        />
        
        {isStockDataLoading ? (
          <div className="h-[350px] w-full flex items-center justify-center">
            <p className="text-muted-foreground">Loading stock data...</p>
          </div>
        ) : (
          <StockChart 
            stockData={filteredStockData || stockData}
            // stockData={ stockData}
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
