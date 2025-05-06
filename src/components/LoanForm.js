import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

const currencyRates = {
  USD: 1,
  INR: 83,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 154,
  AUD: 1.51,
  CAD: 1.37,
};

const LoanForm = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [duration, setDuration] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [emi, setEmi] = useState(null);
  const [amortizationData, setAmortizationData] = useState([]);
  const [errors, setErrors] = useState({
    principal: false,
    rate: false,
    duration: false,
  });

  const calculateEMIAndSchedule = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const N = parseFloat(duration);

    if (!P || !R || !N) return;

    const monthlyRate = R / (12 * 100);
    const numMonths = N * 12;

    const emiCalc =
      (P * monthlyRate * Math.pow(1 + monthlyRate, numMonths)) /
      (Math.pow(1 + monthlyRate, numMonths) - 1);

    setEmi(emiCalc);

    let balance = P;
    const amortization = [];

    for (let month = 1; month <= numMonths; month++) {
      const interest = balance * monthlyRate;
      const principalPaid = emiCalc - interest;
      balance -= principalPaid;

      amortization.push({
        month,
        interestPaid: interest,
        principalPaid: principalPaid,
        remainingBalance: balance > 0 ? balance : 0,
      });
    }

    setAmortizationData(amortization);
  };

  const handleCalculate = () => {
    const newErrors = {
      principal: principal === "",
      rate: rate === "",
      duration: duration === "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((e) => e);
    if (!hasErrors) {
      calculateEMIAndSchedule();
    }
  };

  const handleReset = () => {
    setPrincipal("");
    setRate("");
    setDuration("");
    setCurrency("USD");
    setEmi(null);
    setAmortizationData([]);
    setErrors({ principal: false, rate: false, duration: false });
  };

  const convertedEMI = emi ? emi * currencyRates[currency] : 0;

  return (
    <Box sx={{ maxWidth: 1700, p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "left" }}>
        Loan Calculator Dashboard
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Loan Amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            fullWidth
            error={errors.principal}
            helperText={errors.principal ? "Required" : ""}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Interest Rate (%)"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            fullWidth
            error={errors.rate}
            helperText={errors.rate ? "Required" : ""}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Terms (Years)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
            error={errors.duration}
            helperText={errors.duration ? "Required" : ""}
          />
        </Grid>
      </Grid>

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleCalculate}>
          Calculate
        </Button>
      </Box>

      {emi && (
        <>
          <Typography mt={2}>Monthly EMI: ${emi.toFixed(2)}</Typography>

          <Grid container spacing={2} mt={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                fullWidth
                size="small"
              >
                {Object.keys(currencyRates).map((curr) => (
                  <MenuItem key={curr} value={curr}>
                    {curr}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                Converted EMI: {convertedEMI.toFixed(2)} {currency}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                sx={{ color: "purple", borderColor: "purple" }}
                variant="outlined"
                onClick={handleReset}
              >
                RESET TABLE
              </Button>
            </Grid>
          </Grid>

          <Box mt={4}>
            <TableContainer component={Paper}>
              <Typography variant="h6" gutterBottom sx={{ pt: 2, px: 2 }}>
                Amortization Schedule ({currency})
              </Typography>
              <Table sx={{ width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell sx={{ pl: 20 }}>Principal</TableCell>
                    <TableCell sx={{ pl: 20 }}>Interest</TableCell>
                    <TableCell sx={{ pl: 20 }}>Remaining Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amortizationData && amortizationData.length > 0 ? (
                    amortizationData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell sx={{ pl: 20 }}>
                          {row.principalPaid.toFixed(2)} {currency}
                        </TableCell>
                        <TableCell sx={{ pl: 20 }}>
                          {row.interestPaid.toFixed(2)} {currency}
                        </TableCell>
                        <TableCell sx={{ pl: 20 }}>
                          {row.remainingBalance.toFixed(2)} {currency}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No amortization data available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Box>
  );
};

export default LoanForm;



