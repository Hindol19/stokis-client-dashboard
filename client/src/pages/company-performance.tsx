import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import CompanySelector from '@/components/company/company-selector';
import CompanyOverview from '@/components/company/company-overview';
import PerformanceCharts from '@/components/company/performance-charts';
import FinancialData from '@/components/company/financial-data';
import AnalystRecommendations from '@/components/company/analyst-recommendations';
import { keyMetrics, companyOverviews } from '@/data/companies';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';

export default function CompanyPerformance() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  
  const companyMetrics = keyMetrics[selectedTicker];
  
  return (
    <div className="py-2">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">Company Performance</h1>
        <p className="text-muted-foreground">Detailed analysis of individual company performance</p>
      </motion.div>
      
      {/* Company Selection & Overview */}
      <div className="bg-card rounded-lg shadow-lg p-5 mb-6 border border-border">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <CompanySelector 
              selectedTicker={selectedTicker}
              onSelectTicker={setSelectedTicker}
            />
            
            <CompanyOverview ticker={selectedTicker} />
          </div>
          
          {companyMetrics && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="bg-muted rounded-lg p-4 border border-border h-full">
                <CardContent className="p-0">
                  <h3 className="text-lg font-medium text-foreground mb-3">Key Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="text-foreground font-mono">{formatCompactNumber(companyMetrics.marketCap)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">P/E Ratio</span>
                      <span className="text-foreground font-mono">{companyMetrics.peRatio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dividend Yield</span>
                      <span className="text-foreground font-mono">{companyMetrics.dividendYield}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">52-Week Range</span>
                      <span className="text-foreground font-mono">
                        {formatCurrency(companyMetrics.weekRange52.low)} - {formatCurrency(companyMetrics.weekRange52.high)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="text-foreground font-mono">{formatCompactNumber(companyMetrics.volume)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Performance Charts */}
      <PerformanceCharts ticker={selectedTicker} />
      
      {/* Financial Data */}
      <FinancialData ticker={selectedTicker} />
      
      {/* Analyst Recommendations */}
      <AnalystRecommendations ticker={selectedTicker} />
    </div>
  );
}
