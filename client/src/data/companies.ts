export interface CompanyOverview {
  ticker: string;
  description: string;
  sector: string;
  industry: string;
  employees: number;
  ceo: string;
  founded: number;
  headquarters: string;
  website: string;
}

export interface KeyMetrics {
  marketCap: number;
  peRatio: number;
  dividendYield: number;
  weekRange52: {
    low: number;
    high: number;
  };
  volume: number;
  beta: number;
  eps: number;
}

export interface FinancialData {
  period: string;
  revenue: number;
  netIncome: number;
  eps: number;
  growth: number;
}

export interface AnalystRecommendation {
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
}

export const companyOverviews: Record<string, CompanyOverview> = {
  'AAPL': {
    ticker: 'AAPL',
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, iPad, Mac, Apple Watch, and accessories. It also provides AppleCare support and cloud services. The company was founded in 1977 and is headquartered in Cupertino, California.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    employees: 164000,
    ceo: 'Tim Cook',
    founded: 1976,
    headquarters: 'Cupertino, California, USA',
    website: 'www.apple.com'
  },
  'MSFT': {
    ticker: 'MSFT',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates through Productivity and Business Processes, Intelligent Cloud, and More Personal Computing segments. It offers cloud-based solutions including Office 365, Dynamics 365, and Azure cloud services.',
    sector: 'Technology',
    industry: 'Software—Infrastructure',
    employees: 221000,
    ceo: 'Satya Nadella',
    founded: 1975,
    headquarters: 'Redmond, Washington, USA',
    website: 'www.microsoft.com'
  },
  'GOOGL': {
    ticker: 'GOOGL',
    description: 'Alphabet Inc. offers various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America. It operates through Google Services, Google Cloud, and Other Bets segments. The company provides Search, Maps, YouTube, and Android platforms.',
    sector: 'Technology',
    industry: 'Internet Content & Information',
    employees: 186779,
    ceo: 'Sundar Pichai',
    founded: 1998,
    headquarters: 'Mountain View, California, USA',
    website: 'www.abc.xyz'
  },
  'AMZN': {
    ticker: 'AMZN',
    description: 'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions through online and physical stores worldwide. The company operates through North America, International, and Amazon Web Services (AWS) segments. It sells merchandise and content through online and physical stores.',
    sector: 'Consumer Cyclical',
    industry: 'Internet Retail',
    employees: 1541000,
    ceo: 'Andy Jassy',
    founded: 1994,
    headquarters: 'Seattle, Washington, USA',
    website: 'www.amazon.com'
  },
  'META': {
    ticker: 'META',
    description: 'Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, and wearables worldwide. It operates in two segments, Family of Apps and Reality Labs.',
    sector: 'Technology',
    industry: 'Internet Content & Information',
    employees: 77805,
    ceo: 'Mark Zuckerberg',
    founded: 2004,
    headquarters: 'Menlo Park, California, USA',
    website: 'www.meta.com'
  },
  'TSLA': {
    ticker: 'TSLA',
    description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. The company operates in two segments, Automotive, and Energy Generation and Storage.',
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    employees: 127855,
    ceo: 'Elon Musk',
    founded: 2003,
    headquarters: 'Austin, Texas, USA',
    website: 'www.tesla.com'
  },
  'NVDA': {
    ticker: 'NVDA',
    description: 'NVIDIA Corporation provides graphics, computing, and networking solutions in the United States, Taiwan, China, and internationally. The company offers GeForce GPUs for gaming and PCs, the GeForce NOW game streaming service, and related infrastructure software under the NVIDIA GeForce brand.',
    sector: 'Technology',
    industry: 'Semiconductors',
    employees: 22473,
    ceo: 'Jensen Huang',
    founded: 1993,
    headquarters: 'Santa Clara, California, USA',
    website: 'www.nvidia.com'
  }
};

