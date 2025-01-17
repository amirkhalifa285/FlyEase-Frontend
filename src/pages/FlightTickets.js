import React, { useState, useEffect } from "react";
import api from "../api";

const FlightTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tickets from backend
  const fetchTickets = async () => {
    setLoading(true);
    setError(""); // Reset any existing errors
    try {
      const response = await api.get("/tickets");
      setTickets(response.data); // Set fetched tickets
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("Failed to fetch tickets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle booking logic
  const handleBooking = async (ticket) => {
    try {
      const response = await api.post("/tickets/book", { ticket_id: ticket.id });
      const { flight_number, luggage_id } = response.data;
      alert(
        `Booking Confirmed!\n\nFlight Number: ${flight_number}\nLuggage ID: ${luggage_id}`
      );
      // Optionally, refresh tickets after booking
      fetchTickets();
    } catch (err) {
      console.error("Error during booking:", err.response || err);
      alert(
        `Booking failed: ${
          err.response?.data?.detail || "An unexpected error occurred."
        }`
      );
    }
  };

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Available Flights</h1>

      {/* Display error if exists */}
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {/* Show loading indicator */}
      {loading ? (
        <div className="text-center text-gray-500">Loading tickets...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="max-w-full bg-white flex flex-col rounded overflow-hidden shadow-lg"
            >
              {/* Header */}
              <div className="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2">
                <svg
                  viewBox="0 0 64 64"
                  className="mt-2 mr-1"
                  style={{ fill: "rgb(102, 102, 102)", height: "0.9rem", width: "0.9rem" }}
                >
                  <path d="M43.389 38.269L29.222 61.34a1.152 1.152 0 01-1.064.615H20.99a1.219 1.219 0 01-1.007-.5 1.324 1.324 0 01-.2-1.149L26.2 38.27H11.7l-3.947 6.919a1.209 1.209 0 01-1.092.644H1.285a1.234 1.234 0 01-.895-.392l-.057-.056a1.427 1.427 0 01-.308-1.036L1.789 32 .025 19.656a1.182 1.182 0 01.281-1.009 1.356 1.356 0 01.951-.448l5.4-.027a1.227 1.227 0 01.9.391.85.85 0 01.2.252L11.7 25.73h14.5L19.792 3.7a1.324 1.324 0 01.2-1.149A1.219 1.219 0 0121 2.045h7.168a1.152 1.152 0 011.064.615l14.162 23.071h8.959a17.287 17.287 0 017.839 1.791Q63.777 29.315 64 32q-.224 2.685-3.807 4.478a17.282 17.282 0 01-7.84 1.793h-9.016z"></path>
                </svg>
                <h1 className="ml-2 uppercase font-bold text-gray-500">Departure</h1>
                <p className="ml-2 font-normal text-gray-500">
                  {new Date(ticket.departure_time).toDateString()}
                </p>
              </div>

              {/* Airline Info */}
              <div className="mt-2 flex justify-between items-center mx-6">
                <div className="flex items-center">
                  <img
                    src={ticket.airline_logo || "/icons/default.png"} // Placeholder for airline logo
                    alt={ticket.airline_name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{ticket.airline_name}</p>
                    <p className="text-gray-500 text-sm">{ticket.flight_number}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Economy</p>
              </div>

              {/* Flight Details */}
              <div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap">
                <div className="flex flex-col p-2">
                  <p className="font-bold text-gray-800">From: {ticket.origin}</p>
                  <p className="text-gray-500">
                    {new Date(ticket.departure_time).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex flex-col p-2">
                  <p className="font-bold text-gray-800">To: {ticket.destination}</p>
                  <p className="text-gray-500">
                    {new Date(ticket.arrival_time).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 bg-gray-100 flex flex-row flex-wrap justify-between items-baseline p-4">
                <div className="text-sm mx-2 flex flex-col">
                  <p className="font-bold text-gray-800">${ticket.price}</p>
                  <p className="text-xs text-gray-500">Price per ticket</p>
                </div>
                <button
                  className="w-32 h-11 rounded flex border-solid border bg-blue-500 text-white justify-center items-center"
                  onClick={() => handleBooking(ticket)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightTickets;
