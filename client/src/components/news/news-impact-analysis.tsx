import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { newsImpactData, newsImpactSummary, mostInfluentialNews } from '@/data/news';

export default function NewsImpactAnalysis() {
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name === 'positiveImpact' ? 'Positive: ' : 'Negative: '}
              {Math.abs(entry.value)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-6"
    >
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle>News Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={newsImpactData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis 
                      dataKey="company" 
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="positiveImpact" 
                      name="Positive Impact" 
                      fill="hsl(var(--success) / 0.7)" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      dataKey="negativeImpact" 
                      name="Negative Impact" 
                      fill="hsl(var(--error) / 0.7)" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <Card className="bg-muted border-border">
                  <CardContent className="p-4">
                    <h3 className="text-foreground text-lg mb-2">Impact by Sentiment</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Positive News</span>
                        <div className="w-2/3 flex items-center gap-2">
                          <Progress value={newsImpactSummary.positive} className="h-2.5 bg-muted-foreground/20" />
                          <span className="text-sm">{newsImpactSummary.positive}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Negative News</span>
                        <div className="w-2/3 flex items-center gap-2">
                          <Progress value={newsImpactSummary.negative} className="h-2.5 bg-muted-foreground/20" />
                          <span className="text-sm">{newsImpactSummary.negative}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Neutral News</span>
                        <div className="w-2/3 flex items-center gap-2">
                          <Progress value={newsImpactSummary.neutral} className="h-2.5 bg-muted-foreground/20" />
                          <span className="text-sm">{newsImpactSummary.neutral}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted border-border">
                  <CardContent className="p-4">
                    <h3 className="text-foreground text-lg mb-2">Most Influential News</h3>
                    <ul className="space-y-2">
                      {mostInfluentialNews.map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Badge variant={item.impact > 0 ? "success" : "error"}>
                            {item.impact > 0 ? `+${item.impact}%` : `${item.impact}%`}
                          </Badge>
                          <span className="text-foreground truncate">{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
