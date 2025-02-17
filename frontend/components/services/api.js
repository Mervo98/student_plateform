import axios from 'axios';

// Crée une instance d'Axios avec l'URL de base pour ton API
const API = axios.create({
  baseURL: 'http://localhost:8081/api', // L'URL de ton backend Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
