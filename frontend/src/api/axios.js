import axios from "axios";

const api = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: `${api}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
