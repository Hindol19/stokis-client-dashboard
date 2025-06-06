import axios from "axios";

const getNameInitials = (name: string) => {
  if (!name) return "";
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
  return initials;
}

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
  if (microservice === "chatbot") {
    return "http://localhost:8001";
  }
  if (microservice === "image_server") {
    return "http://localhost:8002";
  }
};


const getAuthToken = () => {
  // This function can be used to retrieve the auth token from local storage or any other secure place
  // For now, we are returning a hardcoded token for demonstration purposes
  console.log("Retrieving auth token from local storage", localStorage.getItem("authToken"));
  
  return localStorage.getItem("authToken") || "";
}

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
          Authorization: `Bearer ${getAuthToken()}`,
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

const register = async (
  name: string,
  email: string,
  password: string,
  setError: (error: string) => void
) => {
  try {

    const response = await axios.post(
      `${getServerUrl("backend")}/register`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error during registration:", error);
    setError(error?.response?.data?.detail?.message || "Something went wrong");
    
  } 
}

const login = async (
  email: string,
  password: string,
  setError: (error: string) => void
) => {
  try {
    const response = await axios.post(
      `${getServerUrl("backend")}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error);
    setError(error?.response?.data?.detail?.message || "Something went wrong");
  }
}

const getChatbotResponse = async (message: string) => {
  try {
    const response = await axios.post(`${getServerUrl("chatbot")}/chat`, { message, api_key: import.meta.env.VITE_HF_API_KEY });
    return response.data;
  } catch (error) {
    console.error("Error during chatbot response:", error);
    throw error;
  }
}

const getUserDetails = async () => {
  try {
    const response = await axios.get(
      `${getServerUrl("backend")}/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}

const getImage = (image_url: string) => {
  try {
    return getServerUrl("image_server") + image_url;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}

export { getStockData, register, login, getServerUrl, getUserDetails, getNameInitials, getChatbotResponse, getImage };
