import React from 'react';
import ServicesList from '../components/Services/ServicesList';
import AddService from '../components/Services/AddService';

const ServicesPage = () => {
  return (
    <div>
      <h1>Services</h1>
      <AddService />
      <ServicesList />
    </div>
  );
};

export default ServicesPage;
