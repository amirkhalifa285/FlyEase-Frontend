import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FlightsPage from "./pages/FlightsPage";
import ServicesPage from "./pages/ServicesPage";
import Map from "./components/Map/map"; // Import the Map component
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                {/* Header Section */}
                <header className="App-header">
                    <h1>FlyEase</h1>
                    <nav>
                        <Link to="/flights">Flights</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/map">Map</Link> {/* Add a link for the Map */}
                    </nav>
                </header>

                {/* Main Content Section */}
                <main>
                    <Routes>
                        <Route path="/flights" element={<FlightsPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/map" element={<Map />} /> {/* Add route for the Map */}
                        <Route
                            path="/"
                            element={
                                <div>
                                    <h2>Welcome to FlyEase!</h2>
                                    <p>
                                        Use the navigation menu to manage Flights, Services, and view the Map.
                                    </p>
                                </div>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
