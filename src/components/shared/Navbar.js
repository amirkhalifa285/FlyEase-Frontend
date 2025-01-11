import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token or any authentication logic
    window.location.href = "/login"; // Redirect to login page
  };

  const handleNavigation = (path) => {
    window.location.href = path; // Navigate to the desired path
    handleMenuClose(); // Close the menu
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      }}
    >
      <Toolbar>
        {/* Logo and Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            cursor: "pointer",
          }}
        >
          <img
            src="/logo.jpeg" // Replace with the path to your logo
            alt="FlyEase Logo"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "10px",
            }}
            onClick={() => handleNavigation("../../UserInterface")}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              fontFamily: "Arial",
              color: "white",
            }}
          >
            FlyEase
          </Typography>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
          <Button
            color="inherit"
            sx={{ color: "white" }}
            onClick={() => handleNavigation("/service-bookings")}
          >
            Service Bookings
          </Button>
          <Button
            color="inherit"
            sx={{ color: "white" }}
            onClick={() => handleNavigation("/flight-tracking")}
          >
            Flight Tracking
          </Button>
          <Button
            color="inherit"
            sx={{ color: "white" }}
            onClick={() => handleNavigation("/luggage-tracking")}
          >
            Luggage Tracking
          </Button>
          <Button
            color="inherit"
            sx={{ color: "white" }}
            onClick={() => handleNavigation("/map")} // Navigate to the Map component
          >
            Interactive Navigation
          </Button>
          <Button
            color="inherit"
            sx={{ color: "white" }}
            onClick={() => handleNavigation("/purchase-tickets")} // New option
          >
            Purchase Tickets
          </Button>
          {/* Logout Button for Desktop */}
          <Button
            color="inherit"
            sx={{ color: "white", fontWeight: "bold" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        {/* Hamburger Menu for Smaller Screens */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleNavigation("/service-bookings")}>
              Service Bookings
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/flight-tracking")}>
              Flight Tracking
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/luggage-tracking")}>
              Luggage Tracking
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/interactive-navigation")}>
              Interactive Navigation
            </MenuItem>
            <MenuItem onClick={() => handleNavigation("/purchase-tickets")}>
              Purchase Tickets {/* New option */}
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}