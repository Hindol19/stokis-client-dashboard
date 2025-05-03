import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { companyOverviews } from '@/data/companies';

interface CompanyOverviewProps {
  ticker: string;
}

export default function CompanyOverview({ ticker }: CompanyOverviewProps) {
  const companyData = companyOverviews[ticker];
  
  if (!companyData) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <p className="text-muted-foreground">No company information available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mt-5"
    >
      <h3 className="text-lg font-medium text-foreground">Company Overview</h3>
      <div className="mt-2 text-sm text-muted-foreground">
        <p>{companyData.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p><span className="font-medium text-foreground">Sector:</span> {companyData.sector}</p>
            <p><span className="font-medium text-foreground">Industry:</span> {companyData.industry}</p>
            <p><span className="font-medium text-foreground">Founded:</span> {companyData.founded}</p>
          </div>
          <div>
            <p><span className="font-medium text-foreground">CEO:</span> {companyData.ceo}</p>
            <p><span className="font-medium text-foreground">Employees:</span> {companyData.employees.toLocaleString()}</p>
            <p><span className="font-medium text-foreground">Headquarters:</span> {companyData.headquarters}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
