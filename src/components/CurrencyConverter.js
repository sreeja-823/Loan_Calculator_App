import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";

const CurrencyConverter = ({ emiAmount }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const baseCurrency = "USD";

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/99378a9bf8ce27865dc232fb/latest/USD`
        );
        setExchangeRates(response.data.conversion_rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    setSelectedCurrency(selectedCurrency);
    convertCurrency(selectedCurrency);
  };

  const convertCurrency = (currency) => {
    if (exchangeRates[currency]) {
      const conversionRate = exchangeRates[currency];
      const convertedValue = emiAmount * conversionRate;
      setConvertedAmount(convertedValue.toFixed(2));
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Convert EMI to Different Currencies
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Currency</InputLabel>
        <Select value={selectedCurrency} onChange={handleCurrencyChange}>
          {Object.keys(exchangeRates).map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop={2}
      >
        <Typography variant="body1">EMI in {baseCurrency}: </Typography>
        <Typography variant="body1">{emiAmount}</Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop={2}
      >
        <Typography variant="body1">
          Converted EMI ({selectedCurrency}):{" "}
        </Typography>
        <Typography variant="body1">
          {convertedAmount
            ? `${convertedAmount} ${selectedCurrency}`
            : "Loading..."}
        </Typography>
      </Box>
    </Box>
  );
};

export default CurrencyConverter;
