import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Switch,
  FormControlLabel,
  Drawer,
  IconButton,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {isSmallScreen && (
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          sx={{ cursor: "pointer", flexGrow: 1 }}
          onClick={() => navigate("/")}
        >
          Loan Calculator
        </Typography>

        {!isSmallScreen ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/exchange-rates")}>
              Exchange Rates(LIVE)
            </Button>
            <Button color="inherit" onClick={() => navigate("/error")}>
              Error Page
            </Button>
            <FormControlLabel
              control={
                <Switch
                  checked={mode === "dark"}
                  onChange={toggleTheme}
                  color="default"
                />
              }
              labelPlacement="start"
              sx={{ ml: 2 }}
            />
          </Box>
        ) : (
          <FormControlLabel
            control={
              <Switch
                checked={mode === "dark"}
                onChange={toggleTheme}
                color="default"
              />
            }
            labelPlacement="start"
            sx={{ ml: 2 }}
          />
        )}
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ width: 250 }}
      >
        <List>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigate("/exchange-rates")}>
            <ListItemText primary="Exchange Rates(LIVE)" />
          </ListItem>
          <ListItem button onClick={() => navigate("/error")}>
            <ListItemText primary="Error Page" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
