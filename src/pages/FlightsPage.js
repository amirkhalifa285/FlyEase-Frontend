import React from 'react';
import FlightsList from '../components/Flights/FlightList';
import AddFlight from '../components/Flights/AddFlight';

const FlightsPage = () => {
  return (
    <div>
      <h1>Flights</h1>
      <AddFlight />
      <FlightsList />
    </div>
  );
};

export default FlightsPage;
