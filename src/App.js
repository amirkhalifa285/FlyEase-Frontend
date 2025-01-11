import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import FlightsPage from "./pages/FlightsPage";
import Map from "./components/Map/map";
import LoginSignup from "./pages/LoginSignup";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import UserInterface from "./pages/UserInterface";
import FlightTickets from "./pages/FlightTickets";
import FlightTracking from "./pages/FlightTracking";
import MenuAppBar from "./components/shared/Navbar"; // Navbar component
import "./App.css";

function App() {
    const location = useLocation();

    // Define routes where the Navbar should NOT appear
    const noNavbarRoutes = ["/login", "/signup", "/"];

    return (
        <div className="App">
            {/* Conditionally render Navbar */}
            {!noNavbarRoutes.includes(location.pathname) && <MenuAppBar />}
            <Routes>
                {/* Default Page */}
                <Route path="/" element={<LoginSignup />} />

                {/* Authentication Pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* User Interface and Features */}
                <Route path="/UserInterface" element={<UserInterface />} />
                <Route path="/purchase-tickets" element={<FlightTickets />} />
                <Route path="/flight-tracking" element={<FlightTracking />} />

                {/* Other Pages */}
                <Route path="/flights" element={<FlightsPage />} />
                <Route path="/map" element={<Map />} />
            </Routes>
        </div>
    );
}

// Wrapper for React Router
export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
