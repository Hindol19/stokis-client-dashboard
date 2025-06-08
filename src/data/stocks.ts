export interface Stock {
  ticker: string;
  companyName: string;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  marketCap?: number;
  high52Week?: number;
  low52Week?: number;
  volume?: number;
  avgVolume?: number;
}

export interface StockPricePoint {
  Date: string;
  Close: number;
}

export interface StockPrediction {
  actualData: StockPricePoint[];
  predictedData: StockPricePoint[];
  companyInfo: any;
  predictionColor: string;
}

export interface PredictionComparison {
  ticker: string;
  predicted: number;
  actual: number;
  accuracy: number;
  date: string;
}


export const stockList = [
  {
    ticker: "TATAMOTORS.NS",
    companyName: "Tata Motors Ltd.",
  },
  {
    ticker: "MARUTI.NS",
    companyName: "Maruti Suzuki India Ltd.",
  },
  {
    ticker: "EICHERMOT.NS",
    companyName: "Eicher Motors Ltd.",
  },
  {
    ticker: "M&M.NS",
    companyName: "Mahindra & Mahindra Ltd.",
  },
  {
    ticker: "BAJAJ-AUTO.NS",
    companyName: "Bajaj Auto Ltd.",
  },
  {
    ticker: "TVSMOTOR.NS",
    companyName: "TVS Motor Company Ltd.",
  },
  {
    ticker: "NESTLEIND.NS",
    companyName: "Nestle India Ltd.",
  },
  {
    ticker: "TATACONSUM.NS",
    companyName: "Tata Consumer Products Ltd.",
  },
  {
    ticker: "HINDUNILVR.NS",
    companyName: "Hindustan Unilever Ltd.",
  },
  {
    ticker: "VBL.NS",
    companyName: "Varun Beverages Ltd.",
  },
  {
    ticker: "COLPAL.NS",
    companyName: "Colgate-Palmolive (India) Ltd.",
  },
  {
    ticker: "BRITANNIA.NS",
    companyName: "Britannia Industries Ltd.",
  },
  {
    ticker: "TITAN.NS",
    companyName: "Titan Company Ltd.",
  },
  {
    ticker: "HDFCBANK.NS",
    companyName: "HDFC Bank Ltd.",
  },
  {
    ticker: "ICICIBANK.NS",
    companyName: "ICICI Bank Ltd.",
  },
  {
    ticker: "KOTAKBANK.NS",
    companyName: "Kotak Mahindra Bank Ltd.",
  },
  {
    ticker: "AXISBANK.NS",
    companyName: "Axis Bank Ltd.",
  },
  {
    ticker: "INDUSINDBK.NS",
    companyName: "IndusInd Bank Ltd.",
  },
  {
    ticker: "SBIN.NS",
    companyName: "State Bank of India",
  },
  {
    ticker: "BANKBARODA.NS",
    companyName: "Bank of Baroda",
  },
  {
    ticker: "IOB.NS",
    companyName: "Indian Overseas Bank",
  },
  {
    ticker: "PNB.NS",
    companyName: "Punjab National Bank",
  },
  {
    ticker: "UNIONBANK.NS",
    companyName: "Union Bank of India",
  },
  {
    ticker: "ULTRACEMCO.NS",
    companyName: "UltraTech Cement Ltd.",
  },
  {
    ticker: "SHREECEM.NS",
    companyName: "Shree Cement Ltd.",
  },
  {
    ticker: "AMBUJACEM.NS",
    companyName: "Ambuja Cements Ltd.",
  },
  {
    ticker: "JSWSTEEL.NS",
    companyName: "JSW Steel Ltd.",
  },
  {
    ticker: "TATASTEEL.NS",
    companyName: "Tata Steel Ltd.",
  },
  {
    ticker: "JSL.NS",
    companyName: "Jindal Stainless Ltd.",
  },
  {
    ticker: "HINDALCO.NS",
    companyName: "Hindalco Industries Ltd.",
  },
  {
    ticker: "JINDALSTEL.NS",
    companyName: "Jindal Steel & Power Ltd.",
  },
  {
    ticker: "HINDZINC.NS",
    companyName: "Hindustan Zinc Ltd.",
  },
  {
    ticker: "VEDL.NS",
    companyName: "Vedanta Ltd.",
  },
  {
    ticker: "COALINDIA.NS",
    companyName: "Coal India Ltd.",
  },
  {
    ticker: "BHARTIARTL.NS",
    companyName: "Bharti Airtel Ltd.",
  },
  {
    ticker: "DMART.NS",
    companyName: "Avenue Supermarts Ltd.",
  },
  {
    ticker: "TRENT.NS",
    companyName: "Trent Ltd.",
  },
  {
    ticker: "DLF.NS",
    companyName: "DLF Ltd.",
  },
  {
    ticker: "GODREJPROP.NS",
    companyName: "Godrej Properties Ltd.",
  },
  {
    ticker: "OBEROIRLTY.NS",
    companyName: "Oberoi Realty Ltd.",
  },
  {
    ticker: "LODHA.NS",
    companyName: "Macrotech Developers Ltd.",
  },
  {
    ticker: "LT.NS",
    companyName: "Larsen & Toubro Ltd.",
  },
  {
    ticker: "HAL.NS",
    companyName: "Hindustan Aeronautics Ltd.",
  },
  {
    ticker: "TCS.NS",
    companyName: "Tata Consultancy Services Ltd.",
  },
  {
    ticker: "INFY.NS",
    companyName: "Infosys Ltd.",
  },
  {
    ticker: "HCLTECH.NS",
    companyName: "HCL Technologies Ltd.",
  },
  {
    ticker: "WIPRO.NS",
    companyName: "Wipro Ltd.",
  },
  {
    ticker: "TECHM.NS",
    companyName: "Tech Mahindra Ltd.",
  },
  {
    ticker: "LTIM.NS",
    companyName: "LTIMindtree Ltd.",
  },
  {
    ticker: "ADANIPORTS.NS",
    companyName: "Adani Ports and Special Economic Zone Ltd.",
  },
  {
    ticker: "GRASIM.NS",
    companyName: "Grasim Industries Ltd.",
  },
  {
    ticker: "ITC.NS",
    companyName: "ITC Ltd.",
  },
  {
    ticker: "SUNPHARMA.NS",
    companyName: "Sun Pharmaceutical Industries Ltd.",
  },
  {
    ticker: "DIVISLAB.NS",
    companyName: "Divi's Laboratories Ltd.",
  },
  {
    ticker: "CIPLA.NS",
    companyName: "Cipla Ltd.",
  },
  {
    ticker: "DRREDDY.NS",
    companyName: "Dr. Reddy's Laboratories Ltd.",
  },
  {
    ticker: "APOLLOHOSP.NS",
    companyName: "Apollo Hospitals Enterprise Ltd.",
  },
  {
    ticker: "MANKIND.NS",
    companyName: "Mankind Pharma Ltd.",
  },
  {
    ticker: "BAJFINANCE.NS",
    companyName: "Bajaj Finance Ltd.",
  },
  {
    ticker: "LICI.NS",
    companyName: "Life Insurance Corporation of India",
  },
  {
    ticker: "BAJAJFINSV.NS",
    companyName: "Bajaj Finserv Ltd.",
  },
  {
    ticker: "JIOFIN.NS",
    companyName: "Jio Financial Services Ltd.",
  },
  {
    ticker: "HDFCLIFE.NS",
    companyName: "HDFC Life Insurance Company Ltd.",
  },
  {
    ticker: "SBILIFE.NS",
    companyName: "SBI Life Insurance Company Ltd.",
  },
  {
    ticker: "CHOLAFIN.NS",
    companyName: "Cholamandalam Investment and Finance Company Ltd.",
  },
  {
    ticker: "NTPC.NS",
    companyName: "NTPC Ltd.",
  },
  {
    ticker: "POWERGRID.NS",
    companyName: "Power Grid Corporation of India Ltd.",
  },
  {
    ticker: "ADANIGREEN.NS",
    companyName: "Adani Green Energy Ltd.",
  },
  {
    ticker: "SUPREMEIND.NS",
    companyName: "Supreme Industries Ltd.",
  },
  {
    ticker: "RELIANCE.NS",
    companyName: "Reliance Industries Ltd.",
  },
  {
    ticker: "ONGC.NS",
    companyName: "Oil and Natural Gas Corporation Ltd.",
  },
  {
    ticker: "IOC.NS",
    companyName: "Indian Oil Corporation Ltd.",
  },
  {
    ticker: "POLYCAB.NS",
    companyName: "Polycab India Ltd.",
  },
  {
    ticker: "HAVELLS.NS",
    companyName: "Havells India Ltd.",
  },
  {
    ticker: "SIEMENS.NS",
    companyName: "Siemens Ltd.",
  },
  {
    ticker: "BERGEPAINT.NS",
    companyName: "Berger Paints India Ltd.",
  },
  {
    ticker: "ASIANPAINT.NS",
    companyName: "Asian Paints Ltd.",
  },
  {
    ticker: "PIDILITIND.NS",
    companyName: "Pidilite Industries Ltd.",
  },
];

