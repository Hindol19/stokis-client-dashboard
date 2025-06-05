import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { financialData } from '@/data/companies';
import { formatCurrency, formatCompactNumber, getChangeBackgroundColor } from '@/lib/utils';

interface FinancialDataProps {
  ticker: string;
}

export default function FinancialData({ ticker }: FinancialDataProps) {
  const [period, setPeriod] = useState<'quarterly' | 'annual'>('quarterly');
  
  const data = financialData[ticker] || [];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-6"
    >
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle>Financial Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex space-x-2 mb-4">
              <Button
                size="sm"
                onClick={() => setPeriod('quarterly')}
                variant={period === 'quarterly' ? 'default' : 'outline'}
              >
                Quarterly
              </Button>
              <Button
                size="sm"
                onClick={() => setPeriod('annual')}
                variant={period === 'annual' ? 'default' : 'outline'}
              >
                Annual
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Net Income</TableHead>
                  <TableHead className="text-right">EPS</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.period} className="hover:bg-muted/50">
                    <TableCell className="text-sm">{item.period}</TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {formatCompactNumber(item.revenue)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {formatCompactNumber(item.netIncome)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      ${item.eps.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={item.growth > 0 ? "success" : "error"}>
                        {item.growth > 0 ? `+${item.growth}%` : `${item.growth}%`}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
