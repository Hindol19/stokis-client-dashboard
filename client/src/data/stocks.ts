export interface Stock {
  ticker: string;
  companyName: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketCap: number;
  high52Week: number;
  low52Week: number;
  volume: number;
  avgVolume: number;
}

export interface StockPricePoint {
  date: string;
  price: number;
}

export interface StockPrediction {
  actualData: StockPricePoint[];
  predictedData: StockPricePoint[];
}

export interface PredictionComparison {
  ticker: string;
  predicted: number;
  actual: number;
  accuracy: number;
  date: string;
}

export const stockList: Stock[] = [
  {
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    currentPrice: 182.63,
    change: 2.26,
    changePercent: 1.25,
    marketCap: 2850000000000,
    high52Week: 198.23,
    low52Week: 124.17,
    volume: 54300000,
    avgVolume: 62500000
  },
  {
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    currentPrice: 372.45,
    change: 4.76,
    changePercent: 1.29,
    marketCap: 2760000000000,
    high52Week: 385.74,
    low52Week: 275.37,
    volume: 25400000,
    avgVolume: 28700000
  },
  {
    ticker: 'GOOGL',
    companyName: 'Alphabet Inc.',
    currentPrice: 142.38,
    change: 1.52,
    changePercent: 1.08,
    marketCap: 1790000000000,
    high52Week: 153.78,
    low52Week: 102.63,
    volume: 21800000,
    avgVolume: 24500000
  },
  {
    ticker: 'AMZN',
    companyName: 'Amazon.com Inc.',
    currentPrice: 145.24,
    change: 2.18,
    changePercent: 1.52,
    marketCap: 1500000000000,
    high52Week: 150.34,
    low52Week: 101.15,
    volume: 32600000,
    avgVolume: 38900000
  },
  {
    ticker: 'META',
    companyName: 'Meta Platforms Inc.',
    currentPrice: 324.82,
    change: -17.85,
    changePercent: -5.2,
    marketCap: 832000000000,
    high52Week: 377.06,
    low52Week: 197.16,
    volume: 19700000,
    avgVolume: 16400000
  },
  {
    ticker: 'TSLA',
    companyName: 'Tesla Inc.',
    currentPrice: 246.53,
    change: 9.91,
    changePercent: 4.2,
    marketCap: 782000000000,
    high52Week: 278.98,
    low52Week: 152.37,
    volume: 47200000,
    avgVolume: 51800000
  },
  {
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    currentPrice: 487.21,
    change: 38.12,
    changePercent: 8.5,
    marketCap: 1200000000000,
    high52Week: 505.48,
    low52Week: 176.61,
    volume: 36400000,
    avgVolume: 42100000
  }
];

export const topGainers = [
  {
    ticker: 'NVDA',
    companyName: 'NVIDIA Corp.',
    price: 487.21,
    change: 8.5
  },
  {
    ticker: 'AMD',
    companyName: 'Advanced Micro Devices',
    price: 112.43,
    change: 5.7
  },
  {
    ticker: 'TSLA',
    companyName: 'Tesla Inc.',
    price: 246.53,
    change: 4.2
  },
  {
    ticker: 'ADBE',
    companyName: 'Adobe Inc.',
    price: 567.98,
    change: 3.8
  }
];

export const topLosers = [
  {
    ticker: 'META',
    companyName: 'Meta Platforms Inc.',
    price: 324.82,
    change: -5.2
  },
  {
    ticker: 'NFLX',
    companyName: 'Netflix Inc.',
    price: 387.15,
    change: -4.8
  },
  {
    ticker: 'PYPL',
    companyName: 'PayPal Holdings Inc.',
    price: 58.73,
    change: -3.9
  },
  {
    ticker: 'INTC',
    companyName: 'Intel Corporation',
    price: 31.46,
    change: -3.2
  }
];

export const recentPredictions: PredictionComparison[] = [
  {
    ticker: 'AAPL',
    predicted: 180.15,
    actual: 182.63,
    accuracy: 98.6,
    date: 'Jan 9, 2023'
  },
  {
    ticker: 'MSFT',
    predicted: 372.45,
    actual: 368.80,
    accuracy: 99.0,
    date: 'Jan 6, 2023'
  },
  {
    ticker: 'GOOGL',
    predicted: 142.38,
    actual: 135.73,
    accuracy: 95.3,
    date: 'Jan 5, 2023'
  }
];

export function generateStockHistoryData(days: number = 30, startPrice: number = 180): StockPricePoint[] {
  const data: StockPricePoint[] = [];
  let currentPrice = startPrice;
  
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Random price change between -3% and +3%
    const change = currentPrice * (Math.random() * 0.06 - 0.03);
    currentPrice += change;
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2))
    });
  }
  
  return data;
}

export function generatePredictionData(actualData: StockPricePoint[], predictionDays: number = 10): StockPrediction {
  const lastActualDate = new Date(actualData[actualData.length - 1].date);
  const lastActualPrice = actualData[actualData.length - 1].price;
  
  const predictedData: StockPricePoint[] = [];
  let predictedPrice = lastActualPrice;
  
  for (let i = 1; i <= predictionDays; i++) {
    const date = new Date(lastActualDate);
    date.setDate(lastActualDate.getDate() + i);
    
    // Random price change with slight upward bias
    const change = predictedPrice * (Math.random() * 0.08 - 0.03);
    predictedPrice += change;
    
    predictedData.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(predictedPrice.toFixed(2))
    });
  }
  
  // Create combined data structure with nulls for non-overlapping portions
  return {
    actualData,
    predictedData
  };
}

export function getStockByTicker(ticker: string): Stock | undefined {
  return stockList.find(stock => stock.ticker === ticker);
}

export function getStockData(ticker: string): StockPrediction {
  const stock = getStockByTicker(ticker);
  const startPrice = stock ? stock.currentPrice - (stock.currentPrice * 0.1) : 150;
  
  const actualData = generateStockHistoryData(20, startPrice);
  return generatePredictionData(actualData);
}
