import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import api from "../api";

const ManageFlights = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentFlight, setCurrentFlight] = useState(null);

  const [newFlight, setNewFlight] = useState({
    airline_name: "",
    flight_number: "",
    origin: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    status: "",
  });

  // Fetch flights
  const fetchFlights = async () => {
    try {
      const response = await api.get("/admin/flights");
      setFlights(response.data);
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError("Failed to load flights. Please try again.");
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFlight((prev) => ({ ...prev, [name]: value }));
  };

  // Create or update flight
  const handleSave = async () => {
    try {
      if (currentFlight) {
        // Use flight_number for the PUT request
        await api.put(`/admin/flights/${currentFlight.flight_number}`, newFlight);
      } else {
        await api.post("/admin/flights", newFlight);
      }
      setOpenDialog(false);
      fetchFlights();
    } catch (err) {
      console.error("Error saving flight:", err);
      setError("Failed to save flight. Please try again.");
    }
  };

  // Open dialog for adding or editing
  const openEditDialog = (flight) => {
    setCurrentFlight(flight);
    setNewFlight(
      flight || {
        airline_name: "",
        flight_number: "",
        origin: "",
        destination: "",
        departure_time: "",
        arrival_time: "",
        status: "",
      }
    );
    setOpenDialog(true);
  };

  // Delete flight
  const handleDelete = async (flight_number) => {
    try {
      await api.delete(`/admin/flights/${flight_number}`);
      fetchFlights();
    } catch (err) {
      console.error("Error deleting flight:", err);
      setError("Failed to delete flight. Please try again.");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Manage Flights</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <Button
        variant="contained"
        color="primary"
        onClick={() => openEditDialog(null)}
        className="mb-4"
      >
        Add Flight
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Airline</TableCell>
            <TableCell>Flight Number</TableCell>
            <TableCell>Origin</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Departure Time</TableCell>
            <TableCell>Arrival Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.id}>
              <TableCell>{flight.airline_name}</TableCell>
              <TableCell>{flight.flight_number}</TableCell>
              <TableCell>{flight.origin}</TableCell>
              <TableCell>{flight.destination}</TableCell>
              <TableCell>{new Date(flight.departure_time).toLocaleString()}</TableCell>
              <TableCell>{new Date(flight.arrival_time).toLocaleString()}</TableCell>
              <TableCell>{flight.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => openEditDialog(flight)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(flight.flight_number)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{currentFlight ? "Edit Flight" : "Add Flight"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Airline Name"
            name="airline_name"
            value={newFlight.airline_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Flight Number"
            name="flight_number"
            value={newFlight.flight_number}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Origin"
            name="origin"
            value={newFlight.origin}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Destination"
            name="destination"
            value={newFlight.destination}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Departure Time"
            name="departure_time"
            type="datetime-local"
            value={newFlight.departure_time}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Arrival Time"
            name="arrival_time"
            type="datetime-local"
            value={newFlight.arrival_time}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            value={newFlight.status}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageFlights;
