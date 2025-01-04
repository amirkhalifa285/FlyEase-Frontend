import React, { useEffect, useState, useCallback, useRef } from "react";
import { Canvas, Line, Circle, Textbox } from "fabric";
import api from "../../api"; // Adjust API path
import "./map.css";

const GRID_SCALE = 40; // Updated grid scale

const Map = () => {
    const [mapData, setMapData] = useState({ locations: [], paths: [], walls: [] });
    const [sourceId, setSourceId] = useState(null);
    const [destinationId, setDestinationId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [congestionLevel, setCongestionLevel] = useState({ level: "Low", value: 0 });
    const [showCongestion] = useState(false);
    const [navigationPath, setNavigationPath] = useState([]);
    const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
    const [highlightedPathSegments, sethighlightedPathSegments] = useState(new Set());
    const [isNavigating, setIsNavigating] = useState(false);
    const canvasRef = useRef(null);

    const fetchShortestPath = useCallback(async () => {
        if (!sourceId || !destinationId) {
            console.error("Both source and destination must be selected!");
            return;
        }

        console.log("Fetching shortest path...");

        try {
            const response = await api.post("/map/navigate", {
                source_id: sourceId,
                destination_id: destinationId,
            });

            const pathIds = response.data.path.map((locationName) => {
                const location = mapData.locations.find((loc) => loc.name === locationName);
                return location ? location.id : null;
            });

            const validPathSegments = new Set();
            for (let i = 0; i < pathIds.length - 1; i++) {
                const current = pathIds[i];
                const next = pathIds[i + 1];
                if (current && next) {
                    validPathSegments.add(`${current}-${next}`);
                    validPathSegments.add(`${next}-${current}`);
                }
            }

            console.log("Highlighted Path Segments:", validPathSegments);

            sethighlightedPathSegments(validPathSegments); // Store highlighted path
            setNavigationPath(pathIds.map((id) => mapData.locations.find((loc) => loc.id === id)));
            setCurrentPositionIndex(0); // Reset navigation marker
        } catch (error) {
            console.error("Error fetching shortest path:", error);
        }
    }, [sourceId, destinationId, mapData.locations]);

    const startNavigation = () => {
        if (navigationPath.length === 0) {
            console.error("No path selected for navigation!");
            return;
        }

        setIsNavigating(true);
        let index = 0;
        const interval = setInterval(() => {
            if (index >= navigationPath.length) {
                clearInterval(interval); //stop animation
                setIsNavigating(false);
                console.log("Navigation Complete!");
            } else {
                setCurrentPositionIndex(index);
                index++
            }
        }, 1000); // update position every second
    };

    const clearPath = () => {
        if (canvasRef.current) {
            canvasRef.current.getObjects("line").forEach((line) => {
                line.set({ stroke: "gray", strokeWidth: 2 });
            });
            canvasRef.current.getObjects("circle").forEach((circle) => {
                if (circle.radius === 8) {
                    canvasRef.current.remove(circle);
                }
            });
            canvasRef.current.renderAll();
        }

        sethighlightedPathSegments(new Set());
        setNavigationPath([]);
        setCurrentPositionIndex(0);
        setSourceId(null);
        setDestinationId(null);
        setIsNavigating(false);

        console.log("Map reset, all data cleared.");
    };

    const highlightLocation = useCallback(() => {
        if (canvasRef.current && searchQuery.trim()) {
            const location = mapData.locations.find(
                (loc) => loc.name.toLowerCase() === searchQuery.toLowerCase()
            );

            if (location) {
                const highlightCircle = new Circle({
                    radius: 15,
                    fill: "rgba(255, 0, 0, 0.5)",
                    left: location.coordinates.x * GRID_SCALE - 15,
                    top: location.coordinates.y * GRID_SCALE - 15,
                    selectable: false,
                    evented: false,
                });

                canvasRef.current.add(highlightCircle);

                setTimeout(() => {
                    canvasRef.current.remove(highlightCircle);
                    canvasRef.current.renderAll();
                }, 2000); // Highlight for 2 seconds
            } else {
                console.error("Location not found!");
            }
        }
    }, [searchQuery, mapData.locations]);

    const updateCongestion = useCallback(async () => {
        try {
            const response = await api.post("/map/update-congestion");
            setCongestionLevel(response.data);

            if (showCongestion) {
                const { paths } = response.data;
                canvasRef.current.getObjects("line").forEach((line) => {
                    const path = paths.find(
                        (p) =>
                            p.source_id === line.source_id &&
                            p.destination_id === line.destination_id
                    );

                    if (path) {
                        let color = "green"; // Default low congestion
                        if (path.congestion > 6) color = "red"; // High congestion
                        else if (path.congestion > 3) color = "orange"; // Medium congestion

                        line.set({
                            stroke: color,
                            strokeWidth: 3,
                        });
                    }
                });

                canvasRef.current.renderAll();
            }
        } catch (error) {
            console.error("Error updating congestion:", error);
        }
    }, [showCongestion]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateCongestion();
        }, 30000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, [updateCongestion]);

    useEffect(() => {
        if (!canvasRef.current) {
            const newCanvas = new Canvas("mapCanvas", {
                width: 1200,
                height: 800,
                selection: false,
            });
            canvasRef.current = newCanvas;
        }

        return () => {
            if (canvasRef.current) {
                canvasRef.current.dispose();
                canvasRef.current = null;
            }
        };
    }, []);

    const renderMap = useCallback(
        (canvas, data) => {
            console.log("Rendering map...");

            canvas.clear();

            // Render paths
            data.paths.forEach((path) => {
                const source = data.locations.find((loc) => loc.id === path.source_id);
                const destination = data.locations.find((loc) => loc.id === path.destination_id);

                if (source && destination) {
                    const segment = `${path.source_id}-${path.destination_id}`;
                    const isInPath = highlightedPathSegments.has(segment);

                    const line = new Line(
                        [
                            source.coordinates.x * GRID_SCALE,
                            source.coordinates.y * GRID_SCALE,
                            destination.coordinates.x * GRID_SCALE,
                            destination.coordinates.y * GRID_SCALE,
                        ],
                        {
                            stroke: isInPath ? "blue" : "gray",
                            strokeWidth: isInPath ? 4 : 2,
                            selectable: false,
                            source_id: path.source_id,
                            destination_id: path.destination_id,
                        }
                    );
                    canvas.add(line);
                }
            });

            // Render locations
            data.locations.forEach((location) => {
                const circle = new Circle({
                    radius: 10,
                    fill: "blue",
                    left: location.coordinates.x * GRID_SCALE - 10,
                    top: location.coordinates.y * GRID_SCALE - 10,
                    selectable: false,
                });

                circle.on("mouseover", () => {
                    const tooltip = new Textbox(location.name, {
                        left: location.coordinates.x * GRID_SCALE + 15,
                        top: location.coordinates.y * GRID_SCALE - 15,
                        fontSize: 14,
                        fill: "black",
                        textAlign: "center",
                    });
                    canvas.add(tooltip);
                    circle.tooltip = tooltip;
                });

                circle.on("mouseout", () => {
                    if (circle.tooltip) {
                        canvas.remove(circle.tooltip);
                        circle.tooltip = null;
                    }
                });

                circle.on("mousedown", () => {
                    if (!sourceId) {
                        setSourceId(location.id);
                        console.log(`Source selected: ${location.id}`);
                    } else if (!destinationId) {
                        setDestinationId(location.id);
                        console.log(`Destination selected: ${location.id}`);
                    } else {
                        console.log("Both source and destination are already selected. Reset to start over.");
                    }
                });

                canvas.add(circle);

                const label = new Textbox(location.name, {
                    left: location.coordinates.x * GRID_SCALE,
                    top: location.coordinates.y * GRID_SCALE + 15,
                    fontSize: 12,
                    textAlign: "center",
                    selectable: false,
                });
                canvas.add(label);
            });

            // Render walls
            data.walls.forEach((wall) => {
                const wallLine = new Line(
                    [
                        wall.x1 * GRID_SCALE,
                        wall.y1 * GRID_SCALE,
                        wall.x2 * GRID_SCALE,
                        wall.y2 * GRID_SCALE,
                    ],
                    {
                        stroke: "red",
                        strokeWidth: 3,
                        selectable: false,
                    }
                );
                canvas.add(wallLine);
            });

            // Render moving marker
            if (isNavigating && navigationPath.length > 0) {
                const currentLocation = navigationPath[currentPositionIndex];

                const marker = new Circle({
                    radius: 8,
                    fill: "green",
                    left: currentLocation.coordinates.x * GRID_SCALE - 8,
                    top: currentLocation.coordinates.y * GRID_SCALE - 8,
                    selectable: false,
                    evented: false,
                    opacity: 50,
                });
                canvas.add(marker);
            }
        },
        [highlightedPathSegments, isNavigating, navigationPath, currentPositionIndex, destinationId, sourceId]
    );



    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await api.get("/map");
                setMapData(response.data);
                if (canvasRef.current) {
                    renderMap(canvasRef.current, response.data);
                }
            } catch (error) {
                console.error("Error fetching map data:", error);
            }
        };

        fetchMapData();
    }, [renderMap]);

    return (
        <div className="map-container">
            <div className="controls">
                <h3>Navigate</h3>
                <p>
                    Source:{" "}
                    {sourceId
                        ? mapData.locations.find((loc) => loc.id === sourceId)?.name
                        : "None"}
                </p>
                <p>
                    Destination:{" "}
                    {destinationId
                        ? mapData.locations.find((loc) => loc.id === destinationId)?.name
                        : "None"}
                </p>
                <input
                    type="text"
                    placeholder="Search location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={highlightLocation}>Search</button>
                <button onClick={fetchShortestPath}>Find Path</button>
                <button onClick={startNavigation}>Start Navigation</button>
                <button
                    onClick={() => {
                        setSourceId(null);
                        setDestinationId(null);
                        clearPath();
                    }}
                >
                    Reset
                </button>
                <div className="congestion-bar">
                    <h4>Overall Congestion: {congestionLevel.level}</h4>
                    <progress
                        max="10"
                        value={congestionLevel.value}
                        style={{
                            width: "100%",
                            height: "20px",
                            backgroundColor:
                                congestionLevel.level === "High"
                                    ? "red"
                                    : congestionLevel.level === "Medium"
                                    ? "yellow"
                                    : "green",
                        }}
                    />
                </div>
            </div>
            <canvas id="mapCanvas"></canvas>
        </div>
    );
};

export default Map;
