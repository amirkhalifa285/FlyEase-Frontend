import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import FlightsPage from "./pages/FlightsPage";
import Map from "./components/Map/map";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import UserInterface from "./pages/UserInterface";
import FlightTickets from "./pages/FlightTickets";
import FlightTracking from "./pages/FlightTracking";
import LuggageTracking from "./pages/LuggageTracking";
import ServiceBooking from "./pages/ServiceBooking";
import AdminHomePage from "./pages/AdminHomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AdminMapManage from "./pages/AdminMapManage";
import MenuAppBar from "./components/shared/Navbar"; // Navbar component
import "./App.css";
import "@fontsource/roboto";
import Breadcrumb from "./components/shared/Breadcrumb";
import Footer from "./components/shared/Footer"
import ManageFlights from "./pages/ManageFlights";


function App() {
  const location = useLocation();

  // Define routes where the Navbar should NOT appear
  const noNavbarRoutes = ["/login", "/signup", "/"];

  return (
    <div className="App">
      {/* Conditionally render Navbar */}
      {!noNavbarRoutes.includes(location.pathname) && <MenuAppBar />}
      {!noNavbarRoutes.includes(location.pathname) && <Breadcrumb />}
      <Routes>
        {/* Default Page */}
        <Route path="/" element={<Login />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Features */}
        <Route path="/UserInterface" element={<UserInterface />} />
        <Route path="/purchase-tickets" element={<FlightTickets />} />
        <Route path="/flight-tracking" element={<FlightTracking />} />
        <Route path="/luggage-tracking" element={<LuggageTracking />} />
        <Route path="/service-bookings" element={<ServiceBooking />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/Map_Manage" element={<AdminMapManage />} />
        <Route path="/admin/manage-flights" element={<ManageFlights />} />


        {/* Other Pages */}
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/map" element={<Map />} />
      </Routes>
      <Footer />
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
