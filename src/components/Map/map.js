import React, { useEffect, useState } from "react";
import api from "../../api"; // Adjust API path
import "./map.css";

const ICONS = {
    gate: "/icons/gate-icon.svg",
    security: "/icons/security-icon.svg",
    restaurant: "/icons/restaurant-icon.svg",
    default: "/icons/default.svg",
};

const GRID_SCALE = 50; // Control spacing of the grid

const Map = () => {
    const [mapData, setMapData] = useState({ locations: [], paths: [] });
    const [highlightedPath, setHighlightedPath] = useState([]); // Highlighted path
    const [sourceId, setSourceId] = useState(null);
    const [destinationId, setDestinationId] = useState(null);

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await api.get("/map");
                setMapData(response.data);
            } catch (error) {
                console.error("Error fetching map data:", error);
            }
        };

        fetchMapData();
    }, []);

    const handleIconClick = (id) => {
        if (!sourceId) {
            setSourceId(id);
        } else if (!destinationId) {
            setDestinationId(id);
        } else {
            setSourceId(id);
            setDestinationId(null);
            setHighlightedPath([]);
        }
    };

    const fetchShortestPath = async () => {
        if (!sourceId || !destinationId) {
            console.error("Both source and destination must be selected!");
            return;
        }

        try {
            const response = await api.post("/map/navigate", {
                source_id: sourceId,
                destination_id: destinationId,
            });
            console.log("Shortest Path Response:", response.data.path); // Debug response

            // Map location names in the response to IDs
            const pathIds = response.data.path
                .map((name) => mapData.locations.find((loc) => loc.name === name)?.id)
                .filter((id) => id !== undefined); // Filter out any undefined IDs

            setHighlightedPath(pathIds); // Store path IDs
        } catch (error) {
            console.error("Error fetching shortest path:", error);
        }
    };

    const getIcon = (type) => ICONS[type] || ICONS.default;

    const isHighlighted = (path) =>
        highlightedPath.includes(path.source_id) &&
        highlightedPath.includes(path.destination_id) &&
        Math.abs(
            highlightedPath.indexOf(path.source_id) -
            highlightedPath.indexOf(path.destination_id)
        ) === 1;

    return (
        <div className="map-container">
            <div className="controls">
                <h3>Navigate</h3>
                <p>
                    Source: {" "}
                    {sourceId
                        ? mapData.locations.find((loc) => loc.id === sourceId)?.name
                        : "None"}
                </p>
                <p>
                    Destination: {" "}
                    {destinationId
                        ? mapData.locations.find((loc) => loc.id === destinationId)?.name
                        : "None"}
                </p>
                <button onClick={fetchShortestPath}>Find Path</button>
            </div>

            <svg className="map-svg" viewBox={`0 0 1200 800`}>
                {/* Background Grid */}
                {Array.from({ length: 25 }).map((_, row) =>
                    Array.from({ length: 40 }).map((_, col) => (
                        <rect
                            key={`${row}-${col}`}
                            x={col * GRID_SCALE}
                            y={row * GRID_SCALE}
                            width={GRID_SCALE}
                            height={GRID_SCALE}
                            fill="none"
                            stroke="#ccc"
                            strokeWidth="0.5"
                        />
                    ))
                )}

                {/* Defined Zones */}
                {/* <rect
                    x={0}
                    y={0}
                    width={500}
                    height={275}
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                />
                <rect
                    x={500}
                    y={0}
                    width={500}
                    height={275}
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                /> */}

                {/* Straight Line Example */}
                <line
                    x1={1250} // Start X-coordinate
                    y1={0} // Start Y-coordinate
                    x2={1250} // End X-coordinate
                    y2={600} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={1250} // Start X-coordinate
                    y1={600} // Start Y-coordinate
                    x2={1050} // End X-coordinate
                    y2={600} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={1050} // Start X-coordinate
                    y1={600} // Start Y-coordinate
                    x2={1050} // End X-coordinate
                    y2={800} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={150} // Start X-coordinate
                    y1={250} // Start Y-coordinate
                    x2={150} // End X-coordinate
                    y2={450} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={150} // Start X-coordinate
                    y1={450} // Start Y-coordinate
                    x2={0} // End X-coordinate
                    y2={450} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={150} // Start X-coordinate
                    y1={450} // Start Y-coordinate
                    x2={550} // End X-coordinate
                    y2={450} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={950} // Start X-coordinate
                    y1={450} // Start Y-coordinate
                    x2={1250} // End X-coordinate
                    y2={450} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={150} // Start X-coordinate
                    y1={250} // Start Y-coordinate
                    x2={0} // End X-coordinate
                    y2={250} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={525} // Start X-coordinate
                    y1={0} // Start Y-coordinate
                    x2={525} // End X-coordinate
                    y2={100} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={525} // Start X-coordinate
                    y1={150} // Start Y-coordinate
                    x2={525} // End X-coordinate
                    y2={250} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={250} // Start X-coordinate
                    y1={250} // Start Y-coordinate
                    x2={750} // End X-coordinate
                    y2={250} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />
                <line
                    x1={850} // Start X-coordinate
                    y1={250} // Start Y-coordinate
                    x2={1250} // End X-coordinate
                    y2={250} // End Y-coordinate
                    stroke="black"
                    strokeWidth="2"
                />

                {/* Render Paths */}
                {mapData.paths.map((path) => {
                    const source = mapData.locations.find((loc) => loc.id === path.source_id);
                    const destination = mapData.locations.find(
                        (loc) => loc.id === path.destination_id
                    );

                    if (!source || !destination) return null;

                    return (
                        <line
                            key={path.id}
                            x1={source.coordinates.x * GRID_SCALE}
                            y1={source.coordinates.y * GRID_SCALE}
                            x2={destination.coordinates.x * GRID_SCALE}
                            y2={destination.coordinates.y * GRID_SCALE}
                            stroke={isHighlighted(path) ? "blue" : "gray"} // Highlighted in blue
                            strokeWidth={isHighlighted(path) ? "4" : "2"}
                            strokeOpacity={isHighlighted(path) ? "1" : "0.3"} // Invisible unless highlighted
                        />
                    );
                })}

                {/* Render Locations */}
                {mapData.locations.map((location) => (
                    <image
                        key={location.id}
                        x={location.coordinates.x * GRID_SCALE - 15}
                        y={location.coordinates.y * GRID_SCALE - 15}
                        width="30"
                        height="30"
                        href={getIcon(location.type)}
                        onClick={() => handleIconClick(location.id)} // Handle click
                        style={{
                            cursor: "pointer",
                            opacity:
                                location.id === sourceId || location.id === destinationId
                                    ? 1
                                    : 0.8,
                        }}
                    />
                ))}

                {/* Render Labels */}
                {mapData.locations.map((location) => (
                    <text
                        key={`label-${location.id}`}
                        x={location.coordinates.x * GRID_SCALE}
                        y={location.coordinates.y * GRID_SCALE + 30}
                        textAnchor="middle"
                        fontSize="16"
                        fill="black"
                    >
                        {location.name}
                    </text>
                ))}
            </svg>
        </div>
    );
};

export default Map;
