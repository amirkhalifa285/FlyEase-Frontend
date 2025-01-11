import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import MenuAppBar from "../components/shared/Navbar"; // Navbar Component
import Footer from "../components/shared/Footer"; // Footer Component
import Breadcrumb from "../components/shared/Breadcrumb"; // Breadcrumb Component

const flightsData = [
  {
    id: 1,
    airline: "Delta Airlines",
    flightNumber: "DL123",
    from: "USA",
    to: "France",
    departureTime: "2025-01-15T10:00:00",
    arrivalTime: "2025-01-15T22:00:00",
    price: 500,
  },
  {
    id: 2,
    airline: "United Airlines",
    flightNumber: "UA456",
    from: "UK",
    to: "Germany",
    departureTime: "2025-01-16T08:00:00",
    arrivalTime: "2025-01-16T12:00:00",
    price: 300,
  },
  {
    id: 3,
    airline: "American Airlines",
    flightNumber: "AA789",
    from: "Canada",
    to: "Japan",
    departureTime: "2025-01-17T14:00:00",
    arrivalTime: "2025-01-18T08:30:00",
    price: 1200,
  },
  {
    id: 4,
    airline: "Lufthansa",
    flightNumber: "LH321",
    from: "France",
    to: "India",
    departureTime: "2025-01-18T09:00:00",
    arrivalTime: "2025-01-18T21:00:00",
    price: 700,
  },
  {
    id: 5,
    airline: "British Airways",
    flightNumber: "BA654",
    from: "UK",
    to: "USA",
    departureTime: "2025-01-19T11:00:00",
    arrivalTime: "2025-01-19T15:00:00",
    price: 400,
  },
];

const FlightTickets = () => {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [filteredFlights, setFilteredFlights] = useState(flightsData); // Display all flights by default

  // Handle input changes
  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Filter flights
  const handleFilter = () => {
    const filtered = flightsData.filter((flight) => {
      const matchesFrom = flight.from.toLowerCase().includes(filters.from.toLowerCase());
      const matchesTo = flight.to.toLowerCase().includes(filters.to.toLowerCase());
      const matchesDate = filters.date
        ? flight.departureTime.startsWith(filters.date)
        : true;
      return matchesFrom && matchesTo && matchesDate;
    });
    setFilteredFlights(filtered);
  };

  // Handle Booking
  const handleBooking = (flight) => {
    // Save the flight number in localStorage
    localStorage.setItem("bookedFlightNumber", flight.flightNumber);
    alert(`Booking Confirmed! Your Flight Number is ${flight.flightNumber}. Use it to track your flight.`);
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
      <Breadcrumb />
      {/* Main Content */}
      <Box sx={{ flex: "1", padding: "40px", color: "white" }}>
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          Search Flights
        </Typography>

        {/* Filter Form */}
        <Box mb={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="From (Country)"
                name="from"
                variant="outlined"
                value={filters.from}
                onChange={handleInputChange}
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="To (Country)"
                name="to"
                variant="outlined"
                value={filters.to}
                onChange={handleInputChange}
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                name="date"
                variant="outlined"
                value={filters.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleFilter}
          >
            Filter Flights
          </Button>
        </Box>

        {/* Flight Cards */}
        <Grid container spacing={2}>
          {filteredFlights.map((flight) => (
            <Grid item xs={12} sm={6} md={4} key={flight.id}>
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
                <Typography variant="h6" fontWeight="bold">
                  {flight.airline}
                </Typography>
                <Typography>Flight: {flight.flightNumber}</Typography>
                <Typography>From: {flight.from}</Typography>
                <Typography>To: {flight.to}</Typography>
                <Typography>
                  Departure: {new Date(flight.departureTime).toLocaleString()}
                </Typography>
                <Typography>
                  Arrival: {new Date(flight.arrivalTime).toLocaleString()}
                </Typography>
                <Typography>Price: ${flight.price}</Typography>
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
                  onClick={() => handleBooking(flight)}
                >
                  Book Now
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default FlightTickets;
