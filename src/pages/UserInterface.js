import React from "react";
import MenuAppBar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer"; // Correct case
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaPlane, FaSuitcase, FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Service Bookings",
      description: "Manage and book your travel services.",
      icon: <FaClipboardList />,
      navigateTo: "/service-bookings",
    },
    {
      title: "Flight Tracking",
      description: "Track your upcoming flights in real-time.",
      icon: <FaPlane />,
      navigateTo: "/flight-tracking",
    },
    {
      title: "Luggage Tracking",
      description: "Stay updated on your luggage status.",
      icon: <FaSuitcase />,
      navigateTo: "/luggage-tracking",
    },
    {
      title: "Interactive Navigation",
      description: "Navigate airports with ease.",
      icon: <FaMapMarkerAlt />,
      navigateTo: "/interactive-navigation",
    },
  ];

  return (
    <Box
      sx={{
        backgroundImage: "url('/Homepage.jpeg')", // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <MenuAppBar />

      {/* Content Section */}
      <Box sx={{ flex: "1", padding: "40px", color: "white", textAlign: "center" }}>
        {/* Welcome Section */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Welcome Back, User!
          </Typography>
          <Typography>
            Ready to continue your journey? Access your services below.
          </Typography>
        </Box>

        {/* Quick Access Section */}
        <Box>
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Quick Access
          </Typography>
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    padding: "20px",
                    background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Modern gradient background
                    color: "white",
                    borderRadius: "15px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      transform: "translateY(-10px)", // Hover lift effect
                      boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.3)", // Enhanced hover shadow
                    },
                  }}
                  onClick={() => navigate(card.navigateTo)}
                >
                  <Box
                    sx={{
                      fontSize: "40px",
                      mb: 2,
                      color: "rgba(255, 255, 255, 0.8)", // Icon color
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {card.title}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;
