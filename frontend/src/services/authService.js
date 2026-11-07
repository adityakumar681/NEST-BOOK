import api from "./api";

// Signup
export const signupUser = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  if (typeof window !== "undefined" && response.data.token) {
    window.localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  if (typeof window !== "undefined" && response.data.token) {
    window.localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("token");
  }
  return response.data;
};

// Get currently logged-in user
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};