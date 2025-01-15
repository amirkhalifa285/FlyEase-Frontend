import React, { useEffect, useState } from "react";
import Footer from "../components/shared/Footer"; // Correct case
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaPlane, FaSuitcase, FaMapMarkerAlt, FaClipboardList, FaTicketAlt } from "react-icons/fa"; // Added FaTicketAlt icon
import api from "../api";
import '@fontsource/roboto';

const HomePage = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);

  const cards = [
    {
      title: "Service Bookings",
      description: "Manage and book your travel services.",
      icon: <FaClipboardList />,
      navigateTo: "/service-bookings",
    },
    {
      title: "Flight Tracking",
      description: "Track your upcoming flights in real-time.",
      icon: <FaPlane />,
      navigateTo: "/flight-tracking",
    },
    {
      title: "Luggage Tracking",
      description: "Stay updated on your luggage status.",
      icon: <FaSuitcase />,
      navigateTo: "/luggage-tracking",
    },
    {
      title: "Interactive Navigation",
      description: "Navigate airports with ease.",
      icon: <FaMapMarkerAlt />,
      navigateTo: "/map",
    },
    {
      title: "Purchase Flight Tickets", // New menu option
      description: "Find and book your next flight easily.",
      icon: <FaTicketAlt />,
      navigateTo: "/purchase-tickets", // Add corresponding route
    },
  ];

  // Fetch flights from the backend
  const fetchFlights = async () => {
    try {
      const response = await api.get("/flights"); // Replace with the correct API endpoint
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "smoke-white", // Set the page background to white
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Content Section */}
      <Box sx={{ flex: "1", padding: "40px", color: "white", textAlign: "center" }}>
        {/* Welcome Section */}
        <Box mb={4}>
          {/* Gradient Text for "Welcome Back, User!" */}
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{
              background: "linear-gradient(to right, #7C3AED, #3B82F6)", 
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back, User!
          </Typography>

          {/* Visible Subtext */}
          <Typography
            sx={{
              color: "#6B7280", // Neutral gray for better visibility
              fontSize: "16px", // Slightly larger font for readability
            }}
          >
            Ready to continue your journey? Access your services below.
          </Typography>
        </Box>

        {/* Quick Access Section */}
        <Box>
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Quick Access
          </Typography>
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    padding: "20px",
                    background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Modern gradient background
                    color: "white",
                    borderRadius: "15px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      transform: "translateY(-10px)", // Hover lift effect
                      boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.3)", // Enhanced hover shadow
                    },
                  }}
                  onClick={() => navigate(card.navigateTo)}
                >
                  <Box
                    sx={{
                      fontSize: "40px",
                      mb: 2,
                      color: "rgba(255, 255, 255, 0.8)", // Icon color
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {card.title}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Flights Section */}
        <Box mt={6}>
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Available Flights
          </Typography>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                className="text-xs text-white uppercase"
                style={{
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                }}
              >
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Airline
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Flight Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Origin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Destination
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Departure
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Arrival
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{flight.airline_name}</td>
                    <td className="px-6 py-4">{flight.flight_number}</td>
                    <td className="px-6 py-4">{flight.origin}</td>
                    <td className="px-6 py-4">{flight.destination}</td>
                    <td className="px-6 py-4">{new Date(flight.departure_time).toLocaleString()}</td>
                    <td className="px-6 py-4">{new Date(flight.arrival_time).toLocaleString()}</td>
                    <td className="px-6 py-4">{flight.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;