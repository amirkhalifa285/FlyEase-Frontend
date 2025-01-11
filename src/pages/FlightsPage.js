import React from 'react';
import Breadcrumb from "../components/shared/Breadcrumb"; // Breadcrumb Component
import FlightsList from '../components/Flights/FlightList';
import AddFlight from '../components/Flights/AddFlight';


const FlightsPage = () => {
  return (
    <div>
      <h1>Flights</h1>
      <Breadcrumb />
      <AddFlight />
      <FlightsList />
    </div>
  );
};

export default FlightsPage;
