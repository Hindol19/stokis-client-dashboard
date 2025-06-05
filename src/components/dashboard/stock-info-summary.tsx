import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stock } from '@/data/stocks';
import { formatCurrency, formatCompactNumber, getChangeBackgroundColor, getChangeSign } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

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

  const isPositiveChange = stock.changePercent !== undefined && stock.changePercent > 0;

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-indigo-500/10 to-purple-500/5">
          <div className={`h-1 w-full ${isPositiveChange ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
          <CardContent className="p-4">
            <div className="flex gap-6 items-start">
              <div>
                <p className="text-sm text-indigo-200">Current Price</p>
                <h3 className="text-2xl font-mono font-semibold text-foreground">
                  {stock.currentPrice !== undefined ? formatCurrency(stock.currentPrice) : 'N/A'}
                </h3>
              </div>
              <Badge 
                variant={stock.changePercent !== undefined && stock.changePercent > 0 ? "success" : "error"}
                className="px-2 py-1 text-xs font-medium flex items-center gap-1"
              >
                {isPositiveChange ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stock.changePercent !== undefined ? `${getChangeSign(stock.changePercent)}${stock.changePercent.toFixed(2)}%` : 'N/A'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* <motion.div variants={item}>
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
      </motion.div> */}
      
      <motion.div variants={item}>
        <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-cyan-500/10 to-blue-500/5">
          <div className="h-1 w-full bg-cyan-500"></div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-cyan-200">52-Week High</p>
                <h3 className="text-2xl font-mono font-semibold text-foreground">
                  {stock.high52Week !== undefined ? formatCurrency(stock.high52Week) : 'N/A'}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <TrendingUp className="text-cyan-400" size={18} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-amber-500/10 to-orange-500/5">
          <div className="h-1 w-full bg-amber-500"></div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-amber-200">52-Week Low</p>
                <h3 className="text-2xl font-mono font-semibold text-foreground">
                  {stock.low52Week !== undefined ? formatCurrency(stock.low52Week) : 'N/A'}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <TrendingDown className="text-amber-400" size={18} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
