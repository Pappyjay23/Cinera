import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
        Accept: 'application/json',
    },
});

export default axiosInstance;