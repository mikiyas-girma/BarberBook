import axios from 'axios';
import { ServerURL } from './serverURL';

const axiosInstance = axios.create({
  baseURL: `${ServerURL}/api`,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
        window.location.href = '/home';
        }
        return Promise.reject((error.response && error.response.data) || 'Something went wrong');
    }
    );

export default axiosInstance;
