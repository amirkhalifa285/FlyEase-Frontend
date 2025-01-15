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

            const pathIds = response.data.path; // Already a list of IDs

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
                index++;
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
        }, 30000); // Update every 30 seconds

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

            // Render only highlighted paths
            data.paths.forEach((path) => {
                const source = data.locations.find((loc) => loc.id === path.source_id);
                const destination = data.locations.find((loc) => loc.id === path.destination_id);

                if (source && destination) {
                    const segment = `${path.source_id}-${path.destination_id}`;
                    const isInPath = highlightedPathSegments.has(segment);

                    if (isInPath) {
                        const line = new Line(
                            [
                                source.coordinates.x * GRID_SCALE,
                                source.coordinates.y * GRID_SCALE,
                                destination.coordinates.x * GRID_SCALE,
                                destination.coordinates.y * GRID_SCALE,
                            ],
                            {
                                stroke: "blue", // Highlighted path color
                                strokeWidth: 4, // Thicker for visibility
                                selectable: false,
                                source_id: path.source_id,
                                destination_id: path.destination_id,
                            }
                        );
                        canvas.add(line);
                    }
                }
            });

            const getLocationColor = (locationType) => {
                if (typeof locationType !== "string") {
                    return "gray"; // Default color for invalid types
                }
                switch (locationType.toLowerCase()) {
                    case 'gate':
                        return 'blue';
                    case 'lounge':
                        return 'green';
                    case 'wc':
                        return 'cyan';
                    case 'check-in':
                        return 'purple';
                    case 'security':
                        return 'red';
                    case 'restaurant':
                        return 'orange';
                    case 'baggage':
                        return 'brown';
                    case 'information':
                        return 'pink';
                    default:
                        return 'gray';
                }
            };

            // Render locations with category-based colors
            data.locations.forEach((location) => {
                const color = getLocationColor(location.type);

                const circle = new Circle({
                    radius: 10,
                    fill: color,
                    left: location.coordinates.x * GRID_SCALE - 10,
                    top: location.coordinates.y * GRID_SCALE - 10,
                    selectable: false,
                });

                // Add interactivity for hover (tooltip) and clicks
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
                        console.log("Both source and destination selected. Reset to start over.");
                    }
                });

                canvas.add(circle);

                const label = new Textbox(location.name, {
                    left: location.coordinates.x * GRID_SCALE + 15, // Move text 15px to the right of the circle
                    top: location.coordinates.y * GRID_SCALE,      // Align text vertically with the circle
                    fontSize: 10,
                    textAlign: "left",                             // Align text to the left for better readability
                    selectable: false,
                    fontFamily: "Roboto, sans-serif"
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
                        stroke: "black",
                        strokeWidth: 0,
                        selectable: false,
                    }
                );
                canvas.add(wallLine);
            });

            // Render moving marker if navigating
            if (isNavigating && navigationPath.length > 0) {
                const currentLocation = navigationPath[currentPositionIndex];

                const marker = new Circle({
                    radius: 8,
                    fill: "green",
                    left: currentLocation.coordinates.x * GRID_SCALE - 8,
                    top: currentLocation.coordinates.y * GRID_SCALE - 8,
                    selectable: false,
                    evented: false,
                    opacity: 5.5,
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
        <div className="flex justify-center items-start mt-6">
            {/* Sidebar Container */}
            <div className="flex flex-col gap-6 w-1/4 max-w-xs">
                {/* Navigate Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                    <h3 className="text-lg font-bold text-center mb-4">Navigate</h3>
                    <p>
                        <span className="font-semibold">Source:</span>{" "}
                        {sourceId
                            ? mapData.locations.find((loc) => loc.id === sourceId)?.name
                            : "None"}
                    </p>
                    <p>
                        <span className="font-semibold">Destination:</span>{" "}
                        {destinationId
                            ? mapData.locations.find((loc) => loc.id === destinationId)?.name
                            : "None"}
                    </p>
                    <input
                        type="text"
                        placeholder="Search location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-4"
                    />
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={highlightLocation}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 rounded-lg hover:from-purple-700 hover:to-blue-600"
                        >
                            Search
                        </button>
                        <button
                            onClick={fetchShortestPath}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 rounded-lg hover:from-purple-700 hover:to-blue-600"
                        >
                            Find Path
                        </button>
                    </div>
                    <button
                        onClick={startNavigation}
                        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 rounded-lg hover:from-purple-700 hover:to-blue-600"
                    >
                        Start Navigation
                    </button>
                    <button
                        onClick={() => {
                            setSourceId(null);
                            setDestinationId(null);
                            clearPath();
                        }}
                        className="w-full mt-4 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400"
                    >
                        Reset
                    </button>
                    <div className="congestion-bar mt-4">
                        <h4 className="text-center mb-2">Overall Congestion: {congestionLevel.level}</h4>
                        <div
                            className="w-full h-5 rounded-lg overflow-hidden bg-gray-300"
                            style={{
                                position: "relative",
                            }}
                        >
                            <div
                                className="h-full rounded-lg"
                                style={{
                                    backgroundColor:
                                        congestionLevel.level === "High"
                                            ? "#dc2626" // Red for High
                                            : congestionLevel.level === "Medium"
                                                ? "#fbbf24" // Yellow for Medium
                                                : "#22c55e", // Green for Low
                                    width: `${(congestionLevel.value / 10) * 100}%`, // Fill dynamically based on value
                                    transition: "width 0.3s ease", // Smooth animation for changes
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Locations Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                    <h4 className="text-lg font-bold mb-4 text-center">Locations</h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                            Gate
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-600"></div>
                            Security
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-600"></div>
                            Lounge
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-orange-600"></div>
                            Restaurant
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                            Check-In
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                            W.C (Washroom)
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-pink-400"></div>
                            Information
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div
                className="relative"
                style={{
                    width: "1200px",
                    height: "800px",
                    marginLeft: "20px", // Space between map and sidebar
                }}
            >
                {/* Map Content */}
                <div
                    className="absolute inset-0"
                    id="mapWrapper"
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {/* Background Image */}
                    <img
                        src="/test_map2-.jpeg"
                        alt="Map"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        style={{
                            zIndex: 1, // Ensure the image stays behind the canvas
                        }}
                    />

                    {/* Canvas */}
                    <canvas
                        id="mapCanvas"
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            backgroundColor: "transparent",
                            zIndex: 2,
                        }}
                    ></canvas>
                </div>
            </div>
        </div>
    );

};

export default Map;
