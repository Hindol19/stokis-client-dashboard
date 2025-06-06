import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStockData as fetchStockDataFromBackend } from '@/lib/utilityFunctions';

interface StockDataCache {
  [ticker: string]: any;
}

interface StockDataCacheContextType {
  stockDataCache: StockDataCache;
  getStockData: (ticker: string) => Promise<any>;
  isLoading: boolean;
  cacheReady: boolean;
}

const StockDataCacheContext = createContext<StockDataCacheContextType | undefined>(undefined);

export const StockDataCacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stockDataCache, setStockDataCache] = useState<StockDataCache>({});
  const [isLoading, setIsLoading] = useState(false);
  const [cacheReady, setCacheReady] = useState(false);

  // Load cache from localStorage on mount (synchronously)
  useEffect(() => {
    const cache = localStorage.getItem('stockDataCache');
    if (cache) {
      setStockDataCache(JSON.parse(cache));
    }
    setCacheReady(true);
  }, []);

  // Save cache to localStorage whenever it changes
  useEffect(() => {
    if (cacheReady) {
      localStorage.setItem('stockDataCache', JSON.stringify(stockDataCache));
    }
  }, [stockDataCache, cacheReady]);

  // Get stock data, using cache if available
  const getStockData = useCallback(
    async (ticker: string) => {
      if (stockDataCache[ticker]) {
        return stockDataCache[ticker];
      }
      setIsLoading(true);
      const data = await fetchStockDataFromBackend(ticker, setIsLoading);
      setStockDataCache(prev => ({ ...prev, [ticker]: data }));
      setIsLoading(false);
      return data;
    },
    [stockDataCache]
  );

  return (
    <StockDataCacheContext.Provider value={{ stockDataCache, getStockData, isLoading, cacheReady }}>
      {children}
    </StockDataCacheContext.Provider>
  );
};

export function useStockDataCacheContext() {
  const context = useContext(StockDataCacheContext);
  if (!context) {
    throw new Error('useStockDataCacheContext must be used within a StockDataCacheProvider');
  }
  return context;
} 
 