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
      { title: "Gourmet Meal", description: "Exquisite dining experience.", price: "$40/meal",image:"/gormet.jpeg" },
      { title: "Fast Food", description: "Quick and tasty meals.", price: "$15/meal",image: "/fastfood.jpeg" },
      { title: "Healthy Options", description: "Nutritious and delicious.", price: "$25/meal",image: "/healthy.jpeg" },
    ],
    Attractions: [
      { title: "City Tour", description: "Explore the best spots in the city.", price: "$60/person",image: "/tour.jpeg" },
      { title: "Museum Visit", description: "Dive into art and history.", price: "$30/person" ,image: "/meusem.jpeg"},
      { title: "Theme Park", description: "Fun-filled day with rides and entertainment.", price: "$80/person" ,image: "/theme.jpeg"},
    ],
  });
  //const [hotels, setHotels] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const fetchHotels = async (location = "40.748817,-73.985428", radius = 1000) => {
    try {
      const response = await axios.post(`/hotels/fetch`, {
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
      <FormControl
  sx={{
    minWidth: 240,
    marginBottom: "30px",
    backgroundColor: "#fff", // White background for better contrast
    borderRadius: "8px",     // Smooth rounded corners
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow
    "& .MuiSelect-select": {
      padding: "10px 14px", // Better spacing inside the dropdown
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none", // Remove default border for cleaner look
    },
  }}
>
  <Select
    value={selectedCategory}
    onChange={handleCategoryChange}
    displayEmpty
    sx={{
      fontSize: "16px",  // Slightly larger font size
      fontWeight: 500,   // Medium weight for better visibility
    }}
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
    flexWrap: "wrap", // Adjust layout for smaller screens
    justifyContent: "center", // Center alignment for better UX
  }}
>
  <TextField
    label="Enter Location"
    variant="outlined"
    value={searchLocation}
    onChange={(e) => setSearchLocation(e.target.value)}
    sx={{
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      minWidth: "300px", // Ensure consistent width
    }}
  />
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#6a11cb",
      color: "#fff",
      padding: "10px 20px", // Make button larger and more clickable
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: 600,
      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
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
        // Show badge for all categories except Cars
        showOpenNowBadge={selectedCategory !== "Cars"}
      />
    </Grid>
  ))}
</Grid>


    </Box>
  );
};

export default ServiceBookingPage;