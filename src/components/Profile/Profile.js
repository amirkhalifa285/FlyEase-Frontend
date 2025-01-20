import React, { useEffect, useState } from "react";
import axios from "../../api"; // Adjust the import path as needed
import "./Profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch user info
    axios
      .get("/profile") // Replace with your user info API endpoint
      .then((response) => setUserInfo(response.data))
      .catch((error) => console.error("Failed to fetch user info:", error));

    // Fetch tickets
    axios
      .get("/my-tickets") // Replace with your tickets API endpoint
      .then((response) => setTickets(response.data.tickets || []))
      .catch((error) => console.error("Failed to fetch tickets:", error));
  }, []);

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="user-info">
        <h2>User Information</h2>
        <p>
          <strong>Email:</strong> {userInfo.email || "Loading..."}
        </p>
        <p>
          <strong>Username:</strong> {userInfo.username || "Loading..."}
        </p>
      </div>

      <div className="user-tickets">
        <h2>Purchased Tickets</h2>
        {tickets.length > 0 ? (
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <p>
                  <strong>Airline:</strong> {ticket.airline_name}
                </p>
                <p>
                  <strong>Flight Number:</strong> {ticket.flight_number}
                </p>
                <p>
                  <strong>From:</strong> {ticket.origin} <strong>To:</strong>{" "}
                  {ticket.destination}
                </p>
                <p>
                  <strong>Departure:</strong>{" "}
                  {new Date(ticket.departure_time).toLocaleString()}
                </p>
                <p>
                  <strong>Arrival:</strong>{" "}
                  {new Date(ticket.arrival_time).toLocaleString()}
                </p>
                <p>
                  <strong>Price:</strong> ${ticket.price}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tickets purchased yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
