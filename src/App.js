import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage"; 
import ExchangeRates from "./pages/ExchangeRates";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/exchange-rates" element={<><Header/><ExchangeRates /></>}/>
          <Route path="/error" element={<ErrorPage />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
