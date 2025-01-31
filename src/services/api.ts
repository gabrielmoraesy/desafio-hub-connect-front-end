import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const api = axios.create({
    baseURL: URL,
});