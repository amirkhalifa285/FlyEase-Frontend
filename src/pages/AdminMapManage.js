import React, { useState, useEffect } from "react";
import api from "../api"; // Import the configured API instance
import { FaMapMarkerAlt } from "react-icons/fa"; // Icon for locations
import { FiAlertCircle } from "react-icons/fi"; // Icon for error message

const AdminMapManage = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  // Fetch locations from the API
  const fetchLocations = async () => {
    try {
      const response = await api.get("/map"); // Fetching map data from `/api/map`
      setLocations(response.data.locations); // Assuming the response structure includes a `locations` key
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("Failed to fetch locations. Please try again later.");
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Group locations by type
  const groupedLocations = locations.reduce((acc, location) => {
    if (!acc[location.type]) {
      acc[location.type] = [];
    }
    acc[location.type].push(location);
    return acc;
  }, {});

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#f8fafc",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          color: "#1f2937",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Admin Map Management
      </h1>

      {error && (
        <p
          style={{
            color: "#e53e3e",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
            backgroundColor: "#fef2f2",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #fcdcdc",
          }}
        >
          <FiAlertCircle size={24} />
          {error}
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {Object.entries(groupedLocations).map(([type, locations]) => (
          <div
            key={type}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                textTransform: "capitalize",
                color: "#2563eb",
                fontSize: "1.5rem",
                marginBottom: "20px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <FaMapMarkerAlt />
              {type} Locations
            </h2>

            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              {locations.map((location) => (
                <li
                  key={location.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "15px",
                    marginBottom: "15px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    backgroundColor: "#f9fafb",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <FaMapMarkerAlt size={20} color="#2563eb" />
                    <strong
                      style={{
                        fontSize: "1.2rem",
                        color: "#1f2937",
                      }}
                    >
                      {location.name}
                    </strong>
                  </div>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: "#6b7280",
                    }}
                  >
                    Coordinates: ({location.coordinates.x},{" "}
                    {location.coordinates.y})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMapManage;
