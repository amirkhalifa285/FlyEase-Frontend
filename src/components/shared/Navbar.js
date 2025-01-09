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
import { useLocation } from "react-router-dom";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  // Check if the current route is for admin
  const isAdmin = location.pathname.startsWith("/admin");

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
    <AppBar position="static" sx={{ backgroundColor: isAdmin ? "#2c3e50" : "#3b3b3b" }}>
      <Toolbar>
        {/* Logo and Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            cursor: "pointer",
          }}
          onClick={() => handleNavigation(isAdmin ? "/admin" : "/UserInterface")}
        >
          <img
            src="/logo.jpeg" 
            alt="FlyEase Logo"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "10px",
            }}
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
            {isAdmin ? "Admin Dashboard" : "FlyEase"}
          </Typography>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
          {isAdmin ? (
            <>
              <Button
                color="inherit"
                sx={{ color: "white" }}
                onClick={() => handleNavigation("/admin/manage-flights")}
              >
                Manage Flights
              </Button>
              <Button
                color="inherit"
                sx={{ color: "white" }}
                onClick={() => handleNavigation("/admin/user-management")}
              >
                User Management
              </Button>
              <Button
                color="inherit"
                sx={{ color: "white" }}
                onClick={() => handleNavigation("/admin/analytics")}
              >
                Analytics
              </Button>
              <Button
                color="inherit"
                sx={{ color: "white", fontWeight: "bold" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
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
                sx={{ color: "white", fontWeight: "bold" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
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
            {isAdmin ? (
              <>
                <MenuItem onClick={() => handleNavigation("/admin/manage-flights")}>
                  Manage Flights
                </MenuItem>
                <MenuItem onClick={() => handleNavigation("/admin/user-management")}>
                  User Management
                </MenuItem>
                <MenuItem onClick={() => handleNavigation("/admin/analytics")}>
                  Analytics
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => handleNavigation("/service-bookings")}>
                  Service Bookings
                </MenuItem>
                <MenuItem onClick={() => handleNavigation("/flight-tracking")}>
                  Flight Tracking
                </MenuItem>
                <MenuItem onClick={() => handleNavigation("/luggage-tracking")}>
                  Luggage Tracking
                </MenuItem>
              </>
            )}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
