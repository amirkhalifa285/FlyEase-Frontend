import React, { useEffect, useState } from "react";
import api from "../../api";

const SCALE = 30; // Scale factor for positioning
const PADDING = 50;

const Legend = () => (
    <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#007bff", // Blue for gates
                    marginRight: "5px",
                }}
            ></div>
            Gate
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#28a745", // Green for lounges
                    marginRight: "5px",
                }}
            ></div>
            Lounge
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#ffc107", // Yellow for security
                    marginRight: "5px",
                }}
            ></div>
            Security
        </div>
    </div>
);

const Map = () => {
    const [mapData, setMapData] = useState({ locations: [], paths: [] });
    const [highlightedPath, setHighlightedPath] = useState([]);
    const [sourceId, setSourceId] = useState("");
    const [destinationId, setDestinationId] = useState("");

    // Fetch map data and store it in state
    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await api.get("/map");
                setMapData(response.data); // Store fetched map data
            } catch (error) {
                console.error("Error fetching map data:", error);
            }
        };

        fetchMapData();
    }, []); // Fetch map data on component mount

    // Fetch shortest path when source and destination are selected
    useEffect(() => {
        const fetchShortestPath = async () => {
            if (!sourceId || !destinationId) return; // Do nothing if both IDs are not set

            try {
                const response = await api.post("/map/navigate", {
                    source_id: parseInt(sourceId),
                    destination_id: parseInt(destinationId),
                });

                console.log("Response from navigate API:", response.data);

                // Map path names back to IDs for rendering logic
                const pathIDs = mapData.locations
                    .filter((location) => response.data.path.includes(location.name))
                    .map((location) => location.id);

                setHighlightedPath(pathIDs); // Store IDs instead of names
            } catch (error) {
                console.error("Error fetching shortest path:", error);
            }
        };

        fetchShortestPath();
    }, [sourceId, destinationId, mapData.locations]); // Fetch when sourceId, destinationId, or locations change

    // Reset the map
    const resetMap = () => {
        setSourceId("");
        setDestinationId("");
        setHighlightedPath([]);
    };

    return (
        <div>
            <div>
                <h3>Navigate</h3>
                <label>
                    Source:
                    <select value={sourceId} onChange={(e) => setSourceId(e.target.value)}>
                        <option value="">Select Source</option>
                        {mapData.locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Destination:
                    <select value={destinationId} onChange={(e) => setDestinationId(e.target.value)}>
                        <option value="">Select Destination</option>
                        {mapData.locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={resetMap}
                    style={{
                        margin: "10px",
                        padding: "10px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Reset Map
                </button>
            </div>

            {/* Add the Legend here */}
            <Legend />

            <svg
                width="800"
                height="800"
                style={{
                    border: "2px solid #343a40",
                    margin: "20px auto",
                    display: "block",
                    backgroundColor: "#e9ecef",
                    borderRadius: "10px",
                }}
            >
                {/* Render Paths */}
                {mapData.paths.map((path) => {
                    const source = mapData.locations.find((loc) => loc.id === path.source_id);
                    const destination = mapData.locations.find((loc) => loc.id === path.destination_id);

                    if (!source || !destination) return null;

                    const isHighlighted =
                        highlightedPath.includes(path.source_id) &&
                        highlightedPath.includes(path.destination_id) &&
                        Math.abs(highlightedPath.indexOf(path.source_id) - highlightedPath.indexOf(path.destination_id)) === 1;

                    return (
                        <line
                            key={path.id}
                            x1={source.coordinates.x * SCALE + PADDING}
                            y1={source.coordinates.y * SCALE + PADDING}
                            x2={destination.coordinates.x * SCALE + PADDING}
                            y2={destination.coordinates.y * SCALE + PADDING}
                            stroke={isHighlighted ? "#ff4d4d" : "#b8b8b8"}
                            strokeWidth={isHighlighted ? "5" : "3"}
                            strokeDasharray={isHighlighted ? "0" : "6"}
                            style={{
                                cursor: "pointer",
                                transition: "stroke 0.3s, stroke-width 0.3s",
                            }}
                            onMouseOver={(e) => e.target.setAttribute("stroke", "orange")}
                            onMouseOut={(e) => e.target.setAttribute("stroke", isHighlighted ? "#ff4d4d" : "#b8b8b8")}
                        />
                    );
                })}

                {/* Render Locations (Nodes) with Labels */}
                {mapData.locations.map((location) => (
                    <g key={location.id}>
                        <circle
                            cx={location.coordinates.x * SCALE + PADDING}
                            cy={location.coordinates.y * SCALE + PADDING}
                            r="12"
                            fill={
                                location.id === parseInt(sourceId)
                                    ? "#ff0000" // Red for source
                                    : location.id === parseInt(destinationId)
                                    ? "#00ff00" // Green for destination
                                    : location.type === "gate"
                                    ? "#007bff"
                                    : location.type === "lounge"
                                    ? "#28a745"
                                    : location.type === "security"
                                    ? "#ffc107"
                                    : "#6c757d"
                            }
                            stroke="black"
                            strokeWidth="2"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                if (!sourceId) {
                                    setSourceId(location.id); // Set source if not already set
                                } else if (!destinationId) {
                                    setDestinationId(location.id); // Set destination if source is already set
                                } else {
                                    setSourceId(location.id); // Reset and start over
                                    setDestinationId("");
                                    setHighlightedPath([]);
                                }
                            }}
                        >
                            <title>{location.name}</title>
                        </circle>
                        <text
                            x={location.coordinates.x * SCALE + PADDING}
                            y={location.coordinates.y * SCALE + PADDING + 25} // Position below the circle
                            textAnchor="middle"
                            fontSize="14"
                            fill="black"
                        >
                            {location.name}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default Map;
