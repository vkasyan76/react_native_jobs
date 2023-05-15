import { useState, useEffect } from "react";
import axios from "axios";

// import { Platform } from "react-native";
// import { getEnvVars } from "react-native-dotenv";

// import Config from "react-native-config";

// import { RAPID_API_KEY } from "@env";

// import { RAPID_API_KEY } from ".env";
// const rapidApiKey = RAPID_API_KEY;

// const rapidApiKey = process.env.RAPID_API_KEY;

// const rapidApiKey = Constants.expoConfig.extra.rapidApiKey;

// const rapidApiKey = Constants.manifest.extra.rapidApiKey;

// const rapidApiKey = getEnvVars().RAPID_API_KEY;

// const rapidApiKey = Config.rapidApiKey;

import { RAPID_API_KEY } from "@env";

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    // url: "https://jsearch.p.rapidapi.com/search",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      // "X-RapidAPI-Key": "",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
