import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { recentPredictions } from '@/data/stocks';
import { formatCurrency } from '@/lib/utils';

export default function RecentPredictions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-6"
    >
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle>Recent Predictions vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Predicted</TableHead>
                  <TableHead className="text-right">Actual</TableHead>
                  <TableHead className="text-right">Accuracy</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPredictions.map((prediction) => {
                  let accuracyVariant: "success" | "warning" | "error" = "success";
                  if (prediction.accuracy < 90) accuracyVariant = "error";
                  else if (prediction.accuracy < 97) accuracyVariant = "warning";
                  
                  return (
                    <TableRow key={`${prediction.ticker}-${prediction.date}`} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center">
                          <div className="text-sm font-medium">{prediction.ticker}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(prediction.predicted)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(prediction.actual)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={accuracyVariant}>
                          {prediction.accuracy.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {prediction.date}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
