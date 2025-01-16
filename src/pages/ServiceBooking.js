import React, { useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Select, MenuItem, FormControl } from "@mui/material";
import { FaConciergeBell, FaCar, FaBed, FaUtensils, FaLandmark } from "react-icons/fa";

const services = {
  Hotels: [
    { title: "Luxury Suite", description: "5-star comfort and services.", price: "$200/night" },
    { title: "Family Room", description: "Perfect for a family stay.", price: "$150/night" },
    { title: "Budget Room", description: "Affordable and cozy.", price: "$80/night" },
  ],
  Cars: [
    { title: "SUV", description: "Spacious and comfortable for long trips.", price: "$70/day" },
    { title: "Sedan", description: "Smooth and stylish rides.", price: "$50/day" },
    { title: "Compact Car", description: "Perfect for city driving.", price: "$30/day" },
  ],
  Food: [
    { title: "Gourmet Meal", description: "Exquisite dining experience.", price: "$40/meal" },
    { title: "Fast Food", description: "Quick and tasty meals.", price: "$15/meal" },
    { title: "Healthy Options", description: "Nutritious and delicious.", price: "$25/meal" },
  ],
  Attractions: [
    { title: "City Tour", description: "Explore the best spots in the city.", price: "$60/person" },
    { title: "Museum Visit", description: "Dive into art and history.", price: "$30/person" },
    { title: "Theme Park", description: "Fun-filled day with rides and entertainment.", price: "$80/person" },
  ],
};

const icons = {
  Hotels: <FaBed size={40} />,
  Cars: <FaCar size={40} />,
  Food: <FaUtensils size={40} />,
  Attractions: <FaLandmark size={40} />,
};

const ServiceBookingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Hotels");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Category Label */}
      <Typography
        variant="h6"
        sx={{
          marginBottom: "10px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Select a Category
      </Typography>

      {/* Category Dropdown */}
      <FormControl sx={{ minWidth: 200, marginBottom: "30px" }}>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
        >
          {Object.keys(services).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Page Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        sx={{
          background: "linear-gradient(90deg, #6a11cb, #2575fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Service Bookings
      </Typography>
      <Typography
        variant="body1"
        mb={6}
        sx={{ color: "#6b7280", textAlign: "center", maxWidth: "600px" }}
      >
        Explore and book from our range of travel services designed to make your journey seamless and enjoyable.
      </Typography>

      {/* Service Options */}
      <Grid container spacing={4} justifyContent="center">
        {services[selectedCategory].map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "16px",
                    color: "rgba(38, 128, 235, 0.85)",
                  }}
                >
                  {icons[selectedCategory]}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280", marginBottom: "16px" }}>
                  {service.description}
                </Typography>
                <Typography variant="body2" sx={{ color: "#4CAF50", marginBottom: "16px" }}>
                  {service.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#6a11cb",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#2575fc",
                    },
                  }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiceBookingPage;
