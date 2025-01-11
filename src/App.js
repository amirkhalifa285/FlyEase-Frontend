import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightsPage from "./pages/FlightsPage";
import Map from "./components/Map/map";
import LoginSignup from "./pages/LoginSignup";
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import UserInterface from "./pages/UserInterface";
import FlightTickets from "./pages/FlightTickets";
import FlightTracking from "./pages/FlightTracking";
import ServiceBookings from "./pages/SerivceBookings";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Default Page */}
                    <Route path="/" element={<LoginSignup />} />

                    {/* Authentication Pages */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/UserInterface" element={<UserInterface />} />
                    <Route path="/purchase-tickets" element={<FlightTickets />} />
                    <Route path="/flight-tracking" element={<FlightTracking/>} />
                    <Route path="/service-bookings" element={<ServiceBookings/>}/>


                    {/* Other Pages */}
                    <Route
                        path="/flights"
                        element={
                            <>
                                <Header />
                                <FlightsPage />
                            </>
                        }
                    />
                    <Route
                        path="/map"
                        element={
                            <>
                                <Header />
                                <Map />
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

// Header Component
const Header = () => (
    <header className="App-header">
        <h1>FlyEase</h1>
        <nav>
            <a href="/flights">Flights</a>
            <a href="/map">Map</a>
        </nav>
    </header>
);

export default App;