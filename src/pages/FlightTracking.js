import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import MenuAppBar from "../components/shared/Navbar"; // Navbar Component
import Footer from "../components/shared/Footer"; // Footer Component

const flightsData = [
  {
    id: 1,
    flightNumber: "DL123",
    airline: "Delta Airlines",
    status: "Departed",
    departureTime: "2025-01-15T10:00:00",
    arrivalTime: "2025-01-15T22:00:00",
    from: "JFK",
    to: "LAX",
  },
  {
    id: 2,
    flightNumber: "UA456",
    airline: "United Airlines",
    status: "Landed",
    departureTime: "2025-01-16T08:00:00",
    arrivalTime: "2025-01-16T12:00:00",
    from: "ORD",
    to: "MIA",
  },
];

const FlightTracking = () => {
  const [search, setSearch] = useState({
    flightNumber: "",
  });
  const [filteredFlights, setFilteredFlights] = useState([]); // Default: No flights shown

  // Handle input changes
  const handleInputChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  // Filter flights based on flight number
  const handleSearch = () => {
    const filtered = flightsData.filter((flight) =>
      flight.flightNumber.toLowerCase() === search.flightNumber.toLowerCase()
    );
    setFilteredFlights(filtered);
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

      {/* Main Content */}
      <Box sx={{ flex: "1", padding: "40px", color: "white" }}>
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          Track Your Flight
        </Typography>

        {/* Search Form */}
        <Box mb={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Enter Flight Number"
                name="flightNumber"
                variant="outlined"
                value={search.flightNumber}
                onChange={handleInputChange}
                sx={{ backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "100%" }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Flight Details */}
        <Grid container spacing={2}>
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
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
                  <Typography>Status: {flight.status}</Typography>
                  <Typography>From: {flight.from}</Typography>
                  <Typography>To: {flight.to}</Typography>
                  <Typography>
                    Departure: {new Date(flight.departureTime).toLocaleString()}
                  </Typography>
                  <Typography>
                    Arrival: {new Date(flight.arrivalTime).toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography textAlign="center" sx={{ width: "100%", mt: 4 }}>
              {search.flightNumber
                ? "No flights found. Please try again."
                : "Enter a flight number to view details."}
            </Typography>
          )}
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default FlightTracking;