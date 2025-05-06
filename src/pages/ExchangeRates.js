import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TablePagination,
} from "@mui/material";

const ExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [baseCurrency] = useState("USD");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/99378a9bf8ce27865dc232fb/latest/USD"
        );
        setRates(response.data.conversion_rates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const sortedRates = Object.entries(rates).sort(([currencyA], [currencyB]) =>
    currencyA.localeCompare(currencyB)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Live Exchange Rates (Base: {baseCurrency})
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Currency</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Rate</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRates
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(([currency, rate]) => (
                  <TableRow key={currency}>
                    <TableCell>{currency}</TableCell>
                    <TableCell align="right">{rate}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={sortedRates.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default ExchangeRates;
