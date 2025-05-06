import { useState, useEffect } from "react";
import axios from "axios";

export const useExchangeRate = (currency) => {
  const [rates, setRates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/99378a9bf8ce27865dc232fb/latest/USD`
        );
        setRates(response.data.conversion_rates);
      } catch (err) {
        setError("Error fetching exchange rates.");
      }
    };

    fetchExchangeRates();
  }, [currency]);

  return { rates, error };
};
