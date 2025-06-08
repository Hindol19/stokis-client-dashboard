import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { companyOverviews } from '@/data/companies';
import { FaIndustry, FaUserTie, FaUsers, FaMapMarkerAlt, FaGlobe, FaChartLine, FaMoneyBillWave, FaArrowUp, FaArrowDown, FaCalendarAlt, FaPercent, FaBuilding } from 'react-icons/fa';

interface CompanyOverviewProps {
  ticker: string;
  companyInfo: any;
}

const tataMotorsLogo = "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tata_Motors_Logo.svg"; // Placeholder logo

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <div className="flex items-center bg-muted/40 rounded-xl p-4 border border-border/50">
    <div className="text-primary bg-primary/10 rounded-md p-2 mr-3 text-lg">
      {icon}
    </div>
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

export default function CompanyOverview({ ticker, companyInfo }: CompanyOverviewProps) {
  const companyData = companyOverviews[ticker];
  
  if (!companyInfo) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <p className="text-muted-foreground">No company information available.</p>
        </CardContent>
      </Card>
    );
  }

  if (companyInfo) {
    const infoItems = [
      { label: 'Sector', value: companyInfo.sector, icon: <FaIndustry /> },
      { label: '1Y Target Est', value: companyInfo['1y_target_est'], icon: <FaChartLine /> },
      { label: '52-Week High', value: companyInfo['52_week_high'], icon: <FaArrowUp className="text-green-600" /> },
      { label: '52-Week Low', value: companyInfo['52_week_low'], icon: <FaArrowDown className="text-red-600" /> },
      { label: 'Ask', value: companyInfo.ask, icon: <FaMoneyBillWave /> },
      { label: 'Bid', value: companyInfo.bid, icon: <FaMoneyBillWave /> },
      { label: 'Beta (5M)', value: companyInfo.beta_5_monthly, icon: <FaPercent /> },
      { label: 'EPS', value: companyInfo.eps, icon: <FaMoneyBillWave /> },
      { label: 'Earning Date', value: companyInfo.earning_date, icon: <FaCalendarAlt /> },
      { label: 'Ex-Dividend Range', value: companyInfo.ex_dividend_range, icon: <FaCalendarAlt /> },
      { label: 'Forward Dividend', value: companyInfo.forward_dividend, icon: <FaMoneyBillWave /> },
      { label: 'Yield', value: `${companyInfo.yield}%`, icon: <FaPercent /> },
      { label: 'Market Cap', value: companyInfo.market_cap?.toLocaleString?.() ?? companyInfo.market_cap, icon: <FaGlobe /> },
      { label: 'P/E Ratio', value: companyInfo.pe_ratio, icon: <FaChartLine /> },
      { label: 'Quote Price', value: companyInfo.quote_price, icon: <FaMoneyBillWave /> },
      {
        label: 'Prediction',
        value: (
          <span
            className={`font-bold ${
              companyInfo.prediction === 'Buy'
                ? 'text-green-600'
                : companyInfo.prediction === 'Sell'
                ? 'text-red-600'
                : 'text-yellow-600'
            }`}
          >
            {companyInfo.prediction}
          </span>
        ),
        icon: <FaChartLine />,
      },
    ];

    return (
      <Card className="bg-card border border-border rounded-2xl shadow-lg w-full mt-6">
        <CardContent className="p-8">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {companyInfo.company}{' '}
              <span className="text-base font-medium text-muted-foreground">
                ({companyInfo.ticker})
              </span>
            </h3>
            <a
              href={companyInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline text-sm"
            >
              {companyInfo.website}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {infoItems.map((item) => (
              <InfoItem key={item.label} {...item} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mt-8 w-full"
    >
      <Card className="bg-card border border-border rounded-2xl shadow-lg w-full">
        <CardContent className="p-8">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-foreground mb-1">{companyData.ticker}</h3>
            {companyData.website && (
              <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">{companyData.website}</a>
            )}
          </div>
          <div className="mt-2 text-base text-muted-foreground mb-4">
            <p>{companyData.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Sector', value: companyData.sector, icon: <FaIndustry /> },
              { label: 'Industry', value: companyData.industry, icon: <FaBuilding /> },
              { label: 'Founded', value: companyData.founded, icon: <FaCalendarAlt /> },
              { label: 'CEO', value: companyData.ceo, icon: <FaUserTie /> },
              { label: 'Employees', value: companyData.employees.toLocaleString(), icon: <FaUsers /> },
              { label: 'Headquarters', value: companyData.headquarters, icon: <FaMapMarkerAlt /> },
            ].map((item) => (
              <InfoItem key={item.label} {...item} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
