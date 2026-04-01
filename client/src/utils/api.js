import axios from 'axios';

const api = axios.create({ baseURL: 'https://hungry-platter.onrender.com/api' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('hp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('hp_token');
      localStorage.removeItem('hp_user');
    }
    return Promise.reject(err);
  }
);

export default api;
