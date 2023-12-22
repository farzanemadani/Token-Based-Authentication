import axios from 'axios';

interface User {
  token: string;
  // Other properties of the user object
}

const axiosInstance = axios.create({
  // Your axios configuration
});

axiosInstance.interceptors.request.use((config) => {
  const userString = localStorage.getItem('user');
  const user: User | null = userString ? JSON.parse(userString) : null;

  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default axiosInstance;