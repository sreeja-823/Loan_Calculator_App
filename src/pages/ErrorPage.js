import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Something Went Wrong in the Application
      </Typography>

      <Button
        variant="outlined"
        color="primary"
        onClick={goToHome}
        sx={{ marginTop: 2 }}
      >
        Go To Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
