import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();

    if (error.response && error.response.status === 401) {
      try {
      } catch (refreshError) {
        await authStore.logout();
        router.push('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
