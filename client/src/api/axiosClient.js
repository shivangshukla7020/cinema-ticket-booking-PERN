import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use import.meta.env instead of process.env
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
