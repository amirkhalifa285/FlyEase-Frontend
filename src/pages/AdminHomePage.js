import React from "react";
import MenuAppBar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaCogs, FaUserShield, FaChartBar, FaClipboardList } from "react-icons/fa";

const AdminHomePage = () => {
  const navigate = useNavigate();

  const adminCards = [
    {
      title: "Manage Flights",
      description: "Add, update, or remove flights from the system.",
      icon: <FaCogs />,
      navigateTo: "/admin/manage-flights",
    },
    {
      title: "User Management",
      description: "View and manage system users.",
      icon: <FaUserShield />,
      navigateTo: "/admin/user-management",
    },
    {
      title: "View Analytics",
      description: "Access reports and system performance analytics.",
      icon: <FaChartBar />,
      navigateTo: "/admin/analytics",
    },
    {
      title: "Notifications",
      description: "Review and send system-wide updates.",
      icon: <FaClipboardList />,
      navigateTo: "/admin/notifications",
    },
  ];

  return (
    <Box
      sx={{
        backgroundImage: "url('/AdminBackground.jpeg')", // Replace with admin-specific image if needed
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
            Welcome Back, Admin!
          </Typography>
          <Typography>
            Manage and monitor your system from the admin dashboard.
          </Typography>
        </Box>

        {/* Quick Access Section */}
        <Box>
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Quick Access
          </Typography>
          <Grid container spacing={4}>
            {adminCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    padding: "20px",
                    background: "linear-gradient(135deg, #ff7f50, #ff4500)", // Admin-specific gradient
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

export default AdminHomePage;
