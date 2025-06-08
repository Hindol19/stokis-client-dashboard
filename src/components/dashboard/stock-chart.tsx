import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { StockPrediction } from "@/data/stocks";
import { formatCurrency } from "@/lib/utils";
import {
  Chart,
  ChartCanvas,
  CandlestickSeries,
  XAxis as FinancialXAxis,
  YAxis as FinancialYAxis,
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  discontinuousTimeScaleProvider,
  last,
  withDeviceRatio,
} from "react-financial-charts";

interface StockChartProps {
  stockData: StockPrediction;
  showPrediction: boolean;
  onTogglePrediction: (show: boolean) => void;
  isStockDataLoading?: boolean;
  chartType?: "line" | "candlestick";
}

export default function StockChart({
  stockData,
  showPrediction,
  onTogglePrediction,
  isStockDataLoading = false,
  chartType = "line",
}: StockChartProps) {
  // Prepare data for the chart
  let chartData: {
    date: string;
    actual: number | null;
    predicted: number | null;
  }[] = [];

  if (stockData?.actualData?.length) {
    chartData = stockData.actualData.map((item) => ({
      date: item["Date"],
      actual: item["Close"],
      predicted: null,
    }));
  }
  // Merge prediction points with existing dates (to avoid a gap) or append new ones
  if (stockData?.predictedData?.length) {
    stockData.predictedData.forEach((point) => {
      const existing = chartData.find((d) => d.date === point["Date"]);
      if (existing) {
        // If the date already exists (e.g. last actual day), just attach the prediction
        existing.predicted = point["Close"];
      } else {
        chartData.push({
          date: point["Date"],
          actual: null,
          predicted: point["Close"],
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
          {payload.map(
            (entry: any, index: number) =>
              entry.value !== null && (
                <p
                  key={index}
                  className="text-sm"
                  style={{ color: entry.color }}
                >
                  {entry.name === "actual" ? "Actual: " : "Predicted: "}
                  {formatCurrency(entry.value)}
                </p>
              )
          )}
        </div>
      );
    }
    return null;
  };

  if (chartType === "candlestick") {
    // Prepare candlestick data: expects [{ date, open, high, low, close }]
    const candleData =
      stockData?.actualData?.map((item: any) => ({
        date: new Date(item.Date),
        open: item.Open,
        high: item.High,
        low: item.Low,
        close: item.Close,
      })) || [];

    // Setup scale provider
    const scaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d: any) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } =
      scaleProvider(candleData);
    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 50)]);
    const xExtents = [end, start];

    return (
      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <div className="h-[350px] w-full">
            <div style={{ width: "100%", height: "100%" }}>
              <ChartCanvas
                height={350}
                width={window.innerWidth - 380}
                ratio={window.devicePixelRatio || 1}
                margin={{ left: 50, right: 60, top: 10, bottom: 30 }}
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
                seriesName="CandlestickSeries"
                xExtents={xExtents}
              >
                <Chart id={1} yExtents={(d: any) => [d.high, d.low]}>
                  <FinancialXAxis showGridLines tickLabelFill="#ffffff" />
                  <FinancialYAxis
                    showGridLines
                    tickLabelFill="#ffffff"
                    tickFormat={(value) => `₹${value}`}
                    orient="right"
                  />
                  <CandlestickSeries
                    stroke={(d) => (d.close > d.open ? "#16a34a" : "#dc2626")}
                    wickStroke={(d) =>
                      d.close > d.open ? "#16a34a" : "#dc2626"
                    }
                    fill={(d) => (d.close > d.open ? "#16a34a" : "#dc2626")}
                  />
                  <MouseCoordinateX
                    displayFormat={(d: Date) => d.toLocaleDateString()}
                    fill="hsl(var(--muted-foreground))"
                    fontFamily="inherit"
                  />
                  <MouseCoordinateY
                    displayFormat={(d: number) => `₹${d.toFixed(2)}`}
                    fill="hsl(var(--muted-foreground))"
                    fontFamily="inherit"
                  />
                </Chart>
                <CrossHairCursor />
              </ChartCanvas>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient
                    id="colorPredicted"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--success))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--success))"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255, 255, 255, 0.1)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
                  axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `₹${value}`}
                  domain={["auto", "auto"]}
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
                    stroke={stockData?.predictionColor}
                    fillOpacity={0.5}
                    fill={stockData?.predictionColor}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Prediction Toggle */}
          <div className="mt-4 flex justify-between items-center space-x-4">
            <div className="flex items-center space-x-2">

            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Actual Price
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stockData?.predictionColor }}
                ></div>
              <span className="text-sm text-muted-foreground">
                Predicted Price
              </span>
            </div>
                </div>
            {/* <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Show Prediction</span>
              <Checkbox 
                checked={showPrediction}
                onCheckedChange={(checked) => onTogglePrediction(checked as boolean)}
              />
            </div> */}
            <div className="flex items-center text-muted-foreground space-x-2">
              Prediction:{" "}
              <span className="ml-2 text-sm font-bold text-muted-foreground" style={{ color: stockData?.predictionColor }}>
                {stockData?.companyInfo?.prediction}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