export const keyMetrics: Record<string, KeyMetrics> = {
  'AAPL': {
    marketCap: 2850000000000,
    peRatio: 30.25,
    dividendYield: 0.56,
    weekRange52: {
      low: 124.17,
      high: 198.23
    },
    volume: 54300000,
    beta: 1.28,
    eps: 6.15
  },
  'MSFT': {
    marketCap: 2760000000000,
    peRatio: 36.10,
    dividendYield: 0.81,
    weekRange52: {
      low: 275.37,
      high: 385.74
    },
    volume: 25400000,
    beta: 0.95,
    eps: 10.37
  },
  'GOOGL': {
    marketCap: 1790000000000,
    peRatio: 24.85,
    dividendYield: 0,
    weekRange52: {
      low: 102.63,
      high: 153.78
    },
    volume: 21800000,
    beta: 1.05,
    eps: 5.80
  },
  'AMZN': {
    marketCap: 1500000000000,
    peRatio: 62.18,
    dividendYield: 0,
    weekRange52: {
      low: 101.15,
      high: 150.34
    },
    volume: 32600000,
    beta: 1.24,
    eps: 2.37
  },
  'META': {
    marketCap: 832000000000,
    peRatio: 28.40,
    dividendYield: 0,
    weekRange52: {
      low: 197.16,
      high: 377.06
    },
    volume: 19700000,
    beta: 1.32,
    eps: 11.51
  },
  'TSLA': {
    marketCap: 782000000000,
    peRatio: 68.75,
    dividendYield: 0,
    weekRange52: {
      low: 152.37,
      high: 278.98
    },
    volume: 47200000,
    beta: 2.10,
    eps: 3.62
  },
  'NVDA': {
    marketCap: 1200000000000,
    peRatio: 72.45,
    dividendYield: 0.07,
    weekRange52: {
      low: 176.61,
      high: 505.48
    },
    volume: 36400000,
    beta: 1.72,
    eps: 6.85
  }
};

export const financialData: Record<string, FinancialData[]> = {
  'AAPL': [
    {
      period: 'Q4 2022',
      revenue: 117200000000,
      netIncome: 30000000000,
      eps: 1.88,
      growth: 3.2
    },
    {
      period: 'Q3 2022',
      revenue: 90100000000,
      netIncome: 20700000000,
      eps: 1.29,
      growth: 8.1
    },
    {
      period: 'Q2 2022',
      revenue: 82900000000,
      netIncome: 19400000000,
      eps: 1.20,
      growth: -10.6
    },
    {
      period: 'Q1 2022',
      revenue: 97300000000,
      netIncome: 25000000000,
      eps: 1.52,
      growth: 5.8
    }
  ],
  'MSFT': [
    {
      period: 'Q4 2022',
      revenue: 51900000000,
      netIncome: 16510000000,
      eps: 2.23,
      growth: 1.7
    },
    {
      period: 'Q3 2022',
      revenue: 49400000000,
      netIncome: 16730000000,
      eps: 2.26,
      growth: 7.3
    },
    {
      period: 'Q2 2022',
      revenue: 50100000000,
      netIncome: 16740000000,
      eps: 2.25,
      growth: -2.5
    },
    {
      period: 'Q1 2022',
      revenue: 51700000000,
      netIncome: 17560000000,
      eps: 2.35,
      growth: 8.2
    }
  ]
};

export const analystRecommendations: Record<string, AnalystRecommendation> = {
  'AAPL': {
    strongBuy: 65,
    buy: 20,
    hold: 10,
    sell: 5,
    strongSell: 0
  },
  'MSFT': {
    strongBuy: 70,
    buy: 25,
    hold: 5,
    sell: 0,
    strongSell: 0
  },
  'GOOGL': {
    strongBuy: 75,
    buy: 15,
    hold: 10,
    sell: 0,
    strongSell: 0
  },
  'AMZN': {
    strongBuy: 80,
    buy: 15,
    hold: 5,
    sell: 0,
    strongSell: 0
  },
  'META': {
    strongBuy: 45,
    buy: 30,
    hold: 15,
    sell: 5,
    strongSell: 5
  },
  'TSLA': {
    strongBuy: 40,
    buy: 20,
    hold: 25,
    sell: 10,
    strongSell: 5
  },
  'NVDA': {
    strongBuy: 85,
    buy: 10,
    hold: 5,
    sell: 0,
    strongSell: 0
  }
};

export function getCompanyOverview(ticker: string): CompanyOverview | undefined {
  return companyOverviews[ticker];
}

export function getCompanyKeyMetrics(ticker: string): KeyMetrics | undefined {
  return keyMetrics[ticker];
}

export function getCompanyFinancialData(ticker: string): FinancialData[] | undefined {
  return financialData[ticker] || financialData['AAPL']; // Fallback to AAPL if not found
}

export function getCompanyAnalystRecommendations(ticker: string): AnalystRecommendation | undefined {
  return analystRecommendations[ticker] || analystRecommendations['AAPL']; // Fallback to AAPL if not found
}
