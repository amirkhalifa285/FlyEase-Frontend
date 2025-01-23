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
import ProfilePage from "./pages/ProfilePage";
import MenuAppBar from "./components/shared/Navbar";
import "./App.css";
import "@fontsource/roboto";
import Breadcrumb from "./components/shared/Breadcrumb";
import Footer from "./components/shared/Footer";
import ManageFlights from "./pages/ManageFlights";
import MessagesPage from "./pages/MessagesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWebSocket from "./hooks/useWebSocket";
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();

  // Define routes where the Navbar should NOT appear
  const noNavbarRoutes = ["/login", "/signup", "/"];

  // Initialize WebSocket connection
  useWebSocket();

  return (
    <div className="App">
      {/* Toast Notification Container */}
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Conditionally render Navbar */}
      {!noNavbarRoutes.includes(location.pathname) && <MenuAppBar />}
      {!noNavbarRoutes.includes(location.pathname) && <Breadcrumb />}

      {/* Main Content Area */}
      <div className="main-content">
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/messages" element={<MessagesPage />} />

          {/* Admin Pages */}
          <Route
           path="/admin"
           element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminHomePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
          <Route path="/admin/map-manage" element={<AdminMapManage />} />
          <Route path="/admin/manage-flights" element={<ManageFlights />} />

          {/* Other Pages */}
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Wrapper for React Router
export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}