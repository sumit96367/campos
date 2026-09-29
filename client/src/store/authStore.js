import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  fetchMe: async () => {
    try {
      set({ loading: true });
      const { data } = await api.get('/auth/me');
      set({ user: data.user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    set({ user: data.user, isAuthenticated: true });
    return data;
  },

  register: async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    set({ user: data.user, isAuthenticated: true });
    return data;
  },

  logout: async () => {
    try {
      await api.get('/auth/logout');
    } catch (err) {} // ignore
    set({ user: null, isAuthenticated: false });
  }
}));

export default useAuthStore;
