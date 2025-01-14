import React, { useState } from 'react';
//import api from '../../api';

const AddFlight = () => {
  const [status, setStatus] = useState('');
  const [gate, setGate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const response = await api.post('/flights', { status, gate });
      alert('Flight added successfully!');
      setStatus('');
      setGate('');
    } catch (error) {
      console.error('Error adding flight:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Flight</h3>
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Gate"
        value={gate}
        onChange={(e) => setGate(e.target.value)}
        required
      />
      <button type="submit">Add Flight</button>
    </form>
  );
};

export default AddFlight;
