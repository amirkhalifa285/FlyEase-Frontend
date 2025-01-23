import React, { useEffect, useState } from "react";
import axios from "../../api";
import "./Profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [tickets, setTickets] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch profile data (user info + messages)
    axios.get("/profile")
      .then((response) => {
        setUserInfo(response.data.user || {});
        setMessages(response.data.messages || []);
      })
      .catch((error) => console.error("Profile fetch error:", error));

    // Fetch tickets - UPDATED TO HANDLE ERRORS PROPERLY
    axios.get("/my-tickets")
      .then((response) => {
        // Debugging log
        console.log("Tickets API Response:", response.data);
        if (response.data && response.data.tickets) {
          setTickets(response.data.tickets);
        } else {
          console.error("Unexpected response format:", response.data);
          setTickets([]);
        }
      })
      .catch((error) => {
        console.error("Tickets fetch error:", error.response?.data || error.message);
        setTickets([]);
      });
  }, []);

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      {/* User Info Section */}
      <div className="user-info">
        <h2>User Information</h2>
        <p><strong>Email:</strong> {userInfo.email || "Loading..."}</p>
        <p><strong>Username:</strong> {userInfo.username || "Loading..."}</p>
      </div>

      {/* Messages Section */}
      <div className="user-messages">
        <h2>Notifications</h2>
        {messages.length > 0 ? (
          <ul>
            {messages.map((message) => (
              <li key={message.id} className={message.status}>
                <p>{message.content}</p>
                <small>{new Date(message.created_at).toLocaleString()}</small>
                {message.status === "unread" && (
                  <span className="unread-badge">New</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No new notifications</p>
        )}
      </div>

      {/* Existing Tickets Section */}
      <div className="user-tickets">
        <h2>Purchased Tickets</h2>
        {tickets.length > 0 ? (
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <p><strong>Airline:</strong> {ticket.airline_name}</p>
                <p><strong>Flight Number:</strong> {ticket.flight_number}</p>
                <p><strong>From:</strong> {ticket.origin} <strong>To:</strong> {ticket.destination}</p>
                <p><strong>Departure:</strong> {new Date(ticket.departure_time).toLocaleString()}</p>
                <p><strong>Arrival:</strong> {new Date(ticket.arrival_time).toLocaleString()}</p>
                <p><strong>Price:</strong> ${ticket.price}</p>
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