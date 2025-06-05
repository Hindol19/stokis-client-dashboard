import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { analystRecommendations } from '@/data/companies';

interface AnalystRecommendationsProps {
  ticker: string;
}

export default function AnalystRecommendations({ ticker }: AnalystRecommendationsProps) {
  const data = analystRecommendations[ticker];
  
  if (!data) {
    return (
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-5">
          <p className="text-muted-foreground">No analyst recommendations available.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Convert data to chart format
  const chartData = [
    { name: 'Strong Buy', value: data.strongBuy, color: 'hsl(var(--success))' },
    { name: 'Buy', value: data.buy, color: 'hsl(var(--success) / 0.7)' },
    { name: 'Hold', value: data.hold, color: 'hsl(var(--warning) / 0.7)' },
    { name: 'Sell', value: data.sell, color: 'hsl(var(--error) / 0.7)' },
    { name: 'Strong Sell', value: data.strongSell, color: 'hsl(var(--error))' },
  ].filter(item => item.value > 0);
  
  // Determine consensus
  let consensus: string;
  let consensusVariant: "success" | "warning" | "error" | "default";
  
  const strongBuyBuy = data.strongBuy + data.buy;
  if (strongBuyBuy > 70) {
    consensus = 'Buy';
    consensusVariant = 'success';
  } else if (data.hold > 50) {
    consensus = 'Hold';
    consensusVariant = 'warning';
  } else if (data.sell + data.strongSell > 50) {
    consensus = 'Sell';
    consensusVariant = 'error';
  } else {
    consensus = 'Mixed';
    consensusVariant = 'default';
  }
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm" style={{ color: payload[0].payload.color }}>
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mb-6"
    >
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle>Analyst Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => (
                        <span className="text-sm text-muted-foreground">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <div className="bg-muted rounded-lg p-4 border border-border mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Consensus</span>
                  <Badge variant={consensusVariant}>{consensus}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Strong Buy</span>
                  <div className="w-2/3 flex items-center gap-2">
                    <Progress value={data.strongBuy} className="h-2.5" />
                    <span className="text-sm">{data.strongBuy}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Buy</span>
                  <div className="w-2/3 flex items-center gap-2">
                    <Progress value={data.buy} className="h-2.5" />
                    <span className="text-sm">{data.buy}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Hold</span>
                  <div className="w-2/3 flex items-center gap-2">
                    <Progress value={data.hold} className="h-2.5" />
                    <span className="text-sm">{data.hold}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sell</span>
                  <div className="w-2/3 flex items-center gap-2">
                    <Progress value={data.sell} className="h-2.5" />
                    <span className="text-sm">{data.sell}%</span>
                  </div>
                </div>
                {data.strongSell > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Strong Sell</span>
                    <div className="w-2/3 flex items-center gap-2">
                      <Progress value={data.strongSell} className="h-2.5" />
                      <span className="text-sm">{data.strongSell}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
