import React, { useEffect, useState } from 'react';
import api from '../../api';

const FlightsList = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await api.get('/flights');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <h2>Flights</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <strong>Status:</strong> {flight.status}, <strong>Gate:</strong> {flight.gate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightsList;
