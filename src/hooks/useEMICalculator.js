import { useState } from "react";

export const useEMICalculator = (principal, rate, duration) => {
  const [emi, setEmi] = useState(null);
  const [error, setError] = useState("");

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseInt(duration) * 12;

    if (P <= 0 || R <= 0 || N <= 0) {
      setError("Please enter valid positive numbers.");
      setEmi(null);
      return;
    }

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue);
    setError("");
  };

  return { emi, calculateEMI, error };
};
