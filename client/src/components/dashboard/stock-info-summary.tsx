import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stock } from '@/data/stocks';
import { formatCurrency, formatCompactNumber, getChangeBackgroundColor, getChangeSign } from '@/lib/utils';

interface StockInfoSummaryProps {
  stock: Stock;
}

export default function StockInfoSummary({ stock }: StockInfoSummaryProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Current Price</p>
                <h3 className="text-2xl font-mono font-semibold text-foreground">
                  {formatCurrency(stock.currentPrice)}
                </h3>
              </div>
              <Badge 
                variant={stock.changePercent > 0 ? "success" : "error"}
                className="px-2 py-1 text-xs font-medium"
              >
                {getChangeSign(stock.changePercent)}{stock.changePercent.toFixed(2)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <h3 className="text-2xl font-mono font-semibold text-foreground">
                  {formatCompactNumber(stock.marketCap)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">52-Week High</p>
                <h3 className="text-2xl font-mono font-semibold text-foreground">
                  {formatCurrency(stock.high52Week)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">52-Week Low</p>
                <h3 className="text-2xl font-mono font-semibold text-foreground">
                  {formatCurrency(stock.low52Week)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
