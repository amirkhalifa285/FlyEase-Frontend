import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import Footer from "../components/shared/Footer";
import api from "../api";

const FlightTickets = () => {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(""); // To handle and display errors

  // Fetch tickets from the backend
  const fetchTickets = async () => {
    try {
      setError(""); // Clear any existing errors
      const response = await api.get("/tickets");
      setTickets(response.data); // Set fetched tickets
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError("Failed to fetch tickets. Please try again later.");
    }
  };

  // Filter tickets based on search criteria
  const filteredTickets = tickets.filter((ticket) => {
    const matchesFrom = ticket.origin.toLowerCase().includes(filters.from.toLowerCase());
    const matchesTo = ticket.destination.toLowerCase().includes(filters.to.toLowerCase());
    const matchesDate = filters.date
      ? ticket.departure_time.startsWith(filters.date)
      : true;
    return matchesFrom && matchesTo && matchesDate;
  });

  // Fetch tickets on component load
  useEffect(() => {
    fetchTickets();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = (ticket) => {
    localStorage.setItem("bookedTicketId", ticket.id);
    alert(`Booking Confirmed! Your Flight Number is ${ticket.flight_number}.`);
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/Homepage.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Content */}
      <Box sx={{ flex: "1", padding: "40px", color: "white" }}>
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          Search Flights
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography
            sx={{
              color: "red",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {error}
          </Typography>
        )}

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
        </Box>

        {/* Flight Cards */}
        <Grid container spacing={2}>
          {filteredTickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket.id}>
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
                  {ticket.airline_name}
                </Typography>
                <Typography>Flight: {ticket.flight_number}</Typography>
                <Typography>From: {ticket.origin}</Typography>
                <Typography>To: {ticket.destination}</Typography>
                <Typography>
                  Departure: {new Date(ticket.departure_time).toLocaleString()}
                </Typography>
                <Typography>
                  Arrival: {new Date(ticket.arrival_time).toLocaleString()}
                </Typography>
                <Typography>Price: ${ticket.price}</Typography>
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
                  onClick={() => handleBooking(ticket)}
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
