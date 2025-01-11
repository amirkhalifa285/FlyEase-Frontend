import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import MenuAppBar from "../components/shared/Navbar"; // Navbar Component
import Footer from "../components/shared/Footer"; // Footer Component
import Breadcrumb from "../components/shared/Breadcrumb"; // Breadcrumb Component

const servicesData = [
  {
    id: 1,
    name: "Deluxe Hotel",
    type: "Hotel",
    description: "5-star luxury hotel with ocean view.",
    price: 200,
    location: "Maldives",
  },
  {
    id: 2,
    name: "Economy Car Rental",
    type: "Car Rental",
    description: "Compact car rental with unlimited mileage.",
    price: 50,
    location: "New York",
  },
  {
    id: 3,
    name: "City Tour Package",
    type: "Attractions",
    description: "Guided city tour with meals included.",
    price: 100,
    location: "Paris",
  },
  {
    id: 4,
    name: "Luxury Car Rental",
    type: "Car Rental",
    description: "Premium SUV with chauffeur service.",
    price: 300,
    location: "Dubai",
  },
];

const ServiceBookings = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [filteredServices, setFilteredServices] = useState([]); // Filtered services based on category

  // Handle Category Selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const filtered = servicesData.filter((service) => service.type === category);
    setFilteredServices(filtered);
  };

  // Handle Booking
  const handleBooking = (service) => {
    alert(`Booking Confirmed! You have booked ${service.name} in ${service.location}.`);
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/Homepage.jpeg')", // Replace with your background image path
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

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Main Content */}
      <Box sx={{ flex: "1", padding: "40px", color: "white" }}>
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          Manage and Book Travel Services
        </Typography>

        {/* Show Category Selection or Services */}
        {!selectedCategory ? (
          <Box textAlign="center" mb={4}>
            <Typography variant="h5" mb={2}>
              Choose a Service Category
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleCategorySelect("Hotel")}
                >
                  Hotel Booking
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleCategorySelect("Car Rental")}
                >
                  Car Rental
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleCategorySelect("Attractions")}
                >
                  Attractions
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <>
            {/* Back to Categories Button */}
            <Box textAlign="left" mb={2}>
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#4f46e5", // Dark purple background
      color: "white", // White text
      fontWeight: "bold", // Bold text
      "&:hover": {
        backgroundColor: "#6a11cb", // Bright purple hover effect
      },
    }}
    onClick={() => setSelectedCategory("")}
  >
    Back to Categories
  </Button>
</Box>


            {/* Selected Category Header */}
            <Typography variant="h5" mb={4} textAlign="center">
              Available {selectedCategory} Services
            </Typography>

            {/* Service Cards */}
            <Grid container spacing={2}>
              {filteredServices.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <Box
                    sx={{
                      padding: "20px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "#4f46e5",
                      color: "white",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                      {service.name}
                    </Typography>
                    <Typography>Description: {service.description}</Typography>
                    <Typography>Price: ${service.price}</Typography>
                    <Typography>Location: {service.location}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        mt: 2,
                        backgroundColor: "white",
                        color: "#4f46e5",
                        "&:hover": {
                          backgroundColor: "#ffffffcc",
                        },
                      }}
                      onClick={() => handleBooking(service)}
                    >
                      Book Now
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default ServiceBookings;
