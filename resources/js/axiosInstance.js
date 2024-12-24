import axios from 'axios';

// Buat instance Axios
const axiosInstance = axios.create({
    baseURL: '/', // Semua request akan dimulai dari '/api'
    timeout: 10000, // Timeout 10 detik
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Tambahkan token Authorization jika ada
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // Jangan lupa return config agar permintaan dilanjutkan
    },
    (error) => {
        // Tangani error di request
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Modifikasi atau log respons di sini
        return response; // Return response agar bisa digunakan oleh komponen
    },
    (error) => {
        // Tangani error global, misalnya 401
        if (error.response && error.response.status === 401) {
            // Arahkan user ke halaman login
            window.location.href = '/login';
        }
        return Promise.reject(error); // Jangan lupa return Promise.reject
    }
);

export default axiosInstance;