export const topGainers = [
  {
    ticker: "NVDA",
    companyName: "NVIDIA Corp.",
    price: 487.21,
    change: 8.5,
  },
  {
    ticker: "AMD",
    companyName: "Advanced Micro Devices",
    price: 112.43,
    change: 5.7,
  },
  {
    ticker: "TSLA",
    companyName: "Tesla Inc.",
    price: 246.53,
    change: 4.2,
  },
  {
    ticker: "ADBE",
    companyName: "Adobe Inc.",
    price: 567.98,
    change: 3.8,
  },
];

export const topLosers = [
  {
    ticker: "META",
    companyName: "Meta Platforms Inc.",
    price: 324.82,
    change: -5.2,
  },
  {
    ticker: "NFLX",
    companyName: "Netflix Inc.",
    price: 387.15,
    change: -4.8,
  },
  {
    ticker: "PYPL",
    companyName: "PayPal Holdings Inc.",
    price: 58.73,
    change: -3.9,
  },
  {
    ticker: "INTC",
    companyName: "Intel Corporation",
    price: 31.46,
    change: -3.2,
  },
];

export const recentPredictions: PredictionComparison[] = [
  {
    ticker: "AAPL",
    predicted: 180.15,
    actual: 182.63,
    accuracy: 98.6,
    date: "Jan 9, 2023",
  },
  {
    ticker: "MSFT",
    predicted: 372.45,
    actual: 368.8,
    accuracy: 99.0,
    date: "Jan 6, 2023",
  },
  {
    ticker: "GOOGL",
    predicted: 142.38,
    actual: 135.73,
    accuracy: 95.3,
    date: "Jan 5, 2023",
  },
];

