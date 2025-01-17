import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Select, MenuItem, FormControl } from "@mui/material";
import axios from 'axios';
import Hotel from '../components/Hotel/Hotel';
//import '../components/Hotel/Hotel.css';
import { FaBed, FaCar, FaUtensils, FaLandmark } from "react-icons/fa";

const icons = {
  Hotels: <FaBed size={40} />,
  Cars: <FaCar size={40} />,
  Food: <FaUtensils size={40} />,
  Attractions: <FaLandmark size={40} />,
};

const ServiceBookingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Hotels");
  const [services, setServices] = useState({
    Hotels: [],
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
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/hotels');
        const hotelServices = response.data.map(hotel => ({
          id: hotel.id,
          title: hotel.name,
          description: hotel.address,
          price: hotel.rating
            ? `Rating: ${hotel.rating} (${hotel.total_ratings} reviews)`
            : 'No Ratings',
          image: hotel.photo_reference,
          openNow: hotel.open_now,
        }));

        setServices(prev => ({ ...prev, Hotels: hotelServices }));
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

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

      <Grid container spacing={4} justifyContent="center">
        {services[selectedCategory].map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Hotel
              title={service.title}
              description={service.description}
              price={service.price}
              image={service.image}
              openNow={service.openNow}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiceBookingPage;
