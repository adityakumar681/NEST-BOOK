import { create } from "zustand";

import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser
} from "../services/authService";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,

  // Signup
  signup: async (userData) => {
    set({ loading: true });

    try {
      const data = await signupUser(userData);

      set({
        user: data.user,
        isAuthenticated: true
      });

      return data;
    } finally {
      set({ loading: false });
    }
  },

  // Login
  login: async (userData) => {
    set({ loading: true });

    try {
      const data = await loginUser(userData);

      set({
        user: data.user,
        isAuthenticated: true
      });

      return data;
    } finally {
      set({ loading: false });
    }
  },

  // Logout
  logout: async () => {
    try {
      await logoutUser();
    } finally {
      set({
        user: null,
        isAuthenticated: false
      });
    }
  },

  // Check login after page refresh
  checkAuth: async () => {
    try {
      const data = await getCurrentUser();

      set({
        user: data.user,
        isAuthenticated: true
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false
      });
    } finally {
      set({ initialized: true });
    }
  }
}));

export default useAuthStore;