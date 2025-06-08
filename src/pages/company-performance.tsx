import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import CompanySelector from "@/components/company/company-selector";
import CompanyOverview from "@/components/company/company-overview";
import { keyMetrics, companyOverviews } from "@/data/companies";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";
import StockChart from "@/components/dashboard/stock-chart";
import TimeRangeSelector from "@/components/dashboard/time-range-selector";
import { useStockDataCache } from "@/hooks/useStockDataCache";
import { getCompanyInfo } from "@/lib/utilityFunctions";
import { HashLoader } from "react-spinners";

export default function CompanyPerformance() {
  const { getStockData, isLoading, cacheReady } = useStockDataCache();
  const [selectedTicker, setSelectedTicker] = useState("TATAMOTORS.NS");
  const [timeRange, setTimeRange] = useState("1w");
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [showPrediction, setShowPrediction] = useState(true);
  const [stockData, setStockData] = useState<any>(null);
  const [filteredStockData, setFilteredStockData] = useState<any>(null);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const companyMetrics = keyMetrics[selectedTicker];

  // Fetch stock data when ticker changes
  useEffect(() => {
    if (!cacheReady) return;
    const fetchStockData = async () => {
      const data = await getStockData(selectedTicker);
      setStockData(data);
    };
    fetchStockData();
  }, [selectedTicker, getStockData, cacheReady]);

  // useEffect(() => {
  //   const fetchCompanyInfo = async () => {
  //     console.log("Fetching company info for", selectedTicker);
  //     setIsInfoLoading(true);
  //     const data = await getCompanyInfo(selectedTicker);
  //     console.log("Company info fetched:", data);
  //     setCompanyInfo(data);
  //     setIsInfoLoading(false);
  //   };
  //   fetchCompanyInfo();
  // }, [selectedTicker, getCompanyInfo]);

  // Filter stock data based on selected time range
  useEffect(() => {
    if (!stockData) return;
    const filterDataByTimeRange = (data: any, range: string) => {
      // Sort data by date (newest to oldest)
      const sortedActual = [...data.actualData].sort(
        (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
      );
      const sortedPredicted = [...data.predictedData].sort(
        (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
      );
      let entriesCount = 0;
      switch (range) {
        case "1d":
          entriesCount = 1;
          break;
        case "1w":
          entriesCount = 7;
          break;
        case "1m":
          entriesCount = 30;
          break;
        case "3m":
          entriesCount = 90;
          break;
        case "6m":
          entriesCount = 180;
          break;
        case "1y":
          entriesCount = 365;
          break;
        case "5y":
          entriesCount = 365 * 5;
          break;
        case "all":
        default:
          entriesCount = sortedActual.length;
      }
      const filteredActual = sortedActual.slice(0, entriesCount).reverse();
      const filteredPredicted = sortedPredicted
        .slice(0, entriesCount)
        .reverse();
      return {
        actualData: filteredActual,
        predictedData: filteredPredicted,
      };
    };
    setFilteredStockData(filterDataByTimeRange(stockData, timeRange));
  }, [stockData, timeRange]);

  return (
    <div className="py-2">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Company Performance
        </h1>
        <p className="text-muted-foreground">
          Detailed analysis of individual company performance
        </p>
      </motion.div>

      {/* Company Selection & Overview */}
      <div className="bg-card rounded-lg shadow-lg p-5 mb-6 border border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="lg:col-span-2">
            <CompanySelector
              selectedTicker={selectedTicker}
              onSelectTicker={setSelectedTicker}
            />

            {stockData?.companyInfo && !isLoading ? (
              <CompanyOverview
                ticker={selectedTicker}
                companyInfo={stockData?.companyInfo}
              />
            ) : (
              <div className="flex items-center justify-center h-32">
                <HashLoader color="#c9c9c9" size={40} />
              </div>
            )}
          </div>

          {companyMetrics && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="bg-muted rounded-lg p-4 border border-border h-full">
                <CardContent className="p-0">
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    Key Metrics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="text-foreground font-mono">
                        {formatCompactNumber(companyMetrics.marketCap)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">P/E Ratio</span>
                      <span className="text-foreground font-mono">
                        {companyMetrics.peRatio.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Dividend Yield
                      </span>
                      <span className="text-foreground font-mono">
                        {companyMetrics.dividendYield}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        52-Week Range
                      </span>
                      <span className="text-foreground font-mono">
                        {formatCurrency(companyMetrics.weekRange52.low)} -{" "}
                        {formatCurrency(companyMetrics.weekRange52.high)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="text-foreground font-mono">
                        {formatCompactNumber(companyMetrics.volume)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Performance Charts */}
      <div className="mb-6">
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

      {/* Financial Data */}
      {/* <FinancialData ticker={selectedTicker} /> */}

      {/* Analyst Recommendations */}
      {/* <AnalystRecommendations ticker={selectedTicker} /> */}
    </div>
  );
}
