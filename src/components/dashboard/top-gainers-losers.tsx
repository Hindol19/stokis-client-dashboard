import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
// import { topGainers, topLosers } from '@/data/stocks';
import { formatCurrency, getChangeSign } from '@/lib/utils';

export default function TopGainersLosers({ topGainersLosers }: { topGainersLosers: any }) {
  

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Top Gainers */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle>Top Gainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Company</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">1 month ago</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topGainersLosers?.top_gainers?.map((stock: any) => (
                    <TableRow key={stock.ticker} className="hover:bg-muted/50">
                      <TableCell className="py-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium">{stock.ticker}</div>
                          <div className="ml-2 text-xs text-muted-foreground">{stock.companyName}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(stock.current_price)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(stock.month_ago_price)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="success">
                          +{stock.percentage_change.toFixed(2)}%
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
      
      {/* Top Losers */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle>Top Losers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Company</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">1 month ago</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topGainersLosers?.top_losers?.map((stock: any) => (
                    <TableRow key={stock.ticker} className="hover:bg-muted/50">
                      <TableCell className="py-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium">{stock.ticker}</div>
                          <div className="ml-2 text-xs text-muted-foreground">{stock.companyName}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(stock.current_price)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(stock.month_ago_price)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="error">
                          {stock.percentage_change.toFixed(2)}%
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
    </div>
  );
}
