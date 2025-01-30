import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const api = axios.create({
    baseURL: URL,
});

// api.interceptors.request.use((config) => {
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
