import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import api from "../api";


const LuggageTracking = () => {
  const [luggageId, setLuggageId] = useState("");
  const [luggageDetails, setLuggageDetails] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setLuggageId(e.target.value);
  };

  const handleSearch = async () => {
    setError("");
    setLuggageDetails(null);

    if (!luggageId) {
      setError("Please enter a luggage ID.");
      return;
    }

    try {
      const response = await api.get(`/luggage/${luggageId}`);
      setLuggageDetails(response.data);
    } catch (err) {
      console.error("Error fetching luggage details:", err);
      setError("Luggage not found. Please check your luggage ID.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh", padding: "40px" }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Track Your Luggage
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <TextField
          label="Enter Luggage ID"
          variant="outlined"
          value={luggageId}
          onChange={handleInputChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {error && <Typography color="error" textAlign="center">{error}</Typography>}

      {luggageDetails && (
        <Box sx={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", backgroundColor: "#f0f0f0" }}>
          <Typography variant="h6" fontWeight="bold">
            Luggage ID: {luggageDetails.luggage_id}
          </Typography>
          <Typography>Weight: {luggageDetails.weight} kg</Typography>
          <Typography>Status: {luggageDetails.status}</Typography>
          <Typography>Last Location: {luggageDetails.last_location}</Typography>
          <Typography>
            Created At: {new Date(luggageDetails.created_at).toLocaleString()}
          </Typography>
          <Typography>
            Updated At: {new Date(luggageDetails.updated_at).toLocaleString()}
          </Typography>
          <Typography>Associated Ticket ID: {luggageDetails.ticket_id}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default LuggageTracking;
