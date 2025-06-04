import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { StockPrediction } from '@/data/stocks';
import { formatCurrency } from '@/lib/utils';

interface StockChartProps {
  stockData: StockPrediction;
  showPrediction: boolean;
  onTogglePrediction: (show: boolean) => void;
  isStockDataLoading?: boolean;
}

export default function StockChart({ 
  stockData, 
  showPrediction, 
  onTogglePrediction,
  isStockDataLoading = false
}: StockChartProps) {
  // Prepare data for the chart
  const chartData = stockData?.actualData ? stockData.actualData.map((item, index) => {
    const predictionPoint = stockData?.predictedData?.[index - stockData?.actualData.length + stockData?.predictedData?.length];
    
    return {
      date: item["Date"],
      actual: item["Close"],
      predicted: predictionPoint ? predictionPoint["Close"] : null
    };
  }) : [];
  
  // Add prediction-only data points
  if (stockData?.predictedData?.length) {
    stockData.predictedData.slice(0).forEach(point => {
      if (!chartData.find(dataPoint => dataPoint.date === point["Date"])) {
        chartData.push({
          date: point["Date"],
          actual: 0,
          predicted: point["Close"]
        });
      }
    });
  }
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            entry.value !== null && (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entry.name === 'actual' ? 'Actual: ' : 'Predicted: '}
                {formatCurrency(entry.value)}
              </p>
            )
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
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
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  name="actual"
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1}
                  fill="url(#colorActual)" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                {showPrediction && (
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    name="predicted"
                    stroke="hsl(var(--success))" 
                    fillOpacity={0.5}
                    fill="url(#colorPredicted)" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Prediction Toggle */}
          <div className="mt-4 flex justify-end items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Actual Price</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">Predicted Price</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Show Prediction</span>
              <Checkbox 
                checked={showPrediction}
                onCheckedChange={(checked) => onTogglePrediction(checked as boolean)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
