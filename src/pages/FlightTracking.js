import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import api from "../api";


const FlightTracking = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightDetails, setFlightDetails] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFlightNumber(e.target.value);
  };

  const handleSearch = async () => {
    setError("");
    setFlightDetails(null);

    if (!flightNumber) {
      setError("Please enter a flight number or luggage ID.");
      return;
    }

    try {
      const response = await api.get(`/tickets/${flightNumber}`);
      setFlightDetails(response.data);
    } catch (err) {
      console.error("Error fetching flight details:", err);
      setError("Details not found. Please check your input.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh", padding: "40px" }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Track Your Flight
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <TextField
          label="Enter Flight Number or Luggage ID"
          variant="outlined"
          value={flightNumber}
          onChange={handleInputChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {error && <Typography color="error" textAlign="center">{error}</Typography>}

      {flightDetails && (
        <Box sx={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", backgroundColor: "#f0f0f0" }}>
          <Typography variant="h6" fontWeight="bold">
            {flightDetails.airline_name}
          </Typography>
          <Typography>Flight Number: {flightDetails.flight_number}</Typography>
          <Typography>Origin: {flightDetails.origin}</Typography>
          <Typography>Destination: {flightDetails.destination}</Typography>
          <Typography>
            Departure: {new Date(flightDetails.departure_time).toLocaleString()}
          </Typography>
          <Typography>
            Arrival: {new Date(flightDetails.arrival_time).toLocaleString()}
          </Typography>
          <Typography>Price: ${flightDetails.price}</Typography>
          <Typography>Luggage ID: {flightDetails.luggage_id}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default FlightTracking;
