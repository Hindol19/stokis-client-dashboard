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

  // ---------- Helper utilities ----------
  /**
   * Check if a thrown error is related to exceeding the browser storage quota.
   */
  const isQuotaExceededError = (error: unknown): boolean => {
    if (!error || typeof error !== "object") return false;
    const e = error as DOMException;
    // Different browsers set different codes & names for this error
    return (
      e instanceof DOMException &&
      (e.code === 22 || // Chrome, Firefox
        e.code === 1014 || // Firefox
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED")
    );
  };

  /**
   * Keep the cache size under control by limiting the number of tickers stored.
   * Oldest tickers (based on insertion order) are removed first.
   */
  const pruneCache = (cache: StockDataCache, maxEntries = 10): StockDataCache => {
    const tickers = Object.keys(cache);
    if (tickers.length <= maxEntries) return cache;

    // Calculate how many oldest entries to drop
    const excessCount = tickers.length - maxEntries;
    const prunedCache: StockDataCache = {};

    tickers.slice(excessCount).forEach((ticker) => {
      prunedCache[ticker] = cache[ticker];
    });

    return prunedCache;
  };

  // Get stock data, using cache if available
  const getStockData = useCallback(
    async (ticker: string) => {
      if (stockDataCache[ticker]) {
        return stockDataCache[ticker];
      }
      setIsLoading(true);
      const rawData = await fetchStockDataFromBackend(ticker, setIsLoading);
      // Keep only the most recent 365 data points to reduce storage footprint
      const trimmedData = {
        ...rawData,
        actualData: Array.isArray(rawData?.actualData)
          ? rawData.actualData.slice(-365)
          : rawData?.actualData ?? [],
      };

      if (Array.isArray(trimmedData.actualData) && trimmedData.actualData.length > 0) {
        setStockDataCache(prev => pruneCache({ ...prev, [ticker]: trimmedData }));
      }
      setIsLoading(false);
      return trimmedData;
    },
    [stockDataCache]
  );

  // Save cache to localStorage whenever it changes, handling quota limits gracefully
  useEffect(() => {
    if (!cacheReady) return;

    const cacheToPersist = pruneCache(stockDataCache);

    try {
      localStorage.setItem('stockDataCache', JSON.stringify(cacheToPersist));
    } catch (error) {
      if (isQuotaExceededError(error)) {
        console.warn('LocalStorage quota exceeded while saving stockDataCache. Clearing old cache and retrying.');
        // Attempt to clear the existing cache entry and store the pruned cache again
        try {
          localStorage.removeItem('stockDataCache');
          localStorage.setItem('stockDataCache', JSON.stringify(cacheToPersist));
        } catch (innerError) {
          console.error('Failed to recover from quota exceeded error:', innerError);
        }
      } else {
        console.error('Error while saving stockDataCache to localStorage:', error);
      }
    }
  }, [stockDataCache, cacheReady]);

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
 