import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Select, MenuItem, FormControl, TextField, Button } from "@mui/material";
import axios from 'axios';
import Hotel from '../components/Hotel/Hotel';
//import { FaBed, FaCar, FaUtensils, FaLandmark } from "react-icons/fa";

// const icons = {
//   Hotels: <FaBed size={40} />,
//   Cars: <FaCar size={40} />,
//   Food: <FaUtensils size={40} />,
//   Attractions: <FaLandmark size={40} />,
// };

const ServiceBookingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Hotels");
  const [services, setServices] = useState({
    Hotels: [],
    Cars: [
      { title: "SUV", description: "Spacious and comfortable for long trips.\n Provider: Hertz Company", price: "$70/day", image: "/suv.png", openNow: false },
      { title: "Sedan", description: "Smooth and stylish rides.", price: "$50/day", image: "/sedan.jpg" },
      { title: "Compact Car", description: "Perfect for city driving.", price: "$30/day", image: "/compact_car.jpeg" },
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
  //const [hotels, setHotels] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const fetchHotels = async (location = "40.748817,-73.985428", radius = 1000) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/hotels/fetch`, {
        location, // Send location as a string
        radius,   // Send radius as an integer
      });
      const hotelServices = response.data.map((hotel) => ({
        id: hotel.id,
        title: hotel.name,
        description: hotel.address,
        price: hotel.rating
          ? `Rating: ${hotel.rating} (${hotel.total_ratings} reviews)`
          : 'No Ratings',
        image: hotel.photo_reference,
        openNow: hotel.open_now,
      }));

      setServices((prev) => ({ ...prev, Hotels: hotelServices }));
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };


  useEffect(() => {
    // Fetch hotels for the default location on page load
    fetchHotels();
  }, []);

  const handleSearch = () => {
    if (searchLocation.trim() === "") {
      alert("Please enter a location!");
      return;
    }
    // Call fetchHotels with the user-entered location
    fetchHotels(searchLocation);
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "30px",
        }}
      >
        <TextField
          label="Enter Location"
          variant="outlined"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6a11cb",
            color: "#fff",
            "&:hover": { backgroundColor: "#2575fc" },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

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
        {services[selectedCategory].map((service, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
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
