import axios from "axios";

const getServerUrl = (microservice: string) => {
  // backend - https://stokis-backend.vercel.app/
  // stock_data_generation - https://stokis-data-generation-ms.vercel.app/
  // stock_data_prediction - https://stokis-data-prediction-ms.vercel.app/
  // news_crawler - https://stokis-news-crawler-ms.vercel.app/
  // news_analyzer - https://stokis-news-analyzer-ms.vercel.app/
  // ai_chat - https://stokis-ai-chat-ms.vercel.app/

  if (microservice === "backend") {
    return "https://stokis-backend.vercel.app";
  }
  if (microservice === "stock_data_generation") {
    return "https://stokis-data-generation-ms.vercel.app";
  }
  if (microservice === "stock_data_prediction") {
    return "https://stokis-data-prediction-ms.vercel.app";
  }
  if (microservice === "news_crawler") {
    return "https://stokis-news-crawler-ms.vercel.app";
  }
  if (microservice === "news_analyzer") {
    return "https://stokis-news-analyzer-ms.vercel.app";
  }
};

const getStockData = async (
  ticker: string,
  setIsLoading: (isLoading: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await axios.get(
      `${getServerUrl("backend")}/stock-history`,
      {
        params: {
          ticker_symbol: ticker,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjBhYmE2NTktM2E1Yi00MTEyLWExMjctZWMyZWJhNGZlNWYxIiwibmFtZSI6IkhpbmRvbCIsImVtYWlsIjoiaGluZG9sYmFuZXJqZWU1QGdtYWlsLmNvbSIsImV4cCI6MTc0NzM4MTYwM30.RBTuP2GxnP1iGThcEZZLZwF-X3yM80tEIm39iApvSwk`,
        },
      }
    );

    // const predictedData = await axios.get(
    //   `${getServerUrl("stock_data_prediction")}/predict`,
    //   {
    //     params: { ticker_symbol: "TCS.NS" },
    //   }
    // );

    const stockData = {
      actualData: response.data.data || [],
      predictedData:  [],
    };
    console.log(stockData);
    //   console.log(response.data.data);
    return stockData;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return {
      actualData: [],
      predictedData: [],
    };
  } finally {
    setIsLoading(false);
  }
};

export { getStockData };
