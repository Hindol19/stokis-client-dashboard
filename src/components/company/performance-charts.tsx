import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
// import { getStockData } from '@/lib/utilityFunctions';
import { getStockData } from '@/data/stocks';

interface PerformanceChartsProps {
  ticker: string;
}

export default function PerformanceCharts({ ticker }: PerformanceChartsProps) {
  // Generate dummy data for performance charts
  const stockData = getStockData(ticker);
  const priceHistoryData = stockData.actualData.map(item => ({
    date: item.Date,
    price: item.Close
  }));
  
  // Volume data (random)
  const volumeData = stockData.actualData.map(item => ({
    date: item.Date,
    volume: Math.floor(Math.random() * 50) + 20
  }));

  // Custom tooltip components
  const PriceTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-primary">
            Price: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const VolumeTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm" style={{ color: "hsl(var(--primary))" }}>
            Volume: {payload[0].value}M
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Price History Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle>Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={priceHistoryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `$${value}`}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip content={<PriceTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Volume Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle>Trading Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={volumeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `${value}M`}
                  />
                  <Tooltip content={<VolumeTooltip />} />
                  <Bar
                    dataKey="volume"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
