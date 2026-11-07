import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || (
    process.env.NODE_ENV === "production"
      ? "https://nest-book-1.onrender.com/api"
      : "http://localhost:5001/api"
  ),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;