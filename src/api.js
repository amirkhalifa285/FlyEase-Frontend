import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Update the URL as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