export function generateStockHistoryData(
  days: number = 30,
  startPrice: number = 180
): StockPricePoint[] {
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
      Date: date.toISOString().split("T")[0],
      Close: parseFloat(currentPrice.toFixed(2)),
    });
  }

  return data;
}

export function generatePredictionData(
  actualData: StockPricePoint[],
  predictionDays: number = 10
): StockPrediction {
  const lastActualDate = new Date(actualData[actualData.length - 1].Date);
  const lastActualPrice = actualData[actualData.length - 1].Close;

  const predictedData: StockPricePoint[] = [];
  let predictedPrice = lastActualPrice;

  for (let i = 1; i <= predictionDays; i++) {
    const date = new Date(lastActualDate);
    date.setDate(lastActualDate.getDate() + i);

    // Random price change with slight upward bias
    const change = predictedPrice * (Math.random() * 0.08 - 0.03);
    predictedPrice += change;

    predictedData.push({
      Date: date.toISOString().split("T")[0],
      Close: parseFloat(predictedPrice.toFixed(2)),
    });
  }

  // Create combined data structure with nulls for non-overlapping portions
  return {
    actualData,
    predictedData,
    companyInfo: {},
    predictionColor: "",
  };
}

export function getStockByTicker(ticker: string): Stock | undefined {
  return stockList.find((stock) => stock.ticker === ticker);
}

export function getStockData(ticker: string): StockPrediction {
  const stock = getStockByTicker(ticker);
  if (!stock) {
    throw new Error(`Stock data for ticker ${ticker} is unavailable or incomplete.`);
  }
  const startPrice = stock?.currentPrice ? stock?.currentPrice - (stock?.currentPrice * 0.1) : 0;
  
  const actualData = generateStockHistoryData(20, startPrice);
  return generatePredictionData(actualData);
}
