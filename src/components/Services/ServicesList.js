import React, { useEffect, useState } from 'react';
import api from '../../api';

const ServicesList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h2>Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <strong>Name:</strong> {service.name}, <strong>Description:</strong> {service.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
